# Electron - API
Список основных методов и функций для создания приложения на Electron.js

### app
```
// Определяем создано ли было окно приложения
app.isReady() // djpdhfoftn true или false

// Вариант с задержкой
setTimeout(() => {
  console.log("app.isReady() - ", app.isReady())
}, 3000);

// Получаем список всех доступных методов
app.on('ready', (e) => {
  console.log(e);
  -- // --
})

// Метод запускает указанный внутри него код перед завершением работы приложения 
app.on('before-quit', () => {
  console.log('Приложение прекращает свою работу!');
})

// Метод запускает указанный внутри него код, когда приложения не активно не в фокусе
app.on('browser-window-blur', () => {
  console.log('The application is not active, not in focus!');
})

// Метод запускает указанный внутри него код, когда приложения активно и оно в фокусе
app.on('browser-window-focus', () => {
  console.log('The app is active, in focus!');
})

// Метод app.quit(); завршает работу приложения, в примере через 3 секунды
  setTimeout(() => {
    app.quit();
  }, 3000)

// Получение пути файловой системы, где находится приложение
console.log(app.getAppPath());

// Получение путей к стандартным папкам файловой системы
console.log(app.getPath('desktop'));
console.log(app.getPath('music'));
console.log(app.getPath('temp'));
console.log(app.getPath('userData'));

// Задаем имя приложения. будет отображатся если не заданов index.html
app.setName('MyFirstApp')
```
