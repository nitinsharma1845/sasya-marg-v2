import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Plus,
  Trash2,
  FileText,
  Users,
  Calendar,
  CheckCircle2,
  ArrowLeft,
  X,
  Save
} from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  useCreateScheme,
  useGetSingleScheme,
  useUpdateScheme
} from '@/admin/hooks/scheme.hooks'

const defaultState = {
  title: '',
  description: '',
  benefits: '',
  eligibility: {
    cropTypes: [],
    landSizeMin: '',
    landSizeMax: '',
    states: [],
    farmerCategory: 'all'
  },
  documentsRequired: [],
  validFrom: '',
  validTill: ''
}

const AddScheme = ({ mode = 'create' }) => {
  const [formData, setFormData] = useState(defaultState)
  const [inputs, setInputs] = useState({ doc: '', crop: '', state: '' })

  const navigate = useNavigate()
  const { schemeId } = useParams()
  const createScheme = useCreateScheme()
  const updateScheme = useUpdateScheme()
  const { data } = useGetSingleScheme(schemeId, { enabled: mode === 'edit' })

  useEffect(() => {
    if (mode === 'edit' && data?.data) {
      const scheme = data.data
      setFormData({
        ...scheme,
        validFrom: scheme.validFrom ? scheme.validFrom.split('T')[0] : '',
        validTill: scheme.validTill ? scheme.validTill.split('T')[0] : ''
      })
    }
  }, [mode, data])

  const handleChange = (field, value) =>
    setFormData(prev => ({ ...prev, [field]: value }))

  const handleEligibilityChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      eligibility: { ...prev.eligibility, [field]: value }
    }))
  }

  const addTag = (category, field, value) => {
    if (!value) return
    if (category === 'eligibility') {
      handleEligibilityChange(field, [...formData.eligibility[field], value])
    } else {
      handleChange(field, [...formData[field], value])
    }
    setInputs(prev => ({
      ...prev,
      [field === 'documentsRequired'
        ? 'doc'
        : field === 'cropTypes'
        ? 'crop'
        : 'state']: ''
    }))
  }

  const removeTag = (category, field, index) => {
    if (category === 'eligibility') {
      handleEligibilityChange(
        field,
        formData.eligibility[field].filter((_, i) => i !== index)
      )
    } else {
      handleChange(
        field,
        formData[field].filter((_, i) => i !== index)
      )
    }
  }

  const handleSubmit = () => {
    const payload = {
      ...formData,

      eligibility: {
        ...formData.eligibility,

        landSizeMin: Number(formData.eligibility.landSizeMin),

        landSizeMax: Number(formData.eligibility.landSizeMax)
      },

      validFrom: formData.validFrom
        ? new Date(formData.validFrom).toISOString()
        : undefined,

      validTill: formData.validTill
        ? new Date(formData.validTill).toISOString()
        : undefined
    }

    if (mode === 'create') {
      createScheme.mutate(payload, {
        onSuccess: () => {
          navigate('/admin/dashboard/schemes')
        }
      })
    }

    if (mode === 'edit') {
      updateScheme.mutate(
        { id: schemeId, payload },

        {
          onSuccess: () => {
            navigate('/admin/dashboard/schemes')
          }
        }
      )
    }
  }

  return (
    <div className='min-h-screen bg-background pb-20 text-foreground'>
      <div className='sticky top-16 z-30 w-full bg-card/10 backdrop-blur-xl border-b border-border/50 shadow-sm rounded-xl'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-2'>
          <div className='flex items-center gap-2 sm:gap-4 overflow-hidden'>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => navigate(-1)}
              className='rounded-full shrink-0 hover:bg-secondary'
            >
              <ArrowLeft className='w-5 h-5' />
            </Button>
            <div className='truncate'>
              <h1 className='text-sm sm:text-xl font-bold tracking-tight truncate'>
                {mode === 'edit' ? 'Update Scheme' : 'New Scheme'}
              </h1>
              <p className='hidden sm:block text-[10px] text-muted-foreground font-bold uppercase tracking-widest leading-none mt-1'>
                Admin Control Panel
              </p>
            </div>
          </div>

          <div className='flex items-center gap-2'>
            <Button
              variant='ghost'
              className='hidden sm:inline-flex text-muted-foreground hover:text-foreground'
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className='bg-primary text-primary-foreground hover:bg-primary/90 px-4 sm:px-8 h-9 sm:h-10 shadow-sm'
            >
              <Save className='w-4 h-4 sm:hidden' />
              <span className='hidden sm:inline'>
                {mode === 'edit' ? 'Save Changes' : 'Publish Scheme'}
              </span>
              <span className='sm:hidden ml-1 text-xs'>Save</span>
            </Button>
          </div>
        </div>
      </div>

      <main className='max-w-6xl mx-auto px-4 sm:px-6 mt-6 sm:mt-10'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8'>
          <div className='lg:col-span-8 space-y-6 sm:space-y-8'>
            <section className='space-y-4'>
              <div className='flex items-center gap-2 text-primary font-bold px-1'>
                <FileText className='w-4 h-4' />
                <span className='text-xs uppercase tracking-wider'>
                  General Information
                </span>
              </div>
              <Card className='border-border bg-card shadow-sm'>
                <CardContent className='p-4 sm:p-6 space-y-6'>
                  <div className='space-y-2'>
                    <Label className='text-muted-foreground text-xs sm:text-sm'>
                      Scheme Title
                    </Label>
                    <Input
                      className='text-base sm:text-lg font-medium h-11 sm:h-12 bg-background border-input focus:ring-ring'
                      value={formData.title}
                      onChange={e => handleChange('title', e.target.value)}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label className='text-muted-foreground text-xs sm:text-sm'>
                      Description
                    </Label>
                    <Textarea
                      className='min-h-30 bg-background border-input text-sm sm:text-base'
                      value={formData.description}
                      onChange={e =>
                        handleChange('description', e.target.value)
                      }
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label className='text-muted-foreground text-xs sm:text-sm'>
                      Benefits
                    </Label>
                    <Textarea
                      className='min-h-25 bg-muted/30 border-input text-sm sm:text-base'
                      value={formData.benefits}
                      onChange={e => handleChange('benefits', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </section>

            <section className='space-y-4'>
              <div className='flex items-center gap-2 text-primary font-bold px-1'>
                <Users className='w-4 h-4' />
                <span className='text-xs uppercase tracking-wider'>
                  Eligibility Criteria
                </span>
              </div>
              <Card className='border-border bg-card shadow-sm'>
                <CardContent className='p-4 sm:p-6 space-y-8'>
                  <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6'>
                    <div className='space-y-2'>
                      <Label className='text-muted-foreground text-xs sm:text-sm'>
                        Farmer Category
                      </Label>
                      <Select
                        value={formData.eligibility.farmerCategory}
                        onValueChange={v =>
                          handleEligibilityChange('farmerCategory', v)
                        }
                      >
                        <SelectTrigger className='bg-background border-input'>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='all'>All Categories</SelectItem>
                          <SelectItem value='small'>Small</SelectItem>
                          <SelectItem value='marginal'>Marginal</SelectItem>
                          <SelectItem value='large'>Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='space-y-2'>
                      <Label className='text-muted-foreground text-xs sm:text-sm'>
                        Min Land (Acres)
                      </Label>
                      <Input
                        type='number'
                        className='bg-background border-input'
                        value={formData.eligibility.landSizeMin}
                        onChange={e =>
                          handleEligibilityChange('landSizeMin', e.target.value)
                        }
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label className='text-muted-foreground text-xs sm:text-sm'>
                        Max Land (Acres)
                      </Label>
                      <Input
                        type='number'
                        className='bg-background border-input'
                        value={formData.eligibility.landSizeMax}
                        onChange={e =>
                          handleEligibilityChange('landSizeMax', e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <Separator className='bg-border/50' />

                  <div className='space-y-4'>
                    <Label className='text-muted-foreground text-xs sm:text-sm'>
                      Target Crops
                    </Label>
                    <div className='flex gap-2'>
                      <Input
                        className='bg-background border-input'
                        value={inputs.crop}
                        onChange={e =>
                          setInputs({ ...inputs, crop: e.target.value })
                        }
                      />
                      <Button
                        variant='secondary'
                        className='bg-secondary text-secondary-foreground shrink-0'
                        onClick={() =>
                          addTag('eligibility', 'cropTypes', inputs.crop)
                        }
                      >
                        <Plus className='w-4 h-4' />
                      </Button>
                    </div>
                    <div className='flex flex-wrap gap-2'>
                      {formData.eligibility.cropTypes.map((crop, i) => (
                        <Badge
                          key={i}
                          variant='secondary'
                          className='pl-3 pr-1 py-1 gap-2 border-border text-foreground text-xs'
                        >
                          {crop}
                          <button
                            onClick={() =>
                              removeTag('eligibility', 'cropTypes', i)
                            }
                            className='hover:bg-destructive hover:text-destructive-foreground rounded-full p-0.5 transition-colors'
                          >
                            <X className='w-3 h-3' />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>

          <div className='lg:col-span-4 space-y-6 sm:os-y-8'>
            <section className='space-y-4'>
              <div className='flex items-center gap-2 text-primary font-bold px-1'>
                <Calendar className='w-4 h-4' />
                <span className='text-xs uppercase tracking-wider'>
                  Timeline
                </span>
              </div>
              <Card className='border-border bg-card shadow-sm'>
                <CardContent className='p-4 sm:p-6 space-y-4'>
                  <div className='space-y-2'>
                    <Label className='text-[10px] font-bold uppercase text-muted-foreground tracking-widest'>
                      Valid From
                    </Label>
                    <Input
                      type='date'
                      value={formData.validFrom}
                      onChange={e => handleChange('validFrom', e.target.value)}
                      className='bg-background border-input'
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label className='text-[10px] font-bold uppercase text-muted-foreground tracking-widest'>
                      Valid Till
                    </Label>
                    <Input
                      type='date'
                      value={formData.validTill}
                      onChange={e => handleChange('validTill', e.target.value)}
                      className='bg-background border-input'
                    />
                  </div>
                </CardContent>
              </Card>
            </section>

            <section className='space-y-4'>
              <div className='flex items-center gap-2 text-primary font-bold px-1'>
                <CheckCircle2 className='w-4 h-4' />
                <span className='text-xs uppercase tracking-wider'>
                  Documents
                </span>
              </div>
              <Card className='border-border bg-card shadow-sm overflow-hidden'>
                <div className='p-4 bg-secondary/50 border-b border-border'>
                  <div className='flex gap-2'>
                    <Input
                      placeholder='Add doc...'
                      className='bg-background border-input'
                      value={inputs.doc}
                      onChange={e =>
                        setInputs({ ...inputs, doc: e.target.value })
                      }
                    />
                    <Button
                      size='icon'
                      className='bg-primary shrink-0'
                      onClick={() =>
                        addTag('general', 'documentsRequired', inputs.doc)
                      }
                    >
                      <Plus className='w-4 h-4 text-primary-foreground' />
                    </Button>
                  </div>
                </div>
                <CardContent className='p-2 sm:p-4'>
                  <div className='space-y-1'>
                    {formData.documentsRequired.length === 0 && (
                      <p className='text-xs text-muted-foreground text-center py-4 italic'>
                        No documents required
                      </p>
                    )}
                    {formData.documentsRequired.map((doc, i) => (
                      <div
                        key={i}
                        className='flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors group'
                      >
                        <span className='text-xs sm:text-sm truncate mr-2'>
                          {doc}
                        </span>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='h-7 w-7 text-muted-foreground hover:text-destructive shrink-0'
                          onClick={() =>
                            removeTag('general', 'documentsRequired', i)
                          }
                        >
                          <Trash2 className='w-3.5 h-3.5' />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AddScheme
