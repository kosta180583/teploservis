import AdvantagesSection from '@/components/advantages-section'
import ContactSection from '@/components/contact-section'
import Footer from '@/components/footer'
import Header from '@/components/header'
import HeroSection from '@/components/hero-section'
import ServicesSection from '@/components/services-section'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title:
		'Установка и ремонт систем отопления в Белгороде | ТеплоСервис - Профессиональный монтаж котлов',
	description:
		'Профессиональная установка газовых котлов, монтаж радиаторов и теплых полов в Москве. Экстренный ремонт 24/7, гарантия 5 лет. Бесплатная консультация ☎ +7 (495) 123-45-67',
	keywords:
		'установка котлов москва, монтаж радиаторов, теплый пол, ремонт отопления, газовый котел, система отопления, отопление дома, котельная, теплоснабжение',
	authors: [{ name: 'ТеплоСервис' }],
	creator: 'ТеплоСервис',
	publisher: 'ТеплоСервис',
	robots: 'index, follow',
	openGraph: {
		type: 'website',
		locale: 'ru_RU',
		url: 'https://teploservice.ru',
		siteName: 'ТеплоСервис',
		title: 'Установка и ремонт систем отопления в Москве | ТеплоСервис',
		description:
			'Профессиональная установка газовых котлов, монтаж радиаторов и теплых полов в Москве. Экстренный ремонт 24/7, гарантия 5 лет.',
		images: [
			{
				url: '/modern-heating-installation.png',
				width: 1200,
				height: 630,
				alt: 'Установка системы отопления - ТеплоСервис',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Установка и ремонт систем отопления в Москве | ТеплоСервис',
		description:
			'Профессиональная установка газовых котлов, монтаж радиаторов и теплых полов в Москве. Экстренный ремонт 24/7, гарантия 5 лет.',
		images: ['/modern-heating-installation.png'],
	},
	alternates: {
		canonical: 'https://teploservice.ru',
	},
}

export default function HeatingLandingPage() {
	return (
		<div className='min-h-screen bg-background'>
			{/* Структурированные данные для SEO */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'LocalBusiness',
						name: 'ТеплоСервис',
						description:
							'Профессиональная установка и ремонт систем отопления в Москве',
						url: 'https://teploservice.ru',
						telephone: '+7-495-123-45-67',
						email: 'info@teploservice.ru',
						address: {
							'@type': 'PostalAddress',
							streetAddress: 'ул. Примерная, 123',
							addressLocality: 'Москва',
							addressCountry: 'RU',
						},
						geo: {
							'@type': 'GeoCoordinates',
							latitude: '55.7558',
							longitude: '37.6176',
						},
						openingHours: ['Mo-Fr 08:00-20:00', 'Sa-Su 09:00-18:00'],
						priceRange: '$$',
						image: 'https://teploservice.ru/modern-heating-installation.png',
						serviceArea: {
							'@type': 'City',
							name: 'Москва',
						},
						hasOfferCatalog: {
							'@type': 'OfferCatalog',
							name: 'Услуги по отоплению',
							itemListElement: [
								{
									'@type': 'Offer',
									itemOffered: {
										'@type': 'Service',
										name: 'Установка систем отопления',
										description:
											'Профессиональная установка газовых и электрических котлов, радиаторов, теплых полов',
									},
								},
								{
									'@type': 'Offer',
									itemOffered: {
										'@type': 'Service',
										name: 'Ремонт систем отопления',
										description:
											'Экстренный ремонт котлов, радиаторов, устранение протечек 24/7',
									},
								},
								{
									'@type': 'Offer',
									itemOffered: {
										'@type': 'Service',
										name: 'Техническое обслуживание',
										description:
											'Регулярное ТО систем отопления, чистка, настройка, профилактика',
									},
								},
							],
						},
						aggregateRating: {
							'@type': 'AggregateRating',
							ratingValue: '4.9',
							reviewCount: '127',
						},
					}),
				}}
			/>

			<Header />

			<main>
				<HeroSection />
				<AdvantagesSection />
				<ServicesSection />
				<ContactSection />
			</main>

			<Footer />
		</div>
	)
}
