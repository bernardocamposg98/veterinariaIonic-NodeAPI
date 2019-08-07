import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Empleado, Producto, Mascota, Medicina, Sucursal, Usuario } from '../interfaces/interfaces';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    ruta: string;
    url: string;

    constructor(public http: HttpClient) { }

    obtenerURL(){
        let urlapi = localStorage.getItem("link");
        this.ruta = urlapi;
    }

    //EMPLEADO
    traerEmpleados() {
        this.obtenerURL();
        return this.http.get<Empleado>(this.ruta + "/empleado");
    }

    agregarEmpleado(dataToSend) {
        this.obtenerURL();
        return this.http.post((this.ruta + "/empleado"),dataToSend,
        {headers:new HttpHeaders(
        {"content-Type": "application/json"})});
    }

    editarEmpleado(dataToSend, editValor: string) {
        this.obtenerURL();
        var url = ((this.ruta + "/empleado") + '/' + editValor );
        return this.http.post(url,dataToSend,
        {
        headers: new HttpHeaders().set('Authorization', 'my-token-de-autoriazación'),
        params: new HttpParams().set('id', editValor),
        });
    }
    
    eliminarEmpleado(editValor: string) {
        this.obtenerURL();
        var url = ((this.ruta + "/empleadoeliminar") + '/' + editValor );
        return this.http.get(url,
        {
        params: new HttpParams().set('id', editValor),
        });
    }
    //PRODUCTO
    traerProductos() {
        this.obtenerURL();
        return this.http.get<Producto>(this.ruta + "/producto");
    }
    agregarProducto(dataToSend) {
        this.obtenerURL();
        return this.http.post((this.ruta + "/producto"),dataToSend,
        {headers:new HttpHeaders(
        {"content-Type": "application/json"})});
    }
    editarProducto(dataToSend, editValor: string) {
        this.obtenerURL();
        var url = ((this.ruta + "/producto") + '/' + editValor );
        return this.http.post(url,dataToSend,
        {
        headers: new HttpHeaders().set('Authorization', 'my-token-de-autoriazación'),
        params: new HttpParams().set('id', editValor),
        });
    }
    eliminarProducto(editValor: string) {
        this.obtenerURL();
        var url = (this.ruta + "/productoeliminar" + '/' + editValor );
        return this.http.get(url,
        {
        params: new HttpParams().set('id', editValor),
        });
    }
    //MEDICINA
    traerMedicinas() {
        this.obtenerURL();
        return this.http.get<Medicina>(this.ruta + "/medicina");
    }
    agregarMedicina(dataToSend) {
        this.obtenerURL();
        return this.http.post((this.ruta + "/medicina"),dataToSend,
        {headers:new HttpHeaders(
        {"content-Type": "application/json"})});
    }
    editarMedicina(dataToSend, editValor: string) {
        this.obtenerURL();
        var url = ((this.ruta + "/medicina") + '/' + editValor );
        return this.http.post(url,dataToSend,
        {
        headers: new HttpHeaders().set('Authorization', 'my-token-de-autoriazación'),
        params: new HttpParams().set('id', editValor),
        });
    }
    eliminarMedicina(editValor: string) {
        this.obtenerURL();
        var url = (this.ruta + "/medicinaeliminar" + '/' + editValor );
        return this.http.get(url,
        {
        params: new HttpParams().set('id', editValor),
        });
    }
    //MASCOTAS
    traerMascotas() {
        this.obtenerURL();
        return this.http.get<Mascota>(this.ruta + "/mascota");
    }
    agregarMascota(dataToSend) {
        this.obtenerURL();
        return this.http.post((this.ruta + "/mascota"),dataToSend,
        {headers:new HttpHeaders(
        {"content-Type": "application/json"})});
    }
    editarMascota(dataToSend, editValor: string) {
        this.obtenerURL();
        var url = ((this.ruta + "/mascota") + '/' + editValor );
        return this.http.post(url,dataToSend,
        {
        headers: new HttpHeaders().set('Authorization', 'my-token-de-autoriazación'),
        params: new HttpParams().set('id', editValor),
        });
    }
    eliminarMascota(editValor: string) {
        this.obtenerURL();
        var url = (this.ruta + "/mascotaeliminar" + '/' + editValor );
        return this.http.get(url,
        {
        params: new HttpParams().set('id', editValor),
        });
    }
    //SUCURSALES
    traerSucursales() {
        this.obtenerURL();
        return this.http.get<Sucursal>(this.ruta + "/sucursal");
    }
    agregarSucursal(dataToSend) {
        this.obtenerURL();
        return this.http.post((this.ruta + "/sucursal"),dataToSend,
        {headers:new HttpHeaders(
        {"content-Type": "application/json"})});
    }
    editarSucursal(dataToSend, editValor: string) {
        this.obtenerURL();
        var url = ((this.ruta + "/sucursal") + '/' + editValor );
        return this.http.post(url,dataToSend,
        {
        headers: new HttpHeaders().set('Authorization', 'my-token-de-autoriazación'),
        params: new HttpParams().set('id', editValor),
        });
    }
    eliminarSucursal(editValor: string) {
        this.obtenerURL();
        var url = (this.ruta + "/sucursaleliminar" + '/' + editValor );
        return this.http.get(url,
        {
        params: new HttpParams().set('id', editValor),
        });
    }

    //Usuario
    traerUsuario() {
        this.obtenerURL();
        return this.http.get<Usuario>(this.ruta + "/usuario");
    }
    agregarUsuario(dataToSend) {
        this.obtenerURL(); 
        return this.http.post((this.ruta + "/usuario"),dataToSend,
        {headers:new HttpHeaders(
        {"content-Type": "application/json"})});
    }
    editarUsuario(dataToSend, editValor: string) {
        this.obtenerURL();
        var url = ((this.ruta + "/usuario") + '/' + editValor );
        return this.http.post(url,dataToSend,
        {
        headers: new HttpHeaders().set('Authorization', 'my-token-de-autoriazación'),
        params: new HttpParams().set('id', editValor),
        });
    }
    eliminarUsuario(editValor: string) {
        this.obtenerURL();
        var url = (this.ruta + "/usuarioeliminar" + '/' + editValor );
        return this.http.get(url,
        {
        params: new HttpParams().set('id', editValor),
        });
    }
}
