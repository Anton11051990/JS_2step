class ProductList {
  constructor(container = ".products") {
    this.container = container;
    this.goods = [];
    this._fetchProducts();
    this.render();
  }

  _fetchProducts() {
    this.goods = [
      { id: 1, title: "Notebook", price: 2000, image: "imag.jpg" },
      { id: 2, title: "Mouse", price: 20, image: "imag.jpg" },
      { id: 3, title: "Keyboard", price: 20, image: "imag.jpg" },
      { id: 4, title: "Gamepad", price: 50, image: "imag.jpg" },
    ];
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
    this.bascetGoogs = [];
    this.openBascet();
  }
  productSum() {}

  openBascet() {
    const bascetDiv = document.querySelector(".open");
    const btnBascet = document.querySelector(".btn-cart");
    btnBascet.addEventListener("click", () => {
      bascetDiv.classList.toggle("open");
    });
  }

  render() {}
}

class ItemToBascet {
  constructor() {
    this.klicItem();
    this.render();
  }

  klicItem() {
    const BuyBtn = document.querySelectorAll(".buy-btn");
    BuyBtn.forEach((i) => {
      i.addEventListener("click", (item) => {
        const itemList = 
      });
    });
  }

  render() {}
}
let list = new ProductList();
let basket = new BoxBascet();
let itemcart = new ItemToBascet();
