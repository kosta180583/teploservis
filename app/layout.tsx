import type { Metadata } from 'next'
import { DM_Sans, Space_Grotesk } from 'next/font/google'
import type React from 'react'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-space-grotesk',
})

const dmSans = DM_Sans({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-dm-sans',
})

export const metadata: Metadata = {
	title:
		'ТеплоСервис - Профессиональные системы отопления | Установка, обслуживание, ремонт',
	description:
		'Профессиональная установка, обслуживание и ремонт систем отопления в Белгороде. Гарантия качества, экстренный ремонт 24/7. Бесплатная консультация и выезд мастера.',
	keywords:
		'системы отопления, установка отопления, ремонт отопления, обслуживание котлов, отопление дома, газовые котлы, электрические котлы, теплый пол, радиаторы, котельная, монтаж отопления, сервис котлов, аварийный ремонт отопления, техническое обслуживание, отопление квартиры, отопление коттеджа',
	authors: [{ name: 'ТеплоСервис' }],
	creator: 'ТеплоСервис',
	publisher: 'ТеплоСервис',
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	metadataBase: new URL('https://teploservice.ru'),
	alternates: {
		canonical: '/',
	},
	openGraph: {
		title: 'ТеплоСервис - Профессиональные системы отопления',
		description:
			'Установка, обслуживание и ремонт систем отопления. Надежные решения для вашего дома с гарантией качества.',
		url: 'https://teploservice.ru',
		siteName: 'ТеплоСервис',
		images: [
			{
				url: '/og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'ТеплоСервис - Системы отопления',
			},
		],
		locale: 'ru_RU',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'ТеплоСервис - Профессиональные системы отопления',
		description:
			'Установка, обслуживание и ремонт систем отопления. Надежные решения для вашего дома.',
		images: ['/og-image.jpg'],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	category: 'Услуги отопления',
	classification: 'Бизнес',
	other: {
		'yandex-verification': 'your-yandex-verification-code',
		'google-site-verification': 'your-google-verification-code',
	},
	generator: 'v0.app',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang='ru'
			className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased`}
		>
			<head>
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'LocalBusiness',
							'@id': 'https://teploservice.ru/#organization',
							name: 'ТеплоСервис',
							description:
								'Профессиональная установка, обслуживание и ремонт систем отопления',
							url: 'https://teploservice.ru',
							telephone: '+7 (495) 123-45-67',
							email: 'info@teploservice.ru',
							foundingDate: '2010',
							priceRange: '$$',
							paymentAccepted: ['Cash', 'Credit Card', 'Bank Transfer'],
							currenciesAccepted: 'RUB',
							address: {
								'@type': 'PostalAddress',
								streetAddress: 'ул. Примерная, 123',
								addressLocality: 'Москва',
								addressRegion: 'Московская область',
								postalCode: '123456',
								addressCountry: 'RU',
							},
							geo: {
								'@type': 'GeoCoordinates',
								latitude: '55.7558',
								longitude: '37.6176',
							},
							openingHours: ['Mo-Fr 08:00-20:00', 'Sa-Su 09:00-18:00'],
							serviceArea: {
								'@type': 'City',
								name: 'Белгород',
							},
							areaServed: [
								{
									'@type': 'City',
									name: 'Белгород',
								},
								{
									'@type': 'State',
									name: 'Белгородская область',
								},
							],
							aggregateRating: {
								'@type': 'AggregateRating',
								ratingValue: '4.9',
								reviewCount: '127',
								bestRating: '5',
								worstRating: '1',
							},
							hasOfferCatalog: {
								'@type': 'OfferCatalog',
								name: 'Услуги по отоплению',
								itemListElement: [
									{
										'@type': 'Offer',
										name: 'Установка систем отопления',
										description:
											'Профессиональная установка современных систем отопления',
										price: '45000',
										priceCurrency: 'RUB',
										availability: 'https://schema.org/InStock',
										itemOffered: {
											'@type': 'Service',
											name: 'Установка систем отопления',
											serviceType: 'Отопление',
										},
									},
									{
										'@type': 'Offer',
										name: 'Обслуживание систем отопления',
										description:
											'Регулярное техническое обслуживание систем отопления',
										price: '3500',
										priceCurrency: 'RUB',
										availability: 'https://schema.org/InStock',
										itemOffered: {
											'@type': 'Service',
											name: 'Обслуживание систем отопления',
											serviceType: 'Техническое обслуживание',
										},
									},
									{
										'@type': 'Offer',
										name: 'Экстренный ремонт отопления',
										description: 'Круглосуточная служба экстренного ремонта',
										price: '2000',
										priceCurrency: 'RUB',
										availability: 'https://schema.org/InStock',
										itemOffered: {
											'@type': 'Service',
											name: 'Экстренный ремонт отопления',
											serviceType: 'Аварийный ремонт',
										},
									},
								],
							},
							sameAs: [
								'https://vk.com/teploservice',
								'https://t.me/teploservice',
								'https://wa.me/74951234567',
							],
						}),
					}}
				/>
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'FAQPage',
							mainEntity: [
								{
									'@type': 'Question',
									name: 'Сколько стоит установка системы отопления?',
									acceptedAnswer: {
										'@type': 'Answer',
										text: 'Стоимость установки системы отопления начинается от 45 000 рублей и зависит от площади помещения, типа оборудования и сложности монтажа. Мы предоставляем бесплатную консультацию и расчет стоимости.',
									},
								},
								{
									'@type': 'Question',
									name: 'Какая гарантия на ваши работы?',
									acceptedAnswer: {
										'@type': 'Answer',
										text: 'Мы предоставляем гарантию 5 лет на все виды работ по установке систем отопления, 2 года на ремонтные работы и 1 год на техническое обслуживание.',
									},
								},
								{
									'@type': 'Question',
									name: 'Работаете ли вы в выходные дни?',
									acceptedAnswer: {
										'@type': 'Answer',
										text: 'Да, мы работаем в выходные дни с 9:00 до 18:00. Служба экстренного ремонта работает круглосуточно 24/7.',
									},
								},
							],
						}),
					}}
				/>
				<meta
					name='yandex-verification'
					content='your-yandex-verification-code'
				/>
				<meta
					name='google-site-verification'
					content='your-google-verification-code'
				/>
				<link rel='canonical' href='https://teploservice.ru' />
			</head>
			<body className='font-sans'>{children}</body>
		</html>
	)
}
