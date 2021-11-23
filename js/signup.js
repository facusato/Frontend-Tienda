const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

btn_tienda.addEventListener("click", (e) => {
  guardarTienda();
  e.preventDefault();
  window.location.replace("success.html");
});

btn_cliente.addEventListener("click", (e) => {
  guardarCliente();
  e.preventDefault();
  window.location.replace("success.html");
});

async function guardarTienda() {
  const tienda_nombre = document.querySelector("#input_tienda-nombre");
  const tienda_apellido = document.querySelector("#input_tienda-apellido");
  const tienda_dni = document.querySelector("#input_tienda-dni");
  const tienda_mail = document.querySelector("#input_tienda-mail");
  const tienda_pass = document.querySelector("#input_tienda-pass");

  let url = "http://localhost:8091/usuario/save";
  let data = {
    email: tienda_mail.value,
    password: tienda_pass.value,
    rol: "vendedor",
    nombre: tienda_nombre.value,
    apellido: tienda_apellido.value,
    dni: tienda_dni.value,
    billetera: 0,
  };

  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => console.log("Success:", response));
}

async function guardarCliente() {
  const cliente_nombre = document.querySelector("#input_cliente-nombre");
  const cliente_apellido = document.querySelector("#input_cliente-apellido");
  const cliente_dni = document.querySelector("#input_cliente-dni");
  const cliente_mail = document.querySelector("#input_cliente-mail");
  const cliente_pass = document.querySelector("#input_cliente-pass");
  const cliente_domicilio= document.querySelector("#input_cliente-domicilio");

  let url = "http://localhost:8091/usuario/save";
  let data = {
    email: cliente_mail.value,
    password: cliente_pass.value,
    rol: "cliente",
    nombre: cliente_nombre.value,
    apellido: cliente_apellido.value,
    dni: cliente_dni.value,
    domicilio: cliente_domicilio.value,
  };

  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => console.log("Success:", response));
}
