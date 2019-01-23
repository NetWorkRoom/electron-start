# Electron - Полезные настройки и инструменты
Список дополнительных инструментов для создания приложения на Electron.js

### [remote]
Позволяет использовать модули главного процесса из рендер-процесса.
Несколько вариантов подключения объекта remote в renderer.js
```
// 1. - const remote = require('electron').remote;
// 2. - const dialog = require('electron').remote.dialog;
// 3. - const { dialog, BrowserWindow, app } = require('electron').remote;
```
Пример вызова системного диалогового попап окна из renderer.js
```
dialog.showMessageBox({ message: 'A message dialog invoked via renderer.js', buttons: ['OK'] })
```
Пример создания нового окна из renderer.js
```
let win = new BrowserWindow({width: 400, height: 500})
win.loadURL('http://google.com')
```
Пример получения данных из global
```
// Прописываем в main.js - global['app_versian'] = 1.1 
// Вызываем в renderer.js
console.log(remote.getGlobal('app_versian'))
```
### [BrowserWindowProxy]
Класс позволяет манипулировать дочерним окном браузера из renderer.js или index.html
```
<!-- Варианты ссылок в index.html -->
<a href="http://google.com" target="_blank">Open Google</a>
<a onclick="open_win()">Open Google</a>
<a onclick="close_win()">Close Google</a>
<a onclick="alert_win('An alert initiated by main window')">Alert on Google</a>
<a id="google_link">Open Google from ID</a>
```
методы в Renderer
```
 let win;
// Открываем окно с сайтом
const open_win = () => {
  win = window.open('http://google.com')
}
// Закрываем окно с сайтом
const close_win = () => {
  win.close()
  console.log('Closing Child Window!')
}
// Запускаем алерт с сообщением
const alert_win = (msg) => {
 win.eval(`alert('${msg}')`)          
}
// Открываем окно с сайтом по id и заданными параметрами окна
document.getElementById('google_link').addEventListener('click', () => {
  win = window.open('http://google.com', 'Google Window', 'resizable=no,width=960')
});

```
[remote]:https://electronjs.org/docs/api/remote
[BrowserWindowProxy]:https://electronjs.org/docs/api/browser-window-proxy
