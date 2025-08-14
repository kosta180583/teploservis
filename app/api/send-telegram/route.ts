import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, serviceType, preferredDate, message } = body

    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!botToken || !chatId) {
      return NextResponse.json({ error: "Telegram не настроен" }, { status: 500 })
    }

    // Форматируем сообщение для Telegram
    const telegramMessage = `
🔥 *НОВАЯ ЗАЯВКА НА ОТОПЛЕНИЕ*

👤 *Имя:* ${name}
📧 *Email:* ${email}
📱 *Телефон:* ${phone}
🔧 *Услуга:* ${serviceType || "Не указана"}
📅 *Дата:* ${preferredDate || "Не указана"}

💬 *Сообщение:*
${message || "Не указано"}

⏰ *Время заявки:* ${new Date().toLocaleString("ru-RU")}
    `.trim()

    // Отправляем в Telegram
    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
        parse_mode: "Markdown",
      }),
    })

    if (!telegramResponse.ok) {
      const telegramError = await telegramResponse.text()
      console.error("Telegram API error:", telegramError)
      throw new Error("Ошибка отправки в Telegram")
    }

    return NextResponse.json({
      success: true,
      message: "Заявка успешно отправлена в Telegram",
    })
  } catch (error) {
    console.error("Ошибка отправки в Telegram:", error)
    return NextResponse.json({ error: "Ошибка отправки заявки в Telegram" }, { status: 500 })
  }
}
