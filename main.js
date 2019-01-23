// Модули для управления жизнью приложения и создания собственного окна браузера.
const { app, BrowserWindow, Menu, MenuItem } = require('electron');
const path = require("path");

// Перерисовка окна при внесении изменений, без необходимости перезапускать проект. 
require('electron-reload')(__dirname);

// Для отключения сообщений о недостаточной безопасности добавляем строку
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

// Сохранztv глобальную ссылку на объект window, В противном случае окно будет
// закрываться автоматически, если объект JavaScript является объектом сборки мусора.
let mainWindow

// Первый вариант создания Меню
// Создаем меню приложения
// let mainMenu = new Menu()

// Создаем пункт меню приложения
// let menuItem1 = new MenuItem({
//   label: 'Electron',
//   submenu: [
//     { label: 'Item 1' },
//     { label: 'Item 2' },
//     { label: 'Item 3' },
//   ]
// })

// Добавляем пункт меню в меню приложения
// mainMenu.append(menuItem1)

// Второй вариант создания Меню
// let mainMenu = new Menu.buildFromTemplate([
//   {
//     label: 'Electron',
//     submenu: [
//       { label: 'Item 1' },
//       { label: 'Item 2' },
//       { label: 'Item 3' },
//     ]
//   },
//   {
//     label: 'Actions',
//     submenu: [
//       { label: 'Action 1' },
//       { label: 'Action 2' },
//       { label: 'Action 3' },
//     ]
//   }
// ])

// Третий вариант создания Меню, с помощью отдельного файла
let mainMenu = new Menu.buildFromTemplate(require('./mainMenu'))

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

  // Создаем контекстное меню
  let contextMenu = new Menu.buildFromTemplate(require('./contextMenu'))

  // Подключаем контекстное меню и создаем слушател для его вызова
  mainWindow.webContents.on('context-menu', (e) => {
    e.preventDefault();
    contextMenu.popup()
  })

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
 Menu.setApplicationMenu(mainMenu) // Добавляем главное меню в приложение
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
    createWindow()  }
})

// В этот файл можно включить остальную часть кода основного процесса приложения.
// Вы также можете поместить его в отдельные файлы и вызвать их здесь.
