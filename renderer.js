// Этот файл подключается к файлу index.html и
// написаный здесь код будет выполняться в процессе визуализации приложения.
// Весь Node.js APIs доступен в этом процессе.

const { clipboard } = require('electron')
// Текст будет записан в clipboard
clipboard.writeText('Text from Electrom Renderer')
// Текст будет взят из clipboard
console.log(clipboard.readText())
// Пример получения ссылки на изображение с последующим монтированием на странице
let nativeLogoImg = clipboard.readImage();
document.getElementById('logoImg').src = nativeLogoImg.toDataURL();
