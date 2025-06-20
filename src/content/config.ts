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
    // For clinics, these fields are optional to allow for the intern-images.md structure
    locations: z.array(z.object({
      name: z.string(),
      address: z.string(),
      phone: z.string(),
      email: z.string(),
    })).optional(),
    doctors: z.array(z.object({
      name: z.string(),
      image: z.string(),
      fees: z.record(z.string(), z.any())
    })).optional(),
    // For intern-images.md
    description: z.string().optional(),
    images: z.array(z.object({
      src: z.string(),
      alt: z.string()
    })).optional(),
  }),
});

export const collections = {
  'blogs': blogsCollection,
  'clinics': clinicsCollection,
};