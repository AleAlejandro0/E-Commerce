"user strict"

const items  = [
  
   { 
      id: 1,
      name: `Eros`,
      image: `/assets/images/japanese-1.png`,
      alt: `Eros fram season 2022`,
      price: `15.000`,
      quantity: 3,
      

   },

   { 
      id: 2,
      name: `Pan`,
      image: `/assets/images/japanese-2.png`,
      price: `35.000`,
      quantity: 8,
    
   },

   { 
      id: 3,
      name: `Hebe`,
      image: `/assets/images/japanese-3.png`,
      price: `99.000`,
      quantity: 5,
      
   },

]

const cartIdentifier= {
   cartID: 10
}
   


/* SCROLL BACKGROUND NAV*/

let nav = document.querySelector("nav")

window.addEventListener("scroll", () =>{

   if(window.scrollY > 70 ){
      nav.classList.add("scroll-nav")
   }else{
      nav.classList.remove("scroll-nav")
   }

})
 
/* OPEN MENU // CLOSE MENU */

let showMenu = document.querySelector("#open-menu")
let menuOverlay = document.querySelector(".menu-overlay")
let closeMenu = document.querySelector("#close-menu") 
let showMenuOptions = document.querySelector(".menu-mobile")



   showMenu.addEventListener("click", () => {
      menuOverlay.classList.add("Show")
      showMenuOptions.classList.add("show")
   


})  

   closeMenu.addEventListener("click", ()=>{

      menuOverlay.classList.remove("Show")
      showMenuOptions.classList.remove("show")

})

 


/*  OPEN CART */

let showCart = document.querySelector("#open-cart")
let cartOverlay = document.querySelector(".shopping-cart-overlay")

showCart.addEventListener("click", () =>{

     cartOverlay.classList.add("show")

     let comprarProducto = document.querySelector(".purchase-botton")

     comprarProducto.addEventListener("click", () =>{
      alert("Ups!, no cuentas con el dinero suficiente")
     }) 
})

/* CLOSE CLART*/ 

let closeCart = document.querySelector("#close-cart")

closeCart.addEventListener("click", () =>{

    cartOverlay.classList.remove("show")
})

/* List products */ 

let listProducts = document.querySelector(".products-list")
let cartContainer = document.querySelector(".cart-list")
let cartCount = document.querySelector("#cart-count")
let cart = []

document.addEventListener("DOMContentLoaded", ()=>{
    mostrarProductos()

}

)

function mostrarProductos(){
     
   let fragmentHTML = ""

   items.forEach( (product) =>{

      fragmentHTML += `
        
         <div class="card-one" >

            <div class="image-container">
              <img src=${product.image}>
            </div>

            <div class="description-product">

            <div class="line-p1"></div>

            <button data-id="${product.id}" class="add-product-botton">+</button>
          
            <div class="position-description">

               <p class="price-cards">$${product.price}</p> 
               <h3>${product.name}</h3>

               <div class="line-p2"></div>

               <p class="stock-information">Disponible:${product.quantity}</p>

             </div>

            </div>

         </div>
        
      `

   })

   listProducts.innerHTML = fragmentHTML


   let productsButton = document.querySelectorAll(".add-product-botton")

   productsButton.forEach( (button)  =>{
       
        button.addEventListener("click", (event) =>{

           let id = parseInt (button.getAttribute("data-id"))
           let product = items.find( item =>{ return item.id === id } ) 


         agregarProducto(product)
               
        })

   })

} 



function agregarProducto( producto ){

  let resultadoFind = cart.find( item => item.id === producto.id)

  if(resultadoFind){
     let stock = cart[resultadoFind.index].quantity
     let quantitySelected =  cart[resultadoFind.index].quantitySelected 

     if( stock > quantitySelected  ){
        cart[resultadoFind.index].quantitySelected += 1
     }else{
          alert("Las unidades son limitadas")
     }
      

  }else{
     
     producto.quantitySelected = 1 
     producto.index = cart.length

     cart.push(producto)
     
     
   }
   
   console.log(cart)
   mostrarProductosCart()

}

function mostrarProductosCart(){
    let fragmentoHTML = ``
    let suma = 0
    let cantidadTotal = 0

    cart.forEach( item => {
        fragmentoHTML += `
            
        <div class="cart-item">
            <img src="${item.image}" alt="">
            <p>${item.name}</p>
            <small>Cantidad: ${item.quantitySelected} </small>
         </div>
        `

      let totalProducto = item.quantitySelected * item.price
      suma += totalProducto

      cantidadTotal += item.quantitySelected
    })
    
    fragmentoHTML += `
         <div class="cart-price">
            <p>Productos Seleccionados:${cantidadTotal}</p>
            <p>Total: $${suma} k usd</p>
            <button class="purchase-botton" type="submit">Finalizar Compra</button>
         </div>

    
    `
    cartContainer.innerHTML = fragmentoHTML
    cartCount.textContent = cantidadTotal
}
 

