# Electron - Полезные настройки и инструменты
Список дополнительных инструментов для создания приложения на Electron.js

### [ipcMain] и [ipcRenderer]
Для организации взаимодействия программной части приложения и оболичкой электрона используют классы ipcMain и ipcRenderer  
#### Первый вариант
В этой реализации будет работать только один канал   
Файл - main.js 
```
// ipcMain подключаем в main.js 
const { app, BrowserWindow, ipcMain } = require('electron');

// Создаем слушателя события для полученяи данных из renderer
ipcMain.on('channalOne', (event, args) => { 
  console.log(args);

  // Отправляем сообщение в renderer процесс
  event.sender.send('channalOne','Message resieved on the main process')
})
```
Файл - renderer.js 
```
// ipcMain подключаем в renderer.js 
const { ipcRenderer } = require('electron');

// Отправляем сообщение в главный процесс
ipcRenderer.send('channalOne', 'Hello from the renderer process')

// Создаем слушатель для получения данных из главного процесса
ipcRenderer.on('channalOne', (event, args) => {
	console.log(args);
})
```
#### Второй вариант 
Файл - main.js 
```
 mainWindow.webContents.on('did-finish-load', () => { 
	 // Отправляем сообщение в renderer процесс
    mainWindow.webContents.send('private', 'Message from Main Precess to MainWindow')
  })

```

Файл - renderer.js 
```
const { ipcRenderer } = require('electron');

// Создаем слушатель для получения данных из главного процесса
ipcRenderer.on('private', (event, args) => {
	console.log(args);
})
```
#### Третий вариант 

Файл - main.js 
```
ipcMain.on('sync-channal', (event, args) => { 
  console.log('Sync message received');
  console.log(args.name);
  console.log(args.surname);

  setTimeout(() => { 
    event.returnValue = 'A synchronous response from the main process';
  }, 3000)
 
})
```

Файл - renderer.js 
```
const { ipcRenderer } = require('electron');

let mainProcess = ipcRenderer.sendSync('sync-channal', {name: 'John', surname: 'Dou'})
console.log(mainProcess);
```

#### Пример работы таймера 

Файл - main.js 
```
ipcMain.on('ch1', (event, args) => {
  if (args.close) process.exit();
})
```

Файл - renderer.js 
```
setTimeout(() => { 
	ipcRenderer.send('ch1', { close: true });
}, 5000)
```

[ipcMain]:https://electronjs.org/docs/api/ipc-main
[ipcRenderer]:https://electronjs.org/docs/api/ipc-renderer

