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
let pedidos = []
let lista_pesosArg = []
let lista_pesosMex = []
//HACEMOS UN LOOP PARA BRINDAR OPCIONES Y ESTAR EN LA APLICACION HASTA APRETAR 4
presentacion();
function presentacion(){
    mostrar_divisas();
    do{
        var opcion = prompt(
            "Ingresa 1 Si desea listar los libros disponibles en soles \n Ingresa 2 Si desea comprar un articulo \n Ingresa 3 Mostrar tu carrito de compra \n Ingresa 4 para hacer la conversion a alguna modena \n Ingresa 5 si deseas salir de la aplicacion"
        )
        opcion = parseInt(opcion);
        if(opcion === 1){
            mostrar_listado(listaLibros);
        } else if (opcion === 2){
            datos();
        } else if (opcion === 3){
            mostrar_carrito();
        } else if(opcion ===4){
            let moneda = prompt('Ingrese el tipo de cambio que desea ver Arg o Mex');
            if(moneda === 'Arg'){
                mostrar_listado(lista_pesosArg);
            }else if(moneda === 'Mex'){
                mostrar_listado(lista_pesosArg);
            }else{
                alert('Opcion invalida');
            }
        }
        else if(opcion ===5){
            alert('Gracias por su visita');
        }
        else{
            alert("Has ingresado una opcion incorrecta")
        }
    }while(opcion === 1 || opcion === 2 || opcion === 3 || opcion===4)
}
//FUNCION MOSTRAR DIVISAS
function mostrar_divisas(){
    lista_pesosArg = listaLibros.map(libro => {
        return {
            ...libro,
            precio_fisico: libro.precio_fisico * 64,
            precio_pdf: libro.precio_pdf * 64
        };
    })
    lista_pesosMex = listaLibros.map(libro => {
        return {
            ...libro,
            precio_fisico: libro.precio_fisico * 5,
            precio_pdf: libro.precio_pdf * 5
        };
    })
}

//FUNCION QUE MUESTRA EL LISTADO MEDIANTE ALERT
function mostrar_listado(lista){
    lista.forEach(libro =>{
        alert(`${libro.nombre} \n
                Precio Fisico : ${libro.precio_fisico} \n
                Precio Pdf : ${libro.precio_pdf} \n
                Cantidad Disponible : ${libro.cantidad}
        `)
    })
}
// PEDIMOS LOS DATOS, MEDIANTE PROMPTS
function datos(){
    var nombre = prompt("Ingrese el nombre del libro que busca");
    var curso_datos = listaLibros.filter(curso=> curso.nombre === nombre)[0];
    var tipo_moneda = prompt("Ingrese el tipo de cambio soles/pesosMex/pesosArg");
    if(tipo_moneda === 'pesosArg'){
        curso_datos.precio_fisico = curso_datos.precio_fisico * 64;
        curso_datos.precio_pdf = curso_datos.precio_pdf * 64;
        curso_datos.precio_fisico = curso_datos.precio_fisico * 5;
        curso_datos.precio_pdf = curso_datos.precio_pdf * 5;
    }
    var costo_total = 0;
    if(listaLibros.some(curso=> curso.nombre === nombre)){
        var tipo = prompt("Ingrese la version del libro que desea adquirir fisico/pdf");
        var cantidad = prompt("Ingrese la cantidad de ejemplares que desea");
        if(tipo === "fisico" && cantidad <= curso_datos.cantidad){
            costo_total = cantidad * curso_datos.precio_fisico;
            
        }else if(tipo === "pdf" && cantidad <= curso_datos.cantidad){
            costo_total = cantidad * curso_datos.precio_pdf;
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
        pedidos.forEach(pedido => {
            alert(`Tienes el pedido de : \n ${pedido.nombre} - Cantidad : ${pedido.cantidad} - Total : ${pedido.precio_total} `)
        })
    }
}
// ACTUALIZAMOS LAS CANTIDADES
function actualizar_lista(curso_datos, cantidad){
    listaLibros.forEach(libro => { 
        if(libro.nombre === curso_datos.nombre){
            libro.cantidad -= cantidad; 
        }
    })
}