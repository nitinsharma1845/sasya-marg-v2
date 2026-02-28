import React from 'react'
import { ClipboardList, Cpu, Sprout } from 'lucide-react'
import { Link } from 'react-router-dom'

const steps = [
  {
    number: '01',
    title: 'Enter Farm Details',
    description:
      'Input your region, soil type (e.g., Black, Alluvial), and water availability to help us understand your land.',
    icon: <ClipboardList className='h-8 w-8 text-primary' />
  },
  {
    number: '02',
    title: 'AI Analysis',
    description:
      'Our rule-based AI cross-references your data with weather forecasts and historical crop patterns.',
    icon: <Cpu className='h-8 w-8 text-accent' />
  },
  {
    number: '03',
    title: 'Get Recommendations',
    description:
      'Receive a tailored list of crops with high success rates, estimated yield, and market price potential.',
    icon: <Sprout className='h-8 w-8 text-green-600' />
  }
]

const HowItWorks = () => {
  return (
    <section className='bg-background py-20 lg:py-32'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl text-center mb-16'>
          <h2 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
            From Data to <span className='text-primary'>Harvest.</span>
          </h2>
          <p className='mt-4 text-lg text-muted-foreground'>
            Get accurate crop suggestions in just three simple steps.
          </p>
        </div>

        <div className='relative grid gap-12 md:grid-cols-3'>
          <div className='absolute top-12 left-0 hidden w-full md:block'>
            <div className='h-0.5 w-full bg-linear-to-r from-transparent via-border to-transparent border-t-2 border-dashed border-border/60'></div>
          </div>

          {steps.map((step, index) => (
            <div
              key={index}
              className='relative flex flex-col items-center text-center'
            >
              <div className='relative mb-6 flex h-24 w-24 items-center justify-center rounded-full border-4 border-background bg-secondary shadow-sm z-10'>
                {step.icon}
                <div className='absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground border-4 border-background'>
                  {step.number}
                </div>
              </div>

              <h3 className='mb-3 text-xl font-bold text-foreground'>
                {step.title}
              </h3>

              <p className='max-w-xs text-muted-foreground'>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
