var HistoryUIP_b = false; // Ключ запущенной подгрузки истории
var ScrollReserv_px = 50; //Число недокрученных пикселов пикселов при котором начинается подгрузка
var isActivebTab = true;
var min_stakes = 0.1;
var init_array = [];
var full_array = new Array([]);
var tmp_array = [];
var comb_size = 2;
var sys_size = 3;
var $urlAjax = '/ajax_basket_index.php?_r=' + Math.random();
var $urlAjaxUser = '/ajax_index.php?_r=' + Math.random();
var betslip = {};
var TypeBet = 1;
var is_click = false;
var currpage = 'line';
var aModal = '';
var history_upload_b = 1; //Разврешать ли дальнейшую подгрузку
var history_last_bet_b = 0; //Последняя загруженная ставка
var history_load_id = 0; //Идентификатор текущего процесса подгрузки
var openedTab = 2;
var ordinarsSetOn = false;
var BHistoryCustomScrollbarTop = 0;
var olimp_tv = 0;
var save_any_handicap;
var save_any;
var oc_summ;
var recover_cashout_btn_arr = [];
var _paq = _paq || [];

function processaddkef(json) {
    if (typeof json == 'object') {
        if (olimp_tv) {
            TypeBet = getCookie('TypeBet');
            save_any_handicap = getCookie('save_any_handicap');
            save_any = getCookie('save_any');
            oc_summ = getCookie('basket-oc-summ');
            typenav = 2;
            try {
                window.opener.$('.busket-item-body').removeClass('progress-oneclick')
            } catch (e) {
                console.log('cant find class in parent window(no basket on page)');
            }
        } else {
            $('.busket-item-body').removeClass('progress-oneclick');
        }

        if (TypeBet == 2) {
            $('#oc_summ').prop('disabled', false);
            $('#save-oc-button').prop('disabled', false);
            // отправка успешного события в аналитику
            $(document).trigger("betFastSuccessEvent", {
                betType: "fast",
                betAmount: parseInt($("#oc_summ").val(), 10),
                odd: json.odd
            });
        }
        if (json.status == 'ok') {
            $('.currusum').text(json.currusum);
            $('#ocid').val(0);
            if (!$('#error-wraper-history').find(".authLink").length) {
                if (olimp_tv) {
                    try {
                        window.opener.$('.rekoeff-infoblock').remove()
                    } catch (e) {
                        console.log('cant find class in parent window(no basket on page)');
                    }
                } else {
                    $('.rekoeff-infoblock').remove();
                }
            }
            if (olimp_tv) {
                try {
                    window.opener.$('.warning-infoblock').addClass('hide')
                } catch (e) {
                    console.log('cant find class in parent window(no basket on page)');
                }
            } else {
                $('.warning-infoblock').addClass('hide');
            }
            if (TypeBet == 1) {
                $('.busket-body').html(json.html);
                //$('#select_item').html(json.basketlist);
                betslip = json.betslip;
                openedTab = 2;
                betVisualisation();
            } else {
                //$('#betok').removeClass('hide');
                if (olimp_tv) {
                    try {
                        window.opener.$('#fbetchname').html(json.matchname);
                        window.opener.$('#fbetkname').html(json.kfval);
                        window.opener.$('#fbetvalue').html(json.odd);
                        window.opener.$('.bet-infoblock').removeClass('hide');
                    } catch (e) {
                        console.log('cant find class in parent window(no basket on page)');
                    }
                } else {
                    $('#fbetchname').html(json.matchname);
                    $('#fbetkname').html(json.kfval);
                    $('#fbetvalue').html(json.odd);
                    $('.bet-infoblock').removeClass('hide');
                }
                _paq.push(['trackGoal', 4]);
            }
        } else {
            ShowBasketError(json.msg, 'warning');
        }
    } else {
        ShowBasketError(lang.failed_connect_server, 'warning');
    }
}

function onBettingSuccess(form_data) {
    const bet_type = parseInt($("#busket-nav").val(), 10);
    const bet_obj = [];
    const formatSumm = (value) => {
        return value ? parseFloat(value.replace(/\s/g, ""), 10) : 0;
    };
    switch (bet_type) {
        case 1:
            //ординар
            const info_is_seria = form_data.find(item => item.name == "b_seria");
            form_data.filter(item => {
                if (info_is_seria && info_is_seria.value == 1) {
                    if (item.name.startsWith("kf")) {
                        bet_obj.push({
                            betType: "Single",
                            betAmount: formatSumm($(".allsum").val()),
                            odd: item.value
                        });
                    }
                } else {
                    if (item.name.startsWith("singlebet")) {
                        const item_index = parseInt(item.name.match(/\d+/)[0], 10);
                        const item_koeff = form_data.find(obj => obj.name == "kf" + item_index);
                        if (item_koeff) {
                            bet_obj.push({
                                betType: "Single",
                                betAmount: formatSumm(item.value),
                                odd: item_koeff.value
                            });
                        }
                    }
                }
            });
            break;
        case 2:
            //экспресс
            var item_amount = form_data.find(obj => obj.name == "expbet_sum");
            var item_koeff = form_data.find(obj => obj.name == "exp_koef");
            if (item_amount && item_koeff) {
                bet_obj.push({
                    betType: "Multiple",
                    betAmount: formatSumm(item_amount.value),
                    odd: item_koeff.value
                });
            }
            break;
        case 3:
            //система
            var item_amount = form_data.find(obj => obj.name == "expbet_sum");
            if (item_amount) {
                bet_obj.push({
                    betType: "System",
                    betAmount: formatSumm(item_amount.value),
                    odd: 0
                });
            }
            break;
    }
    bet_obj.forEach(item => {
        $(document).trigger("betSuccessEvent", item);
    });
}

