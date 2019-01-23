# Electron - Полезные настройки и инструменты
Список дополнительных инструментов для создания приложения на Electron.js

### [Tray]
Для вывода иконки в трее операционной системы подключаем на странице main.js класс - Tray и Menu
```
const { app, BrowserWindow, Tray, Menu } = require('electron');
```
Инициализируем переменную tray
```
let mainWindow, tray
```
Создаем новый экземпляр объекта Tray и передаем в него путь к картинке иконки приложения 
```
function createTray() {
  tray = new Tray('./path/icon.ico') // путь и название файла иконки
	tray.setToolTip('Name App') // Будет показана подсказка при наведении курсора мыши

	// Создаем меню в трее 
  const trayMenu = Menu.buildFromTemplate([
    { label: 'Tray Menu Item' },
    { role: 'quit'}
  ])

  // Подключаем меню в трее
  tray.setContextMenu(trayMenu)

  // По клику скрываем или открываем приложение
  tray.on('click', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
  })

	// Подсвечиваем как активное приложение 
  mainWindow.on('show', () => {
    tray.setHighlightMode('always')
  })

	// Скрываем подсветку
  mainWindow.on('hide', () => {
    tray.setHighlightMode('never')
  })
}
```
Подключаем иконку в трее
```
app.on('ready', () => { 
  createWindow()
  createTray() // подключаем иконку в трее	
})
```

### [powerMonitor]
Для отслеживания событий в операционной системе (например переход в режим сна, или состояние заряда в батарее) используют - powerMonitor
```
app.on('ready', () => { 
  createWindow()  
	// Отслеживаем переход в режим сна 
  electron.powerMonitor.on('suspend', () => {
    console.log('The system is going to sleep')
  }) 
	
	// Отслеживаем возвращение из режима сна 
  electron.powerMonitor.on('resume', () => {
    console.log('The system is waking from sleep')
  }) 
})
```

[Tray]:https://electronjs.org/docs/api/tray
[powerMonitor]: https://electronjs.org/docs/api/power-monitor
