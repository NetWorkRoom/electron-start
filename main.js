// Модули для управления жизнью приложения и создания собственного окна браузера.
const { app, BrowserWindow, session } = require('electron');
const path = require("path");
const readline = require('readline');

// Перерисовка окна при внесении изменений, без необходимости перезапускать проект. 
require('electron-reload')(__dirname);

// Для отключения сообщений о недостаточной безопасности добавляем строку
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

// Сохранztv глобальную ссылку на объект window, В противном случае окно будет
// закрываться автоматически, если объект JavaScript является объектом сборки мусора.
let mainWindow;
// let altWindow;

function createWindow() {

  // let appSession = session.fromPartition('persist:partitionOne')

  // Создаем окно браузера.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      //session: appSession,
      //partition: 'persist:partitionOne',
      nodeIntegration: true,
      webSecurity: false
    }
  })

  // altWindow = new BrowserWindow({
  //   width: 800,
  //   height: 600,
  //   webPreferences: {
  //     nodeIntegration: true,
  //     webSecurity: false
  //   }
  // })

  // let defaultSession = session.defaultSession;
  // console.log('defaultSession - ', defaultSession);  

  // и загружаем файл index.html он содержит наше приложение.
  // mainWindow.loadFile('index.html');
  // Вариант с указанием пути к файлу
  mainWindow.loadFile(`${path.join(__dirname, "/index.html")}`);
  // mainWindow.loadURL(`https://github.com`);
  // altWindow.loadFile(`${path.join(__dirname, "/index_alt.html")}`);

  let mainSession = mainWindow.webContents.session;  
  // console.log('mainSession - ', mainSession);
  // Очищаем значения localStorage в mainSession
  // mainSession.clearStorageData()

  // mainSession.cookies.get({ name: 'coocie1'}, (error, cookies) => { 
  //   console.log('cookies - ', cookies);
  // })

  mainSession.on('will-download', (event, downloadItem, webContents) => {   
    
    // Получить имя скачиваемого файла
    let file = downloadItem.getFilename();
    console.log('file - ', file);
    // Получить размер скачиваемого файла
    let size = downloadItem.getFilename();
    console.log('size - ', size);
    // Указываем путь куда сохраняем файл
    downloadItem.setSavePath('downloads/' + file)  

    // Сообщение о процессе загрузки
    downloadItem.on('updated', (event, state) => {

      // Получить размер полученых байт 
      let progress = Math.round((downloadItem.getReceivedBytes() / size) * 100)
      
      if (state === 'progressing') {
        // Выводим в консоль процент загрузки
        process.stdout.clearLine();
        process.stdout.clearTo(0);
        process.stdout.write('Downloaded - ' + progress + '%');
      }     
    })
    // Сообщение о успешной загрузке 
    downloadItem.once('done', (event, state) => {
      if (state === 'completed') {
        console.log('Download successfully')
      } else {
        console.log(`Download failed: ${state}`)
      }
    })

  })

  // mainSession.cookies.set({
  //   url: 'https://myapp.com',
  //   name: 'coocie1',
  //   expirationDate: 1611082452,
  //   value: 'coocie_value',
  //   domain: 'myapp.com'
  // }, (error) => {

  //   console.log('Cookies Set');
  //   mainSession.cookies.get({}, (error, cookies) => {
  //     console.log('cookies - ', cookies);
  //   })

  // })

  // let altSession = altWindow.webContents.session;
  // console.log('altSession - ', altSession);
  
  // console.log('Object.is - ', Object.is(mainSession, defaultSession));
 //  console.log('Object.is - ', Object.is(mainSession, appSession));
  
  // Очищаем значения localStorage в altSession
  // altSession.clearStorageData()

  // Открываем инструменты разработчика (DevTools). 
  // Если необходимо раскомментируйте строку ниже
  // mainWindow.webContents.openDevTools()
  // altWindow.webContents.openDevTools()

  // Запускается при закрытии окна.
  mainWindow.on('closed', function () { mainWindow = null })
  // altWindow.on('closed', function () { altWindow = null })
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
  // if (altWindow === null) {
  //   createWindow()
  // }
})

// В этот файл можно включить остальную часть кода основного процесса приложения.
// Вы также можете поместить его в отдельные файлы и вызвать их здесь.