$(function () {
    aModal = $("#alertmodal");


    $(document).delegate('#percentFBButton', 'click', function (e) {
        if (!document.getElementById('percentFBSum').readOnly) {
            document.getElementById('percentFBSum').readOnly = true;
            document.getElementById('percentFBSum').value = percentFBSum;
            document.getElementById('DoPercentFB').value = '1';
            CalcMaxWin();
        } else {
            document.getElementById('percentFBSum').value = '';
            document.getElementById('percentFBSum').readOnly = false;
            document.getElementById('DoPercentFB').value = '0';
            CalcMaxWin();
        }
        e.preventDefault();
    });


    $(document).delegate('#myonoffswitch', 'change', function () {
        $('#betok').addClass('hide');
        currpage = $('input[name="currpage"]').val();
        if ($(this).prop('checked')) {
            $('.sel_bas').hide();
            $.post($urlAjax, {
                'action': 'oneclick-form', 'currpage': currpage, 'ch': 1
            }, function (json) {
                if (typeof json == 'object') {
                    if (json.status == 'ok') {
                        setCookie('TypeBet', '2');
                        // Удаляем ошибку
                        if (!$('#error-wraper-history').find(".authLink").length) {
                            $('.rekoeff-infoblock').remove();
                        }
                        $('.warning-infoblock').addClass('hide');
                        $('.busket-nav').addClass('hide');
                        $('.busket-body').html(json.html);
                        TypeBet = 2;
                        betslip = {};
                        MarkOddsInLine();
                        //$("#select_item").prop('disabled', true);
                    } else {
                        ShowBasketError(json.msg, 'warning');
                    }
                } else {
                    ShowBasketError(lang.failed_connect_server, 'warning');
                }
            }, 'json');
        } else {
            $('.sel_bas').show();
            $('#bn2, #bn3').removeClass('active');
            $('#bn1').addClass('active');
            $.post($urlAjax, {
                'action': 'oneclick-form', 'currpage': currpage, 'ch': 0
            }, function (json) {
                if (typeof json == 'object') {
                    if (json.status == 'ok') {
                        setCookie('TypeBet', '1');
                        // Удаляем ошибку
                        if (!$('#error-wraper-history').find(".authLink").length) {
                            $('.rekoeff-infoblock').remove();
                        }
                        $('.warning-infoblock').addClass('hide');
                        $('.busket-nav').removeClass('hide');
                        $('#busket-nav').val(json.bn);
                        $('.busket-body').html(json.html);
                        TypeBet = 1;
                        //$("#select_item").prop('disabled', false);
                    } else {
                        ShowBasketError(json.msg, 'warning');
                    }
                } else {
                    ShowBasketError(lang.failed_connect_server, 'warning');
                }
            }, 'json');
        }
        $('#myonoffswitch_e').prop("checked", $('#myonoffswitch').prop("checked"));
    }).delegate('#myonoffswitch_e', 'change', function () {
        $('#betok').addClass('hide');
        currpage = $('input[name="currpage"]').val();
        if ($(this).prop('checked')) {
            $('.sel_bas').hide();
            $.post($urlAjax, {
                'action': 'oneclick-form', 'currpage': currpage, 'ch': 1
            }, function (json) {
                if (typeof json == 'object') {
                    if (json.status == 'ok') {
                        // Удаляем ошибку
                        $('.rekoeff-infoblock').remove();
                        $('.warning-infoblock').addClass('hide');
                        $('.busket-nav').addClass('hide');
                        $('.busket-body').html(json.html);
                        TypeBet = 2;
                        //$("#select_item").prop('disabled', true);
                    } else {
                        ShowBasketError(json.msg, 'warning');
                    }
                } else {
                    ShowBasketError(lang.failed_connect_server, 'warning');
                }
            }, 'json');
        } else {
            $('.sel_bas').show();
            $('#bn2, #bn3').removeClass('active');
            $('#bn1').addClass('active');
            $.post($urlAjax, {
                'action': 'oneclick-form', 'currpage': currpage, 'ch': 0
            }, function (json) {
                if (typeof json == 'object') {
                    if (json.status == 'ok') {
                        // Удаляем ошибку
                        $('.rekoeff-infoblock').remove();
                        $('.warning-infoblock').addClass('hide');
                        $('.busket-nav').removeClass('hide');
                        $('#busket-nav').val(json.bn);
                        $('.busket-body').html(json.html);
                        TypeBet = 1;
                        //$("#select_item").prop('disabled', false);
                    } else {
                        ShowBasketError(json.msg, 'warning');
                    }
                } else {
                    ShowBasketError(lang.failed_connect_server, 'warning');
                }
            }, 'json');
        }
        $('#myonoffswitch').prop("checked", $('#myonoffswitch_e').prop("checked"));
    }).delegate('#save-oc-button', 'click', function () {
        var sum = $('#oc_summ').val();
        $('#betok').addClass('hide');
        currpage = $('input[name="currpage"]').val();
        if (sum >= min_stakes) {
            $.post($urlAjax, {
                'action': 'save-oc-sum', 'currpage': currpage, 'sum': sum
            }, function (json) {
                if (typeof json == 'object') {
                    if (json.status == 'ok') {
                        // Удаляем ошибку
                        $('.rekoeff-infoblock').remove();
                        $('.warning-infoblock').addClass('hide');
                        $('.busket-body').html(json.html);
                        $('#save-oc-button').addClass('dis_but_betslip');
                    } else {
                        ShowBasketError(json.msg, 'warning');
                    }
                } else {
                    ShowBasketError(lang.failed_connect_server, 'warning');
                }
            }, 'json');
        } else {
            ShowBasketError('Слишком маленькая сумма ставки', 'warning');
        }
    }).delegate('.busket_item_js', 'mouseenter mouseleave', function (event) {
        if (event.type === 'mouseenter') {
            var BasketTab = $('#busket-nav');
            var id = GetTrueID($(this).attr('id'));
            if (!$.isEmptyObject(betslip[id].dep) && BasketTab.val() != 1) {
                $.each(betslip[id].dep, function (key, value) {
                    $('#s-' + key).addClass('isdep');
                });
                $(this).addClass('isdep');
            }
        } else {
            $('div.busket_item_js').removeClass('isdep');
        }
    }).delegate('#oc_summ', 'change', function () {
        $('#save-oc-button').removeClass('dis_but_betslip');
        /*
         }).delegate('#select_item', 'change', function () {
         page = $(this).val();
         DisplayBasket(0, page);
         clearInterval(betslip_update);
         interval = 10000;
         if (page == 'line') {
         interval = 1800000;
         }
         betslip_update = setInterval('DisplayBasket(1, "");', interval);
         */
    }).delegate('.koefs', 'click', function () // Нажатие на кеф
    {
        if (olimp_tv) {
            TypeBet = getCookie('TypeBet');
            save_any_handicap = getCookie('save_any_handicap');
            save_any = getCookie('save_any');
            oc_summ = getCookie('basket-oc-summ');
            typenav = 2;
            try {
                window.opener.$('.busket-item-body').removeClass('progress-oneclick')
            } catch (e) {
                console.log('cant find class in parent window(no basket on page)');
            }
            var matchID = $(this).data('match');
            var referrer_page = document.referrer;
            var opener_page = window.opener.document.location.href;
            if (referrer_page !== undefined && referrer_page !== null && typeof (referrer_page) === 'string') {
                referrer_page = referrer_page.replace(window.location.origin, '');
                opener_page = opener_page.replace(window.location.origin, '');
                var is_live = opener_page.search(/betting/i) >= 0 || opener_page.search(/live\[\]=/i) >= 0;
                var is_line = opener_page.search(/page=line/i) >= 0;
                if (opener_page !== ('/index.php?page=line&action=2&live[]=' + matchID) && (!is_live && !is_line)) {
                    window.opener.location.href = '/index.php?page=line&action=2&live[]=' + matchID;
                    if (TypeBet == 2) {
                        return false;
                    }
                }
            }
        }

        //отслеживание события при удалении коэфициента из карзины для google analitycs
        last_koefID = $(this).data("id"); //айди коэфициента
        last_koefID = last_koefID.split(":");
        last_koefID = last_koefID[0];

        //признак того что коэфициент будет удаляться
        if ($(this).hasClass("sel")) {
            koefDeleted = true;
        }

        // console.log($(this));
        if (!$('#betslip-button').hasClass('active')) $('#betslip-button').click();
        $('#betok').addClass('hide');
        var _this = $(this);
        currpage = $('input[name="currpage"]').val();
        //TODO for Ero
        if ($(this).hasClass('euro') || $(this).hasClass('wc2018')) {
            currpage = $(this).data('cp');
            $(this).parents('form').find('input[name="currpage"]').val(currpage);
            //$('input[name="currpage"]').val(currpage);
        }
        var new_id = _this.data('id').toString();
        /*
         var res = new_id.split(":");
         if (res.length > 2) {
         res.splice(0, 1);
         new_id = res.join(':');
         }
         */
        var typenav = $('#busket-nav').val();
        var $oc_summ = 0;
        if (TypeBet == 2) {
            // Сохранение ID для быстрой ставки
            $('#ocid').val(new_id);
            $('.busket-item-body').addClass('progress-oneclick');
            if (olimp_tv) {
                try {
                    window.opener.$('.busket-item-body').addClass('progress-oneclick');
                    save_any_handicap = window.opener.$('input[name="save_any_handicap"]:checked').val();
                    save_any = window.opener.$('input[name="save_any"]:checked').val();
                    oc_summ = window.opener.$('input[name="oc_summ"]').val();
                    typenav = 2;
                } catch (e) {
                    console.log('cant find class in parent window(no basket on page) set variables from cookie');
                    save_any_handicap = getCookie('save_any_handicap');
                    save_any = getCookie('save_any');
                    oc_summ = getCookie('basket-oc-summ');
                    typenav = 2;
                }
            } else {
                $oc_summ = $('#oc_summ').val();
            }

            $('#oc_summ').prop('disabled', true);
            $('#save-oc-button').prop('disabled', true);
        }
        $.post($urlAjax, {
            'action': 'addkef',
            'typenav': typenav,
            'TypeBet': TypeBet,
            'currpage': currpage,
            'save_any': $('input[name="save_any"]:checked').val() || save_any,
            'save_any_handicap': $('input[name="save_any_handicap"]:checked').val() || save_any_handicap,
            'oc_summ': $oc_summ || oc_summ,
            'text': _this.find(".value_js").text().trim(),
            'id': new_id,
            'v1': _this.data('v1'),
            'v2': _this.data('v2'),
            'v3': _this.data('v3'),
            'match': _this.data('match'),
        }, function (json) {
            processaddkef(json);
            if (TypeBet == 2) {
                if ($('.insurance-informer:visible').length > 0) {
                    $('.insurance-informer').remove();
                }
            }
        }, 'json');
    }).delegate('.modal-ok', 'click', function () {
        ocid = $('input[name="ocid"]').val();
        if (ocid != '0') {
            $('[data-id="' + ocid + '"]:first b').text($('#one_click_new_odd').text());
            $('[data-id="' + ocid + '"]:first').trigger("click");
            $.modal.close();
        }
    }).delegate('.modal-cancel', 'click', function () {
        $.modal.close();
    }).delegate('#bn1, #bn2, #bn3', 'click', function (e) {
        var _this = $(this);
        if ($(_this).hasClass("active")) return;

        if (_this.attr('id') == 'bn1') $('#percentFBButton').show();
        else $('#percentFBButton').hide();
        openedTab = _this.val();
        if (typeof e.originalEvent != 'undefined') {
            setCookie('auto_tab_switcher', '2');
        }
        $('#bn1, #bn2, #bn3').removeClass('active');
        _this.addClass('active');
        $('#busket-nav').val(_this.data('type'));
        currpage = $('input[name="currpage"]').val();
        $.post($urlAjax, {
            'action': 'busketnav', 'currpage': currpage, 'typenav': _this.data('type')
        }, function (json) {
            if (typeof json == 'object') {
                if (json.status == 'ok') {
                    // Удаляем ошибку
                    if (!$('#error-wraper-history').find(".authLink").length) {
                        $('.rekoeff-infoblock').remove();
                    }
                    $('.warning-infoblock').addClass('hide');
                    $('.busket-body').html(json.html);
                    //$('#select_item').html(json.basketlist);
                    betslip = json.betslip;
                    if (TypeBet == 1) {
                        betVisualisation();
                    }
                } else {
                    ShowBasketError(json.msg, 'warning');
                }
            } else {
                ShowBasketError(lang.failed_connect_server, "warning");
            }
        }, 'json');
    }).delegate('.busket-item-delete', 'click', function () {
        var _this = $(this);
        currpage = _this.data('currpage');
        $.post($urlAjax, {
            'action': 'deleteevent', 'currpage': currpage, 'id': GetTrueID(_this.parents('.busket_item_js').attr('id'))
        }, function (json) {
            if (typeof json == 'object') {
                if (json.status == 'ok') {
                    // Удаляем ошибку
                    if (!$('#error-wraper-history').find(".authLink").length) {
                        $('.rekoeff-infoblock').remove();
                    }
                    $('.warning-infoblock').addClass('hide');
                    $('.busket-body').html(json.html);
                    //$('#select_item').html(json.basketlist);
                    betslip = json.betslip;
                    if ($.isEmptyObject(betslip)) {
                        var opt = {
                            'expires': 0, 'path': '/', 'secure': true
                        };
                        setCookie('b_1_allsum', '', opt);
                        setCookie('b_1_allsum_ch', 0, opt);
                    }
                    if (TypeBet == 1) {
                        openedTab = 2;
                        betVisualisation();
                    }
                } else {
                    //ShowBasketError(json.msg, 'warning');
                }
            } else {
                ShowBasketError(lang.failed_connect_server, 'warning');
            }
        }, 'json');
    }).delegate('.clearAllbasket', 'click', function () {
        var _this = $(this);
        currpage = $('input[name="currpage"]').val();
        $.post($urlAjax, {
            'action': 'clearbasket', 'currpage': currpage
        }, function (json) {
            if (typeof json == 'object') {
                if (json.status == 'ok') {
                    // Удаляем ошибку
                    $('.koefs').removeClass('sel');
                    if (!$('#error-wraper-history').find(".authLink").length) {
                        $('.rekoeff-infoblock').remove();
                    }
                    $('.warning-infoblock').addClass('hide');
                    $('.busket-body').html(json.html);
                    //$('#select_item').html(json.basketlist);
                    betslip = {};
                    var opt = {
                        'expires': 0, 'path': '/', 'secure': true
                    };
                    setCookie('b_1_allsum', '', opt);
                    setCookie('b_1_allsum_ch', 0, opt);
                } else {
                    ShowBasketError(json.msg, 'warning');
                }
            } else {
                ShowBasketError(lang.failed_connect_server, 'warning');
            }
        }, 'json');
    }).delegate('.max_sum_ord_js', 'click', function () {
        var _this = $(this);
        _this.parents('.busket_item_js').find('.sum_ord_js').val(_this.data('max'));
        CalcMaxWin();
    }).delegate('#btmax', 'click', function () {
        var _this = $(this);
        var max = _this.data('max');
        $('#ex_max_bet').val(max);
        CalcMaxWin();
    }).delegate('.sum_ord_js', 'change', function () {
        CalcMaxWin();
    }).delegate('#b_seria', 'click', function () {
        SetAllSumm();
    }).delegate('input[name="save_any"]', 'click', function () {
        _this = $(this);
        setCookie('save_any', _this.val());
        //console.log("save_any: " + _this.val());
        $.post($urlAjax, {
            'action': 'SaveAny', 'val': _this.val()
        }, function (json) {
            if (typeof json == 'object') {
                if (json.status == 'ok') {
                    // Не удаляем ошибку
                    /*
                     $('.koefs').removeClass('sel');
                     $('.rekoeff-infoblock').remove();
                     $('.warning-infoblock').addClass('hide');
                     $('.busket-body').html(json.html);
                     betslip = {};
                     */
                } else {
                    ShowBasketError(json.msg, 'warning');
                }
            } else {
                ShowBasketError(lang.failed_connect_server, 'warning');
            }
        }, 'json');
    }).delegate('input[name="save_any_handicap"]', 'click', function () {
        _this = $(this);
        //console.log("save_any_handicap: " + _this.val());
        setCookie('save_any_handicap', _this.val());
        $.post($urlAjax, {
            'action': 'SaveAnyHandicap', 'val': _this.val()
        }, function (json) {
            if (typeof json == 'object') {
                if (json.status == 'ok') {
                    // Не удаляем ошибку
                    /*
                     $('.koefs').removeClass('sel');
                     $('.rekoeff-infoblock').remove();
                     $('.warning-infoblock').addClass('hide');
                     $('.busket-body').html(json.html);
                     betslip = {};
                     */
                } else {
                    ShowBasketError(json.msg, 'warning');
                }
            } else {
                ShowBasketError(lang.failed_connect_server, 'warning');
            }
        }, 'json');
        MarkOddsInLine();
    }).delegate('#betslip_form', 'click', function (e) {
        if (e.button != -1 && e.button != 0 && e.button != 13) {
            is_click = true;
        }
    }).delegate('#betslip_form', 'submit', function (e) {
        if (!is_click) {
            var $bt = $(this).find('.submit_js');
            var text = $bt.text();
            $bt.addClass('busket_load');
            $bt.text('');
            is_click = true;
            var $typebasket = $('#busket-nav').val();
            var AllSummBet = 0;
            if ($typebasket == 1) {
                if ($('#b_seria').prop('checked')) {
                    AllSummBet = $('.allsum').val();
                }
            } else {
                if ($typebasket == 2) {
                    //TODO про запас
                } else {
                    if ($typebasket == 3) {
                        //TODO про запас
                    }
                }
            }

            $('#bs_curpage').val($('input[name="currpage"]').val());
            $('.busket_item_js:not(.deleted) .sum_ord_js').prop('disabled', false);
            var frm = $(document.F1).serializeArray();
            var frm_data = $(document.F1).serializeArray();
            $('.busket_item_js:not(.deleted) .sum_ord_js').prop('disabled', true);
            $.ajax({
                type: "POST",
                url: $urlAjax,
                data: frm,
                success: function (json) {
                    if (typeof json == 'object') {
                        if (json.status == 'ok') {
                            if (typeof frm_data != "undefined") onBettingSuccess(frm_data);
                            $('.currusum').text(json.currusum);
                            // Удаляем ошибку
                            if (!$('#error-wraper-history').find(".authLink").length) {
                                $('.rekoeff-infoblock').remove();
                            }
                            $('.warning-infoblock').addClass('hide');
                            $('.busket-body').html(json.html);
                            //$('#select_item').html(json.basketlist);
                            if (json.res == 1) {
                                if (json.submited_bonuses) {
                                    for (i in json.submited_bonuses) {
                                        $('.js_bonus_element_' + json.submited_bonuses[i]).remove();
                                    }
                                }
                                history_upload_b = 1;
                                history_last_bet_b = 0;
                                history_load_id = 0;
                                $('#history_body_b div.content').html("");
                                if ($('#history-button, #cashout-button').hasClass('active')) {
                                    LoadHistory();
                                }
                                ShowBasketMsg(json.msg, 'accept');
                                _paq.push(['trackGoal', 2]);
                            }
                            betslip = json.betslip;
                            if (TypeBet == 1) {
                                betVisualisation();
                            }
                        } else {
                            DisplayBasket(1, "");
                            ShowBasketError(json.msg, 'warning');
                        }
                    } else {
                        ShowBasketError(lang.failed_connect_server, 'warning');
                    }
                },
                dataType: 'json',
                error: function () {
                    ShowBasketError(lang.failed_connect_server, 'warning');
                    basketLog('warning#1');
                },
                complete: function () {
                    is_click = false;
                    $bt.removeClass('busket_load');
                    $bt.text(text);
                },
                timeout: 20000
            });
        }
        e.preventDefault();
    }).delegate('.busket .expand-button', 'click', function () {
        if ($('.sr-bb.sr-livetable').hasClass('sr-extra-extra-small')) {
            $('.sr-bb.sr-livetable').removeClass('sr-extra-extra-small');
        } else {
            $('.sr-bb.sr-livetable').addClass('sr-extra-extra-small');
        }
        ToggleTdWidth();
        expandAllVideoWidgets();
    }).delegate('#betslip-button, #history-button, #cashout-button', 'click', function () {
        if ($(this).hasClass("active")) return;

        // nurlan: если нет ошибок про авторизации, то очищаем ошибочный текст
        if (!$('#error-wraper-history').find(".authLink").length) {
            $('#error-wraper-history').html("");
        }

        $("#betslip-button, #history-button, #cashout-button").removeClass("active");
        $(this).addClass("active");
        opt = {
            'expires': 0, 'path': '/'
        };
        setCookie('betslip_section', $(this).attr('id').match(/^[a-z]+/)[0], opt);
        if ($(this).attr("id") == 'cashout-button') {
            $('.busket .stake-item').each(function () {
                if (!$(this).find('.cashout-wrapper').length) $(this).hide();
            });
        }
        if ($(this).attr("id") == 'history-button') {
            $('.busket .stake-item').each(function () {
                if (!$(this).find('.cashout-wrapper').length) $(this).show();
            });
        }
        DisplayBetslipSection();
    }).delegate('.stake-count .show_result, .stake-count .see_result', 'click', function () {
        $('#error-wraper-history').html("");
        var obj = $(this).parents(".stake-count");
        obj.addClass('load');
        $.ajax({
            type: "POST",
            url: '/ajax_history.php',
            data: {
                'action': 'result',
                'id': +$(this).parents(".stake-count").attr("data-matchid"),
                'sport_id': +$(this).parents(".stake-count").attr("data-sport_id")
            },
            success: function (json) {
                if (typeof json == 'object') {
                    if (json.status == 'ok') {
                        obj.find(".result_text").text(json.text);
                        if (!json.upd) obj.find('.show_result').hide();
                        obj.find(".see_result").hide();
                        obj.attr("data-update", json.ended ? "0" : "1");
                        obj.attr("data-dttm", json.time ? "1" : "0");
                        DisplayHistory();
                    } else {
                        ShowBasketError(json.msg, 'warning');
                    }
                } else {
                    ShowBasketError(lang.failed_connect_server, 'error');
                }
                obj.removeClass('load');
            },
            error: function () {
                ShowBasketError(lang.failed_connect_server, 'error');
                obj.removeClass('load');
            },
            dataType: 'json',
            timeout: 20000
        });
    }).delegate('.btn-sell-refresh', 'click', function () {
        $('#error-wraper-history').html("");
        var obj = $(this);
        obj.parents('.stake-item-body').find('.error-wraper').html('');
        obj.parents(".cashout-wrapper").children(".progress_bar").show();
        $.ajax({
            type: "POST",
            url: '/ajax_history.php',
            data: {
                'action': 'getcashout',
                'id': +$(this).parents(".stake-item").data("betid"),
                'amount': $(this).children(".amount").text()
            },
            success: function (json) {
                if (typeof json == 'object') {
                    if (json.status == 'ok') {
                        if (json.hide)
                            obj.parents(".stake-item").animate({height: 0}, function () {
                                obj.parents(".stake-item").remove()
                            });
                        else {
                            if (json.hide_button) {
                                obj.parent().remove();
                            } else {
                                if (json.stop) {
                                    obj.parents(".cashout-wrapper").find('.amount').text('');
                                    obj.parents(".cashout-wrapper").find('.sell_text').hide();
                                    obj.parents(".cashout-wrapper").find('.block_text').show();
                                    obj.parents(".cashout-wrapper").find('.btn-sell-stakes').addClass('inactive');
                                } else {
                                    obj.parents(".cashout-wrapper").find('.amount').text(json.amount);
                                    obj.parents(".cashout-wrapper").find('.sell_text').show();
                                    obj.parents(".cashout-wrapper").find('.block_text').hide();
                                    obj.parents(".cashout-wrapper").find('.btn-sell-stakes').removeClass('inactive');
                                }
                            }
                        }
                    } else {
                        ShowBasketError(json.msg, 'warning');
                    }
                } else {
                    ShowBasketError(lang.failed_connect_server, 'error');
                }
                obj.parents(".cashout-wrapper").children(".progress_bar").hide();
            },
            error: function () {
                ShowBasketError(lang.failed_connect_server, 'error');
                obj.parents(".cashout-wrapper").children(".progress_bar").hide();
            },
            dataType: 'json',
            timeout: 20000
        });
    }).delegate('.confirm_wrap .accept', 'click', function () {
        $('#error-wraper-history').html("");
        var obj = $(this);
        obj.parents('.stake-item-body').find('.error-wraper').html('');
        obj.parents(".cashout-wrapper").children(".progress_bar").show();
        $.ajax({
            type: "POST",
            async: true,
            url: '/ajax_history.php',
            data: {
                'action': 'savecashout',
                'id': +$(this).parents(".stake-item").data("betid"),
                'amount': $(this).parents(".stake-item").find(".amount2").text()
            },
            success: function (json) {
                if (typeof json == 'object') {
                    if (json.hide) obj.parents(".stake-item").animate({height: 0}, function () {
                        obj.parents(".stake-item").remove()
                    });
                    else {
                        if (json.status == 'ok') {
                            $('.currusum').text(json.currusum);
                            obj.parents(".stake-item").animate({height: 0}, function () {
                                obj.parents(".stake-item").remove()
                            });
                            DisplayHistory();
                            ShowBasketMsg(json.msg);
                        } else {
                            if (json.status == 'warning') {
                                ShowBasketError(json.msg, 'warning', obj.parents('.stake-item-body').find('.error-wraper'));
                            } else if (json.status == 'error') {
                                ShowBasketError(json.msg, 'error', obj.parents('.stake-item-body').find('.error-wraper'));
                            }
                            if (json.hide_button) {
                                obj.parents(".cashout-wrapper").remove();
                                if ($('#cashout-button').hasClass('active')) obj.parents(".stake-item").animate({height: 0}, function () {
                                    obj.parents(".stake-item").hide()
                                });
                            } else {
                                if (json.stop) {
                                    obj.parents(".cashout-wrapper").find('.amount').text('');
                                    obj.parents(".cashout-wrapper").find('.sell_text').hide();
                                    obj.parents(".cashout-wrapper").find('.block_text').show();
                                    obj.parents(".cashout-wrapper").find('.btn-sell-stakes').addClass('inactive');
                                } else {
                                    obj.parents(".cashout-wrapper").find('.amount').text(json.amount);
                                    obj.parents(".cashout-wrapper").find('.sell_text').show();
                                    obj.parents(".cashout-wrapper").find('.block_text').hide();
                                    obj.parents(".cashout-wrapper").find('.btn-sell-stakes').removeClass('inactive');
                                }
                            }
                        }
                        obj.parents(".cashout-wrapper").find(".confirm_wrap").hide();
                    }
                } else {
                    ShowBasketError(lang.failed_connect_server, 'error');
                }
                obj.parents(".cashout-wrapper").children(".progress_bar").hide();
            },
            error: function () {
                ShowBasketError(lang.failed_connect_server, 'error');
                obj.parents(".cashout-wrapper").children(".progress_bar").hide();
            },
            dataType: 'json',
            timeout: 20000
        });
    }).delegate('.confirm_wrap .discard', 'click', function () {
        $(this).parents(".confirm_wrap").hide();
    })/*.delegate('.btn-sell-stakes', 'click', function () {
        var bid = $(this).parents('.stake-item').data('betid');
        var obj = this;
        $.ajax({
            type: "POST",
            async: true,
            url: '/ajax_history.php',
            data: {
                'action': 'getcashout',
                'id': bid
            },
            success: function (json) {
                if(json.status === 'ok') {
                    if(parseInt(json.amount) > 0){
        if ($(obj).children(".sell_text").is(":visible")) {
            $(obj).parents(".cashout-wrapper").find(".amount2").text(json.amount);
            $(obj).parents(".cashout-wrapper").find(".amount2").data('full_amount',json.amount);
            $(obj).parents(".cashout-wrapper").find(".confirm_wrap").show();
        }
                }
                    else {
                        $(obj).addClass('inactive');
                        $(obj).children('.sell_text').hide();
                        $(obj).children('.block_text').show();
                        var deny_cashout_for_recover = [ 4, 5 ];
                        if(deny_cashout_for_recover.includes(parseInt(json.deny_cashout))) {
                            var bet_id = parseInt($(obj).parents('.stake-item').data('betid'));
                            if (!recover_cashout_btn_arr.includes(bet_id)) {
                                recover_cashout_btn_arr.push(bet_id);
                    }
                }
                    }
                }
            },
            error: function () {

            },
            dataType: 'json',
            timeout: 20000
        });
    })*/.delegate('.busket_item_js .bonus_checkbox', 'change', function () {
        if (!$('#b_seria').prop('checked')) {
            if ($(this).prop('checked')) {
                $('.busket_item_js .bonus_checkbox').each(function () {
                    $(this).prop('checked', false)
                        .parents('.busket_item_js')
                        .find('.sum_ord_js')
                        .val('').prop('readonly', false).removeClass('readonly');
                });

                $(this).prop('checked', true)
                    .parents('.busket_item_js')
                    .find('.sum_ord_js').prop('readonly', true)
                    .val($(this).parents('.second-line').find('.amount').text()).addClass('readonly');
            } else $(this).parents('.busket_item_js').find('.sum_ord_js').val('').prop('readonly', false).removeClass('readonly');

            CalcMaxWin();
        }
    }).delegate('.expanded .summ-basket input', 'click', function () {
        $(this).parent().find('.option-tooltip').show();
    }).delegate('.expanded .summ-basket .option-tooltip .bet-max', 'click', function () {
        $(this).parent().next().val($(this).text());
    });

    // Отключение прокрутки основного окна.
    $('#history_body_b').bind('mousewheel', function (e) {
        var d = e.originalEvent.wheelDeltaY;
        var t = $(this);
        if (d > 0 && t.scrollTop() === 0) {
            e.preventDefault();
        } else {
            if (d < 0 && Math.abs(t.scrollTop() - t.get(0).scrollHeight + t.innerHeight()) < 2) {
                e.preventDefault();
            }
        }
    });
    DisplayBetslipSection();
    /*вызов кастомного скролла*/
    if ($("#history_body_b").length > 0) {
        $("#history_body_b").mCustomScrollbar({
            theme: "3d-dark",
            callbacks: {
                whileScrolling: function () {
                    BHistoryCustomScrollbarTop = this.mcs.top;
                    DisplayHistory();
                },
            }
        });
    }
    // Максималка в широком варианте корзины
    $(document).mouseup(function (e) {
        var container = $(".summ-basket .option-tooltip");
        if (container.has(e.target).length === 0) {
            container.hide();
        }
    });

    /* Crutch for new set bet */
    if ($('#wraper_basket_b:visible').length > 0) {
        ActionBonusNotice.betSlipSelector = '#betslip1';
        ActionBonusNotice.sumSelector = '.sum_ord_js';
        ActionBonusNotice.oddSelector = '.odd_ev_js';
        var ActionTypeName = 'desktop_setbetnew';

        ActionBonusNotice.init(ActionTypeName);
        /*$(ActionBonusNotice.betSlipSelector).find('.busket-body').bind("DOMSubtreeModified", function(){
            ActionBonusNotice.init(ActionTypeName);
        });*/
        $(ActionBonusNotice.betSlipSelector)
            .delegate(ActionBonusNotice.sumSelector, 'keyup', function () {
                ActionBonusNotice.init(ActionTypeName);
            })
            .delegate('#b_seria', 'click', function () {
                ActionBonusNotice.init(ActionTypeName);
            })
            .delegate('input.allsum', 'keyup', function () {
                ActionBonusNotice.init(ActionTypeName);
            })
            .delegate('.busket-nav a', 'click', function () {
                setTimeout(ActionNoticeInit, 500);
            })
            .delegate('.busket-item-delete', 'click', function () {
                ActionBonusNotice.init(ActionTypeName);
            })
            .delegate('#ex_max_bet', 'keyup', function () {
                ActionBonusNotice.init(ActionTypeName);
            });

        function ActionNoticeInit() {
            ActionBonusNotice.init(ActionTypeName);
        }

        setTimeout(ActionNoticeInit, 500);
    }
});

