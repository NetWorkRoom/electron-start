# Electron - API
Список основных методов и функций для создания приложения на Electron.js

### BrowserWindow
```
// Кроме размеров окна можно задавать и другие параметры при инициализации приложения, 
// для примера показаны наиболее популярные свойства
    mainWindow = new BrowserWindow({
    x: 1200, // отступ окна слева от экрана
    y: 300, // отступ окна сверху от экрана
    width: 800,     // ширина
    height: 600,    // высота
    show: true,    // показывать после содания
    minWidth: 300, // минимальная ширина окна
    minHeight: 200, // минимальная высота окна
    maxWidth: 1200, // максимальная ширина окна
    maxHeight: 500, // максимальная высота окна
    resizable: false, // будет ли окно изменять размеры
    backgroundColor: '#99a6c1', // цвет фона окна
  })
```
Более правильный вариант загрузки окна, пользователь увидит содержимое окна только после полной его загрузки.
```
const { BrowserWindow } = require('electron')
let mainWindow = new BrowserWindow({ 
  width: 800,     // ширина
  height: 600,    // высота
  show: false,    // скрыть после содания
})
mainWindow.once('ready-to-show', () => {
  mainWindow.show() // показать окно после полной загрузки
})
```
Можно создавать приложение состоящее из нескольких окон для этого достаточно создать доплнительно экземпляры объекта BrowserWindow
```
childWindow = new BrowserWindow({width: 800, height: 400})
childWindow.loadFile(`${path.join(__dirname, "/index_child.html")}`);
childWindow.on('ready-to-show', () => { childWindow.show() })
childWindow.on('closed', () => { childWindow = null })
```
Для того чтобы окны имели взаимоотношение радитель-ребенок при создании дочернего окна
нужно указвть его родителя. Функционал хорошо работат в MacOS, в Windows к сожалению нет.
```
childWindow = new BrowserWindow({width: 800, height: 400, parent: mainWindow})
```
Создание дочернего окна в виде модального окна внутри родительского окна. Функционал работат в MacOS, в Windows к сожалению нет.
```
childWindow = new BrowserWindow({width: 800, height: 400, parent: mainWindow, modal: true,})
```
Существует возможность выключить стандартную рамку и топбар у окна, но такое окно нельзя будет перемещать для этого добавляем к разметке специальные свойства CSS
```
childWindow = new BrowserWindow({width: 800, height: 400, parent: mainWindow, frame: false })
// CSS показан для примера
 * { cursor: default; }
body {
  /* убираем выделение текста и изображений */
  -webkit-user-select: none;
  /* позволяем курсором двигать окно используя данный элемент в разметке */
  -webkit-app-region: drag;
}
select {
  /* запрещаем двигать курсором окно используя данный элемент в разметке */
  -webkit-app-region: no-drag;
}
```
Для того чтобы после закрытия окна сохранялось его положение после закрытия, лучше всего воспользоватся дополнительным модулем - [electron-window-state]
```
// Установить модуль
npm install --save electron-window-state 
// или
yarn add electron-window-state
```
Подключаем модуль запоминающий положение и размер окна на экране перед закрытием
```
const windowStateKeeper = require('electron-window-state');
```
Устанавливаем в  windowStateKeeper размеры окна по умолчанию
```
let mainWindowState = windowStateKeeper({
  defaultWidth: 800,
  defaultHeight: 400
});
```
Добвляем параметры в BrowserWindow
```
mainWindow = new BrowserWindow({
  x: mainWindowState.x, // значение до закрытия окна по x
  y: mainWindowState.y, // значение до закрытия окна по y
  width: mainWindowState.width, // значение width до закрытия окна
  height: mainWindowState.height, // значение height до закрытия окна
})
```
Инициализируем слежение за положением и размером окна
```
mainWindowState.manage(mainWindow)
```

Методов и параметров значительно больше чем рассмотрено здесь, для поиска необходимого решения по манипуляциям с окнами лучше всего обратиться к документации - [BrowserWindow] и [webContents]


[BrowserWindow]: https://electronjs.org/docs/api/browser-window
[webContents]: https://electronjs.org/docs/api/web-contents
[electron-window-state]: https://www.npmjs.com/package/electron-window-state
