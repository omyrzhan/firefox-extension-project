// Объект для синхронного выполнения AJAX запросов в одном запросе v.1.1
// Coded by ShdoW (c)2016
var tick =  {
	debug:        false,
	stoped:       true,
	services:     {},
	defaults:     {
		paused:    false,
		sync_time: 0,
		last_run:  0,
		run_now:   false,
		require:   [],
		request:   {},
		condition: function() { return true; },
		prepare:   false,
		callback:  false
	},
	ajax_url:     '/tick_index.php',
	connect_err:  'Can not connect to server',
	ticker:       false,
	first_run:    true,
	counter:      -1,
    waiting_answer: false,
    process_services: [],

	// ДОБАВЛЕНИЕ СЕРВИСА
	addService: function(service)
	{
		if ((tick.first_run == false) || (typeof service != 'object') || (typeof service.interval != 'number'))
			return;

		// Проверяем наличие сервиса
		if (typeof this.services[ service.name  ] == 'object')
		{
			if (this.debug)
				console.error('Error: Service '+service.name+' already added!');
			return;
		}

		// Добавляем сервис
		this.services[ service.name ] = $.extend({}, this.defaults, service);
		if (this.debug)
			console.log('Service '+service.name+' added!');
	},

	// УДАЛЕНИЕ СЕРВИСА
	removeService: function(service_name)
	{
		if (typeof this.services[ service_name ] == 'object')
			delete this.services[ service_name ];
	},

	// ПРИОСТАНОВКА СЕРВИСА
	pauseService: function(service_name)
	{
		if ((typeof this.services[ service_name ] == 'object') && (this.services[ service_name ].paused == false))
		{
			this.services[ service_name ].paused = true;
			console.log(this.services[ service_name ]+' paused');
		}
	},

	// ВОЗОБНОВЛЕНИЕ РАБОТЫ СЕРВИСА
	resumeService: function(service_name)
	{
		if ((typeof this.services[ service_name ] == 'object') && (this.services[ service_name ].paused == true))
		{
			// Размораживаем сервис
			this.services[ service_name ].last_run = this.services[ service_name ].sync_time;
			this.services[ service_name ].run_now  = true;
			this.services[ service_name ].paused   = false;
			if (this.debug)
				console.log('Service '+service_name+' resume success!');
		}
	},

	// ВЫПОЛНЕНИЕ TICK
	process: function()
	{
		// Проверяем состояние TICKa
        if (this.stoped == true || this.waiting_answer)
			return;

		var _inst   = this,
			date_ts = Math.floor(Date.now() / 1000),
			request = { require: [], svc : [] };

		// Накручиваем счетчик
		this.counter++;

		if (this.debug)
			console.log('- - - - - - - Tick start prccess: '+this.counter+' - - - - - - -');
		/*
		else
			console.log('tick: '+this.counter);
		*/

		// Собираем запрос
		$.each(this.services, function(service_name, service)
		{
			if (_inst.debug)
				console.log(service_name+' : '+(date_ts - service.last_run)+' >= '+service.interval);

			// Сверяем врмея запуска
			var time2run = ((date_ts - parseInt(service.sync_time)) >= parseInt(service.interval));

			// Время пришло - меняем синхро-время
			if (time2run == true)
				_inst.services[ service_name ].sync_time = date_ts;

			// Проверяем возможность запуска сервиса
			// Сервис не стоит на паузе!
			// У сервиса подошло время ИЛИ стоит параметр "запустить сейчас" ИЛИ первый старт TICK
			if (
				(service.paused == false) &&
				(time2run || (service.run_now == true) || (_inst.first_run == true)) &&
				(service.condition() == true)
			)
			{
				if (_inst.debug)
					console.log(service_name+' : will run');

				// Меняем время последнего запуска у севрвиса (кроме "запустить сейчас")
				if (service.run_now == false)
					_inst.services[ service_name ].last_run = date_ts;

				// Меняем параметр "запустить сейчас"
				_inst.services[ service_name ].run_now = false;

				// Подготовка запроса сервиса
                var service_request = JSON.stringify(typeof service.request == 'function' ? service.request() : '');
				if (typeof service.prepare == 'function')
					service_request = $.extend({}, service_request, service.prepare());

				// Добавляем зависимости
				$.each(service.require, function(kreq, req)
				{
					if (request.require.indexOf(req) == -1)
						request.require.push(req);
				});

				// Добавляем в запрос
				request.svc.push({
					name:    service_name,
					request: service_request
				});
			}
			else if (_inst.debug)
				console.log(service.name+' ignoring...');
		});
        // Запоминаем запущенные сервисы
        this.process_services = request.svc;

		// Зкарываем первый запуск
		this.first_run = false;

		// Запрос не пустой?
		if (request.svc.length > 0)
		{
            this.waiting_answer = true;
			// AJAX POST
            $.ajax({
                type: "POST",
                url: this.ajax_url,
                data: request,
                success: function (json) {
                    if ((json.status == 'ok') && (typeof json.svc == 'object')) {
                        $.each(json.svc, function (service_name, response) {
                            if (typeof _inst.services[service_name] != false)
                                _inst.services[service_name].callback(response);
                        });
                    }
                    else console.error(json.msg);
                },
                dataType: 'json',
                error: function () {
                    console.error(_inst.connect_err);
                },
                complete: function () {
                    _inst.waiting_answer = false;
                    _inst.process_services.forEach(function (item, i, arr) {
                        if ('complete' in _inst.services[item.name])
                            _inst.services[item.name].complete(item.request);
                    });
                },
                timeout: 9000
            });
		}
	},

	// КОНФИГУРАЦИЯ TICK
	config: function(add_services)
	{
		if ((this.first_run == false) || (typeof add_services != 'object'))
			return;

		var _inst = this;
		$.each(add_services, function(key, service)
		{
			// Добавляем сервис
			if (typeof service==="object") {
				_inst.services[ service.name ] = $.extend({}, _inst.defaults, service);
			}
		});

		if (this.debug)
			console.log('Configuration success! Added '+add_services.length+' services');
	},

	// ЗАПУСК TICK
	start: function()
	{
		this.stoped = false;
		if (this.ticker == false)
		{
			var _inst = this;

			if (this.debug)
				console.log('Tick run');
			this.ticker = setInterval(function() { _inst.process(); }, 1000);
			this.process();
		}
		else if (this.debug)
			console.error('Tick already work!');
	},

	// ОСТАНОВКА TICK
	stop: function()
	{
		this.stoped = true;
		if (this.ticker != false)
		{
			clearInterval(this.ticker);
			this.ticker = false;
			if (this.debug)
				console.log('Tick stop success!');
		}
		else if (this.debug)
			console.error('Tick already stopped!');
	}
};
