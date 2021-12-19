const API_URL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/";
const image = "imag.jpg";

class ProductList {
  constructor(basket) {
    //неправильно работает
    this.goods = [];
    this._cart = basket; // надо сделать
    this.render();
    this._addToBascet();
  }

  fetchProducts() {
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

  _addToBascet() {
    document.querySelector(".products").addEventListener("click", (item) => {
      if (item.target.classList.contains("buy-btn")) {
        const id = item.target.getAttribute("data-id");
        fetch(`${API_URL}addToBasket.json`)
          .then(() => {
            this._cart.add(this.goods.find((good) => good.id == id));
          })
          .catch((err) => {
            console.log(err.text);
          });
      }
    });
  }

  render() {
    const Blok = document.querySelector(".products");
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
               <button data-id="${this.id}" class="buy-btn">Купить</button>
           </div>`;
  }
}

class BoxBascet {
  constructor() {
    this._bascetGoods = [];
    this._boxBascet = document.querySelector(".boxBascet");
    this.render();
    this._openBascet();
    // this.add();
  }
  productSum() {}

  add(good) {
    this._bascetGoods.push(good);
    this.render();
  }

  _openBascet() {
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
  constructor(title, price, id) {
    this.title = title;
    this.price = price;
    this.id = id;
    this.image = "imag.jpg";
  }
  render() {
    return `<div class="product">
    <h3 class="title">${this.title}</h3>
    <img src="images/${this.image}" alt="">
    <p class="price">${this.price}</p>
</div>`;
  }
}
let basket = new BoxBascet();
let itemcart = new ItemToBascet(); //менял местами
let list = new ProductList(basket); // параметр не верный
list.fetchProducts();
basket.getBascet();
