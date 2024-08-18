import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medico.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [],
})
export class MedicosComponent implements OnInit, OnDestroy {
  public medicos: Medico[] = [];
  public cargando: boolean = true;
  private imgSubs: Subscription

  constructor(
    private medicoService: MedicoService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService,
  ) {}

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(
      delay(100),
    )
    .subscribe( img => this.cargarMedicos());
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos()
      .subscribe((medicos: Medico[]) => {
        this.medicos = medicos;
        this.cargando = false;
    });
  }

  borrarMedico(medico){


    Swal.fire({
      title: "¿Borrar usuario?",
      text: `Está a punto de borrar a ${ medico.nombre}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, borrar"
    }).then((result) => {

      if(result.value){
        this.medicoService.borrarMedico(medico._id)
          .subscribe( resp => {
            Swal.fire({
              title: "Borrado",
              text: "El médico ha sido borrado",
              icon: "success"
            });

            this.cargarMedicos();

          });
      }
    });
  }

  buscar(termino: string){

    if(termino.length === 0) return this.cargarMedicos();

    this.busquedasService.buscar('medicos', termino)
      .subscribe( resp => {this.medicos = resp} );
  }

  abrirModal(medico: Medico) {
    this.modalImagenService.abriModal('medicos', medico._id, medico.img);
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }

}
