import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';

type Post = CollectionEntry<'post'>;

export const getAllPosts = async (): Promise<Post[]> =>
    await getCollection('post', ({ data }) => import.meta.env.PROD ? !data.draft : true);

export const sortMDByDate = (posts: Post[]): Post[] =>
    posts.sort((a, b) => {
        const aDate = new Date(a.data.updatedDate ?? a.data.publishDate).valueOf();
        const bDate = new Date(b.data.updatedDate ?? b.data.publishDate).valueOf();
        return bDate - aDate;
    });

export const getAllTags = (posts: Post[]): string[] => posts.flatMap((post) => [...post.data.tags]);

export const getUniqueTags = (posts: Post[]): string[] => [...new Set(getAllTags(posts))];

export const getUniqueTagsWithCount = (posts: Post[]): Array<[string, number]> =>
    [
        ...getAllTags(posts).reduce(
            (acc, t) => acc.set(t, (acc.get(t) || 0) + 1),
            new Map<string, number>(),
        ),
    ].sort((a, b) => b[1] - a[1]);
