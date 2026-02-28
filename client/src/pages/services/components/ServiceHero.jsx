import React from 'react'
import {
  Search,
  Sparkles,
  Sprout,
  CloudSun,
  TrendingUp,
  Book
} from 'lucide-react'

const ServiceHero = () => {
  return (
    <section className='relative w-full overflow-hidden bg-background pt-16 pb-12 lg:pt-24 lg:pb-20 border-b border-border'>
      <div className='absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]'></div>
      <div className='absolute left-0 right-0 top-0 -z-10 m-auto h-77.5 w-77.5 rounded-full bg-primary/20 opacity-20 blur-[100px]'></div>

      <div className='container relative mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-3xl text-center'>
          <div className='inline-flex items-center rounded-full border border-primary/20 bg-secondary/50 px-3 py-1 text-sm font-medium text-primary mb-6 backdrop-blur-sm'>
            <Sparkles className='mr-2 h-4 w-4 fill-primary' />
            AI-Powered Agricultural Suite
          </div>

          <h1 className='text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl mb-6'>
            Smart Tools for <br />
            <span className='text-transparent bg-clip-text bg-linear-to-r from-primary to-accent'>
              Great Harvests
            </span>
          </h1>

          <p className='mt-4 text-lg text-muted-foreground leading-relaxed mb-10'>
            Access our complete range of farming services. From crop suggestion
            to online market insights, everything you need to grow better is
            right here.
          </p>

          <div className='relative mx-auto max-w-xl'>
            <div className='mt-4 flex flex-wrap justify-center gap-2 text-xs text-muted-foreground'>
              <span>Popular:</span>
              <span className='cursor-pointer hover:text-primary underline decoration-dotted'>
                Crop Prediction
              </span>
              <span>•</span>
              <span className='cursor-pointer hover:text-primary underline decoration-dotted'>
                Mandi
              </span>
            </div>
          </div>
        </div>

        <div className='mt-16 grid grid-cols-3 gap-4 md:gap-8 opacity-50 grayscale transition-all duration-500 hover:grayscale-0 hover:opacity-100 max-w-4xl mx-auto'>
          <div className='flex flex-col items-center justify-center p-4 rounded-xl bg-secondary/20 border border-transparent hover:border-border transition-all'>
            <Sprout className='h-8 w-8 text-primary mb-2' />
            <span className='font-semibold text-foreground text-sm'>
              Agri-AI
            </span>
          </div>
          <div className='flex flex-col items-center justify-center p-4 rounded-xl bg-secondary/20 border border-transparent hover:border-border transition-all'>
            <TrendingUp className='h-8 w-8 text-accent mb-2' />
            <span className='font-semibold text-foreground text-sm'>
              Market
            </span>
          </div>
          <div className='flex flex-col items-center justify-center p-4 rounded-xl bg-secondary/20 border border-transparent hover:border-border transition-all'>
            <Book className='h-8 w-8 text-chart-2/80 mb-2' />
            <span className='font-semibold text-foreground text-sm'>
              Schemes
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServiceHero
