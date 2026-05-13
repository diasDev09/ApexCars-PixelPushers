import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';

import { VeiculoService } from '../services/veiculo';
import { inject } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})

export class HomePage implements OnInit {
  constructor(private veiculoService: VeiculoService) {}

  ngOnInit() {
    this.veiculoService.getMarcas().subscribe({
      next: (marcas) => console.log('Marcas recebidas:', marcas),
      error: (err) => console.error('Erro:', err)
    });
  }
}