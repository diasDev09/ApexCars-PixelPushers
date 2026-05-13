/**
 * Retornado por: GET /carros/marcas
 * Exemplo de resposta: { "codigo": "21", "nome": "FIAT" }
 */
export interface Marca {
  codigo: string;  // ID usado nas próximas chamadas (é string, não number!)
  nome: string;
}

/**
 * Retornado por: GET /carros/marcas/{marca}/modelos
 * A API envolve os modelos e anos dentro de um objeto pai,
 * por isso precisamos dessa interface "wrapper".
 */
export interface ModeloResponse {
  modelos: Modelo[];
  anos: Ano[];
}

export interface Modelo {
  codigo: number;  // Aqui é number — a FIPE mistura os tipos entre endpoints!
  nome: string;
}

/**
 * Retornado por: GET /carros/marcas/{marca}/modelos/{modelo}/anos
 * Exemplo: { "codigo": "2016-3", "nome": "2016 Gasolina" }
 */
export interface Ano {
  codigo: string;  // Formato "2016-3" (ano + tipo de combustível)
  nome: string;
}

/**
 * Retornado por: GET /carros/marcas/{marca}/modelos/{modelo}/anos/{ano}
 * Este é o objeto mais completo — contém o valor FIPE.
 */
export interface VeiculoDetalhe {
  Valor: string;          // "R$ 45.590,00" — já vem formatado como string!
  Marca: string;          // "FIAT"
  Modelo: string;         // "ARGO DRIVE 1.0 6V Flex"
  AnoModelo: number;      // 2016
  Combustivel: string;    // "Gasolina"
  CodigoFipe: string;     // "001004-9"
  MesReferencia: string;  // "novembro de 2024"
  TipoVeiculo: number;    // 1 = carro, 2 = moto, 3 = caminhão
  SiglaCombustivel: string; // "G", "D", "Á"
  DataConsulta: string;   // "sexta-feira, 15 de novembro de 2024 14:22"
}