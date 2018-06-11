import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import swal from 'sweetalert2';
import { wrapIntoObservable } from '@angular/router/src/utils/collection';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }

  renuevaToken() {
    let url = URL_SERVICIOS + '/login/renuevatoken';
    url += '?token=' + this.token;

    return this.http.get( url )
        .map( (resp: any) => {
          this.token = resp.token;
          localStorage.setItem('token', this.token);
          console.log('token renovado');

          return true;
        })
        .catch( err => {
            this.router.navigate(['/login']);
            swal('No se pudo renovar token', 'No fue posible renovar el token', 'error');
            return Observable.throw( err );
        });

  }

  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  cargarStorage() {
    if ( localStorage.getItem( 'token' ) ) {
      this.token = localStorage.getItem( 'token' );
      this.usuario = JSON.parse(localStorage.getItem( 'usuario' ));
      this.menu = JSON.parse(localStorage.getItem( 'menu' ));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  guardarStorage( id: string, token: string, usuario: Usuario, menu: any) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario) );
    localStorage.setItem('menu', JSON.stringify(menu) );

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

  loginGoogle( token: string ) {

    const url = URL_SERVICIOS + '/login/google';

    return this.http.post ( url , { token: token} )
          .map( (resp: any) => {
            this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu);
            return true;
          });

  }

  login( usuario: Usuario, recordar: boolean = false) {

    if ( recordar ) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICIOS + '/login';
    return this.http.post( url, usuario )
        .map( (resp: any) => {

          this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu);
          return true;
        })
        .catch( err => {

          swal('Error en el login', err.error.mensaje, 'error');

          return Observable.throw( err );
        });

  }

  crearUsuario( usuario: Usuario ) {
    const url = URL_SERVICIOS + '/usuario';

    return this.http.post( url, usuario )
        .map( (resp: any) => {
          swal('Usuaro Creado', usuario.email, 'success' );
          return resp.usuario;
        })
        .catch( err => {

          swal(err.error.mensaje, err.error.errors.message, 'error');
          return Observable.throw( err );
        });

  }

  actualizarUsuario( usuario: Usuario ) {

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put( url, usuario)
          .map( (resp: any) => {

            if ( usuario._id === this.usuario._id ) {
              this.guardarStorage(resp.usuario._id, this.token, resp.usuario, this.menu );
            }

            swal('Usuario actualizado', usuario.nombre, 'success');
            return true;

          })
          .catch( err => {

            swal(err.error.mensaje, err.error.errors.message, 'error');
            return Observable.throw( err );
          });

  }

  cambiarImagen( archivo: File, id: string) {

    this._subirArchivoService.subirArchivo( archivo, 'usuarios', id)
          .then( (resp: any) => {

            this.usuario.img = resp.usuario.img;
            swal( 'Imagen actulizada', this.usuario.nombre, 'success' );

            this.guardarStorage ( id, this.token, this.usuario, this.menu);

          })
          .catch( resp => {
            console.log( resp );
          });


  }

  cargarUsuarios( desde: number = 0) {

    const url = URL_SERVICIOS + '/usuario?desde=' + desde;

    return this.http.get( url );

  }

  buscarUsuario ( termino: string ) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;

    return this.http.get( url )
                .map( (resp: any) => resp.usuarios );

  }

  borrarUsuario( id: string ) {

    const url = URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token;

    return this.http.delete( url );

  }


}
