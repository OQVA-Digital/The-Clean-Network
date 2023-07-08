import { z, defineCollection } from 'astro:content';

const serviceCollection = defineCollection({
    type: 'content', // v2.5.0 and later
    schema: z.object({
        title: z.string(),
        image: z.string().optional(),
    }),
});

const sectorsCollection = defineCollection({
    type: 'content', // v2.5.0 and later
    schema: z.object({
        title: z.string(),
        image: z.string().optional(),
    }),
});

export const collections = {
    'services': serviceCollection,
    'sectors': sectorsCollection,
};