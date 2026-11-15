// js/validation.js
// КР №4, практика №17: базовая валидация формы заявки.

const orderForm = document.getElementById('order-form');
const formErrorElement = document.querySelector('[data-form-error]');
const successMessageElement = document.getElementById('success-message');

// Проверка e-mail простым шаблоном.
function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// Проверка телефона: допускаем цифры, пробелы, +, (, ), -.
function isValidPhone(value) {
  if (value.trim() === '') {
    return true; // телефон необязателен
  }
  return /^\+?[\d\s()-]{10,18}$/.test(value);
}

// Сбор и проверка данных формы.
function validateForm() {
  const errors = [];

  const name = orderForm.elements.name.value.trim();
  const email = orderForm.elements.email.value.trim();
  const phone = orderForm.elements.phone.value.trim();
  const topic = orderForm.elements.topic.value;
  const agreement = orderForm.elements.agreement.checked;

  if (name.length < 2) {
    errors.push('Укажите имя (минимум 2 символа).');
  }
  if (email === '' || !isValidEmail(email)) {
    errors.push('Укажите корректный e-mail.');
  }
  if (!isValidPhone(phone)) {
    errors.push('Телефон должен содержать 10–18 цифр и допустимые символы.');
  }
  if (topic === '') {
    errors.push('Выберите тему заявки.');
  }
  if (!agreement) {
    errors.push('Подтвердите согласие на обработку данных.');
  }

  return errors;
}

// Сброс подсветки ошибок.
function clearFieldErrors() {
  const fields = orderForm.querySelectorAll('input, select, textarea');
  fields.forEach((field) => {
    field.removeAttribute('aria-invalid');
  });
}

// Пометка проблемных полей.
function markFieldErrors() {
  const name = orderForm.elements.name;
  const email = orderForm.elements.email;
  const phone = orderForm.elements.phone;
  const topic = orderForm.elements.topic;
  const agreement = orderForm.elements.agreement;

  if (name.value.trim().length < 2) {
    name.setAttribute('aria-invalid', 'true');
  }
  if (email.value.trim() === '' || !isValidEmail(email.value.trim())) {
    email.setAttribute('aria-invalid', 'true');
  }
  if (!isValidPhone(phone.value.trim())) {
    phone.setAttribute('aria-invalid', 'true');
  }
  if (topic.value === '') {
    topic.setAttribute('aria-invalid', 'true');
  }
  if (!agreement.checked) {
    agreement.setAttribute('aria-invalid', 'true');
  }
}

if (orderForm) {
  orderForm.addEventListener('submit', (event) => {
    event.preventDefault();

    clearFieldErrors();
    if (formErrorElement) {
      formErrorElement.textContent = '';
    }
    if (successMessageElement) {
      successMessageElement.hidden = true;
    }

    const errors = validateForm();

    if (errors.length > 0) {
      markFieldErrors();
      if (formErrorElement) {
        formErrorElement.textContent = errors.join(' ');
      }
      return;
    }

    if (formErrorElement) {
      formErrorElement.textContent = '';
    }
    if (successMessageElement) {
      successMessageElement.hidden = false;
    }

    orderForm.reset();
  });
}
