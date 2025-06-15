/*
 cashout
 requried vue.min.js
 */
$().ready(function() {

    //multilanguage replace markers
    var tmp = document.getElementById('cashout-partial');
    var tmp_origin = tmp.innerText;
    var tmp_edited = tmp_origin.replace(/%a/g, '{{bet_id_text}}');
    tmp.innerHTML = tmp_edited;

    Vue.filter('format_number', function(value) {
        var i, j, kw, kd, km;
        var decimals = 2;
        var thousands_sep = ' ';
        var dec_point = '.';
        i = parseInt(value = (+value || 0).toFixed(decimals)) + "";
        if ((j = i.length)>3) j = j % 3; else j = 0;
        km = (j ? i.substr(0, j) + thousands_sep : "");
        kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
        kd = (decimals ? dec_point + Math.abs(value - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");
        if (kd==".00") kd="";
        return km + kw + kd;
    });

    /* cashout partial component */
    Vue.component('cashout-partial', {
        props: ['bet_id', 'bet_id_text', 'template'],
        data: function() {
            return {
                amount: Number,
                bet_sum: Number,
                co_real: Number,
                divider: Number,
                divider_count: Number,
                divider_step: Number,
                minimum: 1,
                slider: String,
                value: Number,
                view: String,
                result: Number,
                state: String,
                warning: false,
                coupon_el: false,
                toggled: Boolean,
                enableSell: false
            }
        },
        mounted: function() {
            if ($(this["$el"]).parents('[data-betid]').length) this.coupon_el = $(this["$el"]).parents('[data-betid]');
            this.initSlider();
            this.getCashout();
            this.toggled = false;
        },
        watch: {
            toggled: function(val) {
                if (val=='true') this.closeCoupon(); else this.openCoupon();
            }
        },
        methods: {
            closeCoupon: function() {
                var vm = this;
                if (vm.coupon_el) vm.coupon_el.find('.sell-bet-coupon-wrapper').slideUp(300, function() {
                    vm.coupon_el.siblings('[data-betid]').find('.stake-item-body').removeClass('inactive');
                    vm.state = 'cancel';
                });
            },
            openCoupon: function() {
                var vm = this;
                if (vm.coupon_el) {
                    vm.coupon_el.siblings('[data-betid]').find('.stake-item-body').addClass('inactive');
                    vm.coupon_el.find('.sell-bet-coupon-wrapper').slideDown(300);
                }
            },
            getCashout: function() {
                var vm = this;
                $.ajax({
                    type: "POST",
                    url: '/ajax_history.php',
                    data: {
                        'action': 'getcashout',
                        'id': vm.bet_id
                    },
                    success: function(response) {
                        vm.state = null;
                        if (response["status"]=='ok') {
                            $.extend(vm, response);

                            vm.view = 'process';
                            vm.value = vm.amount;
                            vm.divider_count = (vm.divider==1 ? 0 : vm.divider==10 ? 1 : 2);
                            vm.divider_step = (vm.divider==1 ? 0 : vm.divider==10 ? 0.1 : 0.01);

                            vm.slider.update({
                                from: vm.amount,
                                max: vm.amount,
                                min: vm.minimum,
                                step: vm.divider_step
                            });

                            vm.calculate();
                        } else vm.view = 'error';
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        vm.state = null;
                        vm.view = 'request_error';
                    }
                });
            },
            saveCashout: function() {
                var vm = this;
                if (!vm.enableSell) return false;
                vm.state = 'saving';
                $.ajax({
                    type: "POST",
                    async: true,
                    url: '/ajax_history.php',
                    data: {
                        'action': 'savecashout',
                        'id': vm.bet_id,
                        'amount': vm.value,
                        'full_amount': vm.amount,
                        'bet_amount': vm.bet_sum,
                        'co_real': vm.co_real
                    },
                    success: function(response) {
                        vm.state = null;
                        if (response.status == 'ok') {
                            vm.view = 'success';
                            vm.warning = false;
                            if (typeof LoadHistoryPage === 'function') {
                                $('#bets_history_wrapper').html('');
                                LoadHistoryPage(3);
                            }
                        } else if (response.status == 'error') {
                            vm.view = 'error';
                            vm.warning = false;
                        } else if (response.status == 'warning') {
                            $.extend(vm, response);
                            vm.warning = true;
                            vm.slider.update({
                                from: vm.value,
                                max: vm.amount,
                                min: vm.minimum,
                                step: vm.divider_step
                            });
                            if (vm.value>vm.amount) vm.value = vm.amount;
                            vm.calculate();
                        }
                    },
                    error: function() {
                        vm.warning = false;
                        vm.state = null;
                        vm.view = 'request_error';
                    }
                });
            },
            calculate: function() {
                /*  bet_sum: Сумма ставки
                 bet_price: Частичный кэшаут
                 co_real: Кэшаут неокругленный
                 divider_count: количество знаков после запятой */
                var bet_sum = this.bet_sum;
                var bet_price = this.value;
                var co_real = this.co_real;
                var divider = this.divider;
                var divider_count = this.divider_count;

                var result = bet_sum - (Math.ceil(bet_sum*bet_price/co_real * divider)/divider).toFixed(divider_count);
                result = result.toFixed(divider_count);

                if (Number(this.value)===this.amount) result = 0;

                this.enableSell = Number(this.value)>0;
                this.result = result;
            },
            eventKeypress: function(e) {
                var val = e.target.value;
                var val_str = val.toString();
                var key = (e.which) ? e.which : e.keyCode;
                var count = this.divider_count;
                if ( (count==0 && (key==46 || key==44))
                    || (((key!=46 && key!=44) || val.indexOf('.')!=-1)
                    && (key<48 || key>57)
                    && ((key==46 || key==44) && val.indexOf('.')>=0))
                    || key==45
                ) e.preventDefault(); else return true;
            },
            eventKeydown: function(e) {
                var val = e.target.value;
                var val_str = val.toString();
                var count = this.divider_count;
                var val_err = ((val_str.length==1 || count==0) && (val_str.indexOf('.')>=0 || val_str.indexOf(',')>=0)) ||
                    (count==0 && val_str.indexOf('0')==0);
                if (val_str.indexOf(',')) e.target.value = val_str.replace(',', '.');
                if (val_err || (val>0 && val<this.minimum)) {
                    this.value = this.minimum;
                    this.calculate();
                    this.updateSlider();
                    e.preventDefault();
                }
            },
            eventInput: function(e) {
                var val = e.target.value;
                var count = this.divider_count;
                if (val.indexOf('.')>=0) {
                    val = val.substr(0, val.indexOf('.') + count + 1);
                    this.value = val;
                }
                if (val>this.amount) this.value = this.amount;
                this.calculate();
                this.updateSlider();
                this.warning = false;
            },
            initSlider: function() {
                var vm = this;
                vm.slider = $(vm["$el"]).find('[data-role="slider"]').ionRangeSlider({
                    type: 'single',
                    step: vm.divider_step,
                    min: vm.minimum,
                    max: vm.amount,
                    from: vm.amount,
                    onChange: function() {
                        vm.value = vm.slider["result"]["from"];
                        vm.warning = false;
                        vm.calculate();
                    }
                }).data("ionRangeSlider");
            },
            updateSlider: function() {
                this.slider.update({ from: this.value });
            }
        },
        template: '#cashout-partial'
    });

    var popupCashout = new Vue({
        el: '#cashout-popup',
        data: {
            bet_id: Number,
            bet_id_text: Number,
            cashoutComponent: String,
            componentTemplate: 'popup'
        }
    });

    //элементы попапа
    var $overlay = $('#bet-history-modal-overlay');
    var $popup = $('#bet-history-modal-filter');

    var popupShow = function() {
        $popup.show();
        $overlay.show();
        $('#bet-history-modal-overlay').one('click', function(e) {
            e.preventDefault();
            popupHide();
        });
    };

    var popupHide = function() {
        $popup.hide();
        $overlay.hide();
        popupCashout["cashoutComponent"] = null;
    };

    $(document)
        .delegate('.bets_history__sell_btn', 'click', function(e) {
            e.preventDefault();
            var $item = $(this).closest('[data-betid]');
            var id = parseInt($item.attr('data-betid'), 10);
            var id_text = parseInt($item.find('.betid_js').text(), 10);
            popupCashout["cashoutComponent"] = 'cashout-partial';
            popupCashout["bet_id"] = id;
            popupCashout["bet_id_text"] = id_text;
            popupShow();
        })
        .delegate('[data-button="close"]', 'click', function(e) {
            e.preventDefault();
            popupHide();
        })
        .delegate('[data-button="coupon"]', 'click', function(e) {
            e.preventDefault();
            var $item = $(this).closest('[data-betid]');
            var $div = $item.find('.coupon-component-wrapper');
            var id = parseInt($item.attr('data-betid'), 10);
            var id_text = parseInt($item.find('.betid').text(), 10);
            $div.html('<cashout-partial v-bind:bet_id="bet_id" v-bind:bet_id_text="bet_id_text" v-bind:template="componentTemplate"></cashout-partial>');
            new Vue({
                el: $div[0],
                data: {
                    bet_id: id,
                    bet_id_text: id_text,
                    componentTemplate: 'inline'
                }
            });
        });

    $('.bets_history').on('click', '.bets_history_dropdown_arrow', function() {
        var item = $(this).parents('tr.bet_js').nextAll('.bets_history__dropdown_wrapper');
        $(this).toggleClass('opened');
        $(item[0]).find('.bet_history__dropdown__wrap').slideToggle(200);
    });

});
