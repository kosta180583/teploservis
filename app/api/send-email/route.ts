import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
const nodemailer = require('nodemailer')

export const runtime = 'nodejs' // явно укажем node-рантайм

type Payload = {
	name: string
	email: string
	phone: string
	serviceType?: string
	preferredDate?: string
	message?: string
	privacyConsent?: boolean
}

export async function POST(request: NextRequest) {
	try {
		const body: Payload = await request.json()

		// Базовая валидация
		const name = (body?.name ?? '').trim()
		const email = (body?.email ?? '').trim()
		const phone = (body?.phone ?? '').trim()
		const serviceType = (body?.serviceType ?? '').trim()
		const preferredDate = (body?.preferredDate ?? '').trim()
		const message = (body?.message ?? '').trim()
		const privacyConsent = Boolean(body?.privacyConsent)

		if (!name || !email || !phone) {
			return NextResponse.json(
				{ error: 'Обязательные поля не заполнены' },
				{ status: 400 }
			)
		}
		if (!privacyConsent) {
			return NextResponse.json(
				{ error: 'Необходимо согласие на обработку персональных данных' },
				{ status: 400 }
			)
		}

		// Проверка env
		const user = process.env.YANDEX_USER
		const pass = process.env.YANDEX_PASS
		const to = process.env.YANDEX_TO || process.env.YANDEX_USER
		const siteName = process.env.SITE_NAME || 'Сайт'

		if (!user || !pass || !to) {
			console.error('ENV error: YANDEX_USER/YANDEX_PASS/YANDEX_TO')
			return NextResponse.json(
				{ error: 'Сервис временно недоступен' },
				{ status: 500 }
			)
		}

		// Транспорт SMTP Яндекс
		const transporter = nodemailer.createTransport({
			host: 'smtp.yandex.ru',
			port: 465,
			secure: true, // SSL
			auth: { user, pass },
		})

		// Человечный текст услуги
		const serviceReadable = mapServiceType(serviceType)

		// Собираем письмо
		const subject = `Новая заявка (${siteName}) — ${name}`
		const emailText = `
Новая заявка с сайта ${siteName}

Имя: ${name}
Email: ${email}
Телефон: ${phone}
Тип услуги: ${serviceReadable || 'Не указан'}
Предпочтительная дата: ${preferredDate || 'Не указана'}
Сообщение: ${message || 'Не указано'}

Согласие с политикой: ${privacyConsent ? 'Да' : 'Нет'}
Дата заявки: ${new Date().toLocaleString('ru-RU')}
`.trim()

		const emailHtml = `
<div style="font-family:system-ui,Arial,sans-serif;line-height:1.5">
  <h2 style="margin:0 0 12px">Новая заявка с сайта ${escapeHtml(siteName)}</h2>
  <p><b>Имя:</b> ${escapeHtml(name)}</p>
  <p><b>Email:</b> ${escapeHtml(email)}</p>
  <p><b>Телефон:</b> ${escapeHtml(phone)}</p>
  <p><b>Тип услуги:</b> ${escapeHtml(serviceReadable || 'Не указан')}</p>
  <p><b>Предпочтительная дата:</b> ${escapeHtml(
		preferredDate || 'Не указана'
	)}</p>
  <p><b>Сообщение:</b><br>${escapeHtml(message || 'Не указано').replace(
		/\n/g,
		'<br/>'
	)}</p>
  <p><b>Согласие с политикой:</b> ${privacyConsent ? 'Да' : 'Нет'}</p>
  <hr style="border:none;border-top:1px solid #eee;margin:12px 0"/>
  <p style="color:#666">Дата заявки: ${escapeHtml(
		new Date().toLocaleString('ru-RU')
	)}</p>
</div>
`.trim()

		// Отправляем
		await transporter.sendMail({
			from: `"${siteName}" <${user}>`, // должен совпадать с auth.user
			to,
			replyTo: email, // удобно отвечать клиенту
			subject,
			text: emailText,
			html: emailHtml,
		})

		return NextResponse.json({
			success: true,
			message: 'Заявка успешно отправлена',
		})
	} catch (err) {
		console.error('MAIL_ERROR:', err)
		return NextResponse.json(
			{ error: 'Ошибка отправки заявки' },
			{ status: 500 }
		)
	}
}

// утилиты

function mapServiceType(code?: string) {
	switch ((code || '').toLowerCase()) {
		case 'installation':
			return 'Установка системы'
		case 'maintenance':
			return 'Обслуживание'
		case 'repair':
			return 'Ремонт'
		case 'consultation':
			return 'Консультация'
		default:
			return code || ''
	}
}

function escapeHtml(str: string) {
	return str
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#039;')
}
