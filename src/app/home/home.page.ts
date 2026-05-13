import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { forkJoin } from 'rxjs';

import { VeiculoService } from '../services/veiculo.service';
import { ImagemService } from '../services/imagem.service';
import { Marca } from '../models/veiculo.model';  

// Criamos uma interface local que combina os dados que o template precisa.
// Cada item da lista terá a marca + a URL da imagem já resolvida.
interface MarcaComImagem {
  marca: Marca;
  imagemUrl: string;

}@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})

export class HomePage implements OnInit {

  // O template vai reagir a essas propriedades automaticamente
  marcas: MarcaComImagem[] = [];
  marcasFiltradas: MarcaComImagem[] = []; // lista que o @for usa de verdade
  carregando = true; // controla o estado de loading

  constructor(
    private veiculoService: VeiculoService,
    private imagemService: ImagemService,
    private router: Router
  ) {}

  ngOnInit() {
    this.carregarMarcas();
  }

  carregarMarcas() {
    this.carregando = true;

    // Passo 1: busca todas as marcas na FIPE
    this.veiculoService.getMarcas().subscribe(marcas => {

      // Passo 2: para cada marca, dispara uma busca de imagem
      // forkJoin espera TODOS os Observables completarem e emite um array
      // com todos os resultados na mesma ordem. É o "Promise.all" do RxJS.
      const buscasDeImagem = marcas.map(marca =>
        this.imagemService.buscarImagem(`${marca.nome} carro`)
      );

      forkJoin(buscasDeImagem).subscribe(imagens => {
        // Passo 3: combina marcas e imagens pelo índice
        this.marcas = marcas.map((marca, i) => ({
          marca,
          imagemUrl: imagens[i]
        }));
        this.marcasFiltradas = [...this.marcas]; // começa mostrando todas
        this.carregando = false;
      });
    });
  }

  // Chamado pelo ion-searchbar a cada letra digitada
  filtrar(evento: any) {
    const termo = evento.detail.value?.toLowerCase() ?? '';
    this.marcasFiltradas = this.marcas.filter(m =>
      m.marca.nome.toLowerCase().includes(termo)
    );
  }

  // Navega para detalhes passando o código da marca como parâmetro de rota
  abrirMarca(marca: Marca) {
    this.router.navigate(['/detalhes', marca.codigo]);
  }
}