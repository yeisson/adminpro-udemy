import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde = 0;
  totalRegistros = 0;
  cargando = true;
  hospital: Hospital;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();

    this._modalUploadService.notificacion
            .subscribe( resp => this.cargarHospitales() );
  }

  mostrarModal( id: string ) {
    this._modalUploadService.mostrarModal( 'hospitales',  id );
  }

  cargarHospitales() {

    this.cargando = true;

    this._hospitalService.cargarHospitales( this.desde )
      .subscribe(
        (resp: any) => {

          this.totalRegistros = resp.total;
          this.hospitales = resp.hospitales;

          this.cargando = false;

        }
      );
  }

  cambiarDesde( valor: number) {

    const desde = this.desde + valor;

    console.log( desde );

    if ( desde >= this.totalRegistros ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarHospitales();

  }

  borrarUsuario( hospital: Hospital ) {

    swal({
      title: '¿Está seguro?',
      text: 'Esta a punto de borrar a ' + hospital.nombre,
      type: 'warning',
      showCancelButton: true,
      // confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33',
      // confirmButtonText: 'Si, Borrarlo!'
    }).then((result) => {
      if (result.value) {

        this._hospitalService.borrarHospital( hospital._id )
                .subscribe( resp => {
                  console.log(result.value);
                  this.cargarHospitales();

                  swal(
                    'Borrado!',
                    'El hospital a sido borrado correctamente',
                    'success'
                  );
                });


      }
    });

  }


  buscarHospital ( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;

    this._hospitalService.buscarHospital ( termino )
        .subscribe(
          (hospitales: Hospital[]) => {
            console.log(hospitales);
            this.cargando = false;
            this.hospitales = hospitales;
          }
        );

  }

  guardarHospital( hospital: Hospital ) {
    this._hospitalService.actualizarHospital( hospital )
              .subscribe();
  }

  crearHospital() {
    swal({
      title: 'Ingrese Hospital',
      html:
        '<input id="swalinput1" class="swal2-input">',
      focusConfirm: false,
      preConfirm: function() {
        return new Promise( function(resolve)  {
          resolve(
            document.getElementById('swalinput1')
          );
        });
      }
    }).then( (result) => {
      // console.log(result.value.value);
      this.hospital = {nombre: result.value.value};

      this._hospitalService.crearHospital(this.hospital)
          .subscribe(
            resp => {
              // console.log(resp);
            }
      );

    }).catch(swal.noop);
  }


}
