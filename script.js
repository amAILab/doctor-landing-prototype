(function(){
  if (window.lucide) window.lucide.createIcons({ strokeWidth: 1.85 });

  const form = document.querySelector('#leadForm');
  const status = document.querySelector('#formStatus');
  if (!form || !status) return;

  form.addEventListener('submit', function(event){
    event.preventDefault();

    const phone = form.querySelector('[name="phone"]');
    const consent = form.querySelector('.consent input');

    if (!phone || !phone.value.trim()) {
      status.textContent = 'Укажите телефон, чтобы с вами могли связаться для уточнения ситуации.';
      status.classList.add('is-visible');
      phone && phone.focus();
      return;
    }

    if (consent && !consent.checked) {
      status.textContent = 'Подтвердите согласие на обработку данных для обратной связи.';
      status.classList.add('is-visible');
      consent.focus();
      return;
    }

    const button = form.querySelector('button[type="submit"]');
    if (button) {
      button.disabled = true;
      button.textContent = 'Заявка подготовлена';
    }

    form.classList.add('is-sent');
    status.textContent = 'Спасибо. Проверьте телефон и описание ситуации: эти данные понадобятся для обратной связи и согласования помощи.';
    status.classList.add('is-visible');
  });
})();
