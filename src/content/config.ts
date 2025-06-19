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

const clinicsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    locations: z.array(z.object({
      name: z.string(),
      address: z.string(),
      phone: z.string(),
      email: z.string(),
    })),
  }),
});

export const collections = {
  'blogs': blogsCollection,
  'clinics': clinicsCollection,
};