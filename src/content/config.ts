import { z, defineCollection } from 'astro:content';

const serviceCollection = defineCollection({
    type: 'content', // v2.5.0 and later
    schema: z.object({
        title: z.string(),
        description: z.string(),
        type: z.string(),
        image: z.string(),
    }),
});

const sectorsCollection = defineCollection({
    type: 'content', // v2.5.0 and later
    schema: z.object({
        title: z.string(),
        description: z.string(),
        image: z.string(),
    }),
});

export const collections = {
    'services': serviceCollection,
    'sectors': sectorsCollection,
};