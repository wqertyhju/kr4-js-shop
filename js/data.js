// js/data.js
// Данные товара для КР №4.
// На практике №16 один объект будет заменён массивом товаров.

const product = {
  id: 1,
  title: 'Кофемашина Barista Home',
  category: 'kitchen',
  price: 19990,
  discountPercent: 10,
  rating: 4.7,
  isAvailable: true,
};

// Для проверки в консоли:
console.log('data.js подключён:', product);

// ===================================
// КР №4, практика №16: массив товаров
// ===================================

const products = [
  {
    id: 1,
    title: 'Кофемашина Barista Home',
    category: 'kitchen',
    price: 19990,
    discountPercent: 10,
    rating: 4.7,
    isAvailable: true,
  },
  {
    id: 2,
    title: 'Электрический чайник SmartHeat',
    category: 'kitchen',
    price: 4990,
    discountPercent: 5,
    rating: 4.5,
    isAvailable: true,
  },
  {
    id: 3,
    title: 'Пылесос CleanPro X2',
    category: 'home',
    price: 12990,
    discountPercent: 15,
    rating: 4.6,
    isAvailable: false,
  },
  {
    id: 4,
    title: 'Наушники SoundWave Air',
    category: 'electronics',
    price: 7990,
    discountPercent: 0,
    rating: 4.4,
    isAvailable: true,
  },
  {
    id: 5,
    title: 'Лампа настольная LightBook',
    category: 'home',
    price: 2490,
    discountPercent: 20,
    rating: 4.2,
    isAvailable: true,
  },
  {
    id: 6,
    title: 'Клавиатура KeyMaster Pro',
    category: 'electronics',
    price: 5990,
    discountPercent: 10,
    rating: 4.8,
    isAvailable: false,
  },
  {
    id: 7,
    title: 'Микроволновая печь HeatWave 20',
    category: 'kitchen',
    price: 8990,
    discountPercent: 10,
    rating: 4.3,
    isAvailable: true,
  },
  {
    id: 8,
    title: 'Книга "JavaScript для начинающих"',
    category: 'books',
    price: 1490,
    discountPercent: 5,
    rating: 4.9,
    isAvailable: true,
  },
  {
    id: 9,
    title: 'Умная лампа LightBook Mini',
    category: 'light',
    price: 1990,
    discountPercent: 15,
    rating: 4.1,
    isAvailable: false,
  },
  {
    id: 10,
    title: 'Книга "DOM и события"',
    category: 'books',
    price: 1790,
    discountPercent: 0,
    rating: 4.6,
    isAvailable: true,
  },];

console.log('data.js: массив products загружен, товаров:', products.length);

