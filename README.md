# Electron - Полезные настройки и инструменты
Список дополнительных инструментов для создания приложения на Electron.js

1. Для нативной работы с модулями Node.js устанавливаем глобально -  [windows-build-tools]
```
npm install --global --production windows-build-tools
// or
yarn global add windows-build-tools
```

2. В проект добавляем [electron-reload] - позволяет обновлять окно без перезапуска проекта.  
   Если используем Electron совместно с React CRA или Vue CLI данный модуль не нужен 
```
yarn add --dev electron-reload
// в main.js прописываем строку

require('electron-reload')(__dirname);
```

3. В зависимости от того как будет реализовано приложение и какая у него будет структура 
  можно по разному прописывать пути к index.html
```
// 1 - mainWindow.loadFile('index.html');
// 2 - mainWindow.loadFile(`${path.join(__dirname, "/index.html")}`);
// 3 - mainWindow.loadUrl('http://localhost:3000');
// 4 - mainWindow.loadUrl(`file://${__dirname}/index.html`);
// 5 - mainWindow.loadUrl(`file://${path.join(__dirname, "/public/index.html")}`);
```

4. Для отделения кода работающего только для разработки, добавляем модуль - [electron-is-dev]
```
npm install electron-is-dev
// или
yarn add electron-is-dev
// в main.js прописываем и добавляем необходимый код
const isDev = require('electron-is-dev');
 if (isDev) {
    console.log('Running in development');
} else {
    console.log('Running in production');
}
```

5. Для того чтобы убрать из консоли сообщения о недостаточной безопасности можно добавить строку, использовать только для разработки, для продакшен нужно настроить [безопасность] правильно.
Добавляем так же webPreferences в объект BrowserWindow
```
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

// добавляем webPreferences в объект BrowserWindow
mainWindow = new BrowserWindow({
  webPreferences: {					
    nodeIntegration: true,
    webSecurity: false
  }
});
```

6. Для установки в DevTools расширений для работы с популярными фреймворками устанавливаем - [electron-devtools-installer]. В данном проекте не установлен.
```
npm install electron-devtools-installer --save-dev
// or
yarn add electron-devtools-installer --dev

// в main.js прописываем 
const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');
// добавляем необходимые расширение EMBER_INSPECTOR, REACT_DEVELOPER_TOOLS,
// BACKBONE_DEBUGGER, JQUERY_DEBUGGER,  ANGULARJS_BATARANG, VUEJS_DEVTOOLS,  REDUX_DEVTOOLS, REACT_PERF,
// CYCLEJS_DEVTOOL, MOBX_DEVTOOLS,  APOLLO_DEVELOPER_TOOLS

// инсталлируем расширение перед вызовом DevTools
installExtension(REACT_DEVELOPER_TOOLS);
mainWindow.webContents.openDevTools();
```

7. Для установки в DevTools расширения [Devtron], которое помогает тестировать код, отслеживать баги и оптимально отлаживать приложении. Устанавливаем модуль в проект и инсталлируем его.
```
npm install --save-dev devtron
// или
yarn add --dev devtron

// Прописываем в консоли запущенного приложения
require('devtron').install();
``` 

[electron-reload]:https://www.npmjs.com/package/electron-reload
[windows-build-tools]: https://www.npmjs.com/package/windows-build-tools
[electron-is-dev]: https://www.npmjs.com/package/electron-is-dev
[electron-devtools-installer]: https://www.npmjs.com/package/electron-devtools-installer
[Devtron]: https://electronjs.org/devtron
[безопасность]:https://electronjs.org/docs/tutorial/security
