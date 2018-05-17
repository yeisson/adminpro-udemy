import { Component, OnInit, OnDestroy } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    this.subscription = this.regresaObservable()
      .retry(2)
      .subscribe(
        numero => {console.log('Sub ', numero); } ,
        error => { console.log ('Error en el obs (2 veces)', error); },
        () => console.log ( 'El observable termino!' )
      );

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  regresaObservable() {

    const obs = new Observable( observer => {

      let contador = 0;

      const intervalo = setInterval( () => {

        contador += 1;

        const salida = {
          valor: contador
        };

        observer.next( salida );

        // if ( contador === 3 ) {
        //   clearInterval( intervalo );
        //   observer.complete();
        // }

        // if ( contador === 2 ) {
        //   observer.error('Auxilio');
        // }

      }, 500 );

    })
    .map( (resp: any) => { // cambia el valor de respuesta

      return resp.valor;
    })
    .filter( (valor, index) => {  // siempre devuelve un boolean

      if ( valor % 2 === 1 ) { // Solo impares
        return true;
      } else {
        return false;
      }

    })
    ;

      return obs;

  }

}
