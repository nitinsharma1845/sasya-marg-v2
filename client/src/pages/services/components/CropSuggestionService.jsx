import React, { useState } from 'react'
import {
  Sprout,
  ArrowRight,
  CheckCircle2,
  ScanLine,
  Database,
  Sparkles,
  MapPin,
  CloudSun,
  AlertTriangle,
  XCircle,
  Wallet
} from 'lucide-react'
import { Link } from 'react-router-dom'

const CropSuggestionExplainer = () => {
  const [demoStep, setDemoStep] = useState('input')

  const runDemo = () => {
    setDemoStep('scanning')
    setTimeout(() => {
      setDemoStep('ai')
    }, 1500)
    setTimeout(() => {
      setDemoStep('result')
    }, 3500)
  }

  const resetDemo = () => {
    setDemoStep('input')
  }

  return (
    <section className='bg-background py-16 lg:py-24 overflow-hidden relative'>
      <div className='absolute top-0 right-0 w-150 h-150 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none'></div>
      <div className='absolute bottom-0 left-0 w-125 h-125 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none'></div>

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='grid lg:grid-cols-2 gap-16 items-center'>
          <div className='space-y-8'>
            <div>
              <div className='inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-6'>
                <Sparkles className='mr-2 h-3 w-3' />
                Intelligent Farming Flow
              </div>
              <h1 className='text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6'>
                From Data to <br />
                <span className='text-primary'>Profitable Harvest.</span>
              </h1>
              <p className='text-lg text-muted-foreground leading-relaxed'>
                Our system automates the complex science of agronomy. You
                provide the basics, and we handle the weather forecasting and
                market logic.
              </p>
            </div>

            <div className='space-y-6 relative'>
              <div className='relative flex items-start gap-4 p-4 rounded-xl hover:bg-secondary/30 transition-colors z-10 bg-background'>
                <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background text-primary'>
                  <span className='font-bold'>1</span>
                </div>
                <div>
                  <h4 className='font-bold text-foreground text-lg'>
                    Fill Farm Data
                  </h4>
                  <p className='text-sm text-muted-foreground mt-1'>
                    Enter Previous Crop, Soil Type, Water Source, and Budget.
                  </p>
                </div>
              </div>

              <div className='relative flex items-start gap-4 p-4 rounded-xl hover:bg-secondary/30 transition-colors z-10 bg-background'>
                <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background text-primary'>
                  <MapPin className='h-5 w-5' />
                </div>
                <div>
                  <h4 className='font-bold text-foreground text-lg'>
                    Auto-Location & Weather
                  </h4>
                  <p className='text-sm text-muted-foreground mt-1'>
                    We detect your region and fetch real-time rainfall & temp
                    forecasts automatically.
                  </p>
                </div>
              </div>

              <div className='relative flex items-start gap-4 p-4 rounded-xl hover:bg-secondary/30 transition-colors z-10 bg-background'>
                <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background text-primary'>
                  <ScanLine className='h-5 w-5' />
                </div>
                <div>
                  <h4 className='font-bold text-foreground text-lg'>
                    AI Layer Processing
                  </h4>
                  <p className='text-sm text-muted-foreground mt-1'>
                    Our Rule-Based AI matches your conditions against 20+ crop
                    models.
                  </p>
                </div>
              </div>

              <div className='relative flex items-start gap-4 p-4 rounded-xl hover:bg-secondary/30 transition-colors z-10 bg-background'>
                <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background text-primary'>
                  <Sprout className='h-5 w-5' />
                </div>
                <div>
                  <h4 className='font-bold text-foreground text-lg'>
                    Recommended Crops
                  </h4>
                  <p className='text-sm text-muted-foreground mt-1'>
                    Get a ranked list of top 3 crops suitable for your land.
                  </p>
                </div>
              </div>
            </div>

            <div className='pt-4'>
              <Link
                to='/farmer/login'
                className='inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-base font-medium text-primary-foreground shadow hover:bg-primary/90 transition-all hover:gap-3 gap-2'
              >
                Start Analysis
                <ArrowRight className='h-4 w-4' />
              </Link>
            </div>
          </div>

          <div className='relative'>
            <div className='relative mx-auto w-full max-w-95 rounded-[3rem] border-8 border-muted bg-background shadow-2xl overflow-hidden h-175 flex flex-col'>
              <div className='bg-primary px-6 pt-10 pb-6 text-primary-foreground shrink-0'>
                <div className='flex justify-between items-center mb-4'>
                  <div className='flex items-center gap-2'>
                    <div className='h-8 w-8 rounded-full bg-foreground/20 flex items-center justify-center'>
                      <Sprout className='h-5 w-5' />
                    </div>
                    <span className='font-bold'>Sasya-Marg</span>
                  </div>
                  <span className='text-[10px] font-medium bg-foregorund/20 px-2 py-1 rounded-full uppercase tracking-wide'>
                    Live Demo
                  </span>
                </div>
                <h3 className='text-xl font-bold'>Crop Assistant</h3>
                <p className='text-primary-foreground/80 text-xs'>
                  AI-Powered Farming
                </p>
              </div>

              <div className='p-6 grow flex flex-col overflow-hidden relative'>
                {demoStep === 'input' && (
                  <div className='space-y-5 animate-in fade-in zoom-in duration-300'>
                    <div className='space-y-1'>
                      <label className='text-[10px] font-bold text-muted-foreground uppercase tracking-wider'>
                        Previous Crop
                      </label>
                      <div className='h-12 w-full rounded-xl bg-secondary/30 border border-border flex items-center px-4 text-sm font-medium text-foreground'>
                        Potato (Aloo)
                      </div>
                    </div>

                    <div className='space-y-1'>
                      <label className='text-[10px] font-bold text-muted-foreground uppercase tracking-wider'>
                        Soil Type
                      </label>
                      <div className='h-12 w-full rounded-xl bg-secondary/30 border border-border flex items-center px-4 text-sm font-medium text-foreground'>
                        Black Soil (Kali Mitti)
                      </div>
                    </div>

                    <div className='space-y-1'>
                      <label className='text-[10px] font-bold text-muted-foreground uppercase tracking-wider'>
                        Water Source
                      </label>
                      <div className='h-12 w-full rounded-xl bg-secondary/30 border border-border flex items-center px-4 text-sm font-medium text-foreground'>
                        Tubewell Available
                      </div>
                    </div>

                    <div className='space-y-1'>
                      <label className='text-[10px] font-bold text-muted-foreground uppercase tracking-wider'>
                        Budget (Per Acre)
                      </label>
                      <div className='h-12 w-full rounded-xl bg-secondary/30 border border-border flex items-center justify-between px-4 text-sm font-medium text-foreground'>
                        <span>₹ 15,000</span>
                        <Wallet className='h-4 w-4 text-muted-foreground' />
                      </div>
                    </div>

                    <div className='pt-4 mt-auto'>
                      <button
                        onClick={runDemo}
                        className='w-full h-12 rounded-xl bg-foreground text-background font-bold shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2'
                      >
                        Find Best Crop
                      </button>
                    </div>
                  </div>
                )}

                {demoStep === 'scanning' && (
                  <div className='grow flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in duration-300'>
                    <div className='relative'>
                      <div className='absolute inset-0 bg-chart-2 rounded-full blur-xl animate-pulse'></div>
                      <MapPin className='h-16 w-16 text-chart-2/70 relative z-10 animate-bounce' />
                    </div>
                    <div>
                      <h4 className='font-bold text-foreground text-lg'>
                        Locating Farm...
                      </h4>
                      <p className='text-xs text-muted-foreground mt-1'>
                        Fetching Weather Data for <br />{' '}
                        <span className='text-primary font-semibold'>
                          Agra, UP West
                        </span>
                      </p>
                    </div>
                    <div className='flex gap-2 text-xs bg-secondary/50 px-4 py-2 rounded-lg'>
                      <CloudSun className='h-4 w-4 text-accent' /> 32°C / 80%
                      Humidity
                    </div>
                  </div>
                )}

                {demoStep === 'ai' && (
                  <div className='grow flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in duration-300'>
                    <div className='relative h-20 w-20'>
                      <div className='absolute inset-0 border-4 border-secondary rounded-full'></div>
                      <div className='absolute inset-0 border-4 border-t-primary rounded-full animate-spin'></div>
                      <div className='absolute inset-0 flex items-center justify-center'>
                        <ScanLine className='h-8 w-8 text-primary' />
                      </div>
                    </div>
                    <div>
                      <h4 className='font-bold text-foreground text-lg'>
                        AI Processing
                      </h4>
                      <p className='text-xs text-muted-foreground mt-1'>
                        Matching soil & budget against <br /> 20+ crop models...
                      </p>
                    </div>
                  </div>
                )}

                {demoStep === 'result' && (
                  <div className='space-y-3 animate-in slide-in-from-bottom-10 duration-500 overflow-y-auto pb-4 custom-scrollbar'>
                    <div className='text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2'>
                      Top Recommendations
                    </div>

                    <div className='relative overflow-hidden rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 transition-all hover:scale-[1.02] cursor-pointer shadow-sm'>
                      <div className='absolute top-0 right-0 bg-green-600 text-white text-[10px] px-2 py-1 rounded-bl-lg font-bold'>
                        98% Match
                      </div>
                      <div className='flex items-center gap-3'>
                        <div className='h-10 w-10 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center text-lg'>
                          🌻
                        </div>
                        <div>
                          <h4 className='font-bold text-green-900 dark:text-green-100 text-sm'>
                            Sunflower
                          </h4>
                          <p className='text-[10px] text-green-700 dark:text-green-300'>
                            High Profit • Low Water
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className='relative overflow-hidden rounded-2xl bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 p-4 transition-all hover:scale-[1.02] cursor-pointer opacity-90'>
                      <div className='absolute top-0 right-0 bg-yellow-500 text-white text-[10px] px-2 py-1 rounded-bl-lg font-bold'>
                        85% Match
                      </div>
                      <div className='flex items-center gap-3'>
                        <div className='h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-800 flex items-center justify-center text-lg'>
                          🌽
                        </div>
                        <div>
                          <h4 className='font-bold text-yellow-900 dark:text-yellow-100 text-sm'>
                            Maize (Corn)
                          </h4>
                          <p className='text-[10px] text-yellow-700 dark:text-yellow-300'>
                            Moderate Water • Good Yield
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className='relative overflow-hidden rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 p-4 transition-all hover:scale-[1.02] cursor-pointer opacity-75'>
                      <div className='absolute top-0 right-0 bg-red-500 text-white text-[10px] px-2 py-1 rounded-bl-lg font-bold'>
                        Risky
                      </div>
                      <div className='flex items-center gap-3'>
                        <div className='h-10 w-10 rounded-full bg-red-100 dark:bg-red-800 flex items-center justify-center text-lg'>
                          🌾
                        </div>
                        <div>
                          <h4 className='font-bold text-destructive dark:text-destructive/90 text-sm'>
                            Paddy (Rice)
                          </h4>
                          <p className='text-[10px] text-destructive/70 dark:text-destructive/80'>
                            Requires High Water
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={resetDemo}
                      className='w-full mt-4 py-3 text-xs font-semibold text-primary hover:bg-primary/5 rounded-xl transition-colors'
                    >
                      Start New Analysis
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className='absolute top-20 -right-10 -z-10 h-64 w-64 rounded-full bg-accent/20 blur-3xl'></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CropSuggestionExplainer
