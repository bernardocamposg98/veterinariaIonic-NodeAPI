import { Component, OnInit } from '@angular/core';
import { Producto } from '../interfaces/interfaces';
import { ApiService } from '../services/api.service';
import { Routes } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  
  articles: Producto;
  nombre: string;
  descripcion: string;
  cantidad: string;
  costo: string;
  id: number;
  dataFromService:any="";
  usuario1: string;

  constructor(public nav: NavController,private productoCRUD: ApiService, private alertCtrl: AlertController) {}

  ngOnInit() {
    let usuario = localStorage.getItem("usuario");
    if(usuario == "user" || usuario == "admin"){
    } else { this.nav.navigateForward('/');}
    this.productoCRUD.traerProductos()
    .subscribe(metodo => {
      console.log(metodo);
      this.articles = metodo;
      this.usuario1 = usuario;
    });
  }

  reload() {
    window.location.reload();
  }

  agregarProducto() {
    var dataToSend = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      cantidad: this.cantidad,
      costo: this.costo
    };
    this.productoCRUD.agregarProducto(dataToSend).subscribe(
      (dataReturnFromService)=>{
        this.dataFromService = JSON.stringify
        (dataReturnFromService);
        this.reload();
      });
  }

  eliminarProducto(id: string) {
    console.log(id);
    this.productoCRUD.eliminarProducto(id).subscribe(this.reload);
  }

  async editarProducto(editValor: string, nombre: string, descripcion: string, cantidad: string, costo: string) {
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
            this.productoCRUD.editarProducto(dataToSend, editValor).subscribe(
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
