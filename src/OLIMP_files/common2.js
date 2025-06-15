var normal_ok = 1;
var mt_or_video;
var mt_tracker_collapsed_open = 'true';
var mobile_orientation;
var swiped = 'none';
var move_start;
var move_start_y;
var move_end;
var move_end_y;
var isMobileDevice = false;
var scrollOnce = true;
var mobile_orientation = 'none';
var resize_block;
var resizeTimeout;
var resizeTracker = false;
var activeMatchForPlugins = 0;
var active_type=1;
var playerWidthToHeightRatio = {'PROGNOZ_ONLINE':1.78, 'IMG':  1.777, 'BRADAR': 1.777, 'YOUTUBE': 1.799, 'SPORTLEVEL': 1.799, 'SPORTBOOM': 1.777, 'UNAS': 1.799, 'PERFORM': 1.777, 'BETCONSTRACT': 1.777};
var isMobileDevice = false;

window.mobileAndTabletCheck = function() {
    check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};
isMobileDevice = window.mobileAndTabletCheck();
if(isMobileDevice){
    $(document).ready(function () {
        document.addEventListener('touchmove', function (event) {
            if (event.scale !== 1 && typeof event.scale !='undefined') {
                event.preventDefault();
            }
        }, false);
    });

    function hide_bottom_menu() {
        $('.productBottomMenu').addClass("hide-menu");
    }

    function show_bottom_menu() {
        $('.productBottomMenu').removeClass("hide-menu");
    }

    const delegate = (selector) => (cb) => (e) => e.target.matches(selector) && cb(e);

    const inputPass = delegate('input[type="password"]');

    document.addEventListener('focusin', inputPass((el) =>hide_bottom_menu()));

    document.addEventListener('focusout', inputPass((el) => show_bottom_menu()));

    const inputText = delegate('input[type="text"]');

    document.addEventListener('focusin', inputText((el) =>hide_bottom_menu()));

    document.addEventListener('focusout', inputText((el) => show_bottom_menu()));

    const inputNumbers= delegate('input[type="number"]');

    document.addEventListener('focusin', inputNumbers((el) =>hide_bottom_menu()));

    document.addEventListener('focusout', inputNumbers((el) =>  show_bottom_menu()));
}


if(typeof getCookie === 'undefined') {
    function getCookie(name) {
        var cookie = " " + document.cookie;
        var search = " " + name + "=";
        var setStr = null;
        var offset = 0;
        var end = 0;
        if (cookie.length > 0) {
            offset = cookie.indexOf(search);
            if (offset !== -1) {
                offset += search.length;
                end = cookie.indexOf(";", offset);
                if (end === -1) {
                    end = cookie.length;
                }
                setStr = unescape(cookie.substring(offset, end));
            }
        }
        return (setStr);
    }
}
function run_basket_tick() {
    DisplayBasket(1, '');
}
function ajaxFunction() {
    var ajaxRequest;
    try {
        ajaxRequest = new XMLHttpRequest();
    } catch (e) {
        try {
            ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                // browser does not support
                //alert("Browser does not support Ajax requests!");
                return false;
            }
        }
    }
    return ajaxRequest;
}
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

//Draw Clock
var time_cnt = 0,
    curr_tstamp = 0;

function wr_hours(offset) {
    offset = offset * 1000;
    var tm = new Date(offset + time_cnt * 1000);
    var z_offset = tm.getTimezoneOffset() + 360;
    var time = new Date(offset + time_cnt * 1000 + z_offset * 60000);
    curr_tstamp = time;
    var time_year = time.getFullYear();
    var time_month = time.getMonth() + 1;
    var time_day = time.getDate();
    var time_sec = time.getSeconds();
    var time_min = time.getMinutes();
    var time_hours = time.getHours();
    var time_wr = ((time_day < 10) ? "0" : "") + time_day;
    time_wr += ".";
    time_wr += ((time_month < 10) ? "0" : "") + time_month;
    time_wr += ".";
    time_wr += time_year;
    time_wr += " ";
    time_wr += ((time_hours < 10) ? "0" : "") + time_hours;
    time_wr += ":";
    time_wr += ((time_min < 10) ? "0" : "") + time_min;
    time_wr += ":";
    time_wr += ((time_sec < 10) ? "0" : "") + time_sec;
    document.getElementById("hours").innerHTML = time_wr;
    time_cnt++;
}

function wr_hours2(offset, fname) {
    offset = offset * 1000;
    var tm = new Date(offset + time_cnt * 1000);
    var z_offset = tm.getTimezoneOffset() + 360;
    var time = new Date(offset + time_cnt * 1000 + z_offset * 60000);
    curr_tstamp = time;
    var time_year = time.getFullYear();
    var time_month = time.getMonth() + 1;
    var time_day = time.getDate();
    var time_sec = time.getSeconds();
    var time_min = time.getMinutes();
    var time_hours = time.getHours();
    var time_wr = ((time_day < 10) ? "0" : "") + time_day;
    time_wr += ".";
    time_wr += ((time_month < 10) ? "0" : "") + time_month;
    time_wr += ".";
    time_wr += time_year;
    time_wr += " ";
    time_wr += ((time_hours < 10) ? "0" : "") + time_hours;
    time_wr += ":";
    time_wr += ((time_min < 10) ? "0" : "") + time_min;
    time_wr += ":";
    time_wr += ((time_sec < 10) ? "0" : "") + time_sec;
    document.getElementById(fname).innerHTML = time_wr;
    time_cnt++;
}

function wr_hours3(offset, cont1, cont2) {
    offset = offset * 1000;
    var tm = new Date(offset + time_cnt * 1000),
        z_offset = tm.getTimezoneOffset() + 360,
        time = new Date(offset + time_cnt * 1000 + z_offset * 60000),
        time_year = time.getFullYear(),
        time_month = time.getMonth() + 1,
        time_day = time.getDate(),
        time_sec = time.getSeconds(),
        time_min = time.getMinutes(),
        time_hours = time.getHours(),
        date_wr = ''
    time_wr = '';

    curr_tstamp = time;

    date_wr = (time_day < 10 ? '0' : '') + time_day;
    date_wr += '.';
    date_wr += (time_month < 10 ? '0' : '') + time_month;
    date_wr += '.';
    date_wr += time_year;

    time_wr = (time_hours < 10 ? '0' : '') + time_hours;
    time_wr += ':';
    time_wr += (time_min < 10 ? '0' : '') + time_min;
    time_wr += ':';
    time_wr += (time_sec < 10 ? '0' : '') + time_sec;

    if (cont1)
        if (document.getElementById(cont1).innerHTML != date_wr)
            document.getElementById(cont1).innerHTML = date_wr;

    if (cont2)
        document.getElementById(cont2).innerHTML = time_wr;

    time_cnt++;
}

//Reload Page
function rload(url) {
    if (!document.getElementById("refresh").checked) return;
    window.location = url;
}


function rc(el, match, sel, forced) {
    obj = document.forms['BetLine'].elements[el.name];
    for (var i = 0; i < obj.length; i++)
        if (obj[i].value != el.value) obj[i].c = false;
    if (el.c || (typeof(el.c) == "undefined" && forced)) el.c = el.checked = false;
    else el.c = true;
    //console.log(sel);
    sel = sel.toString();
    var res = sel.split(":");
    if (res.length > 2) {
        res.splice(0, 1);
        sel = res.join(':');
    }
    document.cookie = "b" + match + "=" + ((!el.c) ? "0" : sel) + ";";
    if (typeof upd_basket == 'function') upd_basket(document.forms['BetLine'].currpage.value);
}
/*
 function ShowAddons(id, cnt)
 {
 if(cnt<=0 || cnt>120 || cnt==undefined) cnt=120;
 for(i=0; i<=cnt; i++)
 {
 var addon=document.getElementById('r'+id+'_'+i);
 if(!addon) continue;
 if(addon.style.display=='none')
 {
 addon.style.display='';
 document.getElementById('t'+id+'_1').innerHTML=hide_addon;
 document.getElementById('t'+id+'_2').innerHTML=hide_addon;
 document.cookie="t"+id+"=0;";
 }else{
 addon.style.display='none';
 document.getElementById('t'+id+'_1').innerHTML=show_addon;
 document.getElementById('t'+id+'_2').innerHTML=show_addon;
 document.cookie="t"+id+"=1;";
 }
 }
 }
 */
function setCookieD(name, value, options) {
    options = options || {};
    var expires = options.expires;
    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }
    value = encodeURIComponent(value);
    var updatedCookie = name + "=" + value;
    for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }
    document.cookie = updatedCookie;
}

function ShowAddons(id, cnt) {
    var t = getCookie('t' + id);
    if (t == 0 || t == null) {
        $('#t' + id + '_1').text(show_addon);
        $('#t' + id + '_2').text(show_addon);
        setCookieD("t" + id, '1', {expires: 3600 * 24 * 365});
        $('div[data-champ=' + id + ']').each(function () {
            var match_id = $(this).data('match-id');
            $('#i' + match_id).attr('src', '/img/plus.jpg');
            setCookieD("HM" + match_id, 'hide', {expires: 3600 * 24 * 365});
            $('div[data-match-id-show=' + match_id + ']').hide();
        });
    }
    else {
        $('#t' + id + '_1').text(hide_addon);
        $('#t' + id + '_2').text(hide_addon);
        setCookieD("t" + id, '0', {expires: 3600 * 24 * 365});
        $('div[data-champ=' + id + ']').each(function () {
            var match_id = $(this).data('match-id');
            $('#i' + match_id).attr('src', '/img/minus.jpg');
            setCookieD("HM" + match_id, 'show', {expires: 3600 * 24 * 365});
            $('div[data-match-id-show=' + match_id + ']').show();
        });
    }
    var ch = 0, cs = 0;
    $('.show_all_odds').each(function () {
        var champ_id = $(this).data('champ_id');
        if (getCookie('t' + champ_id) == 1) ch++;
        else cs++;
    });
    if (ch > 0 && cs == 0) {
        $('.showhideAll').text(show_all_addon);
        setCookieD("ALLSHOW", 'hide', {expires: 3600 * 24 * 365});
    }
    else if (cs > 0 && ch == 0) {
        $('.showhideAll').text(hide_all_addon);
        setCookieD("ALLSHOW", 'show', {expires: 3600 * 24 * 365});
    }
}

