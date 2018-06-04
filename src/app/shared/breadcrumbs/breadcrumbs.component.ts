import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  label = '';

  constructor( private router: Router,
              public title: Title,
              public meta: Meta ) {

     this.getDataRoute()
    .subscribe( data => {

      this.label = data.titulo;
      this.title.setTitle( 'AdminPro ' + data.titulo);  // Modificar el titulo de la pagina dinamicamente


      const metaTag: MetaDefinition = {  // Modificar lo meta de la pagina dinamicamente
        name: 'decription',
        content: this.label,
      };

      this.meta.updateTag(metaTag);

    });

  }

  getDataRoute() {
    return  this.router.events
    .filter( evento => evento instanceof ActivationEnd)   // para Filtrar solo los eventos del Activation End
    .filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null)  // para Filtrar solo el primero
    .map( (evento: ActivationEnd) => evento.snapshot.data );
  }

  ngOnInit() {
  }

}
