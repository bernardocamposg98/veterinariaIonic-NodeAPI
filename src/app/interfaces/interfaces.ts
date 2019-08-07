export interface Usuario {
    usuarios: ConstructorUsuario[];
}
export interface ConstructorUsuario {
    id: number;
    nombre: string;
    password: string;
    rol: string;
    //created_at: string;
    //updated_at: string;
}
//////////////////////////////////
export interface Empleado {
    usuarios: ConstructorEmpleado[];
}
export interface ConstructorEmpleado {
    id: number;
    nombre: string;
    cel: string;
    correo: string;
    puesto: string;
    //created_at: string;
    //updated_at: string;
}
///////////////////////////////////////////////////////////////
export interface Producto {
    productos: ConstructorProducto[];
}
export interface ConstructorProducto {
    id: number;
    nombre: string;
    descripcion: string;
    cantidad: string;
    costo: string;
    created_at: string;
    updated_at: string;
}
////////////////////////////////////////////////////////////////
export interface Medicina {
    medicinas: ConstructorMedicina[];
}
export interface ConstructorMedicina {
    id: number;
    nombre: string;
    descripcion: string;
    cantidad: string;
    costo: string;
    created_at: string;
    updated_at: string;
}
/////////////////////////////////////////////////////////////////
export interface Mascota {
    mascotas: ConstructorMascota[];
}
export interface ConstructorMascota {
    id: number;
    nombre: string;
    cel: string;
    mascota: string;
    raza: string;
    created_at: string;
    updated_at: string;
}
/////////////////////////////////////////////////////////////////
export interface Sucursal {
    sucursales: ConstructorSucursal[];
}
export interface ConstructorSucursal {
    id: number;
    nombre: string;
    estado: string;
    direccion: string;
    gerente: string;
    cel: string;
    created_at: string;
    updated_at: string;
}