//AJAX pool
function AJAXInteraction(url, callback) {

    var req = init();
    req.onreadystatechange = processRequest;

    function init() {
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            return new ActiveXObject("Microsoft.XMLHTTP");
        }
    }

    function processRequest() {
        if (req.readyState == 4) {
            if (req.status == 200) {
                if (callback) callback(req.responseText);
            }
        }
    }

    this.doGet = function () {
        req.open("GET", url, true);
        req.send(null);
    }

    this.doPost = function (body) {
        req.open("POST", url, true);
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        req.send(body);
    }
}

//Get Odd
function getBBCodeOdd(val) {
    var ai = new AJAXInteraction("ajax_index.php?page=getBBOdd&event=" + val,
        function (str) {
            if (str.indexOf('.') != -1 && str.indexOf(':') != -1) {
                var id = str.substring(0, str.indexOf(':'));
                var koef = str.substring(str.indexOf(':') + 1, str.indexOf(';'));
                var lid = str.substring(str.indexOf(';') + 1, str.lenth);
                if (koef.indexOf('n/a') == -1) {
                    $('.match-koefs[data-id="' + id + '"]').html('<a href="index.php?page=line&addons=1&action=2&id=' + lid + '" target=_blank>' + koef + '</a>');
                }
            }
        }
    );
    ai.doPost();
}
function getBBCodeOddNotUrl(val) {
    var $this = $('span[data-legacy="' + val + '"]');
    $.ajax({
        'url': 'ajax_index.php',
        'type': 'GET',
        'data': {
            'page': 'getBBOddJson',
            'event': val
        }
    }).done(function (data) {
        if($this.length > 1) {
            $this.each(function () {
                var that = $(this);
                if (data.koef != null) {
                    that.data({'v1': data.value1});
                    that.data({'v2': data.value2});
                    that.data({'v3': data.value3});
                    that.data({'match': data.matchid});
                    that.html('<b class="value_js">' + data.koef + '</b>').addClass('active');
                } else {
                    that.find('script').remove();
                    var txt = that.text();
                    that.after($('<span/>', {'text': txt, 'class': 'match-koefs'}));
                    that.remove();
                }
            });
        } else {
            if (data.koef != null) {
                $this.data({'v1': data.value1});
                $this.data({'v2': data.value2});
                $this.data({'v3': data.value3});
                $this.data({'match': data.matchid});
                $this.html('<b class="value_js">' + data.koef + '</b>').addClass('active');
            } else {
                $this.find('script').remove();
                var txt = $this.text();
                $this.after($('<span/>', {'text': txt, 'class': 'match-koefs'}));
                $this.remove();
            }
        }
    });
}


function getBBCodeOddNotUrlReview(val) {
    var $this = $('span[data-legacy="' + val + '"]');
    var $legacy = val;
        $.ajax({
            'url': 'ajax_index.php',
            'type': 'GET',
            'data': {
                'page': 'getBBOddJsonReview',
                'event': val
            }
        }).done(function (data) {
            if (data.koef != null) {
                pick_from = $legacy.split('.')[1];
                $this.data({'v1': data.value1});
                $this.data({'v2': data.value2});
                $this.data({'v3': data.value3});
                $this.data({'match': data.matchid});
                if (data.event_type == 1) data.koef = data.value1;
                if (data.event_type == 2) data.koef = data.value2;
                if (data.event_type == 3) data.koef = (pick_from == 2 ? data.value2 : data.value3);
                if (data.event_type == 4) data.koef = (pick_from == 2 ? data.value2 : data.value3);
                if (data.event_type == 6) data.koef = data.value2;
                $this.html('<b class="value_js">' + data.koef + '</b>').addClass('active');
            } else {
                $this.find('script').remove();
                var txt = $this.first().text();
                $this.after($('<span/>', {'text': txt, 'class': 'match-koefs'}));
                $this.remove();
            }
        });
}





function calculate_player_height() {
    if (readCookie('currentplayer') == null) {
        return {'width': '100%', 'height': '250px', 'noplayer': true};
    } else {
        if ((window.innerWidth / window.innerHeight).toFixed(2) > playerWidthToHeightRatio[readCookie('currentplayer')]) {
            return {
                'width': Math.ceil(window.innerHeight * playerWidthToHeightRatio[readCookie('currentplayer')]) + 'px',
                'height': parseFloat(window.innerHeight) + 'px',
                'noplayer': false
            }
        } else {
            return {
                'width': window.innerWidth + 'px',
                'height': Math.ceil(window.innerWidth / playerWidthToHeightRatio[readCookie('currentplayer')]) + 'px',
                'noplayer': false
            }
        }
    }
}

function fit_match_list(evtype,callback) {
    if (mt_or_video == 1) {
        if (window.innerWidth >= 600) {
            trackerSize = 415;
        } else if (window.innerWidth < 600) {
            trackerSize = 270;
        }
        if (parseFloat($('.top_fixed').css('top')) == 0 && $('body').hasClass('fixedVideo')) {
            $('#list_all_match').css({'margin-top': 0, 'padding-top': (($('body').hasClass('mobile_ui_ux') ? $('.top_fixed').height() : 62) + trackerSize - 14) + 'px'});
        } else if (parseFloat($('.top_fixed').css('top')) != 0 && $('body').hasClass('fixedVideo')) {
            $('#list_all_match').css({'margin-top': 0, 'padding-top': (trackerSize - 14) + 'px'});
        }
        if (parseFloat($('.top_fixed').css('top')) != 0 && !$('body').hasClass('fixedVideo')) {
            $('#list_all_match').css({'margin-top': 0, 'padding-top': '0'});
        } else if (parseFloat($('.top_fixed').css('top')) == 0 && !$('body').hasClass('fixedVideo')) {
            $('#list_all_match').css({'margin-top': 0, 'padding-top': '0'});
        }
    } else if (mt_or_video == 2) {

     //   playerSize = calculate_player_height();
        minus=(evtype=='chain' || evtype =='load' || typeof evtype == 'undefined' ? ($('body').hasClass('mobile_ui_ux') ? $('.top_fixed').height() : 62) : 0);

        if (parseFloat($('.top_fixed').css('top')) == 0 && $('body').hasClass('fixedVideo')) {
            $('#list_all_match').css({'margin-top': 0, 'padding-top': (parseFloat($('.video-section:visible').height()))});
        } else if (parseFloat($('.top_fixed').css('top')) != 0 && $('body').hasClass('fixedVideo')) {
            $('#list_all_match').css({'margin-top': 0, 'padding-top': (parseFloat($('.video-section:visible').height()))});
        }
        if (parseFloat($('.top_fixed').css('top')) != 0 && !$('body').hasClass('fixedVideo')) {
            $('#list_all_match').css({'margin-top': 0, 'padding-top': '0'});
        } else if (parseFloat($('.top_fixed').css('top')) == 0 && !$('body').hasClass('fixedVideo')) {
            $('#list_all_match').css({'margin-top': 0, 'padding-top': '0'});
        }
    } else {
        if (parseFloat($('.top_fixed').css('top')) != 0 && !$('body').hasClass('fixedVideo')) {
            $('#list_all_match').css({'margin-top': 0, 'padding-top': '0'});
        } else if (parseFloat($('.top_fixed').css('top')) == 0 && !$('body').hasClass('fixedVideo')) {
            $('#list_all_match').css({'margin-top': 0, 'padding-top': '0'});
        }
    }
    try {
        if (evtype == 'load') {
            callback(evtype);
        }
    } catch (e) {

    }
}

function portrait() {
    if (window.innerHeight > window.innerWidth) {
        mobile_orientation = 'portrait';
        $('.basketVidget').removeClass('hide');
        $('#footer').removeClass('hide');
        $('body').removeClass('overflow');
        $('.chainWrap').show();
        $('.video-section[data-id="' + activeMatchForPlugins + '"]').addClass('offset');
        $('.video-section[data-id="' + activeMatchForPlugins + '"]').removeClass('hidepanel');
        $('.video-section[data-id="' + activeMatchForPlugins + '"]').removeClass('stick');
        fit_match_list();

    }
}

function landscape() {
    if (window.innerHeight < window.innerWidth) {
        mobile_orientation = 'landscape';
        $('.basketVidget').addClass('hide');
        $('body').removeClass('fixedVideo');
        $('footer').removeClass('hide');
        $('.chainWrap').hide();
        $('.video-section[data-id="' + activeMatchForPlugins + '"]').removeClass('hidepanel');
     //   $('.video-section[data-id="' + activeMatchForPlugins + '"]').addClass('hidepanel');
        fit_match_list();

    }
}

window.addEventListener("orientationchange", function (e) {
    if (typeof window.orientation != 'undefined') {
        resize_block = false;
    }

}, false);

function stick_video_on_request(open) {
    if ((window.innerHeight < window.innerWidth) && (mt_or_video == 2 || window.location.hash == '#liveType1')) {
        $('.basketVidget').addClass('hide');
        $('#footer').addClass('hide');
        $('.video-section[data-id="' + activeMatchForPlugins + '"]').addClass('hidepanel');
        fit_match_list();
        if (open) openvideo(activeMatchForPlugins, true);
        if ($('body').hasClass('fixedVideo') == false) {
            $(".chain-ico[data-id='" + activeMatchForPlugins + "'] ").trigger('click');
        }
        $('.fixedVideo .video-section[data-id="' + activeMatchForPlugins + '"]').addClass('black');
        mobile_orientation = 'landscape';
    }
}

