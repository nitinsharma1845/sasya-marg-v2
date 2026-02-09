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

const ResolutionCenter = () => {
  const [activeTab, setActiveTab] = useState('report')

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
          </div>

          <div className='lg:col-span-3'>
            <div className='bg-card border border-border rounded-lg shadow-sm p-6'>
              {activeTab === 'report' && <ReportIssueForm />}

              {activeTab === 'guide' && <SafetyGuide />}

              {activeTab === 'history' && <ReportHistory />}
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
    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors ${
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
