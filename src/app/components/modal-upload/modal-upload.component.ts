import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { SubirArchivoService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  // oculto = '';

  imagenSubir: File;
  imagenTemp: File;

  constructor(
        public _subirArchivoService: SubirArchivoService,
        public _modalUploadSercice: ModalUploadService
  ) {

  }

  ngOnInit() {
  }

  cerrarModal() {
    this.imagenSubir = null;
    this.imagenTemp = null;
    this._modalUploadSercice.ocultarModal();
  }

  subirImagen( ) {

    this._subirArchivoService.subirArchivo( this.imagenSubir, this._modalUploadSercice.tipo, this._modalUploadSercice.id )
            .then( resp => {

              this._modalUploadSercice.notificacion.emit( resp );
              this.cerrarModal();

            })
            .catch( resp => {
              console.log( 'Error en la carga... ');
            });

  }

  seleccionImagen( archivo: File ) {

    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) { // revisar que sea una imagen
      swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    const reader = new FileReader(); // Para previsualizar la imagen
    const urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => {
      this.imagenTemp = reader.result;
    };


  }

}
