import React from 'react'
import { PlusCircle } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'

const AddFarmlandCard = ({ onMouseEnter }) => {
  const navigate = useNavigate()

  return (
    <Card
      onMouseEnter={onMouseEnter}
      onTouchStart={onMouseEnter}
      onClick={() => navigate('/farmer/farmland/add')}
      className='group relative flex h-full min-h-85 w-full max-w-sm cursor-pointer flex-col items-center justify-center overflow-hidden border-2 border-dashed border-border bg-muted/40 transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:shadow-lg'
    >
      <div className='absolute inset-0 bg-[radial-gradient(var(--color-primary)_1px,transparent_1px)] bg-size-[16px_16px] opacity-[0.08]' />

      <div className='relative z-10 flex flex-col items-center p-6 text-center transition-transform duration-300 group-hover:scale-105'>
        <div className='mb-4 rounded-full bg-card p-4 shadow-sm ring-1 ring-primary/20 transition-all duration-300 group-hover:bg-primary group-hover:shadow-md'>
          <PlusCircle className='h-10 w-10 text-primary transition-colors duration-300 group-hover:text-primary-foreground' />
        </div>

        <h3 className='mb-2 text-xl font-semibold tracking-tight text-foreground group-hover:text-primary'>
          Register New Land
        </h3>

        <p className='max-w-50 text-sm text-muted-foreground'>
          Add details for a new plot to receive AI-driven crop guidance and
          insights.
        </p>
      </div>
    </Card>
  )
}

export default AddFarmlandCard
