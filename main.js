// Модули для управления жизнью приложения и создания собственного окна браузера.
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require("path");

// Перерисовка окна при внесении изменений, без необходимости перезапускать проект. 
require('electron-reload')(__dirname);

// Для отключения сообщений о недостаточной безопасности добавляем строку
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

// Сохранztv глобальную ссылку на объект window, В противном случае окно будет
// закрываться автоматически, если объект JavaScript является объектом сборки мусора.
let mainWindow

ipcMain.on('sync-channal', (event, args) => { 
  console.log('Sync message received');
  console.log(args.name);
  console.log(args.surname);

  setTimeout(() => { 
    event.returnValue = 'A synchronous response from the main process';
  }, 3000)
 
})

ipcMain.on('sync-channal2', (event, args) => {
  console.log('Sync message received');
  console.log(args.name);
  console.log(args.surname);

  setTimeout(() => {
    event.returnValue = 'A synchronous response from the main process';
  }, 3000)

})

// ipcMain.on('ch1', (event, args) => {
//   if (args.close) process.exit();
// })

// Создаем первый канал для получения и передачи данных в renderer
ipcMain.on('channalOne', (event, args) => { 
  console.log(args);
  // Отправляем сообщение в renderer процесс
  event.sender.send('channalOne','Message resieved on the main process - channalOne')
})

// Второй канал не будет работать
// Создаем второй канал для получения и передачи данных в renderer
ipcMain.on('channaTwo', (event, args) => {
  console.log(args);
  // Отправляем сообщение в renderer процесс
  event.sender.send('channalTwo', 'Message resieved on the main process - channaTwo')
})

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

  // mainWindow.webContents.on('did-finish-load', () => { 
  //   mainWindow.webContents.send('private', 'Message from Main Precess to MainWindow')
  // })

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
