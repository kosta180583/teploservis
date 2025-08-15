import { Button } from '@/components/ui/button'
import { Award } from 'lucide-react'

export default function HeroSection() {
	return (
		<section className='relative py-8 sm:py-12 lg:py-32 bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 overflow-hidden'>
			<div className='absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10'></div>
			<div className='absolute top-0 right-0 -translate-y-12 translate-x-12'>
				<div className='w-32 h-32 sm:w-48 sm:h-48 lg:w-72 lg:h-72 bg-gradient-to-br from-blue-400/20 to-sky-400/20 rounded-full blur-3xl'></div>
			</div>

			<div className='container mx-auto px-3 sm:px-4 relative max-w-7xl'>
				<div className='grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center'>
					<div className='text-center lg:text-left'>
						<div className='inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4 lg:mb-6'>
							<Award className='h-3 w-3 sm:h-4 sm:w-4' />
							Работаем с 2010 года
						</div>
						<h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-heading text-gray-900 mb-3 sm:mb-4 lg:mb-6 leading-tight break-words'>
							Профессиональная установка и ремонт
							<span className='text-blue-600 block sm:inline'>
								{' '}
								систем отопления в Москве
							</span>
						</h1>
						<p className='text-base sm:text-lg lg:text-xl text-gray-600 mb-4 sm:mb-6 lg:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0'>
							Надежная установка котлов, радиаторов и теплых полов с гарантией
							качества 5 лет. Экстренный ремонт 24/7, бесплатная консультация и
							выезд мастера.
						</p>
						<div className='flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6 lg:mb-8 justify-center lg:justify-start'>
							<Button
								size='lg'
								className='bg-blue-600 hover:bg-blue-700 text-sm sm:text-base lg:text-lg px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 shadow-lg hover:shadow-xl transition-all w-full sm:w-auto'
								asChild
							>
								<a href='#contact'>Получить консультацию</a>
							</Button>
							<Button
								variant='outline'
								size='lg'
								className='text-sm sm:text-base lg:text-lg px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 bg-white/80 backdrop-blur hover:bg-white transition-all w-full sm:w-auto'
								asChild
							>
								<a href='#services'>Узнать больше</a>
							</Button>
						</div>

						<div className='grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6 pt-4 sm:pt-6 lg:pt-8 border-t border-gray-200 max-w-sm sm:max-w-md mx-auto lg:max-w-none lg:mx-0'>
							<div className='text-center'>
								<div className='text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1'>
									500+
								</div>
								<div className='text-xs sm:text-sm text-gray-600 leading-tight'>
									Довольных клиентов
								</div>
							</div>
							<div className='text-center'>
								<div className='text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1'>
									24/7
								</div>
								<div className='text-xs sm:text-sm text-gray-600 leading-tight'>
									Экстренная служба
								</div>
							</div>
							<div className='text-center'>
								<div className='text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1'>
									5 лет
								</div>
								<div className='text-xs sm:text-sm text-gray-600 leading-tight'>
									Гарантия
								</div>
							</div>
						</div>
					</div>
					<div className='relative order-first lg:order-last mt-4 sm:mt-0'>
						<div className='absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-blue-600/20 to-sky-600/20 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl'></div>
						<img
							src='/modern-heating-installation.png'
							alt='Современная система отопления - установка газового котла и радиаторов в доме'
							className='relative rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl w-full max-w-xs sm:max-w-md mx-auto lg:max-w-none'
						/>
					</div>
				</div>
			</div>
		</section>
	)
}
