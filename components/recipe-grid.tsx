import { type Recipe, RecipeCard } from '@/components/recipe-card'
import { RecipeCardSkeleton } from './recipe-card-skeleton'

interface RecipeGridProps {
  recipes: Recipe[]
  loading?: boolean
}

export function RecipeGrid({ recipes, loading }: RecipeGridProps) {
  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <RecipeCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center h-screen flex flex-col justify-center">
        <p className="text-muted-foreground">No recipes found. Try adjusting your search.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  )
}
