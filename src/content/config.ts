import { defineCollection, z } from 'astro:content';

// Your existing collections
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
      phone: z.string().optional(),
      email: z.string(),
    })),
  }),
});

const doctorsCollection = defineCollection({
  schema: z.object({
    name: z.string(),
    qualification: z.string(),
    specialty: z.string().optional(),
    description: z.string().optional(),
    image: z.string(),
    detailedInfo: z.object({
      about: z.string().optional(),
      qualifications: z.string().optional(),
      services: z.string().optional(),
      availability: z.string().optional(),
      languages: z.string().optional(),
      contact: z.string().optional(),
    }).optional(),
  }),
});

const videosCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    youtubeId: z.string(),
    presenter: z.string().optional(),
    featured: z.boolean().optional().default(false),
    aspectRatio: z.string().default('16/10'),
    seriesId: z.string().optional(),
    seriesName: z.string().optional(),
    seriesOrder: z.number().optional(),
  }),
});

const servicesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    category: z.string(),
    items: z.array(z.string()).optional(),
    order: z.number().optional(),
    colorFrom: z.string().optional(),
    colorTo: z.string().optional(),
    borderColor: z.string().optional(),
  }),
});

// About collection schema
const aboutCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    section: z.string(),
    order: z.number(),
    content: z.array(z.string()).optional(),
    phone: z.string().optional(),
    phoneDescription: z.string().optional(),
    expectations: z.array(z.string()).optional(),
    commitments: z.array(z.object({
      icon: z.string(),
      text: z.string()
    })).optional(),
  }),
});

export const collections = {
  'blogs': blogsCollection,
  'clinics': clinicsCollection,
  'doctors': doctorsCollection,
  'home-media': videosCollection,
  'home-service': servicesCollection,
  'about': aboutCollection
};