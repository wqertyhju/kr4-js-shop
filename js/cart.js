// js/cart.js
// КР №4, самостоятельная доработка: корзина с localStorage.

const CART_STORAGE_KEY = 'kr4-cart';

// Состояние корзины: массив id товаров.
let cartIds = [];

// Загрузка корзины из localStorage.
function loadCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter((id) => typeof id === 'number');
  } catch (error) {
    console.warn('cart.js: не удалось прочитать корзину', error);
    return [];
  }
}

// Сохранение корзины.
function saveCart() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartIds));
  } catch (error) {
    console.warn('cart.js: не удалось сохранить корзину', error);
  }
}

// Добавление товара.
function addToCart(productId) {
  if (!cartIds.includes(productId)) {
    cartIds.push(productId);
    saveCart();
    renderCart();
  }
}

// Удаление товара.
function removeFromCart(productId) {
  cartIds = cartIds.filter((id) => id !== productId);
  saveCart();
  renderCart();
}

// Товары корзины (объекты из products).
function getCartProducts() {
  return products.filter((item) => cartIds.includes(item.id));
}

// Сумма корзины через reduce.
function calculateCartTotal() {
  return getCartProducts().reduce((sum, item) => sum + item.price, 0);
}

// Счётчик в шапке.
function renderCartCount() {
  const counters = document.querySelectorAll('[data-cart-count]');
  counters.forEach((counter) => {
    counter.textContent = String(cartIds.length);
  });
}

// Отрисовка страницы корзины (если есть контейнер).
function renderCart() {
  renderCartCount();

  const container = document.querySelector('[data-cart-container]');
  if (!container) {
    return;
  }

  const items = getCartProducts();
  container.textContent = '';

  if (items.length === 0) {
    const empty = document.createElement('p');
    empty.classList.add('cart-empty');
    empty.textContent = 'Корзина пуста.';
    container.append(empty);
    return;
  }

  items.forEach((item) => {
    const row = document.createElement('article');
    row.classList.add('cart-item');

    const title = document.createElement('h3');
    title.classList.add('cart-item__title');
    title.textContent = item.title;

    const price = document.createElement('p');
    price.classList.add('cart-item__price');
    price.textContent = 'Цена: ' + formatPrice(item.price);

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.classList.add('button', 'cart-item__remove');
    removeButton.dataset.action = 'remove-from-cart';
    removeButton.dataset.productId = String(item.id);
    removeButton.textContent = 'Удалить';

    row.append(title, price, removeButton);
    container.append(row);
  });

  const total = document.createElement('p');
  total.classList.add('cart-total');
  total.textContent = 'Итого: ' + formatPrice(calculateCartTotal());
  container.append(total);
}

// Делегирование удаления.
const cartContainer = document.querySelector('[data-cart-container]');
if (cartContainer) {
  cartContainer.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action="remove-from-cart"]');
    if (!button) {
      return;
    }
    removeFromCart(Number(button.dataset.productId));
  });
}

// Инициализация.
cartIds = loadCart();
renderCart();
