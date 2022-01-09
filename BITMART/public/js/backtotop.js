var btn=document.getElementById('btop');

window.onscroll=function () {
  if (document.documentElement.scrollTop>30) {
    btn.classList.add('show');
  } else {
    btn.classList.remove('show');
  }
}

btn.addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});