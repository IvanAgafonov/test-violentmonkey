// ==UserScript==
// @name         ton society quests
// @version      0.13
// @author       IvanAgafonov
// @match        https://commquest.xyz/*
// @downloadURL  https://github.com/IvanAgafonov/test-violentmonkey/raw/main/ton_quests.user.js
// @updateURL    https://github.com/IvanAgafonov/test-violentmonkey/raw/main/ton_quests.user.js
// @homepage     https://github.com/IvanAgafonov/test-violentmonkey
// @grant        none

// ==/UserScript==


function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

function getRandomDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Триггеры событий
function triggerEvents(element) {
  const events = [
      new MouseEvent('mouseover', {
  'view': window,
  'bubbles': true,
  'cancelable': true
}),
      new PointerEvent('pointerdown', { bubbles: true, cancelable: true, isTrusted: true, pointerId: 1, width: 1, height: 1, pressure: 0.5, pointerType: "touch" }),
      new MouseEvent('mousedown', { bubbles: true, cancelable: true, isTrusted: true, screenX: 182, screenY: 877 }),
      new PointerEvent('pointerup', { bubbles: true, cancelable: true, isTrusted: true, pointerId: 1, width: 1, height: 1, pressure: 0, pointerType: "touch" }),
      new MouseEvent('mouseup', { bubbles: true, cancelable: true, isTrusted: true, screenX: 182, screenY: 877 }),
      new PointerEvent('click', { bubbles: true, cancelable: true, isTrusted: true, pointerId: 1, width: 1, height: 1, pressure: 0, pointerType: "touch" }),
      new PointerEvent('pointerout', { bubbles: true, cancelable: true, isTrusted: true, pointerId: 1, width: 1, height: 1, pressure: 0, pointerType: "touch" }),
      new PointerEvent('pointerleave', { bubbles: true, cancelable: true, isTrusted: true, pointerId: 1, width: 1, height: 1, pressure: 0, pointerType: "touch" }),
      new MouseEvent('mouseout', { bubbles: true, cancelable: true, isTrusted: true, screenX: 182, screenY: 877 }),
      new MouseEvent('mouseleave', { bubbles: true, cancelable: true, isTrusted: true, screenX: 182, screenY: 877 })
  ];

  events.forEach((event, index) => {
      setTimeout(() => element.dispatchEvent(event), index * 100);
  });
}

