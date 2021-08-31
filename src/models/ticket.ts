import { Common } from '@configs/common';
import { cnpj, cpf } from 'cpf-cnpj-validator';

export type Ticket = {
    nomeCompleto: string;
    email: string;
    telefone: string;
    cpfCnpj: string;
    departamento: string;
    seguradora: string;
    assunto: string;
    tipoSeguro: string | undefined;
    dadosExtra: DadosExtra;
}

type DadosExtra = {
    tipo: string;
    dado: string;
    confirmacao: string;
}

export function validarTicket(ticket: Ticket) {
  if (Common.isNullOrWhitespace(ticket.nomeCompleto)) throw new Error('Nome completo não esta preenchido');
  if (Common.isNullOrWhitespace(ticket.cpfCnpj)) throw new Error('Cpf/Cnpj não esta preenchido');
  else if (!cpf.isValid(ticket.cpfCnpj) && !cnpj.isValid(ticket.cpfCnpj)) throw new Error('Cpf/Cnpj informado é invalido');
  if (Common.isNullOrWhitespace(ticket.email)) throw new Error('Email não esta preenchido');
  if (Common.isNullOrWhitespace(ticket.departamento)) throw new Error('Email não esta preenchido');
  if (Common.isNullOrWhitespace(ticket.telefone)) throw new Error('Telefone não esta preenchido');
  if (Common.isNullOrWhitespace(ticket.assunto)) throw new Error('Assunto não está preenchido');
}

export type TicketRequest = {
    requester: object;
    summary: string;
    idGroupAssigned: string;
    idAssigned: string | undefined;
    idForm: string;
    idTopicGroup: string | undefined;
    idTopic: string | undefined;
    idSubject: string;
    customField: object;
    comments: object
}

export function validarTicketRequest(ticket: TicketRequest) {
  if (Common.isNullOrWhitespace(ticket.idGroupAssigned)) throw new Error('Algo deu errado no preenchimento do idGroupAssigned');
  if (Common.isNullOrWhitespace(ticket.idForm)) throw new Error('Algo deu errado no preenchimento do idForm');
}
