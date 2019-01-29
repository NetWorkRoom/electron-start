// Модули для управления жизнью приложения и создания собственного окна браузера.
const electron = require('electron');
const { app, BrowserWindow } = require('electron');
const path = require("path");

// Перерисовка окна при внесении изменений, без необходимости перезапускать проект. 
require('electron-reload')(__dirname);

// Для отключения сообщений о недостаточной безопасности добавляем строку
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

// Сохранztv глобальную ссылку на объект window, В противном случае окно будет
// закрываться автоматически, если объект JavaScript является объектом сборки мусора.
let mainWindow

// console.log(process);
console.log('Process Type - ', process.type);
console.log('Electron Version - ', process.versions.electron);
console.log('Chrome (Chromium) Version - ', process.versions.chrome);
console.log('Resource Path - ', process.resourcesPath);

function createWindow() {

  // Для открытия окна по размеру монитора
  const display = electron.screen.getPrimaryDisplay();

  // Создаем окно браузера.
  mainWindow = new BrowserWindow({
    width: display.size.width,
    height: display.size.height,
    x: display.bounds.x,
    y: display.bounds.y,
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
  // mainWindow.webContents.openDevTools()

  // mainWindow.on('crashed', () => {
  //   console.log('MainWindow Renderer Process Crashed. Reloading');
  //   mainWindow.reload();
  // })

  console.log(process.getSystemMemoryInfo());

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
