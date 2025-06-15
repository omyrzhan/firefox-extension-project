const SpendTime_interval = 60000;
const SpendTime_pause 	 = 60000;

function SpendTimeCloseAction(callback) {
	$.ajax({
		url: "/ajax_index.php",
		type: "POST",
		async: true,
		dataType: "json",
		data: {
			page: "bet_history_attention_hide"
		},
		success: (response) => {},
		error: (xhr, textStatus, errorThrown) => {},
		complete: () => {
			if (callback) {
				callback();
			}
		}
	});
}

function SpendTimeReadAction(callback) {
	$.ajax({
		url: "/ajax_index.php",
		type: "POST",
		async: true,
		dataType: "json",
		data: {
			page: "spend_time_attention",
			action: "read"
		},
		success: (response) => {
			if (response.status == "success") {
				if (callback) {
					callback();
				}
			}
		},
		error: (xhr, textStatus, errorThrown) => {},
		complete: () => {}
	});
}



const SpendTime = (() => {
	let pause_timer = false;
	let unread_counter = 0;

	const getUnreadCounter = () => {
		unread_counter = $(".unread").parents(".js-timespend-accordeon-item").find(".harm-message-item").length;
		$(".js-timespend-counter").text(unread_counter > 0 ? `(${unread_counter})` : "");
		if (unread_counter>0) {
			$(".js-timespend-read-all").show();
		} else {
			$(".js-timespend-read-all").hide();
		}
	};

	const stopPauseTimer = () => {
		clearTimeout(pause_timer);
		pause_timer = false;
	};

	const startPauseTimer = () => {
		if (pause_timer) {
			stopPauseTimer();
		}
		pause_timer = setTimeout(() => {
			stopPauseTimer();
		}, SpendTime_pause);
	};


	//попап в шапке сайта
	const Popup = (() => {
		let $popup_el, $link_el;
		return {
			init: () => {
				$popup_el = $(".js-timespend-popup");
				$link_el  = $(".js-timespend-link");
				$popup_el.find(".js-timespend-close").on("click", () => {
					startPauseTimer();
					SpendTimeReadAction((result) => {
						$popup_el.hide();
						$link_el.removeClass("has-notif");
					});
					return false;
				});
			},
			show: (hours) => {
				const exceptions_pages = $(".search_area_content");
				if (!pause_timer && !exceptions_pages.length) {
					const time_text = hours +(typeof getHourForm === "function" ? " "+ getHourForm(hours) : "");
					$link_el.addClass("has-notif");
					$popup_el
						.show()
						.find(".js-timespend-output").text(time_text);
				}
			}
		}
	})();


	//блок в истории ставок
	const BlockInHistory = (() => {
		let $div_el;
		return {
			init: () => {
				$div_el = $(".js-timespend-div");
				$div_el.find(".js-timespend-close").on("click", () => {
					startPauseTimer();
					SpendTimeCloseAction((result) => {
						$div_el.hide();
					});
					return false;
				});
			},
			show: (is_show) => {
				if (!pause_timer && is_show) {
					$div_el.show();
				}
			}
		}
	})();


	//попап внутри модального окна акций
	const Actions = (() => {
		let listener_added;
		return {
			show: (hours) => {
				const iframe_el	 = document.getElementById("modalActionsIframe");
				const $source_el = $(".js-timespend-content");
				const time_text  = hours +(typeof getHourForm === "function" ? " "+ getHourForm(hours) : "");
				if (iframe_el && $source_el.length) {
					$source_el.find(".js-timespend-output").text(time_text);
					const html = $source_el.html();
					try {
						const doc = iframe_el.contentWindow.document;
						app = doc.getElementById("app");
						if (app) {
							iframe_el.contentWindow.postMessage({
								spendtime: html
							}, "*");
							if (!listener_added) {
								window.addEventListener("message", (event) => {
									if (typeof event.data.action != "undefined" && event.data.action === "close_spendtime") {
										startPauseTimer();
										SpendTimeReadAction((result) => {
											iframe_el.contentWindow.postMessage({
												spendtimeclose: true
											}, "*");
											$(".js-timespend-popup").hide();
											$(".js-timespend-link").removeClass("has-notif");
											listener_added = false;
										});
									}
								});
								listener_added = true;
							}
						}
					} catch (error) {}
				}
			}
		}
	})();


	//страница с сообщениями
	const Messages = (() => {
		return {
			init: () => {
				const readAll = () => {
					SpendTimeReadAction((result) => {
						$(".js-timespend-accordeon-item-title").removeClass("unread");
						getUnreadCounter();
					});
				};
				$(".js-timespend-read-all").on("click", () => {
					if (unread_counter > 0) {
						readAll();
					}
					return false;
				});
				$(".js-timespend-block").each(function() {
					const $block = $(this);
					const $title = $block.find(".js-timespend-block-title");
					$title.on("click", () => {
						if ($block.hasClass("active-elem")) {
							$block.removeClass("active-elem");
						} else {
							$block.addClass("active-elem");
							$block.siblings(".js-timespend-block").removeClass("active-elem");
						}
						return false;
					});
				});
				$(document).delegate(".js-timespend-accordeon-item-title", "click", function() {
					const $block = $(this).parents(".js-timespend-accordeon-item");
					if ($block.hasClass("active-item")) {
						$block.removeClass("active-item");
					} else {
						$block.addClass("active-item");
						$block.siblings(".js-timespend-accordeon-item").removeClass("active-item");
					}
					if (unread_counter > 0) {
						readAll();
					}
					return false;
				});
				getUnreadCounter();
			}
		}
	})();


	//страница История сообщение, проигранные
	const HistoryFilterLose = (() => {
		return {
			init: () => {
				if (typeof filter_lose != "undefined" && filter_lose) {
					$("#history_f_l").attr("checked", true);
					$(".bets_history .show_new_js").click();
				}
			}
		}
	})();


	return {
		init: () => {
			Popup.init();
			BlockInHistory.init();
			Messages.init();
			HistoryFilterLose.init();
		},
		update: (track) => {
			if (track.hour != 0) {
				Popup.show(track.hour, track.bh);
				Actions.show(track.hour);
			}
			BlockInHistory.show(track.bh);
		}
	}

})();


