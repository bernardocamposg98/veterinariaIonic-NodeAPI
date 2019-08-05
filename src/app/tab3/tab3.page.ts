import { Component, OnInit } from '@angular/core';
import { Medicina } from '../interfaces/interfaces';
import { ApiService } from '../services/api.service';
import { Routes } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  articles: Medicina;
  nombre: string;
  descripcion: string;
  cantidad: string;
  costo: string;
  id: number;
  dataFromService:any="";

  constructor(private medicinasCRUD: ApiService, private alertCtrl: AlertController) {}

  ngOnInit() {
    this.medicinasCRUD.traerMedicinas()
    .subscribe(metodo => {
      console.log(metodo);
      this.articles = metodo;
    });
  }

  reload() {
    window.location.reload();
  }

  agregarMedicina() {
    var dataToSend = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      cantidad: this.cantidad,
      costo: this.costo
    };
    this.medicinasCRUD.agregarMedicina(dataToSend).subscribe(
      (dataReturnFromService)=>{
        this.dataFromService = JSON.stringify
        (dataReturnFromService);
        this.reload();
      });
  }

  eliminarMedicina(id: string) {
    console.log(id);
    this.medicinasCRUD.eliminarMedicina(id).subscribe(this.reload);
  }

  async editarMedicina(editValor: string, nombre: string, descripcion: string, cantidad: string, costo: string) {
    const alertInput = await this.alertCtrl.create({
      header: 'Editar Personal',
      message: 'Llene los campos',
      inputs: [{
        name: 'nombre',
        type: 'text',
        placeholder: 'Escriba el nombre',
        value: nombre
      },
      {
        name: 'descripcion',
        type: 'text',
        placeholder: 'Escriba la descripción',
        value: descripcion
      },
      {
        name: 'cantidad',
        type: 'text',
        placeholder: 'Escriba la cantidad',
        value: cantidad
      },
      {
        name: 'costo',
        type: 'text',
        placeholder: 'Escriba el costo',
        value: costo
      }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'Cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Se cancelo la acción');
          }
        }, {
          text: 'Aceptar',
          handler: (datos) => {
            var dataToSend = {
              nombre: datos.nombre,
              descripcion: datos.descripcion,
              cantidad: datos.cantidad,
              costo: datos.costo
            };
            console.log (dataToSend);
            this.medicinasCRUD.editarMedicina(dataToSend, editValor).subscribe(
              (dataReturnFromService)=>{
                this.dataFromService = JSON.stringify
                (dataReturnFromService);
                this.reload();
              });
            console.log('Se acepto la acción');
          }
        }
      ]
    });
    await alertInput.present();
  }

}
