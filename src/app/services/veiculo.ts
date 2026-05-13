import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Importamos todas as interfaces que criamos no models
import { Marca, ModeloResponse, Ano, VeiculoDetalhe } from '../models/veiculo.model';

@Injectable({
  providedIn: 'root' // Isso registra o service como singleton em todo o app
})
export class VeiculoService {

  // URL base da API pública da FIPE — sem proxy, sem localhost
  private readonly BASE_URL = 'https://parallelum.com.br/fipe/api/v1';

  // O HttpClient é injetado automaticamente pelo Angular
  constructor(private http: HttpClient) {}

  /**
   * Busca todas as marcas de carros disponíveis na FIPE.
   * Endpoint: GET /carros/marcas
   * Retorna: Observable<Marca[]> — uma lista de { codigo, nome }
   */
  getMarcas(): Observable<Marca[]> {
    return this.http.get<Marca[]>(`${this.BASE_URL}/carros/marcas`);
  }

  /**
   * Busca os modelos de uma marca específica.
   * Endpoint: GET /carros/marcas/{marca}/modelos
   * Retorna: Observable<ModeloResponse> — objeto com { modelos[], anos[] }
   */
  getModelos(codigoMarca: string): Observable<ModeloResponse> {
    return this.http.get<ModeloResponse>(
      `${this.BASE_URL}/carros/marcas/${codigoMarca}/modelos`
    );
  }

  /**
   * Busca os anos disponíveis para um modelo específico.
   * Endpoint: GET /carros/marcas/{marca}/modelos/{modelo}/anos
   * Retorna: Observable<Ano[]> — lista de { codigo, nome }
   */
  getAnos(codigoMarca: string, codigoModelo: number): Observable<Ano[]> {
    return this.http.get<Ano[]>(
      `${this.BASE_URL}/carros/marcas/${codigoMarca}/modelos/${codigoModelo}/anos`
    );
  }

  /**
   * Busca o detalhe completo do veículo, incluindo o valor FIPE.
   * Este é o endpoint final da cascata.
   * Endpoint: GET /carros/marcas/{marca}/modelos/{modelo}/anos/{ano}
   * Retorna: Observable<VeiculoDetalhe> — objeto completo com Valor, Marca, etc.
   */
  getDetalhe(
    codigoMarca: string,
    codigoModelo: number,
    codigoAno: string
  ): Observable<VeiculoDetalhe> {
    return this.http.get<VeiculoDetalhe>(
      `${this.BASE_URL}/carros/marcas/${codigoMarca}/modelos/${codigoModelo}/anos/${codigoAno}`
    );
  }
}