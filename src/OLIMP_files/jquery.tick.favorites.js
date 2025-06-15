// jQuery плагин избранного Olimp v.3.1
// Coded by ShadoW (c)2019
(function($)
{
	var _FAV_AJAX_            = '/ajax_index.php?page=favorites&action=',
		_FAV_CAN_NOT_CONNECT_ = 'Can not connect to server, try again later',
		defauts =  {
			elements:          'a.fav',
			class:             'fav_item',
			anim_speed:        450,
			line:              'Line',
			show_txt:          'Show',
			add_txt:           'Add to favorites',
			remove_txt:        'Remove from favorites',
			clear_txt:         'Clear favorites',
			clear_confirm_txt: 'Do you realy like to clear all favorites?'
		},
		methods = {

			// ИНИЦИАЛИЗАЦИЯ
			init: function(options)
			{
				return this.each(function()
				{
					var $_inst = $(this),
						data   = $_inst.data('favorites'),
						cfg    = $.extend({}, defauts, data, options);

					if (!data)
					{
						// Сохраняем настройки в data
						$_inst.data('favorites', cfg);

						// Пишем в контейнер
						$_inst.html(
							'<div id="favorites_blocks">'+
							'   <div class="set favorites_block" data-type="1">'+
							'    <a href="#" onclick="fav_movement(this);"> Live <span class="num" id="livenum"></span> </a>  '+'<div class="content">'+
							'       <form action="index.php" method="get" style="text-align: center;">'+
							'           <input type="hidden" name="page" value="line" />'+
							'           <input type="hidden" name="action" value="2" />'+
							'           <input type="hidden" name="fromfav" value="1" />' +
							'			<input type="hidden" name="sportid" value="-1" />'+
							'           <table width="95%" cellspacing="3" cellpadding="3">'+
							'               <colgroup>'+
							'                   <col width="15" />'+
							'                   <col width="*" />'+
							'                   <col width="15" />'+
							'               </colgroup>'+
							'               <tbody></tbody>'+
							'           </table>'+
							'           <input class="gray_button" type="submit" value="'+cfg.show_txt+'" />'+
							'       </form>'+'</div>'+
							'   </div>'+
							'   <div class="set favorites_block" data-type="0">'+
							'       <a href="#"  onclick="fav_movement(this);">'+cfg.line+' <span class="num" id="linenum"></span> </a> '+
							'       <div class="content">' +
							'       <form action="index.php" method="get" style="text-align: center;">'+
							'           <input type="hidden" name="page" value="line" />'+
							'           <input type="hidden" name="action" value="2" />'+
							'           <input type="hidden" name="fromfav" value="1" />'+
							'           <input type="hidden" name="hideoutrights" value="1" />'+
							'           <table width="95%" cellspacing="3" cellpadding="3">'+
							'               <colgroup>'+
							'                   <col width="15" />'+
							'                   <col width="*" />'+
							'                   <col width="15" />'+
							'               </colgroup>'+
							'               <tbody></tbody>'+
							'           </table>'+
							'           <input class="gray_button" type="submit" value="'+cfg.show_txt+'" />'+
							'       </form>'+'</div>'+
							'   </div>'+
							'</div>'+
							'<div class="type-rows" align="center">' +
							'<a id="favorites_clear" class="clear-fav-link" href="#clear">'+cfg.clear_txt+'</a>' +
							'</div>'
						);

						// УДАЛЕНИЕ ЭЛЕМЕНТОВ ИЗ ИЗБРАННОГО
						$('#favorites_blocks .favorites_block').on('click', 'a.fav', function()
						{
							var $item   = $(this).closest('.'+cfg.class),
								$block  = $item.closest('.favorites_block'),
								post    = {
									type:  $block.data('type'),
									favid: $item.data('favid')
								};

							$.post(_FAV_AJAX_+'remove', post, function(json)
							{
								if (typeof json == 'object')
								{
									if (json.status == 'ok')
									{
										// Удаляем из блока
										$item.fadeOut(cfg.anim_speed, function()
										{
											$(this).remove();
											$(cfg.elements+'[data-favid="'+post.id+'"]')
												.removeClass('is_active').attr('title', cfg.add_txt);
											methods.checkEmpty($_inst);
										});
									}
									else alert(json.msg);
								}
								else alert(_FAV_CAN_NOT_CONNECT_);
							}, 'json');

							return false;
						});

						// ОЧИСТКА ИЗБРАННОГО
						$('#favorites_clear').on('click', function()
						{
							$.getJSON(_FAV_AJAX_+'clearAll', function(json)
							{
								if (typeof json == 'object')
								{
									if (json.status == 'ok')
									{
										$('#favorites_win').slideUp(cfg.anim_speed / 2);
										$_inst.find('.'+cfg.class).remove();
										$(cfg.elements+'.is_active').removeClass('is_active').attr('title', cfg.add_txt);
									}
									else alert(json.msg);
								}
								else alert(_FAV_CAN_NOT_CONNECT_);
							});

							return false;
						});

						// ДОБАВЛЕНИЕ / УДАЛЕНИЕ ЭЛЕМЕНТОВ НА СТРАНИЦЕ
						$('body').on('click', cfg.elements, function()
						{
							var $el  = $(this),
								post = { favid: $el.data('favid') };

							if ((typeof post.favid == 'string') && (post.favid != ''))
							{
								// ДОБАВЛЕНИЕ
								if (false == $(this).hasClass('is_active'))
								{
									$.post(_FAV_AJAX_+'add', post,
										function(json)
										{
											if (typeof json == 'object')
											{
												if ((json.status == 'ok') && (typeof json.match == 'object'))
												{
													// Меняем иконку и текст
													$el.addClass('is_active').attr('title', cfg.remove_txt);

													// Дописываем в блок
													var row = methods.object2html($_inst, json.match);
													$_inst.find('.favorites_block[data-type="'+json.match.lv+'"] tbody').append( row );

													// Отображение
													methods.checkEmpty($_inst);
												}
												else alert(json.msg);
											}
											else alert(_FAV_CAN_NOT_CONNECT_);

										}, 'json');
								}

								// УДАЛЕНИЕ
								else
								{
									$.post(_FAV_AJAX_+'remove', post, function(json)
									{
										if (typeof json == 'object')
										{
											if (json.status == 'ok')
											{
												// Меняем картинку и текст
												$el.removeClass('is_active').attr('title', cfg.add_txt);

												// Удаляем из блока
												$_inst.find('.'+cfg.class+'[data-favid="'+post.id+'"]')
													.fadeOut(cfg.anim_speed, function()
													{
														// Удаляем из DOM
														$(this).remove();

														// Скрытие если пустой
														methods.checkEmpty($_inst);
													});
											}
											else alert(json.msg);
										}
										else alert(_FAV_CAN_NOT_CONNECT_);

									}, 'json');
								}
							}
							else alert('Check data-favid');

							return false;
						});
					}
				});
			},

			// ПАРСИНГ ЭЛЕМЕНТОВ
			object2html: function($_inst, match)
			{
				var cfg  = $_inst.data('favorites'),
					html = '';

				if ((typeof match == 'object') && (typeof cfg == 'object'))
				{
					html += '<tr class="'+cfg.class+'" valign="top" data-favid="'+match.sID+':'+match.mID+'" data-time="'+match.stm+'">'+
						'   <td align="left">'+
						'       <a class="fav is_active" href="#fav_remove" title="'+cfg.remove_txt+'"></a>'+
						'   </td>'+
						'   <td align="left">'+
						'       <a class="fav_title" href="/betting/index.php?page=line&action=2&'+(match.lv == 1 ? 'live[]' : 'mid')+'='+match.mID+'">'+match.snm+' '+match.mnm+'</a>'+
						'       <div class="fav_result" style="color:red">'+match.res+'</div>'+
						'   </td>'+
						'   <td align="right">'+
						'       <input class="fav_set" type="checkbox" name="'+(match.lv == 1 ? 'live[]' : 'matches[]')+'" value="'+(match.lv == 1 ? '' : match.sID+':')+match.mID+'"'+(match.set == 1 ? ' checked="checked"' : '')+' />'+
						'		' + (match.lv == 1 ? '<input type="hidden" name="fsid[' + match.mID + ']" value="' + match.sID + '" />' : '') + '' +
						'   </td>' +
						'</tr>';
				}

				return html;
			},

			// СКРЫТИЕ / ОТОБРАЖЕНИЕ БЛОКОВ ИЗБРАННОГО В ЗАВИСИМОСТИ ОТ КОЛИЧЕСТВА ЭЛЕМЕНТОВ
			checkEmpty: function($_inst)
			{
				var cfg = $_inst.data('favorites');

				if (typeof cfg == 'object')
				{
					$('#favorites_win').stop(true, true);

					// Есть элементы в окне избранного
					if ($_inst.find('.favorites_block .'+cfg.class).length > 0)
					{
						// Окно скрыто - отображаем
						if ($('#favorites_win').css('display') == 'none')
							$('#favorites_win').slideDown(cfg.anim_speed);
					}
					else
					{
						// Окно отображено - скрываем
						if ($('#favorites_win').css('display') == 'block')
							$('#favorites_win').slideUp(cfg.anim_speed / 2);

						// Делаем не активными элементы на странице
						$(cfg.elements+'.is_active').removeClass('is_active').attr('title', cfg.add_txt);
					}

					// Блоки лайва и линии
					var show_blocks = 0;
					$_inst.find('.favorites_block').each(function()
					{
						var $block = $(this),
							count  = $block.find('.'+cfg.class).length;

						if (count > 0)
						{
							show_blocks += 1;
							$block.slideDown(cfg.anim_speed);

							// Сортировка элементов по дате
							$block.find('.'+cfg.class)
								.sort(function(a, b)
								{
									return parseInt($(a).data('time')) - parseInt($(b).data('time'));
								})
								.each(function()
								{
									var $elem = $(this);
									$elem.remove();
									$elem.appendTo($block.find('tbody'));
								});
						}
						else $(this).slideUp(cfg.anim_speed / 2);

						$block.find('.num').html(count);
					});

					// Линия разделитель
					if (show_blocks > 1)
						$_inst.find('.favorites_block:first').addClass('has_line');
					else
						$_inst.find('.favorites_block:first').removeClass('has_line');

				}
			},

			// ОБНОВЛЕНИЕ ЭЛЕМЕНТОВ ИЗ ВНЕ
			updateFav: function(json)
			{
				if ((json.status != 'ok') || (typeof json.items != 'object'))
					return false;

				return this.each(function()
				{
					var $_inst = $(this),
						cfg    = $_inst.data('favorites');

					// Добавляем класс (по нему удалим не обновленные
					$_inst.find('.favorites_block .'+cfg.class).addClass('no_updated');

					// Дописываем матчи в блок
					$.each(json.items, function(key, match)
					{
						// Ищем элемент избранного
						var $fav_item = $_inst.find('.favorites_block .'+cfg.class+'[ data-favid="'+match.sID+':'+match.mID+'"]');

						if ($fav_item.length == 1)
						{
							// Переход из линии в лайв или наоборот
							var current_type = $fav_item.closest('.favorites_block').data('type');
							if (match.lv != current_type)
							{
								$fav_item.remove();
								$_inst.find('.favorites_block[data-type="'+match.lv+'"] tbody').append( methods.object2html($_inst, match) );
							}
							// Иначе просто обновляем данные
							else
							{
								$fav_item.find('.fav_title').html(match.snm+' '+match.mnm);
								$fav_item.find('.fav_result').html(match.res);
								if (match.res == '')
									$fav_item.find('.fav_result').fadeOut();
								else
									$fav_item.find('.fav_result').fadeIn();
								$fav_item.removeClass('no_updated');
							}
						}
						// Иначе дописываем матч в блок
						else $_inst.find('.favorites_block[data-type="'+match.lv+'"] tbody').append( methods.object2html($_inst, match) );
					});

					// Удаляем необновленные матчи
					$_inst.find('.favorites_block .'+cfg.class+'.no_updated').remove();

					// Элементы на странице
					$('.central_td '+cfg.elements).each(function()
					{
						if ($_inst.find('.favorites_block .'+cfg.class+'[data-favid="'+$(this).data('favid')+'"]').length > 0)
							$(this).addClass('is_active').attr('title', cfg.remove_txt);
						else if ($(this).hasClass('is_active'))
							$(this).removeClass('is_active').attr('title', cfg.add_txt);
					});

					// Отображение или скрытие
					methods.checkEmpty($_inst);
				});
			}
	};

	// РЕГИСТРИРУЕМ ПЛАГИН
	jQuery.fn.olimpFavorites = function(method)
	{
		// Метод, настройки или ошибка
		if (methods[ method ])
			return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
		else if ((typeof method === 'object') || !method)
			return methods.init.apply(this, arguments);
		else
			$.error('Метод '+method+' не существует в olimpFavorites!');
	}
})(jQuery);
