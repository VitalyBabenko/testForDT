'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useRouter } from 'next/navigation'

import { useMemo, useState } from 'react'

const cuisines = [
  'African',
  'Asian',
  'American',
  'British',
  'Cajun',
  'Caribbean',
  'Chinese',
  'Eastern European',
  'European',
  'French',
  'German',
  'Greek',
  'Indian',
  'Irish',
  'Italian',
  'Japanese',
  'Jewish',
  'Korean',
  'Latin American',
  'Mediterranean',
  'Mexican',
  'Middle Eastern',
  'Nordic',
  'Southern',
  'Spanish',
  'Thai',
  'Vietnamese',
] as const

export default function RecipeForm() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [cuisine, setCuisine] = useState('')
  const [maxTime, setMaxTime] = useState(60)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const queryParams = new URLSearchParams()
    if (query) queryParams.set('query', query)
    if (cuisine) queryParams.set('cuisine', cuisine)
    if (maxTime) queryParams.set('maxTime', String(maxTime))
    router.push(`/recipes?${queryParams.toString()}`)
  }

  const isDisabled = useMemo(() => {
    return query === '' && cuisine === '' && maxTime === 60
  }, [query, cuisine, maxTime])

  return (
    <form onSubmit={handleSubmit} className="space-y-6  max-w-md mx-auto">
      <div className="space-y-2">
        <label>What would you like to cook?</label>

        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a dish..."
        />
      </div>

      <div className="space-y-2">
        <label>Cuisine Type</label>

        <Select onValueChange={(value) => setCuisine(value)} defaultValue={cuisine}>
          <SelectTrigger>
            <SelectValue placeholder="Select a cuisine" />
          </SelectTrigger>

          <SelectContent>
            {cuisines.map((cuisine) => (
              <SelectItem key={cuisine} value={cuisine}>
                {cuisine}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label>Maximum Cooking Time (minutes)</label>

        <Input
          value={maxTime}
          onChange={(e) => setMaxTime(Number(e.target.value))}
          type="number"
          min="1"
          max="480"
          placeholder="60"
        />
      </div>

      <Button disabled={isDisabled} type="submit" className="w-full">
        Next
      </Button>
    </form>
  )
}
