import { serviciosProductos } from "./servicios-productos.js";

const contenedorproductos = document.querySelector("[data-productos]");
const formulario = document.querySelector("[data-formulario]");

function crerTarjeta({nombre, precio, imagen, id}) {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta");

    tarjeta.innerHTML = `
    <div class="img-container">
        <img src=${imagen} alt=${nombre}>
    </div>
    <div class="tarjeta-contenedor--info">
        <h2 class="produc-name">${nombre}</h2>
        <div class=tarjeta-contenedor--valor">
        <p class="precio">$${precio}</p>
        <button class="boton-eliminar" data-id=${id}>
        eliminar
        </button>
        </div>
        </div>
`;

        asignarEventoEliminar(tarjeta, id);
    return tarjeta;        
}

const renderizarProductos = async  () => {
    try {
        const listaProductos = await serviciosProductos.listarProductos();
        listaProductos.forEach((producto) => {
            const tarjetaProducto = crerTarjeta(producto);
            contenedorproductos.appendChild(tarjetaProducto);
        });
    } catch (err) {
        console.error("error al renderizar productos", err) ;
    }
};

formulario.addEventListener("submit", async (Event) =>  {
    Event.preventDefault();
    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const imagen = document.querySelector("[data-imagen]").value;

    if (nombre === "" || precio === "" || imagen === "") {
        alert(" complete todos los campos");
    } else {
        try {
            const nuevoProductos = await serviciosProductos.crearProductos(
                nombre,
                precio,
                imagen
            );
            console.log("producto creado:", nuevoProductos);
            const nuevaTarjeta = crerTarjeta(nuevoProductos);
            contenedorproductos.appendChild(nuevaTarjeta);
        } catch (error) {
            console.error("errror al crear producto:", error);
        }
        formulario.reset();
    }
});

renderizarProductos();