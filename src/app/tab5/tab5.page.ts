import { Component, OnInit } from '@angular/core';
import { Sucursal } from '../interfaces/interfaces';
import { ApiService } from '../services/api.service';
import { Routes } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
 
  articles: Sucursal;
  nombre: string;
  estado: string;
  direccion: string;
  gerente: string;
  cel: string;
  id: number;
  dataFromService:any="";
  usuario1: string;

  constructor(public nav: NavController,private sucursalCRUD: ApiService, private alertCtrl: AlertController) {}

  ngOnInit() {
    let usuario = localStorage.getItem("usuario");
    if(usuario == "user" || usuario == "admin"){
    } else { this.nav.navigateForward('/');}
    this.sucursalCRUD.traerSucursales()
    .subscribe(metodo => {
      console.log(metodo);
      this.articles = metodo;
      this.usuario1 = usuario;
    });
  }

  reload() {
    window.location.reload();
  }

  agregarSucursal() {
    var dataToSend = {
      nombre: this.nombre,
      estado: this.estado,
      direccion: this.direccion,
      gerente: this.gerente,
      cel: this.cel
    };
    this.sucursalCRUD.agregarSucursal(dataToSend).subscribe(
      (dataReturnFromService)=>{
        this.dataFromService = JSON.stringify
        (dataReturnFromService);
        this.reload();
      });
  }

  eliminarSucursal(id: string) {
    console.log(id);
    this.sucursalCRUD.eliminarSucursal(id).subscribe(this.reload);
  }

  async editarSucursal(editValor: string, nombre: string, estado: string, direccion: string, gerente: string) {
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
        name: 'estado',
        type: 'text',
        placeholder: 'Escriba la descripción',
        value: estado
      },
      {
        name: 'direccion',
        type: 'text',
        placeholder: 'Escriba la direccion',
        value: direccion
      },
      {
        name: 'gerente',
        type: 'text',
        placeholder: 'Escriba el gerente',
        value: gerente
      },
      {
        name: 'cel',
        type: 'text',
        placeholder: 'Escriba el cel',
        value: gerente
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
              estado: datos.estado,
              direccion: datos.direccion,
              gerente: datos.gerente,
              cel: datos.cel
            };
            console.log (dataToSend);
            this.sucursalCRUD.editarSucursal(dataToSend, editValor).subscribe(
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
