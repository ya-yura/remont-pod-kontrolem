const config = window.SITE_CONFIG || {};
const form = document.querySelector('#lead-form');
const status = document.querySelector('#form-status');
const safeUrl = value => { try { const url = new URL(value); return url.protocol === 'https:' ? url.href : ''; } catch { return ''; } };
const endpoint = safeUrl(config.formEndpoint);
if (endpoint) form.action = endpoint;
if (config.name) document.querySelector('.hero .eyebrow').textContent = `${config.name}${config.city ? ' / ' + config.city : ''} — организатор ремонта`;
const contacts = document.querySelector('#contact-links');
function addContact(text, href) { const link = document.createElement('a'); link.textContent = text; link.href = href; contacts.append(link); }
if (config.phone) addContact(config.phone, 'tel:' + config.phone.replace(/[^+\d]/g, ''));
if (/^[a-zA-Z0-9_]{5,32}$/.test(config.telegram)) addContact('Написать в Telegram ↗', 'https://t.me/' + config.telegram);
const mapUrl = safeUrl(config.mapEmbed);
if (mapUrl && new URL(mapUrl).hostname === 'yandex.ru' && new URL(mapUrl).pathname.startsWith('/map-widget/')) {
  const map = document.createElement('iframe'); map.src = mapUrl; map.title = 'Местоположение на Яндекс Картах'; map.loading = 'lazy'; map.referrerPolicy = 'no-referrer-when-downgrade'; document.querySelector('#map-slot').append(map);
  const directions = safeUrl(config.mapDirections); if (directions) addContact('Построить маршрут ↗', directions);
}
form.addEventListener('submit', async event => {
  event.preventDefault();
  const phone = form.elements.phone;
  phone.setCustomValidity(phone.value.replace(/\D/g, '').length < 10 ? 'Укажите телефон с кодом города или страны.' : '');
  if (!form.reportValidity()) return;
  if (!endpoint) { status.textContent = 'Онлайн-запись сейчас недоступна. Пожалуйста, попробуйте позже.'; return; }
  const button = form.querySelector('button'); button.disabled = true; button.textContent = 'Отправляем…'; status.textContent = '';
  try {
    const response = await fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error('Request failed');
    status.textContent = 'Спасибо! Ваше обращение отправлено. Свяжусь с вами, чтобы обсудить ремонт.'; form.reset();
  } catch { status.textContent = 'Не удалось отправить обращение. Проверьте соединение и попробуйте ещё раз.'; }
  finally { button.disabled = false; button.innerHTML = 'Обсудить ремонт <span>↗</span>'; }
});
form.elements.phone.addEventListener('input', () => form.elements.phone.setCustomValidity(''));
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('reveal'); observer.unobserve(entry.target); } }); }, { threshold: .08 });
  document.querySelectorAll('.section-heading,.benefits article,.steps article,.control-grid,.scope-grid').forEach(element => observer.observe(element));
  const sticky = document.querySelector('.mobile-cta');
  new IntersectionObserver(entries => { sticky.classList.toggle('hidden', entries[0].isIntersecting); }, { threshold: .1 }).observe(form);
}
