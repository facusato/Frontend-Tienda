import { menuStore } from "../common/menu-store.js";
import { menuUnregistered } from "../common/menu-unregistered.js";
import { menuProfileStore } from "../common/menuprofile-store.js";
const input = document.querySelector("input");
const container = document.querySelector("#main_container");
const btnSearch = document.querySelector("#search_product");

btnSearch.addEventListener("click", (e) => {
  e.preventDefault();
  postForm("/stores.html", { arg1: input.value });
});

function loginUsuario() {
  // Si en el storage se encuentra un login , cambio al menu correspondiente (comprador o vendedor)
  if (sessionStorage["login"]) { 
      menuProfileStore();
      const nav_login = document.querySelector("#nav_demo");
      const nav_salir = document.getElementById("nav_salir");
      const num_productos = document.getElementById("carrito_numero"); 
      num_productos.innerHTML=`${sessionStorage.getItem("carrito")}`;

      let storage_login = JSON.parse(sessionStorage.getItem("login"));
      var newtext = document.createTextNode(" " + storage_login.nombre);
      nav_login.appendChild(newtext);
      
      if ((JSON.parse(sessionStorage.getItem("login")).rol == "vendedor")) { 
      menuStore();
      const milista = document.getElementById("lista_productos");
      JSON.parse(sessionStorage.getItem("login")).vendedor.productos.forEach((element) => {
        newItem(element,milista);
      });
      const btn_addproducts = document.getElementById("btn_addproducts");
      const in_nombre = document.getElementById("input_nombre");
      const in_descripcion = document.getElementById("input_descripcion");
      const in_precio = document.getElementById("input_precio");
      const in_stock = document.getElementById("input_stock");
      const in_formaDePago = document.getElementById("input_formaDePago");
      btn_addproducts.addEventListener("click", (e) => {
        e.preventDefault();
        guardarProducto(in_nombre, in_descripcion, in_precio, in_stock, in_formaDePago);
        console.log("OK");
      });
    } 
  } else menuUnregistered();
}

function postForm(path, params, method = "GET") {
  const form = document.createElement("form");
  form.method = method;
  form.action = path;

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const hiddenField = document.createElement("input");
      hiddenField.type = "hidden";
      hiddenField.name = key;
      hiddenField.value = params[key];

      form.appendChild(hiddenField);
    }
  }
  document.body.appendChild(form);
  form.submit();
}

function guardarProducto(nombre, descripcion, precio, stock, formaDePago) {
  var url = `http://localhost:8091/vendedor/prod/${
    JSON.parse(sessionStorage.getItem("login")).vendedor.idVendedor
  }`;
  var data = {
    nombre: nombre.value,
    descripcion: descripcion.value,
    precio: precio.value,
    stock: stock.value,
    formaDePago: formaDePago.value,
    imagen: "empty.jpg",
  };
  console.log(data);
  fetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => console.log("Success:", response));
}

function newItem(data,milista) {
  
  const producto = document.createElement("h2");
  const descripcion = document.createElement("p");
  const precio = document.createElement("p");
  const stock = document.createElement("p");
 const formaDePago = document.createElement("p");
  const div_card_body = document.createElement("div");
  const div_card = document.createElement("div");

  producto.textContent = `${data.nombre}`;
  precio.textContent = `$ ${data.precio}`;
  stock.textContent = `$ ${data.stock}`;
  descripcion.textContent = `${data.descripcion}`;
  formaDePago.textContent = `${data.formaDePago}`;
  div_card_body.className = "card-body";
  div_card.className = "card";
  producto.className = "card-title";
  precio.className = "card-text";
  stock.className = "card-text";
  formaDePago.className = "card-text";
  div_card_body.appendChild(producto);
  div_card_body.appendChild(descripcion);
  div_card_body.appendChild(precio);
  div_card_body.appendChild(stock);
  div_card_body.appendChild(formaDePago);
  div_card.appendChild(div_card_body);

  milista.appendChild(div_card);
}

loginUsuario();