$(document).ready(function () {
    resize_block = window.innerHeight >= window.innerWidth;
    stick_video_on_request();
    if (readCookie('open_video_after_login') > 0) {
        $.ajax({
            type: "GET",
            url: '/ajax_index.php?page=user_info',
            success: function (data) {
                if (data > 0) {
                    openvideobr(readCookie('open_video_after_login'), 1);
                    setCookieD('open_video_after_login', 0);
                }
            },
            dataType: 'html'
        });
    }
});
if (readCookie('olimp_tv') == '1') {
    $.ajax({
        type: "GET",
        url: '/ajax_index.php?page=user_info',
        success: function (data) {
            if (data > 0) {
                setCookieD('olimp_tv', '0',{expires:900});
                window.location.href='index.php?page=olimp_tv#'+readCookie('current_translation');
            }
        },
        dataType: 'html'
    });
}
if (readCookie('live_match_open') == '1') {
    $.ajax({
        type: "GET",
        url: '/ajax_index.php?page=user_info',
        success: function (data) {
            if (data > 0) {
                setCookieD('live_match_open', '0',{expires:900});
                window.location.href='/mobile/index.php?page=line&addons=1&action=2&live[]='+readCookie('live_match_to_open')+'#liveType1';
            }
        },
        dataType: 'html'
    });
}
function doOnOrientationChange() {
    if (mt_or_video == 2) {
        switch (window.orientation) {
            case -90:
            setTimeout(change_video_height,500);
                break;
            case 90:
                setTimeout(change_video_height,500);
                break;
            case 0:
                setTimeout(change_video_height,500);
                break;
            default:
                setTimeout(change_video_height,500);
                break;
        }
    }
}
function change_video_height() {
    $('#liveplayer').css('height', window.innerWidth / playerWidthToHeightRatio[readCookie('currentplayer')] + 'px');
}
window.addEventListener('orientationchange', doOnOrientationChange);

$(window).on('resize', function (e) {
    if (mt_or_video == 2) {

        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function () {
            if (window.innerHeight < window.innerWidth) {
                landscape();
                resize_block = false;
            } else {
                if (!resize_block) portrait();
                resize_block = true;
            }
        }, 150);
    } else if ($('.viewType2').hasClass('active')) {
        mt_or_video = 1;
        if (window.innerHeight < window.innerWidth) {
            if (!resize_block) $('.liveType2[data-id="' + activeMatchForPlugins + '"]').trigger('click');
            resize_block = true;
        }
        else {
            if (!resize_block) $('.liveType2[data-id="' + activeMatchForPlugins + '"]').trigger('click');
            resize_block = true;
        }
    }
});
$(window).on('scroll load', function (e) {
    if ((mt_or_video == 1 || mt_or_video == 2) && typeof mt_or_video != 'undefined') {
        $('.video-section[data-id="' + activeMatchForPlugins + '"]').show();
        menu_scrolled=window.pageYOffset ;
        $('.top_fixed').css('top', menu_scrolled * -1);
        if(menu_scrolled  <= ($('body').hasClass('mobile_ui_ux') ? $('.top_fixed').height()+ 28 : 62 + 28)){
            $('.video-section.activeType'+active_type).css('top',($('body').hasClass('mobile_ui_ux') ? $('.top_fixed').height() + 28 : 62 + 28) - menu_scrolled);
        }else{
            $('.video-section.activeType'+active_type).css('top',0);
        }
        if ($(window).scrollTop() >= ($('body').hasClass('mobile_ui_ux') ? $('.top_fixed').height() + 28 : 62 + 28)) {
            if (e.type == 'scroll' && readCookie('chainlock'+activeMatchForPlugins) == 'lock') {
                if (mt_or_video == 1) {
                    $('.video-section[data-id="' + activeMatchForPlugins + '"]').addClass('stick');
                    $('.video-section[data-id="' + activeMatchForPlugins + '"]').removeClass('offset');
                } else {
                    $('.video-section[data-id="' + activeMatchForPlugins + '"]').addClass('stick');
                    $('.video-section[data-id="' + activeMatchForPlugins + '"]').removeClass('offset');
                }
            }
        } else {
            $('.video-section[data-id="' + activeMatchForPlugins + '"]').removeClass('stick');
        }
        fit_match_list(e.type,imitate_scroll(e.type));
    }
});
function imitate_scroll(evtype) {
   if (evtype == 'load') {
        $(window).scrollTop(100);
        $(window).scrollTop(0);
    }
}
function call_video_on_ip_change() {
    if (getCookie('hash_changed') == 1 && mt_or_video == 2) {
        $('.liveType1').click();
    }
}
var clearInt = function (myInterval) {
    clearInterval(myInterval);
};
$(document).ready(function () {
    $('.app-banner').click(function () {
        $(window).scroll();
    });
    if (window.location.hash == '#liveType2') {
        activeMatchForPlugins=$('.viewType2').data('id');
        mt_or_video = 1;
        $('.viewType2').trigger('click');
        $('body').removeClass('fixedVideo');
        lock_video_section();
        $('.chainWrap').hide();
    } else if (window.location.hash == '#liveType1') {
        activeMatchForPlugins=$('.viewType1').data('video-id');
        mt_or_video = 2;
        $('.viewType1').trigger('click');
        lock_video_section();
    }
    $(document).delegate('.chain-ico', 'touchstart', function () {
        if (mt_or_video == 2) {
            $('body').toggleClass("fixedVideo");
        }
        if ($('body').hasClass('fixedVideo')) {
            height_of_block = 'video-section';
            if (mt_or_video == 1) {
                $('.video-section[data-id="' + activeMatchForPlugins + '"]').addClass('stick');
                setCookieD('chainlock'+activeMatchForPlugins, 'unlock', {'expires': 86400 * 7});
            } else {
                $('.video-section[data-id="' + activeMatchForPlugins + '"]').addClass('stick');
                setCookieD('chainlock'+activeMatchForPlugins, 'lock', {'expires': 86400 * 7});
            }
        } else {
            $('.video-overlay-black').removeClass('active');
            $('body').removeClass('overflow');
            setCookieD('chainlock'+activeMatchForPlugins, 'unlock', {'expires': 86400 * 7});
            $('#list_all_match').css('paddingTop',parseFloat($('#list_all_match').css('paddingTop'))-($('body').hasClass('mobile_ui_ux') ? $('.top_fixed').height()  + 26 : 62 + 26));
        }
        fit_match_list('chain');
    }).delegate('#close_mt_video,.closeVideo', 'click touchstart', function () {
        $('.wc-buttons-live-page').removeClass('wc-buttons-mutate');
        $('body').removeClass('wc-remove-offset');
        mt_or_video = '';
        $('.video-section').hide();
        window.location.hash = '';
        delete mt_or_video;
        $('.iframe_place_video,.iframe_place_mt').empty();
        $('.iframe_place_video').attr('style','min-height:0px;');
        $('.top_fixed').css('top', 0);
        $('.video-section[data-id="' + activeMatchForPlugins + '"]').slideToggle(0);
        $('.video-section[data-id="' + activeMatchForPlugins + '"]').removeClass("activeType1");
        $('.video-section[data-id="' + activeMatchForPlugins + '"]').removeClass("activeType2");
        $('.video-overlay-black').removeClass('active');
        $('body').removeClass('overflow fixedVideo');
        $('.video-section[data-id="' + activeMatchForPlugins + '"]').addClass('offset');
        if(!$(this).hasClass('no_hide')) {
              $('.controlsLine[data-id="' + activeMatchForPlugins + '"]').hide();
        }
        $('.mobile-broadcast-match-dropdown').hide();
        if($('.mobile-broadcast-accordion-item').length > 0 ){
            $('.mobile-broadcast-accordion-item').removeClass('active-broadcast');
        }
        fit_match_list();
    }).delegate('.video-broadcast-slider .item', 'click', function () {
        if ($(this).hasClass('activeSport')) {
            $(this).removeClass('activeSport');
            $('.mobile-broadcast-match-dropdown').hide();
        } else {
            $('.video-broadcast-slider .item').removeClass('activeSport');
            $(this).addClass('activeSport');
            $('.mobile-broadcast-match-dropdown').show();
        }
    });

});
var lock_video_section = function () {
    $('.controlsLine[data-id="' + activeMatchForPlugins + '"]').show();
    if (readCookie('chainlock'+activeMatchForPlugins) == 'lock' ||  readCookie('chainlock'+activeMatchForPlugins) == null) {
        if (mt_or_video != 1) {
            $('body').addClass('fixedVideo');
            $('.video-section[data-id="' + activeMatchForPlugins + '"]').addClass('stick');
            scrollOnce = false;
            var wait_for_video1 = setInterval(function () {
                (mt_or_video == 1) ? height_of_block = 'betradar_mobile' : height_of_block = 'video_widget_mobile';
                if (parseFloat($('#' + height_of_block + '').height()) > 0 && scrollOnce == false) {
                    fit_match_list();
                    scrollOnce = true;
                    clearInt(wait_for_video1);
                }
            }, 100);
        } else {
            var wait_for_video2 = setInterval(function () {
                (mt_or_video == 1) ? height_of_block = 'betradar_mobile' : height_of_block = 'video_widget_mobile';
                if (parseFloat($('#' + height_of_block + '').height()) > 0 && scrollOnce == false) {
                    fit_match_list();
                    scrollOnce = true;
                    clearInt(wait_for_video2);
                }
            }, 100);
        }
    }
    $(window).scrollTop($(window).scrollTop() + 1);
};
function addListenerMulti(element, eventNames, listener) {
    var events = eventNames.split(' ');
    for (var i=0, iLen=events.length; i<iLen; i++) {
        element.addEventListener(events[i], listener, false);
    }
}
function wc18_prognoz_video(id,isMobile) {
    $('.wc-buttons-live-page').addClass('wc-buttons-mutate');
    $('body').addClass('wc-remove-offset');
    $('.iframe_place_video').attr('style','min-height:140px;    background: url(/mobile/img/mobile-min.jpg) no-repeat;background-size:cover;');
    setCookieD('currentplayer','PROGNOZ_ONLINE');
    activeMatchForPlugins = id;
    active_type=3;
    if (isMobile) {
        if ( readCookie('chainlock'+activeMatchForPlugins) == null) {
            setCookieD('chainlock'+activeMatchForPlugins, 'lock');
        }
        $('.viewType3').addClass('active');
        $('.chainWrap').show();
        $('.video-section').hide();
        $('.iframe_place_video,.iframe_place_mt').empty();
        mt_or_video = 2;
        stick_video_on_request();
        if ($('.iframe_place_video').is(':empty')) {
            data = '<video id="liveplayer"   autoplay autoplay="true" webkit-playsinline playsinline preload="metadata" controls style="width:100%"> <source src="https://wowzaprod175-i.akamaihd.net/hls/live/669059/ee442ffd/playlist.m3u8" type="application/x-mpegURL"></video>';
            $('.iframe_place_video').empty();
                videoblock = $('<div/>', {
                    'width': '100%',
                    'id': 'video_widget_mobile',
                    'data-id':activeMatchForPlugins,
                });
                videoblock.html(data).promise().done(function(){
                    videoblock.appendTo('.iframe_place_video');
                    $('.iframe_place_mt').hide();
                    $('.iframe_place_video,.video-section').show();
                    $('.video-section').addClass('activeType3');
                    $('.video-section').removeClass('activeType1');
                    $('.video-section').removeClass('activeType2');
                    $('.iframe_place_mt[data-id="' + activeMatchForPlugins + '"]').hide();
                    $('.iframe_place_video[data-id="' + activeMatchForPlugins + '"]').show();
                    $('.video-section[data-id="' + activeMatchForPlugins + '"]').addClass('activeType3');
                    $('.video-section[data-id="' + activeMatchForPlugins + '"]').removeClass('activeType2');
                    $('.video-section[data-id="' + activeMatchForPlugins + '"]').removeClass('activeType1');
                    if (readCookie('chainlock'+activeMatchForPlugins) == 'unlock') {
                        window.scrollTo(0, 0);
                    }
                    lock_video_section();
                    fit_match_list();
                });
        }
    }
}

