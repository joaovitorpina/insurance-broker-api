import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Hotsites } from "./Hotsites";

@Entity("clientes", { schema: "seguralta" })
export class Clientes {
  @PrimaryGeneratedColumn({ type: "int", name: "idClientes" })
  idClientes: number;

  @Column("varchar", { name: "idCompaniaHubSpot", nullable: true, length: 20 })
  idCompaniaHubSpot: string | null;

  @Column("varchar", {
    name: "Status",
    nullable: true,
    comment:
      "0 > Inativo | 1 > Ativo | 2 > Em Implantação | 3 > Á venda | 4 > AUTO CADASTRO | 5 > Em processo de cancelamento | 9 > Não Definido",
    length: 50,
    default: () => "'0'",
  })
  status: string | null;

  @Column("tinyint", { name: "StatusGeral", width: 1, default: () => "'0'" })
  statusGeral: boolean;

  @Column("tinyint", {
    name: "BloqueadoCotacaoAdmin",
    nullable: true,
    default: () => "'0'",
  })
  bloqueadoCotacaoAdmin: number | null;

  @Column("tinyint", { name: "SuspensoTemp", width: 1, default: () => "'0'" })
  suspensoTemp: boolean;

  @Column("tinyint", { name: "RecebeCotacao", width: 1, default: () => "'0'" })
  recebeCotacao: boolean;

  @Column("int", { name: "BloqueadoRecebeCotacaoSistema", nullable: true })
  bloqueadoRecebeCotacaoSistema: number | null;

  @Column("int", { name: "IndiceAceiteCotacao", nullable: true })
  indiceAceiteCotacao: number | null;

  @Column("date", { name: "DataCalculoIndice", nullable: true })
  dataCalculoIndice: string | null;

  @Column("date", { name: "DataReativacaoCotacao", nullable: true })
  dataReativacaoCotacao: string | null;

  @Column("int", {
    name: "CotacaoAutorizaReativacao",
    nullable: true,
    default: () => "'0'",
  })
  cotacaoAutorizaReativacao: number | null;

  @Column("tinyint", { name: "CadastroAuto", default: () => "'0'" })
  cadastroAuto: number;

  @Column("varchar", { name: "Token", nullable: true, length: 50 })
  token: string | null;

  @Column("int", { name: "idCOL", nullable: true })
  idCol: number | null;

  @Column("int", { name: "CentroCustoProteus", nullable: true })
  centroCustoProteus: number | null;

  @Column("int", { name: "TipoGestor", default: () => "'0'" })
  tipoGestor: number;

  @Column("int", { name: "idGestor", nullable: true })
  idGestor: number | null;

  @Column("int", { name: "idDS", nullable: true })
  idDs: number | null;

  @Column("int", { name: "idCOLDS", nullable: true })
  idColds: number | null;

  @Column("varchar", { name: "SUSEP", nullable: true, length: 15 })
  susep: string | null;

  @Column("varchar", { name: "SUSEP_Porto", nullable: true, length: 15 })
  susepPorto: string | null;

  @Column("varchar", { name: "SUSEP_Web", nullable: true, length: 15 })
  susepWeb: string | null;

  @Column("int", { name: "Corretor_Habilitado", nullable: true })
  corretorHabilitado: number | null;

  @Column("varchar", { name: "NomeFantasia", length: 255 })
  nomeFantasia: string;

  @Column("varchar", { name: "RazaoSocial", nullable: true, length: 255 })
  razaoSocial: string | null;

  @Column("int", { name: "Tipo", default: () => "'1'" })
  tipo: number;

  @Column("int", { name: "idUnidadeCliente", nullable: true })
  idUnidadeCliente: number | null;

  @Column("varchar", { name: "Email", nullable: true, length: 100 })
  email: string | null;

  @Column("varchar", { name: "EmailCotacao", nullable: true, length: 100 })
  emailCotacao: string | null;

  @Column("int", { name: "DDDCotacao", nullable: true })
  dddCotacao: number | null;

  @Column("varchar", { name: "CidadeTecnico", nullable: true, length: 100 })
  cidadeTecnico: string | null;

  @Column("varchar", { name: "Telefone", nullable: true, length: 45 })
  telefone: string | null;

  @Column("varchar", { name: "Celular", nullable: true, length: 45 })
  celular: string | null;

  @Column("varchar", { name: "Twitter", nullable: true, length: 255 })
  twitter: string | null;

  @Column("varchar", { name: "Facebook", nullable: true, length: 255 })
  facebook: string | null;

  @Column("varchar", { name: "GooglePlus", nullable: true, length: 45 })
  googlePlus: string | null;

