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
let itemBox = [];

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
    data-src="${vinyls[i].imageCover}" alt="Card image cap"></div>`;

    str += `<div class="panel-body">`;
    str += `<h3 class="item_title lead">${vinyls[i].name}</h3>`;
    str += `<p class="card-text ">${vinyls[i].author}</p>`;
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

  str += `</div></div></div>`;
  document.getElementById("vinyls").innerHTML = str;
  itemBox = document.querySelectorAll(".item_box");
  console.log(itemBox);
  for (let i = 0; i < itemBox.length; i++) {
    itemBox[i].querySelector(".add_item").addEventListener("click", addToCart);
  }
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

// блок каждого товара

// Записываем данные в LocalStorage
function setCartData(o) {
  localStorage.setItem("panel", JSON.stringify(o));
}
// Получаем данные из LocalStorage
function getCartData() {
  return JSON.parse(localStorage.getItem("panel"));
}

// Добавляем товар в корзину
function addToCart(e) {
  let button = e.target;
  button.disabled = true; // блокируем кнопку на время операции с корзиной
  let cartData = getCartData() || {}; // получаем данные корзины или создаём новый объект, если данных еще нет
  let parentBox = button.parentNode.parentNode; // родительский элемент кнопки "Добавить в корзину";
  let itemId = button.getAttribute("data-id"); // ID товара
  let itemTitle = parentBox.querySelector(".item_title").innerHTML; // название товара
  let itemPrice = parentBox.querySelector(".item_price").innerHTML; // стоимость товара
  console.log(parentBox.querySelector(".item_title").innerHTML);
  if (cartData.hasOwnProperty(itemId)) {
    cartData[itemId][2] += 1;
  } else {
    cartData[itemId] = [itemTitle, itemPrice, 1];
  }

  setCartData(cartData);
  button.disabled = false;
}
function clearCart() {
  localStorage.removeItem("panel");
  return false;
}
let cartCont = document.getElementById("cart_content");
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
  return Math.round(count * 100) / 100;
}
function removeItem(minus) {
  let cartData = getCartData();
  if (cartData) {
    let item = minus.getAttribute("data-id");
    cartData[item][2] = cartData[item][2] - 1;
    if (cartData[item][2] < 1) {
      delete cartData[item];
    }
    setCartData(cartData);
    let length = Object.getOwnPropertyNames(cartData);
    if (length == 0) clearCart();
    openCart();
  }
}
function addItem(plus) {
  let cartData = getCartData();
  if (cartData) {
    let item = plus.getAttribute("data-id");
    cartData[item][2] = cartData[item][2] + 1;
    if (cartData[item][2] < 1) {
      delete cartData[item];
    }
    setCartData(cartData);
    let length = Object.getOwnPropertyNames(cartData);
    if (length == 0) clearCart();
    openCart();
  }
}

function openCart() {
  let cartData = getCartData(); // вытаскиваем все данные корзины
  console.log(JSON.stringify(cartData));
  if (cartData !== null) {
    let cardTable = "";
    cardTable =
      '<table class="highlight shopping_list"><tr class="flow-text"><th>Назва</th><th>Ціна</th><th>Кількість</th><th>Видалити</th><th>Додати</th></tr>';
    for (let items in cartData) {
      cardTable += "<tr>";
      for (let i = 0; i < cartData[items].length; i++) {
        cardTable += "<td>" + cartData[items][i] + "</td>";
      }
      cardTable += `<td><span class="minus text-danger" onclick="removeItem(this)" data-id="${items}">-</span></td>`;
      cardTable += `<td><span class="minus text-danger" onclick="addItem(this)" data-id="${items}">+</span></td>`;
      cardTable += `</tr>`;
    }
    cardTable += `<tr style="font-weight:bold"><td>Сумарно:</td><td>${countPr()}$</td><td>${countAm()}</td></tr>`;
    cardTable += `</table>`;
    cartCont.innerHTML = cardTable;
  } else {
    cartCont.innerHTML = "В кошику пусто!";
  }
}
document.getElementById("busket").addEventListener("click", openCart);
