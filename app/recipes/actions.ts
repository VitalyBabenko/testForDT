'use server'

import { axiosInstance } from '@/lib/axiosInstance'

interface SearchParams {
  query?: string
  cuisine?: string
  maxTime?: string
}

export async function findRecipes(searchParams: SearchParams) {
  const query = searchParams?.query ?? ''
  const cuisine = searchParams?.cuisine ?? ''
  const maxTime = searchParams?.maxTime ?? '60'

  const { data } = await axiosInstance.get('/complexSearch', {
    params: {
      query,
      cuisine,
      maxReadyTime: maxTime,
    },
    fetchOptions: { revalidate: 60 },
  })

  console.log(data)

  return data.results
}