function openvideo(id, isMobile) {
    $.ajax({
        type: "GET",
        url: '/ajax_index.php?page=user_info',
        success: function (data) {
            if (data <= 0) {
                setCookieD('live_match_open', '1',{expires:900});
                setCookieD('live_match_to_open', id,{expires:900});
            }
        },
        dataType: 'html'
    });
    $('.viewTypes').removeClass('active');
    $('.iframe_place_video').attr('style','min-height:140px;');
    activeMatchForPlugins = id;
    active_type=1;
    if (isMobile) {
        if ( readCookie('chainlock'+activeMatchForPlugins) == null) {
            setCookieD('chainlock'+activeMatchForPlugins, 'lock');
        }
        $('.wc-buttons-live-page').addClass('wc-buttons-mutate');
        $('body').addClass('wc-remove-offset');
        $('.chainWrap').show();
        $('.video-section').hide();
        $('.iframe_place_video,.iframe_place_mt').empty();
        mt_or_video = 2;
        stick_video_on_request();
        if ($('.iframe_place_video').is(':empty')) {
            $.ajax({
                'url': '/mobile/ajax_index.php',
                'type': 'GET',
                'data': {
                    'page': 'video',
                    'id': id,
                    'nocover':'1',
                    'is_expanded':'1',
                    'width': parseFloat(window.innerWidth),
                    'mobileorientation':mobile_orientation,
                    'height':'100%',

                }
            }).done(function(data){
                    $('.iframe_place_video').empty();
                videoblock = $('<div/>', {
                    'width': '100%',
                    'id': 'video_widget_mobile',
                    'data-id':activeMatchForPlugins,
                });
                play_button=$('<button/>',{
                    'style':'position:fixed;left:-10000px;',
                    'id':'run_video_stream',

                });
                videoblock.html(data).promise().done(function(){
                    play_button.appendTo(videoblock);
                    // videoblock.appendTo('.iframe_place_video');
                    $('.iframe_place_mt').hide();
                    $('.iframe_place_video').hide().empty();
                    $('.video-section').addClass('activeType1');
                    $('.video-section').removeClass('activeType2');
                    $('.iframe_place_mt[data-id="' + activeMatchForPlugins + '"]').hide();
                    videoblock.appendTo('.iframe_place_video[data-id="' + activeMatchForPlugins + '"]');
                    $('.iframe_place_video[data-id="' + activeMatchForPlugins + '"]').show();
                    $('.video-section[data-id="' + activeMatchForPlugins + '"]').addClass('activeType1');
                    $('.video-section[data-id="' + activeMatchForPlugins + '"]').removeClass('activeType2');
                    if (readCookie('chainlock'+activeMatchForPlugins) == 'unlock') {
                        window.scrollTo(0, 0);
                    }
                    if ($('#liveplayer').length > 0) {
                        addListenerMulti(document.getElementById('liveplayer'), 'loadedmetadata loadeddata canplaythrough canplay',function(){
                            lock_video_section();
                            fit_match_list();
                        });
                        $('#liveplayer').css('height', window.innerWidth / playerWidthToHeightRatio[readCookie('currentplayer')] + 'px');
                    }
                    lock_video_section();
                    fit_match_list();
                });

            });
        }
    } else {
        var attr = "width=750,height=478,menubar=0,toolbar=0,directories=0,status=1,location=0,resizable=0,scrollbars=0";
        var new_wind = window.open('index.php?page=video&&width=' + parseFloat(window.innerWidth) + '&height=' + parseFloat(window.innerHeight) + '&id=' + id, attr);
    }

}

function openmt(id, sport, live, lang) {
    if (sport == 'undefined') sport = 0;
    var width = 700;
    var height = 600;
    switch (sport) {
        case 0:
            width = 648;
            height = 455;
            break;
        case 1:
            width = 648;
            height = 475;
            break;
        case 2:
            width = 820;
            height = 575;
            break;
        case 3:
            width = 930;
            height = 440;
            break;
        default:
            width = 648;
            height = 455;
            break;
    }
    if (live) {
        var attr = "width=" + width + ",height=" + height + ",menubar=0,toolbar=0,directories=0,status=1,location=0,resizable=0,scrollbars=0";
        var new_wind = window.open("/index.php?page=mt&id=" + id + "&sport=" + sport, "", attr);
    } else {
        var attr = "width=700,height=700,menubar=0,toolbar=0,directories=0,status=1,location=0,resizable=0,scrollbars=0";
        /* var new_wind=window.open("https://stats.betradar.com/s5/?clientid=295&fragment=h2hlight&language="+lang+"&h2hmatchid="+id, "", attr); */
        var new_wind = window.open("/index.php?page=mt&id=" + id + "&nolive=1", "", attr);
    }
}

// Widget from betradar
function iframeLoaded() {
    var iFrameID = document.getElementById('betradar_mobile');
    if (iFrameID) {
        // here you can make the height, I delete it first, then I make it again
        iFrameID.height = "";
        iFrameID.height = iFrameID.contentWindow.document.body.scrollHeight + "px";
    }
}
function call_mt_collapsed_or_full(elem) {
    activeMatchForPlugins = $(elem).attr('data-id');
    $(document).trigger("changeTrackerSizeEvent", activeMatchForPlugins);
    if ($(elem).hasClass('down')) {
        mt_tracker_collapsed_open = 'false';
        $('.liveType2[data-id="' + activeMatchForPlugins + '"]').click();
        $('#betradar_mobile[data-id="' + activeMatchForPlugins + '"]').css('height', '100%');
        $('.lineArrowLink[data-id="' + activeMatchForPlugins + '"]').removeClass('down');
        $('.lineArrowLink[data-id="' + activeMatchForPlugins + '"]').addClass('up');
    } else {
        mt_tracker_collapsed_open = 'true';
        $('.liveType2[data-id="' + activeMatchForPlugins + '"]').click();
        $('#betradar_mobile[data-id="' + activeMatchForPlugins + '"]').css('height', 'auto');
        $('.lineArrowLink[data-id="' + activeMatchForPlugins + '"]').removeClass('up');
        $('.lineArrowLink[data-id="' + activeMatchForPlugins + '"]').addClass('down');
    }
}
function set_active_match(id) {
    activeMatchForPlugins = id;
}

