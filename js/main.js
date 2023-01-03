//PRODUCTO
class Producto {
    constructor(id, nombre,precio,descripcion, imagen) {
        this.id=id;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.cantidad = 1;

    }
}
const teclado = new Producto(1,"Teclado LOGITECH-G413",12000,"","../img/TECLADO/LOGITECH-G413.jpg");
const mouse = new Producto(2,"Mouse Storm-Elite",8600,"","../img/MOUSE/redragon-storm.jpg");
const gabinete = new Producto(3,"Gabinete Gamer MT-235GM", 9500,"","../img/GABINETE/GabineteMT-235GM1.jpg");
const ram = new Producto(4,"Memoria Ram 32GB 3200Mhz",15000,"","../img/RAM/memoriaRam1.png");
const discoDuro = new Producto(5,"Disco Duro 1TB",10000,"","../img/DISCODURO/discoDuro.jpg");
const discoSolido = new Producto(6,"Disco Solido Kingston 1TB",7860,"","../img/DISCOSOLIDO/discoSolido.jpg");
const auricular = new Producto(7,"Auricular Logitech",20000,"","../img/AURICULAR/LOGITECH.png");
const pantalla = new Producto(8,"Monitor Samsung 22'",45000,"","../img/MONITOR/SAMSUNG22.jpg");
const placaVideo = new Producto(9,"Placa de video GeForce 3070",430500,"","../img/PLACAVIDEO/geforce3070.jpg");

//ARREGLO DE PRODUCTOS
const arrayProductos = [teclado, mouse, gabinete, ram, discoDuro, discoSolido,auricular,pantalla,placaVideo];

//ARREGLO DEL CARRITO 
let carrito = [];

//CARGAR CARRITO DESDE LOCALSTORAGE
if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

const contenedorProductos = document.getElementById("contenedor-productos");

//FUNCION PARA CARGAR LOS PRODUCTOS
const cargarProductos= ()=>{
    
    arrayProductos.forEach( producto =>{
        const div = document.createElement("div");
        div.className="card col";
        div.innerHTML = `
        <div id="carouselExampleFade" class="carousel slide carousel-fade">
            <div class="carousel-inner imagenes">
                <div class="carousel-item active">
                    <img src="${producto.imagen}" class="d-block w-100" alt="${producto.nombre}">
                </div>
            </div>
        </div>
    
        <div class="card-body">
            <h5 class="card-title" id="titulo-card">${producto.nombre}</h5>
            <p class="card-text" id="descripcion-card">${producto.descripcion}</p>
            <div class="price">
                <p class="precio-card"> $${producto.precio}</p>
            </div>
            <div class="boton">
                <a href="#" class="btn btn-primary boton-agregar-carrito" id="boton-card${producto.id}">Agregar al Carrito</a>
            </div>
        </div>
        `;
        contenedorProductos.appendChild(div);

        //AGREGAR PRODUCTOS AL CARRITO
        const boton = document.getElementById(`boton-card${producto.id}`);
        
        boton.addEventListener("click", ()=>{
            agregarAlCarrito(producto.id);
        })
    })
}

//LLAMAMOS A LA FUNCION PARA QUE CARGUE LOS PRODUCTOS
cargarProductos();

//FUNCION PARA CARGAR EL CARRITO
const agregarAlCarrito = (id) =>{
     const productoEnCarrito = carrito.find(producto => producto.id ===id);
     if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
     }else{
        const producto = arrayProductos.find(producto =>producto.id===id)
        carrito.push(producto);

        
     }
     calcularTotal()
     localStorage.setItem("carrito",JSON.stringify(carrito));
}

//FUNCION PARA MOSTRAR EL CARRITO
const contenedorCarrito = document.getElementById("contenedor-carrito");
const btnMostrarCarrito = document.getElementById("boton-carrito");

btnMostrarCarrito.addEventListener("click", () =>{
    mostrarCarrito();
})

const mostrarCarrito= () =>{
    //con esto lo que logramos es que no se genere la duplicacion de contenido.
    contenedorCarrito.innerHTML = "";

    carrito.forEach(producto =>{

        const div = document.createElement("div");
        div.innerHTML = `
        <div class="container">
            <div class="row datos-carrito">
                <div class= "col-4">${producto.nombre}</div>
                <div class= "col-3">${producto.cantidad}</div>
                <div class= "col-3">${producto.precio * producto.cantidad}</div>
                <div class= "col-1 " id="agregar-producto${producto.id}">
                    <button><i class="fas fa-plus agregar-producto"></i></button>
                </div>
                <div class= "col-1 " id="eliminar-producto${producto.id}">
                    <button><i class="fas fa-times eliminar-producto"></i></button>
                </div>
            </div>
        </div>
        `;
        contenedorCarrito.appendChild(div);

        //ELIMINAR PRODUCTOS DEL CARRITO
        const botonEliminar = document.getElementById(`eliminar-producto${producto.id}`);
        botonEliminar.addEventListener("click", ()=>{
            eliminarDelCarrito(producto.id);
        })

        //SUMAR PRODUCTO AL CARRITO
        const botonSumarProducto = document.getElementById(`agregar-producto${producto.id}`);
        botonSumarProducto.addEventListener("click", () =>{
            sumarProductoCarrito(producto.id)
        })
    })
    calcularTotal();
}

//FUNCION QUE ELIMINA EL PRODUCTO DEL CARRITO
const eliminarDelCarrito = (id) =>{
    const producto = carrito.find(producto => producto.id === id);
    const indice = carrito.indexOf(producto);
    producto.cantidad--;
    if (producto.cantidad == 0) {
        carrito.splice(indice, 1);
    }
    mostrarCarrito();

    localStorage.setItem("carrito",JSON.stringify(carrito));
}

const sumarProductoCarrito = (id) =>{
    const producto = carrito.find(producto => producto.id ===id);
    producto.cantidad++;
    mostrarCarrito();

    localStorage.setItem("carrito",JSON.stringify(carrito));

}

//VACIAMOS CARRITO COMPLETO
const vaciarCarrito = document.getElementById("eliminar-carrito");

vaciarCarrito.addEventListener("click", () =>{
    eliminarTodoElCarrito();
})

//FUNCION PARA VACIAR CARRITO COMPLETO
const eliminarTodoElCarrito = () =>{
    contenedorCarrito.innerHTML = "";
    carrito = [];
    mostrarCarrito();

    localStorage.clear();
}

//MOSTRAR TOTAL COMPRA
const total = document.getElementById("total");
const calcularTotal = () =>{
    let totalCompra = 0;
    carrito.forEach(producto => {
        totalCompra += producto.precio * producto.cantidad;
    })
    if (carrito == "") {
    total.innerHTML = `El carrito esta vacio`;
    }else
    {
        total.innerHTML = `El total de la compra es de $${totalCompra}`;
    }
}

