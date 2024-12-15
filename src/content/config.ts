import { defineCollection, z } from 'astro:content';

const blogsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string(),
    author: z.string(),
    image: z.string(),
    excerpt: z.string(),
  }),
});

export const collections = {
  'blogs': blogsCollection,
}; 