function mtbr_window_mode(id,lang,tmz){
    var attr = "width=760,height=630,menubar=0,toolbar=0,directories=0,status=1,location=0,resizable=0,scrollbars=0";
    window.open('/index.php?page=mtbr&id=' + id + '&lang=' + lang + '&tmz=' + tmz, "", attr);
    $('#betradar_frame table').hide();
    return false;
}
function openmtbr(id, sport, live, lang, tmz, isMobile,callback) {
    callback;
    mt_or_video = 1;
    if (isMobile == '1') {
        $('.wc-buttons-live-page').addClass('wc-buttons-mutate');
        $('body').addClass('wc-remove-offset');
        $('.video-section').hide();
        if (typeof event.target.id != 'undefined') {
            if (event.target.id.length > 0) {
                activeMatchForPlugins = event.target.id;
            }
        }
        $('body').removeClass('fixedVideo');
        $('.viewTypes').removeClass('active');
        $('.chainWrap').hide();
        $('.iframe_place_video,.iframe_place_mt').empty();

        if ($('.iframe_place_mt[data-id="' + activeMatchForPlugins + '"]').is(':empty')) {
            var $iframe = $('<iframe/>', {
                src: '/widget_betradar.php?id=' + id + '&lang=' + lang + '&tmz=' + tmz + '&collapse=' + mt_tracker_collapsed_open + '&is_live_mt=1',
                'frameborder': 0,
                'scrolling': 'yes',
                'width': '100%',
                'id': 'betradar_mobile',
                'height': 'auto'
            });
            if (window.innerWidth >= 600) {
                trackerSize = 415;
            } else if (window.innerWidth < 600) {
                trackerSize = 270;
            }
            $iframe.css('min-height', trackerSize + 'px');
            $iframe.attr('data-id', activeMatchForPlugins);
            $('.iframe_place_mt[data-id="' + activeMatchForPlugins + '"]').empty();
            $('.iframe_place_mt[data-id="' + activeMatchForPlugins + '"]').css('position', 'relative');
            $('.iframe_place_mt[data-id="' + activeMatchForPlugins + '"]').html('<div onclick="call_mt_collapsed_or_full(this);"  data-id="' + activeMatchForPlugins + '"class="lineArrowLink down"></div>');
            $('.iframe_place_mt[data-id="' + activeMatchForPlugins + '"]').prepend($iframe);
            $('.video-section[data-id="' + activeMatchForPlugins + '"]').show();
            $('.iframe_place_video[data-id="' + activeMatchForPlugins + '"]').hide();
            $('.iframe_place_mt[data-id="' + activeMatchForPlugins + '"]').show();
            $('.video-section[data-id="' + activeMatchForPlugins + '"]').addClass('activeType2');
            $('.video-section[data-id="' + activeMatchForPlugins + '"]').removeClass('activeType1');
            $('.video-section[data-id="' + activeMatchForPlugins + '"]').removeClass('stick');
            $('.fixedVideo #list_all_match').css('')
            window.scrollTo(0, 0);
        }
    } else {
        if($('.col_td.right').hasClass('expanded'))
        {
            $('#betradar_frame .expand-button').attr('title', $('#betradar_frame .expand-button').data('litle-title'));
        }
        else
        {
            $('#betradar_frame .expand-button').attr('title', $('#betradar_frame .expand-button').data('big-title'));
        }
        var $iframe = $('<iframe/>', {src: 'widget_betradar.php?id=' + id + '&lang=' + lang + '&tmz=' + tmz, 'frameborder': 0, 'scrolling': 'no'});
        var link = {};
        link.text = $('#betradar_frame').data('fullurl');
        //link.url = 'https://cs-cdn001.akamaized.net/ls/widgets/?/olimplmts/' + lang + '/' + tmz + '/page/lmts#matchId=' + id;
        link.url = '/index.php?page=mtbr&id=' + id + '&lang=' + lang + '&tmz=' + tmz;
        var $link = $('<a/>', {'href': '#', text: link.text, 'target': '_blank'});
        $link.on('click', function () {
            var attr = "width=760,height=370,menubar=0,toolbar=0,directories=0,status=1,location=0,resizable=0,scrollbars=0";
            window.open(link.url, "", attr);
            return false;
        });
        $('#full_widnod_betradar_widget').attr('onclick','mtbr_window_mode('+id+',"'+lang+'","'+tmz+'")');
        if ($('#widget_betradar').length > 0 && $(".search-popup").css("display")=="none") {
            mid = $('#br_' + id).data('mid');
            $('#widget_betradar').html($iframe).append($link).append('<div class="mc-widget-title" style="font-size:13px;display:none;"><span>' + $('#match_live_name_' + mid).text() + '</span></div>');
            $link.hide();
            if (sport == 47) $iframe.css("cssText", "height:262px !important");
            $('#betradar_frame table').show();
        } else {
            $link.click();
        }
    }
}

/*
 function openvideobr(id) {
 var $iframe = $('<iframe/>',{src:'index.php?page=video&id='+id+'&nocover=1','frameborder':0,'scrolling':'no'});
 var link = {};
 link.text = $('#video_frame').data('fullurl');
 link.url = 'index.php?page=video&id='+id;
 var $link = $('<a/>',{'href':'#', text:link.text, 'target':'_blank'});
 $link.on('click', function(){
 var attr="width=750,height=600,menubar=0,toolbar=0,directories=0,status=1,location=0,resizable=0,scrollbars=0";
 window.open(link.url, "", attr);
 return false;
 });
 if ($('#widget_video').length > 0) {
 $('#widget_video').html($iframe).append($link);
 $('#video_frame table').show();
 } else {
 $link.click();
 }
 }
 */
var glob_video_id = 0;
function openvideobr(id,authed, widget_id) {
    addVideoWidget(id);

    video_widget_id = "#video-widget-"+id;

    //назначение айди виджета, если он передан в параметрах
    if(widget_id !==undefined){
        video_widget_id = widget_id;
    }

    //добавление айди видео в данные виджета
    $(video_widget_id).data("videoid", id);


    id *= 1;
    if (id > 0) glob_video_id = id;
    glob_video_id *= 1;
    var is_expanded = 0;
    if ($('.video-widget').length > 0 && $(".search-popup").css("display")=="none") {
        if(authed !== 1) {
            setCookieD('open_video_after_login', glob_video_id);
        }
            // купон включён
            if (glob_video_id == 0 && id == 0) {
                //пробежка
            }
            else {
                var $iframe = getiframe_VideoWidget(id);

                $(video_widget_id).find(".video-widget-body").html($iframe);
                $(video_widget_id).find('.video-widget-title').text($('#match_live_name_' + id).text());
                if (id > 0) $(video_widget_id).show();
            }
    }
    else {
        // купон выключен
        var attr = 'width=750,height=478,menubar=0,toolbar=0,directories=0,status=1,location=0,resizable=0,scrollbars=0';
        window.open('index.php?page=video&id=' + glob_video_id, '', attr);
    }
}

//код видео для iframe
function getiframe_VideoWidget(id) {

    if ($(' .col_td.right').hasClass('expanded')) {
        //расширенный режим на данный момент
        is_expanded = 1;
    }
    else {
        //узкий режим на данный момент
        is_expanded = 0;
    }

    var $iframe =  $('<iframe/>', {
        src: 'index.php?page=video&id=' + id + '&nocover=1&is_expanded=' + is_expanded,
        'frameborder': 0,
        'scrolling': 'no',
        'allowfullscreen':'',
        'webkitallowfullscreen':'',
        'mozallowfullscreen':'',
        'allow':'autoplay; fullscreen',
        'class':'video-widget-iframe',
        'name': 'video-stream-'+ id
    });
    return $iframe;
}

//создание нового видео виджета
function addVideoWidget(widget_id) {
    //максимальное количество виджетов
    var maxWidgets = 3;
    //айди елемента шаблона
    var template_name = "#video-widget-template";

    //проверка лимита активных виджетов
    var videowidgetids = getCookie(task_11209_widgPrefiks+"videowidgetids");
    if(videowidgetids !== undefined && videowidgetids !== null) {
        var hasid=false;

        //проверка на уникальность id виджета
        var idsplit = [];
        idsplit = videowidgetids.split("_");
        //поиск дублирующегося айди матча
        idsplit.forEach(function (el) {
            //если айди есть, то не добавлять в список
            var searchId = widget_id;
            //searchId = searchId.replace("video-widget-", "");
            if(widget_id == el){
                hasid = true;
            }
        });

        var widgetsCount = $(".video-widget").length - 1; //-1 виджет из шаблона
        //удаление первого элемента, если превышен лимит виджетов
        if (widgetsCount >= maxWidgets && hasid == false){
            var delete_id = idsplit[0];
            deleteVideoWidget("#video-widget-"+delete_id);
            idsplit.shift();
            videowidgetids = idsplit.join("_");
        }

        //защита добавления повторных матчей
        if(hasid === false){
            var idsplit = [];
            var idsplit = videowidgetids.split("_");
            idsplit.push(widget_id);
            //очистка пустого элемента
            idsplit.forEach(function(item, i, arr){
                if (item==""){
                    arr.splice(i, 1);
                }
            });
            videowidgetids = idsplit.join("_");
            setCookieD(task_11209_widgPrefiks+"videowidgetids", videowidgetids, {expires: 3600 * 5});
            dublicateTemplateWidget(template_name, widget_id);

        }

    } else {
        setCookieD(task_11209_widgPrefiks+"videowidgetids", widget_id, {expires: 3600 * 5});
        dublicateTemplateWidget(template_name, widget_id);

    }
}


//добавление видео виджета
function dublicateTemplateWidget(template_name, widget_id) {
    //получение базоваого шаблона видео виджета
    var template = "";
    // Проверка есть ли template, при отключении купона, чаще всего темплейта нет
    if ($(template_name).length == 0)
        return false;
    template = $(template_name).html();
    //замена на новый айди
    template = template.replace("video-widget-0", "video-widget-"+widget_id);
    template = template.replace("dataidreplace", widget_id);
    //добавление виджета в документ
    $(template_name).after(template);
    //добавление логики для виджета
    addLogicToVideowidgets("#video-widget-"+widget_id);
}


