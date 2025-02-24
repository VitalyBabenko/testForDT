import Image from 'next/image'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Link from 'next/link'

export interface Recipe {
  id: string
  title: string
  image: string
  cookingTime: number
  cuisine: string
}

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link href={`/recipes/${recipe.id}`}>
      <Card className="group overflow-hidden transition-colors hover:bg-muted/50">
        <CardHeader className="p-0 relative aspect-video overflow-hidden rounded-t-lg">
          <Image
            src={recipe.image || '/placeholder.svg'}
            alt={recipe.title}
            width={312}
            height={231}
            className="object-cover transition-transform  group-hover:scale-105 w-auto "
          />
        </CardHeader>
        <CardContent className="space-y-2.5 p-4">
          <strong className="line-clamp-2 font-semibold">{recipe.title}</strong>
        </CardContent>
      </Card>
    </Link>
  )
}
