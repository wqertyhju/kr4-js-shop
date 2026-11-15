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
