import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert2';
import { Medico } from '../../models/medico.model';

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

  guardarMedico( medico: Medico) {

    let url = URL_SERVICIOS + '/medico';

    if ( medico._id ) {
      // actualizando
      url += '/' + medico._id;
      url += '?token=' +  this._usuarioService.token;

      return this.http.put( url, medico )
              .map( (resp: any) => {
                swal( 'Medico Actualizado', medico.nombre , 'success');
                return resp.medico;
              });


    } else {
      // Creando
      url += '?token=' +  this._usuarioService.token;

      return this.http.post( url, medico )
              .map( (resp: any) => {
                swal( 'Medico Creado', medico.nombre , 'success');
                return resp.medico;
              });
    }

  }

  cargarMedico ( id: string ) {

    const url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get( url )
        .map( (resp: any) => {
          return resp.medico;
        }) ;

  }

}
