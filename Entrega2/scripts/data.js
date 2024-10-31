const productos = [
	{ id: 1, nombre: "Nardo", imagen: "img/nardo.jpg", descripcion: "El nardo es una planta bulbosa con flores blancas o rosadas, con un agradable aroma", precio: 8, stock: 20 },
  	{ id: 2, nombre: "Pilea", imagen: "img/pilea.jpg", descripcion: "Es una planta amante de los ambientes sombríos, frescos y húmedos", precio: 5, stock: 50 },
  	{ id: 3, nombre: "Petunias", imagen: "img/petunias.jpg", descripcion: "Las petunias son unas plantas con flor con forma de trompeta con muchísimos colores.", precio: 7, stock: 10 },
  	{ id: 4, nombre: "Buganvilla", imagen: "img/buganvilla.jpg", descripcion: "La buganvilla es una planta de exterior con una espectacular floración.", precio: 9, stock: 0 },
  	{ id: 5, nombre: "Romero", imagen: "img/romero.jpg", descripcion: "El romero es una planta aromática y medicinal, conocida por sus múltiples beneficios", precio: 2, stock: 30 },
  	{ id: 6, nombre: "Aloe vera", imagen: "img/aloe-vera.jpg", descripcion: "La cualidad por la que más destaca la Aloe Vera son sus propiedades curativas.", precio: 41, stock: 500 },
];

let div = document.querySelector('.products');
let cart = document.querySelector('.showCart');
let cartDiv = document.querySelector('.cart');
let list = document.querySelector('.listaProd');
let vacio = document.querySelector('.empty');
let purchase = document.querySelector('.purchase');
let total = document.querySelector('.tot');

cart.addEventListener('click',showCart);
vacio.addEventListener('click',eliminar);
purchase.addEventListener('click',comprar);

products(productos);

function products(productos){
	for (const element of productos) {
		div.innerHTML += '<div class="product">'
			+ '<div class="cell">'
			+ '<img src="' + element.imagen +'">'
			+ '<h3>' + element.nombre +'</h3>'
			+ '<p class="desc">' + element.descripcion +'</p>'
			+ '<p class="precio">Precio: ' + element.precio +'€</p>'
			+ '<button onclick="addToCart('+element.id+')">Agregar al carrito</button>'
			+ '</div>';
			+ '</div>';
			
	}
}

function showCart(){
	if(!cartDiv.classList.contains('move')){
		cartDiv.classList.add('move');
	}else{
		cartDiv.classList.remove('move');
	}
}

function addToCart(id){
	
	let anhadido = productos[id -1];
	let display = getComputedStyle(list).display;
	let val = false;
	if(display == 'none'){
		list.style.display = 'block';
	}
	for (const element of list.childNodes) {
		if(parseInt(element.className) == id){
			val = true;
		}
	}

	if(val == true){
		sum(anhadido);
	}else{
		if(anhadido.stock > 0){
			productos[id - 1].stock = productos[id -1].stock - 1;
			list.innerHTML += '<li class="'+ anhadido.id +'">'
				+ anhadido.nombre 
				+ ' - €' + anhadido.precio 
				+ ' x <a class="'+anhadido.nombre+'">1</a>'
				+ '<button class="'+anhadido.id+'" onclick="eliminarLinea(event)">Eliminar</button>'
				+ '<button class="'+anhadido.id+'" onclick="sum(event)">+</button>'
				+ '<button class="'+anhadido.id+'" onclick="res(event)">-</button>'
				+ '</li>';

			updatePrice(anhadido.precio);

		}else{
			alert('Producto agotado');
		}
	}
}

function sum(clase){
	if(typeof clase != 'object'){
		clase = productos[clase.target.classList[0] - 1]
	}
	if(clase.stock > 0){
		let aux = document.querySelector('.'+clase.nombre);
		aux.innerHTML = parseInt(aux.innerHTML) + 1;
		productos[clase.id - 1].stock = productos[clase.id -1].stock - 1;
		updatePrice(clase.precio);
	}else{
		alert('Producto agotado');
	}
}

function res(clase){
	clase = productos[clase.target.classList[0] - 1]
	aux = document.querySelector('.'+clase.nombre);
	aux.innerHTML = parseInt(aux.innerHTML) - 1;
	if(aux.innerHTML == '0'){
		eliminarLinea(clase.id);
	}
	updatePrice(clase.precio * -1);
	
}

function eliminar(){
	list.innerHTML = "";
	list.display = "none";
	total.innerHTML = "0"
}

function eliminarLinea(clase){
	let idLi;

	if(typeof clase != 'number'){
		idLi = productos[clase.target.classList[0] - 1];
	}else{
		idLi = productos[clase];
	}
	console.log(list);
	for (const element of list.childNodes) {
		if(element.className == idLi.id){
			console.log('aa');
			updatePrice(idLi.precio * -parseInt(element.childNodes[1].innerHTML));
			element.remove();
		}
	}
}

function comprar(){
	if(parseInt(total.innerHTML) == 0){
		alert('Por favor compre algo');
	}else{
		alert('Muchas gracias por su compra');
	}
	eliminar();
}

function updatePrice(extra){
	total.innerHTML = parseInt(total.innerHTML) + extra;
}