//удаление видео виджета
function deleteVideoWidget(widget_id){
    //получение айди матча
    var champ_id = widget_id.replace("video-widget-", "");
    $(widget_id).remove();

    //удаление айди из куки
    var cookieid = getCookie(task_11209_widgPrefiks+"videowidgetids");
    //массив
    ids = [];
    ids = cookieid.split("_");
    //удаление айди виджета из куки
    champ_id = champ_id.replace("#", "");
    if(ids.length > 0){
        ids.forEach(function (currentValue, index, array) {
            if(champ_id == currentValue){
                ids.splice(index, 1);
            }
        });
    }
    ids = ids.join("_");
    setCookieD(task_11209_widgPrefiks+"videowidgetids", ids, {expires: 3600 * 5});
}


function desktop_video_new_window(id,no_back_button) {
    (no_back_button !=1 ? no_back_button=0 : '')
    window.open('index.php?page=video&id=' + id+'&nobackbutton='+no_back_button, '', 'width=750,height=478,menubar=0,toolbar=0,directories=0,status=1,location=0,resizable=0,scrollbars=0');
}
function live_prognoz(id) {
    window.open('index.php?page=live_prognoz&id='+id,'', 'width=750,height=700,menubar=0,toolbar=0,directories=0,status=1,location=0,resizable=1,scrollbars=1');
}

/* For new header BEGIN */

var seltime_cnt = [];
function wr_hoursSelect(offset, mid, gmt, i, lan, short_mode) {

    mid = mid || 'h0';
    gmt = gmt || '+00:00'; // '00:00'

    if (!seltime_cnt[i]) {
        seltime_cnt[i] = 0;
    }

    offset = offset * 1000;
    var tm = new Date(offset + seltime_cnt[i] * 1000);
    var z_offset = tm.getTimezoneOffset() + 360;
    var time = new Date(offset + seltime_cnt[i] * 1000 + z_offset * 60000);
    curr_tstamp = time;
    var time_year = time.getFullYear();
    var time_month = time.getMonth() + 1;
    var time_day = time.getDate();
    var time_sec = time.getSeconds();
    var time_min = time.getMinutes();
    var time_hours = time.getHours();
    var time_wr = '';
    /*var time_wr=((time_day<10)?"0":"")+time_day;
     time_wr+=".";
     time_wr+=((time_month<10)?"0":"")+time_month;
     time_wr+=".";
     time_wr+=time_year;
     time_wr+=" ";*/
    time_wr += ((time_hours < 10) ? "0" : "") + time_hours;
    time_wr += ":";
    time_wr += ((time_min < 10) ? "0" : "") + time_min;
    if (lan == true) {
        time_wr += ":";
        time_wr += ((time_sec < 10) ? "0" : "") + time_sec;
    }

    time_wr += ' ';
    time_wr += '(GMT' + (gmt != '' ? ' ' + gmt : '') + ')';

    if (short_mode==1) {
        time_wr = 'GMT' + (gmt != '' ? ' ' + gmt.substr(0,3) : '');
    }

    document.getElementById(mid).innerHTML = time_wr;
    seltime_cnt[i]++;
}

function closeDropMenu(obj, father) {
    jQuery('body').click(function (event) {
        var eventInMenu = $(event.target).parents('.' + father);

        if (!eventInMenu.length)
            if ($('.' + obj).filter(':visible'))
                $('.' + obj).hide();
    });
}
//префикс для куки виджета видеотрансляций, для разделения вкладок
var curTime = new Date();
curTime = ''+curTime.getFullYear()+curTime.getMonth()+curTime.getDay()+curTime.getHours()+curTime.getMinutes()+curTime.getSeconds()+curTime.getMilliseconds();
var task_11209_widgPrefiks = curTime;

$(document).ready(function () {
    if (typeof (inputmask) === "function") $('input[name="login"]').inputmask('99999999999');
    var hash_found = (window.location.search.search('%23') != '-1');
    var regme_found = (window.location.search.search('regme') != '-1');
    var regme_delay = 0;

    if (window.location.hash == '#regme3') {
        regme_delay = 3000;
    }

    if (((window.location.hash == '#regme') || (window.location.hash == '#regme3') || (hash_found && regme_found)) && $('.exitBtn').length <= 0) {
        setTimeout(() => {
            $('#popOverlayOther').fadeIn();
            $('body').addClass('open');
            $('#popOverlayOther').html('<div style="position:absolute;left:45%;top:45%"><img width="100" src="/img/registration/progress_bar.gif"></div>');
            $.post('/ajax_index.php', {page: 'registration', action: 'get_page'},
                function (result) {
                    if (result.stat == 1) {
                        $('#popOverlayOther').html('');
                        try {
                            $('.registrationPopUp').html(result.data);
                        } catch (err) {
                            console.log(err);
                        }
                        $('.registrationPopUp').fadeIn();
                    }
                }
                , 'json');
            $('.authWindow').hide();
        }, regme_delay);
    }

    if (window.location.hash == '#pass_recovery' && $('.exitBtn').length <= 0) {
        $('.authWindow').hide();
        $('#popOverlayOther').fadeIn();
        $('body').addClass('open');
        $('#popOverlayOther').html('<div style="position:absolute;left:45%;top:45%"><img width="100" src="/img/registration/progress_bar.gif"></div>');
        $.post('/ajax_index.php', {page: 'recover', action: 'get_page'},
            function (result) {
                if (result.stat === 1) {
                    $('#popOverlayOther').html('');
                    try {
                        $('.recoverPopUp').html(result.data);
                    } catch (err) {
                        console.log(err);
                    }
                    $('.recoverPopUp').fadeIn();
                }
            }, 'json');
    }
    if (window.location.hash == '#auth' && $('.exitBtn').length <= 0) {
        $('#popOverlayOther').fadeIn();
        $('body').addClass('open');
        $('.authWindow').show();
    }
    $(window).scroll(function () {
        var left = $(this).scrollLeft();
        $('header').css('left', -left);
    });
    $('.country-item span.active').click(function () {
        $('.country-container').show();
        closeDropMenu('country-container', 'country-item');
    });
    $('.lang-item span.active').click(function () {
        $('.lang-container').show();
        closeDropMenu('lang-container', 'lang-item');
    });
    $('.lang-container div').click(function () {
        $('.lang-item > img').attr('src', $(this).find('img').attr('src'));
        $('.lang-item span.active span').text($(this).find('span').text());
        $('.lang-container div.active').removeClass('active');
        $(this).addClass('active');
        $('.lang-container').hide();
    });
    $('.country-container div').click(function () {
        $('.country-item > img').attr('src', $(this).find('img').attr('src'));
        $('.country-item span.active span').text($(this).find('span').text());
        $('.country-container div.active').removeClass('active');
        $(this).addClass('active');
        $('.country-container').hide();
    });
    $('.format-item span.active').click(function () {
        $('.format-container').show();
        closeDropMenu('format-container', 'format-item');
    });
    $('.format-container div').click(function () {
        $('.format-item > .coefficient').text($(this).find('.coefficient').text());
        $('.format-item span.active span').text($(this).find('.coefficient').next().text());
        $('.format-container div.active').removeClass('active');
        $(this).addClass('active');
        $('.format-container').hide();
    });
    $('.time-item span.active').click(function () {
        $('.time-container').show();
        closeDropMenu('time-container', 'time-item');
    });
    $('.time-container div').click(function () {
        $('.time-item span.active span').text($(this).find('span').text());
        $('.time-container div.active').removeClass('active');
        $(this).addClass('active');
        $('.time-container').hide();
    });
    $('.show-balance').on('click', function (e) {
        var $this = $(this);
        e.preventDefault();
        if (!$('header').hasClass('view-balance')) {
            $this.html($this.data('hide'));
            $('.mid-line .value-list .value').show();
            $('.balance-block .value').show();
            document.cookie = "hide_linf=1;";
        } else {
            $this.html($this.data('show'));
            $('.mid-line .value-list .value').hide();
            $('.balance-block .value').hide();
            document.cookie = "hide_linf=0;";
        }
        $(this).parents('header').toggleClass('view-balance');
    });
    /*мигание кнопки*/
    /*setInterval(function () {
        $('.registration-link').toggleClass('lightBtn')
    }, 1000);*/
    /*показывание баланса*/
    $('#dropdownMenuLink1, #dropdownMenuLink2').on('click', function (e) {
        e.preventDefault();
        $('.balance-block').toggle();
        //$(this).parents('.enter-block').toggleClass('view-balance-block')
        closeDropMenu('balance-block', 'select-type-block');
    });
    $('#coupon-checkbox').on('change', function () {
        var checked = $(this).is(':checked');
        $.ajax({
            url: 'ajax_index.php?page=tableview_check',
            method: 'POST',
            data: {
                checked: checked
            }
        }).done(function (answer) {
            console.log(answer);
            document.location.reload();
        });
    });
});
/* For new header END */


