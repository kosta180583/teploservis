'use client'

import type React from 'react'

import { Button } from '@/components/ui/button'
import {
	CheckCircle,
	Flame,
	Send,
	Settings,
	Shield,
	Wrench,
	X,
} from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'

interface ServiceDetail {
	id: string
	title: string
	description: string
	fullDescription: string
	icon: React.ComponentType<{ className?: string }>
	price: string
	features: string[]
	images: string[]
	duration: string
	warranty: string
}

export default function ServicesSection() {
	const [selectedService, setSelectedService] = useState<ServiceDetail | null>(
		null
	)

	const servicesData: ServiceDetail[] = useMemo(
		() => [
			{
				id: 'installation',
				title: 'Установка систем',
				description:
					'Профессиональная установка современных систем отопления с гарантией качества и соблюдением всех норм',
				fullDescription:
					'Комплексная установка систем отопления включает проектирование, подбор оборудования, монтаж и пуско-наладочные работы. Мы работаем с газовыми, электрическими и твердотопливными котлами, устанавливаем радиаторы, теплые полы и системы автоматического управления.',
				icon: Settings,
				price: 'от 45 000 ₽',
				features: [
					'Бесплатный выезд по Белгороду',
					'Проектирование системы',
					'Подбор оборудования для климата Белгорода',
					'Монтаж и подключение',
					'Пуско-наладочные работы',
					'Гарантия 5 лет',
				],
				images: [
					'/boiler-installation.png',
					'/placeholder-tiohj.png',
					'/tepliy-pol-ustanovka.png',
				],
				duration: '2-5 дней',
				warranty: '5 лет',
			},
			{
				id: 'maintenance',
				title: 'Обслуживание',
				description:
					'Регулярное техническое обслуживание для поддержания эффективности и продления срока службы системы',
				fullDescription:
					'Профилактическое обслуживание включает чистку теплообменников, проверку автоматики, замену фильтров, диагностику всех узлов системы. Регулярное ТО позволяет избежать аварийных ситуаций и снизить расходы на отопление до 20%.',
				icon: Wrench,
				price: 'от 3 500 ₽',
				features: [
					'Диагностика системы',
					'Чистка теплообменников',
					'Проверка автоматики',
					'Замена расходников',
					'Настройка под климат Белгорода',
					'Протокол обслуживания',
				],
				images: [
					'/boiler-maintenance.png',
					'/cleaning-heat-exchanger.png',
					'/heating-automation-check.png',
				],
				duration: '2-4 часа',
				warranty: '1 год',
			},
			{
				id: 'repair',
				title: 'Экстренный ремонт',
				description:
					'Круглосуточная служба экстренного ремонта для решения любых проблем в кратчайшие сроки',
				fullDescription:
					'Наша служба экстренного ремонта работает 24/7. Мы устраняем любые неисправности: от протечек до поломки котла. Выезд мастера в течение 2 часов, диагностика бесплатно при заказе ремонта. Используем только оригинальные запчасти.',
				icon: Shield,
				price: 'от 2 000 ₽',
				features: [
					'Выезд 24/7 по Белгороду и области',
					'Диагностика за 30 минут',
					'Оригинальные запчасти',
					'Устранение протечек',
					'Ремонт автоматики',
					'Гарантия на работы',
				],
				images: [
					'/boiler-emergency-repair.png',
					'/heating-leak-repair.png',
					'/radiator-repair.png',
				],
				duration: '1-3 часа',
				warranty: '2 года',
			},
			{
				id: 'consultation',
				title: 'Консультация',
				description:
					'Бесплатная консультация для уточнения всех деталей и расчета стоимости',
				fullDescription:
					'Наши опытные мастера помогут вам определить необходимые работы и рассчитают точную стоимость. Мы также предоставим рекомендации по выбору оборудования и материалов.',
				icon: Flame,
				price: 'Бесплатно',
				features: [
					'Бесплатный выезд по Белгороду',
					'Полная консультация по системам отопления',
					'Расчет стоимости работ',
					'Рекомендации по оборудованию для региона',
					'Документация и смета',
				],
				images: [
					'/boiler-installation.png',
					'/placeholder-tiohj.png',
					'/tepliy-pol-ustanovka.png',
				],
				duration: '1 час',
				warranty: 'Нет',
			},
		],
		[]
	)

	const openServiceModal = useCallback((service: ServiceDetail) => {
		setSelectedService(service)
		document.body.style.overflow = 'hidden'
	}, [])

	const closeServiceModal = useCallback(() => {
		setSelectedService(null)
		document.body.style.overflow = 'unset'
	}, [])

	return (
		<section id='services' className='py-12 sm:py-16 lg:py-20 bg-gray-50'>
			<div className='container mx-auto px-4'>
				<div className='text-center mb-12 sm:mb-16'>
					<h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-gray-900 mb-4'>
						Услуги по системам отопления в Белгороде
					</h2>
					<p className='text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto'>
						Полный спектр услуг в Белгороде и области: установка котлов, монтаж
						радиаторов, теплый пол, техническое обслуживание. Учитываем
						климатические особенности региона.
					</p>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
					{servicesData.map(service => {
						const IconComponent = service.icon
						return (
							<article
								key={service.id}
								className='text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg group cursor-pointer bg-white rounded-lg p-6'
								onClick={() => openServiceModal(service)}
							>
								<header className='pb-4'>
									<div className='mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform'>
										<IconComponent className='h-10 w-10 text-white' />
									</div>
									<h3 className='font-heading text-xl font-bold text-gray-900 mb-4'>
										{service.title}
									</h3>
								</header>
								<div>
									<p className='text-base leading-relaxed mb-4 text-gray-600'>
										{service.description}
									</p>
									<div className='text-blue-600 font-semibold text-lg'>
										{service.price}
									</div>
								</div>
							</article>
						)
					})}
				</div>
			</div>

			{selectedService && (
				<div className='fixed inset-0 z-50 flex items-center justify-center p-1 sm:p-4 bg-black/50 backdrop-blur-sm'>
					<div className='bg-white rounded-lg sm:rounded-2xl shadow-2xl w-[calc(100vw-8px)] sm:w-full max-w-[95vw] sm:max-w-2xl lg:max-w-4xl max-h-[98vh] sm:max-h-[90vh] overflow-y-auto'>
						<div className='sticky top-0 bg-white border-b border-gray-200 px-2 sm:px-6 py-2 sm:py-4 flex items-center justify-between rounded-t-lg sm:rounded-t-2xl'>
							<h3 className='text-base sm:text-xl lg:text-2xl font-bold font-heading text-gray-900 pr-1 sm:pr-2 leading-tight'>
								{selectedService.title}
							</h3>
							<Button
								variant='ghost'
								size='sm'
								onClick={closeServiceModal}
								className='p-1 sm:p-2 flex-shrink-0 min-w-[32px]'
							>
								<X className='h-4 w-4 sm:h-6 sm:w-6' />
							</Button>
						</div>

						<div className='p-2 sm:p-6'>
							<div className='grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-8'>
								<div>
									<div className='mb-3 sm:mb-6'>
										<div className='flex items-start sm:items-center gap-2 sm:gap-4 mb-2 sm:mb-4'>
											<div className='w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0'>
												<selectedService.icon className='h-5 w-5 sm:h-8 sm:w-8 text-white' />
											</div>
											<div className='min-w-0 flex-1'>
												<div className='text-lg sm:text-2xl lg:text-3xl font-bold text-blue-600 mb-0.5 sm:mb-1 leading-tight'>
													{selectedService.price}
												</div>
												<div className='text-xs sm:text-base text-gray-600'>
													Стоимость услуги
												</div>
											</div>
										</div>
										<p className='text-xs sm:text-base lg:text-lg text-gray-700 leading-relaxed'>
											{selectedService.fullDescription}
										</p>
									</div>

									<div className='grid grid-cols-2 gap-2 sm:gap-4 mb-3 sm:mb-6'>
										<div className='bg-gray-50 rounded-lg p-2 sm:p-4'>
											<div className='text-xs text-gray-600 mb-0.5 sm:mb-1'>
												Время выполнения
											</div>
											<div className='font-semibold text-xs sm:text-base text-gray-900 leading-tight'>
												{selectedService.duration}
											</div>
										</div>
										<div className='bg-gray-50 rounded-lg p-2 sm:p-4'>
											<div className='text-xs text-gray-600 mb-0.5 sm:mb-1'>
												Гарантия
											</div>
											<div className='font-semibold text-xs sm:text-base text-gray-900 leading-tight'>
												{selectedService.warranty}
											</div>
										</div>
									</div>

									<div className='mb-3 sm:mb-6'>
										<h4 className='font-bold text-sm sm:text-lg mb-2 sm:mb-4'>
											Что входит в услугу:
										</h4>
										<ul className='space-y-1.5 sm:space-y-3'>
											{selectedService.features.map((feature, index) => (
												<li
													key={index}
													className='flex items-start gap-1.5 sm:gap-3'
												>
													<CheckCircle className='h-3.5 w-3.5 sm:h-5 sm:w-5 text-green-600 flex-shrink-0 mt-0.5' />
													<span className='text-xs sm:text-base text-gray-700 leading-relaxed break-words'>
														{feature}
													</span>
												</li>
											))}
										</ul>
									</div>
								</div>

								<div>
									<h4 className='font-bold text-sm sm:text-lg mb-2 sm:mb-4'>
										Примеры работ:
									</h4>
									<div className='grid gap-2 sm:gap-4'>
										{selectedService.images.map((image, index) => (
											<div
												key={index}
												className='relative rounded-lg overflow-hidden shadow-md'
											>
												<img
													src={image || '/placeholder.svg'}
													alt={`${selectedService.title} - пример ${index + 1}`}
													className='w-full h-24 sm:h-40 lg:h-48 object-cover hover:scale-105 transition-transform duration-300'
												/>
											</div>
										))}
									</div>
								</div>
							</div>

							<div className='mt-4 sm:mt-8 pt-3 sm:pt-6 border-t border-gray-200 flex flex-col gap-2 sm:gap-4'>
								<Button
									size='lg'
									className='w-full bg-blue-600 hover:bg-blue-700 text-xs sm:text-base lg:text-lg py-2.5 sm:py-3'
									onClick={() => {
										closeServiceModal()
										document
											.getElementById('contact')
											?.scrollIntoView({ behavior: 'smooth' })
									}}
								>
									Заказать услугу
								</Button>
								<Button
									variant='outline'
									size='lg'
									className='w-full text-xs sm:text-base lg:text-lg py-2.5 sm:py-3 bg-transparent'
									onClick={() => {
										closeServiceModal()
										document
											.getElementById('contact')
											?.scrollIntoView({ behavior: 'smooth' })
									}}
								>
									<Send className='h-3.5 w-3.5 sm:h-5 sm:w-5 mr-1.5 sm:mr-2' />
									Telegram заявка
								</Button>
							</div>
						</div>
					</div>
				</div>
			)}
		</section>
	)
}
