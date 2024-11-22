const URL_BASE = "https://673665aaaafa2ef2223069ad.mockapi.io/CHALLENG/productos";

const listarProductos = async () => {
    try {
        const respuesta = await fetch(URL_BASE);
        const datos = respuesta.json();
        return datos;
    } catch (error) {
        console.error("error al obtener la lista de preoductos: ", error);
    }
}

const crearProductos = async (nombre, precio, imagen) => {
    try {
        const respuesta = await fetch(URL_BASE, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({nombre, precio, imagen}),
        });
        
        const datos = await respuesta.json();
        console.log("solicitud POST exitosa:", datos);
        return datos;
    } catch (error) {
        console.log("error en la solicitud POST: ", error)
    }
};

const eliminarProductos = async (id) => {
    try {
        await fetch(`${URL_BASE}/${id}`, {
            method: "DELETE", 
            headers: {
                "Content-type": "application/json",
            },
        });
        console.log(`producto con id ${id} eliminado con exito`);        
    } catch (error) {
    console.error("error en la solicitud de borrar:", error)
    }
}

export const serviciosProductos = {
    listarProductos,
    crearProductos,
    eliminarProductos,
};