import { z, defineCollection } from 'astro:content';

const serviceCollection = defineCollection({
    type: 'content', // v2.5.0 and later
    schema: z.object({
        order: z.number().optional(),
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
        metaKeywords: z.string().optional(),
        title: z.string(),
        description: z.string().optional(),
        type: z.string(),
        image: z.string().optional(),
    }),
});

const sectorsCollection = defineCollection({
    type: 'content', // v2.5.0 and later
    schema: z.object({
        order: z.number().optional(),
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
        metaKeywords: z.string().optional(),
        title: z.string(),
        description: z.string().optional(),
        image: z.string().optional(),
    }),
});

const testimonialsCollection = defineCollection({
    type: 'content', // v2.5.0 and later
    schema: z.object({
        avatar: z.string(),
        name: z.string(),
        description: z.string().optional(),
        heading: z.string(),
        paragraph01: z.string().optional(),
        paragraph02: z.string().optional(),
        paragraph03: z.string().optional(),
    }),
});

const benefitcsCollection = defineCollection({
    type: 'content', // v2.5.0 and later
    schema: z.object({
        order: z.number().optional(),
        icon: z.string(),
        title: z.string(),
        paragraph01: z.string().optional(),
        paragraph02: z.string().optional(),
        paragraph03: z.string().optional(),
    }),
});

export const collections = {
    'services': serviceCollection,
    'sectors': sectorsCollection,
    'testimonials': testimonialsCollection,
    'benefits': benefitcsCollection,
};