import IControllerBase from '@interfaces/IControllerBase.interface';
import e, { NextFunction, Request, Response } from 'express';
import * as Ticket from '@models/ticket';
import HttpError from '@configs/httpError';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import passport from 'passport';
import { Common } from '@configs/common';
import { cnpj, cpf } from 'cpf-cnpj-validator';

class OctaDeskController implements IControllerBase {
  path: string = '/octaDesk';

  router: e.Router = e.Router();

  client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: 'https://api.octadesk.services',
      headers: { subDomain: '' },
      timeout: 50000,
      validateStatus: (status) => true,
    });
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post('/criarTicket', passport.authenticate('bearer', { session: false }), this.criarTicket);
  }

    setores: {[index: string]:(ticket: Ticket.Ticket) => Ticket.TicketRequest} = {
      'ADM Apólices': (ticket: Ticket.Ticket) : Ticket.TicketRequest => {
        let textoExtra: string = '';
        if (ticket.dadosExtra !== undefined) {
          if (ticket.dadosExtra.tipo === 'E-mail') {
            textoExtra = `O cliente deseja trocar o email para ${ticket.dadosExtra.dado} (Confirmacão: ${ticket.dadosExtra.confirmacao})`;
          } else if (ticket.dadosExtra.tipo === 'Telefone') {
            textoExtra = `O cliente deseja trocar o telefone para ${ticket.dadosExtra.dado} (Confirmacão: ${ticket.dadosExtra.confirmacao})`;
          }
        }
        return {
          requester: {
            email: ticket.email,
            name: ticket.nomeCompleto,
          },
          summary: `${ticket.nomeCompleto} - ${ticket.cpfCnpj} - ${ticket.assunto}`,
          idGroupAssigned: '4edcd9b8-9b82-423e-a5cc-fa7d24e30661',
          idAssigned: undefined,
          idForm: 'aacec5fc-de4b-45ff-a27e-fff35baff93e',
          idTopicGroup: '4c6fde19-69d8-46ec-88f6-e290450c994b',
          idTopic: '9b652e5f-7888-430c-9f34-3c4ce0cb60e7',
          idSubject: '609da2f7-6700-45bf-905a-7647de381983',
          customField: {
            descricao_do_assunto__administracao_de_apolice: ticket.assunto,
            cpfcnpj_do_cliente: ticket.cpfCnpj,
            seguradoras: ticket.seguradora,
          },
          comments: {
            description: {
              content: `Nome do cliente: ${ticket.nomeCompleto}
              \nEmail do cliente: ${ticket.email}
              \nTelefone do cliente: ${ticket.telefone}
              \nCPF/CNPJ: ${ticket.cpfCnpj}
              \nSeguradora: ${ticket.seguradora}
              \n\n${textoExtra}`,
            },
          },
        };
      },
      Sinistro: (ticket:Ticket.Ticket): Ticket.TicketRequest => ({
        requester: {
          email: ticket.email,
          name: ticket.nomeCompleto,
        },
        summary: `${ticket.nomeCompleto} - ${ticket.cpfCnpj}`,
        idGroupAssigned: '6cb2778b-3f5c-4f93-a75a-6b160126ae96',
        idAssigned: undefined,
        idForm: '2c8dd9d1-befa-4f2c-ba86-02874893109a',
        idTopicGroup: '5962025a-6040-4251-9a22-44d653f3fb4b',
        idTopic: 'de165752-e7b2-4b02-837e-a28404d52538',
        idSubject: '318bc3de-a0bb-4ccc-bbd7-d3013c0bbf27',
        customField: {
          seguradoras: ticket.seguradora,
        },
        comments: {
          description: {
            content: `Nome do cliente: ${ticket.nomeCompleto}
              \nEmail do cliente: ${ticket.email}
              \nTelefone do cliente: ${ticket.telefone}
              \nCPF/CNPJ: ${ticket.cpfCnpj}
              \nSeguradora: ${ticket.seguradora}
              \nTipo do Seguro: ${ticket.tipoSeguro}`,
          },
        },
      }),
    }

    criarTicket = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const reqBody = req.body;
        const ticket = reqBody as Ticket.Ticket;

        try {
          Ticket.validarTicket(ticket);
        } catch (error) {
          throw new HttpError(error.message, 400);
        }

        if (Common.isNullOrWhitespace(ticket.seguradora) || ticket.seguradora === '{{seguradora_atual}}') {
          ticket.seguradora = '';
        }
        if (cpf.isValid(ticket.cpfCnpj)) {
          ticket.cpfCnpj = cpf.format(ticket.cpfCnpj);
        } else {
          ticket.cpfCnpj = cnpj.format(ticket.cpfCnpj);
        }

        const criarTicketRequest = this.setores[ticket.departamento];
        if (criarTicketRequest) {
          const ticketRequest = criarTicketRequest(ticket);
          const response = await this.enviarTicket(ticketRequest);
          if (response.status === 200) {
            res.status(200).send({ variables: { numeroTicket: response.data.number } });
          } else {
            throw new HttpError('Ocorreu um erro ao tentar chamar a API do Octa', 500);
          }
        } else {
          throw new HttpError('Setor invalido', 400);
        }
      } catch (error) {
        next(error);
      }
    }

    private async enviarTicket(ticket: Ticket.TicketRequest): Promise<AxiosResponse> {
      Ticket.validarTicketRequest(ticket);

      await this.login();

      const response = await this.sendRequestPost('/tickets/', ticket);

      return response;
    }

    private async sendRequestPost(path: string, data: object): Promise<AxiosResponse> {
      const response = await this.client.post(path, data);
      return response;
    }

    private async login() {
      const response = await this.sendRequestPost('/login',
        {
          username: '',
          password: '',
        });
      this.client.defaults.headers.Authorization = `Bearer ${response.data.token}`;
    }
}

export default OctaDeskController;
