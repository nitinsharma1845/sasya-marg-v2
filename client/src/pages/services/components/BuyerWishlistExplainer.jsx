import React, { useState } from 'react'
import {
  Heart,
  Phone,
  CalendarClock,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  User,
  Copy,
  Eye
} from 'lucide-react'
import { Link } from 'react-router-dom'

const BuyerWishlistExplainer = () => {
  const [revealedId, setRevealedId] = useState(null)

  const handleReveal = id => {
    setRevealedId(id)
    setTimeout(() => {
      setRevealedId(null)
    }, 4000)
  }

  return (
    <section className='bg-secondary/20 border-t border-border py-16 lg:py-24 overflow-hidden relative'>
      <div className='absolute top-0 left-0 h-200 w-200 bg-background/80 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none'></div>

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='grid lg:grid-cols-2 gap-16 items-center'>
          <div className='relative order-1 lg:order-1'>
            <div className='relative mx-auto w-full max-w-95 rounded-[3rem] border-8 border-muted shadow-2xl overflow-hidden h-180 flex flex-col bg-background'>
              <div className='bg-primary px-6 pt-10 pb-6 shadow-md z-20'>
                <div className='flex justify-between items-center'>
                  <h3 className='text-lg font-bold text-primary-foreground flex items-center gap-2'>
                    <Heart className='h-5 w-5 text-destructive fill-destructive' />{' '}
                    My Wishlist
                  </h3>
                  <div className='relative'>
                    <ShoppingBag className='h-6 w-6 text-primary-foreground/90' />
                    <span className='absolute -top-1 -right-1 h-4 w-4 bg-accent text-[10px] text-accent-foreground flex items-center justify-center rounded-full font-bold shadow-sm'>
                      2
                    </span>
                  </div>
                </div>
              </div>

              <div className='grow p-5 space-y-5 overflow-y-auto relative bg-muted/30'>
                <div className='bg-card rounded-2xl p-4 shadow-sm border border-border relative overflow-hidden group hover:border-primary/50 transition-all'>
                  <div className='absolute top-0 right-0 bg-accent text-accent-foreground text-[10px] font-bold px-3 py-1 rounded-bl-xl flex items-center gap-1 shadow-sm'>
                    <CalendarClock className='h-3 w-3' /> Ready in 20 Days
                  </div>

                  <div className='flex gap-4'>
                    <div className='h-20 w-20 bg-secondary rounded-xl flex items-center justify-center text-3xl shrink-0 border border-border/50'>
                      🥔
                    </div>
                    <div>
                      <h4 className='font-bold text-foreground text-lg'>
                        Kufri Potato
                      </h4>
                      <p className='text-xs text-muted-foreground mb-2 font-medium'>
                        Agra Region • 500 Qtl
                      </p>
                      <p className='text-sm font-bold text-primary'>
                        ₹1,200{' '}
                        <span className='text-[10px] text-muted-foreground font-normal'>
                          / Qtl (Est.)
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className='mt-4 flex gap-3'>
                    <button
                      onClick={() => handleReveal(1)}
                      className={`flex-1 h-11 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-sm ${
                        revealedId === 1
                          ? 'bg-secondary text-foreground border border-border'
                          : 'bg-primary text-primary-foreground hover:opacity-90'
                      }`}
                    >
                      {revealedId === 1 ? (
                        <>
                          <Phone className='h-3 w-3' /> +91 98765 43210
                        </>
                      ) : (
                        <>
                          <Eye className='h-3 w-3' /> Get Farmer Number
                        </>
                      )}
                    </button>
                    <button className='h-11 w-11 rounded-xl border border-border bg-card flex items-center justify-center hover:bg-destructive/10 hover:border-destructive/30 transition-colors group'>
                      <Heart className='h-5 w-5 text-destructive fill-destructive' />
                    </button>
                  </div>
                </div>

                <div className='bg-card rounded-2xl p-4 shadow-sm border border-border relative overflow-hidden group hover:border-primary/50 transition-all'>
                  <div className='absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-bl-xl flex items-center gap-1 shadow-sm'>
                    <CheckCircle2 className='h-3 w-3' /> Ready Stock
                  </div>

                  <div className='flex gap-4'>
                    <div className='h-20 w-20 bg-secondary rounded-xl flex items-center justify-center text-3xl shrink-0 border border-border/50'>
                      🌾
                    </div>
                    <div>
                      <h4 className='font-bold text-foreground text-lg'>
                        Sharbati Wheat
                      </h4>
                      <p className='text-xs text-muted-foreground mb-2 font-medium'>
                        Mathura • 120 Qtl
                      </p>
                      <p className='text-sm font-bold text-primary'>
                        ₹2,100{' '}
                        <span className='text-[10px] text-muted-foreground font-normal'>
                          / Qtl
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className='mt-4 flex gap-3'>
                    <button
                      onClick={() => handleReveal(2)}
                      className={`flex-1 h-11 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-sm ${
                        revealedId === 2
                          ? 'bg-secondary text-foreground border border-border'
                          : 'bg-primary text-primary-foreground hover:opacity-90'
                      }`}
                    >
                      {revealedId === 2 ? (
                        <>
                          <Phone className='h-3 w-3' /> +91 88000 12345
                        </>
                      ) : (
                        <>
                          <Eye className='h-3 w-3' /> Get Farmer Number
                        </>
                      )}
                    </button>
                    <button className='h-11 w-11 rounded-xl border border-border bg-card flex items-center justify-center hover:bg-destructive/10 hover:border-destructive/30 transition-colors group'>
                      <Heart className='h-5 w-5 text-destructive fill-destructive' />
                    </button>
                  </div>
                </div>

                <div className='border-2 border-dashed border-border/60 rounded-2xl p-6 text-center bg-transparent'>
                  <p className='text-xs text-muted-foreground mb-2 font-medium'>
                    Looking for something else?
                  </p>
                  <button className='text-sm font-bold text-primary hover:text-accent transition-colors flex items-center justify-center gap-1 mx-auto'>
                    Browse Market <ArrowRight className='h-3 w-3' />
                  </button>
                </div>
              </div>
            </div>

            <div className='absolute bottom-10 -left-10 -z-10 h-64 w-64 rounded-full bg-chart-2/10 blur-3xl'></div>
            <div className='absolute top-20 -right-10 -z-10 h-64 w-64 rounded-full bg-accent/20 blur-3xl'></div>
          </div>

          <div className='space-y-8 order-2 lg:order-2'>
            <div>
              <div className='inline-flex items-center rounded-full border border-chart-2/50 bg-chart-2/10 dark:bg-chart-2/20 dark:border-chart-2 dark:text-chart-2 px-3 py-1 text-xs font-bold text-chart-2 mb-6'>
                <ShoppingBag className='mr-2 h-3 w-3' />
                For Buyers & Traders
              </div>
              <h1 className='text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6'>
                Source Smarter.
                <br />
                <span className='text-chart-2/70'>Plan Ahead.</span>
              </h1>
              <p className='text-lg text-muted-foreground leading-relaxed'>
                Secure your supply chain. Wishlist crops from specific regions
                and get verified contact details to negotiate best rates—even
                before the harvest begins.
              </p>
            </div>

            <div className='space-y-6'>
              <div className='group flex items-start gap-4 p-4 rounded-xl bg-background border border-transparent hover:border-accent/30 transition-all shadow-sm'>
                <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-chart-2/30 text-chart-2'>
                  <Heart className='h-5 w-5' />
                </div>
                <div>
                  <h4 className='font-bold text-foreground text-lg'>
                    1. Curate Your List
                  </h4>
                  <p className='text-sm text-muted-foreground mt-1'>
                    Save interesting listings to your Wishlist to track price
                    changes and availability.
                  </p>
                </div>
              </div>

              <div className='group flex items-start gap-4 p-4 rounded-xl bg-background border border-transparent hover:border-accent/30 transition-all shadow-sm'>
                <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-chart-2/30 text-chart-2'>
                  <CalendarClock className='h-5 w-5' />
                </div>
                <div>
                  <h4 className='font-bold text-foreground text-lg'>
                    2. Pre-Harvest Booking
                  </h4>
                  <p className='text-sm text-muted-foreground mt-1'>
                    See crops that will be ready soon. Secure high-quality
                    produce before it hits the open market.
                  </p>
                </div>
              </div>

              <div className='group flex items-start gap-4 p-4 rounded-xl bg-background border border-transparent hover:border-accent/30 transition-all shadow-sm'>
                <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-chart-2/30 text-chart-2'>
                  <Phone className='h-5 w-5' />
                </div>
                <div>
                  <h4 className='font-bold text-foreground text-lg'>
                    3. Connect Directly
                  </h4>
                  <p className='text-sm text-muted-foreground mt-1'>
                    Instant access to farmer phone numbers. Call or WhatsApp to
                    finalize the deal.
                  </p>
                </div>
              </div>
            </div>

            <div className='pt-4'>
              <Link
                to='/buyer/signup'
                className='inline-flex h-12 items-center justify-center rounded-md bg-chart-2/70 px-8 text-base font-bold text-accent-foreground shadow hover:bg-chart-2/90 transition-all hover:gap-3 gap-2'
              >
                Start Sourcing
                <ArrowRight className='h-4 w-4' />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BuyerWishlistExplainer
