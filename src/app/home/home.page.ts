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

   // inject() pede ao Angular o VeiculoService que foi registrado com providedIn: 'root'
  private veiculoService = inject(VeiculoService);

  ngOnInit() {
    // se o HttpClient estiver configurado corretamente, isso vai imprimir
    // a lista de marcas da FIPE no console do browser
    this.veiculoService.getMarcas().subscribe(marcas => {
      console.log(marcas); // confirma que a FIPE API está respondendo
    });
  }
}