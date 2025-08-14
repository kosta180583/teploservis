const TelegramBot = require('node-telegram-bot-api')
const dotenv = require('dotenv')

// Загрузка переменных окружения
dotenv.config({ path: '.env.local' })

// Замените на ваш реальный токен из .env.local
const token = process.env.TELEGRAM_BOT_TOKEN || 'YOUR_BOT_TOKEN'
const bot = new TelegramBot(token, { polling: true })

console.log('Telegram бот запущен...')

const autoRepliedUsers = new Set()

const activeChats = new Map() // chatId -> {name, lastMessage}

// Обработчик команды /start с параметрами
bot.onText(/\/start (.+)/, (msg, match) => {
	const chatId = msg.chat.id
	const startParam = match[1]
	const userName = msg.from.first_name || 'Клиент'

	console.log(`Получена команда /start с параметром: ${startParam}`)

	if (startParam === 'greeting_heating_service') {
		bot.sendMessage(
			chatId,
			`Добрый день, ${userName}! Какие услуги отопления хотите заказать?\n\n🔥 Установка котлов\n🏠 Монтаж теплых полов\n🔧 Ремонт и обслуживание\n📞 Аварийный вызов\n\nОпишите вашу задачу, и я свяжу вас с мастером!`
		)
	} else {
		bot.sendMessage(chatId, `Добро пожаловать, ${userName}! Чем могу помочь?`)
	}
})

// Обработчик обычной команды /start
bot.onText(/\/start$/, msg => {
	const chatId = msg.chat.id
	const userName = msg.from.first_name || 'Клиент'

	console.log('Получена команда /start без параметров')

	bot.sendMessage(
		chatId,
		`Добрый день, ${userName}! Какие услуги отопления хотите заказать?\n\n🔥 Установка котлов\n🏠 Монтаж теплых полов\n🔧 Ремонт и обслуживание\n📞 Аварийный вызов\n\nОпишите вашу задачу, и я свяжу вас с мастером!`
	)
})

bot.onText(/\/reset/, msg => {
	const yourChatId = process.env.TELEGRAM_CHAT_ID
	if (msg.chat.id.toString() === yourChatId) {
		autoRepliedUsers.clear()
		bot.sendMessage(
			msg.chat.id,
			'✅ Список автоответов сброшен. Бот снова будет отвечать новым клиентам.'
		)
	}
})

// Обработчик всех текстовых сообщений
bot.on('message', msg => {
	const chatId = msg.chat.id
	const messageText = msg.text
	const yourChatId = process.env.TELEGRAM_CHAT_ID
	const userName = msg.from.first_name || 'Клиент'

	// Если сообщение от владельца - проверяем команды ответа
	if (chatId.toString() === yourChatId && messageText) {
		// Команда для ответа конкретному клиенту: /reply 123456789 Ваш ответ
		const replyMatch = messageText.match(/^\/reply (\d+) (.+)/)
		if (replyMatch) {
			const targetChatId = replyMatch[1]
			const replyText = replyMatch[2]

			bot
				.sendMessage(targetChatId, replyText)
				.then(() => {
					bot.sendMessage(
						yourChatId,
						`✅ Ответ отправлен клиенту ${
							activeChats.get(targetChatId)?.name || targetChatId
						}`
					)
				})
				.catch(error => {
					bot.sendMessage(yourChatId, `❌ Ошибка отправки: ${error.message}`)
				})
			return
		}

		// Команда для просмотра активных чатов
		if (messageText === '/chats') {
			if (activeChats.size === 0) {
				bot.sendMessage(yourChatId, '📭 Нет активных чатов с клиентами')
			} else {
				let chatsList = '👥 Активные чаты:\n\n'
				activeChats.forEach((info, chatId) => {
					chatsList += `👤 ${info.name}\n🆔 ${chatId}\n💬 "${info.lastMessage}"\n\n`
				})
				chatsList += '💡 Для ответа используйте: /reply CHAT_ID ваш_ответ'
				bot.sendMessage(yourChatId, chatsList)
			}
			return
		}
	}

	// Обработка сообщений от клиентов
	if (
		messageText &&
		!messageText.startsWith('/start') &&
		!messageText.startsWith('/reset') &&
		chatId.toString() !== yourChatId
	) {
		console.log(`Получено сообщение: ${messageText}`)

		activeChats.set(chatId, {
			name: userName,
			lastMessage:
				messageText.length > 50
					? messageText.substring(0, 50) + '...'
					: messageText,
		})

		// Уведомление вам о новом сообщении
		if (yourChatId) {
			bot.sendMessage(
				yourChatId,
				`📩 Новое сообщение от клиента:\n\n👤 ${userName}\n💬 ${messageText}\n\n🆔 Chat ID: ${chatId}\n\n💡 Ответить: /reply ${chatId} ваш_ответ`
			)
		}

		if (!autoRepliedUsers.has(chatId)) {
			bot.sendMessage(
				chatId,
				'Спасибо за ваше сообщение! Мастер свяжется с вами в ближайшее время. 👨‍🔧'
			)
			autoRepliedUsers.add(chatId)
			console.log(`Отправлен автоответ клиенту ${chatId}`)
		} else {
			console.log(`Автоответ уже был отправлен клиенту ${chatId}, пропускаем`)
		}
	}
})

// Обработка ошибок
bot.on('error', error => {
	console.log('Ошибка бота:', error)
})
