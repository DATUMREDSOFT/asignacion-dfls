import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MegaMenuItem } from 'primeng/api';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html',
  styleUrls: ['./asignacion.component.scss']
})
export class AsignacionComponent {
  items!: MenuItem[];
  home!: MenuItem;
  rangeDates!: Date[];
  selectedValues: string[] = [];
  checked: boolean = false;
  rangeValues: number[] = [8, 18]

  selectedIngeniero!: any;
  selectedCliente!: any;
  selectedContrato!: any;
  text!: any;
  countries: any[] = [];



  jsonSend = {

    "ingenieroId": "",
    "contratoId": "",
    "nombre": "",
    "fechaInicio": "",
    "fechaFin": "",
    "todoDia": true,
    "horaInicio": "",
    "horaFin": "",
    "creadoPor": "USR-234"

  }

  listaIngenieros: any[] = [];
  listaClientes: any[] = [];
  listaContratosCLiente: any[] = [];

  constructor(private api: ApiService) {
    this.getIngenieros();
    this.getClientesActivos();
    this.getContratosPorCliente();
  }

  getIngenieros() {
    this.api.getIngenierosActivos().subscribe(response => {
      this.listaIngenieros = response.ingenieros;
    });
  }

  getClientesActivos() {
    this.api.getClientesActivos().subscribe(response => {
      this.listaClientes = response.clientes;
    });
  }

  getContratosPorCliente() {

  }

  ngOnInit(): any {

    this.countries = [
      { name: 'Australia', code: 'AU' },
      { name: 'Brazil', code: 'BR' },
      { name: 'China', code: 'CN' },
      { name: 'Egypt', code: 'EG' },
      { name: 'France', code: 'FR' },
      { name: 'Germany', code: 'DE' },
      { name: 'India', code: 'IN' },
      { name: 'Japan', code: 'JP' },
      { name: 'Spain', code: 'ES' },
      { name: 'United States', code: 'US' }
    ];

    this.items = [
      /*  {
         label: 'Quit',
         icon: 'pi pi-fw pi-power-off',
         style: {'margin-left': 'auto'}
       } */
    ];
  }

  changeCliente(evt: any) {
    console.log('cambia', evt);
    this.api.getContratosPorCliente(evt.id).subscribe(response => {
      this.listaContratosCLiente = response.contratos;
    });
  }

  salvarCambios() {
    try {
      this.jsonSend.horaInicio = "8";
      this.jsonSend.horaFin = "18";
      this.jsonSend.ingenieroId = this.selectedIngeniero.id;
      this.jsonSend.contratoId = this.selectedContrato.contratoId;
      this.jsonSend.fechaInicio = this.rangeDates[0].toISOString();
      this.jsonSend.fechaFin = this.rangeDates[1].toISOString();


      if (!this.jsonSend.todoDia) {
        this.jsonSend.horaInicio = this.rangeValues[0].toString();
        this.jsonSend.horaFin = this.rangeValues[1].toString();
      }



      if (this.jsonSend.nombre != '') {
        this.api.postAsignacion(this.jsonSend).subscribe(response => {
          console.log('postAsignacion', response);
        });
      }
      else {
        alert('Formulario no valido');
      }
    } catch (error) {
      alert('Formulario no valido');
    }
  }
}