function hookCallback(name) {
    if (name === 'load_busket') {

    }
}

function SetTdWidthDefault() {
    const td_right = $(".col_td.right");
    if (getCookie('is_expanded_right') === '1') {
        td_right.addClass('expanded');
    } else {
        td_right.removeClass('expanded');
    }
}

SetTdWidthDefault();

function ToggleTdWidth() {
    const opt = {
        'expires': 0, 'path': '/', 'secure': true
    };
    const td_right = $(".col_td.right");

    if (td_right.hasClass("expanded")) {
        td_right.removeClass('expanded');
        setCookie('is_expanded_right', 0, opt);
    } else {
        td_right.addClass('expanded');
        setCookie('is_expanded_right', 1, opt);
    }
    $("td.col_td.right .group5, td.col_td.right .group6").hide();
    if (!$("#history-button, #cashout-button").hasClass("active")) $('td.col_td.right.expanded .group5, td.col_td.right:not(.expanded) .group6').show();
    //if ($('.video-widget').length > 0 && openvideobr instanceof Function) openvideobr(glob_video_id);
}

function CheckUploadDemand(forse) {
    if (-BHistoryCustomScrollbarTop + $('#history_body_b').height() >= $('#history_body_b .content').height() - ScrollReserv_px && +history_upload_b == 1 && (!HistoryUIP_b || forse)) return true;
    else return false;
}

