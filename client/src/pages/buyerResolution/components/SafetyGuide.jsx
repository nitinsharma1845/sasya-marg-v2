const SafetyGuide = () => {
  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-xl font-semibold mb-1'>Safe Trading Guidelines</h2>
        <p className='text-sm text-muted-foreground'>
          Follow these tips to protect yourself when dealing with users.
        </p>
      </div>

      <div className='space-y-4'>
        <SafetyCard
          title='Inspect Before You Pay'
          desc='Since SasyaMarg is a discovery platform, always inspect the crops in person or request a live video call before making any payments.'
        />
        <SafetyCard
          title="Beware of 'Advance Payment' Scams"
          desc='Be cautious of farmers or buyers insisting on large advance payments via UPI before you have verified the product exists.'
        />
        <SafetyCard
          title='Keep Communication Visible'
          desc="Try to use the platform's chat or keep a record of WhatsApp conversations. Screenshots serve as evidence if a user needs to be banned."
        />
        <SafetyCard
          title='Verify Identity'
          desc="Check if the farmer has a 'Verified' badge on SasyaMarg or ask for basic identification if the deal value is high."
        />
      </div>
    </div>
  )
}

const SafetyCard = ({ title, desc }) => (
  <div className='p-4 border border-border rounded-lg bg-muted/20'>
    <h3 className='font-semibold text-foreground mb-1'>{title}</h3>
    <p className='text-sm text-muted-foreground'>{desc}</p>
  </div>
)

export default SafetyGuide
