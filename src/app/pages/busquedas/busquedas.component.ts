import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusquedasService } from '../../services/busquedas.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Medico } from 'src/app/models/medico.model';
import { Hospital } from 'src/app/models/hospital.model';
import { environment } from 'src/environments/environment';

const baseUrl = environment.base_url;

@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.component.html',
  styles: [
  ]
})
export class BusquedasComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private busquedasService: BusquedasService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .subscribe( ({termino}) => {
        this.busquedaGlobal(termino);
      });

  }


  busquedaGlobal(termino: string){

    this.busquedasService.busquedaGlobal(termino)
      .subscribe( (resp: any) => {
        this.usuarios = resp.usuarios;
        this.medicos = resp.medicos;
        this.hospitales = resp.hospitales;

      })

  }


}
