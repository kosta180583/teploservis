'use client'

import type React from 'react'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Shield } from 'lucide-react'
import { useState } from 'react'

interface PrivacyPolicyModalProps {
	trigger?: React.ReactNode
	children?: React.ReactNode
}

export default function PrivacyPolicyModal({
	trigger,
	children,
}: PrivacyPolicyModalProps) {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				{trigger || children || (
					<Button
						variant='link'
						className='p-0 h-auto text-blue-600 hover:text-blue-700 underline'
					>
						политикой конфиденциальности
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className='max-w-4xl max-h-[90vh] p-0'>
				<DialogHeader className='p-6 pb-4 border-b'>
					<DialogTitle className='flex items-center gap-2 text-xl font-bold'>
						<Shield className='h-6 w-6 text-blue-600' />
						Политика конфиденциальности
					</DialogTitle>
				</DialogHeader>
				<ScrollArea className='h-[70vh] p-6'>
					<div className='space-y-6 text-sm leading-relaxed'>
						<div>
							<h3 className='font-bold text-lg mb-3'>1. Общие положения</h3>
							<p className='text-gray-700 mb-3'>
								Настоящая Политика конфиденциальности (далее — «Политика»)
								действует в отношении всей информации, которую ООО «ТеплоСервис»
								(далее — «Компания») может получить о пользователе во время
								использования им сайта и сервисов компании.
							</p>
							<p className='text-gray-700'>
								Использование сайта означает безоговорочное согласие
								пользователя с настоящей Политикой и указанными в ней условиями
								обработки его персональной информации.
							</p>
						</div>

						<div>
							<h3 className='font-bold text-lg mb-3'>
								2. Персональная информация пользователей
							</h3>
							<p className='text-gray-700 mb-3'>
								В рамках настоящей Политики под «персональной информацией
								пользователя» понимаются:
							</p>
							<ul className='list-disc list-inside space-y-2 text-gray-700 ml-4'>
								<li>
									Персональные данные, предоставленные пользователем
									самостоятельно при заполнении форм на сайте
								</li>
								<li>
									Данные, которые автоматически передаются в процессе
									использования сайта
								</li>
								<li>
									Данные, получаемые в результате действий пользователя на сайте
								</li>
							</ul>
						</div>

						<div>
							<h3 className='font-bold text-lg mb-3'>
								3. Цели обработки персональной информации
							</h3>
							<p className='text-gray-700 mb-3'>
								Компания обрабатывает персональную информацию пользователя в
								следующих целях:
							</p>
							<ul className='list-disc list-inside space-y-2 text-gray-700 ml-4'>
								<li>
									Предоставление услуг по установке и обслуживанию систем
									отопления
								</li>
								<li>Связь с пользователем для уточнения деталей заказа</li>
								<li>Отправка информационных сообщений о услугах компании</li>
								<li>Проведение статистических и маркетинговых исследований</li>
								<li>Обеспечение безопасности и предотвращение мошенничества</li>
							</ul>
						</div>

						<div>
							<h3 className='font-bold text-lg mb-3'>
								4. Способы и сроки обработки персональной информации
							</h3>
							<p className='text-gray-700 mb-3'>
								Обработка персональных данных пользователя осуществляется без
								ограничения срока любым законным способом, в том числе в
								информационных системах персональных данных с использованием
								средств автоматизации или без использования таких средств.
							</p>
							<p className='text-gray-700'>
								Пользователь соглашается с тем, что Компания вправе передавать
								персональные данные третьим лицам, в частности, курьерским
								службам, организациям почтовой связи, операторам электросвязи,
								исключительно в целях выполнения заказа пользователя.
							</p>
						</div>

						<div>
							<h3 className='font-bold text-lg mb-3'>
								5. Изменение персональной информации
							</h3>
							<p className='text-gray-700'>
								Пользователь может в любой момент изменить (обновить, дополнить)
								предоставленную им персональную информацию или её часть, а также
								параметры её конфиденциальности, оставив заявку на электронную
								почту
								{/* <a href="mailto:info@teploservice.ru" className="text-blue-600 hover:text-blue-700 mx-1">
                  info@teploservice.ru
                </a>
                или по телефону
                <a href="tel:+74951234567" className="text-blue-600 hover:text-blue-700 mx-1">
                  +7 (495) 123-45-67
                </a> */}
								.
							</p>
						</div>

						<div>
							<h3 className='font-bold text-lg mb-3'>
								6. Меры, применяемые для защиты персональной информации
							</h3>
							<p className='text-gray-700 mb-3'>
								Компания принимает необходимые и достаточные организационные и
								технические меры для защиты персональной информации пользователя
								от неправомерного или случайного доступа, уничтожения,
								изменения, блокирования, копирования, распространения, а также
								от иных неправомерных действий с ней третьих лиц.
							</p>
						</div>

						<div>
							<h3 className='font-bold text-lg mb-3'>
								7. Изменение Политики конфиденциальности
							</h3>
							<p className='text-gray-700'>
								Компания имеет право вносить изменения в настоящую Политику
								конфиденциальности. При внесении изменений в актуальной редакции
								указывается дата последнего обновления. Новая редакция Политики
								вступает в силу с момента её размещения, если иное не
								предусмотрено новой редакцией Политики.
							</p>
						</div>

						<div>
							<h3 className='font-bold text-lg mb-3'>8. Обратная связь</h3>
							<p className='text-gray-700'>
								Все предложения или вопросы по настоящей Политике следует
								направлять на электронную почту
								{/* <a href="mailto:info@teploservice.ru" className="text-blue-600 hover:text-blue-700 mx-1">
                  info@teploservice.ru
                </a> */}
								.
							</p>
						</div>

						<div className='border-t pt-4 mt-8'>
							<p className='text-gray-500 text-xs'>
								Дата последнего обновления:{' '}
								{new Date().toLocaleDateString('ru-RU')}
							</p>
							{/* <p className="text-gray-500 text-xs mt-1">ООО «ТеплоСервис», ИНН: 1234567890, ОГРН: 1234567890123</p> */}
						</div>
					</div>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	)
}