function DisplayBetslipSection() {
    if ($('#betslip-button').hasClass('active')) {
        $('#wraper_basket_b').show();
        $('#wraper_history_b').hide();
        $('td.col_td.right.expanded .group5, td.col_td.right:not(.expanded) .group6').show();
        DisplayBasket(0, '');
        //betslip_update = setInterval('DisplayBasket(1, "");', betslip_update_interval);
    } else if ($('#history-button, #cashout-button').hasClass('active')) {
        $('#wraper_basket_b').hide();
        $('#wraper_history_b').show();
        $('td.col_td.right.expanded .group5, td.col_td.right:not(.expanded) .group6').hide();
        if ($("#myonoffswitch").prop("checked")) $("#myonoffswitch").prop("checked", false).trigger("change");
        DisplayHistory();
        //clearInterval (betslip_update);
        //clearInterval (betslip_usersum_update);
    }
}

function LoadHistory(current_history_load_id) {
    if (history_load_id == 0) {
        var current_history_load_id = Math.round(Math.random() * 1000000000 + 1);
        history_load_id = current_history_load_id;
    }
    if (history_load_id != current_history_load_id) return;
    //console.log(history_load_id);
    HistoryUIP_b = true;
    $('#history_b_progress_bar').show();
    $('#error-wraper-history').html("");
    $.ajax({
        type: "POST",
        url: '/ajax_history.php',
        data: {
            'action': 'get',
            'p': history_last_bet_b
        },
        success: function (json) {
            if (history_load_id != current_history_load_id) return;
            if (typeof json == 'object') {
                if (json.status == 'ok') {
                    $('#history_body_b div.content').append(json.html);
                    history_upload_b = json.lastbet ? 1 : 0;
                    history_last_bet_b = json.lastbet;
                    if ($('#cashout-button').hasClass('active'))
                        $('.busket .stake-item').each(function () {
                            if (!$(this).find('.cashout-wrapper').length) $(this).hide();
                        });
                } else {
                    history_upload_b = 0;
                    ShowBasketError(json.msg, 'warning');
                }
            } else {
                history_upload_b = 0;
                ShowBasketError(lang.failed_connect_server, 'error');
            }
            if (CheckUploadDemand(true)) LoadHistory(current_history_load_id);
            else {
                HistoryUIP_b = false;
                history_load_id = 0;
                $('#history_b_progress_bar').hide();
                if ($('#history_body_b div.content').html() == "") $('#history_body_b').css('visibility', 'hidden');
                else $('#history_body_b').css('visibility', 'visible');
                if (tick.services['score_betslip']) tick.services['score_betslip'].run_now = true;
                if (tick.services['score_betslip_dttm']) tick.services['score_betslip_dttm'].run_now = true;
                tick.process();
            }
        },
        error: function () {
            if (history_load_id != current_history_load_id) return;
            HistoryUIP_b = false;
            history_load_id = 0;
            $('#history_b_progress_bar').hide();
            history_last_bet_b = 0;
            ShowBasketError(lang.failed_connect_server, 'error');
        },
        dataType: 'json'
    });
}

// Нарисовать. force - перерисовать
function DisplayHistory() {
    if (CheckUploadDemand()) LoadHistory();
}

function SetAllSumm() {
    opt = {
        'expires': 0, 'path': '/', 'secure': true
    };
    if ($('#b_seria').prop('checked')) {
        var $allsum = $('.allsum').val();
        //console.log($allsum);
        $allsum = UnsplitNum($allsum, ' ', 411);
        $allsum = isNaN($allsum) ? 0 : $allsum;
        setCookie('b_1_allsum', $allsum, opt);
        setCookie('b_1_allsum_ch', 1, opt);

        $('.busket_item_js:not(.deleted) .sum_ord_js').prop('disabled', true);
        $('.busket_item_js:not(.deleted) .max_sum_ord_js').prop('disabled', true);
        $(".busket_item_js:not(.deleted) .sum_ord_js").each(function () {
            $sum = $(this);
            if ($allsum > 0) {
                $sum.val(SplitNum($allsum, ' '));
            } else {
                $sum.val('');
            }
        });
        $('.busket_item_js .bonus_checkbox').each(function () {
            $(this).closest('.second-line').hide();
            if ($(this).prop('checked')) {
                $(this).prop('checked', false).parents('.busket_item_js').find(".sum_ord_js").val('').prop('readonly', false).removeClass('readonly');
            }
        });
    } else {
        //$('.sum_ord_js').val('');
        $('.busket_item_js:not(.deleted) .sum_ord_js').prop('disabled', false);
        $('.busket_item_js:not(.deleted) .max_sum_ord_js').prop('disabled', false);
        $('.bonus_checkbox').closest('.second-line').show();
        setCookie('b_1_allsum_ch', 0, opt);

    }
    CalcMaxWin();
}

