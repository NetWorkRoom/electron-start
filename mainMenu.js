module.exports = [
	{
		label: 'Electron', // Создаем пункт меню первого уровня
		submenu: [
			{ label: 'Item 1' },
			{ label: 'Item 2' },
			{ label: 'Item 3' },
		]
	},
	{
		label: 'Actions', // Создаем пункт меню первого уровня
		submenu: [ 
			{
				label: 'Greet1', // Создаем пункт меню второго уровня
				click: () => { console.log('Hello from Electron!') },  // Устанавливаем слушатель события click()
				accelerator: 'Shift+Alt+G' // Назначаем горячие клавиши для вызова действия
			},
			{
				label: 'Action 2', // Создаем пункт меню второго уровня
				submenu: [
					{
						label: 'Greet2', // Создаем пункт меню третьего уровня
						click: () => { console.log('Hello World!') },  // Устанавливаем слушатель события click()
						accelerator: 'Shift+Alt+M', // Назначаем горячие клавиши для вызова действия
						enabled: false // Делаем пункт меню неактивным
					},
					{
						label: 'Greet3', // Создаем пункт меню третьего уровня
						click: () => { console.log('Hello JS!') }, // Устанавливаем слушатель события click()
						accelerator: 'Shift+Alt+L' // Назначаем горячие клавиши для вызова действия
					}
				]
			},
			{
				label: 'Toggle Developer Tools',
				role: 'toggledevtools' // Показываем или скрываем Dev Tools
			},
			{
				role: 'togglefullscreen' // Разворачиваем и свораяиваем окна на весь экран
			}
		]
	},
	{
		label: 'Edit', // Создаем пункт меню первого уровня
		submenu: [
			{ role: 'undo' },
			{ role: 'redo' },
			{ role: 'copy' },
			{ role: 'paste' },
		]
	},
]
