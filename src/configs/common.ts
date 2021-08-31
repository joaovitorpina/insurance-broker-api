import {URL} from 'url';

export namespace Common{
    export function isNullOrWhitespace(string: string): boolean {
      return string == null || string.trim() === '';
    }

    export function trimLeft(string: string, charlist:string) : string {
      return string.replace(new RegExp(`^[${charlist}]+`), '');
    }

    export function formatarTelefone(telefone: string) : string {
      let telefoneFormatado = telefone.replace('(', '')
        .replace(')', '').replace('-', '');
      telefoneFormatado = telefoneFormatado.split(' ').join('');

      return [`(${telefoneFormatado.substr(0, 2)})`, telefoneFormatado.substr(2)].join('');
    }

    export function extrairSubdominio(url: string): string | null {
      const site = new URL(url.replace('www.', ''));
      const siteSplit = site.host.split('.');

      if (siteSplit.length === 4) {
        return siteSplit[0];
      }
      return null;
    }
}
