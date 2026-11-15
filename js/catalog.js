// js/catalog.js
// КР №4, практика №17: вывод карточек, поиск, фильтрация, сортировка.

// Состояние интерфейса каталога.
const catalogState = {
  query: '',
  category: 'all',
  sort: 'default',
};

// Элементы страницы.
const searchInput = document.querySelector('[data-catalog-search]');
const categorySelect = document.querySelector('[data-catalog-category]');
const sortSelect = document.querySelector('[data-catalog-sort]');
const productsContainer = document.querySelector('[data-products-container]');
const messageElement = document.querySelector('[data-catalog-message]');

// Подготовка списка товаров с учётом состояния.
function getVisibleProducts() {
  let result = searchProducts(products, catalogState.query);
  result = filterProductsByCategory(result, catalogState.category);

  if (catalogState.sort === 'price-asc') {
    result = sortProductsByPrice(result, 'asc');
  } else if (catalogState.sort === 'price-desc') {
    result = sortProductsByPrice(result, 'desc');
  }

  return result;
}

// Создание одной карточки товара.
function createProductCard(item) {
  const card = document.createElement('article');
  card.classList.add('product-card');
  card.dataset.productId = String(item.id);

  const title = document.createElement('h3');
  title.classList.add('product-card__title');
  title.textContent = item.title;

  const category = document.createElement('p');
  category.classList.add('product-card__category');
  category.textContent = 'Категория: ' + item.category;

  const price = document.createElement('p');
  price.classList.add('product-card__price');
  price.textContent = 'Цена: ' + formatPrice(item.price);

  const availability = document.createElement('p');
  availability.classList.add('product-card__availability');
  availability.textContent = getAvailabilityStatus(item.isAvailable);

  const button = document.createElement('button');
  button.type = 'button';
  button.classList.add('button', 'product-card__button');
  button.dataset.action = 'add-to-cart';
  button.dataset.productId = String(item.id);
  button.textContent = 'В корзину';

  card.append(title, category, price, availability, button);
  return card;
}

// Рендер каталога.
function renderCatalog() {
  if (!productsContainer) {
    return;
  }

  const visible = getVisibleProducts();
  productsContainer.textContent = '';

  if (visible.length === 0) {
    if (messageElement) {
      messageElement.textContent = 'Товары не найдены. Измените поиск или фильтр.';
    }
    return;
  }

  if (messageElement) {
    messageElement.textContent = 'Найдено товаров: ' + visible.length;
  }

  visible.forEach((item) => {
    productsContainer.append(createProductCard(item));
  });
}

// Делегирование клика по кнопкам «В корзину».
if (productsContainer) {
  productsContainer.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action="add-to-cart"]');
    if (!button) {
      return;
    }
    const productId = Number(button.dataset.productId);
    if (typeof addToCart === 'function') {
      addToCart(productId);
    }
    console.log('В корзину, id товара:', productId);
  });
}

// Обработчики изменения состояния.
if (searchInput) {
  searchInput.addEventListener('input', (event) => {
    catalogState.query = event.target.value;
    renderCatalog();
  });
}

if (categorySelect) {
  categorySelect.addEventListener('change', (event) => {
    catalogState.category = event.target.value;
    renderCatalog();
  });
}

if (sortSelect) {
  sortSelect.addEventListener('change', (event) => {
    catalogState.sort = event.target.value;
    renderCatalog();
  });
}

// Первый рендер.
renderCatalog();

