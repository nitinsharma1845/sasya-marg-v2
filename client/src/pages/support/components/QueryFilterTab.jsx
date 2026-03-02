import React from 'react'
import { Button } from '@/components/ui/button'

const QueryFilterTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'all', label: 'All Queries' },
    { id: 'open', label: 'Pending' },
    { id: 'resolved', label: 'Resolved' },
    { id: 'closed', label: 'Closed' }
  ]

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant="ghost"
          onClick={() => onTabChange(tab.id)}
          className={`
            h-9 rounded-full px-4 text-sm font-medium transition-all cursor-pointer
            ${activeTab === tab.id 
              ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
              : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
            }
          `}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  )
}

export default QueryFilterTabs