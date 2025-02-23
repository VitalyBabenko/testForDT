"use server";

import { axiosInstance } from "@/lib/axiosInstance";

export async function getRecipeById(id: string) {
  const { data } = await axiosInstance.get(
    `/${id}/information?includeNutrition=false`,
    {
      fetchOptions: { revalidate: 60 },
    }
  );

  return data;
}
