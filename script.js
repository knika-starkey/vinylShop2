document.onreadystatechange = function () {
  let state = document.readyState;
  if (state == "interactive") {
    document.getElementById("contents").style.visibility = "hidden";
    document.getElementById("load").style.visibility = "visible";
  } else if (state == "complete") {
    setTimeout(function () {
      document.getElementById("load").style.visibility = "hidden";
      document.getElementById("contents").style.visibility = "visible";
    }, 2500);
  }
};

function loadVinyls() {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", "vinyl.json", true);
  xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState != 4) return;
    if (xhttp.status != 200) {
      alert(xhttp.status + ": " + xhr.statusText);
    } else {
      let vinyls = JSON.parse(xhttp.responseText);
      insertVinyls(vinyls);
    }
  };
}

function insertVinyls(vinyls) {
  let str = `<div class="row">`;
  for (let i = 0; i < vinyls.length; i++) {
    str += `<div class="col-6 col-sm-4 col-lg-2 col-md-3">`;
    str += `<div class="panel panel-default text-center item_box">`;
    str += `<div class="panel-heading"><img class="card-img-top" src="./images/lazy_load_image.gif"
    data-src="${vinyls[i].imageCover}" alt="Card image cap">`;
    str += `<h3 class="item_title lead">${vinyls[i].name}</h3>`;
    str += `<p class="card-text ">${vinyls[i].author}</p></div>`;
    str += `<div class="panel-body">`;

    str += `<div class="panel-footer">`;
    // str += `<h5 class="card-title item_title">${vinyls[i].name}</h5>`;
    str += `<h6><span class="item_price">${vinyls[i].price}</span> $</h6>`;

    // if (vinyls[i].stocked)btn btn-danger add_item

    // else str += `<p><s><span>${vinyls[i].price}</span></s></p>`;
    str += `<button class="btn btn-danger add_item" data-id="${vinyls[i].id}">Купити</button></div>`;
    str += `</div>`;
    str += `
  </div>`;
    str += `</div>`;
  }

  str += `</div><div class="text-center">
  <button id="checkout" class="btn btn-lg btn-danger">
    Оформить заказ
  </button>
  &nbsp;
  <button id="clear_cart" class="btn btn-lg btn-danger">
    Очистить корзину
  </button>
</div></div></div>`;
  document.getElementById("vinyls").innerHTML = str;
}
loadVinyls();

function isVisible(elem) {
  let coords = elem.getBoundingClientRect();
  let windowHeight = document.documentElement.clientHeight;
  let isTop = coords.top > 0 && coords.top < windowHeight;
  let isBot = coords.bottom < windowHeight && coords.bottom > 0;
  return isTop || isBot;
}

function showVisible() {
  for (let img of document.querySelectorAll("img")) {
    let realSrc = img.dataset.src;
    if (!realSrc) continue;

    if (isVisible(img)) {
      realSrc += "?nocache=" + Math.random();

      img.src = realSrc;

      img.dataset.src = "";
    }
  }
}

window.addEventListener("scroll", showVisible);
showVisible();

let itemBox = document.querySelectorAll(".item_box"); // блок каждого товара

// Записываем данные в LocalStorage
function setCartData(o) {
  localStorage.setItem("cart", JSON.stringify(o));
}
// Получаем данные из LocalStorage
function getCartData() {
  return JSON.parse(localStorage.getItem("cart"));
}
function countAm() {
  let count = 0;
  if (getCartData()) {
    let cartData = getCartData();
    for (const key in cartData) {
      count += cartData[key][2];
    }
  }
  return count;
}
function countPr() {
  let count = 0;
  if (getCartData()) {
    let cartData = getCartData();
    for (const key in cartData) {
      count += cartData[key][1] * cartData[key][2];
    }
  }
  return count;
}
// Добавляем товар в корзину
function addToCart(e) {
  let button = e.target;
  button.disabled = true; // блокируем кнопку на время операции с корзиной
  let cartData = getCartData() || {}; // получаем данные корзины или создаём новый объект, если данных еще нет
  let parentBox = button.parentNode; // родительский элемент кнопки "Добавить в корзину";
  let itemId = button.getAttribute("data-id"); // ID товара
  let itemTitle = parentBox.querySelector(".item_title").innerHTML; // название товара
  let itemPrice = parentBox.querySelector(".item_price").innerHTML; // стоимость товара
  console.log(cartData);
  if (cartData.hasOwnProperty(itemId)) {
    cartData[itemId][2] += 1;
  } else {
    cartData[itemId] = [itemTitle, itemPrice, 1];
  }

  setCartData(cartData);
  button.disabled = false;
}
function clearCart(e) {
  localStorage.removeItem("cart");
}
for (let i = 0; i < itemBox.length; i++) {
  itemBox[i].querySelector(".add_item").addEventListener("click", addToCart);
  document.getElementById("clear_cart").addEventListener("click", clearCart);
}
console.log(itemBox);
