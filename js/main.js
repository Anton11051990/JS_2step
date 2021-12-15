const API_URL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/";

const image = "imag.jpg";

class ProductList {
  constructor(container = ".products") {
    this.container = container;
    this.goods = [];
    this._fetchProducts();
    this.render();
  }

  _fetchProducts() {
    fetch(`${API_URL}catalogData.json`)
      .then((response) => {
        return response.json();
      })
      .then((request) => {
        this.goods = request.map((item) => ({
          title: item.product_name,
          price: item.price,
          id: item.id_product,
        }));
        this.render();
      })
      .catch((err) => {
        console.log(err.text);
      });
  }

  render() {
    const Blok = document.querySelector(this.container);
    for (let product of this.goods) {
      const item = new ProductItem(product, image);
      Blok.innerHTML += item.render();
    }
  }
}

class ProductItem {
  constructor(product) {
    this.title = product.title;
    this.price = product.price;
    this.image = "imag.jpg";
    this.id = product.id;
  }

  render() {
    return `<div class="product-item">
               <h3 class="title">${this.title}</h3>
               <img src="images/${this.image}" alt="">
               <p class="price">${this.price}</p>
               <button class="buy-btn">Купить</button>
           </div>`;
  }
}

class BoxBascet {
  constructor() {
    this._bascetGoods = [];
    this._boxBascet = document.querySelector(".boxBascet");
    this.openBascet();
    this.render();
    this.getBascet();
  }
  productSum() {}

  openBascet() {
    // открыть закрыть карзину
    const bascetDiv = document.querySelector(".open");
    const btnBascet = document.querySelector(".btn-cart");
    btnBascet.addEventListener("click", () => {
      bascetDiv.classList.toggle("open");
    });
  }
  getBascet() {
    fetch(`${API_URL}getBasket.json`)
      .then((response) => {
        return response.json();
      })
      .then((request) => {
        this._bascetGoods = request.contents.map((item) => ({
          title: item.product_name,
          price: item.price,
          id: item.id_product,
        }));
        this.render();
      })
      .catch((err) => {
        console.log(err.text);
      });
  }
  render() {
    let Html = "";
    this._bascetGoods.forEach((item) => {
      const cart = new ItemToBascet(item.title, item.id, item.price);
      Html += cart.render();
    });
    this._boxBascet.innerHTML = Html;
  }
}

class ItemToBascet {
  constructor(title, price, id, image) {
    this.title = title;
    this.price = price;
    this.id = id;
    this.image = "imag.jpg";
  }
  render() {
    return `<div class="product-item">
    <h3 class="title">${this.title}</h3>
    <img src="images/${this.image}" alt="">
    <p class="price">${this.price}</p>
    <button class="buy-btn">Купить</button>
</div>`;
  }
}
let list = new ProductList();
let basket = new BoxBascet();
let itemcart = new ItemToBascet();
