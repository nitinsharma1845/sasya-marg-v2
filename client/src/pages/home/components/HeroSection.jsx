import React from 'react'
import {
  ArrowRight,
  Sprout,
  ShieldCheck,
  CloudSun,
  CheckCircle2,
  AlertTriangle,
  XCircle
} from 'lucide-react'
import { Link } from 'react-router-dom'

const HeroSection = () => {
  return (
    <section className='relative w-full overflow-hidden bg-background pt-12 pb-20 lg:pt-20 lg:pb-28'>
      <div className='absolute top-0 right-0 -mr-20 -mt-20 h-125 w-125 rounded-full bg-primary/10 blur-3xl filter' />
      <div className='absolute bottom-0 left-0 -ml-20 -mb-20 h-100 w-100 rounded-full bg-accent/10 blur-3xl filter' />

      <div className='container relative mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid gap-12 lg:grid-cols-2 lg:items-center'>
          <div className='flex flex-col items-start space-y-6'>
            <div className='inline-flex items-center rounded-full border border-primary/20 bg-secondary px-3 py-1 text-xs font-medium text-primary'>
              <span className='flex h-2 w-2 rounded-full bg-accent mr-2 animate-pulse'></span>
              AI Model 1.0 Live Now
            </div>

            <h1 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl'>
              Cultivating the Future with{' '}
              <span className='text-primary'>Smart Data.</span>
            </h1>

            <p className='max-w-xl text-base text-muted-foreground sm:text-lg'>
              Empower your farm with Sasya-Marg. Get precise crop suggestions
              based on your soil and water levels to maximize your yield.
            </p>

            <div className='flex flex-col w-full gap-3 sm:flex-row sm:w-auto pt-2'>
              <Link
                to='/farmer/login'
                className='inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
              >
                Start as Farmer
                <ArrowRight className='ml-2 h-4 w-4' />
              </Link>

              <Link
                to='/buyer/login'
                className='inline-flex h-11 items-center justify-center rounded-md bg-accent px-8 text-sm font-medium text-accent-foreground shadow transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
              >
                Start as Buyer
                <ArrowRight className='ml-2 h-4 w-4' />
              </Link>
            </div>

            <div className='mt-8 flex items-center gap-6 text-sm text-muted-foreground'>
              <div className='flex items-center gap-2'>
                <ShieldCheck className='h-4 w-4 text-primary' />
                <span>Verified Logic</span>
              </div>
              <div className='flex items-center gap-2'>
                <CloudSun className='h-4 w-4 text-primary' />
                <span>Season Aware</span>
              </div>
            </div>
          </div>

          <div className='relative mx-auto w-full max-w-112.5 lg:max-w-none'>
            <div className='relative rounded-2xl border border-border bg-card p-6 shadow-xl'>
              <div className='flex items-center justify-between border-b border-border pb-4 mb-4'>
                <div className='flex items-center gap-3'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary'>
                    <Sprout className='h-6 w-6' />
                  </div>
                  <div>
                    <p className='text-sm font-medium text-foreground'>
                      Crop Suggestions
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      Based on your Soil & Water
                    </p>
                  </div>
                </div>
              </div>

              <div className='space-y-3'>
                <div className='flex items-center justify-between rounded-lg border border-border bg-background p-3 hover:border-primary/50 transition-colors cursor-pointer'>
                  <div className='flex items-center gap-3'>
                    <div className='h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-xl'>
                      🥔
                    </div>
                    <div>
                      <p className='text-sm font-bold text-foreground'>
                        Potato
                      </p>
                      <p className='text-xs text-muted-foreground'>
                        High Yield Potential
                      </p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <div className='flex items-center justify-end gap-1 text-primary'>
                      <span className='text-sm font-bold'>98%</span>
                      <CheckCircle2 className='h-4 w-4' />
                    </div>
                    <span className='text-[10px] text-primary uppercase font-semibold'>
                      Recommended
                    </span>
                  </div>
                </div>

                <div className='flex items-center justify-between rounded-lg border border-border bg-background p-3 opacity-90'>
                  <div className='flex items-center gap-3'>
                    <div className='h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center text-xl'>
                      🌾
                    </div>
                    <div>
                      <p className='text-sm font-bold text-foreground'>Wheat</p>
                      <p className='text-xs text-muted-foreground'>
                        Moderate Water Req
                      </p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <div className='flex items-center justify-end gap-1 text-accent/80'>
                      <span className='text-sm font-bold'>75%</span>
                      <AlertTriangle className='h-4 w-4' />
                    </div>
                    <span className='text-[10px] text-accent/80 uppercase font-semibold'>
                      Average
                    </span>
                  </div>
                </div>

                <div className='flex items-center justify-between rounded-lg border border-border bg-background p-3 opacity-75'>
                  <div className='flex items-center gap-3'>
                    <div className='h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center text-xl'>
                      🍚
                    </div>
                    <div>
                      <p className='text-sm font-bold text-foreground'>Rice</p>
                      <p className='text-xs text-muted-foreground'>
                        Water Scarcity Risk
                      </p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <div className='flex items-center justify-end gap-1 text-destructive'>
                      <span className='text-sm font-bold'>30%</span>
                      <XCircle className='h-4 w-4' />
                    </div>
                    <span className='text-[10px] text-destructive uppercase font-semibold'>
                      Risky
                    </span>
                  </div>
                </div>
              </div>

              <div className='mt-4 pt-3 border-t border-border text-center'>
                <p className='text-xs text-muted-foreground'>
                  AI analysis complete for UP West Region
                </p>
              </div>
            </div>

            <div className='absolute -bottom-5 -right-5 -z-10 h-full w-full rounded-2xl bg-secondary/80'></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
