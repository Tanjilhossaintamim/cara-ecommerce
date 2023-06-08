const big_img_container = document.querySelector('.big-img-container')
const big_image = document.querySelector('.big-img')

const small_image = document.querySelectorAll('.small-img img')



small_image.forEach(function (item) {
    item.addEventListener('click', change_image)
})

function change_image(e) {
    const small_image_src = e.target.src
    let src = big_image.src
    big_image.src = small_image_src
    e.target.src = src



}
document.addEventListener('DOMContentLoaded', show_img)
function show_img() {
    big_image.src = localStorage.getItem('src')

}