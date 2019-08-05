import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  styleUrls: ['./tab6.page.scss'],
})
export class Tab6Page implements OnInit {
  urlapi: string;
  constructor() { }

  ngOnInit() {
  }
  reload() {
    window.location.reload();
  } 
  aceptar() {
    localStorage.setItem("link", this.urlapi);
    let url = this.urlapi;
    console.log(url);
    this.reload();
  }

}
