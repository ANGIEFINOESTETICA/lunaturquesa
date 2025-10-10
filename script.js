document.getElementById('lang-toggle').addEventListener('click', function() {
  document.querySelectorAll('.lang-es').forEach(e => e.classList.toggle('hidden'));
  document.querySelectorAll('.lang-en').forEach(e => e.classList.toggle('hidden'));
});