# Electron - Полезные настройки и инструменты
Список дополнительных инструментов для создания приложения на Electron.js

### [shell]
Управление файлами и URL-ами, используя стандартные приложения для их открытия.
Модуль shell предоставляет функции, относящиеся к десктопной интеграции.
Пример открытия ссылки в стандартном браузере пользователя:
```
const { shell } = require('electron')
shell.openExternal('https://github.com')
```

Пример создания области drag and prop для добавления и открытия файлов и области для их удаления
```
<style media="screen">
  .box {
    border: 5px dashed black;
    padding: 3rem 4rem;
    color: white;
    float: left;
  }
  #filebox {
    background-color: green;
    margin-right: 20px;
  }
  #trashbox {
    background-color: red;
  }
</style>
<div class="box" id="filebox">
  Open File Here!
</div>

<div class="box" id="trashbox">
  Delete File Here!
</div>
``` 
renderer.js
```
let myFile = null;

const fileBox = document.getElementById('filebox');
const trashBox = document.getElementById('trashbox');

fileBox.ondragover = fileBox.ondragend = fileBox.ondragleave =
	trashBox.ondragover = trashBox.ondragend = trashBox.ondragleave = () => { 
	return false;
};

fileBox.ondrop = (event) => { 
	console.log(event.dataTransfer.files)
	myFile = event.dataTransfer.files[0].path;
	shell.openItem(myFile)
	return false;
}

trashBox.ondrop = (event) => {
	console.log(event.dataTransfer.files)
	myFile = event.dataTransfer.files[0].path;
	shell.moveItemToTrash(myFile)
	return false;
}
```
### [nativeImage]
Создает иконки приложения, в том числе для системного лотка (Windows), дока (macOS), используя файлы PNG и JPG.
```
const { BrowserWindow, Tray } = require('electron')
const appIcon = new Tray('/Users/somebody/images/icon.png')
let win = new BrowserWindow({ icon: '/Users/somebody/images/window.png' })
console.log(appIcon, win)
````
или
```
const { clipboard, Tray } = require('electron')
const image = clipboard.readImage()
const appIcon = new Tray(image)
console.log(appIcon)
````
Добавление изображения на страницу в формате base64
```
const { nativeImage } = require('electron')  ;    
let logo = nativeImage.createFromPath('logo.png');
let logoSize = logo.getSize();

console.log(logo.getSize());
console.log(logo.toDataURL());

document.getElementById('logoImage')
.src = logo.resize({width: logoSize.width/2 , height: logoSize.height/2 }).toDataURL()
```
Конвертация файла png в afqk формата jpg используя возможности Node.js 
```
const fs = require('fs');
const { nativeImage } = require('electron')  ;    
let logo = nativeImage.createFromPath('logo.png');

fs.writeFile('logo.jpg', logo.toJPEG(100), (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});

```
[shell]: https://electronjs.org/docs/api/shell
[nativeImage]: https://electronjs.org/docs/api/native-image
