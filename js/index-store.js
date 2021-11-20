const btn_addproducts = document.getElementById("btn_addproducts");
const in_nombre = document.getElementById("input_nombre");
const in_descripcion = document.getElementById("input_descripcion");
const in_precio = document.getElementById("input_precio");
const in_stock = document.getElementById("input_stock");
const in_medioDePago = document.getElementById("input_formaDePago");

function agregarProducto() {
  btn_addproducts.addEventListener("click", (e) => {
    e.preventDefault();
    guardarProducto();
    console.log("OK");
  });
}


//  ver de porque llama a la url de ese store en particular
function guardarProducto() {
  var url = "http://localhost:8091/vendedor/1";
  var data = {
    nombre: in_nombre.value,
    descripcion: in_descripcion.value,
    precio: in_precio.value,
    stock: in_stock.value,
    formaDePago: in_formaDePago.value,
    imagen: "algo.jpg",
    //ver si puedo implementar la url de la foto
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

export { agregarProducto };
