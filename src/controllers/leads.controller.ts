import IControllerBase from '@interfaces/IControllerBase.interface';
import e, { NextFunction, Request, Response } from 'express';
import * as Lead from '@models/lead';
import { Connection, getConnection } from 'typeorm/index';
import { cnpj, cpf } from 'cpf-cnpj-validator';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import passport from 'passport';
import { Common } from '@configs/common';
import HttpError from '../configs/httpError';
import { TipoSeguro } from '../databases/db/entities/TipoSeguro';

class LeadsController implements IControllerBase {
    path: string = '/leads';

    router: e.Router = e.Router();

    connection: Connection

    client: AxiosInstance

    constructor() {
      this.connection = getConnection('Api');
      this.client = axios.create({
        baseURL: process.env.NODE_ENV === 'production' ? '<URL de Leads>' : 'http://localhost:8000',
        headers: {
          'client-id': '',
          'client-secret': '',
        },
        timeout: 50000,
        validateStatus: (status) => true,
      });
      this.initRoutes();
    }

    initRoutes(): void {
      this.router.get('/obterSeguros', passport.authenticate('bearer', { session: false }), this.obterSeguros);
      this.router.post('/criar', passport.authenticate('bearer', { session: false }), this.criar);
    }

    obterSeguros = async (req: Request, res: Response, next: NextFunction) => {
      const { tipoPessoa } = req.query;
      try {
        if (typeof tipoPessoa === 'string') {
          const seguros = await this.obterSegurosDb(tipoPessoa);
          if (seguros !== undefined) {
            let stringRetorno = '';
            seguros.forEach(((value: TipoSeguro, index: number) => {
              stringRetorno += `${index + 1} - Seguro ${value.Nome} \n`;
            }));

            res.status(200).send({
              variables: {
                seguros: stringRetorno,
              },
            });
          } else {
            throw new HttpError('Tipo de pessoa invalido', 400);
          }
        } else {
          throw new HttpError('Requisicao invalida', 400);
        }
      } catch (error) {
        next(error);
      }
    }

    criar = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const reqBody = req.body;
        const lead = reqBody as Lead.Lead;

        try {
          Lead.validarLead(lead);
        } catch (error) {
          throw new HttpError(`Houve erro ao validar o lead enviado. Erro: ${error.message}`, 400);
        }

        const seguros = await this.obterSegurosDb(lead.tipoPessoa);
        if (seguros !== undefined) {
          const idSeguro = seguros[+lead.tipoSeguro - 1].Id;

          let tipoDocumento: string = 'cpf';
          let documento = '00000000000';

          if (lead.cpfCnpj !== undefined && lead.cpfCnpj !== '{{cpf_cnpj}}') {
            if (cpf.isValid(lead.cpfCnpj)) {
              documento = cpf.strip(lead.cpfCnpj);
            } else if (cnpj.isValid(lead.cpfCnpj)) {
              tipoDocumento = 'cnpj';
              documento = cnpj.strip(lead.cpfCnpj);
            }
          }

          const hotsite = Common.extrairSubdominio(lead.urlOrigem);
          lead.telefone = Common.formatarTelefone(lead.telefone);

          const leadRequest: Lead.LeadRequest = {
            origin: 8,
            company: null,
            hotsite,
            completed: 50,
            postalcode: +lead.cep.replace('-', ''),
            type: idSeguro,
            id_reference: +new Date(),
            is_simulation: false,
            document_type: tipoDocumento,
            document_number: documento,
            phones: `{"primary" : "${lead.telefone}"}`,
            consumer_name: lead.nomeCompleto,
            consumer_email: lead.email,
            infos: {},
          };

          const response = await this.enviarLead(leadRequest);
          if (response.status === 200) {
            res.status(200).send('Lead criado com sucesso');
          } else {
            throw new HttpError('Ocorreu um erro ao tentar chamar a API da Central de Leads', 500);
          }
        } else {
          throw new HttpError('Houve um erro inesperado ao obter os seguros do DB', 500);
        }
      } catch (error) {
        next(error);
      }
    }

    private async obterSegurosDb(tipoPessoa: string): Promise<TipoSeguro[] | undefined> {
      let retorno: TipoSeguro[] | undefined;
      if (tipoPessoa === 'Física') {
        retorno = await this.connection.manager.find(TipoSeguro, {
          where: {
            PessoaFisica: true,
          },
        });
      } else if (tipoPessoa === 'Jurídica') {
        retorno = await this.connection.manager.find(TipoSeguro, {
          where: {
            PessoaJuridica: true,
          },
        });
      } else {
        retorno = undefined;
      }

      return retorno;
    }

    private async enviarLead(leadRequest: Lead.LeadRequest): Promise<AxiosResponse> {
      const response = this.client.post('/api/v2/lead/create', leadRequest);
      return response;
    }
}

export default LeadsController;
