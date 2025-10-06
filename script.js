document.getElementById('lang-toggle').addEventListener('click', function(){
  const es = document.querySelectorAll('.lang-es');
  const en = document.querySelectorAll('.lang-en');
  const isSpanish = !es[0].classList.contains('hidden');
  es.forEach(el => el.classList.toggle('hidden', isSpanish));
  en.forEach(el => el.classList.toggle('hidden', !isSpanish));
  this.textContent = isSpanish ? '🇪🇸 Español' : '🇺🇸 English';
});