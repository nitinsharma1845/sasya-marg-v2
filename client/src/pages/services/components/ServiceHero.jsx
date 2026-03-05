import React from 'react'
import { Sparkles, Sprout, TrendingUp, Book } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const iconMap = {
  Sprout,
  TrendingUp,
  Book
}

const ServiceHero = ({
  scrollToSuggestion,
  scrollToMarket,
  scrollToScheme,
  scrollToWishlist
}) => {
  const { t } = useTranslation()

  const popularItems = t('service.hero.popularItems', { returnObjects: true })
  const features = t('service.hero.features', { returnObjects: true })

  const scrollMap = [
    scrollToSuggestion,
    scrollToMarket,
    scrollToScheme,
    scrollToWishlist
  ]

  return (
    <section className='relative w-full overflow-hidden bg-background pt-16 pb-12 lg:pt-24 lg:pb-20 border-b border-border'>
      <div className='absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]'></div>

      <div className='container relative mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-3xl text-center'>
          <div className='inline-flex items-center rounded-full border border-primary/20 bg-secondary/50 px-3 py-1 text-sm font-medium text-primary mb-6 backdrop-blur-sm'>
            <Sparkles className='mr-2 h-4 w-4 fill-primary' />
            {t('service.hero.badge')}
          </div>

          <h1 className='text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl mb-6'>
            {t('service.hero.titleLine1')} <br />
            <span className='text-transparent bg-clip-text bg-linear-to-r from-primary to-accent'>
              {t('service.hero.titleHighlight')}
            </span>
          </h1>

          <p className='mt-4 text-lg text-muted-foreground leading-relaxed mb-10'>
            {t('service.hero.description')}
          </p>

          <div className='relative mx-auto max-w-xl'>
            <div className='mt-4 flex flex-wrap justify-center gap-2 text-xs text-muted-foreground'>
              <span>{t('service.hero.popularLabel')}</span>

              {popularItems?.map((item, index) => (
                <React.Fragment key={index}>
                  <span
                    onClick={() => scrollMap[index]?.()}
                    className='cursor-pointer hover:text-primary underline decoration-dotted'
                  >
                    {item}
                  </span>

                  {index !== popularItems.length - 1 && <span>•</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className='mt-16 grid grid-cols-3 gap-4 md:gap-8 opacity-50 grayscale transition-all duration-500 hover:grayscale-0 hover:opacity-100 max-w-4xl mx-auto'>
          {features?.map((feature, index) => {
            const Icon = iconMap[feature.icon]

            return (
              <div
                key={index}
                className='flex flex-col items-center justify-center p-4 rounded-xl bg-secondary/20 border border-transparent hover:border-border transition-all'
              >
                {Icon && <Icon className='h-8 w-8 text-primary mb-2' />}
                <span className='font-semibold text-foreground text-sm'>
                  {feature.title}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ServiceHero
