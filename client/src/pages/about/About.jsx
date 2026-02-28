import React from 'react'
import {
  Sprout,
  Users,
  Database,
  Heart,
  Lightbulb,
  Github,
  Leaf,
  Server,
  Layout,
  ClipboardList
} from 'lucide-react'
import aboutUs from '@/assets/aboutUs.jpeg'

const AboutPage = () => {
  return (
    <div className='bg-background min-h-screen'>
      <section className='relative overflow-hidden pt-20 pb-16 lg:pt-32 lg:pb-24 bg-linear-to-b from-primary/5 via-background to-background'>
        <div className='absolute top-0 right-0 -translate-y-12 translate-x-12 opacity-10'>
          <Leaf size={400} className='text-primary' />
        </div>

        <div className='absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-linear-to-r from-primary/10 via-accent/5 to-primary/10 blur-[100px] rounded-full pointer-events-none'></div>

        <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center'>
          <div className='inline-flex items-center rounded-full border border-primary/20 bg-linear-to-r from-primary/10 to-transparent px-3 py-1 text-xs font-bold text-primary mb-6 shadow-sm'>
            <Sprout className='mr-2 h-3 w-3' />
            Our Journey
          </div>
          <h1 className='text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl mb-6'>
            Rooted in Agriculture.
            <br />
            <span className='text-transparent bg-clip-text bg-linear-to-r from-primary to-primary/70'>
              Powered by Intelligence.
            </span>
          </h1>
          <p className='max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed'>
            Sasya-Marg was born from a simple question: Why should modern
            technology be limited to cities? We are bringing the power of Data
            and AI to the fields of India.
          </p>
        </div>
      </section>

      <section className='py-16 bg-linear-to-b from-secondary/30 via-secondary/10 to-background border-y border-border/50'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid lg:grid-cols-2 gap-12 items-center'>
            <div className='relative group'>
              <div className='absolute -inset-1 bg-linear-to-r from-primary/20 to-accent/20 rounded-4xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200'></div>
              <div className='relative aspect-4/3 rounded-3xl overflow-hidden border border-border/50 shadow-xl'>
                <div className='absolute inset-0 bg-linear-to-br from-black/30 via-black/20 to-accent/30 z-10'></div>
                <img
                  src={aboutUs}
                  alt='Farming'
                  className='absolute inset-0 w-full h-full object-cover'
                />

                <div className='absolute bottom-0 left-0 w-full p-8 bg-linear-to-t from-black/80 via-black/40 to-transparent'>
                  <p className='font-bold text-white text-xl'>
                    "Farming is not just a job,
                    <br />
                    it's a responsibility."
                  </p>
                </div>
              </div>
            </div>

            <div className='space-y-6'>
              <h2 className='text-3xl font-bold text-foreground'>
                The Motivation
              </h2>
              <div className='space-y-4 text-muted-foreground leading-relaxed'>
                <p>
                  Coming from agricultural backgrounds, we saw firsthand the
                  uncertainty farmers face every season. Unpredictable weather,
                  fluctuating market rates, and a lack of scientific soil
                  knowledge often turn farming into a gamble rather than a
                  business.
                </p>
                <p>
                  We realized that the data exists—weather satellites, soil
                  research, market APIs—but it wasn't accessible to the common
                  farmer in a simple way.
                </p>
                <p className='font-medium text-foreground border-l-4 border-primary pl-4 py-1 bg-linear-to-r from-primary/5 to-transparent'>
                  Sasya-Marg (The Path of Crops) was created to bridge this gap.
                  We wanted to build a system where decisions are driven by
                  logic and data, not just intuition.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='py-20 relative'>
        <div className='absolute inset-0 bg-[radial-linear(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] opacity-[0.1] mask-image:linear-linear(to_bottom,transparent,black,transparent)'></div>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
          <div className='text-center max-w-2xl mx-auto mb-16'>
            <h2 className='text-3xl font-bold text-foreground'>The Big Idea</h2>
            <p className='mt-4 text-muted-foreground'>
              We combined three core pillars to create a holistic ecosystem for
              the modern farmer.
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            <div className='group bg-linear-to-b from-card to-primary/5 border border-border p-8 rounded-3xl hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5'>
              <div className='h-14 w-14 bg-linear-to-br from-primary/10 to-primary/20 text-primary rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform'>
                <Lightbulb className='h-7 w-7' />
              </div>
              <h3 className='text-xl font-bold mb-3'>
                Predictive Intelligence
              </h3>
              <p className='text-muted-foreground text-sm'>
                Using Rule-Based AI to analyze soil nutrients and water levels,
                giving farmers a scientific "Crop Plan" for the season.
              </p>
            </div>

            <div className='group bg-linear-to-b from-card to-accent/10 border border-border p-8 rounded-3xl hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/5'>
              <div className='h-14 w-14 bg-linear-to-br from-accent/20 to-accent/30 text-accent-foreground rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform'>
                <Users className='h-7 w-7' />
              </div>
              <h3 className='text-xl font-bold mb-3'>Direct Connection</h3>
              <p className='text-muted-foreground text-sm'>
                Removing the middleman by creating a digital marketplace where
                Farmers and Buyers connect directly via phone.
              </p>
            </div>

            <div className='group bg-linear-to-b from-card to-secondary/30 border border-border p-8 rounded-3xl hover:border-secondary/50 transition-all hover:shadow-lg hover:shadow-secondary/5'>
              <div className='h-14 w-14 bg-linear-to-br from-secondary/30 to-secondary/50 text-primary rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform'>
                <Database className='h-7 w-7' />
              </div>
              <h3 className='text-xl font-bold mb-3'>Knowledge Access</h3>
              <p className='text-muted-foreground text-sm'>
                Democratizing access to Government Schemes and real-time weather
                data so no farmer is left behind.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className='py-20 border-y border-border/50 bg-linear-to-b from-primary/5 via-background to-background'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold text-foreground'>
              Meet the Builders
            </h2>
            <p className='mt-4 text-muted-foreground'>
              A collaborative effort fueled by code and real-world field
              experience.
            </p>
          </div>

          <div className='grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto'>
            <div className='group relative flex flex-col items-center text-center bg-linear-to-b from-card to-primary/10 border border-primary/10 rounded-4xl p-8 transition-all hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2'>
              <div className='h-24 w-24 rounded-full bg-linear-to-br from-primary/10 to-primary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform shadow-inner ring-4 ring-background'>
                <Server className='h-10 w-10' />
              </div>
              <h3 className='text-xl font-bold text-foreground'>
                Nitin Sharma
              </h3>
              <div className='mt-2 mb-4 px-3 py-1 bg-primary/10 rounded-full border border-primary/20'>
                <p className='text-primary font-bold text-[10px] uppercase tracking-widest'>
                  Team Lead & Backend
                </p>
              </div>
              <p className='text-muted-foreground text-sm leading-relaxed'>
                Architected the entire Sasya-Marg system. Responsible for the
                server-side logic, AI algorithm design, and database management.
                Ensures the platform runs securely and efficiently.
              </p>
            </div>

            <div className='group relative flex flex-col items-center text-center bg-linear-to-b from-card to-accent/10 border border-accent/20 rounded-4xl p-8 transition-all hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/5 hover:-translate-y-2'>
              <div className='h-24 w-24 rounded-full bg-linear-to-br from-accent/20 to-accent/30 flex items-center justify-center text-accent-foreground mb-6 group-hover:scale-110 transition-transform shadow-inner ring-4 ring-background'>
                <Layout className='h-10 w-10' />
              </div>
              <h3 className='text-xl font-bold text-foreground'>
                Abhishek Soni
              </h3>
              <div className='mt-2 mb-4 px-3 py-1 bg-accent/20 rounded-full border border-accent/30'>
                <p className='text-accent-foreground font-bold text-[10px] uppercase tracking-widest'>
                  Frontend Developer
                </p>
              </div>
              <p className='text-muted-foreground text-sm leading-relaxed'>
                Crafted the user interface and experience. Focused on making
                complex data easy to understand through responsive design and
                interactive elements using React and Tailwind.
              </p>
            </div>

            <div className='group relative flex flex-col items-center text-center bg-linear-to-b from-card to-secondary border border-secondary/30 rounded-4xl p-8 transition-all hover:border-secondary/60 hover:shadow-2xl hover:shadow-secondary/5 hover:-translate-y-2'>
              <div className='h-24 w-24 rounded-full bg-linear-to-br from-secondary/30 to-secondary/50 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform shadow-inner ring-4 ring-background'>
                <Sprout className='h-10 w-10' />
              </div>
              <h3 className='text-xl font-bold text-foreground'>
                Kapil Kumar Singh
              </h3>
              <div className='mt-2 mb-4 px-3 py-1 bg-primary/20 rounded-full border border-primary/90'>
                <p className='text-primary font-bold text-[10px] uppercase tracking-widest'>
                  Field Expert
                </p>
              </div>
              <p className='text-muted-foreground text-sm leading-relaxed'>
                The core ideator with a deep farming background. Responsible for
                field research, validating crop data, documentation, and
                ensuring the solution solves real problems for farmers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className='py-24 relative overflow-hidden bg-linear-to-br from-primary/10 via-background to-accent/10'>
        <div className='absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none'></div>
        <div className='absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none'></div>

        <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-foreground'>
              Technology & Sources
            </h2>
            <p className='mt-2 text-muted-foreground text-lg'>
              The robust stack and reliable data powering Sasya-Marg.
            </p>
          </div>

          <div className='flex flex-wrap justify-center gap-4 max-w-4xl mx-auto'>
            {[
              'MERN Stack',
              'Tailwind CSS v4',
              'Shadcn UI',
              'OpenWeather API',
              'Govt. Data (myScheme.gov)'
            ].map((tech, i) => (
              <span
                key={i}
                className='px-6 py-3 rounded-2xl bg-linear-to-br from-background/80 to-secondary/20 backdrop-blur-md border border-primary/10 text-sm font-bold text-foreground shadow-sm hover:shadow-md hover:scale-105 hover:border-primary/30 transition-all cursor-default flex items-center gap-2'
              >
                <div className='w-2 h-2 rounded-full bg-linear-to-r from-primary to-accent'></div>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
