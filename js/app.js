const carritoImg = document.querySelector("#img-carrito");
const carrito = document.querySelector(".carrito");
const listaCursos = document.querySelector("#lista-cursos");
const containerCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
let articulosCarrito = [];
//desplegar carrito
carritoImg.addEventListener("click", () => {
  carrito.classList.contains("carrito-active")
    ? carrito.classList.remove("carrito-active")
    : carrito.classList.add("carrito-active");
});

loadEventListeners();
function loadEventListeners() {
  listaCursos.addEventListener("click", (e) => {
    e.preventDefault();

    if (e.target.classList.contains("agregar-carrito")) {
      const cursoSeleccionado = e.target.parentElement.parentElement;
      getDataCuorse(cursoSeleccionado);
    }
  });
}

function getDataCuorse(cuorse) {
  // console.log(cuorse);

  const infoCourse = {
    id: cuorse.querySelector("a").getAttribute("data-id"),
    titulo: cuorse.querySelector("h4").textContent,
    precio: cuorse.querySelector(".precio span").textContent,
    img: cuorse.querySelector(".card img").src,
    cantidad: 1,
  };
  console.log(infoCourse);
  updateCantidad(infoCourse)

  /********  Agrega elementos al arreglo  ********/

  console.log(articulosCarrito);
  carritoHTML();
}

/********  Muestra el carrito de compras en el HMTL  ********/
function carritoHTML() {
  cleanHTML();
  articulosCarrito.forEach((curso) => {
    const { img, titulo, precio, cantidad, id } = curso;

    const row = document.createElement("tr");
    row.innerHTML = `
    <td><img src="${img}" width="100"></td>  
    <td>${titulo}</td>
    <td>${precio}</td>  
    <td>${cantidad}</td>
    <td><a href="#" class="borrar-curso" data-id="${id}">X</a></td>
    `;
    /********  Agrega el HTML en el carrito  ********/
    containerCarrito.appendChild(row);
  });
}

function cleanHTML() {
  while (containerCarrito.firstChild) {
    containerCarrito.removeChild(containerCarrito.firstChild);
  }
}

function updateCantidad(infoCourse) {
  let indice = articulosCarrito.map(producto => producto.id).indexOf(infoCourse.id);
  indice < 0 ? articulosCarrito.push(infoCourse) : articulosCarrito[indice].cantidad++;

  /********  opcion 2  ********/
  // const c = articulosCarrito.find(curso => curso.id === infoCourse.id);
  // c === undefined ? articulosCarrito.push(infoCourse) : c.cantidad++;
  // indice > -1 ? articulosCarrito[indice].cantidad++ : articulosCarrito.push(infoCourse);
}
