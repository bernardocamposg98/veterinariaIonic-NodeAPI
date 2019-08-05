import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from  "@angular/router";
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  styleUrls: ['./tab6.page.scss'],
})
export class Tab6Page implements OnInit {
  urlapi: string;
  constructor(public nav: NavController) { }

  ngOnInit() {
  }
  reload() {
    window.location.reload();
  } 
  aceptar() {
    localStorage.setItem("usuario", "cerrado");
    this.nav.navigateForward('/');
  }

}
