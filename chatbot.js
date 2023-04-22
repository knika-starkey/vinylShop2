$(function () {
  const phrases = [
    "Ласкаво просимо в наш інтернет-магазин! Як я можу Вам допомогти сьогодні?",
    "Якщо у Вас є якісь запитання про наші товари або послуги, я буду рада Вам допомогти.",
    "Чи шукаєте Ви щось конкретне сьогодні, чи я можу запропонувати деякі товари?",
    "Хочете дізнатися більше про наші акції та знижки? Я можу розповісти Вам про них.",
    "Якщо у Вас є відгуки або пропозиції щодо нашого інтернет-магазину, будь ласка, дайте мені знати. Ваша думка дуже важлива для нас.",
    "Якщо Вам потрібна допомога з оформленням замовлення, я можу Вам допомогти. Просто дайте мені знати, яку продукцію Ви хочете придбати.",
    "Якщо Ви не можете знайти те, що шукаєте, будь ласка, скажіть мені. Можливо, я зможу запропонувати Вам альтернативні варіанти.",
    "Якщо у Вас виникли проблеми з оплатою або доставкою, я можу допомогти Вам вирішити ці питання.",
    "Не забудьте перевірити наші новинки та найпопулярніші товари. Я можу порекомендувати їх для Вас.",
    "Дякуємо, що вибрали наш інтернет-магазин. Ми надаємо якісні послуги та продукцію та будемо раді бачити Вас у нашому магазині знову.",
  ];

  const musicPhr = [
    "Ласкаво просимо до чат бота про музику! Якщо Вам потрібно порадитися щодо музичних пристрастей або дізнатися більше про різні жанри музики, я буду радий Вам допомогти.",
    "Чи знаєте Ви, який жанр музики Вам подобається? Я можу запропонувати Вам різні жанри музики, щоб Ви могли вибрати той, який Вам найбільше подобається.",
    "Якщо Ви шукаєте певного артиста або пісню, скажіть мені, і я допоможу Вам знайти її.",
    "Якщо у Вас є питання щодо концертів або музичних фестивалів, я можу надати Вам інформацію про них.",
    "Якщо Вам потрібна порада щодо музичних інструментів або обладнання, я можу допомогти Вам знайти правильні інструменти для Вашої потреби.",
    "Якщо Ви хочете дізнатися більше про історію музики та її розвиток, я з радістю розповім Вам про це.",
    "Якщо у Вас є питання щодо нот та нотних записів, я можу допомогти Вам знайти потрібну інформацію.",
    "Якщо Ви хочете дізнатися більше про музичний процес створення, я можу розповісти Вам про різні аспекти композиції та аранжування музики.",
    "Якщо Вам потрібна порада щодо музичних програм або додатків, я можу надати Вам рекомендації щодо тих, які можуть бути корисні для Вас.",
    "Не забудьте перевірити наші рекомендації щодо нових музичних релізів та артистів.",
  ];

  const vinylPhr = [
    "Ласкаво просимо до чат бота про вінілові платівки! Якщо у Вас є запитання щодо вінілових платівок або Вам потрібна порада щодо покупки, я з радістю допоможу.",
    "Вінілові платівки – це вічність, і якщо Ви любите музику, Ви повинні мати їх у своїй колекції. Я можу допомогти Вам знайти ту, яка підійде саме для Вас.",
    "Якщо Ви шукаєте певну вінілову платівку, скажіть мені, і я допоможу Вам знайти її.",
    "Якщо Ви не знаєте, яку вінілову платівку купити, я можу запропонувати Вам кілька рекомендацій, в залежності від Ваших музичних пристрастей.",
    "Я можу допомогти Вам знайти вінілові платівки з різних частин світу та в різних жанрах музики.",
    "Якщо Ви хочете дізнатися більше про історію вінілових платівок, я можу розповісти Вам про це та про те, як їх створюють.",
    "Якщо Вам потрібно порадитися щодо догляду за вініловими платівками, я можу допомогти Вам знайти правильні методи догляду та зберігання.",
    "Якщо Ви хочете дізнатися більше про звукові характеристики вінілових платівок та як вони впливають на звучання музики, я можу розповісти Вам про це.",
    "Якщо Ви хочете дізнатися про нові вінілові релізи та поповнення нашого каталогу, я можу повідомляти Вас про це.",
  ];

  const hello = "Вітаю! Я - радіо Марія";
  const goodbye = "До зустрічі!";
  //   $("h2").css("color", "red");

  $("#chatbot").click(function () {
    $(this).toggleClass("show");
  });
  $("#answers").append(`<div class="bot_answ">${hello}</div>`);
  $("#answers").click(function () {
    return false;
  });
  $("#ok").click(function () {
    let q = $("#question").val().trim();
    if (q != "") {
      $("#answers").append(`<div class="human_answ">${q}</div>`);
      setTimeout(function () {
        if (
          q.toLowerCase().includes("бувай") ||
          q.toLowerCase().includes("побачення")
        ) {
          $("#answers").append(`<div class="bot_answ">${goodbye}</div>`);
        } else if (
          q.toLowerCase().includes("привіт") ||
          q.toLowerCase().includes("здравствуй")
        ) {
          $("#answers").append(`<div class="bot_answ">${hello}</div>`);
        } else if (
          q.toLowerCase().includes("музика") ||
          q.toLowerCase().includes("пісня") ||
          q.toLowerCase().includes("жанр")
        ) {
          $("#answers").append(
            `<div class="bot_answ">${
              musicPhr[Math.floor(Math.random() * musicPhr.length)]
            }</div>`
          );
        } else if (
          q.toLowerCase().includes("вініл") ||
          q.toLowerCase().includes("альбом") ||
          q.toLowerCase().includes("платівк")
        ) {
          $("#answers").append(
            `<div class="bot_answ">${
              vinylPhr[Math.floor(Math.random() * vinylPhr.length)]
            }</div>`
          );
        } else {
          $("#answers").append(
            `<div class="bot_answ">${
              phrases[Math.floor(Math.random() * phrases.length)]
            }</div>`
          );
        }

        let chatbot = document.getElementById("chatbot");
        $("#chatbot").animate(
          { scrollTop: chatbot.scrollHeight - chatbot.clientHeight },
          500
        );
      }, 1000);
    }

    $("#question").val("");
    return false;
  });
  function enterKey(event) {
    if (event.keyCode == 13) {
      $("#ok").click();
      return false;
    }
  }
  $("#question").keypress("keyup", enterKey);
  $("#question").click(function () {
    return false;
  });
});

// $("#myVideo")
$("#stop").click(function () {
  $("#myVideo").trigger("pause");
});
$("#play").click(function () {
  $("#myVideo").trigger("play");
});
$("#logIn").click(function () {
  $("#logBox").css("display", "block");
});

let modal = document.getElementById("logBox");

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

$("#logBtn").click(function () {
  document.cookie = `user=${$("#uname").val()}`;
  console.log(document.cookie);
  return false;
});

$(".close").click(function () {
  $("#logBox").css("display", "none");
  $("#basketBox").css("display", "none");
});

let userName = document.cookie.replace("user=", "");
$("#hi").text(userName != "" ? `Раді знову бачити, ${userName}!` : "Вітаємо!");

$("#busket").click(function () {
  $("#basketBox").css("display", "block");
});

let modalShop = document.getElementById("basketBox");

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
