import IControllerBase from '@interfaces/IControllerBase.interface';
import e, { NextFunction, Request, Response } from 'express';
import { Connection } from 'typeorm';
import { cnpj, cpf } from 'cpf-cnpj-validator';
import HttpError from '@configs/httpError';
import passport from 'passport';
import { getConnection } from 'typeorm/index';
import { Cliente } from '../databases/db/entities/Cliente';
import { Clientes } from '../databases/admin/entities/Clientes';

export default class IndexController implements IControllerBase {
    path: string = '/';

    router: e.Router = e.Router();

    connectionApi: Connection

    connectionAdmin: Connection

    constructor() {
      this.connectionApi = getConnection('Api');
      this.connectionAdmin = getConnection('Admin');
      this.initRoutes();
    }

    initRoutes(): void {
      this.router.get('/obterFranqueado', passport.authenticate('bearer', { session: false }), this.obterFranqueado);
    }

    obterFranqueado = async (req: Request, res: Response, next: NextFunction) => {
      try {
        let { cpfCnpj } = req.query;
        if (typeof cpfCnpj === 'string') {
          if (!cpf.isValid(cpfCnpj) && !cnpj.isValid(cpfCnpj)) throw new HttpError('CPF/CNPJ informado é invalido', 400);
          else if (cnpj.isValid(cpfCnpj)) {
            cpfCnpj = `0${cnpj.format(cpfCnpj)}`;
          } else {
            cpfCnpj = cpf.format(cpfCnpj);
          }
        } else {
          throw new HttpError('CPF/CNPJ não foi informado', 400);
        }

        const clienteRepository = this.connectionApi.manager.getRepository(Cliente);
        const cliente = await clienteRepository.findOne({
          where: {
            CPFCNPJ: cpfCnpj,
          },
          relations: ['Franqueado'],
        });

        if (cliente === undefined) throw new HttpError('Cliente não encontrado com CPF/CNPJ informado', 404);

        if (cliente.Franqueado === null) throw new HttpError('O franqueado do cliente não foi encontrado', 404);

        const franqAdmin = await this.connectionAdmin.manager.findOne(Clientes, { where: { idCol: cliente.Franqueado.IdCol }, relations: ['hotsites'] });
        let hotsite = '';

        if (franqAdmin && franqAdmin.hotsites.length > 0) {
          hotsite = `https://${franqAdmin.hotsites[0].prefixo}.seguralta.com.br/`;
        }

        res.status(200).send({
          variables: {
            nomeFranqueado: cliente.Franqueado.NomeConta,
            emailFranqueado: cliente.Franqueado.Email,
            telefoneFranqueado: cliente.Franqueado.Telefone,
            celularFranqueado: cliente.Franqueado.Celular,
            hotsiteFranqueado: hotsite,
          },
        });
      } catch (error) {
        next(error);
      }
    }
}
