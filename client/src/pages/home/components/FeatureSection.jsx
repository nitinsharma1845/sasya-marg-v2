import React from 'react'
import { Sprout, TrendingUp, BookOpen, Tractor } from 'lucide-react'

const features = [
  {
    title: 'AI Crop Suggestion',
    description:
      'Our rule-based AI analyzes your soil type (Black, Alluvial) and water availability to recommend the perfect crop.',
    icon: <Sprout className='h-6 w-6 text-primary' />,
    link: '/crop-suggestion'
  },
  {
    title: 'Add multiple farmlands',
    description:
      'You can manage and add multiple farmlands at multiple location and get personalized suggestion for the crop.',
    icon: <Tractor className='h-6 w-6 text-chart-1' />,
    link: '/weather'
  },
  {
    title: 'Online Mandi',
    description:
      'List your crop on E-commers to get the direct custumer with out middleman , you can also list crop even before harvesting.',
    icon: <TrendingUp className='h-6 w-6 text-accent' />,
    link: '/market-place'
  },
  {
    title: 'Government Schemes',
    description:
      'Stay informed about the latest subsidies, insurance plans, and financial aid available for farmers.',
    icon: <BookOpen className='h-6 w-6 text-destructive' />,
    link: '/schemes'
  }
]

const FeaturesSection = () => {
  return (
    <section className='bg-secondary py-20 lg:py-32'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl text-center mb-16'>
          <h2 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
            Everything you need to{' '}
            <span className='text-primary'>Farm Better.</span>
          </h2>
          <p className='mt-4 text-lg text-muted-foreground'>
            Sasya-Marg combines traditional farming wisdom with cutting-edge
            technology to help you make profitable decisions.
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