function isLocalStorageAvailable() {
	try {
		const testKey = '__test__';
		localStorage.setItem(testKey, '1');
		localStorage.removeItem(testKey);
		return true;
	} catch (e) {
		return false;
	}
}

function initSpendTimer() {
	const STORAGE_KEY = 'spend_time_last_check';
	const INTERVAL = 5 * 60 * 1000; // 2 мин
	let delay = 0;

	const getData = () => {
		$.ajax({
			url: "/ajax_index.php",
			type: "POST",
			async: true,
			dataType: "json",
			data: {
				page: "spend_time_attention",
				action: "track"
			},
			success: (response) => {
				if (typeof response.hour !== "undefined") {
					SpendTime.update(response);
				}
			},
			error: () => {
			},
			complete: () => {
				if (isLocalStorageAvailable()) {
					localStorage.setItem(STORAGE_KEY, Date.now());
				}
			}
		});
	};

	if (isLocalStorageAvailable()) {
		const lastCallRaw = localStorage.getItem(STORAGE_KEY);
		if (lastCallRaw) {
			const lastCall = parseInt(lastCallRaw, 10);
			const now = Date.now();
			const elapsed = now - lastCall;
			delay = Math.max(INTERVAL - elapsed, 0);
		}
	}

	if (delay > 0) {
		setTimeout(() => {
			getData();
			setInterval(getData, INTERVAL);
		}, delay);
	} else {
		getData();
		setInterval(getData, INTERVAL);
	}
}



//STOPAZART чтоб не делать еще js и так далее. пока поживет тут
function initStopazart() {
	const STORAGE_KEY = 'stopazart_last_check';
	const request_interval = 15 * 60 * 1000; // 5 минут
	let delay = 0;

	const getData = () => {
		$.ajax({
			url: "/ajax_index.php",
			type: "POST",
			async: true,
			dataType: "json",
			data: {
				page: "stopazart",
				action: "check"
			},
			success: (response) => {},
			error: (xhr, textStatus, errorThrown) => {},
			complete: () => {
				if (isLocalStorageAvailable()) {
					localStorage.setItem(STORAGE_KEY, Date.now());
				}
			}
		});
	};

	if (isLocalStorageAvailable()) {
		const lastCallRaw = localStorage.getItem(STORAGE_KEY);
		if (lastCallRaw) {
			const lastCall = parseInt(lastCallRaw, 10);
			const now = Date.now();
			const elapsed = now - lastCall;
			delay = Math.max(request_interval - elapsed, 0);
		}
	}

	if (delay > 0) {
		setTimeout(() => {
			getData();
			setInterval(getData, request_interval);
		}, delay);
	} else {
		getData();
		setInterval(getData, request_interval);
	}
}



$().ready(function() {
	SpendTime.init();
	if (typeof tick=="undefined" && typeof user_login!="undefined" && user_login!="") {
		initSpendTimer();
		initStopazart();
	}
});