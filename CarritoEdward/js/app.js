const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const totalCarrito = document.querySelector('#total p');
const listacursos = document.querySelector('#lista-cursos');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articuloscarrito = [];
cargarEventListeners();
function cargarEventListeners(){
    //agregar un curso haciendo click en agregar carrito
    listacursos.addEventListener('click', agregarCurso);
    //elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);
    //vaciar carrito de compras
    vaciarCarritoBtn.addEventListener('click' , () => {
        articuloscarrito = [];
        localStorage.removeItem('carrito');
        limpiarHTML();
    });
    document.addEventListener('DOMContentLoaded', ()=>{
        articuloscarrito =  JSON.parse(localStorage.getItem('carrito')) || [];
        carritoHTML();
    })
}

//FUNCIONES 

function agregarCurso(e){
    // para que una vez que le demos click no se ponga al incio de la pagina
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')){
        const cursoseleccionado = e.target.parentElement.parentElement ;
        // console.log(cursoseleccionado);
        LeerdatosCurso(cursoseleccionado);
    }
}
//Eliminar curso del carrito 
function eliminarCurso (e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoID = e.target.getAttribute('data-id');
        // eliminar del arreglo por el data-id
        const cursoIndex = articuloscarrito.findIndex(curso => curso.id === cursoID);
        if (cursoIndex !== -1) {
            if (articuloscarrito[cursoIndex].cantidad > 1) {
                articuloscarrito[cursoIndex].cantidad--;
            } else {
            articuloscarrito.splice(cursoIndex, 1);
            }
        }
        let total = totalCarro();        
        carritoHTML(total);
    }
}
// Lee el cotenido del html al que le dimos click y extrae la informacion del curso
function LeerdatosCurso(curso){
    // console.log(curso);
    // crear un objeto con el contenido del curso
    const infoCurso = {
        imagen: curso.querySelector('img').src,  
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad : 1 

    }
    //revisar si ese elemento ya existe, solo aumentamos cantidad
    const existe = articuloscarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        const cursos = articuloscarrito.map(curso => curso.id === infoCurso.id ? {...curso, cantidad: curso.cantidad + 1} : curso);
        articuloscarrito = [...cursos];
    } else {
        articuloscarrito = [...articuloscarrito, infoCurso];
    }
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `${infoCurso.titulo} fue agregado exitosamente`,
        showConfirmButton: false,
        timer: 1500
    })
    let total = totalCarro();
    carritoHTML(total);
}
// muestra el carrito de compras en el html
function carritoHTML (e) {
    //limpiar html 
    limpiarHTML();
    //recorre el carrito y genera el html
    articuloscarrito.forEach((curso)=>{
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
        <img src="${imagen}" width = "115">
        </td>
        <td> ${titulo} </td>
        <td> ${precio} </td>
        <td> ${cantidad} </td>
        <td> <a href="#" class="borrar-curso" data-id= "${id}"> X </td>
        `;
        // agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
    const row1 = document.createElement('p');
    if(e){
        row1.innerHTML = `
        <p> El precio total es: ${e} </p>
        `;
    }else {
        row1.innerHTML = `
        <p> El precio total es: 0 </p>
        `;  
    }

    
    totalCarrito.appendChild(row1);
    //AGREGAR CARRITO DE COMPRAS AL STORAGE
    sincronizarStorage();
}
function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articuloscarrito));
}
//eliminar los cursos del table body
function limpiarHTML(){
    //forma lenta
    // contenedorCarrito.innerHTML = '';
    while (contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
    while (totalCarrito.firstChild){
        totalCarrito.removeChild(totalCarrito.firstChild);
    }
    
}
function totalCarro(){
    let total = 0;
    articuloscarrito.forEach((curso)=>{
        let cantidad = curso.cantidad;
        let precio = curso.precio;
        precio = precio.substring(1);
        //console.log(precio);
        precio = parseInt(precio);
        total = total + (cantidad*precio);
    });
    return total ? total : 0;
}