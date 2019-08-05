import { Component, OnInit } from '@angular/core';
import { Empleado } from '../interfaces/interfaces';
import { ApiService } from '../services/api.service';
import { Routes } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
//  const url1: string;
export class Tab1Page implements OnInit {
  articles: Empleado; 
  nombre: string;
  cel: string;
  correo: string;
  puesto: string;
  id: number;
  dataFromService:any="";
  url1: string;
  usuario1: string;
  

  constructor(public nav: NavController,private empleadoCRUD: ApiService, private alertCtrl: AlertController) {}

  obtenerURL(){ 
    let urlapi = localStorage.getItem("link");
    this.url1 = urlapi;
    this.url1 =  "http://e7ba1582.ngrok.io/";
}

  ngOnInit() {
    let usuario = localStorage.getItem("usuario");
    if(usuario == "user" || usuario == "admin"){
    } else { this.nav.navigateForward('/');}
    this.empleadoCRUD.traerEmpleados()
    .subscribe(metodo => {
      console.log(metodo);
      this.articles = metodo;
      this.usuario1 = usuario;
    });
    this.obtenerURL();
  }

  reload() {
    window.location.reload();
  } 

  agregarEmpleado() {
    
    var dataToSend = {
      nombre: this.nombre,
      cel: this.cel,
      correo: this.correo,
      puesto: this.puesto
    };
    this.empleadoCRUD.agregarEmpleado(dataToSend).subscribe(
      (dataReturnFromService)=>{
        this.dataFromService = JSON.stringify
        (dataReturnFromService);
        this.reload();
      });
  }

  eliminarEmpleado(id: string) {
    console.log(id);
    this.empleadoCRUD.eliminarEmpleado(id).subscribe(this.reload);
  }

  async editarEmpleado(editValor: string, nombre: string, cel: string, correo: string, puesto: string) {
    const alertInput = await this.alertCtrl.create({
      header: 'Editar Personal',
      message: 'Llene los campos',
      inputs: [{
        name: 'Nombre',
        type: 'text',
        placeholder: 'Escriba el nombre',
        value: nombre
      },
      {
        name: 'Cel',
        type: 'text',
        placeholder: 'Escriba el celular',
        value: cel
      },
      {
        name: 'Correo',
        type: 'text',
        placeholder: 'Escriba el correo',
        value: correo
      },
      {
        name: 'Puesto',
        type: 'text',
        placeholder: 'Escriba el puesto',
        value: puesto
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
              nombre: datos.Nombre,
              cel: datos.Cel,
              correo: datos.Correo,
              puesto: datos.Puesto
            };
            console.log (dataToSend);
            this.empleadoCRUD.editarEmpleado(dataToSend, editValor).subscribe(
              (dataReturnFromService)=>{
                this.dataFromService = JSON.stringify
                (dataReturnFromService);
                this.reload();
              })
            console.log('Se acepto la acción');
          }
        }
      ]
    });
    await alertInput.present();
  }
}
