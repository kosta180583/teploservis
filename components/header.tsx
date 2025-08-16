'use client'

import { Button } from '@/components/ui/button'
import { Flame, Menu, MessageCircle, RefreshCw, X } from 'lucide-react'
import { useCallback, useState } from 'react'

export default function Header() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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
				num1 = Math.floor(Math.random() * 20) + 10
				num2 = Math.floor(Math.random() * 10) + 1
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
				setShowCaptcha(false)
				const botUsername = 'koEQ_Bot'
				const telegramUrl = `https://t.me/${botUsername}?start=greeting_heating_service`
				window.open(telegramUrl, '_blank')
				closeMobileMenu()
			}, 1000)
		} else {
			generateCaptcha()
		}
	}, [userAnswer, captchaAnswer, generateCaptcha])

	const toggleMobileMenu = useCallback(() => {
		setIsMobileMenuOpen(prev => !prev)
	}, [])

	const closeMobileMenu = useCallback(() => {
		setIsMobileMenuOpen(false)
	}, [])

	const scrollToContact = useCallback(() => {
		document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
		closeMobileMenu()
	}, [closeMobileMenu])

	const openTelegramBot = useCallback(() => {
		generateCaptcha()
		setShowCaptcha(true)
	}, [generateCaptcha])

	return (
		<>
			<header className='sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60'>
				<div className='container mx-auto px-4 py-4'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-2'>
							<Flame className='h-8 w-8 text-blue-600' />
							<span className='text-xl sm:text-2xl font-bold font-heading text-gray-900'>
								ТеплоСервис
							</span>
						</div>

						<nav className='hidden lg:flex items-center gap-6'>
							<a
								href='#services'
								className='text-gray-600 hover:text-blue-600 transition-colors font-medium'
							>
								Услуги
							</a>
							<a
								href='#advantages'
								className='text-gray-600 hover:text-blue-600 transition-colors font-medium'
							>
								Преимущества
							</a>
							<a
								href='#contact'
								className='text-gray-600 hover:text-blue-600 transition-colors font-medium'
							>
								Контакты
							</a>
							<Button
								className='bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all'
								onClick={openTelegramBot}
							>
								<MessageCircle className='h-4 w-4 mr-2' />
								<span className='hidden xl:inline'>Написать в Telegram</span>
								<span className='xl:hidden'>Telegram</span>
							</Button>
						</nav>

						<div className='lg:hidden flex items-center gap-2'>
							<Button
								variant='ghost'
								size='sm'
								className='text-blue-600 hover:text-blue-700'
								onClick={openTelegramBot}
							>
								<MessageCircle className='h-5 w-5' />
							</Button>
							<Button
								variant='ghost'
								size='sm'
								onClick={toggleMobileMenu}
								className='p-2'
								aria-label='Открыть меню'
							>
								{isMobileMenuOpen ? (
									<X className='h-6 w-6' />
								) : (
									<Menu className='h-6 w-6' />
								)}
							</Button>
						</div>
					</div>

					{isMobileMenuOpen && (
						<div className='lg:hidden mt-4 pb-4 border-t border-gray-200'>
							<nav className='flex flex-col gap-4 pt-4'>
								<a
									href='#services'
									className='text-gray-600 hover:text-blue-600 transition-colors font-medium py-2'
									onClick={closeMobileMenu}
								>
									Услуги
								</a>
								<a
									href='#advantages'
									className='text-gray-600 hover:text-blue-600 transition-colors font-medium py-2'
									onClick={closeMobileMenu}
								>
									Преимущества
								</a>
								<a
									href='#contact'
									className='text-gray-600 hover:text-blue-600 transition-colors font-medium py-2'
									onClick={closeMobileMenu}
								>
									Контакты
								</a>
								<Button
									className='bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all mt-2'
									onClick={openTelegramBot}
								>
									<MessageCircle className='h-4 w-4 mr-2' />
									Написать в Telegram
								</Button>
							</nav>
						</div>
					)}
				</div>
			</header>

			{showCaptcha && (
				<div className='fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4'>
					<div className='bg-white rounded-lg p-6 max-w-sm w-full mx-4'>
						<h3 className='text-lg font-semibold mb-4 text-center'>
							Подтвердите, что вы не робот
						</h3>

						<div className='mb-4'>
							<p className='text-center text-xl font-mono mb-3 p-3 bg-gray-100 rounded'>
								{captchaQuestion}
							</p>

							<input
								type='number'
								value={userAnswer}
								onChange={e => setUserAnswer(e.target.value)}
								placeholder='Введите ответ'
								className='w-full p-3 border border-gray-300 rounded-lg text-center text-lg'
								autoFocus
							/>
						</div>

						{captchaVerified && (
							<div className='text-green-600 text-center mb-4 font-medium'>
								✓ Проверка пройдена! Переходим в Telegram...
							</div>
						)}

						<div className='flex gap-2'>
							<Button
								onClick={verifyCaptcha}
								disabled={!userAnswer || captchaVerified}
								className='flex-1 bg-blue-600 hover:bg-blue-700'
							>
								Проверить
							</Button>

							<Button
								onClick={generateCaptcha}
								variant='outline'
								size='sm'
								className='px-3 bg-transparent'
								title='Новый пример'
							>
								<RefreshCw className='h-4 w-4' />
							</Button>

							<Button
								onClick={() => setShowCaptcha(false)}
								variant='outline'
								size='sm'
								className='px-3'
							>
								<X className='h-4 w-4' />
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
