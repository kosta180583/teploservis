'use client'

import { Button } from '@/components/ui/button'
import { MessageCircle } from 'lucide-react'
import { useCallback } from 'react'

export default function ContactTelegram() {
	const openTelegramBot = useCallback(() => {
		const botUsername = 'koEQ_Bot'
		const telegramUrl = `https://t.me/${botUsername}?start=greeting_heating_service`
		window.open(telegramUrl, '_blank')
	}, [])

	return (
		<section id='contact' className='py-8 sm:py-12 lg:py-16 xl:py-20 bg-white'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl'>
				<div className='max-w-2xl mx-auto text-center'>
					<h2 className='text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-3'>
						Заказать установку системы отопления в Белгороде
					</h2>
					<p className='text-base sm:text-lg lg:text-xl text-gray-600 mb-6'>
						Бесплатная консультация и расчет стоимости. Напишите нам в Telegram.
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
	)
}
