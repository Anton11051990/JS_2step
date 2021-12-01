const products = [
  { id: 1, title: "Notebook", price: 2000, image: "image" },
  { id: 2, title: "Mouse", price: 20, image: "image" },
  { id: 3, title: "Keyboard", price: 20, image: "image" },
  { id: 4, title: "Gamepad", price: 50, image: "image" },
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (title, price, image) => {
  return `<div class="product-item">
                <h3 class="title">${title}</h3>
                <img src="images/imag.jpg" alt="">
                <p class="price">${price}</p>
                <button class="buy-btn">Купить</button>
            </div>`;
};
const renderPage = (list) => {
  const productsList = list.map((item) =>
    renderProduct(item.title, item.price, item.image)
  );
  console.log(productsList);
  document.querySelector(".products").innerHTML = productsList.join("");
};

renderPage(products);
