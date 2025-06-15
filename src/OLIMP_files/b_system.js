let REGISTRATION_BANNER = false;

$().ready(function() {
	const DEVICE  = $("body").hasClass("mobile_ui_ux") ? "phone" : "desktop";
	const $SLIDER = $('[data-role="SLIDER"]');
	let LANG_CODE = typeof LANG_ISO_CODE != "undefined" ? LANG_ISO_CODE : document.documentElement.getAttribute("lang");

	const replaceImageSrc = (src) => {
		return src.replace("https://olimplanding2.xyz", "https://cdn-static.olimpbet.kz");
	};

	// инициализация Верхнего баннера на Мобилке
	const initTopBanner = (slides) => {
		const $APP_BANNER = $('[data-role="top-app"]');
		const $TOP_BANNER = $('[data-role="top-block"]');
		const is_loginned = (typeof auth != "undefined" && auth == 1) || (typeof user_login != "undefined" && user_login != "");
		let availableTopBanner;
		const checkBanner = ($banner, cookie_name) => {
			if (!getCookie(cookie_name)) {
				$("body").addClass("banner");
				$banner
					.show()
					.find("button").on("click", (e) => {
						e.preventDefault();
						$("body").removeClass("banner");
						$banner.hide();
						setCookieB(cookie_name, true, {expires: 3600 * 24 * 2});
						$(document).trigger("topBlockHideEvent");
						$(window).scrollTop(1);
					});
			}
		};
		if (typeof slides != "undefined" && slides.length) {
			slides = slides.filter(slide => {
				if (typeof vip != "undefined" && vip == 1) {
					return slide.vip == 1;
				} else {
					return slide.auth == is_loginned ? 1 : 0;
				}
			});
			let link = slides[0].link;
			let utm = slides[0].utm;
			let image = slides[0].images.filter(item => {
				return item.lang == LANG_CODE;
			});
			if (link.indexOf("?") >= 0 && utm && utm[0] == "?") {
				utm = utm.replace("?", "&");
			}
			if (image.length) {
				availableTopBanner = true;
				let imageSrc = image[0].imagePath;
				imageSrc = replaceImageSrc(imageSrc);
				$TOP_BANNER.find("a")
					.attr("href", link + utm)
					.css("background-image", 'url("'+ imageSrc +'")');
			}
		}
		if (availableTopBanner) {
			if ($TOP_BANNER.length) {
				checkBanner($TOP_BANNER, "hideTopBanner-" + slides[0].id);
			}
		} else {
			if ($APP_BANNER.length) {
				checkBanner($APP_BANNER, "hideAppBanner");
			}
		}
	};

	// формирование слайдера на Мобилке
	const initMobSlider = (slides) => {
		if (!$SLIDER.length || typeof slides=="undefined" || !slides.length) return false;
		let html = getSlideTemplate(slides, "mobile");
		$SLIDER.children(".swiper-wrapper").html(html);
		initSliderMobile();
	};

	// формирование слайдера на Десктопе
	const initDesktopSlider = (slides) => {
		if (!$SLIDER.length || typeof slides=="undefined" || !slides.length) return false;
		let html = getSlideTemplate(slides, "desktop");
		$SLIDER.show().html(html);
		initSliderDesktop();
	};

	// формирование слайда для слайдеров
	const getSlideTemplate = (slides, device) => {
		let html = "";
		slides = slides.filter(slide => {
			if (slide.unauth == 0) {
				if (slide.auth == 0 && slide.vip == 0) {
					return slide;
				} else {
					if ( (slide.auth == 1 && auth == 1) || (slide.vip == 1 && vip == 1) ) return slide;
				}
			} else if (auth == 0) return slide;
		});
		slides = sortSlides(slides, "asc");
		$.each(slides, (i, slide) => {
			let action_in_modal;
			let action_in_modal_name = "";
			let koeffs;
			let match = slide.match[LANG_CODE];
			let link = slide.link;
			let images = slide.images.filter(item => {
				return item.lang == LANG_CODE || item.lang == "all" || item.lang == "en";
			})[0];
			if ((link == null || link == "" || !link) && match) {
				link = "/index.php?page=line&addons=1&action=2&mid=" + match.id;
			} else {
				if (link.indexOf("?") >= 0 && slide.utm && slide.utm[0] == "?") {
					slide.utm = slide.utm.replace("?", "&");
				}
				link += slide.utm;
			}
			if (match && match.stakes) {
				koeffs = '<div class="banner-koeffs">';
				$.each(match.stakes, (i, stake) => {
					let isDraw 	= stake.name.toLowerCase() == "х" || stake.name.toLowerCase() == "x";
					let name 	= isDraw ? ns_draw : (i == 0 ? match.first_team : match.second_team);
					koeffs += '<div class="banner-koeff">' +
											'<div class="value">'+ stake.odd +'</div>' +
											'<div class="line"></div>' +
											'<div class="name">'+ name +'</div>' +
										'</div>';
				});
				koeffs += '</div>';
			} else {
				let str = "";
				if (slide.champ) {
					if (device=="mobile") {
						str = "/index.php?page=line&time=0&line_nums=0&addons=1&action=2&sel[]=";
					}
					if (device=="desktop") {
						str = "/index.php?page=line&action=2&sel[]=";
					}
					link = str + slide.champ;
				} else if (slide.sport) {
					if (device == "mobile") {
						str = "/index.php?page=line&action=1&time=0&line_nums=0&sel[]=";
					}
					if (device == "desktop") {
						str = "/index.php?page=line&action=1&sel[]=";
					}
					link = str + slide.sport;
				}
			}
			if (typeof link === "string") {
				if (link.includes("#action_")) {
					action_in_modal = true;
					action_in_modal_name = link.substring(link.indexOf("#"));
					action_in_modal_name = action_in_modal_name.replace("#action_", "");
				} else if (link.includes("#promo_")) {
					action_in_modal = true;
					action_in_modal_name = link.substring(link.indexOf("#"));
					action_in_modal_name = action_in_modal_name.replace("#promo_", "");
				}
			}
			if (images) {
				let image = images.imagePath;
				image = replaceImageSrc(image);
				if (device == "mobile") {
					html += '<div class="pic_slider">' +
								(link != null ? '<a '+ (action_in_modal ? 'data-action-in-modal="'+ action_in_modal_name +'"' : '') +' href="' + link + '" data-anlt-events="slider" data-id="'+ slide.id +'" target="'+ (slide.isnw==1 ? "_blank" : "_self") +'">' : '') +
									'<img class="big_pic hidden-xs visible-sm visible-md visible-lg img-responsive" src="' + image + '" />' +
									'<img class="small_pic visible-xs hidden-md hidden-lg img-responsive" src="' + image + '" />' +
									(koeffs ? koeffs : '') +
								(link != null ? '</a>' : '') +
							'</div>';
				}
				if (device == "desktop") {
					link = action_in_modal_name ? "return false;" : "window.open('" + link + "', '" + (slide.isnw ? "_blank" : "_self") + "')";
					html += '<div class="img banner_hover" '+ (action_in_modal ? 'data-action-in-modal="'+ action_in_modal_name +'"' : '') +' data-anlt-events="slider" data-id="'+ slide.id +'" onclick="'+ link +'">' +
								'<div class="banner-img img-small" style="background-image: url('+ image +') !important;"></div>' +
								'<div class="banner-img img-big" style="background-image: url('+ image +') !important;"></div>' +
								(koeffs ? koeffs : '') +
							'</div>';
				}
			}
		});
		return html + (device == "desktop" ? '<div class="point"></div>' : '');
	};

	// сортировка слайдов
	const sortSlides = (array, dir) => {
		return array.sort((value1, value2) => {
			let val1 = value1.sort;
			let val2 = value2.sort;
			return dir == "asc" ? (val1 > val2 ? 1 : -1) : val1 < val2 ? 1 : -1;
		});
	};

	// инициализация слайдера на Мобилке
	const initSliderMobile = () => {
		new Swiper($SLIDER, {
			loop: true,
			speed: 900,
			slideClass: "pic_slider",
			autoplay: {
				delay: 5000
			},
			pagination: {
				el: ".owl-dots",
				bulletClass: "owl-dot",
				bulletActiveClass: "active",
				clickable: true
			}
		});
	};

	// инициализация слайдера на Десктопе
	const initSliderDesktop = () => {
		if (!$SLIDER.length) return false;
		const delay = 9000;
		let $point = $SLIDER.find(".point");
		let slides_count 	= 0;
		const showPic = (id) => {
			if (id > slides_count) {
				id = 1;
			}
			if (id < 1) {
				id = slides_count;
			}
			$point.find("a").removeClass("active");
			$point.find('a[href="#'+ id +'"]').addClass("active");
			$SLIDER.find(".img").stop().fadeOut(1000);
			$SLIDER.find(".img"+ id).fadeIn(1000);
		};
		const currentPic = () => {
			return $SLIDER.find(".img:visible").data("pic");
		};
		$SLIDER.find(".img").each(function() {
			slides_count++;
			$(this)
				.addClass("img"+ slides_count)
				.data({
					"pic": slides_count
				});
		});
		for (let i = 1; i <= slides_count; i++) {
			$SLIDER.find(".point").append($("<a/>", {
				"href": "#"+ i,
				"class": (i == 1 ? "active": "")
			})
			.data({
				"img": i
			}));
		}
		if (slides_count > 0) {
			$SLIDER.css({
				"padding-top": "20.25%",
				"margin-bottom": "20px"
			});
		}
		if (slides_count > 1) {
			$SLIDER.find(".point").on("click", "a", function() {
				showPic($(this).data("img"));
				return false;
			});
			let timer = $.timer(() => {
				showPic(currentPic() * 1 + 1);
			});
			timer.set({
				time: delay,
				autostart: true
			});
			$SLIDER
				.on("mouseleave", () => {
					timer.play();
				})
				.on("mouseenter", () => {
					timer.pause();
				});
		}
	};

	// инициализация баннера в регистрации
	const initRegBanner = (banner) => {
		const image = banner.images.find(item => {
			return item.lang == LANG_CODE;
		});
		if (image) {
			let image_src = image.imagePath;
			image_src = replaceImageSrc(image_src);
			REGISTRATION_BANNER = image_src;
		}
	}

	const getData = () => {
		let source_url = "https://cdn-static.olimpbet.kz/storage/json/";
		let project	= "olimpbet.kz";
		if (typeof currentDomain != "undefined") {
			if (currentDomain == "kg") project = "olimpbet.kg";
		}
		source_url += "export."+ project;
		if (DEVICE == "phone") {
			source_url += ".mobile.json";
		} else {
			source_url += ".desktop.json";
		}
		fetch(source_url)
			.then(response => {
				return response.json();
			})
			.then(data => {
				if (DEVICE == "phone") {
					if ($(".app-banner").length) {
						initTopBanner(data.header);
					}
					if ($(".bannerSlider").length) {
						initMobSlider(data.slider);
					}
				} else {
					if ($("#corusel").length) {
						initDesktopSlider(data.slider);
					}
				}
				if (typeof data.regform != "undefined" && data.regform.length) {
					initRegBanner(data.regform[0]);
				}
			});
	};

	if ($(".app-banner, .bannerSlider, #corusel").length || (typeof user_login != "undefined" && user_login == "")) {
		getData();
	}
});