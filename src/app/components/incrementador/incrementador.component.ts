import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('nombre') leyenda = 'Leyenda';

  // tslint:disable-next-line:no-inferrable-types
  @Input() progreso: number = 50;

  constructor() {
    // console.log ( 'leyenda', this.leyenda );
    console.log ( 'progreso', this.progreso);
  }

  ngOnInit() {
    // console.log ( 'leyenda', this.leyenda );
    console.log ( 'progreso', this.progreso);
  }

  cambiarValor ( valor ) {

    if ( this.progreso >= 100 && valor > 0 ) {
      this.progreso = 100;
      return;
    }

    if ( this.progreso <= 0 && valor < 0) {
      this.progreso = 0;
      return;
    }
    this.progreso = this.progreso + valor;
  }

}
