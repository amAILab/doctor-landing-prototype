(function(){
  if (window.lucide) window.lucide.createIcons({ strokeWidth: 1.85 });

  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#siteNav');

  if (header && menuToggle && nav) {
    const closeMenu = () => {
      header.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Открыть меню');
    };
    menuToggle.addEventListener('click', () => {
      const isOpen = header.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
    });
    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeMenu();
    });
    document.addEventListener('click', (event) => {
      if (!header.classList.contains('is-open')) return;
      if (event.target.closest('.site-header')) return;
      closeMenu();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  }

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

    const leadDraft = {
      name: (form.querySelector('[name="name"]') || {}).value || '',
      phone: phone.value.trim(),
      area: (form.querySelector('[name="area"]') || {}).value || '',
      urgency: (form.querySelector('[name="urgency"]') || {}).value || '',
      message: (form.querySelector('[name="message"]') || {}).value || '',
      createdAt: new Date().toISOString()
    };

    try {
      window.localStorage.setItem('proZhiznLeadDraft', JSON.stringify(leadDraft));
    } catch (error) {
      // localStorage is optional: the prototype must still work without it.
    }

    form.classList.add('is-sent');
    status.textContent = 'Спасибо. Заявка подготовлена и сохранена в этом браузере как черновик. Проверьте телефон и описание ситуации перед подключением реальной CRM/почты.';
    status.classList.add('is-visible');
  });
})();
