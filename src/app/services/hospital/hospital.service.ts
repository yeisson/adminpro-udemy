import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Hospital } from '../../models/hospital.model';
import swal from 'sweetalert2';

@Injectable()
export class HospitalService {

  hospital: Hospital;
  token: string;

  constructor( public http: HttpClient,
              public router: Router
  ) {
    this.cargarStorage();
  }

  cargarStorage() {
    if ( localStorage.getItem( 'token' ) ) {
      this.token = localStorage.getItem( 'token' );
      // this.usuario = JSON.parse(localStorage.getItem( 'usuario' ));
    } else {
      this.token = '';
      // this.usuario = null;
    }

  }

  cargarHospitales( desde: number = 0) {

    const url = URL_SERVICIOS + '/hospital?desde=' + desde;

    return this.http.get( url );

  }

  obtenerHospital ( id: string ) {

    const url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.get( url );
  }

  borrarHospital( id: string ) {

    const url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this.token;

    return this.http.delete( url );

  }

  buscarHospital ( termino: string ) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;

    return this.http.get( url )
                .map( (resp: any) => resp.hospitales );

  }

  actualizarHospital( hospital: Hospital ) {

    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this.token;

    return this.http.put( url, hospital)
          .map( (resp: any) => {


            swal('Usuario actualizado', hospital.nombre, 'success');

            return true;

          });

  }

  crearHospital( hospital: Hospital ) {
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this.token;

    return this.http.post( url, hospital )
        .map( (resp: any) => {
          swal('Hospital Creado', hospital.nombre, 'success' );
          return resp.hospital;
        });

  }

}
