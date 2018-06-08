import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert2';

@Injectable()
export class MedicoService {

  totalMedicos = 0;

  constructor(
        public http: HttpClient,
        public _usuarioService: UsuarioService
  ) { }

  cargarMedicos() {

    const url = URL_SERVICIOS + '/medico';

    return this.http.get( url )
            .map( (resp: any) => {

                this.totalMedicos = resp.total;
                return resp.medicos;

            });

  }

  buscarMedicos ( termino: string ) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;

    return this.http.get( url )
                .map( (resp: any) => resp.medicos );

  }

  borrarMedico ( id: string ) {

    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' +  this._usuarioService.token;

    return this.http.delete( url )
          .map( resp => {
            swal( 'Médico Borrado', 'Médico borrado correctamente', 'success');
            return resp;
          });


  }

}
