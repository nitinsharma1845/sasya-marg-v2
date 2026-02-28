import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import {
  Loader2,
  User,
  Mail,
  Phone,
  ShieldCheck,
  Calendar,
  Camera,
  CheckCircle2,
  Eye,
  EyeOff,
  Sprout
} from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'
import {
  useChangeContactVisibility,
  useFetchFarmer,
  useUpdateFarmerData
} from '@/hooks/farmer.hooks'

import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import AppLoader from '@/components/common/AppLoader'
import { format } from 'date-fns'

const Profile = () => {
  const setUser = useAuthStore(s => s.setUser)
  const { data, isLoading } = useFetchFarmer()
  const { mutate: changeVisibility, isPending: changingVisibility } =
    useChangeContactVisibility()
  const { mutate: changeData, isPending: changingData } = useUpdateFarmerData()

  const [contactVisible, setContactVisible] = useState(false)

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm({ mode: 'onChange' })

  useEffect(() => {
    if (data?.data) {
      const user = data.data
      setValue('phone', user.phone)
      setValue('email', user.email)
      setValue('fullname', user.fullname)
      setContactVisible(user.isContactVisible)
    }
  }, [data, setValue])

  if (isLoading) return <AppLoader />

  const farmer = data?.data

  const handleToggle = () => {
    const previous = contactVisible
    setContactVisible(!previous)
    changeVisibility(
      {},
      {
        onError: err => {
          setContactVisible(previous)
          toast.error(
            err.response?.data?.message || 'Failed to update visibility'
          )
        },
        onSuccess: res => {
          toast.success(res.message)
        }
      }
    )
  }

  const onUpdate = payload => {
    changeData(payload, {
      onSuccess: res => {
        const currentUser = useAuthStore.getState().user
        setUser({
          ...currentUser,
          email: res.data.email,
          fullname: res.data.fullname
        })
        toast.success('Profile updated successfully')
      },
      onError: error => {
        toast.error(error.response?.data?.message || 'Update failed')
      }
    })
  }

  return (
    <div className='min-h-screen bg-background p-4 md:p-8 lg:p-12'>
      <div className='max-w-5xl mx-auto space-y-8'>
        <div className='relative group overflow-hidden rounded-3xl bg-card border shadow-sm p-6 md:p-10'>
          <div className='absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity'>
            <ShieldCheck className='w-32 h-32 text-primary' />
          </div>

          <div className='flex flex-col md:flex-row items-center gap-8 relative z-10'>
            <div className='relative'>
              <div className='w-32 h-32 rounded-full bg-secondary flex items-center justify-center border-4 border-background shadow-xl overflow-hidden'>
                <User className='w-16 h-16 text-primary/40' />
              </div>
              <button className='absolute bottom-1 right-1 p-2 bg-primary text-white rounded-full hover:scale-110 transition-transform shadow-lg'>
                <Sprout className='w-4 h-4' />
              </button>
            </div>

            <div className='text-center md:text-left space-y-2'>
              <div className='flex flex-wrap items-center justify-center md:justify-start gap-3'>
                <h1 className='text-3xl font-bold tracking-tight'>
                  {farmer?.fullname}
                </h1>
                {farmer?.isVarified && (
                  <Badge className='bg-chart-2/20 text-chart-2 border-none hover:bg-chart-2/30 px-3'>
                    <ShieldCheck className='w-3 h-3 mr-1' /> Verified Farmer
                  </Badge>
                )}
                <Badge
                  variant='outline'
                  className='uppercase text-[10px] tracking-widest px-2 border-primary/30 text-primary'
                >
                  {farmer?.role}
                </Badge>
              </div>
              <p className='text-muted-foreground flex items-center justify-center md:justify-start gap-2'>
                <Calendar className='w-4 h-4' />
                Member since{' '}
                {farmer?.createdAt
                  ? format(new Date(farmer.createdAt), 'MMMM yyyy')
                  : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
       
          <Card className='lg:col-span-2 border-none shadow-none bg-transparent'>
            <CardHeader className='px-0'>
              <CardTitle className='text-xl font-bold flex items-center gap-2'>
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className='px-0'>
              <form
                onSubmit={handleSubmit(onUpdate)}
                className='grid grid-cols-1 md:grid-cols-2 gap-6'
              >
                <div className='space-y-2'>
                  <label className='text-xs font-black uppercase tracking-widest text-muted-foreground ml-1'>
                    Full Name
                  </label>
                  <div className='relative'>
                    <User className='absolute left-3 top-3 w-4 h-4 text-muted-foreground' />
                    <Input
                      className='pl-10 h-12 bg-card border-border/50 focus-visible:ring-primary'
                      {...register('fullname', {
                        required: 'Name is required',
                        minLength: 3
                      })}
                    />
                  </div>
                  {errors.fullname && (
                    <span className='text-[10px] text-destructive font-bold'>
                      {errors.fullname.message}
                    </span>
                  )}
                </div>

                <div className='space-y-2'>
                  <label className='text-xs font-black uppercase tracking-widest text-muted-foreground ml-1'>
                    Email Address
                  </label>
                  <div className='relative'>
                    <Mail className='absolute left-3 top-3 w-4 h-4 text-muted-foreground' />
                    <Input
                      type='email'
                      className='pl-10 h-12 bg-card border-border/50 focus-visible:ring-primary'
                      {...register('email')}
                    />
                  </div>
                </div>

                <div className='space-y-2 md:col-span-2'>
                  <label className='text-xs font-black uppercase tracking-widest text-muted-foreground ml-1'>
                    Phone Number
                  </label>
                  <div className='relative'>
                    <Phone className='absolute left-3 top-3 w-4 h-4 text-muted-foreground' />
                    <Input
                      className='pl-10 h-12 bg-muted/50 border-none cursor-not-allowed font-mono'
                      {...register('phone')}
                      disabled
                    />
                    <div className='absolute right-3 top-3'>
                      <CheckCircle2 className='w-5 h-5 text-chart-1' />
                    </div>
                  </div>
                  <p className='text-[10px] text-muted-foreground italic mt-1'>
                    * Phone number is verified and linked to your identity.
                  </p>
                </div>

                <div className='md:col-span-2 pt-4'>
                  <Button
                    type='submit'
                    className='w-full md:w-auto px-12 h-12 rounded-xl bg-primary text-white font-bold transition-all active:scale-95 shadow-lg shadow-primary/20'
                    disabled={!isDirty || changingData}
                  >
                    {changingData ? (
                      <Loader2 className='w-5 h-5 animate-spin' />
                    ) : (
                      'Update Profile'
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className='space-y-6'>
           
            <Card className='border-none shadow-sm bg-secondary/40 rounded-2xl overflow-hidden relative'>
              <div className='absolute top-0 right-0 p-4'>
                {contactVisible ? (
                  <Eye className='w-5 h-5 text-primary' />
                ) : (
                  <EyeOff className='w-5 h-5 text-muted-foreground' />
                )}
              </div>
              <CardHeader className='pb-2'>
                <CardTitle className='text-sm font-black uppercase tracking-tighter'>
                  Market Presence
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex items-center justify-between gap-4'>
                  <p className='text-xs text-muted-foreground leading-relaxed'>
                    Toggle visibility to allow buyers to contact you directly
                    for listings.
                  </p>
                  <Switch
                    checked={contactVisible}
                    onCheckedChange={handleToggle}
                    disabled={changingVisibility}
                    className='data-[state=checked]:bg-primary'
                  />
                </div>
                <div className='bg-background/60 rounded-xl p-3 border border-border/50'>
                  <p className='text-[10px] font-bold text-foreground'>
                    Status:{' '}
                    {contactVisible ? 'VISIBLE TO MARKET' : 'PRIVATE MODE'}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className='border-none shadow-sm bg-card rounded-2xl'>
              <CardHeader className='pb-2'>
                <CardTitle className='text-sm font-black uppercase tracking-tighter'>
                  Account Status
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div className='flex items-center justify-between text-sm'>
                  <span className='text-muted-foreground'>Active Status</span>
                  <span className='font-bold text-chart-1 flex items-center gap-1'>
                    <div className='w-2 h-2 rounded-full bg-chart-1 animate-pulse' />{' '}
                    Online
                  </span>
                </div>
                <Separator className='bg-border/50' />
                <div className='flex items-center justify-between text-sm'>
                  <span className='text-muted-foreground'>Profile Health</span>
                  <span className='font-bold text-primary'>Strong</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