function BonusTotalClick(obj) {
    var bonusexpress = $(obj).parents('.bonus_total_block_js');
    var kef = $("#ex_kef_sum").text();
    var sum = 0;
    var cash = bonusexpress.data('cash');
    $('#ex_max_bet').val(cash);
    if ([110, 111, 112, 113].includes(bonusexpress.data('id'))) {
        sum = Math.round(cash * CURRENCY_DIVIDER) / CURRENCY_DIVIDER * kef - cash;
        sum = sum.toFixed(CURRENCY_DECIMALS);
    } else {
        sum = cash;
    }
    $('#max_win').val(sum);
    $('#setbonus').val(bonusexpress.data('id'));
    $("#ex_max_win").text(sum);
    $('#betslip_form').submit();
}

function BonusTotalCheck(obj) {

}

function betVisualisation() {
    if (olimp_tv) return false;
    var singles = 0;//счетчик ординаров
    var express = 0;//счетчик экспресса
    var max_overal = -1;//максималка
    var dep = false;//признак наличия зависимых
    var dep_type = [];//Номер ошибки зависимости
    var from3ex = false;//признак "минимум тройной экспресс"
    var placed = 0;//счетчик проведенных
    var change = false;
    var f = $('#busket-nav');
    var error = false;
    var actionShown = 0;
    var action10Shown = 0;
    var action5Shown = 0;
    var last_koef = 0;
    if (betslip_light_version) {
        $('.max_sum_ord_js, #ex_max_bet').hide();
    } else {
        $('.max_sum_ord_js, #ex_max_bet').show();
    }
    for (it in betslip) {
        //выделение удаленных
        if (betslip[it].deleted) {
            $('input[id="koefs_' + betslip[it].market_data + '_r"]').prop('checked', false);
            $("#s-" + it).addClass("deleted");
            $("#s-" + it + " .sum_ord_js").prop("disabled", true);
            $("#s-" + it + ' .max_sum_ord_js').prop("disabled", true);
            $("#s-" + it + ' .sum_ord_js').prop("disabled", true);
            if (BasketTab.val() == 1) {
                $("#s-" + it + ' .max_sum_ord_js').removeClass('dis_but_betslip');
            }
            $("#s-" + it + " .skip_input_js").val(betslip[it].market_data);
        } else {
            var r_checkbox = $('input[id="koefs_' + betslip[it].market_data + '_r"]');
            r_checkbox.prop('checked', false);
            r_checkbox.trigger('click');
            $("#s-" + it).removeClass("deleted");
            $("#s-" + it + " .sum_ord_js").prop("disabled", false);
            $("#s-" + it + ' .max_sum_ord_js').prop("disabled", false);
            $("#s-" + it + ' .sum_ord_js').prop("disabled", false);
            $("#s-" + it + " .skip_input_js").val(0);

            //выделение измененых
            $kef_obj = $("#s-" + it + " .odd_ev_js");
            $kef_obj.removeClass('kf_green kf_red rekoef koef');
            last_koef = kef = betslip[it].value.toFixed(2);
            if (betslip[it].value != betslip[it].old_value) {
                change = true;
                kef = betslip[it].value.toFixed(2);
                $("#s-" + it + ' .odd_input_js').val(kef);
                $sum = $("#s-" + it + ' .sum_ord_js').val();
                maxwin = kef * $sum;
                if (isNaN(maxwin)) maxwin = 0;

                if ($('#s-' + it + ' .bonus_checkbox:checked').length > 0)
                    maxwin = parseInt($('#s-' + it + ' .sumwin').val().replace(' ', ''));

                $("#s-" + it + " .max_win_ord_js").text(maxwin.toFixed(0));
                if (!betslip_light_version) $("#s-" + it + ' .sum_ord_js').data('max', parseFloat(betslip[it].new_max_bet));

                if (betslip[it].old_value < betslip[it].value) {
                    $kef_obj.addClass("rekoef kf_green").text(kef);
                } else {
                    if (betslip[it].old_value > betslip[it].value) {
                        $kef_obj.addClass("rekoef kf_red").text(kef);
                    } else {
                        $kef_obj.addClass('koef').text(kef);
                    }
                }
                $kef_obj.val(kef);
                $kef_obj.data('raw', betslip[it].value_raw)
            } else {
                $kef_obj.addClass("koef");
            }

            $promo_obj = $("#s-" + it + " .bonus_action_js");
            $bonusKef = $promo_obj.data('bonus_kef');
            if ($kef_obj.data('raw') >= $bonusKef && actionShown == 0) {
                $(".bonus_action_js").addClass('actionHide');
                $promo_obj.removeClass('actionHide');
                actionShown = 1;
            } else {
                $promo_obj.addClass('actionHide');
            }

            //смена названия
            $("#s-" + it + " .event_name_js").text(betslip[it].event_name);
            if (!betslip_light_version) $("#s-" + it + ' .max_sum_ord_js').data('max', parseFloat(betslip[it].new_max_bet));
            if (!betslip_light_version) $("#s-" + it + ' .max_sum_ord_js').val(betslip[it].vmaxbet);
            if (BasketTab.val() != 1 && TypeBet == 1 && !betslip[it].deleted && (max_overal == -1 || max_overal > betslip[it].new_max_bet))
                max_overal = betslip[it].new_max_bet;
            //выделение зависимых

            if (BasketTab.val() != 1) {
                if ($.isEmptyObject(betslip[it].dep)) {
                    $("#s-" + it).removeClass("dep");
                    $("#s-" + it + ' .dependence_icon_js').addClass("hide");
                } else {
                    Object.values(betslip[it].dep).forEach(function callback(val) {
                        dep_type[val] = true;
                    });
                    $("#s-" + it).addClass("dep");
                    $("#s-" + it + ' .dependence_icon_js').removeClass("hide");
                    dep = true;
                }
            }
        }
        if (BasketTab.val() == 1 && TypeBet == 1) {
            sw = $('.busket-item:not(.deleted) .sum_ord_js');
            sb = $('.busket-item:not(.deleted) .max_sum_ord_js');
            if ($('#b_seria').prop('checked')) {
                sw.prop('disabled', true);
                sb.prop('disabled', true);
                var $allsum = $('.allsum').val();
                $allsum = UnsplitNum($allsum, ' ', 581);
                if (isNaN($allsum)) {
                    $allsum = '';
                }
                sw.val(SplitNum($allsum, ' '));
            } else {
                sw.prop('disabled', false);
                sb.prop('disabled', false);
            }
        }

        //подсчет для мультиставок
        if (!betslip[it].deleted) {
            if (betslip[it].specVal == 2) {
                from3ex = true;
            } else {
                singles++;
            }
            if (betslip[it].specVal != 4) {
                express++;
            }
        }
        //подсчет проведеных
        if (betslip[it].placed) {
            placed++;
        }
    }

    MarkOddsInLine();
    if (BasketTab.length > 0) {
        if (BasketTab.val() != 1 && TypeBet == 1) {
            $("#btmax").data('max', parseFloat(max_overal)).val(number_format(parseFloat(max_overal), CURRENCY_DECIMALS, '.', ' '));
        }
        if (max_overal == -1) $("#btmax").prop('disabled', true);
        else $("#btmax").prop('disabled', false);

        if (BasketTab.val() == 2) {
            BonusForExpressCalc();
        }
    }
    if (singles == 1) {
        $promo_10obj = $(".bonus_action5cash_js");
        var bonusKef = parseFloat($promo_10obj.data('bonus_kef'));
        if (last_koef >= bonusKef && action5Shown == 0) {
            $promo_10obj.removeClass('hide');
            action5Shown = 1;
        } else {
            $promo_10obj.addClass('hide');
            action5Shown = 0;
        }
    }
    if (BasketTab.val() == 3) {
        var selected_size = $('#id_system_type option:selected').data('size');
        $('#id_system_type').html(MakeSelectForSystem(BetNDCnt()));
        $('#id_system_type').find('option[data-size="' + selected_size + '"]').prop('selected', true);
    }

    var items = $(".busket_item_js:not(.deleted)").length;
    var submit_show = true;
    if (items == 1) {
        $('#bn2, #bn3').addClass('grey');
        if (BasketTab.val() != 1) {
            error = true;
            submit_show = false;
            $('#istypeerror').removeClass('hide');
        } else {
            $('#istypeerror').addClass('hide');
        }
    } else if (items == 2) {
        $('#bn2').removeClass('grey');
        $('#bn3').addClass('grey');
        if (BasketTab.val() == 3) {
            error = true;
            submit_show = false;
            $('#istypeerror').removeClass('hide');
        } else {
            $('#istypeerror').addClass('hide');
        }
    } else if (items > 2) {
        $('#bn2, #bn3').removeClass('grey');
        $('#istypeerror').addClass('hide');
    }
    if (dep) {
        if (dep_type[4]) {
            $('#is_only_ordinar').removeClass('hide');
        }
        if (dep_type[7]) {
            $('#isdep_mix').removeClass('hide');
        }
        if (dep_type[1] || dep_type[2] || dep_type[3]) {
            $('#isdep').removeClass('hide');
        }
        submit_show = false;
    } else {
        $('#is_only_ordinar').addClass('hide');
        $('#isdep_mix').addClass('hide');
        $('#isdep').addClass('hide');
    }
    if (submit_show) {
        $('.busket .submit_js').show();
    } else {
        $('.busket .submit_js').hide();
    }
    if (change) {
        $('#ischange').removeClass('hide');
    } else {
        $('#ischange').addClass('hide');
    }
    if ($('#b_seria').prop('checked')) $('.busket .allsum').keyup();
    CalcMaxWin();
    if (getCookie('auto_tab_switcher') != '2') {
        if (items >= 2) {
            if ($('.busket-nav > .active').index() != 1) {
                setCookie('auto_tab_switcher', '1');
                $('#bn2').trigger('click');
            }
        }
        if (items == 1) {
            if ($('.busket-nav > .active').index() != 0) {
                setCookie('auto_tab_switcher', '1');
                $('#bn1').trigger('click');
            }
        }
    } else if (items == 0) {
        setCookie('auto_tab_switcher', '1');
    }
    if (ordinarsSetOn) {
        if (!$('#b_seria').prop('checked')) {
            $('#b_seria').trigger('click');
            $('#b_seria').prop('checked', true);
            ordinarsSetOn = false;
        }
    }
}

function trigger_b_seria(elem) {
    if ($(elem).prop('checked')) {
        ordinarsSetOn = true;
        setCookie('auto_tab_switcher', '2');
        $('#bn1').trigger('click');
    }
}

