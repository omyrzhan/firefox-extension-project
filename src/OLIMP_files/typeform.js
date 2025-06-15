function initTypeForms(form_id) {
	let is_completed;
	const user_id 	= typeof user_identificator != "undefined" && user_identificator ? user_identificator : "";
	const is_closed = getCookie("TFTagClosed-"+ form_id);
	
	const sendAction = (action) => {
		$.post("/ajax_index.php", {
			page: "typeform", 
			action: action,
			form_id: form_id
		});
	};

	const render = () => {
		$("body").append(`<div class="type-form-modal">
												<div class="type-form-modal-in">
													<div class="type-form-modal-close">×</div>
													<iframe class="type-form-modal-iframe" src="https://nspvllk675z.typeform.com/to/${form_id}#user_id=${user_id}"></iframe>
												</div>
												<div class="type-form-modal-spinner"></div>
											</div>`);
		$("body").addClass("show-type-form");
		$(".type-form-modal-iframe").on("load", () => {
			$("body").addClass("showed-type-form");
		});
		$(".type-form-modal-close").on("click", () => {
			if (!is_completed) {
				sendAction("close");
			}
			setCookieD("TFTagClosed-"+ form_id, true, {expires: 3600 * 24 * 1});
			close();
			return false;
		});
	};

	const close = () => {
		$("body").removeClass("showed-type-form show-type-form");
		setTimeout(() => {
			$(".type-form-modal").remove();
		}, 600);
	};

	window.addEventListener("message", function(event) {
		if (event.data.type === "form-submit") {
			sendAction("complete");
			is_completed = true;
			close();
		}
	});

	if (!is_closed) {
		render();
	}
}

function initTypeFormsInIframe(form_id) {
	const iframe_el = $("#typeformIframe");
	const user_id 	= typeof user_identificator != "undefined" && user_identificator ? user_identificator : "";
	let is_completed;
	
	iframe_el.attr("src", `https://nspvllk675z.typeform.com/to/${form_id}#user_id=${user_id}`);

	const sendAction = (action) => {
		$.ajax({
			url: "/ajax_index.php",
			type: "POST",
			async: true,
			dataType: "json",
			data: {
				page: "typeform",
				action: action,
				form_id: form_id
			}
		});
	};

	window.addEventListener("message", function(event) {
		if (event.data.type === "form-submit") {
			is_completed = true;
			sendAction("complete");
		}
		if (event.data.type === "onCloseTypeformModal") {
			if (!is_completed) {
				sendAction("close");
			}
		}	
	});
}

$(document).ready(() => {
	
	if (typeof TFTagsList != "undefined" && TFTagsList.length > 0) {
		const form_id = TFTagsList[0];
		
		if (typeof timeform_in_iframe != "undefined" && timeform_in_iframe) {
			initTypeFormsInIframe(form_id);
		} else {
			initTypeForms(form_id);
		}
	}

});

