import { Clock, Shield, Star, CheckCircle } from "lucide-react"

export default function AdvantagesSection() {
  return (
    <section id="advantages" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-gray-900 mb-4">
            Почему выбирают ТеплоСервис для отопления дома
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Профессиональный подход и качественное обслуживание систем отопления на каждом этапе
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="text-center group">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-bold font-heading text-lg mb-2">Быстрый выезд</h3>
            <p className="text-gray-600 text-sm sm:text-base">Выезд мастера в течение 2 часов после заявки</p>
          </div>

          <div className="text-center group">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-bold font-heading text-lg mb-2">Гарантия качества</h3>
            <p className="text-gray-600 text-sm sm:text-base">5 лет гарантии на все виды работ и оборудование</p>
          </div>

          <div className="text-center group">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Star className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-bold font-heading text-lg mb-2">Опытные мастера</h3>
            <p className="text-gray-600 text-sm sm:text-base">Сертифицированные специалисты с опытом от 10 лет</p>
          </div>

          <div className="text-center group">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-bold font-heading text-lg mb-2">Фиксированные цены</h3>
            <p className="text-gray-600 text-sm sm:text-base">Никаких скрытых доплат, цена фиксируется заранее</p>
          </div>
        </div>
      </div>
    </section>
  )
}
