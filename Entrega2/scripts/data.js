const productos = [
	{ id: 1, nombre: "Nardo", imagen: "img/nardo.jpg", descripcion: "El nardo es una planta bulbosa con flores blancas o rosadas, con un agradable aroma", precio: 10, stock: 20 },
  	{ id: 2, nombre: "Pilea", imagen: "img/pilea.jpg", descripcion: "Es una planta amante de los ambientes sombríos, frescos y húmedos", precio: 5, stock: 50 },
  	{ id: 3, nombre: "Petunias", imagen: "img/petunias.jpg", descripcion: "Las petunias son unas plantas con flor con forma de trompeta con muchísimos colores.", precio: 7, stock: 10 },
  	{ id: 4, nombre: "Buganvilla", imagen: "img/buganvilla.jpg", descripcion: "La buganvilla es una planta de exterior con una espectacular floración.", precio: 9, stock: 0 },
  	{ id: 5, nombre: "Romero", imagen: "img/romero.jpg", descripcion: "El romero es una planta aromática y medicinal, conocida por sus múltiples beneficios", precio: 2, stock: 30 },
  	{ id: 6, nombre: "Aloe vera", imagen: "img/aloe-vera.jpg", descripcion: "La cualidad por la que más destaca la Aloe Vera son sus propiedades curativas.", precio: 11, stock: 500 },
];

let div = document.querySelector('.products');
let cart = document.querySelector('.showCart');
let cartDiv = document.querySelector('.cart');

cart.addEventListener('click',showCart);

products(productos);

function products(productos){

	let button;

	for (const element of productos) {
		div.innerHTML += '<div class="product">'
			+ '<div class="cell">'
			+ '<img src="' + element.imagen +'">'
			+ '<h3>' + element.nombre +'</h3>'
			+ '<p class="desc">' + element.descripcion +'</p>'
			+ '<p class="precio">Precio: ' + element.precio +'€</p>'
			+ '<button id="buttonProd'+ element.id +'">Agregar al carrito</button>'
			+ '</div>';
			+ '</div>';
			button.document.querySelector('#buttonProd' + element.id);
	}
}

function showCart(){
	if(!cartDiv.classList.contains('move')){
		cartDiv.classList.add('move');
	}else{
		cartDiv.classList.remove('move');
	}
}