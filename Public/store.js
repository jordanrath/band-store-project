const removeButton = () => {
    let removeBtn = document.querySelectorAll('#remove-btn');
    removeBtn.forEach(button => {
        button.addEventListener('click', removeCartItem)
    })
}

const addButton = () => {
    let addBtn = document.querySelectorAll('#add-btn')
    addBtn.forEach(btn => {
        btn.addEventListener('click', addCartItem)
    })
}

const inputButton = () => {
    let quantityInputs = document.querySelectorAll('#cart-quantity')
    quantityInputs.forEach(newInput => {
        newInput.addEventListener('change', updateCartQuantity)
    })
}

const purchaseButton = () => {
    let purchaseBtn = document.querySelector('.modal-btn')
    purchaseBtn.addEventListener('click', purchaseClicked)
}

const removeCartItem = event => {
    event.currentTarget.parentElement.parentElement.remove()
    updateCart();
}

const addCartItem = event => {
    let addItem = event.currentTarget;
    let shopItem = addItem.parentElement.parentElement;
    console.log('Selected Item:', shopItem.innerText)
    let image = shopItem.querySelector(".shop-item-image").src;
    let title = shopItem.querySelector(".shop-item-titles").innerText;
    let price = shopItem.querySelector(".shop-item-price").innerText;

    addItemToCart(title, price, image)
    updateCart();
}

const updateCartQuantity = event => {
    let input = event.currentTarget
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;    
    }
    updateCart();
}

const purchaseClicked = () => {
    let cartItems = document.querySelector('.cart-items')
    let cartItemNames = cartItems.querySelectorAll('.cart-item-titles')
    console.log('cart', cartItemNames)
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCart();
}

const addItemToCart = (title, price, image) => {
    let cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    let cartItems = document.querySelector('.cart-items')
    let cartItemNames = cartItems.querySelectorAll('.cart-item-titles')

    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert(`The selected item is already in the cart`)
            return
        }
    }

    let cartRowContents = `
                            <div class="cart-item cart-column">
                                <img class="cart-item-image" src="${image}" width="100" height="100">
                                <span class="cart-item-titles">${title}</span>
                            </div>
                            <span id="item-price" class="cart-price cart-column">${price}</span>
                            <div class="cart-quantity cart-column">
                                <input id="cart-quantity" class="cart-quantity-input" type="number" value="1">
                                <button id="remove-btn" class="btn btn-danger" type="button">REMOVE</button>
                            </div>
                          `                            
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow)
    inputButton();
    removeButton();
}

const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.querySelector('#overlay')

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
        closeModal(modal)
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () =>{
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})

const openModal = (modal) => {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

const closeModal = (modal) => {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}

const updateCart = () => {
    let itemPrices = Array.from(document.querySelectorAll('#item-price'));
    let newQuantities = Array.from(document.querySelectorAll('[id^=cart-quantity]'))
        //console.log('newQuantities', newQuantities)

    const itemPriceNumbers = itemPrices.map(itemP => (
        parseFloat(itemP.innerText.replace('$', ''))
    ))   

    const subTotals = newQuantities.map(q => parseInt(q.value)).map((q, i) => q * itemPriceNumbers[i])
        console.log('subtotals', subTotals, 'item price', itemPriceNumbers)

    const total = (subTotals.length > 0) 
        ? subTotals.reduce((total, current) => total + current)
        : 0;

    totalStr = Math.round(total * 100) / 100
    document.querySelector('#total-price').innerText = '$' + totalStr.toFixed(2)

      //const cartItemsInput = document.querySelector('#cart-items-input');
    //const items = JSON.parse(cartItemsInput?.value ?? "[]");
    
    //let prices = [];
    //let quantities = [];
    //items.map(item => {
        //const {
            //title, price, quantity, image
        //} = item
        //prices.push(price)
        //quantities.push(quantity)
        //return 

   // })//.forEach(itemHTML => {
        //const cart = document.querySelector('.cart-items')
        //cart.appendChild(itemHTML)
    //})
}


(async () => {              
    removeButton();
    addButton();
    inputButton();
    purchaseButton();
    //addItemToCart();
})();
