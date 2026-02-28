import React, { useState } from 'react'
import {
  ShoppingBag,
  ArrowRight,
  Heart,
  Phone,
  Store,
  Truck,
  CalendarClock,
  CheckCircle2,
  PackagePlus,
  RefreshCw
} from 'lucide-react'
import { Link } from 'react-router-dom'

const MarketExplainer = () => {
  const [demoStep, setDemoStep] = useState('input')
  const [listingType, setListingType] = useState('ready')

  const runDemo = () => {
    setDemoStep('posting')
    setTimeout(() => {
      setDemoStep('buyer_view')
    }, 2000)
  }

  const resetDemo = () => {
    setDemoStep('input')
  }

  return (
    <section className='bg-secondary/80 border-t border-border py-16 lg:py-24 overflow-hidden relative'>
      <div className='absolute top-0 left-0 w-200 h-200 bg-background/80 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none'></div>

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='grid lg:grid-cols-2 gap-16 items-center'>
          <div className='relative order-1 lg:order-1'>
            <div className='relative mx-auto w-full max-w-95 rounded-[3rem] border-8 border-muted shadow-2xl overflow-hidden h-180 flex flex-col bg-background'>
              <div className='bg-primary px-6 pt-10 pb-6 shadow-md z-20'>
                <div className='flex justify-between items-center'>
                  <h3 className='text-lg font-bold text-primary-foreground flex items-center gap-2'>
                    <ShoppingBag className='h-5 w-5 text-accent' /> Market Place
                  </h3>
                  <div className='h-9 w-9 rounded-full bg-primary-foreground/20 text-primary-foreground border border-primary-foreground/30 flex items-center justify-center backdrop-blur-sm'>
                    <span className='text-xs font-bold'>JD</span>
                  </div>
                </div>
              </div>

              <div className='grow flex flex-col relative overflow-hidden bg-muted/30'>
                {demoStep === 'input' && (
                  <div className='p-6 space-y-6 animate-in fade-in zoom-in duration-300 h-full flex flex-col'>
                    <div className='text-center'>
                      <h4 className='font-bold text-xl text-foreground'>
                        Sell Your Harvest
                      </h4>
                      <p className='text-sm text-muted-foreground'>
                        Fill details to list on Global Mandi
                      </p>
                    </div>

                    <div className='bg-card p-5 rounded-xl shadow-sm border border-border space-y-5'>
                      <div className='space-y-1.5'>
                        <label className='text-xs font-bold text-muted-foreground uppercase tracking-wider'>
                          Crop Name
                        </label>
                        <div className='bg-muted/50 rounded-lg px-3 py-2 border border-transparent focus-within:border-primary/50 transition-colors'>
                          <input
                            type='text'
                            value='Fresh Onion (Red)'
                            readOnly
                            className='w-full text-sm font-semibold text-foreground bg-transparent outline-none'
                          />
                        </div>
                      </div>

                      <div className='grid grid-cols-2 gap-4'>
                        <div className='space-y-1.5'>
                          <label className='text-xs font-bold text-muted-foreground uppercase tracking-wider'>
                            Price / Qtl
                          </label>
                          <div className='bg-muted/50 rounded-lg px-3 py-2'>
                            <input
                              type='text'
                              value='₹ 2,400'
                              readOnly
                              className='w-full text-sm font-bold text-primary bg-transparent outline-none'
                            />
                          </div>
                        </div>
                        <div className='space-y-1.5'>
                          <label className='text-xs font-bold text-muted-foreground uppercase tracking-wider'>
                            Quantity
                          </label>
                          <div className='bg-muted/50 rounded-lg px-3 py-2'>
                            <input
                              type='text'
                              value='50 Qtl'
                              readOnly
                              className='w-full text-sm font-semibold text-foreground bg-transparent outline-none'
                            />
                          </div>
                        </div>
                      </div>

                      <div className='pt-2'>
                        <label className='text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 block'>
                          Crop Status
                        </label>
                        <div className='flex bg-muted rounded-lg p-1.5 gap-1'>
                          <button
                            onClick={() => setListingType('ready')}
                            className={`flex-1 text-xs font-bold py-2.5 rounded-md transition-all shadow-sm ${
                              listingType === 'ready'
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground hover:bg-background/50'
                            }`}
                          >
                            Ready Stock
                          </button>
                          <button
                            onClick={() => setListingType('pre-harvest')}
                            className={`flex-1 text-xs font-bold py-2.5 rounded-md transition-all shadow-sm ${
                              listingType === 'pre-harvest'
                                ? 'bg-accent text-accent-foreground'
                                : 'text-muted-foreground hover:bg-background/50'
                            }`}
                          >
                            Pre-Booking
                          </button>
                        </div>
                      </div>

                      {listingType === 'pre-harvest' && (
                        <div className='text-xs font-medium text-primary bg-primary/10 p-3 rounded-lg flex items-center gap-2 border border-primary/20'>
                          <CalendarClock className='h-4 w-4' /> Available in
                          approx 20 Days
                        </div>
                      )}
                    </div>

                    <button
                      onClick={runDemo}
                      className='w-full h-12 rounded-xl bg-foreground text-background font-bold shadow-lg shadow-foreground/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-auto'
                    >
                      Post to Mandi <ArrowRight className='h-4 w-4' />
                    </button>
                  </div>
                )}

                {demoStep === 'posting' && (
                  <div className='absolute inset-0 z-30 bg-background/90 backdrop-blur-md flex flex-col items-center justify-center text-center animate-in fade-in duration-300'>
                    <div className='relative'>
                      <div className='h-20 w-20 bg-primary/20 rounded-full animate-ping absolute inset-0'></div>
                      <div className='h-20 w-20 bg-primary rounded-full flex items-center justify-center mb-6 relative shadow-xl'>
                        <Truck className='h-9 w-9 text-primary-foreground' />
                      </div>
                    </div>
                    <h4 className='font-bold text-2xl text-foreground mb-1'>
                      Listing Crop...
                    </h4>
                    <p className='text-sm text-muted-foreground font-medium'>
                      Notifying buyers in your region
                    </p>
                  </div>
                )}

                {demoStep === 'buyer_view' && (
                  <div className='p-6 h-full flex flex-col animate-in slide-in-from-right duration-500'>
                    <div className='flex justify-between items-center mb-4'>
                      <span className='text-xs font-bold text-muted-foreground uppercase tracking-widest'>
                        Buyer View
                      </span>
                      <span className='text-[10px] font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1.5 border border-green-200'>
                        <span className='relative flex h-2 w-2'>
                          <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75'></span>
                          <span className='relative inline-flex rounded-full h-2 w-2 bg-green-500'></span>
                        </span>
                        Live Listing
                      </span>
                    </div>

                    <div className='bg-card rounded-2xl shadow-xl border border-border overflow-hidden'>
                      <div className='h-44 bg-secondary/40 relative flex items-center justify-center'>
                        <span className='text-7xl drop-shadow-md'>🧅</span>

                        {listingType === 'pre-harvest' ? (
                          <div className='absolute top-3 left-3 bg-accent text-accent-foreground text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm'>
                            <CalendarClock className='h-3 w-3' /> Advance
                            Booking
                          </div>
                        ) : (
                          <div className='absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm'>
                            <CheckCircle2 className='h-3 w-3' /> Ready to Ship
                          </div>
                        )}

                        <button className='absolute top-3 right-3 h-9 w-9 rounded-full bg-card/80 backdrop-blur text-muted-foreground hover:text-destructive transition-colors flex items-center justify-center shadow-sm'>
                          <Heart className='h-4 w-4' />
                        </button>
                      </div>

                      <div className='p-5'>
                        <div className='flex justify-between items-start mb-2'>
                          <div>
                            <h4 className='font-bold text-xl text-foreground leading-tight'>
                              Nasik Red Onion
                            </h4>
                            <p className='text-xs text-muted-foreground mt-1 flex items-center gap-1 font-medium'>
                              <Store className='h-3 w-3' /> Jai Kisan • Agra, UP
                            </p>
                          </div>
                          <div className='text-right'>
                            <span className='font-bold text-xl text-primary block'>
                              ₹2,400
                            </span>
                            <span className='text-[10px] text-muted-foreground uppercase font-bold'>
                              Per Qtl
                            </span>
                          </div>
                        </div>

                        <div className='grid grid-cols-2 gap-3 my-5'>
                          <div className='bg-muted/40 border border-muted p-2.5 rounded-xl text-center'>
                            <span className='text-[10px] font-bold text-muted-foreground uppercase block mb-0.5'>
                              Quantity
                            </span>
                            <span className='font-bold text-foreground'>
                              50 Qtl
                            </span>
                          </div>
                          <div className='bg-muted/40 border border-muted p-2.5 rounded-xl text-center'>
                            <span className='text-[10px] font-bold text-muted-foreground uppercase block mb-0.5'>
                              Quality
                            </span>
                            <span className='font-bold text-foreground'>
                              A+ Grade
                            </span>
                          </div>
                        </div>

                        <button className='w-full h-11 rounded-xl bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-md shadow-primary/20'>
                          <Phone className='h-4 w-4' /> Contact Farmer
                        </button>
                      </div>
                    </div>

                    <div className='mt-auto text-center pb-4'>
                      <button
                        onClick={resetDemo}
                        className='text-xs font-bold text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-1 mx-auto'
                      >
                        <RefreshCw className='h-3 w-3' /> Create Another Listing
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className='absolute bottom-10 -left-10 -z-10 h-64 w-64 rounded-full bg-primary/20 blur-3xl'></div>
            <div className='absolute top-10 -right-10 -z-10 h-64 w-64 rounded-full bg-accent/20 blur-3xl'></div>
          </div>

          <div className='space-y-8 order-2 lg:order-2'>
            <div>
              <div className='inline-flex items-center rounded-full border border-accent/30 bg-accent/10 dark:bg-accent px-3 py-1 text-xs font-medium text-accent-foreground mb-6'>
                <Store className='mr-2 h-3 w-3' />
                Direct Farm-to-Buyer
              </div>
              <h1 className='text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6'>
                Your Digital Mandi,
                <br />
                <span className='text-primary'>Open 24/7.</span>
              </h1>
              <p className='text-lg text-muted-foreground leading-relaxed'>
                Skip the middlemen. List your harvest directly on Sasya-Marg.
                You can even secure buyers for{' '}
                <strong>Pre-Harvest crops</strong> weeks before you cut them.
              </p>
            </div>

            <div className='space-y-6'>
              <div className='group flex items-start gap-4 p-4 rounded-xl bg-background border border-transparent hover:border-accent/30 transition-all shadow-sm'>
                <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent-foreground dark:bg-accent/70'>
                  <PackagePlus className='h-5 w-5' />
                </div>
                <div>
                  <h4 className='font-bold text-foreground text-lg'>
                    1. Post Your Crop
                  </h4>
                  <p className='text-sm text-muted-foreground mt-1'>
                    Upload photos, set your price per Quintal, and define
                    quantity.
                  </p>
                </div>
              </div>

              <div className='group flex items-start gap-4 p-4 rounded-xl bg-background border border-transparent hover:border-accent/30 transition-all shadow-sm'>
                <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'>
                  <CalendarClock className='h-5 w-5' />
                </div>
                <div>
                  <h4 className='font-bold text-foreground text-lg'>
                    2. Choose Availability
                  </h4>
                  <p className='text-sm text-muted-foreground mt-1'>
                    <strong>Harvested:</strong> Ready to ship immediately.
                    <br />
                    <strong>Pre-Harvest:</strong> Open for advance booking.
                  </p>
                </div>
              </div>

              <div className='group flex items-start gap-4 p-4 rounded-xl bg-background border border-transparent hover:border-accent/30 transition-all shadow-sm'>
                <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'>
                  <Heart className='h-5 w-5' />
                </div>
                <div>
                  <h4 className='font-bold text-foreground text-lg'>
                    3. Connect & Sell
                  </h4>
                  <p className='text-sm text-muted-foreground mt-1'>
                    Buyers wishlist your crop and contact you directly via phone
                    or WhatsApp.
                  </p>
                </div>
              </div>
            </div>

            <div className='pt-4'>
              <Link
                to='/farmer/login'
                className='inline-flex h-12 items-center justify-center rounded-md bg-accent px-8 text-base font-medium text-accent-foreground shadow hover:bg-accent/90 transition-all hover:gap-3 gap-2'
              >
                Visit Market Place
                <ArrowRight className='h-4 w-4' />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MarketExplainer