function set_b_1_allsum_ch(elem) {
    if ($(elem).prop('checked')) {
        $(elem).prop('checked', $(elem).prop('checked'));
        setCookie('b_1_allsum_ch', 1);
    } else {
        setCookie('b_1_allsum_ch', 0);
    }
}

function CalcMaxWin() {
    $typebasket = $('#busket-nav').val();
    $usersumm = $('#usersumm').val();
    // Ординары
    if ($typebasket == 1 && TypeBet == 1) {
        var b1_AllSum = 0.0;
        var win_AllSum = 0.0;
        $(".busket_item_js:not(.deleted)").each(function () {
            var _this = $(this);
            var fb_key = $(this).find('.fb_js').val() == '1';
            $id = GetTrueID(_this.attr('id'));
            var tmp = 0.0;
            var max_sum_kef = 0;
            var $sum = _this.find('.sum_ord_js');
            var $sumval = UnsplitNum($sum.val(), ' ', 721); // убираем пробелы
            opt = {
                'expires': 60, 'path': '/', 'secure': true
            };
            if (isNaN($sumval)) $sumval = '';
            else {
                if (!fb_key) setCookie('b_1_' + $id, parseFloat($sumval), opt);
                else setCookie('b_1_' + $id, '', opt);
                b1_AllSum = parseFloat(parseFloat($sumval)) + b1_AllSum;
                var $kef = $(this).find('.odd_ev_js').text();
                tmp += Math.round($sumval * CURRENCY_DIVIDER) / CURRENCY_DIVIDER * $kef;

                if (_this.find('.bonus_checkbox:checked').length > 0) {
                    if (['110', '111', '112', '113'].includes(_this.find('.bonus_checkbox:checked').val()))
                        tmp = tmp - $sumval;
                    else
                        tmp = Math.round($sumval * CURRENCY_DIVIDER) / CURRENCY_DIVIDER;
                }

                tmp = (tmp > MAXIMUM_PAYOUT ? MAXIMUM_PAYOUT : tmp);
            }
            var $maxwin = _this.find('.max_win_ord_js');

            max_sum_kef = _this.find('.max_sum_ord_js').data('max');

            /*
             if (tmp >= 1000000) {
             if (CURRENCY_DECIMALS > 1) {
             $maxwin.css('font-size', '11px');
             } else {
             $maxwin.css('font-size', '12px');
             }
             } else {
             if (CURRENCY_DECIMALS > 1) {
             $maxwin.css('font-size', '14px');
             } else {
             $maxwin.css('font-size', '14px');
             }
             }
             */
            if (!betslip_light_version && max_sum_kef < $sumval) {
                $sum.css('color', 'red');
                //blink("#btmax-" + $id, 3, 350);
                _this.find('.max_err_js').show();
            } else {
                $sum.css('color', '#848484');
                _this.find('.max_err_js').hide();
            }
            win_AllSum = win_AllSum + tmp;

            $maxwin.text(number_format(parseFloat(tmp), CURRENCY_DECIMALS, '.', ' '));
            $sumval = SplitNum($sumval, ' ');
            $sum.val($sumval);
        });
        win_AllSum = (win_AllSum > MAXIMUM_PAYOUT ? MAXIMUM_PAYOUT : win_AllSum);
        max_win_sum = $('#max_win_sum');
        /*
         if (win_AllSum >= 1000000) {
         if (CURRENCY_DECIMALS > 1) {
         max_win_sum.css('font-size', '11px');
         } else {
         max_win_sum.css('font-size', '12px');
         }
         } else {
         if (CURRENCY_DECIMALS > 1) {
         max_win_sum.css('font-size', '13px');
         } else {
         max_win_sum.css('font-size', '14px');
         }
         }
         */
        max_win_sum.text(number_format(parseFloat(win_AllSum), CURRENCY_DECIMALS, '.', ' '));
        $('#max_win').val(parseFloat(win_AllSum));
        var is_fb = false;
        $('.busket_item_js .fb_js').each(function () {
            is_fb = is_fb || $(this).val() == "1"
        });

        if ($('.bonus_checkbox:checked').length > 0 || $('#DoPercentFB').val() == 1)
            is_fb = true;

        if (b1_AllSum > $usersumm && !is_fb) {
            $('#isnomany').removeClass('hide');
            $('.busket .submit_js').hide();
        } else {
            $('#isnomany').addClass('hide');
            $('.busket .submit_js').show();
        }
    } else {
        if ($typebasket == 2 && TypeBet == 1) {
            if ($('#setbonus').length > 0) {
                if ($('#setbonus').val() > 0)
                    return false;
            }

            var tmp = 0.0;
            var $kef = $("#ex_kef_sum").text();
            var $ex_max_win = $("#ex_max_win");
            var $ex_max_bet = $("#ex_max_bet");
            var max_sum_kef = $('#btmax').data('max');
            $('input[name="exp_koef"]').val($kef);
            $('#exp_max').val(parseFloat(max_sum_kef));// максимум для экспреса
            $ex_max_bet.val(UnsplitNum($ex_max_bet.val(), ' '), 855);
            opt = {
                'expires': 600, 'path': '/', 'secure': true
            };
            setCookie('b_2_maxsum', parseFloat($ex_max_bet.val()), opt);
            if (parseFloat($ex_max_bet.val()) > $usersumm && $('#setbonus').val() == 0 && $('#DoPercentFB').val() != 1) {
                $('#isnomany').removeClass('hide');
            } else {
                $('#isnomany').addClass('hide');
            }
            tmp = Math.floor($ex_max_bet.val() * CURRENCY_DIVIDER) / CURRENCY_DIVIDER * $kef;
            tmp = (isNaN(tmp) ? 0 : tmp.toFixed(CURRENCY_DECIMALS));
            tmp = (tmp > MAXIMUM_PAYOUT ? MAXIMUM_PAYOUT : tmp
            );

            /*
             if (tmp >= 1000000) {
             if (CURRENCY_DECIMALS > 1) {
             $ex_max_win.css('font-size', '11px');
             } else {
             $ex_max_win.css('font-size', '12px');
             }
             } else {
             if (CURRENCY_DECIMALS > 1) {
             $ex_max_win.css('font-size', '13px');
             } else {
             $ex_max_win.css('font-size', '14px');
             }
             }
             */
            if (!betslip_light_version && max_sum_kef != -1 && max_sum_kef < $ex_max_bet.val()) {
                $ex_max_bet.css('color', 'red');
                //blink("#btmax", 3, 100);
                $('#max-err').show();
            } else {
                $ex_max_bet.css('color', '#848484');
                $('#max-err').hide();
            }
            if (tmp <= 0) {
                tmp = 0;
            }
            $ex_max_win.text(number_format(parseFloat(tmp), CURRENCY_DECIMALS, '.', ' '));
            $('#max_win').val(parseFloat(tmp));
            $ex_max_bet.val(SplitNum($ex_max_bet.val(), ' '));
        } else {
            if ($typebasket == 3 && TypeBet == 1) {
                var tmp = 0.0;
                var b3_$allsumKef = 1;
                $(".busket_item_js:not(.deleted)").each(function () {
                    $kef_obj = $(this).find(".odd_ev_js");
                    b3_$allsumKef = parseFloat($kef_obj.text()) * parseFloat(b3_$allsumKef);
                });
                var $sis_kef_sum = $("#kef_summ");
                $sis_kef_sum.val(b3_$allsumKef.toFixed(2));
                var $sis_max_bet = $('#ex_max_bet');
                var $sis_max_win = $('#sis_max_win');
                var max_sum_kef = $('#btmax').data('max');
                opt = {
                    'expires': 600, 'path': '/', 'secure': true
                };
                $sis_max_bet.val(UnsplitNum($sis_max_bet.val(), ' '), 927);
                if (parseFloat($sis_max_bet.val()) > $usersumm && $('#DoPercentFB').val() != 1) {
                    $('#isnomany').removeClass('hide');
                } else {
                    $('#isnomany').addClass('hide');
                }
                setCookie('b_3_maxsum', $sis_max_bet.val(), opt);
                system_type = $('#id_system_type').val();
                if (system_type != undefined) {
                    comb_size = system_type.substring(0, system_type.indexOf('.'));
                    sys_size = system_type.substring(system_type.indexOf('.') + 1, system_type.length);
                } else {
                    comb_size = 1;
                    sys_size = 1;
                }
                el_bet = UnsplitNum($sis_max_bet.val(), " ");
                if (isNaN(el_bet)) el_bet = 0;
                var el_bet = Math.floor(el_bet * CURRENCY_DIVIDER) / CURRENCY_DIVIDER / calc_size(sys_size, comb_size);
                init_array = [];
                full_array = new Array([]);
                tmp_array = [];
                for (var i = 0; i < sys_size; i++) {
                    init_array[i] = i + 1;
                }
                MoveElement(comb_size, 0);
                var koef_array = [];
                var k_cnt = 1;
                for (it in betslip) {
                    if (!betslip[it].deleted) {
                        koef_array[k_cnt] = betslip[it].value;
                        k_cnt++;
                    }
                }
                if (k_cnt > 3) {
                    for (var i = 0; i < full_array.length; i++) {
                        var koef = 1;
                        var tmp_win = 0;
                        for (var j = 0; j < full_array[i].length; j++) {
                            koef = koef * koef_array[full_array[i][j]];
                        }
                        if (koef > MAXIMUM_ODD) {
                            koef = MAXIMUM_ODD;
                        }
                        tmp += el_bet * koef;
                    }
                    tmp = isNaN(tmp) ? 0 : tmp.toFixed(CURRENCY_DECIMALS);
                    tmp = tmp > MAXIMUM_PAYOUT ? MAXIMUM_PAYOUT : tmp;
                    if (tmp <= 0) {
                        tmp = 0;
                    }
                    $sis_max_win.text(number_format(tmp, CURRENCY_DECIMALS, '.', ' '));
                    $('#max_win').val(tmp);
                    $('#id_system_type').show();
                    $('#max_win_block').show();
                } else {
                    $('#id_system_type').hide();
                    $('#max_win_block').hide();

                }
                /*
                 if (tmp >= 1000000) {
                 if (CURRENCY_DECIMALS > 1) {
                 $sis_max_win.css('font-size', '11px');
                 } else {
                 $sis_max_win.css('font-size', '12px');
                 }
                 } else {
                 if (CURRENCY_DECIMALS > 1) {
                 $sis_max_win.css('font-size', '13px');
                 } else {
                 $sis_max_win.css('font-size', '14px');
                 }
                 }
                 */
                if (!betslip_light_version && max_sum_kef < $sis_max_bet.val()) {
                    $sis_max_bet.css('color', 'red');
                    //blink("#btmax", 3, 100);
                    $('#max-err').show();
                } else {
                    $sis_max_bet.css('color', '#848484');
                    $('#max-err').hide();
                }
                $sis_max_bet.val(SplitNum($sis_max_bet.val(), ' '));
            }
        }
    }
}

