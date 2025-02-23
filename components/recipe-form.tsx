"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

import { useState } from "react";

const cuisines = [
  { value: "italian", label: "Italian" },
  { value: "mexican", label: "Mexican" },
  { value: "chinese", label: "Chinese" },
  { value: "indian", label: "Indian" },
  { value: "japanese", label: "Japanese" },
  { value: "thai", label: "Thai" },
] as const;

export default function RecipeForm() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [maxTime, setMaxTime] = useState(60);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const queryParams = new URLSearchParams();
    if (query) queryParams.set("query", query);
    if (cuisine) queryParams.set("cuisine", cuisine);
    if (maxTime) queryParams.set("maxTime", String(maxTime));
    router.push(`/recipes?${queryParams.toString()}`);
  };

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

        <Select
          onValueChange={(value) => setCuisine(value)}
          defaultValue={cuisine}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a cuisine" />
          </SelectTrigger>

          <SelectContent>
            {cuisines.map((cuisine) => (
              <SelectItem key={cuisine.value} value={cuisine.value}>
                {cuisine.label}
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

      <Button type="submit" className="w-full">
        Next
      </Button>
    </form>
  );
}
