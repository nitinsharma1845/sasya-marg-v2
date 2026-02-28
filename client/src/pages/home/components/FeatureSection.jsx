import React from 'react'
import { Sprout, TrendingUp, BookOpen, Tractor } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const FeaturesSection = () => {
  const { t } = useTranslation()

  const features = [
    {
      title: t('home.featuresSection.items.aiCrop.title'),
      description: t('home.featuresSection.items.aiCrop.description'),
      icon: <Sprout className='h-6 w-6 text-primary' />,
      link: '/crop-suggestion'
    },
    {
      title: t('home.featuresSection.items.multipleFarmlands.title'),
      description: t(
        'home.featuresSection.items.multipleFarmlands.description'
      ),
      icon: <Tractor className='h-6 w-6 text-chart-1' />,
      link: '/weather'
    },
    {
      title: t('home.featuresSection.items.onlineMandi.title'),
      description: t('home.featuresSection.items.onlineMandi.description'),
      icon: <TrendingUp className='h-6 w-6 text-accent' />,
      link: '/market-place'
    },
    {
      title: t('home.featuresSection.items.govtSchemes.title'),
      description: t('home.featuresSection.items.govtSchemes.description'),
      icon: <BookOpen className='h-6 w-6 text-destructive' />,
      link: '/schemes'
    }
  ]

  return (
    <section className='bg-secondary py-20 lg:py-32'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl text-center mb-16'>
          <h2 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
            {t('home.featuresSection.heading.line1')}{' '}
            <span className='text-primary'>
              {t('home.featuresSection.heading.highlight')}
            </span>
          </h2>

          <p className='mt-4 text-lg text-muted-foreground'>
            {t('home.featuresSection.description')}
          </p>
        </div>

        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all hover:shadow-lg hover:-translate-y-1'
            >
              <div className='mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary group-hover:bg-primary/10 transition-colors'>
                {feature.icon}
              </div>

              <h3 className='mb-3 text-xl font-semibold text-foreground'>
                {feature.title}
              </h3>

              <p className='text-muted-foreground leading-relaxed'>
                {feature.description}
              </p>

              <div className='absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all duration-300 group-hover:w-full' />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
