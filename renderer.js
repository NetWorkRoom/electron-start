// Этот файл подключается к файлу index.html и
// написаный здесь код будет выполняться в процессе визуализации приложения.
// Весь Node.js APIs доступен в этом процессе.

const { shell, nativeImage } = require('electron')
const fs = require('fs');

// shell.openExternal('https://github.com')

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



