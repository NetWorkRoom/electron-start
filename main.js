// Модули для управления жизнью приложения и создания собственного окна браузера.
const { app, BrowserWindow, Tray, Menu } = require('electron');
const path = require("path");

// Перерисовка окна при внесении изменений, без необходимости перезапускать проект. 
require('electron-reload')(__dirname);

// Для отключения сообщений о недостаточной безопасности добавляем строку
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

// Сохранztv глобальную ссылку на объект window, В противном случае окно будет
// закрываться автоматически, если объект JavaScript является объектом сборки мусора.
let mainWindow, tray // Инициализируем переменную tray

// Создаем новый экземпляр объекта Tray и передаем в него путь к картинке иконки приложения 
function createTray() {
  tray = new Tray('icon.ico')
  tray.setToolTip('Name App')

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

	// Подсвечиваем как ативное приложение 
  mainWindow.on('show', () => {
    tray.setHighlightMode('always')
  })

	// Скрываем подсветку
  mainWindow.on('hide', () => {
    tray.setHighlightMode('never')
  })

}

function createWindow() {
  // Создаем окно браузера.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
  })
  
  // и загружаем файл index.html он содержит наше приложение.
  // mainWindow.loadFile('index.html');
  // Вариант с указанием пути к файлу
  mainWindow.loadFile(`${path.join(__dirname, "/index.html")}`);

  // Открываем инструменты разработчика (DevTools). 
  // Если необходимо раскомментируйте строку ниже
  mainWindow.webContents.openDevTools()

  // Запускается при закрытии окна.
  mainWindow.on('closed', function () {
    // После закрытия окна ,удаляются ранее созданные объекты 
    // для организации работы приложения.
    mainWindow = null
  })
}

// Этот метод будет вызван, когда электрон закончит
// инициализацию и будет готов для создания окна приложения.
// Некоторые API можно использовать только после этого события.
app.on('ready', () => { 
  createWindow()  
  createTray() // подключаем иконку в трее

  // Отслеживаем переход в режим сна 
  electron.powerMonitor.on('suspend', () => {
    console.log('The system is going to sleep')
  }) 

  // Отслеживаем возвращение из режима сна 
  electron.powerMonitor.on('resume', () => {
    console.log('The system is waking from sleep')
  }) 
})

// Выходим, когда все окна закрыты.
app.on('window-all-closed', function () {
  // Для macOS является общим для всего приложения и его меню 
  // пока пользователь явно не завершит работу с помощью Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // На macOS обычно повторно создают окно в приложении, когда
  // dock значок нажат и нет никаких других открытых окон.
  if (mainWindow === null) {
    createWindow()
  }
})

// В этот файл можно включить остальную часть кода основного процесса приложения.
// Вы также можете поместить его в отдельные файлы и вызвать их здесь.
