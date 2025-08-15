import { Flame, Mail, MapPin, Phone, Star } from 'lucide-react'
import PrivacyPolicyModal from './privacy-policy-modal'

export default function Footer() {
	return (
		<footer className='bg-gray-900 text-white py-12 sm:py-16'>
			<div className='container mx-auto px-4'>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8'>
					<div className='sm:col-span-2 lg:col-span-2'>
						<div className='flex items-center gap-2 mb-6'>
							<Flame className='h-8 w-8 text-blue-400' />
							<span className='text-xl sm:text-2xl font-bold font-heading'>
								ТеплоСервис
							</span>
						</div>
						<p className='text-gray-400 mb-6 leading-relaxed text-sm sm:text-base'>
							Профессиональные решения для систем отопления с 2010 года.
							Установка газовых и электрических котлов, монтаж радиаторов,
							теплый пол. Обеспечиваем тепло и комфорт в вашем доме круглый год.
						</p>
						<div className='flex flex-wrap items-center gap-2 text-yellow-400'>
							<div className='flex'>
								<Star className='h-4 w-4 fill-current' />
								<Star className='h-4 w-4 fill-current' />
								<Star className='h-4 w-4 fill-current' />
								<Star className='h-4 w-4 fill-current' />
								<Star className='h-4 w-4 fill-current' />
							</div>
							<span className='text-white text-sm sm:text-base'>
								4.9/5 (127 отзывов)
							</span>
						</div>
					</div>

					<div>
						<h3 className='font-bold font-heading mb-6 text-lg'>Контакты</h3>
						<div className='space-y-4 text-gray-400 text-sm sm:text-base'>
							<div className='flex items-center gap-3'>
								<Phone className='h-5 w-5 text-blue-400 flex-shrink-0' />
								<a
									href='tel:+74951234567'
									className='hover:text-white transition-colors'
								>
									+7 (495) 123-45-67
								</a>
							</div>
							<div className='flex items-center gap-3'>
								<Mail className='h-5 w-5 text-blue-400 flex-shrink-0' />
								<a
									href='mailto:info@teploservice.ru'
									className='hover:text-white transition-colors'
								>
									info@teploservice.ru
								</a>
							</div>
							<div className='flex items-start gap-3'>
								<MapPin className='h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5' />
								<span>Белгород, ул. Щорса, 12</span>
							</div>
						</div>
					</div>

					<div>
						<h3 className='font-bold font-heading mb-6 text-lg'>
							Режим работы
						</h3>
						<div className='space-y-3 text-gray-400 text-sm sm:text-base'>
							<p>Пн-Пт: 8:00 - 20:00</p>
							<p>Сб-Вс: 9:00 - 18:00</p>
							<p className='text-blue-400 font-medium'>
								Экстренный ремонт: 24/7
							</p>
						</div>
					</div>
				</div>

				<div className='border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4'>
					<p className='text-gray-400 text-sm sm:text-base text-center sm:text-left'>
						&copy; 2024 ТеплоСервис. Все права защищены.
					</p>
					<nav className='flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm text-gray-400'>
						<PrivacyPolicyModal>
							<button className='hover:text-white transition-colors text-center'>
								Политика конфиденциальности
							</button>
						</PrivacyPolicyModal>
						<a
							href='/terms'
							className='hover:text-white transition-colors text-center'
						>
							Условия использования
						</a>
						<a
							href='/sitemap.xml'
							className='hover:text-white transition-colors text-center'
						>
							Карта сайта
						</a>
					</nav>
				</div>
			</div>
		</footer>
	)
}
