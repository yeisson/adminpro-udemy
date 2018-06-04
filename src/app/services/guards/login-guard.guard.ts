import { Injectable } from '@angular/core';
import { CanActivate, Router, } from '@angular/router';

// import { UsuarioService } from '../service.index';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class LoginGuardGuard implements CanActivate {

  constructor( public _usuarioService: UsuarioService,
                public router: Router ) {}

  canActivate() {

    if ( this._usuarioService.estaLogueado() ) {
      // console.log( 'Paso el GUARD' );
      return true;
    } else {
      console.log( 'bloqueado el GUARD' );
      this.router.navigate(['login']);
      return false;
    }
  }
}
