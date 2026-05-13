import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root' // uma única instância para o app inteiro (singleton)
})
export class VeiculoService {

  // URL base da FIPE API — definida aqui para não repetir em cada método
  private readonly baseUrl = 'https://parallelum.com.br/fipe/api/v1';

  // inject() busca o HttpClient que foi registrado no main.ts com provideHttpClient()
  private http = inject(HttpClient);

  // Passo 1: retorna todas as marcas disponíveis
  // ex: [{ codigo: "1", nome: "Acura" }, { codigo: "2", nome: "Agrale" }, ...]
  getMarcas() {
    return this.http.get<any[]>(`${this.baseUrl}/marcas`);
  }

  // Passo 2: dado o código de uma marca, retorna seus modelos
  // ex: getMarcas() retornou código "59" para Volkswagen
  //     getModelos("59") retorna todos os modelos da VW
  getModelos(codigoMarca: string) {
    return this.http.get<any>(`${this.baseUrl}/marcas/${codigoMarca}/modelos`);
  }

  // Passo 3: dado marca + modelo, retorna os anos disponíveis
  // você vai precisar desses anos para chegar ao valor final
  getAnos(codigoMarca: string, codigoModelo: string) {
    return this.http.get<any[]>(
      `${this.baseUrl}/marcas/${codigoMarca}/modelos/${codigoModelo}/anos`
    );
  }

  // Passo 4: com marca + modelo + ano, retorna o valor FIPE completo
  // esse é o método que vai alimentar a página de detalhes
  getValor(codigoMarca: string, codigoModelo: string, codigoAno: string) {
    return this.http.get<any>(
      `${this.baseUrl}/marcas/${codigoMarca}/modelos/${codigoModelo}/anos/${codigoAno}`
    );
  }
}