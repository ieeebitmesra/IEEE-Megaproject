var navbar = document.querySelector('.navbar-bg');
var cover = document.querySelector('.cover');

var options = {
	rootMargin: '-64px 0px 0px 0px',
};

var parallax = () => {
	if (window.innerWidth < 600) {
		cover.style.backgroundPositionY = '0px';
		return;
	}
	let scrollY = window.scrollY;
	cover.style.backgroundPositionY = `${-scrollY * 0.4}px`;
};

var intersection = new IntersectionObserver((entries) => {
	entries.forEach((e) => {
		if (e.isIntersecting) {
			if (!navbar.classList.contains('inner-cover')) {
				navbar.classList.add('inner-cover');
			}
			window.addEventListener('scroll', parallax);
		} else {
			if (navbar.classList.contains('inner-cover')) {
				navbar.classList.remove('inner-cover');
			}
			window.removeEventListener('scroll', parallax);
		}
	});
}, options);

intersection.observe(cover);
