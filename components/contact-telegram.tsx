'use client'

import { Button } from '@/components/ui/button'
import { MessageCircle, RefreshCw, X } from 'lucide-react'
import { useCallback, useState } from 'react'

export default function ContactTelegram() {
	const [showCaptcha, setShowCaptcha] = useState(false)
	const [captchaQuestion, setCaptchaQuestion] = useState('')
	const [captchaAnswer, setCaptchaAnswer] = useState(0)
	const [userAnswer, setUserAnswer] = useState('')
	const [captchaVerified, setCaptchaVerified] = useState(false)

	const generateCaptcha = useCallback(() => {
		const operations = ['+', '-', '*']
		const operation = operations[Math.floor(Math.random() * operations.length)]
		let num1, num2, answer, question

		switch (operation) {
			case '+':
				num1 = Math.floor(Math.random() * 20) + 1
				num2 = Math.floor(Math.random() * 20) + 1
				answer = num1 + num2
				question = `${num1} + ${num2} = ?`
				break
			case '-':
				num1 = Math.floor(Math.random() * 30) + 10
				num2 = Math.floor(Math.random() * num1) + 1
				answer = num1 - num2
				question = `${num1} - ${num2} = ?`
				break
			case '*':
				num1 = Math.floor(Math.random() * 10) + 1
				num2 = Math.floor(Math.random() * 10) + 1
				answer = num1 * num2
				question = `${num1} × ${num2} = ?`
				break
			default:
				num1 = 5
				num2 = 3
				answer = 8
				question = '5 + 3 = ?'
		}

		setCaptchaQuestion(question)
		setCaptchaAnswer(answer)
		setUserAnswer('')
		setCaptchaVerified(false)
	}, [])

	const verifyCaptcha = useCallback(() => {
		if (Number.parseInt(userAnswer) === captchaAnswer) {
			setCaptchaVerified(true)
			setTimeout(() => {
				const botUsername = 'koEQ_Bot'
				const telegramUrl = `https://t.me/${botUsername}?start=greeting_heating_service`
				window.open(telegramUrl, '_blank')
				setShowCaptcha(false)
				setCaptchaVerified(false)
			}, 1000)
		} else {
			alert('Неправильный ответ. Попробуйте еще раз.')
			generateCaptcha()
		}
	}, [userAnswer, captchaAnswer, generateCaptcha])

	const openTelegramBot = useCallback(() => {
		setShowCaptcha(true)
		generateCaptcha()
	}, [generateCaptcha])

	return (
		<>
			<section
				id='contact'
				className='py-8 sm:py-12 lg:py-16 xl:py-20 bg-white'
			>
				<div className='container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl'>
					<div className='max-w-2xl mx-auto text-center'>
						<h2 className='text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-3'>
							Заказать установку системы отопления в Белгороде
						</h2>
						<p className='text-base sm:text-lg lg:text-xl text-gray-600 mb-6'>
							Бесплатная консультация и расчет стоимости. Напишите нам в
							Telegram.
						</p>
						<Button
							className='bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all inline-flex items-center'
							onClick={openTelegramBot}
						>
							<MessageCircle className='h-4 w-4 mr-2' />
							Написать в Telegram
						</Button>
					</div>
				</div>
			</section>

			{showCaptcha && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
					<div className='bg-white rounded-lg p-6 max-w-sm w-full mx-4'>
						<div className='flex justify-between items-center mb-4'>
							<h3 className='text-lg font-semibold text-gray-900'>
								Проверка безопасности
							</h3>
							<Button
								variant='ghost'
								size='sm'
								onClick={() => setShowCaptcha(false)}
								className='h-8 w-8 p-0'
							>
								<X className='h-4 w-4' />
							</Button>
						</div>

						<div className='text-center mb-4'>
							<p className='text-sm text-gray-600 mb-3'>
								Решите пример, чтобы продолжить:
							</p>
							<div className='text-2xl font-bold text-blue-600 mb-3'>
								{captchaQuestion}
							</div>

							<input
								type='number'
								value={userAnswer}
								onChange={e => setUserAnswer(e.target.value)}
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg'
								placeholder='Ваш ответ'
								autoFocus
							/>
						</div>

						{captchaVerified && (
							<div className='text-center text-green-600 font-semibold mb-3'>
								✓ Проверка пройдена! Переходим в Telegram...
							</div>
						)}

						<div className='flex gap-2'>
							<Button
								onClick={verifyCaptcha}
								disabled={!userAnswer || captchaVerified}
								className='flex-1 bg-blue-600 hover:bg-blue-700'
							>
								{captchaVerified ? 'Проверено ✓' : 'Проверить'}
							</Button>
							<Button
								variant='outline'
								onClick={generateCaptcha}
								disabled={captchaVerified}
								className='px-3 bg-transparent'
							>
								<RefreshCw className='h-4 w-4' />
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