// Загрузка состония корзины
function DisplayBasket(update, cp) {
    currpage = $('input[name="currpage"]').val();
    BasketTab = $('#busket-nav');
    let new_site = getCookie('new_site');

    if (typeof new_site != 'undefined' && new_site !== '1' || typeof new_site == 'undefined') {
        if (isActivebTab) {
            $.post($urlAjax, {
                'action': 'form', 'currpage': currpage, 'BasketTab': BasketTab.val(), 'cp': cp, 'update': update
            }, function (json) {
                DisplayBasketInside(json, update);
            }, 'json');
        }
    }

}

function ShowBasketError(text, type, obj) {
    var myobj;
    if (olimp_tv) {
        if (window.opener.$('#betslip-button').hasClass('active')) myobj = window.opener.$('#error-wraper-betslip');
        else if (window.opener.$('#history-button, #cashout-button').hasClass('active')) myobj = window.opener.$('#error-wraper-history');
    } else {
        if ($('#betslip-button').hasClass('active')) myobj = $('#error-wraper-betslip');
        else if ($('#history-button, #cashout-button').hasClass('active')) myobj = $('#error-wraper-history');
    }
    if ($('#setbonus').length) {
        $('#setbonus').val(0);
    }
    obj = obj || myobj;
    type = type || 'warning';
    //var $error = '<div class="rekoeff-infoblock">' + '<div>' + '<img src="/img/' + type + '.png" alt="warning"> &nbsp;' + text + '</div>' + '</div>';
    var $error = '<div class="rekoeff-infoblock"><div><table>' + '<tr>' + '<td>' + '<div class="' + type + '_icon"></div>' + '</td>' + '<td >' + '<span style="line-height:12px;">' + text + '</span>' + '</td>' + '</tr>' + '</table></div></div>';
    obj.html($error);
}

function ShowBasketMsg(text, type) {
    type = type || 'accept';
    var $error = '<div class="warning-infoblock">' + '<div>' + '<div class="' + type + '_icon"></div>' + text + '</div>' + '</div>';
    if (olimp_tv) {
        if (window.opener.$('#betslip-button').hasClass('active')) window.opener.$('#error-wraper-betslip').html($error);
        else if (window.opener.$('#history-button, #cashout-button').hasClass('active')) window.opener.$('#error-wraper-history').html($error);
    } else {
        if ($('#betslip-button').hasClass('active')) $('#error-wraper-betslip').html($error);
        else if ($('#history-button, #cashout-button').hasClass('active')) $('#error-wraper-history').html($error);
    }
}

function MoveElement(elem_cnt, start_pos) {
    if (elem_cnt != 0) {
        for (var i = start_pos; i <= (sys_size - elem_cnt); i++) {
            tmp_array[comb_size - elem_cnt] = init_array[i];
            MoveElement(elem_cnt - 1, i + 1);
            if (full_array[full_array.length - 1].join("") != tmp_array.join("")) {
                if (full_array[full_array.length - 1].join("") != "") {
                    full_array[full_array.length] = [];
                }
                for (var j = 0; j < tmp_array.length; j++) {
                    full_array[full_array.length - 1][j] = tmp_array[j];
                }
            }
        }
    }
}

function calc_fc(numb) {
    p = 1;
    for (var i = 1; i <= numb; i++) {
        p = p * i;
    }
    return p;
}

function calc_size(sys_size, comb_size) {
    return calc_fc(sys_size) / (calc_fc(comb_size) * calc_fc(sys_size - comb_size)
    );
}

function SplitNum(int_num, splitter) {
    if (int_num == undefined) return 0;
    var str = "";
    int_num = int_num.toString();
    if (int_num.indexOf('.') != -1) {
        str = int_num.substring(0, int_num.indexOf('.'));
    } else {
        str = int_num;
    }
    var j_cnt = 0;
    var str2 = "";
    for (j = (str.length - 1
    ); j >= 0; j--) {
        if (j_cnt % 3 == 0 && j_cnt != 0 && str.substring(j, j + 1) != "-") {
            str2 = splitter + str2;
        }
        str2 = str.substring(j, j + 1) + str2;
        j_cnt++;
    }
    if (int_num.indexOf('.') != -1) {
        str2 = str2 + "." + int_num.substring(int_num.indexOf('.') + 1);
    }
    return str2;
}

function UnsplitNum(int_num, splitter, line) {
    if (int_num == undefined) return 0;
    var str = "";
    int_num = int_num.replace(/[^0-9\.]/g, '');
    if (int_num.indexOf('.') != -1) {
        str = int_num.substring(0, int_num.indexOf('.'));
    } else {
        str = int_num;
    }
    str = parseInt(str);
    if (isNaN(str)) str = '';
    else str = str.toString();
    if (int_num.indexOf('.') != -1) {
        str = str + "." + int_num.substring(int_num.indexOf('.') + 1);
    }
    return str;
}

function number_format(number, decimals, dec_point, thousands_sep) {// Format a number with grouped thousands
    //
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // + bugfix by: Michael White (http://crestidg.com)
    var i, j, kw, kd, km;
    // input sanitation & defaults
    if (isNaN(decimals = Math.abs(decimals))) {
        decimals = 2;
    }
    if (dec_point == undefined) {
        dec_point = ",";
    }
    if (thousands_sep == undefined) {
        thousands_sep = ".";
    }
    i = parseInt(number = (+number || 0
    ).toFixed(decimals)) + "";
    if ((j = i.length
    ) > 3) {
        j = j % 3;
    } else {
        j = 0;
    }
    km = (j ? i.substr(0, j) + thousands_sep : ""
    );
    kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
    //kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).slice(2) : "");
    kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : ""
    );
    return km + kw + kd;
}

function blink(elem, times, speed) {
    if (times > 0 || times < 0) {
        if ($(elem).hasClass("blink")) {
            $(elem).removeClass("blink");
        } else {
            $(elem).addClass("blink");
        }
    }
    clearTimeout(function () {
        blink(elem, times, speed);
    });
    if (times > 0 || times < 0) {
        setTimeout(function () {
            blink(elem, times, speed);
        }, speed);
        times -= .5;
    }
}

// возвращает cookie если есть или undefined
function getCookie(name) {
    var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined
}

// уcтанавливает cookie
function setCookie(name, value, props) {
    props = props || {};
    var exp = props.expires;
    if (typeof exp == "number" && exp) {
        var d = new Date();
        d.setTime(d.getTime() + exp * 60 * 1000);
        exp = props.expires = d
    }
    if (exp && exp.toUTCString) {
        props.expires = exp.toUTCString()
    }
    value = encodeURIComponent(value);
    var updatedCookie = name + "=" + value;
    for (var propName in props) {
        updatedCookie += "; " + propName;
        var propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue
        }
    }
    //console.log(updatedCookie);
    document.cookie = updatedCookie
}

// удаляет cookie
function deleteCookie(name) {
    setCookie(name, null, {expires: -1})
}

function runScript(e) {
    if (e.keyCode == 13) {
        $('#save-oc-button').trigger('click');
        return false;
    } else {
        $('#save-oc-button').removeClass('dis_but_betslip');
    }
}

function BetNDCnt() {
    var cnt = 0;
    for (it in betslip)
        if (!betslip[it].deleted) cnt++;
    return cnt;
}

function BonusForExpress() {
    var bonus = true;
    for (it in betslip) {
        bonus = bonus && (betslip[it].deleted || betslip[it].mtype === 'line' || betslip[it].mtype === 'live');
        if (!bonus) break;
    }
    return bonus;
}

function MakeSelectForSystem(system_size) {
    var option_text = '';
    var result_text = '';
    for (var i = 2; i < system_size; i++) {
        option_text = '';
        total_combo = calc_size(system_size, i);
        if (total_combo <= 100) {
            option_text = eval('lang.system_size_select' + i);
            if (option_text == undefined)
                option_text = lang.system_size_select;
            if (option_text != undefined) {
                option_text = option_text.replace(/%c/, i);
                option_text = option_text.replace(/%s/, system_size);
                option_text = option_text.replace(/%t/, total_combo);
                result_text += "<option value='" + i + "." + system_size + "' data-size='" + i + "'>" + option_text + "</option>";
            }
        }
    }
    return result_text;
}

const bonusMin = 11;
const bonusMax = 20;

