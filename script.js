// Mapa
var mymap = L.map('map').setView([-33.0508, -71.3692], 14);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoicmFmZmFlbGxhYW5pbGlvIiwiYSI6ImNrZWlubncydjEwOGgyd21udHdmOWJ4M24ifQ.E2q7D7b-Je_x7VRjbqjAAA'
}).addTo(mymap);

var marker = L.marker([-33.0480, -71.3691]).addTo(mymap);
var marker = L.marker([-33.0495, -71.3700]).addTo(mymap);


// Creación de clase y constructor 
class Producto {
  constructor(id, nombre, categoria, precio, unidad){
    this.id = Number(id);
    this.nombre = nombre;
    this.categoria = categoria;
    this.precio = Number(precio);
    this.unidad = unidad;
  }
}

//Creación de array vacío, al cual se le irán añadiendo los elementos nuevos con new Producto

const productos = [];
const carrito = [];

// Se envian al array productos una serie de elementos nuevos de la clase Producto
productos.push(new Producto (1,'Hallulla', 'Pan', 1000, 'kg'));
productos.push(new Producto (2,'Batido', 'Pan', 900, 'kg'));
productos.push(new Producto (3,'Amasado', 'Pan', 800, 'kg'));
productos.push(new Producto (4,'Empolvado', 'Pastelería', 500, 'unidad'));
productos.push(new Producto (5,'Mantecado', 'Pastelería', 300, 'unidad'));
productos.push(new Producto (6,'Berlín', 'Pastelería', 700, 'unidad'));
productos.push(new Producto (7,'Raviol', 'Pastas', 5000, 'bandeja'));
productos.push(new Producto (8,'Fetuchini', 'Pastas', 3000, 'bandeja'));



//Creación de función flecha para que el usuario pueda ver la lista de productos disponibles
const verProductos = (productos) => {
  let listaproductos = '';
  for (const producto of productos) {
    listaproductos += `Id=${producto.id}\nProducto = ${producto.nombre}\nCategoría: ${producto.categoria}\nPrecio: $${producto.precio}\n\n`
  }
  return listaproductos;
}

//Creación de función flecha para que el usuario comprar los productos
const comprar = () => {
  const seleccionUsuario = prompt(`Digite el Id del producto que desea comprar:\n\n ${verProductos(productos)}`);
  const productoSeleccionado = productos.find(producto => producto.id == seleccionUsuario);
  if (productoSeleccionado) {
    carrito.push(productoSeleccionado);
    alert(`Agregaste ${productoSeleccionado.nombre} al carrito, por un total de $${productoSeleccionado.precio}`)
  } else {
    alert('Producto no encontrado');
  }
  return resultadoComprar = productoSeleccionado;
  };

  //Creación de función flecha para que el usuario pueda ver su carrito2
const mostrarCarrito = () => {
   const productosCarrito = verProductos(carrito);
   if (productosCarrito){
      alert(productosCarrito);
   }else {
     alert("No hay productos para mostrar")
   }
  
  };



//Ordenar aparición de objetos por precio de menor a mayor
productos.sort((a, b) => {
  return a.precio + b.precio
});
 

//Creación de un ciclo do while para que el usuario pueda ver el menú de opciones y hacer acciones hasta que ingrese la opción para salir del ciclo
let opcion;
do {
  opcion = Number(prompt(`Bienvenid@, ingrese una opción para continuar:
  1- Ver productos
  2-Agregar productos al carrito
  3-Ver carrito
  4-Salir
  `));

  switch(opcion){
    case 1:
      const listaRecibida = verProductos(productos);
      alert(listaRecibida);
      break;

    case 2:
      comprar();
      break;

     case 3:
      mostrarCarrito()
      break; 
    
    case 4:
      alert("Gracias por su visita");
      break;

    default:
      alert("Ingrese alguna opción del 1 al 4")
      break;
  }
} while ( opcion !== 4);





