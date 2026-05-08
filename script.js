(function(){
  const form = document.querySelector('#leadForm');
  const status = document.querySelector('#formStatus');
  if (!form || !status) return;
  form.addEventListener('submit', function(event){
    event.preventDefault();
    const phone = form.querySelector('[name="phone"]');
    if (!phone || !phone.value.trim()) {
      status.textContent = 'Укажите телефон, чтобы специалист мог связаться.';
      status.classList.add('is-visible');
      phone && phone.focus();
      return;
    }
    const button = form.querySelector('button[type="submit"]');
    if (button) {
      button.disabled = true;
      button.textContent = 'Заявка подготовлена';
    }
    form.classList.add('is-sent');
    status.textContent = 'MVP-режим: заявка не отправлена наружу. После подключения Telegram/Google Sheets здесь будет реальная отправка врачу.';
    status.classList.add('is-visible');
  });
})();
