const removerProducto = document.getElementsByClassName("btn-danger")
for (let i = 0; i < removerProducto.length; i++){
    let boton = removerProducto[i]
    boton.addEventListener("click", function(event){
        let clickBoton = event.target 
        clickBoton.parentElement.parentElement.remove()
        totalCarrito()
    })
}

const inputCantidad = document.getElementsByClassName("carr-cantidad-input")
for (let i = 0; i < inputCantidad.length; i++){
    let input = inputCantidad[i] 
    input.addEventListener("change", cambioCantidad)
}
function cambioCantidad(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    totalCarrito()
}

function totalCarrito(){
    const contenedorProducto = document.getElementsByClassName("carr-items")[0]
    carrRows = contenedorProducto.getElementsByClassName("carr-row")
    let total = 0
    for (let i = 0; i < carrRows.length; i++){
        let carrRow = carrRows[i]
        let precioRow = carrRow.getElementsByClassName("carr-price")
        let cantidadRow = carrRow.getElementsByClassName("carr-cantidad-input")[0]
        let precio = parseFloat(precioRow.innetText.replace("$", ""))
        let cantidad = cantidadRow.value
        total = total + (precio * cantidad)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName("carr-total-precio")[0].innetText = "$" + total
}
const agregarAlCarrito = document.getElementsByClassName("bi-cart-plus")
for (let i = 0; i < agregarAlCarrito.length; i++){
    let agregarCarr = agregarAlCarrito[i]
}
