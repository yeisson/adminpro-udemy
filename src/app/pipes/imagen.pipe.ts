import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import { ChartsModule } from 'ng2-charts';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {

    let url = URL_SERVICIOS + '/img';

    if ( !img ) {
      return url + '/usuarios/xxx';  // devuelve no image
    }

    if ( img.indexOf('https') >= 0 ) {  // si viene de google
      return img;
    }

    switch (tipo) {
      case 'usuario':
        url += '/usuarios/' + img;
      break;

      case 'medico':
        url += '/medicos/' + img;
      break;

      case 'hospital':
        url += '/hospitales/' + img;
      break;

      default:
        console.log ('tipos de imagen no existe');
        url += '/usuarios/xxx';
      break;
    }

    return url;
  }

}
