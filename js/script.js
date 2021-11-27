"use strict";

window.onload = function () {

	function testWebP(callback) {

	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

	if (support == true) {
		document.querySelector('body').classList.add('webp');
	} else {
		document.querySelector('body').classList.add('no-webp');
	}
});;
const animItems = document.querySelectorAll("._anim-item");

if (animItems.length > 0) {

	window.addEventListener('scroll', animOnScroll);

	function animOnScroll(params) {
		for (let index = 0; index < animItems.length; index++) {

			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 4; //para que el objeto aparezca cuando alcamzamos su quarta parte

			let animItemPoint = window.innerHeight - animItemHeight / animStart;

			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && (pageYOffset < (animItemOffset + animItemHeight))) {
				animItem.classList.add("_animation");
			}
			else {
				if (!animItem.classList.contains("_anim-no-hide")) {
					animItem.classList.remove("_animation");
				}
			}
		}
	}

	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}

	setTimeout(() => { //Delay al principio
		animOnScroll();
	}, 300);

};;

	document.querySelector(".wrapper").classList.add("_loaded");

	//===IBG
	function ibg() {
		let ibgs = document.querySelectorAll('.ibg');
		if (ibgs.length > 0) {
			for (let index = 0; index < ibgs.length; index++) {
				const ibg = ibgs[index];
				if (ibg.querySelector("img")) {
					ibg.style.backgroundImage = 'url("' + ibg.querySelector('img').src + '")';
				}
			}
		}
	}
	ibg();
	//===

	//===BURGER	
	const headerWrapper = document.querySelector('.header__wrapper');
	const iconMenu = document.querySelector('.icon-menu');
	const menuBody = document.querySelector('.menu');
	if (iconMenu) {
		iconMenu.addEventListener('click', function (e) {
			document.body.classList.toggle("_lock");
			iconMenu.classList.toggle("_active");
			menuBody.classList.toggle("_active");
			headerWrapper.classList.toggle("_open");
		});
	}
	//===

	//===HEADER_SCROLL
	const headerElement = document.querySelector('.header');
	const upElement = document.querySelector(".up");

	const callback = function (entries, observer) {
		if (entries[0].isIntersecting) {
			headerElement.classList.remove("_scroll");
			upElement.classList.remove("_active");
		}
		else {
			headerElement.classList.add("_scroll");
			upElement.classList.add("_active");
		}
	}
	const headerObserver = new IntersectionObserver(callback);
	headerObserver.observe(headerElement);
	//===

	//===VIDEO_SLIDER
	let videoSlider = new Swiper(".main-slider", {
		slidesPerView: 1,

		grabCursor: true,

		watchOverflow: true,

		speed: 1800,

		autoplay: {
			delay: 2000,

			disableOnInteraction: true
		},

		loop: true,
	});
	//===

	//===VIDEO
	const videoButtons = document.querySelectorAll(".video-slide__icon");

	for (let index = 0; index < videoButtons.length; index++) {
		const videoButton = videoButtons[index];
		videoButton.addEventListener('click', function (e) {
			const videoContainer = videoButton.closest(".video-slide");
			const videoItem = videoContainer.querySelector("video");

			videoSlider.autoplay.stop();
			videoSlider.allowTouchMove = false;
			videoContainer.classList.add("_playing");
			videoItem.play();
			videoItem.addEventListener('ended', function () {
				videoContainer.classList.remove("_playing");
				videoSlider.autoplay.start();
				videoSlider.allowTouchMove = true;
			});
			e.preventDefault();
		});
	}
	//===

	//===CHOOSE_SLIDER
	new Swiper(".choose-slider", {

		navigation: {
			nextEl: ".choose-slider-arrow-next",
			prevEl: ".choose-slider-arrow-prev"
		},

		grabCursor: true,

		slidesPerView: 2,

		watchOverflow: true,

		spaceBetween: 32,

		grabCursor: true,

		speed: 1800,

		breakpoints: {
			320: {
				slidesPerView: 1,
			},
			1050: {
				slidesPerView: 2,
			}
		},

		simulateTouch: true,

		autoplay: {
			delay: 3000,

			disableOnInteraction: true,
		},
	});
	//===

	//===GIFT_SLIDER
	new Swiper(".giftset-slider", {

		pagination: {
			el: ".giftset-slider-pagination",

			clickable: true,

			renderBullet: function (index, className) {
				return '<span class="' + className + '">' + (index + 1) + '</span>';
			}
		},

		slidesPerView: 1,

		watchOverflow: true,

		speed: 1000,

		allowTouchMove: false,

		simulateTouch: false,

		direction: "vertical",
	});
	//===

	//===COMBO_SLIDER
	new Swiper(".combo-slider", {

		navigation: {
			nextEl: ".combo-slider-arrow-next",
			prevEl: ".combo-slider-arrow-prev"
		},

		grabCursor: true,

		slidesPerView: 3,

		spaceBetween: 30,

		watchOverflow: true,

		speed: 1800,

		simulateTouch: true,

		breakpoints: {
			320: {
				slidesPerView: 1,
			},
			600: {
				slidesPerView: 2,
			},
			1050: {
				slidesPerView: 3,
			}
		},

		autoplay: {
			delay: 2000,

			disableOnInteraction: true
		},

		autoHeight: true,
	});
	//===

	//===ON_CLICK
	document.addEventListener("click", documentActions);
	function documentActions(e) {
		const targetElement = e.target;

		//BUY_CLICK
		if ((targetElement.classList.contains("_product-buy")) || targetElement.closest("._product-buy")) {
			e.preventDefault();
			const productId = targetElement.closest("[data-pid]").dataset.pid;
			addToCart(targetElement.closest("._product-buy"), productId);
		}

		//CART_OPEN
		if (document.querySelector(".cart")) {
			if (targetElement.classList.contains("cart__icon") || targetElement.closest(".cart__icon")) {
				if (document.querySelector(".cart-list").children.length > 0) {
					document.querySelector(".cart").classList.toggle("_active");

					if (iconMenu.classList.contains("_active")) {
						document.body.classList.remove("_lock");
						iconMenu.classList.remove("_active");
						menuBody.classList.remove("_active");
						document.querySelector(".header__wrapper").classList.remove("_open");
					}
				}
				e.preventDefault();
			} else if (!targetElement.closest(".cart__body") && !targetElement.closest("._product-buy")) {
				document.querySelector(".cart").classList.remove("_active");
			}
		}

		//CART_DELETE
		if (targetElement.classList.contains("cart-list__delete")) {
			const productId = targetElement.closest(".cart-list__item").dataset.cartPid;
			updateCart(targetElement, productId, false);
			e.preventDefault();
		}
	}
	//===

	//===CART
	function addToCart(productButton, productId) {
		if (!productButton.classList.contains("_hold")) {
			productButton.classList.add("_hold");
			productButton.classList.add("_fly");

			const cart = document.querySelector('.cart');
			const product = document.querySelector(`[data-pid="${productId}"`);
			const productImage = product.querySelector('._good-image');

			const productImageFly = productImage.querySelector('img').cloneNode(true);

			const productImageFlyWidth = productImage.offsetWidth;
			const productImageFlyHeight = productImage.offsetHeight;
			const productImageFlyTop = productImage.getBoundingClientRect().top;
			const productImageFlyLeft = productImage.getBoundingClientRect().left;

			productImageFly.setAttribute("class", "_flyImage");
			productImageFly.style.cssText = `
				left: ${productImageFlyLeft}px;
				top: ${productImageFlyTop}px;
				width: ${productImageFlyWidth}px;
				height: ${productImageFlyHeight}px;
				`;

			document.body.append(productImageFly);

			const cartFlyLeft = cart.getBoundingClientRect().left;
			const cartFlyTop = cart.getBoundingClientRect().top;

			productImageFly.style.cssText = `
				left: ${cartFlyLeft}px;
				top: ${cartFlyTop}px;
				width: 0px;
				height: 0px;
				opacity: 0;
				`;

			productImageFly.addEventListener("transitionend", function () {
				if (productButton.classList.contains("_fly")) {
					productImageFly.remove();
					updateCart(productButton, productId);
					productButton.classList.remove("_fly");
				}
			});
		}
	}
	function updateCart(productButton, productId, productAdd = true) {
		const cart = document.querySelector('.cart');
		const cartQuantity = cart.querySelector('.cart__icon span');
		const cartProduct = document.querySelector(`[data-cart-pid="${productId}"`);
		const cartList = cart.querySelector('.cart-list');

		if (productAdd) {
			if (!cartQuantity) {
				cart.querySelector('.cart__icon').innerHTML = "<span>1</span>";
			}
			else {
				cartQuantity.innerHTML = ++cartQuantity.innerHTML;
			}

			if (!cartProduct) {
				const product = document.querySelector(`[data-pid="${productId}"`);
				const cartProductImage = product.querySelector('img').src;
				const cartProductTitle = product.querySelector('._sub-title').innerHTML;
				const cartProductPrise = product.querySelector('._price__new').innerHTML;
				const cartProductContent = `
						<a href="" class="cart-list__image ibg"><img src="${cartProductImage}" alt=""> </a>
						<div class="cart-list__body">
							<div class="cart-list__title">${cartProductTitle}</div>
							<div class="cart-list__prise">${cartProductPrise}</div>
							<div class="cart-list__quantity">Quantity: <span>1</span></div>
							<a href="" class="cart-list__delete">Delete</a>
						</div>
						`;
				cartList.insertAdjacentHTML("beforeend", `<li data-cart-pid='${productId}' class='cart-list__item'>${cartProductContent}</li>`);
			}
			else {
				const cartProductQuantity = cartProduct.querySelector(".cart-list__quantity span");
				cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML;
			}
			productButton.classList.remove("_hold");
			ibg();
		}
		else {
			const cartProductQuantity = cartProduct.querySelector(".cart-list__quantity span");
			cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML;
			if (!parseInt(cartProductQuantity.innerHTML)) {
				cartProduct.remove();
			}

			const cartQuantityValue = --cartQuantity.innerHTML;

			if (cartQuantityValue) {
				cartQuantity.innerHTML = cartQuantityValue;
			}
			else {
				cart.classList.remove("_active");
				cart.querySelector(".cart__icon span").remove();
			}
		}
	}
	//===

	//===SCROLL_BY_LINK
	const menuLinks = document.querySelectorAll('.menu__link[data-goto]');

	if (menuLinks.length > 0) {
		menuLinks.forEach(menuLink => {
			menuLink.addEventListener('click', onMenuLinkClick);
		});

		function onMenuLinkClick(e) {
			const menuLink = e.target;
			if (menuLink.dataset.goto && document.querySelector(`.${menuLink.dataset.goto}`)) {
				const gotoBlock = document.querySelector(`.${menuLink.dataset.goto}`);

				const containerStyle = getComputedStyle(document.querySelector(".header__container"));
				const containerScrolling = 30 + parseInt(containerStyle.height) - (parseInt(containerStyle.paddingTop) + parseInt(containerStyle.paddingBottom));

				const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - containerScrolling;

				if (iconMenu.classList.contains("_active")) {
					document.body.classList.remove("_lock");
					iconMenu.classList.remove("_active");
					menuBody.classList.remove("_active");
					document.querySelector(".header__wrapper").classList.remove("_open");
				}

				smoothScroll(gotoBlockValue, 1500);
				e.preventDefault();
			}
		}
	}
	//===

	//===SMOOTH_SCROLL
	function smoothScroll(targetPosition, duration) {
		let startPosition = window.pageYOffset;
		let distance = targetPosition - startPosition;
		let startTime = null;

		function animation(currentTime) {
			if (startTime === null) {
				startTime = currentTime;
			}
			let timeElapsed = currentTime - startTime;
			let run = ease(timeElapsed, startPosition, distance, duration);
			window.scrollTo(0, run);
			if (timeElapsed < duration) {
				requestAnimationFrame(animation);
			}
		}

		function ease(t, b, c, d) {
			t /= d / 2;
			if (t < 1) return c / 2 * t * t + b;
			t--;
			return -c / 2 * (t * (t - 2) - 1) + b;
		}

		requestAnimationFrame(animation);
	}
	//===

	//===UP_SCROLL
	upElement.addEventListener('click', function (e) {
		if (iconMenu.classList.contains("_active")) {
			document.body.classList.remove("_lock");
			iconMenu.classList.remove("_active");
			menuBody.classList.remove("_active");
			document.querySelector(".header__wrapper").classList.remove("_open");
		}
		smoothScroll(0, 1500);
	});
	//===
}