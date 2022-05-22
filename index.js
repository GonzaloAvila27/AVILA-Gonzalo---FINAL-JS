// Constantes 
const agregarAlCarrito = document.getElementsByClassName("bi-cart-plus")
const removerProducto = document.getElementsByClassName("borrar")
const products = document.querySelector(".shopitems")
EventListener()
loadJSON()
//CREAR SHOP ITEM
function EventListener(){
    window.addEventListener("DOMContentLoaded", () => {loadJSON();
    })}
    function loadJSON(){
        fetch("products.json")
        .then(response => response.json())
        .then(data => {
            let html = "";
            data.forEach(product => {
                html += `
                <div class="shop-item">
                <span class="shop-item-title">${product.producto}</span>
                <img class="shop-item-image" src=${product.imagendisplay}>
                <div class="shop-item-details">
                <span class="shop-item-price">$${product.price}</span>
                <button class="btn btn-primary bi bi-cart-plus" type="button"> Al carrito</button>
                </div>`;
                
            });
            products.innerHTML = html;
    })     
    .catch(error => {
        alert("error en el servidor - put@ madre")
    } )
    
} 

//CREAR ROW EN CARRITO
for (let i = 0; i < agregarAlCarrito.length; i++){
    let agregarCarr = agregarAlCarrito[i]
    agregarCarr.addEventListener("click", agregarAlCarrClick )
}
function agregarAlCarrClick(e) { 
    let agregarCarr = e.target 
    let productoCompleto = agregarCarr.parentElement.parentElement
    let nombreProducto = productoCompleto.getElementsByClassName("shop-item-title")[0].innerHTML
    let precioProducto = productoCompleto.getElementsByClassName("shop-item-price")[0].innerHTML
    let imgProducto = productoCompleto.getElementsByClassName("shop-item-image")[0].src
    addCarr(nombreProducto, precioProducto, imgProducto)
    totalCarrito()
}
function addCarr(nombreProducto, precioProducto, imgProducto) {
    let carrLinea = document.createElement(`div`)
    carrLinea.classList.add("carr-row")
    let carrItems = document.getElementsByClassName("carr-items")[0]
    let repetidos = carrItems.getElementsByClassName("carr-item-title")
    for (let i = 0; i < repetidos.length; i++) {
        if (repetidos[i].innerText === nombreProducto) {
            alert ("El producto ya está en el carrito de compras")
            return
        }       
    }
    let contenidoCarrRow = `
    <div class="carr-item carr-column">
    <img class="carr-item-image" src="${imgProducto}" width="100" height="100">
    <span class="carr-item-title">${nombreProducto}</span>
    </div>
    <span class="carr-price carr-column">${precioProducto}</span>
    <div class="carr-cantidad carr-column">
    <input class="carr-cantidad-input" type="number" value="1">
    <button class="btn btn-danger borrar" type="button">REMOVER</button>
    </div> `
    carrLinea.innerHTML = contenidoCarrRow
    carrItems.append(carrLinea)
    carrLinea.getElementsByClassName("borrar")[0].addEventListener("click", borrarProducto)
    carrLinea.getElementsByClassName("carr-cantidad-input")[0].addEventListener("change", cambioCantidad)
}
//BTN REMOVER
for (let i = 0; i < removerProducto.length; i++){
    let boton = removerProducto[i]
    boton.addEventListener("click", borrarProducto)
}
function borrarProducto(e){
    let clickBoton = e.target 
    clickBoton.parentElement.parentElement.remove()
    totalCarrito()
}
//CANTIDAD LISTENER
const inputCantidad = document.getElementsByClassName("carr-cantidad-input")
for (let i = 0; i < inputCantidad.length; i++){
    let input = inputCantidad[i] 
    input.addEventListener("change", cambioCantidad)
}
function cambioCantidad(e) {
    let input = e.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    totalCarrito()
}
//TOTAL COMPRA
function totalCarrito(){
    let contenedorProducto = document.getElementsByClassName("carr-items")[0]
    let carrRows = contenedorProducto.getElementsByClassName("carr-row")
    let total = 0
    for (let i = 0; i < carrRows.length; i++){
        let carrRow = carrRows[i]
        let precioRow = carrRow.getElementsByClassName("carr-price")[0]
        let cantidadRow = carrRow.getElementsByClassName("carr-cantidad-input")[0]
        let precio = parseFloat(precioRow.innerText.replace(`$`, ` `))
        let cantidad = cantidadRow.value
        total = total + (precio * cantidad)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName("precio-total")[0].innerText = `$` + total
}
// BTN COMPRAR
document.getElementsByClassName("btn-comprar")[0].addEventListener("click", compro )
function compro() {
    alert("Gracias por su compra!")
    let carrItems = document.getElementsByClassName("carr-items")[0]
    while(carrItems.hasChildNodes()){
        carrItems.removeChild(carrItems.firstChild)
    }
    totalCarrito()
}

