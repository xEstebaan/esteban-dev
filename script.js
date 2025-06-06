// Validación y feedback del formulario de contacto

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    // Validación simple
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if (!name || !email || !message) {
      showStatus('Please fill in all fields.', false);
      return;
    }
    if (!validateEmail(email)) {
      showStatus('Please enter a valid email address.', false);
      return;
    }
    // Simular envío exitoso
    form.reset();
    showStatus('Thank you! Your message has been sent.', true);
  });

  function showStatus(msg, success) {
    let status = document.getElementById('form-status');
    if (!status) {
      status = document.createElement('div');
      status.id = 'form-status';
      form.appendChild(status);
    }
    status.textContent = msg;
    status.style.color = success ? '#2e7d32' : '#c62828';
    status.style.marginTop = '0.5rem';
    status.style.fontWeight = '500';
  }

  function validateEmail(email) {
    // Validación básica de email
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});

let currentLang = 'es';
const langFiles = {
  es: 'lang/es.json',
  en: 'lang/en.json'
};
const langLabels = {
  es: 'ES',
  en: 'EN'
};

async function loadLang(lang) {
  const res = await fetch(langFiles[lang]);
  const dict = await res.json();
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.innerHTML = dict[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) el.placeholder = dict[key];
  });
  document.getElementById('lang-label').textContent = langLabels[lang];
}

document.getElementById('lang-btn').addEventListener('click', () => {
  currentLang = currentLang === 'es' ? 'en' : 'es';
  loadLang(currentLang);
});

window.addEventListener('DOMContentLoaded', () => loadLang(currentLang));
