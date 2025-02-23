import Image from "next/image";
import { getRecipeById } from "./actions";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, DollarSign, Users, Utensils } from "lucide-react";
import { Suspense } from "react";
import { BackButton } from "@/components/back-button";

export const revalidate = 60;

export default async function RecipePage({
  params: params,
}: {
  params: { id: string };
}) {
  const recipe = await getRecipeById(params.id);

  const splitHTML = (html: string) => {
    if (html.length < 3) return null;
    return html.replace(/<[^>]*>/g, "").trim();
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="min-h-screen bg-background  pb-12">
        <div className="relative h-[40vh] w-full  overflow-hidden">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover max-w-[960px] mx-auto"
            priority
          />
          <div className="absolute  inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>

        <BackButton />

        <div className="container  relative -mt-16 max-w-[1200px] xs:max-w-[90%] space-y-8 mx-auto  flex justify-center">
          <div className="rounded-xl bg-card   p-6 shadow-lg xs:max-w-[90%]">
            <div className="flex flex-col gap-4 md:flex-row md:items-start  md:justify-between">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                  {recipe.title}
                </h1>
                <div className="flex flex-wrap gap-2">
                  {recipe.cuisines.map((cuisine: string) => (
                    <Badge key={cuisine} variant="secondary">
                      {cuisine}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2  md:grid-cols-4">
              <div className="flex items-center  gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{recipe.readyInMinutes} mins</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{recipe.servings} servings</span>
              </div>
              <div className="flex  items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span>
                  ${(recipe.pricePerServing / 100).toFixed(2)} per serving
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Utensils className="h-4 w-4 text-muted-foreground" />
                <span>{recipe.dishTypes[0]}</span>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="grid gap-8  md:grid-cols-[2fr,3fr]">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold">Ingredients</h2>
                  <p className="text-sm text-muted-foreground">
                    {recipe.servings} servings
                  </p>
                </div>
                <ul className="space-y-3  text-sm">
                  {recipe.extendedIngredients.map(
                    (ingredient: { id: number; original: string }) => (
                      <li
                        key={ingredient.id}
                        className="flex items-start gap-2"
                      >
                        <span>•</span>
                        <span>{ingredient.original}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Instructions</h2>
                <div className="space-y-4 text-sm">
                  {recipe.instructions
                    .split(".")
                    .filter(Boolean)
                    .map((step: string, index: number) => {
                      if (!splitHTML(step)?.length) return null;
                      return (
                        <div key={index} className="flex gap-2">
                          <span className="font-bold">{index + 1}.</span>
                          <p>{splitHTML(step)}.</p>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Suspense>
  );
}
