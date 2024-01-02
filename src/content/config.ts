import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		author: z.string(),
		authorImage: z.string().optional(),
        standFirst: z.string().optional(),
		tags: z.array(z.string()).optional(),
        category: z.string(),
		description: z.string(),
		pubDate: z
			.string()
			.or(z.date())
			.transform((val) => new Date(val)),
		heroImage: z.string(),
	}),
});

const serviceCollection = defineCollection({
    type: 'content',
    schema: z.object({
        order: z.number().optional(),
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
        metaKeywords: z.string().optional(),
        title: z.string(),
        description: z.string().optional(),
        type: z.string(),
        image: z.string().optional(),
        hourlyPrice:z.string().optional(),
        pricingParagraphIntro:z.string().optional(),
        pricingMinHours:z.string().optional(),
    }),
});

const sectorsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        order: z.number().optional(),
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
        metaKeywords: z.string().optional(),
        title: z.string(),
        description: z.string().optional(),
        image: z.string().optional(),
        hourlyPrice:z.string().optional(),
        pricingParagraphIntro:z.string().optional(),
        pricingMinHours:z.string().optional(),
    }),
});

const testimonialsCollection = defineCollection({
    type: 'content',
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
    type: 'content',
    schema: z.object({
        order: z.number().optional(),
        icon: z.string().optional(),
        title: z.string(),
        paragraph01: z.string().optional(),
        paragraph02: z.string().optional(),
        paragraph03: z.string().optional(),
    }),
});

const faqCollection = defineCollection({
    type: 'content',
    schema: z.object({
        order: z.number().optional(),
        title: z.string(),
        answer: z.string(),
    }),
});

export const collections = {
    'services': serviceCollection,
    'sectors': sectorsCollection,
    'testimonials': testimonialsCollection,
    'benefits': benefitcsCollection,
    'blog': blogCollection,
    'faq': faqCollection,
};