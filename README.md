# Electron - Полезные настройки и инструменты
Список дополнительных инструментов для создания приложения на Electron.js

### [process]
Объект Electron process является расширенной версией объекта Node.js process,
его можно вызывать как в main так и в renderer процессах
main.js
```
console.log('Process Type - ', process.type);
console.log('Electron Version - ', process.versions.electron);
console.log('Chrome (Chromium) Version - ', process.versions.chrome);
console.log('Resource Path - ', process.resourcesPath);
console.log(process.getSystemMemoryInfo());
```
renderer.js
```
console.log('Process Type - ', process.type);
console.log('Electron Version - ', process.versions.electron);
console.log('Chrome (Chromium) Version - ', process.versions.chrome);
console.log('Resource Path - ', process.resourcesPath);
console.log(process.getSystemMemoryInfo());
```
Примеры использования - process 
Подключем слушатель на событие 'сrashed', если оно происходит приложение перезагрузится
```
// main.js
mainWindow.on('crashed', () => {
  console.log('MainWindow Renderer Process Crashed. Reloading');
  mainWindow.reload();
})

// renderer.js 
setTimeout(process.crash, 5000)
```
Устанавливаем кнопку в index.html, по клику будет появлятся сообщение "Hello", но через 5 секунд кнопка теряет свою работоспособность.
```
// index.html
<button onclick="alert('Hello!')">Greet</button>

// renderer.js 
setTimeout(() => { 
	console.log('hanging');
	process.hang();
}, 5000)
```

### [screen]
Предоставляет информацию о размере экрана, дисплеях, позиции курсора.
Пример получения информации о мониторе, где запущена программа
```
const electron = require('electron')
const displays = electron.screen.getAllDisplays();

// Выведет информацию о разрешении монитора
console.log(displays[0].size.width, displays[0].size.height);
// Для отображения нужен второй монитор
// console.log(displays[1].size.width, displays[1].size.height);
console.log(displays[0].bounds.x, displays[0].bounds.y);
// Для отображения нужен второй монитор
// console.log(displays[1].bounds.x, displays[1].bounds.y);

// Сработает при изменении размеров монитора
electron.screen.on('display-metrics-changed', (event, display, changeMetrics) => { 
	console.log(display);
	console.log(changeMetrics);
})
```
Пример получения коррдинат при клике курсором мыши
```
// index.html
<body onclick="showClickPoint()">
<!-- Контент -->
</body>
<script>
  const electron = require('electron');
  function showClickPoint() {
    // Выведет в консоли объект с координатами, где кликнули курсором
    console.log(electron.screen.getCursorScreenPoint());
  }
</script>
</body>
```
Пример настроек для открытия окна на ширину и высоту монитора
```
const electron = require('electron');
// Получаем размеры и координаты монитора
const display = electron.screen.getPrimaryDisplay();

// Создаем окно браузера.
mainWindow = new BrowserWindow({
  width: display.size.width,
  height: display.size.height,
  x: display.bounds.x,
  y: display.bounds.y,
})
```
[process]: https://electronjs.org/docs/api/process
[screen]: https://electronjs.org/docs/api/screen
