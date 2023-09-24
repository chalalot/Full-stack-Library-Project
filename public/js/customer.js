// RMIT University Vietnam
//  Course: COSC2430 Web Programming
//  Semester: 2023A
//  Assessment: Assignment 2
//  Author: Dong Manh Duc, Do Thuy Linh, Le Nguyen My Chau, Nguyen Ba Duc Manh, Tran Tuan Trung
//  ID: s3977747, s3927777, s3978165, s3978506, s3978290
//  Acknowledgement: Pedro Tech, Web Dev Simplified.

const ProductCardTemplate = document.querySelector("[data-product-template]");
const ProductCardContainer = document.querySelector("[data-product-cards-container]");
const searchInput = document.querySelector("[data-search]");



let products = [];

searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();
    products.forEach( product => {
        // check if the input equal value
        const isVisible = user.name.toLowerCase().includes(value) ||
                          user.description.toLowerCase().includes(value);
        // pass class
        product.element.classList.toggle("hide", !isVisible);
    }) 
    console.log(products);
})




