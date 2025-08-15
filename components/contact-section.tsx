'use client'

import type React from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle, Mail } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import PrivacyPolicyModal from './privacy-policy-modal'

interface FormData {
	name: string
	email: string
	phone: string
	serviceType: string
	preferredDate: string
	message: string
	privacyConsent: boolean
}

interface FormErrors {
	name?: string
	email?: string
	phone?: string
	privacyConsent?: string
}

export default function ContactSection() {
	const [formData, setFormData] = useState<FormData>({
		name: '',
		email: '',
		phone: '',
		serviceType: '',
		preferredDate: '',
		message: '',
		privacyConsent: false,
	})

	const [formErrors, setFormErrors] = useState<FormErrors>({})
	const [isEmailSubmitting, setIsEmailSubmitting] = useState(false)
	const [isSubmitted, setIsSubmitted] = useState(false)

	const validateForm = useCallback((): FormErrors => {
		const errors: FormErrors = {}

		if (!formData.name.trim()) {
			errors.name = 'Имя обязательно для заполнения'
		}

		if (!formData.email.trim()) {
			errors.email = 'Email обязателен для заполнения'
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			errors.email = 'Введите корректный email'
		}

		if (!formData.phone.trim()) {
			errors.phone = 'Телефон обязателен для заполнения'
		} else if (!/^[+]?[0-9\s\-()]{10,}$/.test(formData.phone)) {
			errors.phone = 'Введите корректный номер телефона'
		}

		if (!formData.privacyConsent) {
			errors.privacyConsent =
				'Необходимо согласие на обработку персональных данных'
		}

		return errors
	}, [formData])

	const isFormValid = useMemo(() => {
		const errors = validateForm()
		return Object.keys(errors).length === 0
	}, [validateForm])

	const handleSubmit = useCallback(
		async (e: React.FormEvent) => {
			e.preventDefault()

			const errors = validateForm()
			setFormErrors(errors)

			if (Object.keys(errors).length > 0) {
				return
			}

			setIsEmailSubmitting(true)

			try {
				const response = await fetch('/api/send-email', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(formData),
				})

				const result = await response.json()

				if (!response.ok) {
					throw new Error(result.error || 'Ошибка отправки заявки')
				}

				setIsSubmitted(true)

				// Очищаем форму после успешной отправки
				setFormData({
					name: '',
					email: '',
					phone: '',
					serviceType: '',
					preferredDate: '',
					message: '',
					privacyConsent: false,
				})
			} catch (error) {
				console.error('Ошибка отправки формы:', error)
				alert(
					'Произошла ошибка при отправке заявки. Попробуйте еще раз или позвоните нам.'
				)
			} finally {
				setIsEmailSubmitting(false)
			}
		},
		[formData, validateForm]
	)

	const handleInputChange = useCallback(
		(field: keyof FormData, value: string | boolean) => {
			setFormData(prev => ({ ...prev, [field]: value }))
			// Очищаем ошибку при изменении поля
			if (formErrors[field as keyof FormErrors]) {
				setFormErrors(prev => ({ ...prev, [field]: undefined }))
			}
		},
		[formErrors]
	)

	return (
		<section id='contact' className='py-8 sm:py-12 lg:py-16 xl:py-20 bg-white'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl'>
				<div className='max-w-2xl mx-auto'>
					<div className='text-center mb-6 sm:mb-8 lg:mb-12'>
						<h2 className='text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold font-heading text-gray-900 mb-3 sm:mb-4 leading-tight break-words px-2'>
							Заказать установку системы отопления
						</h2>
						<p className='text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed px-2'>
							Бесплатная консультация и расчет стоимости. Заполните форму заявки
							на отопление
						</p>
					</div>

					<Card className='shadow-xl sm:shadow-2xl border-0 mx-2 sm:mx-0'>
						<CardContent className='p-4 sm:p-6 lg:p-8 xl:p-10'>
							{isSubmitted ? (
								<div className='text-center py-6 sm:py-8'>
									<div className='mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 sm:mb-6'>
										<CheckCircle className='h-8 w-8 sm:h-10 sm:w-10 text-green-600' />
									</div>
									<h3 className='text-lg sm:text-xl lg:text-2xl font-bold font-heading text-gray-900 mb-2 break-words'>
										Спасибо за заявку!
									</h3>
									<p className='text-gray-600 text-sm sm:text-base lg:text-lg break-words'>
										Мы свяжемся с вами в ближайшее время для уточнения деталей.
									</p>
								</div>
							) : (
								<form
									onSubmit={handleSubmit}
									className='space-y-4 sm:space-y-6'
								>
									<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
										<div className='space-y-2 min-w-0'>
											<Label
												htmlFor='name'
												className='text-sm font-medium block'
											>
												Имя *
											</Label>
											<Input
												id='name'
												value={formData.name}
												onChange={e =>
													handleInputChange('name', e.target.value)
												}
												className={`w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base ${
													formErrors.name ? 'border-red-500' : ''
												}`}
												placeholder='Введите ваше имя'
											/>
											{formErrors.name && (
												<p className='text-red-500 text-xs sm:text-sm break-words'>
													{formErrors.name}
												</p>
											)}
										</div>
										<div className='space-y-2 min-w-0'>
											<Label
												htmlFor='phone'
												className='text-sm font-medium block'
											>
												Телефон *
											</Label>
											<Input
												id='phone'
												type='tel'
												value={formData.phone}
												onChange={e =>
													handleInputChange('phone', e.target.value)
												}
												className={`w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base ${
													formErrors.phone ? 'border-red-500' : ''
												}`}
												placeholder='+7 (999) 123-45-67'
											/>
											{formErrors.phone && (
												<p className='text-red-500 text-xs sm:text-sm break-words'>
													{formErrors.phone}
												</p>
											)}
										</div>
									</div>

									<div className='space-y-2'>
										<Label
											htmlFor='email'
											className='text-sm font-medium block'
										>
											Email *
										</Label>
										<Input
											id='email'
											type='email'
											value={formData.email}
											onChange={e => handleInputChange('email', e.target.value)}
											className={`w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base ${
												formErrors.email ? 'border-red-500' : ''
											}`}
											placeholder='example@email.com'
										/>
										{formErrors.email && (
											<p className='text-red-500 text-xs sm:text-sm break-words'>
												{formErrors.email}
											</p>
										)}
									</div>

									<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
										<div className='space-y-2 min-w-0'>
											<Label
												htmlFor='service'
												className='text-sm font-medium block'
											>
												Тип услуги
											</Label>
											<Select
												onValueChange={value =>
													handleInputChange('serviceType', value)
												}
											>
												<SelectTrigger className='w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base'>
													<SelectValue placeholder='Выберите услугу' />
												</SelectTrigger>
												<SelectContent className='max-w-[calc(100vw-2rem)]'>
													<SelectItem value='installation'>
														Установка системы
													</SelectItem>
													<SelectItem value='maintenance'>
														Обслуживание
													</SelectItem>
													<SelectItem value='repair'>Ремонт</SelectItem>
													<SelectItem value='consultation'>
														Консультация
													</SelectItem>
												</SelectContent>
											</Select>
										</div>
										<div className='space-y-2 min-w-0'>
											<Label
												htmlFor='date'
												className='text-sm font-medium block'
											>
												Предпочтительная дата
											</Label>
											<Input
												id='date'
												type='date'
												value={formData.preferredDate}
												onChange={e =>
													handleInputChange('preferredDate', e.target.value)
												}
												className='w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base'
											/>
										</div>
									</div>

									<div className='space-y-2'>
										<Label
											htmlFor='message'
											className='text-sm font-medium block'
										>
											Сообщение
										</Label>
										<Textarea
											id='message'
											value={formData.message}
											onChange={e =>
												handleInputChange('message', e.target.value)
											}
											rows={3}
											placeholder='Расскажите подробнее о ваших потребностях...'
											className='w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm sm:text-base'
										/>
									</div>

									<div className='space-y-3 sm:space-y-4'>
										<div className='flex items-start space-x-3'>
											<Checkbox
												id='privacy'
												checked={formData.privacyConsent}
												onCheckedChange={checked =>
													handleInputChange(
														'privacyConsent',
														checked as boolean
													)
												}
												className='mt-1 flex-shrink-0'
											/>
											<div className='space-y-1 min-w-0 flex-1'>
												<Label
													htmlFor='privacy'
													className={`text-xs sm:text-sm leading-relaxed cursor-pointer block hyphens-auto ${
														formErrors.privacyConsent
															? 'text-red-500'
															: 'text-gray-700'
													}`}
													style={{
														wordBreak: 'break-word',
														overflowWrap: 'break-word',
													}}
												>
													Я согласен(а) на обработку персональных данных в
													соответствии с <PrivacyPolicyModal /> и даю согласие
													на получение информационных сообщений *
												</Label>
												{formErrors.privacyConsent && (
													<p className='text-red-500 text-xs sm:text-sm break-words'>
														{formErrors.privacyConsent}
													</p>
												)}
											</div>
										</div>
									</div>

									<div className='pt-4'>
										<Button
											type='submit'
											size='lg'
											className='w-full bg-green-600 hover:bg-green-700 text-sm sm:text-base lg:text-lg py-3 sm:py-4 shadow-lg hover:shadow-xl transition-all disabled:opacity-50'
											disabled={isEmailSubmitting || !isFormValid}
										>
											{isEmailSubmitting ? (
												<>
													<div className='animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2 sm:mr-3'></div>
													<span className='break-words'>
														Отправляем на Email...
													</span>
												</>
											) : (
												<>
													<Mail className='h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0' />
													<span className='break-words'>Отправить заявку</span>
												</>
											)}
										</Button>
									</div>
								</form>
							)}
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	)
}
