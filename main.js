// Модули для управления жизнью приложения и создания собственного окна браузера.
const { app, BrowserWindow } = require('electron');
// Подключаем модуль запоминающий положение окна на экране перед закрытием
const windowStateKeeper = require('electron-window-state');
const path = require("path");

// Перерисовка окна при внесении изменений, без необходимости перезапускать проект. 
require('electron-reload')(__dirname);

// Для отключения сообщений о недостаточной безопасности добавляем строку
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

// Сохранztv глобальную ссылку на объект window, В противном случае окно будет
// закрываться автоматически, если объект JavaScript является объектом сборки мусора.
let mainWindow
let childWindow

function createWindow() {

  // Устанавливаем в  windowStateKeeper первоначальные размеры окна
  let mainWindowState = windowStateKeeper({
    defaultWidth: 800,
    defaultHeight: 400
  });

  // Создаем окно браузера.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 600,
    backgroundColor: '#99a6c1',
    show: false,
    frame: false, // выключаем рамку у окна
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
  })

  childWindow = new BrowserWindow({
    x: mainWindowState.x, // значение до закрытия окна по x
    y: mainWindowState.y, // значение до закрытия окна по y
    width: mainWindowState.width, // значение width до закрытия окна
    height: mainWindowState.height, // значение height до закрытия окна
    show: false,
    // parent: mainWindow, // указываем родительское окно
    // modal: true, // окно будет модальным для родельского окона
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
  })

  // Инициализируем слежение за положением и размером окна
  mainWindowState.manage(childWindow)
  
  // и загружаем файл index.html он содержит наше приложение.
  // mainWindow.loadFile('index.html');
  // Вариант с указанием пути к файлу
  mainWindow.loadFile(`${path.join(__dirname, "/index.html")}`);
  childWindow.loadFile(`${path.join(__dirname, "/index_child.html")}`);

  mainWindow.on('ready-to-show', () => { 
    mainWindow.show()
  })

  childWindow.on('ready-to-show', () => {
    childWindow.show()
  })

  // Открываем инструменты разработчика (DevTools). 
  // Если необходимо раскомментируйте строку ниже
  // mainWindow.webContents.openDevTools()

  // Запускается при закрытии окна.
  mainWindow.on('closed', function () {
    // После закрытия окна, удаляются ранее созданные объекты 
    // для организации работы приложения.
    mainWindow = null
  })

  mainWindow.on('closed', function () {
    // После закрытия окна, удаляются ранее созданные объекты 
    // для организации работы приложения.
    childWindow = null
  })

}

// Этот метод будет вызван, когда электрон закончит
// инициализацию и будет готов для создания окна приложения.
// Некоторые API можно использовать только после этого события.
app.on('ready', createWindow)

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
