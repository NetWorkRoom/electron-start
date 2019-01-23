# Electron - Полезные настройки и инструменты
Список дополнительных инструментов для создания приложения на Electron.js

### [Menu] и [MenuItem]
Подключение Menu и MenuItem
```
const { app, BrowserWindow, Menu, MenuItem } = require('electron');
```

Есть несколько вариантов создания меню у приложения
Первый вариант - 
```
// Создаем меню приложения
let mainMenu = new Menu()

// Создаем пункт меню приложения
let menuItem1 = new MenuItem({
  label: 'Electron',
  submenu: [
    { label: 'Item 1' },
    { label: 'Item 2' },
    { label: 'Item 3' },
  ]
})

// Добавляем пункт меню в меню приложения
mainMenu.append(menuItem1)

// Вызываем созданное меню
app.on('ready', () => {
  createWindow()
 Menu.setApplicationMenu(mainMenu) // Добавляем главное меню в приложение
})
```

Второй вариант - 
```
let mainMenu = new Menu.buildFromTemplate([
  {
    label: 'Electron',
    submenu: [
      { label: 'Item 1' },
      { label: 'Item 2' },
      { label: 'Item 3' },
    ]
  },
  {
    label: 'Actions',
    submenu: [
      { label: 'Action 1' },
      { label: 'Action 2' },
      { label: 'Action 3' },
    ]
  }
])

// Вызываем созданное меню
app.on('ready', () => {
  createWindow()
 Menu.setApplicationMenu(mainMenu) // Добавляем главное меню в приложение
})
```

Третий вариант - 
Создаются отдельно файл (например - mainMenu.js) с конфигурацией меню 
```
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
				role: 'togglefullscreen' // Разворачиваем и сворачиваем окна на весь экран
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
```

В main.js подключаем файл конфигурации 
```
let mainMenu = new Menu.buildFromTemplate(require('./mainMenu'))

// Вызываем созданное меню
app.on('ready', () => {
  createWindow()
 Menu.setApplicationMenu(mainMenu) // Добавляем главное меню в приложение
})
```

### [Context Menu]
Создаем конфигурацию контекстного меню в отдельном файле - contextMenu.js
```
module.exports = [
	{ role: 'undo' },
	{ role: 'redo' },
	{ type: 'separator' },
	{ role: 'copy' },
	{ role: 'paste' }
]
```

// Создаем само контекстное меню и подключаем конфигурацию из файла contextMenu.js
``` 
let contextMenu = new Menu.buildFromTemplate(require('./contextMenu'))
```

Создаем слушатель событий для показа пользователю контекстного меню
```
mainWindow.webContents.on('context-menu', (e) => {
  e.preventDefault();
  contextMenu.popup()
})
```
[Menu]:https://electronjs.org/docs/api/menu
[MenuItem]:https://electronjs.org/docs/api/menu-item
[Context Menu]: https://electronjs.org/docs/api/web-contents#%D0%A1%D0%BE%D0%B1%D1%8B%D1%82%D0%B8%D0%B5-context-menu
