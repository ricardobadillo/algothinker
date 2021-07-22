class Pila {//implementacion con array dinamico
  constructor() {
    this.datos = [];
  }

  peek() {//acceder al ultimo elemento insertado
    return this.datos[this.datos.length - 1];
  }

  push(item) {//insertar
    if (item) {
      this.datos.push(item);
      return this.datos.length;
    } else {
      return undefined;
    }
  }

  pop() {//quitar
    let elementoBorrado = this.datos.pop();
    return elementoBorrado;
  }
}
