// Этот файл подключается к файлу index.html и
// написаный здесь код будет выполняться в процессе визуализации приложения.
// Весь Node.js APIs доступен в этом процессе.

const electron = require('electron')
const displays = electron.screen.getAllDisplays();

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
// setTimeout(() => { 
// 	console.log('hanging');
// 	process.hang();
// }, 5000)

// setTimeout(process.crash, 5000)

// console.log(process.getSystemMemoryInfo());

// console.log('Process Type - ', process.type);
// console.log('Electron Version - ', process.versions.electron);
// console.log('Chrome (Chromium) Version - ', process.versions.chrome);
// console.log('Resource Path - ', process.resourcesPath);
