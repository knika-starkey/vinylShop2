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
    str += `<div class="card">`;
    str += `<img class="card-img-top" src="${vinyls[i].imageCover}" alt="Card image cap">`;
    str += `<div class="card-body">`;
    str += `<h5 class="card-title">${vinyls[i].name}</h5>`;
    str += `<p class="card-text">${vinyls[i].author}</p>`;
    if (vinyls[i].stocked) str += `<p><strong>${vinyls[i].price}</strong></p>`;
    else str += `<p><s>${vinyls[i].price}</s></p>`;
    str += `<a href="#" class="btn btn-danger">Купити</a>`;
    str += `</div>`;
    str += `</div>`;
    str += `</div>`;
  }

  str += `</div>`;
  document.getElementById("vinyls").innerHTML = str;
}
loadVinyls();
