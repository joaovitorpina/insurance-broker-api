/* eslint-disable camelcase */
import { Common } from '@configs/common';

export type Lead = {
    nomeCompleto: string;
    email: string;
    telefone: string;
    cep: string;
    tipoSeguro: string;
    tipoPessoa: string;
    cpfCnpj: string | undefined;
    urlOrigem: string;
}

export function validarLead(lead: Lead) {
  if (Common.isNullOrWhitespace(lead.nomeCompleto)) throw new Error('Nome completo não esta preenchido');
  if (Common.isNullOrWhitespace(lead.email)) throw new Error('Email não esta preenchido');
  if (Common.isNullOrWhitespace(lead.telefone)) throw new Error('Telefone não esta preenchido');
  if (Common.isNullOrWhitespace(lead.cep)) throw new Error('CEP não esta preenchido');
  if (Common.isNullOrWhitespace(lead.tipoPessoa)) throw new Error('Tipo de seguro não esta preenchido');
}

export type LeadRequest = {
    origin: number;
    company: number | null;
    hotsite: string | null;
    completed: number;
    postalcode: number;
    type: number;
    id_reference: number | string;
    is_simulation: boolean;
    document_type: string;
    document_number: number | string;
    phones: string;
    consumer_name: string;
    consumer_email: string;
    infos: object | undefined;
}
