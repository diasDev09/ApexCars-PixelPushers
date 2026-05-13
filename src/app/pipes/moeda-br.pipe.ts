import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moedaBr',
  standalone: true
})
export class MoedaBrPipe implements PipeTransform {
  transform(valor: string | number): string {
    if (!valor) return 'R$ 0,00';

    // A FIPE retorna o valor como string "R$ 45.590,00"
    // Se já vier formatado, retorna direto
    if (typeof valor === 'string' && valor.includes('R$')) {
      return valor;
    }

    // Se vier como número ou string numérica, formata
    const numero = typeof valor === 'string'
      ? parseFloat(valor.replace(',', '.'))
      : valor;

    return numero.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }
}