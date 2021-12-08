const mostrarProductos = document.querySelector("#catalogo");
const llenarCarrito = document.querySelector(".moduloCarrito")
let i;

let mymap = L.map('map').setView([-33.0508, -71.3692], 14);

              L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                  maxZoom: 18,
                  id: 'mapbox/streets-v11',
                  tileSize: 512,
                  zoomOffset: -1,
                  accessToken: 'pk.eyJ1IjoicmFmZmFlbGxhYW5pbGlvIiwiYSI6ImNrZWlubncydjEwOGgyd21udHdmOWJ4M24ifQ.E2q7D7b-Je_x7VRjbqjAAA'
              }).addTo(mymap);

          //Puntos mapa
              let marker1 = L.marker([-33.0480, -71.3691]).addTo(mymap);
              let marker2 = L.marker([-33.0495, -71.3700]).addTo(mymap);

// Creación de clase y constructor 
class Producto {
  constructor(id, nombre, categoria, precio, unidad, imagen){
    this.id = Number(id);
    this.nombre = nombre;
    this.categoria = categoria;
    this.precio = Number(precio);
    this.unidad = unidad;
    this.imagen = imagen;
  }
}

//Creación de array vacío, al cual se le irán añadiendo los elementos nuevos con new Producto

let productos = [];

// Se envian al array productos una serie de elementos nuevos de la clase Producto
productos.push(new Producto (1,'Hallulla', 'Pan', 1000, 'kg', '<img src="./images/hallulla.jpg" alt="Hallulla">'));
productos.push(new Producto (2,'Batido', 'Pan', 900, 'kg', '<img src="./images/batido.jpg" alt="Hallulla">'));
productos.push(new Producto (3,'Amasado', 'Pan', 800, 'kg', '<img src="./images/amasado.jpg" alt="Hallulla">'));
productos.push(new Producto (4,'Empolvado', 'Pastelería', 500, 'unidad', '<img src="./images/empolvado.jpg" alt="Empolvado">'));
productos.push(new Producto (5,'Mantecado', 'Pastelería', 300, 'unidad', '<img src="./images/mantecado.jpg" alt="Mantecado">'));
productos.push(new Producto (6,'Berlín', 'Pastelería', 700, 'unidad','<img src="./images/berlin.jpg" alt="Berlín">' ));
productos.push(new Producto (7,'Raviol', 'Pastas', 5000, 'bandeja', '<img src="./images/raviol.jpg" alt="Raviol">'));
productos.push(new Producto (8,'Fetuchini', 'Pastas', 3000, 'bandeja', '<img src="./images/fetuchini.jpg" alt="Fetuchini">'));

//Creación de variable para crear producto, seleccionando un elemento HTML
for (i = 0 ; i < productos.length ; i++){

  mostrarProductos.innerHTML += `
  <div class="card container row productos">
    <p>${productos[i].imagen}</p>
    <h3>${productos[i].nombre}</h3>
    <p>$${productos[i].precio}(${productos[i].unidad})</p>
    <button id="${i}" class="carrito" onclick="idProductosSeleccionados(${i})"><i class="fas fa-cart-plus"></i></button>
  </div>
 `
}


//Carrito
let carrito = []; 
function idProductosSeleccionados(i){
  
    carrito.push(productos[i])
    console.log(carrito);
    
    llenarCarrito.innerHTML += `
    
    <div class="card agregado">
      <div id="${carrito[carrito.length-1].id}">
      <div>Producto: ${carrito[carrito.length-1].nombre}</div>
      <div>Precio: ${carrito[carrito.length-1].precio} CLP (${carrito[carrito.length-1].unidad})</div>
      <button id="${i}" class="btnComprar btn-delete" name="remove"><i class="fas fa-trash"></i></button>
      </div> 
    </div>
    `;

    guardarProductosSeleccionados();
}

//Agregar productos seleccionados al storage
  function guardarProductosSeleccionados(){
    localStorage.setItem('id', JSON.stringify(carrito))
  }

//QUITAR ITEM DEL DOM Y DEL STORAGE

document.addEventListener('click', (e) => {
  if(e.target.name === 'remove'){
   e.target.parentElement.parentElement.remove();
   remove_localstorage(e.target);
  }
 })


 //remover elementos del array
//setear en local storage

const remove_localstorage = (element) =>{
  //traer lista y comparo
  let item = element;
 
  carrito = JSON.parse(localStorage.getItem('id'));
 
  carrito = carrito.filter((e) => {
      if('id' in e && e.id != element.parentElement.id){
          return true;
      }else{
          console.log("Se ha quitado con exito el producto");
          return false;
      }

  });
  
  localStorage.setItem('id', JSON.stringify(carrito))
 }
 

 
// Ventana de que producto se agregó satisfactoriamente

