# Electron - Полезные настройки и инструменты
Список дополнительных инструментов для создания приложения на Electron.js

### [clipboard]
Выполняет копирование и вставку в буфер обмена системы.
Примеры работы с буфером обмены системы
```
const { clipboard } = require('electron')
// Текст будет записан в clipboard
clipboard.writeText('Text from Electrom Renderer')
// Текст будет взят из clipboard
console.log(clipboard.readText())
```
Пример получения ссылки на изображение с последующим монтированием на странице
index.html
```
<img src="" id="logoImg">
```
renderer.js
```
let nativeLogoImg = clipboard.readImage();
document.getElementById('logoImg').src = nativeLogoImg.toDataURL();
```

### [Закадровый рендеринг]
Закадровый рендеринг позволяет получить содержимое окна браузера в растровом изображении, поэтому его можно отобразить в любом месте, например, на текстуре в 3D-сцене. 

Пример получения заголовка загружаемого контента без его отображения 
main.js
```
const { app, BrowserWindow } = require('electron');
app.disableHardwareAcceleration();
let bgWin;

app.on('ready', () => { 
  bgWin = new BrowserWindow({
    webPreferences: {
      offscreen: true
    }
  })

  bgWin.loadURL('https://github.com/');

  bgWin.webContents.on('did-finish-load', () => { 
    console.log(bgWin.getTitle());
    app.quit();
  })
```
Пример получения снимков главной страницы сайта
main.js
```
app.disableHardwareAcceleration();

let bgWin;

app.on('ready', () => { 
  bgWin = new BrowserWindow({
    show: false,
    width: 1200,
    height: 800,
    webPreferences: {
      offscreen: true
    }
  })

  bgWin.loadURL('https://github.com/');

  let i = 1;

  bgWin.webContents.on('paint', (e, dirtyArea, nativeImage) => {
    fs.writeFile(`C:/Users/Master/Desktop/screenshot_${i}.png`, nativeImage.toPNG(), (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
    i++;
  })

})
```

[clipboard]: https://electronjs.org/docs/api/clipboard
[Закадровый рендеринг]: https://electronjs.org/docs/api/clipboard
