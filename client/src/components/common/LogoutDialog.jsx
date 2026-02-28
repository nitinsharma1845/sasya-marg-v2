import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription
} from '@/components/ui/alert-dialog'

import { useTranslation } from 'react-i18next'

const LogoutConfirmDialog = ({ open, onClose, onConfirm }) => {
  const { t } = useTranslation()
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('auth.logout.confirmTitle')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('auth.logout.confirmMessage')}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            className={
              'bg-accent text-accent-foreground dark:bg-accent dark:text-accent-foreground hover:dark:bg-accent/90'
            }
          >
            {t('common.cancel')}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={
              'bg-destructive text-destructive-foreground hover:bg-destructive/90'
            }
          >
            {t('navbar.logout')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default LogoutConfirmDialog