/*  $(".carrito").click(function(){
    $("#alertaCarrito").show();
    $("#alertaCarrito").html(`El producto
    <strong>${carrito[carrito.length-1].nombre}</strong> ha sido agregado al carrito.
    <p class="verCarrito"><a href="carrito.html">Ver carrito</a><p>
   `)
   $("#alertaCarrito").delay(2500).fadeOut(400);
})  */



//Abrir mini carrito

$(".botonMiniCarrito").click(function(){
  $(".miniCarrito").toggle();
  $(".miniCarrito").html(`Aquí se muestra el carrito en su versión pequeña`)
})

$(".cerrar").click(function(){
$(".miniCarrito").hide();
})


/* 
//crear un boton
  let botonCarrito = document.createElement("button");

//asignar un id o una clase
  botonCarrito = 'btn1'

//Asignar lo de adentro
  botonCarrito.innerHTML = "<i class='fas fa-cart-plus'></i>"

//escuchar un evento
    botonCarrito.addEventListener('click', function(){
    const mensajeCarrito = document.createElement('mensajeCarrito');
    mensajeCarrito.innerHTML = "Producto agregado satisfactoriamente";
    document.body.appendChild(mensajeCarrito);
}); */

//Crear lista con todos los productos ((no recomendado para grandes cantidades de datos REFLOW)
    /* productos.forEach(item =>{
      console.log(item)
      const li = document.createElement('li')
      li.textContent = JSON.stringify(item.nombre)
      listaCarrito.appendChild(li)
    }) */

//Crear lista dinamica (no recomendado para grandes cantidades de datos REFLOW)
  /*   productos.forEach(item =>{
      listaCarrito.innerHTML += `<li>${JSON.stringify(item.nombre)}</li>`
    })
 */

/*   const fragment1 = document.createDocumentFragment() //manera 1 de crear un fragmento, guarda estructura

  const fragment2 = new DocumentFragment() //manera 2 de crear un fragmento, guarda estructura

  productos.forEach(item => {
    const li = document.createElement('li')
    li.textContent = JSON.stringify(item.nombre)
    fragment1.appendChild(li)
  })

  listaCarrito.appendChild(fragment1) // se pushea la información al fragmento */


// crear elementos dom dinamicamente dentro de un fragment

/* const fragment = document.createDocumentFragment()
productos.forEach (item => {
  const li = document.createElement('li')
  li.classList.add('list')
  const b = document.createElement('b')
  b.textContent = 'Nombre: '
  const span = document.createElement('span')
  span.classList.add('text-danger')
  span.textContent = JSON.stringify(item.nombre)
  li.appendChild(b)
  li.appendChild(span)
  fragment.appendChild(li)
})

  listaCarrito.appendChild(fragment) */




//btn.addEventListener("click", funcionBTN());

//function functionBTN(){
//  alert(`hola soy un botón`)
//}

//segunda opcion
  //btn.onclick = () => {alert("Soy un evento en funcion flecha")} // aqui hay que decirle al html onclick="funcionclic()" para que funcione


/* input.addEventListener(click, mandarAlCarrito);




function mandarAlCarrito(){
  let contador = 0;
  const agregarCarrito = document.querySelector(".carrito");
  
} */

/* //Creación de función flecha para que el usuario pueda ver la lista de productos disponibles
const verProductos = (productos) => {
  let listaproductos = '';
  for (const producto of productos) {
    listaproductos += `Id=${producto.id}\nProducto = ${producto.nombre}\nCategoría: ${producto.categoria}\nPrecio: $${producto.precio}\n\n`
  }
  return listaproductos;
}
 */


//Creación de función flecha para que el usuario comprar los productos
    /* const comprar = () => {
      const seleccionUsuario = prompt(`Digite el Id del producto que desea comprar:\n\n ${verProductos(productos)}`);
      const productoSeleccionado = productos.find(producto => producto.id == seleccionUsuario);
      if (productoSeleccionado) {
        carrito.push(productoSeleccionado);
        alert(`Agregaste ${productoSeleccionado.nombre} al carrito, por un total de $${productoSeleccionado.precio}`)
      } else {
        alert('Producto no encontrado');
      }
      return resultadoComprar = productoSeleccionado;
      }; */

//Creación de función flecha para que el usuario pueda ver su carrito2
    /* const mostrarCarrito = () => {
      const productosCarrito = verProductos(carrito);
      if (productosCarrito){
          alert(productosCarrito);
      }else {
        alert("No hay productos para mostrar")
      }
      
      }; */


//Ordenar aparición de objetos por precio de menor a mayor
      /* productos.sort((a, b) => {
        return a.precio + b.precio
      }); */
 

//Creación de un ciclo do while para que el usuario pueda ver el menú de opciones y hacer acciones hasta que ingrese la opción para salir del ciclo
      /* let opcion;
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
      } while ( opcion !== 4); */







