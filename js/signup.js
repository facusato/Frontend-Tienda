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
  //Si funciona bien "success" y mal "ERROR"
  window.location.replace("success.html");
});

btn_cliente.addEventListener("click", (e) => {
  guardarCliente();
  e.preventDefault();
  //Si funciona bien "success" y mal "ERROR"
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
  const tienda_nombre = document.querySelector("#input_tienda-nombre");
  const tienda_apellido = document.querySelector("#input_tienda-apellido");
  const tienda_dni = document.querySelector("#input_tienda-dni");
  const tienda_mail = document.querySelector("#input_tienda-mail");
  const tienda_pass = document.querySelector("#input_tienda-pass");

  let url = "http://localhost:8091/usuario/save";
  let data = {
    email: tienda_mail.value,
    password: tienda_pass.value,
    rol: "cliente",
    nombre: tienda_nombre.value,
    apellido: tienda_apellido.value,
    dni: tienda_dni.value,
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
