# Electron - Полезные настройки и инструменты
Список дополнительных инструментов для создания приложения на Electron.js

### [webFrame]
#### Первый пример использования webFrame  
Увеличение или уменьшение размера контента в окне приложения
```
<!-- Создаем разметку в index.html -->
<h1>webFrame</h1>
<img src="http://placehold.it/200x150" alt="">
<hr>
<button id="zoom_up">Увеличить</button>
<button id="zoom_down">Уменьшить</button>
<button id="zoom_reset">Вернуть</button>
```
Подключаем в рендер-процессе webFrame и подключаем слушателей событий к кнопкам
```
<script>
// подключаем класс webFrame
  const { webFrame } = require('electron')

  // Размер контента вэкране по умолчанию
  let zoom = 0;

  // подключаем слушатель событий к кнопке Увеличить
  document.getElementById('zoom_up').addEventListener('click', () => {
    // Вызываем метод .setZoomLevel и предаем значение zoom увеличеное на 1
    webFrame.setZoomLevel(++zoom)
  })

  // подключаем слушатель событий к кнопке Уменьшить
  document.getElementById('zoom_down').addEventListener('click', () => {
    // Вызываем метод .setZoomLevel и предаем значение zoom уменьшеное на 1
    webFrame.setZoomLevel(--zoom)
  })

  // подключаем слушатель событий к кнопке Вернуть
  document.getElementById('zoom_reset').addEventListener('click', () => {
    // Вызываем метод .setZoomLevel и предаем значение zoom равное 0
    webFrame.setZoomLevel(zoom = 0)
  })

</script>
```
#### Второй пример использования webFrame  
Запуск js кода непоредственно на странице используя тег textarea
```
<!-- Создаем разметку в index.html -->
<h3>Напишите JavaScript код</h3>
<textarea id="code" name="name" id="" cols="30" rows="10"></textarea>
<hr>
<button id="run_js">Запустить</button>
```
Подключаем слушатель событий к кнопке Запустить
```
document.getElementById('run_js').addEventListener('click', () => {
  let code = document.getElementById('code').value
  // Вызываем метод .executeJavaSript и предаем в него значение code
  webFrame.executeJavaScript(code)
})
```
#### Третий пример использования webFrame
Пример получение объекта с информацией о элементах на странице
```
let resourceUsage = webFrame.getResourceUsage()
console.log(resourceUsage)
```

### [Тег \<webview\>]
Позволяет запускать дочернии рендер-процессы внутри основного рендер процесса
чем то напоминает \<iframe\> 
```
<webview src="page1.html">
```
Пример с отслеживанием загрузки страницы изменением цвета фона страницы
```
// Отслеживание событий загрузки контента в webview
const webview = document.getElementById('webviewtag')
webview.addEventListener('did-start-loading', () => {
  console.log('Started Loading WebView!')
})

webview.addEventListener('did-stop-loading', () => {
  console.log('Finished Loading WebView!')
  // Меняем цвет фона окна после загрузки
  webview.insertCSS('body{background-color: orange !important;}')
})

// Получаем доступ к элементами для загрузки страницы
const url = document.getElementById('url');
const load = document.getElementById('load');
const currentPage = document.getElementById('currentPage');

// Загружаем страницу
load.addEventListener('click', () => {
  webview.loadURL(url.value)
  url.value = '';
});

// Выводим на странице url загруженного контента
  webview.addEventListener('did-navigate', (event) => {
  currentPage.innerHTML = event.url
})

// Выводим на странице сообщение об ошибке загрузки
  webview.addEventListener('did-fail-load', (event) => {
  currentPage.innerHTML = 'Failed to load URL'
})
```

[webFrame]:https://electronjs.org/docs/api/web-frame
[Тег \<webview\>]: https://www.npmjs.com/package/windows-build-tools
