import { Component, OnInit } from '@angular/core';
import { Mascota } from '../interfaces/interfaces';
import { ApiService } from '../services/api.service';
import { Routes } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page implements OnInit {
 
  articles: Mascota;
  nombre: string;
  cel: string;
  mascota: string;
  raza: string;
  color: string;
  id: number;
  dataFromService:any="";
  usuario1: string;


  constructor(public nav: NavController,private mascotaCRUD: ApiService, private alertCtrl: AlertController) {}

  ngOnInit() {
    let usuario = localStorage.getItem("usuario");
    if(usuario == "user" || usuario == "admin"){
    } else { this.nav.navigateForward('/');}
    this.mascotaCRUD.traerMascotas()
    .subscribe(metodo => {
      console.log(metodo);
      this.articles = metodo;
      this.usuario1 = usuario;
    });
  }

  reload() {
    window.location.reload();
  }

  agregarMascota() {
    var dataToSend = {
      nombre: this.nombre,
      cel: this.cel,
      mascota: this.mascota,
      raza: this.raza,
      color: this.color
    };
    this.mascotaCRUD.agregarMascota(dataToSend).subscribe(
      (dataReturnFromService)=>{
        this.dataFromService = JSON.stringify
        (dataReturnFromService);
        this.reload();
      });
  }

  eliminarMascota(id: string) {
    console.log(id);
    this.mascotaCRUD.eliminarMascota(id).subscribe(this.reload);
  }

  async editarMascota(editValor: string, nombre: string, cel: string, mascota: string, raza: string) {
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
        name: 'cel',
        type: 'text',
        placeholder: 'Escriba la descripción',
        value: cel
      },
      {
        name: 'mascota',
        type: 'text',
        placeholder: 'Escriba la mascota',
        value: mascota
      },
      {
        name: 'raza',
        type: 'text',
        placeholder: 'Escriba el raza',
        value: raza
      },
      {
        name: 'color',
        type: 'text',
        placeholder: 'Escriba el color',
        value: raza
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
              cel: datos.cel,
              mascota: datos.mascota,
              raza: datos.raza,
              color: datos.color
            };
            console.log (dataToSend);
            this.mascotaCRUD.editarMascota(dataToSend, editValor).subscribe(
              (dataReturnFromService)=>{
                this.dataFromService = JSON.stringify
                (dataReturnFromService);
                this.reload();
              });
            console.log('Se acepto la acción');
            console.log('Se acepto la acción');
          }
        }
      ]
    });
    await alertInput.present();
  }

}
