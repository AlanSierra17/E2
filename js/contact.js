/**
 * E2 Software Factory – Contact Form
 * Redirects to WhatsApp with a pre-filled message
 */
(function () {
  'use strict';

  var form    = document.getElementById('contact-form');
  var success = document.getElementById('form-success');
  if (!form) return;

  var fields = {
    nombre:  form.querySelector('#field-nombre'),
    empresa: form.querySelector('#field-empresa'),
    email:   form.querySelector('#field-email'),
    sector:  form.querySelector('#field-sector'),
    dolor:   form.querySelector('#field-dolor')
  };

  /* --- Validation helpers --- */
  var freeProviders = [
    'gmail.com','yahoo.com','hotmail.com','outlook.com','live.com',
    'aol.com','protonmail.com','icloud.com','mail.com','yandex.com'
  ];

  function isBusinessEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) return false;
    var domain = email.split('@')[1].toLowerCase();
    return freeProviders.indexOf(domain) === -1;
  }

  function setError(group, msg) {
    group.classList.add('has-error');
    var input = group.querySelector('input, textarea, select');
    if (input) input.classList.add('is-error');
    var err = group.querySelector('.contact-form__error');
    if (err) err.textContent = msg;
  }

  function clearError(group) {
    group.classList.remove('has-error');
    var input = group.querySelector('input, textarea, select');
    if (input) input.classList.remove('is-error');
  }

  function clearAllErrors() {
    form.querySelectorAll('.contact-form__group').forEach(function (g) {
      clearError(g);
    });
  }

  /* --- Validate and Redirect to WhatsApp --- */
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearAllErrors();
    var valid = true;

    // Nombre
    if (!fields.nombre.value.trim()) {
      setError(fields.nombre.closest('.contact-form__group'), 'Ingrese su nombre.');
      valid = false;
    }

    // Empresa
    if (!fields.empresa.value.trim()) {
      setError(fields.empresa.closest('.contact-form__group'), 'Ingrese el nombre de su empresa.');
      valid = false;
    }

    // Email (must be business)
    var emailVal = (fields.email.value || '').trim();
    if (!emailVal) {
      setError(fields.email.closest('.contact-form__group'), 'Ingrese su correo corporativo.');
      valid = false;
    } else if (!isBusinessEmail(emailVal)) {
      setError(fields.email.closest('.contact-form__group'), 'Por favor use un correo corporativo, no personal.');
      valid = false;
    }

    // Sector
    if (!fields.sector.value) {
      setError(fields.sector.closest('.contact-form__group'), 'Seleccione un desafío principal.');
      valid = false;
    }

    // Dolor
    if (!fields.dolor.value.trim()) {
      setError(fields.dolor.closest('.contact-form__group'), 'Describa su situación brevemente.');
      valid = false;
    }

    if (!valid) return;

    var btn = form.querySelector('.contact-form__submit');
    btn.disabled = true;
    btn.textContent = 'Abriendo WhatsApp…';

    // Construir mensaje de WhatsApp
    var nombre = fields.nombre.value.trim();
    var empresa = fields.empresa.value.trim();
    var email = fields.email.value.trim();
    var sectorSelect = fields.sector.options[fields.sector.selectedIndex].text;
    var dolor = fields.dolor.value.trim();

    var mensaje = "Hola E2 Software Factory,\n\n" +
                  "Mi nombre es *" + nombre + "* de la empresa *" + empresa + "*.\n" +
                  "Mi correo corporativo es: " + email + "\n\n" +
                  "Me interesa recibir asesoría sobre mi principal desafío: *" + sectorSelect + "*.\n\n" +
                  "Esta es nuestra situación actual:\n_" + dolor + "_";

    var whatsappNumber = "573245396539"; // Número oficial
    var whatsappUrl = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(mensaje);

    // Redirigir a WhatsApp
    setTimeout(function () {
      window.open(whatsappUrl, '_blank');
      
      // Mostrar estado de éxito en el formulario
      form.style.display = 'none';
      success.classList.add('is-visible');
    }, 500);
  });

  /* --- Clear individual errors on input --- */
  Object.keys(fields).forEach(function (k) {
    if (fields[k]) {
      fields[k].addEventListener('input', function () {
        clearError(this.closest('.contact-form__group'));
      });
    }
  });
})();
