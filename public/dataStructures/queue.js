class Nodo {
  constructor(valor) {
    this.valor = valor;
    this.siguiente = null;
  }
}

class Cola {
  constructor() {
    this.primero = null;
    this.ultimo = null;
    this.tamano = 0;
  }

  peek() {
    return this.primero;
  }

  enqueue(item) {
    //poner en la cola
    const nuevoNodo = new Nodo(item);

    if (this.isEmpty()) {
      this.primero = nuevoNodo;
      this.ultimo = nuevoNodo;
    } else {
      this.ultimo.siguiente = nuevoNodo;
      this.ultimo = nuevoNodo;
    }

    this.tamano++;

    return this;
  }

  dequeue() {
    //sacar de la cola
    let itemBorrado = this.primero;

    if (this.estaVacio()) return null;
    else {
      if (this.primero === this.ultimo) {
        this.ultimo = null;
      }
      this.primero = this.primero.siguiente;
      this.tamano--;

      return itemBorrado;
    }
  }

  estaVacio() {
    return this.tamano === 0;
  }
}
