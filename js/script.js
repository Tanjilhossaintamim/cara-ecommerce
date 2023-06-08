const menubar = document.querySelector('.menubar')
const nav_bar_menu = document.querySelector('.nav-bar-menu')
const uparrow = document.querySelector('.uparrow')


menubar.onclick = () => {
    nav_bar_menu.classList.toggle('show-nav-menu')
}

document.addEventListener('scroll', function () {
    if (window.scrollY > 900) {
        uparrow.classList.add('show-up-arrow')
    }
    else {
        uparrow.classList.remove('show-up-arrow')
    }
})


// script for product details page 

// script for transfar img scr to product details.html file using local storage

const shop_page_img = document.querySelectorAll('.shop-img')

shop_page_img.forEach(function (item) {
    item.addEventListener('click', set_local_storage)
})

function set_local_storage(e) {
    shop_img_src = e.target.src
    localStorage.setItem('src', shop_img_src)

}



class Store {
    static get_product_from_local_storage() {
        let products;
        if (localStorage.getItem('products') === null) {
            products = []
        }
        else {
            products = JSON.parse(localStorage.getItem('products'))
        }
        return products
    }
    static add_product_to_local_storage(product) {
        try {

            let products = Store.get_product_from_local_storage()
            products.push(product)
            localStorage.setItem('products', JSON.stringify(products))
        }
        catch {
            localStorage.clear()
        }
    }
}

const add_to_cart_btns = document.querySelectorAll('.cart')

add_to_cart_btns.forEach(function (item) {
    item.addEventListener('click', add_cart)
})

let item_count = document.querySelectorAll('.item-count')

function add_cart(e) {

    item_count.forEach((item) => {
        item.innerText = parseInt(item.innerText) + 1
        localStorage.setItem('count', item.innerText)
    })

    products = {}

    const product_container = e.target.parentNode;
    const img = product_container.querySelector('img').src;
    const des = product_container.querySelector('.desc h5').textContent;
    const price = product_container.querySelector('.desc h4').textContent;

    products.name = des;
    products.image = img;
    products.price = price;
    Store.add_product_to_local_storage(products);



}

document.addEventListener('DOMContentLoaded', () => {

    item_count.forEach((item) => {
        if (localStorage.getItem('count')) {

            item.innerText = localStorage.getItem('count')
        }
        else {
            item.innerText = 0
        }
    })





})
