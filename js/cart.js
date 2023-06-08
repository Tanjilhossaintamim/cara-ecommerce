const table_body = document.querySelector('.table-body');
const clear_cart_btn = document.querySelector('.clear_cart')


document.addEventListener('DOMContentLoaded', get_product_from_localstorage)

// create cart item 
function add_product_to_cartlist(product) {
    let tr = document.createElement('tr')
    tr.innerHTML = `
    <td><i class="fa-regular fa-circle-xmark delete"></i></td>
    <td><img src="${product.image}" width="50"></td>
    <td>${product.name}</td>
    <td class='main-price'>$ ${product.price.slice(1)}</td>
    <td class="quantity"><button class="decrease">-</button><span class="quantity">1</span><button class="increase">+</button></td>
    <td class="total-price">$ ${product.price.slice(1)}</td>
    `
    return tr

}


// localstorage data collect and add cart table script 
function get_product_from_localstorage() {
    products = JSON.parse(localStorage.getItem('products'))
    if (products) {

        products.forEach(element => {
            let row = add_product_to_cartlist(element)
            table_body.appendChild(row)
            clear_cart_btn.style.display = 'block';

            // get all necessery button for funtionalitys 

            const delete_btns = document.querySelectorAll('.delete')
            const decrease_btns = document.querySelectorAll('.decrease')
            const increase_btns = document.querySelectorAll('.increase')

            decrease_btns.forEach((btn) => {
                btn.addEventListener('click', decrease_quantity)
            })

            increase_btns.forEach((btn) => {
                btn.addEventListener('click', increase_quantity)
            })





            delete_btns.forEach((deletebtn) => {
                deletebtn.addEventListener('click', remove_product)
            })

        });
    }
    else {
        table_body.innerHTML = `<h3 style="text-align:center; padding-top:30px;">Cart Is Empty</h3>`
        clear_cart_btn.style.display = 'none';
        let finel_price = document.querySelector('.finel-price')
        finel_price.innerText = 0

    }
}

// remove button script 
function remove_product(e) {
    let row = e.target.parentNode.parentNode
    row.remove()

}

//clear all cart item script 
clear_cart_btn.addEventListener('click', () => {

    if (confirm('Are You Sure ?')) {

        localStorage.removeItem('products')
        localStorage.removeItem('count')
        location.reload()
    }

})


// quantity increase button script

function increase_quantity(e) {
    let td = e.target.parentNode
    let tr = td.parentNode
    let main_price = tr.querySelector('.main-price')
    let total_price = tr.querySelector('.total-price')
    let quantity = td.querySelector('.quantity')
    let update_quantity = parseInt(quantity.innerText) + 1
    if (update_quantity >= 5) {
        quantity.innerText = '5'
    }
    else {
        quantity.innerText = update_quantity;
    }
    let quantity_value = parseInt(quantity.innerText)
    let main_price_value = parseInt(main_price.innerText.slice(2))
    let calculate = quantity_value * main_price_value
    total_price.innerText = '$ ' + calculate

    let subtotal = document.querySelector('.subtotal-price')
    let finel_price = document.querySelector('.finel-price')
    let shiping_cost = document.querySelector('.shiping-cost')

    let all_prices = document.querySelectorAll('.total-price')
    let sum = 0
    if (all_prices) {

        all_prices.forEach((price) => {
            let total_price_s = parseInt(price.innerText.slice(2))
            sum += total_price_s
            subtotal.innerText = sum

            let shiping_cost_price = parseInt(shiping_cost.innerText)
            finel_price.innerText = sum - shiping_cost_price

        })
    }
    else {
        subtotal.innerText = '0'
    }


}


// quantity decrease button script

function decrease_quantity(e) {
    let td = e.target.parentNode;
    let tr = td.parentNode;
    let quantity = td.querySelector('.quantity');
    let main_price = tr.querySelector('.main-price');
    let total_price = tr.querySelector('.total-price');
    let update_quantity = parseInt(quantity.innerText) - 1;

    if (update_quantity <= 1) {
        quantity.innerText = '1'
    }
    else {
        quantity.innerText = update_quantity;
    }

    let quantity_value = parseInt(quantity.innerText);
    let main_price_value = parseInt(main_price.innerText.slice(2));
    let calculate = quantity_value * main_price_value;
    total_price.innerText = '$ ' + calculate;


    let subtotal = document.querySelector('.subtotal-price')
    let finel_price = document.querySelector('.finel-price')
    let shiping_cost = document.querySelector('.shiping-cost')


    let all_prices = document.querySelectorAll('.total-price')
    let sum = 0
    if (all_prices) {

        all_prices.forEach((price) => {
            let total_price_s = parseInt(price.innerText.slice(2))
            sum += total_price_s
            subtotal.innerText = sum

            let shiping_cost_price = parseInt(shiping_cost.innerText)
            finel_price.innerText = sum - shiping_cost_price

        })
    }
    else {
        subtotal.innerText = '0'
    }


}
//


// calculate all price and add all price table
document.addEventListener('DOMContentLoaded', calculate_total_price)

function calculate_total_price() {
    let subtotal = document.querySelector('.subtotal-price')
    let finel_price = document.querySelector('.finel-price')
    let shiping_cost = document.querySelector('.shiping-cost')


    let all_prices = document.querySelectorAll('.total-price')
    let sum = 0;
    if (all_prices) {

        all_prices.forEach((price) => {
            let total_price = parseInt(price.innerText.slice(2))
            sum += total_price

            subtotal.innerText = sum
            finel_price.innerText = sum - (parseInt(shiping_cost.innerText))

        })
    }
    else {
        subtotal.innerText = '0'
    }
}