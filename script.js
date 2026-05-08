(function(){
  if (window.lucide) window.lucide.createIcons({ strokeWidth: 1.8 });
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
    status.textContent = 'Спасибо. Заявка подготовлена: проверьте телефон и краткое описание ситуации перед передачей специалисту.';
    status.classList.add('is-visible');
  });
})();
