// Модули для управления жизнью приложения и создания собственного окна браузера.
const { app, BrowserWindow } = require('electron');
const path = require("path");

// Перерисовка окна при внесении изменений, без необходимости перезапускать проект. 
require('electron-reload')(__dirname);

// Для отключения сообщений о недостаточной безопасности добавляем строку
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

// Сохраняем глобальную ссылку на объект window, В противном случае окно будет
// закрываться автоматически, если объект JavaScript является объектом сборки мусора.
let mainWindow

// Получение пути файловой системы, где находится приложение
console.log(app.getAppPath());

// Получение путей к стандартным папкам файловой системы
console.log(app.getPath('desktop'));
console.log(app.getPath('music'));
console.log(app.getPath('temp'));
console.log(app.getPath('userData'));

// Выясняем было ли создано новое окно через 3сек.
setTimeout(() => {
  console.log('app.isReady() - ', app.isReady())
}, 3000);

// Этот метод будет вызван, когда электрон закончит
// инициализацию и будет готов для создания окна приложения.
// Некоторые API можно использовать только после этого события.
app.on('ready', (e) => {

  // Получаем список всех доступных методов
  // console.log(e);

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
  mainWindow.loadFile(`${path.join(__dirname, "/index.html")}`);

  // Открываем инструменты разработчика (DevTools). 
  // Если необходимо раскомментируйте строку ниже
  mainWindow.webContents.openDevTools()

  // Запускается при закрытии окна.
  mainWindow.on('closed', () => {

    // После закрытия окна ,удаляются ранее созданные объекты 
    // для организации работы приложения.
    mainWindow = null
  })
})

// Метод запускает указанный внутри него код перед завершением работы приложения 
app.on('before-quit', () => {
  console.log('The application stops working!');
})

// Метод запускает указанный внутри него код, когда приложения не активно не в фокусе
app.on('browser-window-blur', () => {
  console.log('The application is not active, not in focus!');

  // Метод app.quit(); завршает работу приложения, в примере через 3 секунды после потери фокуса
  // setTimeout(() => {
  //   app.quit();
  // }, 3000)

})

// Метод запускает указанный внутри него код, когда приложения активно и оно в фокусе
app.on('browser-window-focus', () => {
  console.log('The app is active, in focus!');
})

// Задаем имя приложения. будет отображатся если не заданов index.html
app.setName('MyFirstApp')

// Выходим, когда все окна закрыты.
app.on('window-all-closed', () => {
  // Для macOS является общим для всего приложения и его меню 
  // пока пользователь явно не завершит работу с помощью Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // На macOS обычно повторно создают окно в приложении, когда
  // dock значок нажат и нет никаких других открытых окон.
  if (mainWindow === null) {
    createWindow()
  }
})

// В этот файл можно включить остальную часть кода основного процесса приложения.
// Вы также можете поместить его в отдельные файлы и вызвать их здесь.