/******** JSON Class - for old browsers ********/
if (typeof JSON !== 'object') {
    JSON = {};
}
(function () {
    'use strict';
    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {
        Date.prototype.toJSON = function (key) {
            return isFinite(this.valueOf())
                ? this.getUTCFullYear() + '-' +
                f(this.getUTCMonth() + 1) + '-' +
                f(this.getUTCDate()) + 'T' +
                f(this.getUTCHours()) + ':' +
                f(this.getUTCMinutes()) + ':' +
                f(this.getUTCSeconds()) + 'Z'
                : null;
        };
        String.prototype.toJSON =
            Number.prototype.toJSON =
                Boolean.prototype.toJSON = function (key) {
                    return this.valueOf();
                };
    }
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = { // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        },
        rep;

    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string'
                    ? c
                    : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' : '"' + string + '"';
    }

    function str(key, holder) {
// Produce a string from holder[key].
        var i, // The loop counter.
            k, // The member key.
            v, // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];
// If the value has a toJSON method, call it to obtain a replacement value.
        if (value && typeof value === 'object' &&
            typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }
        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }
// What happens next depends on the value's type.
        switch (typeof value) {
            case 'string':
                return quote(value);
            case 'number':
// JSON numbers must be finite. Encode non-finite numbers as null.
                return isFinite(value) ? String(value) : 'null';
            case 'boolean':
            case 'null':
                return String(value);
            case 'object':
                if (!value) {
                    return 'null';
                }
// Make an array to hold the partial results of stringifying this object value.
                gap += indent;
                partial = [];
// Is the value an array?
                if (Object.prototype.toString.apply(value) === '[object Array]') {
                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || 'null';
                    }
                    v = partial.length === 0
                        ? '[]'
                        : gap
                            ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                            : '[' + partial.join(',') + ']';
                    gap = mind;
                    return v;
                }
// If the replacer is an array, use it to select the members to be stringified.
                if (rep && typeof rep === 'object') {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        if (typeof rep[i] === 'string') {
                            k = rep[i];
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                } else {
// Otherwise, iterate through all of the keys in the object.

                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                }
                v = partial.length === 0
                    ? '{}'
                    : gap
                        ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                        : '{' + partial.join(',') + '}';
                gap = mind;
                return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.
    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {
            var i;
            gap = '';
            indent = '';
            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }
// If the space parameter is a string, it will be used as the indent string.
            } else if (typeof space === 'string') {
                indent = space;
            }
            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                (typeof replacer !== 'object' ||
                typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }
            return str('', {'': value});
        };
    }
// If the JSON object does not yet have a parse method, give it one.
    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {
            var j;

            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }
            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                j = eval('(' + text + ')');
                return typeof reviver === 'function'
                    ? walk({'': j}, '')
                    : j;
            }
// If the text is not JSON parseable, then a SyntaxError is thrown.
            throw new SyntaxError('JSON.parse');
        };
    }
}());


/*******************************************************************************
 *
 * Функции, отвечающие за попад модального окна на авторизацию и регистрацию
 *
 ******************************************************************************/

function getAjaxLoginFormData() {
    data = $('#authWindowForm').serializeArray().reduce(function (obj, item) {
        obj[item.name] = item.value;
        return obj;
    }, {});

    return data;
}

function perfomAjaxLogin() {
    $('.errorBlock').css("display", "none");

    var data = getAjaxLoginFormData();

    $.ajax({
        method: "POST",
        url: "/index.php",
        data: data
    }).done(function (msg) {
        if (msg.success) {
            if (readCookie('open_video_after_login') > 0) {
                setCookieD('open_video_after_login', 0);
            }
            location.reload();
        } else {
            $('.errorBlock').css("display", "block").text(msg.msg);
        }
    });
}

$(function () {
    $(document).delegate('.authLink', "click", function () {
        $('body').toggleClass("showPopViewOther");
        $('.authWindow').show();
        $('#popOverlayOther').fadeIn();
    });
    $(document).delegate('#popOverlayOther, #close-btn', "click", function () {
        $('body').removeClass("showPopViewOther");
        $('.authWindow').hide();
        $('#popOverlayOther').fadeOut();
    });
    $("#authWindowForm input[name=passw]").keypress(function (e) {
        if (e.which == 13) {
            if ($("#authWindowForm input[name=login]").val().length && $("#authWindowForm input[name=passw]").val().length) {
                perfomAjaxLogin();
            }
        }
    });
    $(document).delegate('.enterLinkBtn', "click", function () {
        var data = getAjaxLoginFormData();

        if (!data.login.length || !data.passw.length) {
            return false;
        }

        perfomAjaxLogin();
    });
});

/*$(window).on('load resize', function () {
    var $mid_menu;
    var $mid_menu_main = $('.mid-menu');
    var $mid_menu_main_li = $('.mid-menu > li');
    var menu_offset = 0;
    var menu_drop = 0;
    $mid_menu_main_li.each(function (key, val) {
        if (key != 0) {
            if (menu_offset != $(this).offset().top) {
                menu_drop++;
            }
        } else {
            menu_offset = $(this).offset().top;
        }
    });
    if (menu_drop == 1) {
        $mid_menu = $('<ul/>');
        $mid_menu.addClass('mid-menu');
        $mid_menu.html('');
        $mid_menu.append($mid_menu_main_li.last().prev().detach());
        $mid_menu.append($mid_menu_main_li.last().detach());
        $mid_menu.insertAfter($mid_menu_main);
    } else {
        if ($('.mid-menu').length != 1) {
            $('.mid-menu:eq(0)').append($('.mid-menu:eq(1)').html())
            $('.mid-menu:eq(1)').remove();
        }
    }
});*/


/******************************************************************************/

/**
 * @description Оповещение для акций в корзине
 * @type {{init: (function(*=): (boolean|undefined)), betSlipSelector: string, $betslip: null, checkParams_basket: ActionBonusNotice.checkParams_basket, actionSelector: string, err: {}, checkParams_fastbet: ActionBonusNotice.checkParams_fastbet, clear: ActionBonusNotice.clear, sumSelector: string, outputError: (function(): (boolean|undefined)), oddSelector: string, checkParams: ActionBonusNotice.checkParams}}
 */
var ActionBonusNotice = {
    /* Do not change selectors here! */
    betSlipSelector: '.js_betslip',
    actionSelector: '.js-action-notice',
    sumSelector: '.sum_ord_js',
    oddSelector: '.js_odd',
    err: {},
    $betslip: null,
    clear: function () {
        if($(this.actionSelector).length > 0) {
            $(this.actionSelector).text('');
        }
        this.err = {};
    },
    init: function (type) {
        ActionBonusNotice.clear();
        this.$betslip = $(this.betSlipSelector);
        if(typeof type == 'undefined') {
            console.log('ActionBonusNotice.init - couldn\'t get the type');
            return false;
        }
        if(type === 'mobile_basket') {
            this.checkParams_mobile_basket();
        } else
        if(type === 'mobile_fastbet') {
            this.checkParams_mobile_fastbet();
        } else
        if(type === 'desktop_setbetold') {
            this.checkParams_desktop_setbetold();
        } else
        if(type === 'desktop_setbetnew') {
            this.checkParams_desktop_setbetnew();
        } else {
            console.log('ActionBonusNotice.init - get wrong type');
            return false;
        }
        this.outputError();
        return true;
    },
    checkParams: function(sum, odd, number) {
        var _this = this;
        if(sum !== '' && typeof sum != "undefined") {
            sum = sum.replace(/\s+/g, '');
        }
        if(sum === '')
            sum = 0;
        sum = parseFloat(sum);
        sum = Math.floor(sum * CURRENCY_DIVIDER) / CURRENCY_DIVIDER;
        _this.err[number] = null;
        if(sum < 2000) {
            _this.err[number] = TXT_ACTION_NOTICE.more2000;
        }
        if (parseFloat(odd) < 1.5) {
            _this.err[number] = TXT_ACTION_NOTICE.more15;
        }
        if(_this.err[number] == null) {
            delete _this.err[number];
        }
    },
    checkParams_desktop_setbetnew : function() {
        var _this = this;
        var basketNavVal = $(_this.betSlipSelector).find('input#busket-nav').val();
        if(basketNavVal !== "3") {
                $(_this.betSlipSelector).find('.busket_item_js').each(function() {
                    var
                        id = $(this).attr('id'),
                        sum = $(this).find(_this.sumSelector).val(),
                        odd = $(this).find(_this.oddSelector).text();
                    var sumInput = '';
                    if($(_this.betSlipSelector).find('#b_seria:checked').length > 0) {
                        sumInput = 'input.allsum';
                    }
                    if(basketNavVal === "2") {
                        odd = $(_this.betSlipSelector).find('[name="exp_koef"]').val();
                        sumInput = 'input#ex_max_bet';
                    }
                    if(sumInput !== '') {
                        sum = $(_this.betSlipSelector).find(sumInput).val();
                    }
                    _this.checkParams(sum, odd, id);
                });
        }
        _this.multipleErrorCheck();
    },
    checkParams_desktop_setbetold : function() {
        var _this = this;
        if(_this.actionSelector.length > 0) {
            var radioBetType = $('input[type="radio"][name="bet_type"]:checked').val();
            if($('input[type="radio"][name="bet_type"]:visible').length > 0 && radioBetType === "2") {
                $(_this.betSlipSelector + ' tr.row').each(function () {
                    if ($(this).find('input[type="checkbox"]:checked').length === 0) {
                        var curI = parseInt($(this).data('dep')) - 1;
                        var sum = $('input[name="expbet_sum"]').val();
                        var odd = $('input[name="exp_koef"]').val();
                        _this.checkParams(sum, odd, curI);
                    }
                });
            } else if($('input[type="radio"][name="bet_type"]:visible').length > 0 && radioBetType === "3") {
            } else {
                $(_this.betSlipSelector + ' tr.row').each(function () {
                    if ($(this).find('input[type="checkbox"]:checked').length === 0) {
                        var curI = parseInt($(this).data('dep')) - 1;
                        var sum = _this.$betslip.find(_this.sumSelector + curI).val();
                        var odd = _this.$betslip.find(_this.oddSelector + curI).text();
                        _this.checkParams(sum, odd, curI);
                    }
                });
            }
            _this.multipleErrorCheck();
        }
    },
    checkParams_mobile_fastbet    : function() {
        var _this = this;
        if(_this.$betslip.find(_this.actionSelector).length > 0) {
            _this.$betslip.find(_this.sumSelector).each(function () {
                var sum = $(this).val();
                var odd = _this.$betslip.find(_this.oddSelector).text();
                _this.checkParams(sum, odd, 0);
            });
        }
    },
    multipleErrorCheck : function () {
        var _this = this;
        var error = false;
        if (typeof _this.err['exp_odd'] == "undefined") {
            _this.err['exp_odd'] = '';
        }
        $.each(_this.err, function (i, val) {
            if (i !== 'exp_odd') {
                error = true;
                if (
                    _this.err['exp_odd'] !== TXT_ACTION_NOTICE.more15 ||
                    _this.err['exp_odd'] === '' ||
                    typeof _this.err['exp_odd'] == 'undefined'
                ) {
                    _this.err['exp_odd'] = val;
                }
                delete _this.err[i];
            }
        });
        if (!error) {
            delete _this.err['exp_odd'];
        }
    },
    checkParams_mobile_basket  : function() {
        var _this = this;

        if(_this.$betslip.find(_this.actionSelector).length > 0) {
            if (betting_type == 2) {
                _this.$betslip.find(_this.sumSelector).each(function () {
                    var $parent = $(this).closest('.js_item');
                    var parent_number = $parent.data('number');
                    var sum = _this.$betslip.find('#betSum').val();
                    var odd = $('.js_express_block .js_odd').text();
                    _this.checkParams(sum, odd, parent_number);
                });
                _this.multipleErrorCheck();
            } else
            if (betting_type != 3) {
                _this.$betslip.find(_this.sumSelector).each(function () {
                    var $parent = $(this).closest('.js_item');
                    var parent_number = $parent.data('number');
                    var sum = $(this).val();
                    var odd = $parent.find(_this.oddSelector).text();
                    _this.checkParams(sum, odd, parent_number);
                });
            }
        }
    },
    outputError: function() {
        if(typeof this.err == 'undefined')
            return false;
        var _this = this;
        $(_this.actionSelector + ":visible").each(function() {
            var number = $(this).data('number');
            if(typeof _this.err[number] != 'undefined') {
                $(this).text(_this.err[number]);
            } else {
                $(this).text('');
            }
        });
    }
}

