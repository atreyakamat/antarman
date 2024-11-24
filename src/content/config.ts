import { defineCollection, z } from 'astro:content';

const blogsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    image: z.string(),
    excerpt: z.string(),
    order: z.number().optional(),
  }),
});

export const collections = {
  blogs: blogsCollection,
}; 