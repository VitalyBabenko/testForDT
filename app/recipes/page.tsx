import { BackButton } from "@/components/back-button";
import { findRecipes } from "./actions";
import { RecipeGrid } from "@/components/recipe-grid";

type RecipePageProps = {
  searchParams: { [key: string]: string | undefined };
};

export const revalidate = 60;

export default async function RecipesPage({ searchParams }: RecipePageProps) {
  const recipes = await findRecipes(searchParams);

  console.log(recipes);

  return (
    <div className="p-4 max-w-5xl mx-auto relative">
      <BackButton className="absolute top-0 left-0" />
      <h1 className="text-2xl font-bold mt-4 mb-12">Recipe Page</h1>
      <RecipeGrid recipes={recipes} />
    </div>
  );
}
