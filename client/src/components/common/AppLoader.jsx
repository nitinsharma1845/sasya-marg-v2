import { useTranslation } from 'react-i18next'
const AppLoader = () => {
  const { t } = useTranslation()
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-background'>
      <div className='flex flex-col items-center gap-3'>
        <div className='h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent' />
        <p className='text-sm text-muted-foreground'>{t('common.loading')}</p>
      </div>
    </div>
  )
}

export default AppLoader