$(document).delegate(".iscashback, .ico-cashback", "click", function() {
    location.href = "/promo/cashback";
});


$(document).ready(function () {

    var initPhoneMask = function () {
        if ($(".js-phone-mask").length > 0) {
            $(".js-phone-mask").inputmask({
                mask            : "9[999999999999999]",
                greedy          : false,
                showMaskOnHover : false,
                placeholder     : " "
            });
        }
    };
    initPhoneMask();
    $(document).bind('updatePhoneMaskEvent', function () {
        initPhoneMask();
    });

    var $bonusPopup = $('[data-role="bonus-popup"]');
    if ($bonusPopup.length) {
        var hideBonusPopup = getCookie('hideBonusPopup');
        if (!hideBonusPopup) $bonusPopup.show();
        $bonusPopup.find('[data-button="close"]').on('click', function() {
            setCookieD('hideBonusPopup', true, {expires: 3600 * 24 * 1});
            $bonusPopup.fadeOut(function() {
                $(this).remove();
            });
        });
    }

    /* Crutch for old set bet */
    if($('input[name="page"][value="setbet"]').length > 0) {
        ActionBonusNotice.betSlipSelector = '.koeftable';
        ActionBonusNotice.sumSelector = '#sb';
        ActionBonusNotice.oddSelector = '#k';
        var ActionTypeName = 'desktop_setbetold';
        ActionBonusNotice.init(ActionTypeName);
        $('input[type=checkbox][name="skip_bet[]"]').on('click', function () {
            ActionBonusNotice.init(ActionTypeName);
        });
        $('input[name="expbet_sum"]').on('keyup', function () {
            ActionBonusNotice.init(ActionTypeName);
        });
        $('input[type="radio"][name="bet_type"]').on('click', function() {
            ActionBonusNotice.init(ActionTypeName);
        });
        $(ActionBonusNotice.betSlipSelector + ' tr.row').each(function(){
            var curI = parseInt($(this).data('dep')) - 1;
            $('input' + ActionBonusNotice.sumSelector + curI).on('keyup', function () {
                ActionBonusNotice.init(ActionTypeName);
            });
        });
    }
});

/* UFS match tracker */
function openUfsTracker(matchId) {
	const $widget = $("#ufsTracker");
	const $inner  = $("#ufsTracker_widget");
	const $column = $(".col_td.right");
	const $expandBtn = $widget.find(".expand-button");
	let url;
	const titles  = {
		increase: $expandBtn.data("big-title"),
		decrease: $expandBtn.data("litle-title")
	};
	const checkButtonTitle = () => {
		$expandBtn.attr("title", $column.hasClass("expanded") ? titles.decrease : titles.increase);
	};
	const load = (afterLoadedOpen) => {
		let body = new FormData();
		body.append("page", "img_mt");
		body.append("type", "fight");
		body.append("match", matchId);
		fetch("/ajax_index.php", {
			method: "POST",
			body: body
		})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			url = data.url;
			$inner.html('<iframe src="'+ url +'" width="100%" height="100%" frameborder="0" scrolling="auto"></iframe>');
			if (afterLoadedOpen) openInWindow();
		});
	};
	const openInWindow = () => {
		let attr = "width=760,height=400,menubar=0,toolbar=0,directories=0,status=1,location=0,resizable=0,scrollbars=0";
		window.open(url, "", attr, "_blank");
		$widget.hide();
	};
    const toggleSize = () => {
        $column.toggleClass("expanded");
        checkButtonTitle();
        if (typeof expandAllVideoWidgets!="undefined") expandAllVideoWidgets();
    };
	$expandBtn.off("click").on("click", () => {
        toggleSize();
		return false;
	});
    if (!$column.hasClass("expanded")) toggleSize();
	$widget
		.find(".close-button").off("click").on("click", () => {
			$widget.hide();
			return false;
		}).end()
		.find(".full-mc-button").off("click").on("click", () => {
			openInWindow();
			return false;
		});
	if ($widget.length) {
		load();
		checkButtonTitle();
		$widget.show();
	} else load(true);
}

$('.rd').on('click', function () {
    $(this).toggleClass('open')
});







var actions_modal_is_inited;
function initActionsModal(iframe_url) {
	var hash = location.hash;
	let modal, modal_in, iframe, app, scrollbar_width;
	const getScale = () => {
		const vh = window.innerHeight * .01;
		document.documentElement.style.setProperty("--vh", vh + "px");
	};
	const getScrollBarWidth = () => {
		const div = document.createElement("div");
		div.style.overflowY     = "scroll";
		div.style.width         = "50px";
		div.style.height        = "50px";
		div.style.visibility    = "hidden";
		document.body.appendChild(div);
		scrollbar_width = div.offsetWidth - div.clientWidth;
		document.body.removeChild(div);
	};
	const removeModal = () => {
		document.body.style.paddingRight = 0;
		document.body.classList.remove("hide-modal-actions");
		if (modal) {
			modal.remove();
			modal = false;
		}
	};
	const hideModal = () => {
		modal_in.addEventListener("transitionend", removeModal);
		modal_in.addEventListener("webkitTransitionEnd", removeModal);
		modal_in.addEventListener("oTransitionEnd", removeModal);
		document.body.classList.add("hide-modal-actions");
		document.body.classList.remove("showed-modal-actions");
		document.body.classList.remove("show-modal-actions");
	};
	const showModal = () => {
		document.body.style.paddingRight = scrollbar_width +"px";
		document.body.classList.add("show-modal-actions");
	};
	const renderModal = (url, with_lang) => {
		modal     = document.createElement("div");
		modal_in  = document.createElement("div");
		iframe    = document.createElement("iframe");
		modal.classList.add("modal-actions");
		modal_in.classList.add("modal-actions-in");
		iframe.src = url;
        iframe.id  = "modalActionsIframe";
		modal_in.appendChild(iframe);
		modal.appendChild(modal_in);
		document.body.appendChild(modal);
		setTimeout(() => showModal(), 50);
		iframe.onload = () => {
			document.body.classList.add("showed-modal-actions");
			try {
				const doc = iframe.contentWindow.document;
				app = doc.getElementById("app");
				if (app) {
					let device = "unknow";
					if (typeof isMobileDevice!="undefined") {
						device = isMobileDevice ? "mobile" : "desktop";
					}
					iframe.contentWindow.postMessage({
						device: device
					}, "*");
				}
			} catch (error) {}
		};
	};
	const initEvents = () => {
		document.addEventListener("keydown", (e) => {
			if (e.code=="Escape" && modal) {
				hideModal();
			}
		});
		window.addEventListener("message", (event) => {
			if (typeof event.data.action!="undefined" && modal) {
				switch (event.data.action) {
					case "open_chat":
						LC_API.open_chat_window();
						break;
					case "close":
						hideModal();
						break;
					case "mobile_authorization":
						var regexp = /page=(.*)/gi;
						var exclude_page = /verifycode/gi;
						let back_url = "";
						if(regexp.test(window.location.search) === true && exclude_page.test(window.location.search) === false) {
							back_url = window.location.search.substr(1);
						}
						if (hash) back_url += hash;
						$(".get_enter_btn").click();
						setTimeout(() => {
							$('input[name="redirect_page"]').val(back_url);
						}, 200);
						break;
				}
			}
		});
	};
	if (iframe_url) {
		renderModal(iframe_url);
	} else {
		if (hash) {
            let action = null;
            if (hash.startsWith("#action_")) {
                action = hash.slice(8);
            }
            if (hash.startsWith("#promo_")) {
                action = hash.slice(7);
            }
            if (action) {
                renderModal("/promo/"+ action +"/");
            }
		}
	}
	if (!actions_modal_is_inited) {
		getScrollBarWidth();
		getScale();
		window.addEventListener("resize", getScale);
		actions_modal_is_inited = true;
		$("body").delegate("[data-action-in-modal]", "click", function() {
			const action = $(this).data("action-in-modal");
			renderModal("/promo/"+ action +"/");
			return false;
		});
	}
	initEvents();
}

$(document).ready(function() {
	initActionsModal();
});