function sleep(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function connectWallet(){
  var up2 = Array.from(document.querySelectorAll("div")).filter(el => el.textContent == "Wallet On" || el.textContent == "Wallet in")
  if (up2.length != 0){
    triggerEvents(up2[0]);
    await sleep(getRandomDelay(3000, 4100));
    up2 = Array.from(document.querySelectorAll("button")).filter(el => el.textContent.includes("Open Wallet in Telegram") || el.textContent.includes("Connect Wallet in Telegram on desktop"))
    if (up2.length != 0){
      triggerEvents(up2[0]);
      await sleep(getRandomDelay(10000, 21000));
    }
  }
  await sleep(getRandomDelay(2000, 3100));
}


async function autoBuy() {

  var up = Array.from(document.querySelectorAll(".tw-text-white.tw-ml-2.tw-text-body-bold.tw-select-none"));
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(1000, 2000));
    await connectWallet();
  }

  up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Вступить в сообщество");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(1000, 2000));
  }

  up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Пройти опрос для разработчиков");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(1000, 2000));
  }

  up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Поддержать ребят из AdsGram");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(1000, 2000));
  }

  up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Поддержать ребят из Magnetto");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(1000, 2000));
  }

  up = Array.from(document.querySelectorAll("div[class='tw-flex tw-items-center ']"));
  shuffle(up);
  for (const item of up) {
    triggerEvents(item);
    await sleep(getRandomDelay(1000, 2000));
  }

  await sleep(getRandomDelay(4000, 5000));

  up = Array.from(document.querySelectorAll("div[class=' tw-bg-black tw-h-7 tw-rounded-2xl  tw-flex tw-justify-center tw-items-center tw-px-3']"));
  shuffle(up);
  for (const item of up) {
    triggerEvents(item);
    await sleep(getRandomDelay(1000, 2000));
  }

  await sleep(getRandomDelay(4000, 5000));

  up = Array.from(document.querySelectorAll("div[class=' tw-bg-black tw-h-7 tw-rounded-2xl  tw-flex tw-justify-center tw-items-center tw-px-3']"));
  shuffle(up);
  for (const item of up) {
    triggerEvents(item);
    await sleep(getRandomDelay(1000, 2000));
  }

  // TODO

  up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Интеграция BTC в TON (tgBTC)");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(4000, 5000));

    up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Открыть");
    shuffle(up);
    for (const item of up) {
      triggerEvents(item);
      await sleep(getRandomDelay(1000, 2000));
    }

    await sleep(getRandomDelay(4000, 5000));

    up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Проверить");
    shuffle(up);
    for (const item of up) {
      triggerEvents(item);
      await sleep(getRandomDelay(1000, 2000));
    }

    up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Перейти");
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(4000, 5000));
    }

    var answers = ["Обеспечивает безопасный перенос биткоинов в блокчейн TON",
                   "Дает возможность использовать биткоины в DeFi-приложениях TON",
                   "Биткоины в TON полностью подкреплены эквивалентным резервом 1:1",
                   "Создает мост для дальнейших интеграций между блокчейнами"]

    up = Array.from(document.querySelectorAll("div p")).filter(el => answers.includes(el.textContent));
    shuffle(up);
    for (const item of up) {
      triggerEvents(item);
      await sleep(getRandomDelay(1000, 2000));
    }

    up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Ответить");
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(6000, 7000));
    }

    up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Завершить квест");
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(4000, 5000));
    }

    window.location.href = 'https://commquest.xyz/ton-cis/';
    await sleep(getRandomDelay(4000, 5000));
  }

  // TODO

  up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Telegram Stars – внутренняя валюта мессенджера");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(4000, 5000));

    up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Открыть");
    shuffle(up);
    for (const item of up) {
      triggerEvents(item);
      await sleep(getRandomDelay(1000, 2000));
    }

    await sleep(getRandomDelay(4000, 5000));

    up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Проверить");
    shuffle(up);
    for (const item of up) {
      triggerEvents(item);
      await sleep(getRandomDelay(1000, 2000));
    }

    up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Перейти");
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(4000, 5000));
    }

    var answers = ["Для упрощения оплаты цифровых товаров и услуг внутри экосистемы",
                   "Потому что разработчики больше не принимают платежи напрямую",
                   "Через Fragment",
                   "Если приобретает через Fragment",
                   "SplitTg"]

    up = Array.from(document.querySelectorAll("div p")).filter(el => answers.includes(el.textContent));
    shuffle(up);
    for (const item of up) {
      triggerEvents(item);
      await sleep(getRandomDelay(1000, 2000));
    }

    up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Ответить");
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(6000, 7000));
    }

    up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Завершить квест");
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(4000, 5000));
    }

    window.location.href = 'https://commquest.xyz/ton-cis/';
    await sleep(getRandomDelay(4000, 5000));
  }

  // TODO

  up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Как победить на хакатоне");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(4000, 5000));

    up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Открыть");
    shuffle(up);
    for (const item of up) {
      triggerEvents(item);
      await sleep(getRandomDelay(1000, 2000));
    }

    await sleep(getRandomDelay(4000, 5000));

    up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Проверить");
    shuffle(up);
    for (const item of up) {
      triggerEvents(item);
      await sleep(getRandomDelay(1000, 2000));
    }

    up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Перейти");
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(4000, 5000));
    }

    var answers = ["Помогают формировать команды и получать фидбек",
                   "Качественная презентация проекта",
                   "Получение токена репутации (SBT)",
                   "Разработка новых курсов и открытие тендера"]

    up = Array.from(document.querySelectorAll("div p")).filter(el => answers.includes(el.textContent));
    shuffle(up);
    for (const item of up) {
      triggerEvents(item);
      await sleep(getRandomDelay(1000, 2000));
    }

    up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Ответить");
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(6000, 7000));
    }

    up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Завершить квест");
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(4000, 5000));
    }


    window.location.href = 'https://commquest.xyz/ton-cis/';
    await sleep(getRandomDelay(4000, 5000));
  }

  // TODO

  up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Кросс-чейн переводы в TON (LayerZero)");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(4000, 5000));

    up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Открыть");
    shuffle(up);
    for (const item of up) {
      triggerEvents(item);
      await sleep(getRandomDelay(1000, 2000));
    }

    await sleep(getRandomDelay(4000, 5000));

    up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Проверить");
    shuffle(up);
    for (const item of up) {
      triggerEvents(item);
      await sleep(getRandomDelay(1000, 2000));
    }

    up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Перейти");
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(4000, 5000));
    }

    var answers = ["Обеспечивает кросс-чейн переводы токенов",
                   "USDe",
                   "12",
                   "Уменьшает риск проскальзывания цен и отказов транзакций"]

    up = Array.from(document.querySelectorAll("div p")).filter(el => answers.includes(el.textContent));
    shuffle(up);
    for (const item of up) {
      triggerEvents(item);
      await sleep(getRandomDelay(1000, 2000));
    }

    up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Ответить");
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(6000, 7000));
    }

    up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Завершить квест");
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(4000, 5000));
    }

    window.location.href = 'https://commquest.xyz/ton-cis/';
    await sleep(getRandomDelay(4000, 5000));
  }

  // TODO

  up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Как обезопасить себя от мошенников");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(4000, 5000));

    up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Открыть");
    shuffle(up);
    for (const item of up) {
      triggerEvents(item);
      await sleep(getRandomDelay(1000, 2000));
    }

    await sleep(getRandomDelay(4000, 5000));

    up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Проверить");
    shuffle(up);
    for (const item of up) {
      triggerEvents(item);
      await sleep(getRandomDelay(1000, 2000));
    }

    up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Перейти");
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(4000, 5000));
    }

    var answers = ["Подменяют буквы в юзернейме, делая их визуально похожими.",
                   "Сотрудники TON Foundation никогда не напишут в личные сообщения.",
                   "Никогда не подключать кошелёк к незнакомым или сомнительным платформам.",
                   "Отключить возможность добавления в группы без вашего разрешения."]

    up = Array.from(document.querySelectorAll("div p")).filter(el => answers.includes(el.textContent));
    shuffle(up);
    for (const item of up) {
      triggerEvents(item);
      await sleep(getRandomDelay(1000, 2000));
    }

    up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Ответить");
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(6000, 7000));
    }

    up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Завершить квест");
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(4000, 5000));
    }

  }

  // TODO


  up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "TONAPI Airdrop: Простое распределение токенов");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(4000, 5000));

    up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Открыть");
    shuffle(up);
    for (const item of up) {
      triggerEvents(item);
      await sleep(getRandomDelay(1000, 2000));
    }

    await sleep(getRandomDelay(4000, 5000));

    up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Проверить");
    shuffle(up);
    for (const item of up) {
      triggerEvents(item);
      await sleep(getRandomDelay(1000, 2000));
    }

    up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Перейти");
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(4000, 5000));
    }

    var answers = ["10 миллионов",
                   "Загрузить .csv файл с адресами, выбрать токен и запустить раздачу",
                   "Более 80% децентрализованных приложений на TON",
                   "Если приобретает через Fragment",
                   "Оплачивается только деплой токена"]

    up = Array.from(document.querySelectorAll("div p")).filter(el => answers.includes(el.textContent));
    shuffle(up);
    for (const item of up) {
      triggerEvents(item);
      await sleep(getRandomDelay(1000, 2000));
    }

    up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Ответить");
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(6000, 7000));
    }

    up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Завершить квест");
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(4000, 5000));
    }

    window.location.href = 'https://commquest.xyz/ton-cis/';
    await sleep(getRandomDelay(4000, 5000));
  }

  // TODO


  up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Анализ данных блокчейна TON через Dune");
  if (up.length != 0){
    triggerEvents(up[0]);
    await sleep(getRandomDelay(4000, 5000));

    up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Открыть");
    shuffle(up);
    for (const item of up) {
      triggerEvents(item);
      await sleep(getRandomDelay(1000, 2000));
    }

    await sleep(getRandomDelay(4000, 5000));

    up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Проверить");
    shuffle(up);
    for (const item of up) {
      triggerEvents(item);
      await sleep(getRandomDelay(1000, 2000));
    }

    up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Перейти");
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(4000, 5000));
    }

    var answers = ["В ноябре прошлого года",
                   "Анализировать данные и строить визуализации",
                   "SELECT block_date, COUNT(*) * 1e0 / (24 * 60 * 60) AS tps_avg FROM ton.transactions WHERE block_date >= NOW() - INTERVAL ‘30’ DAY GROUP BY 1",
                   "Raw, User-friendly, Bounceable"]

    up = Array.from(document.querySelectorAll("div p")).filter(el => answers.includes(el.textContent));
    shuffle(up);
    for (const item of up) {
      triggerEvents(item);
      await sleep(getRandomDelay(1000, 2000));
    }

    up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Ответить");
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(6000, 7000));
    }

    up = Array.from(document.querySelectorAll("div p")).filter(el => el.textContent == "Завершить квест");
    if (up.length != 0){
      triggerEvents(up[0]);
      await sleep(getRandomDelay(4000, 5000));
    }

    window.location.href = 'https://commquest.xyz/ton-cis/';
    await sleep(getRandomDelay(4000, 5000));
  }

}


function initializeScript() {

    console.log('START claim')

    setTimeout(autoBuy, getRandomDelay(12000, 13050));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScript);
} else {
    initializeScript();
}
