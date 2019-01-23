// Этот файл подключается к файлу index.html и
// написаный здесь код будет выполняться в процессе визуализации приложения.
// Весь Node.js APIs доступен в этом процессе.

const remote = require('electron').remote;
// const dialog = require('electron').remote.dialog;
const { dialog, BrowserWindow, app } = require('electron').remote;

// Пример вызова системного диалогового попап окна
// dialog.showMessageBox({ message: 'A message dialog invoked via renderer.js', buttons: ['OK'] })

// Пример создания нового окна
// let win = new BrowserWindow({width: 400, height: 500})
// win.loadURL('http://google.com')

// Пример получения данных из global
// console.log(remote.getGlobal('app_versian'))

// Пример вызова системного диалогового попап окна, с вопросом закрыть приложение или нет
dialog.showMessageBox({ message: 'Are you sure you want to quit?', buttons: ['Quit', 'Cancel'] }, (buttonIndex) => {
	if (buttonIndex === 0) app.quit()
 })

