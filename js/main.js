const API_URL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/";

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

    // this.goods = [
    //   { id: 1, title: "Notebook", price: 2000, image: "imag.jpg" },
    //   { id: 2, title: "Mouse", price: 20, image: "imag.jpg" },
    //   { id: 3, title: "Keyboard", price: 20, image: "imag.jpg" },
    //   { id: 4, title: "Gamepad", price: 50, image: "imag.jpg" },
    // ];
  }

  render() {
    const Blok = document.querySelector(this.container);
    for (let product of this.goods) {
      const item = new ProductItem(product);
      Blok.innerHTML += item.render();
    }
  }
}

class ProductItem {
  constructor(product) {
    this.title = product.title;
    this.price = product.price;
    this.image = product.image;
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
    this.openBascet();
    this.render();
    this.bascetGoods = [];
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
        this.bascetGoods = request.contents.map((item) => ({
          title: item.product_name,
          pice: item.prise,
          id: item.id_product,
        }));
        this.render();
      });
  }
  render() {}
}

class ItemToBascet extends ProductItem {
  constructor(product) {
    super(product);
  }
  render() {}
}
let list = new ProductList();
let basket = new BoxBascet();
let itemcart = new ItemToBascet();
