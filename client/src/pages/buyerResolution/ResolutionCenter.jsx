import React, { useState } from 'react'
import {
  AlertTriangle,
  ShieldCheck,
  FileText,
  Send,
  AlertCircle
} from 'lucide-react'
import SafetyGuide from './components/SafetyGuide'
import ReportHistory from './components/ReportHistory'
import ReportIssueForm from './components/ReportIssueForm'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useSearchParams } from 'react-router-dom'

const ResolutionCenter = () => {
  const [activeTab, setActiveTab] = useState('report')
  const [param, setParam] = useSearchParams()

  const issues = [
    'FAKE_PRODUCT',
    'MISLEADING_INFO',
    'PRICE_FRAUD',
    'DUPLICATE_LISTING',
    'SPAM',
    'OTHER'
  ]

  const statusArr = ['pending', 'reviewed', 'action_taken', 'rejected']

  const updateParam = (key, value) => {
    setParam(prev => {
      const newParams = new URLSearchParams(prev)
      if (value && value !== 'all') {
        newParams.set(key, value)
      } else {
        newParams.delete(key)
      }
      newParams.set('page', '1')
      return newParams
    })
  }

  return (
    <div className='min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8'>
      <div className='container mx-auto'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-foreground'>
            Resolution Center
          </h1>
          <p className='text-muted-foreground mt-2'>
            Help us keep SasyaMarg safe. Report suspicious activity or learn how
            to trade safely.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          <div className='lg:col-span-1 space-y-2'>
            <NavButton
              active={activeTab === 'report'}
              onClick={() => setActiveTab('report')}
              icon={<AlertTriangle className='w-4 h-4' />}
              label='Report an Issue'
            />
            <NavButton
              active={activeTab === 'guide'}
              onClick={() => setActiveTab('guide')}
              icon={<ShieldCheck className='w-4 h-4' />}
              label='Safety Guide'
            />
            <NavButton
              active={activeTab === 'history'}
              onClick={() => setActiveTab('history')}
              icon={<FileText className='w-4 h-4' />}
              label='My Reports'
            />

            {activeTab === 'history' && (
              <div className='mt-10 flex md:flex-col gap-2 md:gap-5 w-full'>
                <Select
                  value={param.get('reason') || ''}
                  onValueChange={val => updateParam('reason', val)}
                >
                  <SelectTrigger className='w-full cursor-pointer'>
                    <SelectValue placeholder='Select a reason' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Reasons</SelectLabel>
                      <SelectItem value={'all'}>All</SelectItem>
                      {issues.map(issue => {
                        return (
                          <SelectItem key={issue} value={issue}>
                            {issue}
                          </SelectItem>
                        )
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Select
                  value={param.get('status') || ''}
                  onValueChange={val => updateParam('status', val)}
                >
                  <SelectTrigger className='w-full cursor-pointer'>
                    <SelectValue placeholder='Select a Status' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value={'all'}>All</SelectItem>
                      {statusArr.map(s => {
                        return (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        )
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className='lg:col-span-3 flex flex-col'>
            <div className='border border-border rounded-lg shadow-sm p-6 flex flex-col h-full'>
              <div className='flex-1'>
                {activeTab === 'report' && <ReportIssueForm />}
                {activeTab === 'guide' && <SafetyGuide />}
                {activeTab === 'history' && <ReportHistory />}
              </div>
            </div>

            <div className='mt-6 p-4 bg-muted/50 rounded-md flex gap-3 items-start border border-border'>
              <AlertCircle className='w-5 h-5 text-muted-foreground shrink-0 mt-0.5' />
              <p className='text-xs text-muted-foreground leading-relaxed'>
                <strong>Note:</strong> SasyaMarg is a discovery platform. We do
                not handle payments or product delivery. Our Resolution Center
                is strictly for reporting policy violations (scams, harassment,
                fake data) to help us ban bad actors. We cannot mediate
                financial disputes or recover lost funds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const NavButton = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors cursor-pointer ${
      active
        ? 'bg-primary/10 text-primary border border-primary/20'
        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
    }`}
  >
    {icon}
    {label}
  </button>
)

export default ResolutionCenter
