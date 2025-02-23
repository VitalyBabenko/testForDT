import RecipeForm from "@/components/recipe-form";

export default function Home() {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Recipe Finder
        </h1>
      </div>
      <RecipeForm />
    </main>
  );
}
