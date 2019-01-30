# Electron - Полезные настройки и инструменты
Список дополнительных инструментов для создания приложения на Electron.js

### [Online/Offline Status]
Online и offline событие может быть обнаружено в процессе визуализации с помощью navigator.onLine, частью стандартного API в HTML5. 
main.js
```
const { app, BrowserWindow } = require('electron')

let onlineStatusWindow

app.on('ready', () => {
  onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, show: false })
  onlineStatusWindow.loadURL(`file://${__dirname}/online-status.html`)
})
```
online-status.html
```
<!DOCTYPE html>
<html>
<body>
<script>
  const alertOnlineStatus = () => {
    window.alert(navigator.onLine ? 'online' : 'offline')
  }

  window.addEventListener('online',  alertOnlineStatus)
  window.addEventListener('offline',  alertOnlineStatus)

  alertOnlineStatus()
</script>
</body>
</html>
```
Могут быть случаи, когда вы хотите ответить на эти события в основном процессе. Однако основной процесс не имеет объекта navigator и поэтому не может обнаружить эти события напрямую. Используя утилиты межпроцессной связи Electron, события могут быть перенаправлены в основной процесс и обработаны по мере необходимости, как показано в следующем примере.
main.js
```
const { app, BrowserWindow, ipcMain } = require('electron')
let onlineStatusWindow

app.on('ready', () => {
  onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, show: false })
  onlineStatusWindow.loadURL(`file://${__dirname}/online-status.html`)
})

ipcMain.on('online-status-changed', (event, status) => {
  console.log(status)
})
```
online-status.html
```
<!DOCTYPE html>
<html>
<body>
<script>
  const { ipcRenderer } = require('electron')
  const updateOnlineStatus = () => {
    ipcRenderer.send('online-status-changed', navigator.onLine ? 'online' : 'offline')
  }

  window.addEventListener('online',  updateOnlineStatus)
  window.addEventListener('offline',  updateOnlineStatus)

  updateOnlineStatus()
</script>
</body>
</html>
```
### [Battery Status]
Отслеживаем состояние заряда батареи у ноутбука
```
window.navigator.getBattery().then((battery) => {
   // Получим объект с полями содержащими информацию о состоянии источника питания
	console.log(battery)
	battery.onchargingchange = () => { 
		console.log(battery.charging)
	}
})
```
[Online/Offline status]: https://electronjs.org/docs/tutorial/online-offline-events
[Battery Status]: https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API
