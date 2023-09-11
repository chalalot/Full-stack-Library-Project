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




