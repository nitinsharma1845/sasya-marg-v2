import React from 'react';
import { Sprout, ShoppingBag, ArrowRight, TrendingUp, Wheat } from 'lucide-react';
import { Link } from 'react-router-dom';

const CtaSection = () => {
  return (
    <section className="relative border-t border-border/50 bg-secondary py-24 overflow-hidden">
      
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Find Your Place in the <span className="text-primary">Agri-Chain.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Connect directly. Whether you are growing the future or sourcing the best produce, Sasya-Marg bridges the gap.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          
          <div className="group relative flex flex-col h-full overflow-hidden rounded-3xl border border-border/50 bg-linear-to-br from-card via-card to-primary/10 p-8 transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
            
            <Wheat className="absolute -bottom-10 -right-10 h-48 w-48 text-primary/5 transition-all duration-500 group-hover:text-primary/10 group-hover:rotate-12 group-hover:scale-110 z-0 pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20 transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary/20">
                <Sprout className="h-7 w-7" />
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-3">
                I am a Farmer
              </h3>
              <p className="text-muted-foreground leading-relaxed grow">
                Register your land, get AI-driven crop suggestions for the next season, and list your harvest directly for buyers to see. Increase your profits with smart decisions.
              </p>
              
              <div className="mt-8">
                <Link 
                  to="/farmer/signup" 
                  className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:gap-4 gap-2"
                >
                  Start Selling Crop
                  <ArrowRight className="h-4 w-4 transition-transform duration-300" />
                </Link>
               </div>
            </div>
          </div>

          <div className="group relative flex flex-col h-full overflow-hidden rounded-3xl border border-border/50 bg-linear-to-br from-card via-card to-accent/10 p-8 transition-all duration-500 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-2">
            
            <TrendingUp className="absolute -bottom-10 -right-10 h-48 w-48 text-accent/10 transition-all duration-500 group-hover:text-accent/20 group-hover:-rotate-12 group-hover:scale-110 z-0 pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent-foreground ring-1 ring-accent/20 transition-transform duration-500 group-hover:scale-110 group-hover:bg-accent/20">
                <ShoppingBag className="h-7 w-7" />
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-3">
                I am a Buyer
              </h3>
              <p className="text-muted-foreground leading-relaxed grow">
                Create a wishlist of crops you need. Get notified when farmers in your desired regions are ready to harvest. Source fresh directly from the farm.
              </p>
              
              <div className="mt-8">
                <Link
                  to="/buyer/signup" 
                  className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-md transition-all duration-300 hover:bg-accent/90 hover:shadow-lg hover:gap-4 gap-2"
                >
                  Start Sourcing
                  <ArrowRight className="h-4 w-4 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default CtaSection;