// Этот файл подключается к файлу index.html и
// написаный здесь код будет выполняться в процессе визуализации приложения.
// Весь Node.js APIs доступен в этом процессе.

const { ipcRenderer } = require('electron');

let mainProcess = ipcRenderer.sendSync('sync-channal', {name: 'John', surname: 'Dou'})
console.log(mainProcess);

let mainProcess2 = ipcRenderer.sendSync('sync-channal2', { name: 'Bob', surname: 'Mob' })
console.log(mainProcess2);

// setTimeout(() => { 
// 	ipcRenderer.send('ch1', { close: true });
// }, 5000)

// ipcRenderer.on('private', (event, args) => {
// 	console.log(args);
// })

// Отправляем сообщение в главный процесс - channalOne
ipcRenderer.send('channalOne', 'Hello from the renderer process - channalOne')

// Отправляем сообщение в главный процесс - channalTwo
ipcRenderer.send('channalTwo', 'Hello from the renderer process - channalTwo')

// Создаем слушатель для получения данных из главного процесса - channalOne
ipcRenderer.on('channalOne', (event, args) => {
	console.log(args);
})

// Создаем слушатель для получения данных из главного процесса - channalTwo
ipcRenderer.on('channalTwo', (event, args) => {
	console.log(args);
})
