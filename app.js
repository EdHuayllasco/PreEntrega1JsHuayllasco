// DATA QUE UTILIZAREMOS
const listaLibros = [
    {
        nombre: "Cien años de soledad",
        autor: "Gabriel García Márquez",
        fecha: "1967",
        precio_fisico: 250,
        precio_pdf: 25,
        cantidad: 10
    },
    {
        nombre: "El Quijote",
        autor: "Miguel de Cervantes",
        fecha: "1605",
        precio_fisico: 220,
        precio_pdf: 25,
        cantidad: 8
    },
    {
        nombre: "1984",
        autor: "George Orwell",
        fecha: "1949",
        precio_fisico: 180,
        precio_pdf: 25,
        cantidad: 4
    },
    {
        nombre: "La Odisea",
        autor: "Homero",
        fecha: "Siglo VIII a.C.",
        precio_fisico: 200,
        precio_pdf: 25,
        cantidad: 12
    },
    {
        nombre: "El principito",
        autor: "Antoine de Saint-Exupéry",
        fecha: "1943",
        precio_fisico: 190,
        precio_pdf: 20,
        cantidad: 2
    },
    {
        nombre: "El retrato de Dorian Gray",
        autor: "Oscar Wilde",
        fecha: "1890",
        precio_fisico: 200,
        precio_pdf: 21,
        cantidad: 13
    },
    {
        nombre: "Hamlet",
        autor: "William Shakespeare",
        fecha: "1603",
        precio_fisico: 220,
        precio_pdf: 20,
        cantidad: 8
    },
    {
        nombre: "Moby Dick",
        autor: "Herman Melville",
        fecha: "1851",
        precio_fisico: 250,
        precio_pdf: 25,
        cantidad: 9
    },
    {
        nombre: "Los hermanos Karamazov",
        autor: "Fiódor Dostoyevski",
        fecha: "1880",
        precio_fisico: 150,
        precio_pdf: 15,
        cantidad: 10
    },
    {
        nombre: "Orgullo y prejuicio",
        autor: "Jane Austen",
        fecha: "1813",
        precio_fisico: 210,
        precio_pdf: 21,
        cantidad: 6
    },
    {
        nombre: "El gran Gatsby",
        autor: "F. Scott Fitzgerald",
        fecha: "1925",
        precio_fisico: 200,
        precio_pdf: 20,
        cantidad: 4
    }
];
var pedidos = []
//HACEMOS UN LOOP PARA BRINDAR OPCIONES Y ESTAR EN LA APLICACION HASTA APRETAR 4
do{
    var opcion = prompt(
        "Ingresa 1 Si desea listar los libros disponibles \n Ingresa 2 Si desea comprar un articulo \n Ingresa 3 Mostrar tu carrito de compra \n Ingresa 4 si deseas salir de la aplicacion"
    )
    opcion = parseInt(opcion);
    if(opcion === 1){
        mostrar_listado();
    } else if (opcion === 2){
        datos();
    } else if (opcion === 3){
        mostrar_carrito();
    }
}while(opcion === 1 || opcion === 2 || opcion === 3)

//FUNCION QUE MUESTRA EL LISTADO MEDIANTE ALERT
function mostrar_listado(){
    for (let i = 0; i < listaLibros.length; i++) {
        alert(`${listaLibros[i].nombre} \n
                Precio Fisico : ${listaLibros[i].precio_fisico} \n
                Precio Pdf : ${listaLibros[i].precio_pdf} \n
                Cantidad Disponible : ${listaLibros[i].cantidad}
        `)
    }
}
// PEDIMOS LOS DATOS, MEDIANTE PROMPTS
function datos(){
    var nombre = prompt("Ingrese el nombre del libro que busca");
    var curso_datos = listaLibros.filter(curso=> curso.nombre === nombre)[0];
    var costo_total = 0;
    if(listaLibros.some(curso=> curso.nombre === nombre)){
        var tipo = prompt("Ingrese la version del libro que desea adquirir fisico/pdf");
        var cantidad = prompt("Ingrese la cantidad de ejemplares que desea");
        if(tipo === "fisico" && cantidad <= curso_datos.cantidad){
            costo_total = cantidad * curso_datos.precio_fisico;
            
        }else if(tipo === "pdf" && cantidad <= curso_datos.cantidad){
            costo_total = curso_datos.cantidad * curso_datos.precio_pdf;
        }else {
            alert('Ingreso Una Opcion de adquisicion errada o no tenemos la cantidad, revise la lista')
            return;
        }
        var pedido = {
            nombre          : curso_datos.nombre,
            cantidad        : cantidad,
            tipo            : tipo,
            precio_total    : costo_total
        }
        pedidos.push(pedido)
        actualizar_lista(curso_datos, cantidad);
    }else {
        alert('Ingreso un nombre errado')
    }
}
// MOSTRAMOS EL CARRITO DE LA LISTA DE PEDIDOS
function mostrar_carrito(){
    if(pedidos.length === 0){
        alert("Tu carrito se encuentra vacio")
    }else{
        for (let i = 0; i < pedidos.length; i++) {
            alert(`Tienes el pedido de : \n ${pedidos[i].nombre} - Cantidad : ${pedidos[i].cantidad} - Total : ${pedidos[i].precio_total} `)
        }
    }
}
// ACTUALIZAMOS LAS CANTIDADES
function actualizar_lista(curso_datos, cantidad){
    for (let i = 0; i < listaLibros.length; i++) {
        if(listaLibros[i].nombre === curso_datos.nombre){
            listaLibros[i].cantidad -= cantidad; 
        }
    }
}