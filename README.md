# Electron - API
Список основных методов и функций для создания приложения на Electron.js

### [session]
Для того чтобы получить доступ к ссесии окна достаточно вызвать свойство ssesiion
```
let mainSession mainWindow.webContents.session;  // получим Session {}
let altSession = altWindow.webContents.session; // получим Session {}
```
В стандартной реализации, не зависимо сколько окон в прижении они имеют один общий объект Session {} 
```
 let defaultSession = session.defaultSession;
```
Для того чтобы назначить для окна свою ссесию нужно ее отдельно создать и назначить окну и в названии должен стоять префикс persist:  
```
let appSession = session.fromPartition('persist:partitionOne')
 mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      session: appSession, // подключеем индивидуальную сессию  
    }
  })
``` 
Написанное выше можно записать короче, не надо создовать let appSession
```
mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      partition: 'persist:partitionOne', // подключеем индивидуальную сессию 
    }
  })
```
Для очичистки значения localStorage в текущей сессии используем .clearStorageData()
```
mainSession.clearStorageData()
```
### [cookies]
Для получения значений cookies используем конструкцию gh  запуске окна мы получим cookies с сайта
```
mainWindow.loadURL(`https://github.com`);
let mainSession = mainWindow.webContents.session; 
mainSession.cookies.get({}, (error, cookies) => { 
  console.log('cookies - ', cookies);
})
```
Мы можем записать свои cookies - 
```
mainSession.cookies.set({
	url: 'https://myapp.com',
	name: 'coocie1',
	value: 'coocie_value',
	domain: 'myapp.com'}, (error) => {

	console.log('Cookies Set');
	mainSession.cookies.get({}, 
	(error, cookies) => { 
  	console.log('cookies - ', cookies);
	});

});
```
Для получения определенной записи в запросе указываем искомое значение, например имя
```
 mainSession.cookies.get({ name: 'coocie1'}, (error, cookies) => { 
    console.log('cookies - ', cookies);
})
```

### [downloaditem]
Для работы с загружаемыми файлами можно использовать событие 'will-download',
Ниже приведен пример в котором показаны основные возможности данного решения
```
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
```
[session]:https://electronjs.org/docs/api/session
[cookies]:https://electronjs.org/docs/api/cookies
[downloaditem]:https://electronjs.org/docs/api/download-item
