// Этот файл подключается к файлу index.html и
// написаный здесь код будет выполняться в процессе визуализации приложения.
// Весь Node.js APIs доступен в этом процессе.
// console.log(navigator.onLine)

window.addEventListener('online', () => { 
	console.log('User OnLine')
})

window.addEventListener('offline', () => {
	console.log('User OffLine')
})

window.navigator.getBattery().then((battery) => { 
	// console.log(battery)
	battery.onchargingchange = () => { 
		console.log(battery.charging)
	}
})