  @Column("mediumtext", { name: "Home_Descricao", nullable: true })
  homeDescricao: string | null;

  @Column("varchar", { name: "Home_Nome", nullable: true, length: 155 })
  homeNome: string | null;

  @Column("varchar", { name: "Home_Susep", nullable: true, length: 45 })
  homeSusep: string | null;

  @Column("varchar", { name: "Home_Foto", nullable: true, length: 155 })
  homeFoto: string | null;

  @Column("varchar", { name: "Home_tel", nullable: true, length: 255 })
  homeTel: string | null;

  @Column("varchar", { name: "Endereco", nullable: true, length: 255 })
  endereco: string | null;

  @Column("varchar", { name: "Numero", nullable: true, length: 45 })
  numero: string | null;

  @Column("varchar", { name: "Complemento", nullable: true, length: 45 })
  complemento: string | null;

  @Column("varchar", { name: "CEP", nullable: true, length: 20 })
  cep: string | null;

  @Column("varchar", { name: "Bairro", nullable: true, length: 155 })
  bairro: string | null;

  @Column("varchar", { name: "Cidade", nullable: true, length: 255 })
  cidade: string | null;

  @Column("varchar", { name: "Estado", nullable: true, length: 45 })
  estado: string | null;

  @Column("int", { name: "TipoCadastro", default: () => "'0'" })
  tipoCadastro: number;

  @Column("varchar", { name: "CPF_CNPJ", nullable: true, length: 50 })
  cpfCnpj: string | null;

  @Column("varchar", { name: "CPF", nullable: true, length: 30 })
  cpf: string | null;

  @Column("varchar", { name: "InsE_RG", nullable: true, length: 50 })
  insERg: string | null;

  @Column("varchar", { name: "Longitude", nullable: true, length: 100 })
  longitude: string | null;

  @Column("varchar", { name: "Latitude", nullable: true, length: 100 })
  latitude: string | null;

  @Column("timestamp", {
    name: "dt_cadastro",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  dtCadastro: Date | null;

  @Column("tinyint", { name: "ExibeSite", width: 1, default: () => "'0'" })
  exibeSite: boolean;

  @Column("tinyint", { name: "PreCliente", default: () => "'0'" })
  preCliente: number;

  @Column("tinyint", {
    name: "AprovadoTreinamento",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  aprovadoTreinamento: boolean | null;

  @Column("tinyint", {
    name: "AtivoIntranet",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  ativoIntranet: boolean | null;

  @Column("date", { name: "DataAssContrato", nullable: true })
  dataAssContrato: string | null;

  @Column("int", { name: "idMaster", nullable: true })
  idMaster: number | null;

  @Column("varchar", { name: "Telefone0800", nullable: true, length: 45 })
  telefone0800: string | null;

  @Column("int", { name: "fluig", nullable: true })
  fluig: number | null;

  @Column("date", { name: "DataCancelContrato", nullable: true })
  dataCancelContrato: string | null;

  @Column("date", { name: "DataPrazoTipo", nullable: true })
  dataPrazoTipo: string | null;

  @Column("varchar", { name: "EmailCobranca", nullable: true, length: 255 })
  emailCobranca: string | null;

  @Column("varchar", { name: "GeraSenha", nullable: true, length: 1 })
  geraSenha: string | null;

  @Column("datetime", { name: "DataAtualizacao_Franquia", nullable: true })
  dataAtualizacaoFranquia: Date | null;

  @Column("int", { name: "DesmembrarBoletos", nullable: true })
  desmembrarBoletos: number | null;

  @Column("varchar", { name: "Telefone2", nullable: true, length: 45 })
  telefone2: string | null;

  @Column("varchar", { name: "Celular2", nullable: true, length: 45 })
  celular2: string | null;

  @Column("varchar", { name: "Email2", nullable: true, length: 255 })
  email2: string | null;

  @Column("int", { name: "TopExcellence", nullable: true })
  topExcellence: number | null;

  @Column("varchar", { name: "RegimeTributacao", nullable: true, length: 50 })
  regimeTributacao: string | null;

  @Column("datetime", { name: "DataTreinamento", nullable: true })
  dataTreinamento: Date | null;

  @Column("varchar", { name: "idCOLAdicionais", nullable: true, length: 255 })
  idColAdicionais: string | null;

  @Column("tinyint", {
    name: "Premium",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  premium: boolean | null;

  @Column("tinyint", {
    name: "ClienteRissi",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  clienteRissi: boolean | null;

  @OneToMany(() => Hotsites, (hotsites) => hotsites.clientesIdClientes2)
  hotsites: Hotsites[];
}
