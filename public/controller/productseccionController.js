//? para el carrito obtener la id de los productos que el user dio click

export const getidproductsaves = ()=>{
    // Obtén todas las keys almacenadas en el local storage
    const keys = Object.keys(localStorage);
    // Filtra las keys que corresponden a las IDs de los productos
    const ids = keys.filter(key => key.startsWith('producto-'));
    // Obtén los valores correspondientes a las IDs filtradas
    const idValues = ids.map(id => localStorage.getItem(id));
    return idValues
}

