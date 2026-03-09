import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Loader2, CheckCircle } from 'lucide-react'
import { api } from '@/lib/axios'
import { queryClient } from '@/lib/queryClient'

export default function CreateCampaignDialog ({ open, onOpenChange }) {
  const [step, setStep] = useState('form')
  const [loading, setLoading] = useState(false)

  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const [campaignId, setCampaignId] = useState(null)

  const [progress, setProgress] = useState(0)
  const [sent, setSent] = useState(0)
  const [total, setTotal] = useState(0)
  const [failed, setFailed] = useState(0)

  const handleSubmit = async () => {
    try {
      setLoading(true)

      const res = await api.post('/campaign/', {
        title,
        subject,
        message
      })

      const id = res.data.data._id

      setCampaignId(id)
      setStep('sending')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!campaignId) return

    const interval = setInterval(async () => {
      const res = await api.get(`/campaign/${campaignId}/status`)
      const data = res.data.data

      setProgress(data.progress)
      setSent(data.sent)
      setFailed(data.failed)
      setTotal(data.total)

      if (data.status === 'completed') {
        clearInterval(interval)
        queryClient.invalidateQueries(['campaign'])
        setStep('completed')
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [campaignId])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-140'>
        {step === 'form' && (
          <>
            <DialogHeader>
              <DialogTitle>Create Email Campaign</DialogTitle>
              <DialogDescription>
                Send announcements or updates to farmers or buyers.
              </DialogDescription>
            </DialogHeader>

            <div className='space-y-4 py-2'>
              <Input
                placeholder='Campaign Title'
                value={title}
                onChange={e => setTitle(e.target.value)}
              />

              <Input
                placeholder='Email Subject'
                value={subject}
                onChange={e => setSubject(e.target.value)}
              />

              <Textarea
                placeholder='Write your campaign message...'
                className='min-h-35'
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
            </div>

            <DialogFooter>
              <Button variant='outline' onClick={() => onOpenChange(false)}>
                Cancel
              </Button>

              <Button disabled={loading} onClick={handleSubmit}>
                {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                Send Campaign
              </Button>
            </DialogFooter>
          </>
        )}

        {step === 'sending' && (
          <>
            <DialogHeader>
              <DialogTitle>Campaign Sending</DialogTitle>
              <DialogDescription>
                Emails are being delivered. You can close this dialog safely.
              </DialogDescription>
            </DialogHeader>

            <div className='space-y-5 py-4'>
              <Progress value={progress} />

              <div className='flex justify-between text-sm text-muted-foreground'>
                <span>Sent: {sent}</span>
                <span>Total: {total}</span>
              </div>

              <div className='flex justify-between text-sm text-muted-foreground'>
                <span>Failed: {failed}</span>
                <span>{progress}%</span>
              </div>
            </div>

            <DialogFooter>
              <Button variant='outline' onClick={() => onOpenChange(false)}>
                Close
              </Button>
            </DialogFooter>
          </>
        )}

        {step === 'completed' && (
          <>
            <DialogHeader>
              <DialogTitle>Campaign Completed</DialogTitle>
            </DialogHeader>

            <div className='flex flex-col items-center justify-center py-6 space-y-4'>
              <CheckCircle className='h-12 w-12 text-green-500' />

              <p className='text-sm text-muted-foreground'>
                {sent} emails sent successfully
              </p>

              <p className='text-sm text-muted-foreground'>Failed: {failed}</p>
            </div>

            <DialogFooter>
              <Button onClick={() => onOpenChange(false)}>Done</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
