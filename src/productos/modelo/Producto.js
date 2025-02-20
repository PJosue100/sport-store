class Producto {
    constructor(id, imagenUrl, descripcion, precio, creadoEn) {
      this.id = id;
      this.imagenUrl = imagenUrl;
      this.descripcion = descripcion;
      this.precio = precio;
      this.creadoEn = new Date(creadoEn);
    }
  }
  
  export default Producto;
  