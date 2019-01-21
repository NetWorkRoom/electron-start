// Модули для управления жизнью приложения и создания собственного окна браузера.
const { app, BrowserWindow, dialog } = require('electron');
const path = require("path");

// Перерисовка окна при внесении изменений, без необходимости перезапускать проект. 
require('electron-reload')(__dirname);

// Для отключения сообщений о недостаточной безопасности добавляем строку
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

// Сохранztv глобальную ссылку на объект window, В противном случае окно будет
// закрываться автоматически, если объект JavaScript является объектом сборки мусора.
let mainWindow

function showDialog() {
  dialog.showOpenDialog({
    defaultPath: './images', // Путь по умолчанию 
    buttonLabel: 'Select Logo', // Название кнопки в диалоге
    properties: [
      'openFile', // Указываем тип диалога 
      'multiSelections', // Указываем возможность выбрать несколько файлов
      'createDirectory' // Добавляем кнопку создать новую папку в MacOS
    ] 
  }, (openPath) => {
    console.log(openPath) // Получим массив с путями к файлам
  })
}

function saveDialog() {
  dialog.showSaveDialog({
    defaultPath: './images', // Путь по умолчанию 
  }, (filename) => {
      console.log(filename) // Получим путь с именем файла
  })
}

function messageDialog() {
  let buttons = ['Yes', 'No', 'Maybe'];
  dialog.showMessageBox({
    buttons: buttons,
    title: 'Electron Message Dialog',
    message: 'Please select an answer',
    detail: 'A more descriptive message with some details',
  }, (buttonIndex) => {
      console.log('User selected: ' + buttons[buttonIndex]) // Получим ответ из диалога
  })
}

function messageErrorDialog() {
  dialog.showErrorBox(
    'Electron Error Message',
    'Error Message'
  )
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
  //  mainWindow.webContents.openDevTools() 

  // Показываем диалог через 3 секунды после появления окна приложения
  // setTimeout(showDialog, 3000);
  // setTimeout(saveDialog, 3000);
  // setTimeout(messageDialog, 3000);
  setTimeout(messageErrorDialog, 3000);

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
