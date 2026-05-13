// src/app/pages/detalhes/detalhes.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { switchMap } from 'rxjs/operators';

import { VeiculoService } from '../services/veiculo.service';
import { ImagemService } from '../services/imagem.service';
import { MoedaBrPipe } from '../pipes/moeda-br.pipe'; // pipe customizado da Fase 4
import { Modelo } from '../models/veiculo.model';
import { VeiculoDetalhe } from '../models/veiculo.model';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  standalone: true,
  imports: [CommonModule, IonicModule, MoedaBrPipe]
})
export class DetalhesPage implements OnInit {

  // Dados que o template vai consumir
  codigoMarca: string = '';
  modelos: Modelo[] = [];
  modeloSelecionado: Modelo | null = null;
  detalhe: VeiculoDetalhe | null = null;
  imagemUrl: string = '';
  carregando = false;

  constructor(
    private route: ActivatedRoute, // lê os parâmetros da URL atual
    private router: Router,
    private veiculoService: VeiculoService,
    private imagemService: ImagemService
  ) {}

  ngOnInit() {
    // ActivatedRoute.snapshot.params lê os parâmetros da URL no momento do carregamento.
    // É a forma mais simples quando a página não precisa reagir a mudanças de parâmetro
    // enquanto está aberta (o que é nosso caso).
    this.codigoMarca = this.route.snapshot.params['codigoMarca'];
    this.carregarModelos();
  }

  carregarModelos() {
    this.carregando = true;
    this.veiculoService.getModelos(this.codigoMarca).subscribe(modelos => {
      this.modelos = modelos;
      this.carregando = false;
    });
  }

  // Chamado quando o usuário seleciona um modelo no ion-select
  selecionarModelo(evento: any) {
    const codigoModelo = evento.detail.value;
    this.modeloSelecionado = this.modelos.find(m => m.codigo === codigoModelo) || null;

    if (!this.modeloSelecionado) return;

    this.carregando = true;

    // switchMap encadeia as chamadas: primeiro busca os anos,
    // depois usa o primeiro ano disponível para buscar o valor.
    // Se o usuário trocar de modelo antes da resposta chegar,
    // switchMap cancela a requisição anterior automaticamente — elegante!
    this.veiculoService.getAnos(this.codigoMarca, codigoModelo)
      .pipe(
        switchMap(anos => {
          // Pega o primeiro ano da lista (geralmente "32000-3" que significa "zero km")
          const primeiroAno = anos[0];
          return this.veiculoService.getValor(
            this.codigoMarca,
            codigoModelo,
            primeiroAno.codigo
          );
        })
      )
      .subscribe(detalhe => {
        this.detalhe = detalhe;
        this.carregando = false;

        // Busca imagem usando marca + modelo para maior relevância
        const termoBusca = `${detalhe.Marca} ${detalhe.Modelo} car`;
        this.imagemService.buscarImagem(termoBusca).subscribe(url => {
          this.imagemUrl = url;
        });
      });
  }

  voltar() {
    this.router.navigate(['/home']);
  }
}