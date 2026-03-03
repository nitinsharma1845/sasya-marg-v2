import React, { useState } from 'react'
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  Send,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Sprout
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useAskContactQuery } from '@/hooks/public.hooks'

const ContactPage = () => {
  const [openFaq, setOpenFaq] = useState(null)
  const createQuery = useAskContactQuery()

  const toggleFaq = index => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({ mode: 'onChange' })

  const raiseQuery = data => {
    createQuery.mutate(data, {
      onSuccess: () => {
        reset()
      }
    })
  }

  const faqs = [
    {
      question: 'Is the crop suggestion AI 100% accurate?',
      answer:
        'Our AI uses historical data and real-time weather patterns to give the best possible recommendation (approx 92% accuracy). However, we always suggest consulting with a local agronomist for final decisions.'
    },
    {
      question: 'Do I need to pay to list my crops?',
      answer:
        'No, listing crops on Sasya-Marg is currently free for farmers. We only charge a small platform fee when a successful transaction is made with a buyer.'
    },
    {
      question: 'How do I update my farm location?',
      answer:
        'Go to your Profile > Farm Details. You can either use GPS auto-detect or manually select your District and Tehsil.'
    },
    {
      question: 'I am a buyer. How do I verify the crop quality?',
      answer:
        "We encourage buyers to use the 'Contact Farmer' feature to request video calls or arrange a physical visit before making large payments."
    }
  ]

  return (
    <div className='min-h-screen bg-background pt-20 pb-20'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center'>
        <div className='inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-6'>
          <MessageSquare className='mr-2 h-3 w-3' />
          We are here to help
        </div>
        <h1 className='text-4xl font-bold tracking-tight text-foreground sm:text-5xl'>
          Get in Touch with <span className='text-primary'>Sasya-Marg</span>
        </h1>
        <p className='mt-4 text-lg text-muted-foreground max-w-2xl mx-auto'>
          Have questions about your soil report? Need help listing your harvest?
          Our support team (and our AI) is ready to assist you.
        </p>
      </div>

      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid lg:grid-cols-12 gap-12'>
          <div className='lg:col-span-5 space-y-8'>
            <div className='rounded-3xl bg-primary/90 text-primary-foreground p-8 shadow-xl relative overflow-hidden'>
              <div className='absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none'></div>

              <h3 className='text-2xl font-bold mb-6'>Contact Information</h3>
              <p className='text-primary-foreground/80 mb-8 leading-relaxed'>
                Fill out the form and our agricultural expert will contact you
                within 24 hours.
              </p>

              <div className='space-y-6'>
                <div className='flex items-start gap-4'>
                  <div className='h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0'>
                    <Phone className='h-5 w-5' />
                  </div>
                  <div>
                    <p className='font-semibold'>Call Us</p>
                    <p className='text-sm opacity-80'>+91 9389623526</p>
                    <p className='text-sm opacity-80'>+91 8650856108</p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div className='h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0'>
                    <Mail className='h-5 w-5' />
                  </div>
                  <div>
                    <p className='font-semibold'>Email Us</p>
                    <p className='text-sm opacity-80'>sasyamarg@gmail.com</p>
                    <p className='text-sm opacity-80'>
                      wd.nitin.sharma01@gmail.com
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div className='h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0'>
                    <MapPin className='h-5 w-5' />
                  </div>
                  <div>
                    <p className='font-semibold'>Headquarters</p>
                    <p className='text-sm opacity-80'>
                      Agri-Tech Hub,
                      <br />
                      Agra, Uttar Pradesh - 282006
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div className='h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0'>
                    <Clock className='h-5 w-5' />
                  </div>
                  <div>
                    <p className='font-semibold'>Working Hours</p>
                    <p className='text-sm opacity-80'>
                      Mon - Sat: 9:00 AM - 7:00 PM
                    </p>
                  </div>
                </div>
              </div>

              <div className='mt-8 pt-8 border-t border-primary-foreground flex items-center gap-2 text-sm opacity-70'>
                <Sprout className='h-4 w-4' />
                <span>Growing together since 2025</span>
              </div>
            </div>
          </div>

          <div className='lg:col-span-7'>
            <div className='rounded-3xl border border-border bg-card p-8 shadow-sm'>
              <h3 className='text-2xl font-bold text-foreground mb-6'>
                Send a Message
              </h3>

              <form className='space-y-6' onSubmit={handleSubmit(raiseQuery)}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-foreground'>
                      First Name
                    </label>
                    <input
                      {...register('firstname', {
                        required: 'First name is required'
                      })}
                      type='text'
                      placeholder='e.g. Rahul'
                      className='flex h-12 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                    />

                    {errors.firstname && (
                      <p className='text-xs text-destructive mt-1'>
                        {errors.firstname.message}
                      </p>
                    )}
                  </div>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-foreground'>
                      Last Name
                    </label>
                    <input
                      {...register('lastname')}
                      type='text'
                      placeholder='e.g. Singh'
                      className='flex h-12 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                    />
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-foreground'>
                      Email
                    </label>
                    <input
                      {...register('email', {
                        required: 'Email is required.',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Invalid email address'
                        }
                      })}
                      type='email'
                      placeholder='rahul@example.com'
                      className='flex h-12 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                    />
                    {errors.email && (
                      <p className='text-xs text-destructive mt-1'>
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-foreground'>
                      Phone Number
                    </label>
                    <input
                      {...register('phone', {
                        required: 'Phone number is required',
                        pattern: {
                          value: /^[6-9]\d{9}$/,
                          message: 'Enter a valid Indian mobile number'
                        }
                      })}
                      type='tel'
                      placeholder='+91 98765 00000'
                      className='flex h-12 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                    />
                    {errors.phone && (
                      <p className='text-xs text-destructive mt-1'>
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className='space-y-2'>
                  <label className='text-sm font-medium text-foreground'>
                    I am a...
                  </label>

                  <div className='flex gap-4'>
                    <label className='flex items-center space-x-2 border border-border rounded-lg px-4 py-3 cursor-pointer hover:border-primary transition-colors flex-1'>
                      <input
                        type='radio'
                        value='farmer'
                        className='accent-primary h-4 w-4'
                        {...register('role', {
                          required: 'Please select your role'
                        })}
                      />
                      <span className='text-sm'>Farmer</span>
                    </label>

                    <label className='flex items-center space-x-2 border border-border rounded-lg px-4 py-3 cursor-pointer hover:border-primary transition-colors flex-1'>
                      <input
                        type='radio'
                        value='buyer'
                        className='accent-primary h-4 w-4'
                        {...register('role', {
                          required: 'Please select your role'
                        })}
                      />
                      <span className='text-sm'>Buyer/Trader</span>
                    </label>
                  </div>

                  {errors.role && (
                    <p className='text-destructive text-xs mt-1'>
                      {errors.role.message}
                    </p>
                  )}
                </div>

                <div className='space-y-2'>
                  <label className='text-sm font-medium text-foreground'>
                    Message
                  </label>
                  <textarea
                    {...register('message', {
                      required: 'Message is required'
                    })}
                    placeholder='How can we help you?'
                    className='flex min-h-37.5 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-y'
                  ></textarea>
                  {errors.message && (
                    <p className='text-destructive text-xs mt-1'>
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type='submit'
                  disabled={isSubmitting || createQuery.isPending}
                  className='inline-flex h-12 w-full items-center justify-center rounded-xl bg-primary px-8 text-sm font-bold text-primary-foreground shadow hover:bg-primary/90 transition-colors'
                >
                  {isSubmitting || createQuery.isPending
                    ? 'Sending Message'
                    : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className='mt-24 max-w-3xl mx-auto'>
          <h2 className='text-3xl font-bold text-foreground text-center mb-12'>
            Frequently Asked Questions
          </h2>
          <div className='space-y-4'>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className='border border-border rounded-xl bg-card overflow-hidden transition-all hover:border-primary/50'
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className='w-full flex justify-between items-center p-5 text-left focus:outline-none'
                >
                  <span className='font-semibold text-foreground'>
                    {faq.question}
                  </span>
                  {openFaq === index ? (
                    <ChevronUp className='h-5 w-5 text-muted-foreground' />
                  ) : (
                    <ChevronDown className='h-5 w-5 text-muted-foreground' />
                  )}
                </button>
                {openFaq === index && (
                  <div className='px-5 pb-5 animate-in slide-in-from-top-2 duration-200'>
                    <p className='text-muted-foreground text-sm leading-relaxed'>
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
