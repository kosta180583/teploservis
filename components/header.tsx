'use client'

import { Button } from '@/components/ui/button'
import { Flame, Menu, MessageCircle, X } from 'lucide-react'
import { useCallback, useState } from 'react'

export default function Header() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
		const botUsername = 'koEQ_Bot'
		const telegramUrl = `https://t.me/${botUsername}?start=greeting_heating_service`
		window.open(telegramUrl, '_blank')
		closeMobileMenu()
	}, [closeMobileMenu])

	return (
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
	)
}
