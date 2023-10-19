import { defineCollection, z } from 'astro:content';

const sanitize = (array: string[]): string[] => {
    if (!array.length) {
        return array;
    }

    const lowercaseItems = array.map((str) => str.toLowerCase());
    return [...new Set(lowercaseItems)];
};

const post = defineCollection({
    type: 'content',
    schema: ({ image }) =>
        z.object({
            title: z.string().max(80),
            description: z.string().min(50).max(160),
            summary: z.string().min(200).max(1000).optional(),
            publishDate: z
                .string()
                .or(z.date())
                .transform((val) => new Date(val)),
            updatedDate: z
                .string()
                .optional()
                .transform((str) => (str ? new Date(str) : undefined)),
            coverImage: z
                .object({
                    src: image(),
                    alt: z.string(),
                })
                .optional(),
            draft: z.boolean().default(false),
            tags: z.array(z.string()).default([]).transform(sanitize),
            ogImage: z.string().optional(),
        }),
});

export const collections = { post };
