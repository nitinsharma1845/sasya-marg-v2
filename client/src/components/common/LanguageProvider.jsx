import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '../ui/select'

const LanguageProvider = () => {
  const { i18n } = useTranslation()

  const handleChange = value => {
    i18n.changeLanguage(value)
    localStorage.setItem('lang', value)
  }

  return (
    <Select defaultValue={i18n.language} onValueChange={handleChange}>
      <SelectTrigger className='w-full max-w-48'>
        <SelectValue placeholder='Select language' />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value='en'>English</SelectItem>
        <SelectItem value='hi'>हिंदी</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default LanguageProvider
