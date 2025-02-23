import { RecipeGrid } from "@/components/recipe-grid";

export default function Loading() {
  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Loading</h1>
      <RecipeGrid recipes={[]} loading={true} />
    </div>
  );
}