function updateBonusScale(bonusValue) {
    let bonuses = [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    if (currentDomain === 'kg') {
        bonuses = [0, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    }
    let offset = 0, width = 0;
    html = '';
    if (bonusValue > 100) bonusValue = 100;
    if (bonusValue <= 0 || typeof bonusValue == "undefined") bonusValue = 0;
    $.each(bonuses, function (i, percent) {
        let isActive = percent == bonusValue;
        if (isActive) {
            offset = percent <= 80 ? i - 2 : (percent == 90 ? i - 3 : i - 4);
            width = percent < 2 ? 0 : (percent == 2 ? 25 : (percent == 90 ? 75 : (percent == 100 ? 100 : 50)));
        }
        html += '<span ' + (isActive ? 'class="active"' : '') + '>' + percent + '%</span>';

    });
    $(".outcome-section").remove();
    $(".busket-body")
        .prepend('<div class="outcome-section">' +
            '<div class="outcome-title">' + (typeof jsTranslate != "undefined" ? jsTranslate.addOdd : '') + '</div>' +
            '<div class="outcome-line-wrap">' +
            '<div class="outcome-stroke" style="width: ' + width + '%;"></div>' +
            '<div class="outcome-steps" style="transform: translateX(-' + offset * 20 + '%);">' + html + '</div>' +
            '</div>' +
            '</div>');
}

function BonusForExpressCalc() {
    var fixsum;
    var $ex_kef_sum = $("#ex_kef_sum");
    let bonus_count = 0;
    b2_$allsumKef = 1;
    $(".busket_item_js:not(.deleted)").each(function () {
        $kef_obj = $(this).find(".odd_ev_js");
        b2_$allsumKef = parseFloat($kef_obj.text()) * parseFloat(b2_$allsumKef);
        if (parseFloat($kef_obj.text(), 10) >= 1.3) bonus_count++;
    });
    $ex_kef_sum.text(b2_$allsumKef.toFixed(2));
    fixsum = $ex_kef_sum.text() * 1;
    bonus_koef = 1;
    updateBonusScale(0);
    if ($('.bsbonus').length) {
        var bet_cnt = BetNDCnt();
        if (fixsum >= 2.5 && bet_cnt > 1 && BonusForExpress()) {
            var bonus_koef = '1.';
            var bonus_pc = '';
            $('.bsbonus').removeClass('hide');
            if (currentDomain === 'kg') {
                bonus_count = bonus_count > 10 ? 10 : bonus_count;
                bet_cnt = bet_cnt > 10 ? 10 : bet_cnt;
            }
            if (bet_cnt >= 10) {
                bonus_koef = bonus_koef + '1';
                bonus_pc = '10';
            } else {
                bonus_koef = bonus_koef + '0' + bet_cnt;
                bonus_pc = bet_cnt;
            }
            if (bonus_count >= bonusMin) {
                bonus_koef = (bonus_count == bonusMin ? 1.15 : ((bonus_count >= bonusMax) ? 2 : parseFloat("1." + (bonus_count - 10), 10)));
                bonus_pc = Math.round((bonus_koef - 1) * 100);
            }
            updateBonusScale(bonus_pc);
            $('.odd_bonus_exp_js .value').text(bonus_koef);
            $('.odd_bonus_exp_js .percent').text(bonus_pc);
            b2_$allsumKef = b2_$allsumKef * bonus_koef;
        } else {
            $('.odd_bonus_exp_js .value').text(1);
            $('.odd_bonus_exp_js .percent').text(0);
            $('.bsbonus').addClass('hide');
        }
    }
    if (b2_$allsumKef > MAXIMUM_ODD)
        b2_$allsumKef = MAXIMUM_ODD;
    //alert($(".bonus_action_js").data('bonus_kef'));
    $bonusKef = parseFloat($(".bonus_action_js").data('bonus_kef'));
    if (b2_$allsumKef >= $bonusKef) {
        $(".bonus_action_js").removeClass('actionHide')//показать
    } else {
        $(".bonus_action_js").addClass('actionHide')//скрыть
    }

    $bonusKef_cash = parseFloat($(".bonus_action5cash_js").data('bonus_kef'));
    if (b2_$allsumKef >= $bonusKef_cash) {
        $(".bonus_action5cash_js").removeClass('hide')//показать
    } else {
        $(".bonus_action5cash_js").addClass('hide')//скрыть
    }

    $('.bonus_total_block_js').each(function () {
        var open = true;
        if ($(this).data('min_odd') != undefined && $(this).data('min_odd') > (b2_$allsumKef).toFixed(2))
            open = false;
        if ($(this).data('min_cnt') != undefined && $(this).data('min_cnt') > bet_cnt)
            open = false;
        if (open) $(this).show();
        else $(this).hide();
    });

    $ex_kef_sum.text(b2_$allsumKef.toFixed(2));
}

function GetTrueID(id) {
    var tmp = id.split('-');
    return tmp[1];
}

function MarkOddsInLine() {
    $('.koefs').removeClass('sel');
    for (it in betslip) {
        if (!betslip[it].deleted) {
            var save_any_handicap = $('input[name="save_any_handicap"]:checked').val();
            if (save_any_handicap == 2) {
                if (betslip[it].legacy_key == undefined && betslip[it].eventid_added != undefined)
                    var legacy_key = betslip[it].eventid_added + '.' + betslip[it].sid;
                else
                    var legacy_key = betslip[it].legacy_key;
                $koefs_select = $('[data-legacy="' + legacy_key + '"]');
            } else {
                $koefs_select = $('[data-select="' + betslip[it].market_data + '"]');
            }
            $koefs_select.addClass('sel');
        }
    }
}

function BetslipUpdateTick(response) {
    DisplayBasketInside(response, 1);
}

function DisplayBasketInside(json, update) {
    if (typeof json == 'object') {
        if (json.status == 'ok') {
            if (json.light) betslip_light_version = 1;
            else betslip_light_version = 0;

            // Удаляем ошибку
            //$('.rekoeff-infoblock').remove();
            if (update == 0) {
                $('#bn1, #bn2, #bn3').removeClass('active');
                $('#bn' + json.bn).addClass('active');
                $('#busket-nav').val(json.bn);
                $('.busket-body').html(json.html);
                if (is_click) {
                    $('.busket .submit_js').addClass('busket_load').text('');
                }
            }
            //$('#select_item').html(json.basketlist);
            TypeBet = json.TypeBet;
            if (TypeBet == 1) {
                betslip = json.betslip;
                //Проверка на соответствие
                var tmp_len = 0;
                var tmp_upd = false;
                for (it in betslip) {
                    if ($("#s-" + it).length == 0) {
                        tmp_upd = true;
                        break;
                    }
                    tmp_len++;
                }
                if ($(".busket_item_js").length > tmp_len) tmp_upd = true;
                if ($('#busket-nav').val() != json.bn) {
                    $('#bn1, #bn2, #bn3').removeClass('active');
                    $('#bn' + json.bn).addClass('active');
                    $('#busket-nav').val(json.bn);
                    tmp_upd = true;
                }
                if ($('#myonoffswitch').prop('checked')) {
                    $('#myonoffswitch').prop('checked', false);
                    $('#myonoffswitch_e').prop('checked', false);
                    $('.rekoeff-infoblock').remove();
                    $('.warning-infoblock').addClass('hide');
                    $('.busket-nav').removeClass('hide');
                    $('.sel_bas').show();
                    tmp_upd = true;
                }
                if (tmp_upd) $('.busket-body').html(json.html);
                $('.sel_bas').show();
                $('.busket-nav').removeClass('hide');
                betVisualisation();
            } else {
                if (!$('#myonoffswitch').prop('checked')) {
                    $('#myonoffswitch').prop('checked', true);
                    $('#myonoffswitch_e').prop('checked', true);
                    $('.rekoeff-infoblock').remove();
                    $('.warning-infoblock').addClass('hide');
                    $('.sel_bas').hide();
                    $('.busket-body').html(json.html);
                    betslip = {};
                    MarkOddsInLine();
                }
                $('.busket-nav').addClass('hide');
            }
            $('#usersumm').val(json.currusum);
        } else {
            ShowBasketError(json.msg, 'warning');
        }
    } else {
        ShowBasketError(lang.failed_connect_server, 'warning');
    }
}

function GetVisibleCashoutId() {
    var result = [];
    var bid;
    var dx;
    $(".busket .stake-item .cashout-wrapper .sell_text").each(function () {
        dx = $(this).parents(".cashout-wrapper").position().top + $(this).parents(".stake-item").position().top + BHistoryCustomScrollbarTop;
        if (dx + $(this).parents(".cashout-wrapper").height() > 0 && dx < $('#history_body_b').height()) {
            bid = parseInt($(this).parents(".stake-item").find(".betid").text());
            if (!isNaN(bid)) result.push(bid);
        }
    });
    return {id: result};
}

function GetVisibleBetsId() {
    var result = [];
    var bid;
    var dx;
    $(".busket .stake-item").each(function () {
        if ($(this).find('.cashout-wrapper').length > 0) return;
        dx = $(this).position().top + BHistoryCustomScrollbarTop;
        if (dx + $(this).height() > 0 && dx < $('#history_body_b').height()) {
            bid = parseInt($(this).data("cid"));
            if (!isNaN(bid)) result.push(bid);
        }
    });
    return {id: result};
}

function BetslipCashoutUpdateTick(json) {
    for (var id in json) {
        if (json[id].hide)
            $("#wraper_history_b .stake-item[data-betid='" + id + "']").animate({height: 0}, function () {
                $(this).remove()
            });
        else {
            if (json[id].hide_button) {
                $("#wraper_history_b .stake-item[data-betid='" + id + "'] .cashout-wrapper").remove();
            } else {
                if (json[id].stop) {
                    $("#wraper_history_b .stake-item[data-betid='" + id + "'] .cashout-wrapper .amount").text('');
                    $("#wraper_history_b .stake-item[data-betid='" + id + "'] .cashout-wrapper .sell_text").hide();
                    $("#wraper_history_b .stake-item[data-betid='" + id + "'] .cashout-wrapper .block_text").show();
                    $("#wraper_history_b .stake-item[data-betid='" + id + "'] .cashout-wrapper .btn-sell-stakes").addClass('inactive');
                } else {
                    $("#wraper_history_b .stake-item[data-betid='" + id + "'] .cashout-wrapper .amount").text(json[id].amount);
                    $("#wraper_history_b .stake-item[data-betid='" + id + "'] .cashout-wrapper .sell_text").show();
                    $("#wraper_history_b .stake-item[data-betid='" + id + "'] .cashout-wrapper .block_text").hide();
                    $("#wraper_history_b .stake-item[data-betid='" + id + "'] .cashout-wrapper .btn-sell-stakes").removeClass('inactive');
                }
            }
        }
    }
}

function BetslipBetsUpdateTick(json) {
    for (var id in json) {
        $("#wraper_history_b .stake-item[data-cid='" + id + "']").animate({height: 0}, function () {
            $(this).remove()
        });
    }
}

function GetScoreToUpdate(dttm) {
    var dx;
    var tmp_m = [];
    var tmp_s = [];
    var matches = [];
    var sports = [];
    $(".busket .stake-item .stake-count[data-update='1'][data-dttm='" + (dttm ? "1" : "0") + "']").each(function () {
        dx = $(this).position().top + $(this).parents(".stake-item").position().top + BHistoryCustomScrollbarTop;
        if (dx + $(this).height() > 0 && dx < $('#history_body_b').height()) {
            tmp_m['t' + $(this).attr("data-matchid")] = $(this).attr("data-matchid");
            tmp_s['t' + $(this).attr("data-matchid")] = $(this).attr("data-sport_id");
            $(this).addClass('load');
        }
    });
    //setTimeout(function(){$(".busket .stake-item .stake-count[data-update='1'][data-dttm='" + (dttm?"1":"0") + "']").removeClass('load')}, 500);
    for (key in tmp_m) {
        matches.push(tmp_m[key]);
    }
    for (key in tmp_s) {
        sports.push(tmp_s[key]);
    }
    return {'matches': matches, 'sports': sports};
}

function BetslipScoreUpdateTick(json, dttm) {
    for (var id in json) {
        $(".busket .stake-item .stake-count[data-matchid='" + id + "']").each(function () {
            if (json[id].not_line) {
                $(this).find(".result_text").text('');
                $(this).find(".see_result").show();
                $(this).attr("data-update", "1");
                $(this).attr("data-dttm", "0");
            } else {
                $(this).find(".result_text").text(json[id].text);
                if (!json[id].upd) $(this).find('.show_result').hide();
                $(this).find(".see_result").hide();
                $(this).attr("data-update", json[id].ended ? "0" : "1");
                $(this).attr("data-dttm", json[id].live ? "0" : "1");
            }
        });
    }
    DisplayHistory();
}

function BetslipScoreCompleteTick(request) {
    request = JSON.parse(request);
    request.matches.forEach(function (item, i, arr) {
        $(".busket .stake-item .stake-count[data-matchid='" + item + "']").removeClass('load');
    });
}

setInterval(function () {
    for (var i = 0; i < recover_cashout_btn_arr.length; i++) {
        $('.stake-item').each(function () {
            if (parseInt($(this).data('betid')) === parseInt(recover_cashout_btn_arr[i])) {
                $(this).find('.block_text').hide();
                $(this).find('.sell_text').show();
                $(this).find('.btn-sell-stakes').removeClass('inactive');
            }
        })
    }
    recover_cashout_btn_arr = [];
}, 5000);

function basketLog(v) {
    $.post($urlAjax, {
        'action': 'log', 'login': user_login, 'v': v
    }, function (json) {

    }, 'json');
}