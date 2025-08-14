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
		<section id='contact' className='py-12 sm:py-16 lg:py-20 bg-white'>
			<div className='container mx-auto px-4'>
				<div className='max-w-2xl mx-auto'>
					<div className='text-center mb-8 sm:mb-12'>
						<h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-gray-900 mb-4'>
							Заказать установку системы отопления
						</h2>
						<p className='text-lg sm:text-xl text-gray-600'>
							Бесплатная консультация и расчет стоимости. Заполните форму заявки
							на отопление
						</p>
					</div>

					<Card className='shadow-2xl border-0'>
						<CardContent className='p-4 sm:p-6 lg:p-8'>
							{isSubmitted ? (
								<div className='text-center py-8'>
									<div className='mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6'>
										<CheckCircle className='h-10 w-10 text-green-600' />
									</div>
									<h3 className='text-xl sm:text-2xl font-bold font-heading text-gray-900 mb-2'>
										Спасибо за заявку!
									</h3>
									<p className='text-gray-600 text-base sm:text-lg'>
										Мы свяжемся с вами в ближайшее время для уточнения деталей.
									</p>
								</div>
							) : (
								<form
									onSubmit={handleSubmit}
									className='space-y-4 sm:space-y-6'
								>
									<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
										<div className='space-y-2'>
											<Label htmlFor='name' className='text-sm font-medium'>
												Имя *
											</Label>
											<Input
												id='name'
												value={formData.name}
												onChange={e =>
													handleInputChange('name', e.target.value)
												}
												className={`focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
													formErrors.name ? 'border-red-500' : ''
												}`}
												placeholder='Введите ваше имя'
											/>
											{formErrors.name && (
												<p className='text-red-500 text-sm'>
													{formErrors.name}
												</p>
											)}
										</div>
										<div className='space-y-2'>
											<Label htmlFor='phone' className='text-sm font-medium'>
												Телефон *
											</Label>
											<Input
												id='phone'
												type='tel'
												value={formData.phone}
												onChange={e =>
													handleInputChange('phone', e.target.value)
												}
												className={`focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
													formErrors.phone ? 'border-red-500' : ''
												}`}
												placeholder='+7 (999) 123-45-67'
											/>
											{formErrors.phone && (
												<p className='text-red-500 text-sm'>
													{formErrors.phone}
												</p>
											)}
										</div>
									</div>

									<div className='space-y-2'>
										<Label htmlFor='email' className='text-sm font-medium'>
											Email *
										</Label>
										<Input
											id='email'
											type='email'
											value={formData.email}
											onChange={e => handleInputChange('email', e.target.value)}
											className={`focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
												formErrors.email ? 'border-red-500' : ''
											}`}
											placeholder='example@email.com'
										/>
										{formErrors.email && (
											<p className='text-red-500 text-sm'>{formErrors.email}</p>
										)}
									</div>

									<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
										<div className='space-y-2'>
											<Label htmlFor='service' className='text-sm font-medium'>
												Тип услуги
											</Label>
											<Select
												onValueChange={value =>
													handleInputChange('serviceType', value)
												}
											>
												<SelectTrigger className='focus:ring-2 focus:ring-blue-500 focus:border-transparent'>
													<SelectValue placeholder='Выберите услугу' />
												</SelectTrigger>
												<SelectContent>
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
										<div className='space-y-2'>
											<Label htmlFor='date' className='text-sm font-medium'>
												Предпочтительная дата
											</Label>
											<Input
												id='date'
												type='date'
												value={formData.preferredDate}
												onChange={e =>
													handleInputChange('preferredDate', e.target.value)
												}
												className='focus:ring-2 focus:ring-blue-500 focus:border-transparent'
											/>
										</div>
									</div>

									<div className='space-y-2'>
										<Label htmlFor='message' className='text-sm font-medium'>
											Сообщение
										</Label>
										<Textarea
											id='message'
											value={formData.message}
											onChange={e =>
												handleInputChange('message', e.target.value)
											}
											rows={4}
											placeholder='Расскажите подробнее о ваших потребностях...'
											className='focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none'
										/>
									</div>

									<div className='space-y-4'>
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
											<div className='space-y-1'>
												<Label
													htmlFor='privacy'
													className={`text-sm leading-relaxed cursor-pointer ${
														formErrors.privacyConsent
															? 'text-red-500'
															: 'text-gray-700'
													}`}
												>
													Я согласен(а) на обработку персональных данных в
													соответствии с <PrivacyPolicyModal /> и даю согласие
													на получение информационных сообщений *
												</Label>
												{formErrors.privacyConsent && (
													<p className='text-red-500 text-sm'>
														{formErrors.privacyConsent}
													</p>
												)}
											</div>
										</div>
									</div>

									<div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
										<Button
											type='submit'
											size='lg'
											className='w-full bg-green-600 hover:bg-green-700 text-base sm:text-lg py-3 sm:py-4 shadow-lg hover:shadow-xl transition-all disabled:opacity-50'
											disabled={isEmailSubmitting || !isFormValid}
										>
											{isEmailSubmitting ? (
												<>
													<div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3'></div>
													Отправляем на Email...
												</>
											) : (
												<>
													<Mail className='h-5 w-5 mr-2' />
													Отправить заявку
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
