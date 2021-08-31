import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Clientes } from "./Clientes";

@Index("Prefixo_UNIQUE", ["prefixo"], { unique: true })
@Index("fk_Hotsites_Clientes_idx", ["clientesIdClientes"], {})
@Entity("hotsites", { schema: "seguralta" })
export class Hotsites {
  @PrimaryGeneratedColumn({ type: "int", name: "idHotsites" })
  idHotsites: number;

  @Column("varchar", { name: "Prefixo", unique: true, length: 45 })
  prefixo: string;

  @Column("varchar", { name: "EmailForm", length: 45 })
  emailForm: string;

  @Column("date", { name: "DataCriacao", nullable: true })
  dataCriacao: string | null;

  @Column("int", { name: "Status", default: () => "'0'" })
  status: number;

  @Column("int", { primary: true, name: "Clientes_idClientes" })
  clientesIdClientes: number;

  @Column("varchar", { name: "TituloSEO", nullable: true, length: 255 })
  tituloSeo: string | null;

  @Column("varchar", { name: "DescricaoSEO", nullable: true, length: 255 })
  descricaoSeo: string | null;

  @Column("varchar", { name: "TagsSEO", nullable: true, length: 255 })
  tagsSeo: string | null;

  @Column("text", { name: "Pixel_Facebook", nullable: true })
  pixelFacebook: string | null;

  @Column("text", { name: "Tag_Head_Conclusao", nullable: true })
  tagHeadConclusao: string | null;

  @Column("text", { name: "Pixel_AdWordsGeral", nullable: true })
  pixelAdWordsGeral: string | null;

  @Column("text", { name: "Tag_Head", nullable: true })
  tagHead: string | null;

  @Column("text", { name: "Tag_Footer", nullable: true })
  tagFooter: string | null;

  @Column("text", { name: "GoogleAnalytics", nullable: true })
  googleAnalytics: string | null;

  @Column("text", { name: "Pixel_AdWords", nullable: true })
  pixelAdWords: string | null;

  @ManyToOne(() => Clientes, (clientes) => clientes.hotsites, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "Clientes_idClientes", referencedColumnName: "idClientes" },
  ])
  clientesIdClientes2: Clientes;
}
