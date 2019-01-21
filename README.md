# Electron - Полезные настройки и инструменты
Список дополнительных инструментов для создания приложения на Electron.js

### [dialog]
Для показа в окне стандартных диалогов для открытия и сохранения файлов, вывода предупреждениий т.п. используют [dialog]

Пример диалогового окна для открытия файла -
```
function showDialog() {
  dialog.showOpenDialog({
    defaultPath: './images', // Путь по умолчанию 
    buttonLabel: 'Select Logo', // Название кнопки в диалоге
    properties: [
      'openFile', // Указываем тип диалога 
      'multiSelections', // Указываем возможность выбрать несколько файлов
      'createDirectory' // Добавляем кнопку создать новую папку в MacOS
    ] 
  }, (openPath) => {
    console.log(openPath) // Получим массив с путями к файлам
  })
}
```

Пример диалогового окна для сохранения файла
```
function saveDialog() {
  dialog.showSaveDialog({
    defaultPath: './images', // Путь по умолчанию 
  }, (filename) => {
      console.log(filename) // Получим путь с именем файла
  })
}
```

Пример диалогового окна для показа сообщения с вопросами к пользователю
```
function messageDialog() {
  let buttons = ['Yes', 'No', 'Maybe'];
  dialog.showMessageBox({
    buttons: buttons,
    title: 'Electron Message Dialog',
    message: 'Please select an answer',
    detail: 'A more descriptive message with some details',
  }, (buttonIndex) => {
      console.log('User selected: ' + buttons[buttonIndex]) // Получим ответ из диалога
  })
}
```

Пример диалогового окна для сообщения о ошибке
```
function messageErrorDialog() {
  dialog.showErrorBox(
    'Electron Error Message',
    'Error Message'
  )
}
```

[dialog]:https://electronjs.org/docs/api/dialog
