import type { MarkdownHeading } from 'astro';

export interface TocItem extends MarkdownHeading {
    subheadings: Array<TocItem>;
}

const diveChildren = (item: TocItem, depth: number): Array<TocItem> => {
    if (depth === 1 || !item.subheadings.length) {
        return item.subheadings;
    }

    return diveChildren(item.subheadings[item.subheadings.length - 1] as TocItem, depth - 1);
};

export const generateToc = (headings: ReadonlyArray<MarkdownHeading>): TocItem[] => {
    // this ignores/filters out h1 element(s)
    const bodyHeadings = [...headings.filter(({ depth }) => depth > 1)];
    const toc: Array<TocItem> = [];

    bodyHeadings.forEach((h) => {
        const heading: TocItem = { ...h, subheadings: [] };

        // add h2 elements into the top level
        if (heading.depth === 2) {
            toc.push(heading);
        } else {
            const lastItemInToc = toc[toc.length - 1]!;
            if (heading.depth < lastItemInToc.depth) {
                throw new Error(`Orphan heading found: ${heading.text}.`);
            }

            // higher depth
            // push into children, or children's children
            const gap = heading.depth - lastItemInToc.depth;
            const target = diveChildren(lastItemInToc, gap);
            target.push(heading);
        }
    });

    return toc;
};
