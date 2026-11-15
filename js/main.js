// Получаем модальное окно по id.
const orderDialog = document.getElementById('order-dialog');

// Получаем все кнопки заказа в карточках товаров.
const orderButtons = document.querySelectorAll('.product-card__button');

// Получаем кнопку закрытия модального окна.
const closeDialogButton = document.getElementById('close-order-dialog');

// Получаем скрытое поле, в которое будет записан выбранный товар.
const selectedProductInput = document.getElementById('selected-product');

// Перебираем все кнопки «Заказать».
orderButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Получаем название товара из data-атрибута.
    const productName = button.dataset.product;

    // Записываем название товара в скрытое поле формы.
    selectedProductInput.value = productName;

    // Открываем модальное окно.
    orderDialog.showModal();
  });
});

// Закрываем модальное окно по кнопке «Закрыть».
closeDialogButton.addEventListener('click', () => {
  orderDialog.close();
});

// Получаем форму заявки.
const orderForm = document.getElementById('order-form');

// Получаем сообщение об успешной отправке.
const successMessage = document.getElementById('success-message');

// Обрабатываем отправку формы.
orderForm.addEventListener('submit', (event) => {
  // Отменяем стандартную отправку формы,
  // потому что backend пока не подключён.
  event.preventDefault();

  // Сбрасываем предыдущие признаки ошибок.
  const formElements = Array.from(orderForm.elements);

  formElements.forEach((element) => {
    if (element.willValidate) {
      element.removeAttribute('aria-invalid');
    }
  });

  // Проверяем встроенные HTML-ограничения формы.
  if (!orderForm.checkValidity()) {
    formElements.forEach((element) => {
      if (element.willValidate && !element.checkValidity()) {
        element.setAttribute('aria-invalid', 'true');
      }
    });

    // Показываем стандартные сообщения браузера.
    orderForm.reportValidity();
    return;
  }

  // Показываем сообщение об успешной отправке.
  successMessage.hidden = false;

  // Очищаем форму.
  orderForm.reset();

  // Закрываем модальное окно.
  orderDialog.close();
});
// ===================================
// КР №4, практика №15: данные и функции обработки
// ===================================

// 1. Проверка подключения data.js
console.log('data.js подключён, товар:', product);

// 2. Форматирование цены
function formatPrice(price) {
  return `${price} руб.`;
}

// 3. Размер скидки в рублях
function getDiscountValue(price, discountPercent) {
  return price * discountPercent / 100;
}

// 4. Итоговая цена со скидкой
function getFinalPrice(price, discountPercent) {
  return price - getDiscountValue(price, discountPercent);
}

// 5. Статус наличия товара
function getAvailabilityStatus(isAvailable) {
  if (isAvailable) {
    return 'Товар в наличии';
  }
  return 'Товара нет в наличии';
}

// 6. Краткое описание товара
function getShortDescription(product) {
  return `${product.title} — ${formatPrice(product.price)}, рейтинг ${product.rating}.`;
}

// 7. Вывод результатов в консоль
console.log('Цена:', formatPrice(product.price));
console.log('Скидка, руб.:', getDiscountValue(product.price, product.discountPercent));
console.log('Итоговая цена:', formatPrice(getFinalPrice(product.price, product.discountPercent)));
console.log('Статус:', getAvailabilityStatus(product.isAvailable));
console.log('Кратко:', getShortDescription(product));

// 8. Безопасный вывод на страницу через textContent
const jsMessageElement = document.querySelector('.js-message');
if (jsMessageElement) {
  jsMessageElement.textContent = 'JavaScript подключён корректно.';
}

// ===================================
// КР №4, практика №16: массив товаров, поиск, фильтрация, сортировка, расчёты
// ===================================

// 1. Цикл for — перебор по индексам
console.log('--- for ---');
for (let i = 0; i < products.length; i += 1) {
  console.log(products[i].title);
}

// 2. Цикл for...of
console.log('--- for...of ---');
for (const item of products) {
  console.log(item.title);
}

// 3. forEach — вывод названий
console.log('--- forEach ---');
products.forEach((item) => {
  console.log(item.title);
});

// 4. map — массив названий
const productTitles = products.map((item) => item.title);
console.log('map, названия:', productTitles);

// 5. filter — товары в наличии
function filterAvailableProducts(list) {
  return list.filter((item) => item.isAvailable);
}
console.log('В наличии:', filterAvailableProducts(products).map((item) => item.title));

// 6. find — товар по id
function findProductById(list, id) {
  return list.find((item) => item.id === id);
}
const foundProduct = findProductById(products, 2);
if (foundProduct) {
  console.log('find, товар id=2:', foundProduct.title);
} else {
  console.log('find: товар не найден');
}

// 7. Поиск по названию
function searchProducts(list, query) {
  const normalizedQuery = query.trim().toLowerCase();
  if (normalizedQuery === '') {
    return list;
  }
  return list.filter((item) => item.title.toLowerCase().includes(normalizedQuery));
}
console.log('Поиск "чайник":', searchProducts(products, 'чайник').map((item) => item.title));

// 8. Фильтрация по категории
function filterProductsByCategory(list, category) {
  if (category === 'all') {
    return list;
  }
  return list.filter((item) => item.category === category);
}
console.log('Категория kitchen:', filterProductsByCategory(products, 'kitchen').map((item) => item.title));

// 9. Сортировка по цене (копия массива)
function sortProductsByPrice(list, direction = 'asc') {
  const copy = [...list];
  if (direction === 'desc') {
    return copy.sort((a, b) => b.price - a.price);
  }
  return copy.sort((a, b) => a.price - b.price);
}
console.log('Сортировка по возрастанию:', sortProductsByPrice(products, 'asc').map((item) => item.price));
console.log('Сортировка по убыванию:', sortProductsByPrice(products, 'desc').map((item) => item.price));

// 10. Количество товаров
function countProducts(list) {
  return list.length;
}
console.log('Всего товаров:', countProducts(products));

// 11. Количество товаров в наличии
function countAvailableProducts(list) {
  return list.filter((item) => item.isAvailable).length;
}
console.log('В наличии, шт.:', countAvailableProducts(products));

// 12. Средняя цена
function calculateAveragePrice(list) {
  if (list.length === 0) {
    return 0;
  }
  const total = list.reduce((sum, item) => sum + item.price, 0);
  return total / list.length;
}
console.log('Средняя цена:', calculateAveragePrice(products));

// 13. Общая стоимость
function calculateTotalPrice(list) {
  return list.reduce((sum, item) => sum + item.price, 0);
}
console.log('Общая стоимость:', calculateTotalPrice(products));

// 14. Безопасный вывод кратких результатов на страницу через textContent
const jsSummaryElement = document.querySelector('.js-summary');
if (jsSummaryElement) {
  jsSummaryElement.textContent =
    `Товаров: ${countProducts(products)}. ` +
    `В наличии: ${countAvailableProducts(products)}. ` +
    `Средняя цена: ${Math.round(calculateAveragePrice(products))} руб. ` +
    `Общая стоимость: ${calculateTotalPrice(products)} руб.`;
}
