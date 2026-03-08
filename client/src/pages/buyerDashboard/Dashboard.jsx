import React, { useState } from 'react'
import {
  Heart,
  MessageSquare,
  MapPin,
  User,
  Phone,
  Mail,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Store,
  ExternalLink
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

import AppLoader from '@/components/common/AppLoader'
import LogoutButton from '@/components/common/LogoutButton'
import LogoutConfirmDialog from '@/components/common/LogoutDialog'

import { useGetBuyerDashboard } from '@/hooks/buyer.hooks'
import { useLogoutBuyer as useLogout } from '@/hooks/buyer.hooks'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const Dashboard = () => {
  const { data: response, isLoading } = useGetBuyerDashboard()
  const [isOpen, setIsOpen] = useState(false)
  const logout = useLogout()
  const navigate = useNavigate()

  if (isLoading) return <AppLoader />

  const { profile, stats, recentWishlist } = response.data
  const handleLogout = () => logout.mutate()

  return (
    <div className='min-h-screen bg-background text-foreground pb-20'>
      <div className='max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-10'>
        <header className='flex flex-col md:flex-row justify-between items-start md:items-center gap-6'>
          <div className='space-y-1'>
            <div className='flex items-center gap-2'>
              <div className='bg-primary p-2 rounded-lg'>
                <Store size={20} className='text-primary-foreground' />
              </div>
              <Badge
                variant='secondary'
                className='rounded-md font-semibold tracking-wider bg-secondary text-secondary-foreground border-none'
              >
                {profile.role || 'VERIFIED BUYER'}
              </Badge>
            </div>
            <h1 className='text-4xl font-extrabold tracking-tight'>
              Welcome,{' '}
              <span className='text-primary'>
                {profile.fullname.split(' ')[0]}
              </span>
            </h1>
          </div>

          <div className='flex items-center gap-3 bg-card p-2 rounded-2xl border border-border shadow-sm'>
            <Button
              className='rounded-xl shadow-md transition-all hover:opacity-90 active:scale-95 bg-primary text-primary-foreground cursor-pointer'
              onClick={() => navigate('/buyer/product/harvested')}
            >
              Marketplace
            </Button>
            <LogoutButton
              variant='ghost'
              className='rounded-xl hover:bg-destructive/10 hover:text-destructive text-muted-foreground cursor-pointer'
              onClick={() => setIsOpen(true)}
            />
          </div>
        </header>

        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
          <Card className='lg:col-span-7 rounded-3xl border-border bg-card shadow-sm relative overflow-hidden group'>
            <div className='absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(var(--primary)_1px,transparent_1px)] bg-size-[20px_20px]' />

            <CardContent className='p-8 relative'>
              <div className='flex flex-col sm:flex-row gap-8 items-start'>
                <div className='relative'>
                  <Avatar className='h-28 w-28 ring-4 ring-muted shadow-lg'>
                    <AvatarFallback className='bg-primary text-primary-foreground text-4xl font-black'>
                      {profile.fullname[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className='absolute -bottom-2 -right-2 bg-primary p-1.5 rounded-full border-4 border-card'>
                    <ShieldCheck
                      size={16}
                      className='text-primary-foreground'
                    />
                  </div>
                </div>

                <div className='flex-1 space-y-6'>
                  <div>
                    <h2 className='text-2xl font-bold text-foreground'>
                      {profile?.fullname}
                    </h2>
                    <p className='text-muted-foreground font-medium uppercase text-[10px] tracking-wider'>
                      {profile?.role || 'Verified Buyer'}
                    </p>
                  </div>

                  <div className='grid grid-cols-1 xl:grid-cols-2 gap-4'>
                    {profile?.email ? (
                      <div className='flex items-center gap-4 bg-muted/50 p-4 rounded-xl border border-border/50'>
                        <Mail size={18} className='text-primary' />
                        <span className='text-sm font-semibold truncate'>
                          {profile.email}
                        </span>
                      </div>
                    ) : (
                      <Link
                        to='/buyer/'
                        className='flex items-center gap-4 bg-accent/10 p-4 rounded-xl border border-accent/20 hover:bg-accent/20 transition-colors group'
                      >
                        <PlusCircle size={18} className='text-accent' />
                        <span className='text-sm font-bold text-accent'>
                          Add Email Address
                        </span>
                      </Link>
                    )}

                    {profile?.address?.city || profile?.address?.state ? (
                      <div className='flex items-center gap-4 bg-muted/50 p-4 rounded-xl border border-border/50'>
                        <MapPin size={18} className='text-primary' />
                        <span className='text-sm font-semibold'>
                          {profile.address.city}, {profile.address.state}
                        </span>
                      </div>
                    ) : (
                      <Link
                        to='/buyer/'
                        className='flex items-center gap-4 bg-accent/10 p-4 rounded-xl border border-accent/20 hover:bg-accent/20 transition-colors group'
                      >
                        <MapPin size={18} className='text-accent' />
                        <span className='text-sm font-bold text-accent'>
                          Add Shipping Address
                        </span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className='lg:col-span-5 grid grid-cols-2 lg:grid-cols-1 gap-6'>
            {[
              {
                label: 'Wishlist',
                val: stats.wishlistCount,
                icon: Heart,
                color: 'text-primary',
                bg: 'bg-primary/10'
              },
              {
                label: 'Requests',
                val: stats.contactCount,
                icon: MessageSquare,
                color: 'text-accent',
                bg: 'bg-accent/10'
              }
            ].map((stat, i) => (
              <div
                key={i}
                className='bg-card p-6 rounded-3xl border border-border shadow-sm flex items-center justify-between group hover:border-primary transition-colors'
              >
                <div>
                  <p className='text-xs font-bold text-muted-foreground uppercase tracking-widest'>
                    {stat.label}
                  </p>
                  <h3 className='text-4xl font-black mt-1 text-foreground'>
                    {stat.val}
                  </h3>
                </div>
                <div
                  className={`${stat.bg} ${stat.color} p-4 rounded-2xl transition-transform group-hover:scale-105`}
                >
                  <stat.icon size={28} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <section className='space-y-6'>
          <div className='flex justify-between items-end'>
            <div>
              <h2 className='text-3xl font-black tracking-tight text-foreground'>
                Recent Interests
              </h2>
              <p className='text-muted-foreground'>
                Saved products from your network
              </p>
            </div>
            <Button
              variant='link'
              className='font-bold text-primary hover:text-primary/80 group p-0 cursor-pointer'
              onClick={() => navigate('/buyer/wishlist')}
            >
              View All{' '}
              <ArrowRight
                size={18}
                className='ml-1 group-hover:translate-x-1 transition-transform'
              />
            </Button>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {recentWishlist.length > 0 ? (
              recentWishlist.slice(0, 2).map(item => (
                <div
                  key={item._id}
                  className='group overflow-hidden rounded-3xl border border-border bg-card hover:shadow-md transition-all'
                >
                  <div className='flex flex-col sm:flex-row h-full'>
                    <div className='sm:w-52 h-56 sm:h-auto overflow-hidden relative'>
                      <img
                        loading='lazy'
                        decoding='async'
                        src={item?.item?.images[0]?.url}
                        alt={item?.item?.title}
                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                      />
                    </div>

                    <CardContent className='flex-1 p-6 flex flex-col justify-between'>
                      <div className='space-y-2'>
                        <span className='text-[10px] font-bold text-muted-foreground flex items-center gap-1.5 uppercase'>
                          <Calendar size={12} className='text-primary' />
                          {new Date(
                            item?.item?.expectedHarvest || item?.item?.createdAt
                          ).toLocaleDateString()}
                        </span>
                        <h4 className='text-xl font-bold text-foreground line-clamp-1'>
                          {item.item.title}
                        </h4>
                      </div>

                      <div className='mt-6 flex justify-between items-end border-t border-border pt-4'>
                        <div>
                          <p className='text-xs font-bold text-muted-foreground uppercase'>
                            Price
                          </p>
                          <div className='flex items-baseline gap-1'>
                            <span className='text-2xl font-black text-primary'>
                              ₹
                              {(
                                item.item?.expectedPrice?.value ||
                                item.item?.price?.value
                              ).toLocaleString()}
                            </span>
                            <span className='text-xs font-medium text-muted-foreground uppercase'>
                              /
                              {item.item?.expectedPrice?.unit?.split('_')[1] ||
                                'UNIT'}
                            </span>
                          </div>
                        </div>

                        <Button
                          size='sm'
                          className='rounded-xl px-5 font-bold bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer'
                          onClick={() =>
                            navigate(
                              `/buyer/product/${
                                item.item.productType === 'pre-harvest'
                                  ? 'pre-harvested'
                                  : 'harvested'
                              }/${item.item._id}`
                            )
                          }
                        >
                          Inspect
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </div>
              ))
            ) : (
              <div className='col-span-full py-20 bg-muted/30 border-2 border-dashed border-border rounded-[2.5rem] flex flex-col items-center justify-center text-center'>
                <Heart size={40} className='text-muted-foreground/30 mb-4' />
                <h3 className='text-lg font-bold text-foreground'>
                  No saved items
                </h3>
                <p className='text-muted-foreground text-sm mt-1 mb-6'>
                  Start exploring the marketplace to fill your wishlist.
                </p>
                <Button
                  className='rounded-xl px-8 bg-primary text-primary-foreground cursor-pointer'
                  onClick={() => navigate('/buyer/product/harvested')}
                >
                  Explore Now
                </Button>
              </div>
            )}
          </div>
        </section>
      </div>

      <LogoutConfirmDialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleLogout}
      />
    </div>
  )
}

export default Dashboard
