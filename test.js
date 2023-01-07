url_products = "https://dummyjson.com/products";
url_categories = "https://dummyjson.com/products/categories";


const card1 = document.getElementById('card');
const searchBar = document.getElementById('searchBar');



document.addEventListener("DOMContentLoaded", function () {

  loadProducts(1);
  loadCategory();
  load_products_on_search();

});


// this section is used for load products

function loadProducts(currentPage) {
  document.getElementById("shimmer-effect").style.display = "block"
  document.getElementById("display-id").style.display = "none"

  var pageLimit = 5;
  var skipVal = (currentPage - 1) * pageLimit;

  var url_products = "https://dummyjson.com/products?limit=" + pageLimit + "&skip=" + skipVal;
  fetch(url_products)
    .then((data) => {
      return data.json();
    })

    .then((Data) => {
      console.log(Data.limit);
      let singleData = Object.keys(Data.products);

      document.getElementById("shimmer-effect").style.display = "none";
      document.getElementById("display-id").style.display = "block"

      document.getElementById("card").innerHTML = singleData.map((values) => {


        return ` <div class="flex-container">
        <div class="flex-item-left">
            <img class="body-image" src=${Data.products[values].thumbnail} alt="">
        </div>
        <div class="flex-item-right test">
            <h1 class="text-color">${Data.products[values].title}</h1>
       
            <p>Brand Name <a href="">${Data.products[values].brand}</a></p>
       
            <p class="body-text-size">${Data.products[values].description}</p>
        </div>
    </div> 
    `;
    }).join("");

      var totalPage = Math.ceil(Data.total / pageLimit);
      generatePagination(totalPage, currentPage);
    })
    .catch((err) => {
      console.log(err);
    });

}

// this section is used for generatePagination

function generatePagination(totalPage, currentPage) {
  var ul = document.getElementById("paginaton");
  ul.innerHTML = "";
  for (let i = 1; i <= totalPage; i++) {
    var li = document.createElement("li");
    li.classList.add("page-item");
    if (currentPage == i) {
      li.classList.add("active");
    }
    var a = document.createElement("a");
    a.classList.add("page-link");
    a.setAttribute("onclick", `loadProducts(${i})`);
    a.appendChild(document.createTextNode(i));
    li.appendChild(a);
    ul.appendChild(li);
  }
}

// this section used for load categories and show data 
function loadCategory() {
  axios.get('https://dummyjson.com/products/categories')
    .then(function (response) {
      const len = response.data.length;
      console.log(len);
      document.getElementById("shimmer-effect").style.display = "none";
      let text = " ";
      for (let i = 0; i < len; i++) {
        text += `
      <input class="faq-drawer__trigger" id="faq-drawer-2" type="checkbox" /><label
      class="faq-drawer__title" for="faq-drawer-2">${response.data[i]}</label>
  `;
      }
      // console.log(text);
      document.getElementById("card1").innerHTML = text;
    });
}




// this section is used for searching products 
let search_characters = [];


//  used for what i am searching for by taking key words
searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredCharacters = search_characters.products.filter((character) => {
        return (
            character.title.toLowerCase().includes(searchString) 
        );
    });
    display_products(filteredCharacters);
});


// this is used for load products

const load_products_on_search = async () => {
    try {
        const res = await fetch('https://dummyjson.com/products');
        search_characters = await res.json();

        display_products(search_characters.products);
        console.log(search_characters.products);
    } catch (err) {
        console.log(err);
        // console.log("Product does not exit()")
    }
};


//  this is used for showing search items 
const display_products = (characters) => {
    const htmlString = characters.slice(0, 5)
        .map((character) => {
            return `
            <div class="flex-container">
        <div class="flex-item-left">
            <img class="body-image" src=${character.thumbnail} alt="">
        </div>
        <div class="flex-item-right test">
            <h1 class="text-color">${character.title}</h1>
       
            <p>Brand Name <a href="">${character.brand}</a></p>
       
            <p class="body-text-size">${character.description}</p>
        </div>
    </div> 
           
        `;
        })
        .join('');
    card1.innerHTML = htmlString;
};


