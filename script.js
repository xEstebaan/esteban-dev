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
