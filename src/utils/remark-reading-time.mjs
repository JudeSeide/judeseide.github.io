import getReadingTime from 'reading-time';
import {toString} from 'mdast-util-to-string';

export const remarkReadingTime = () =>
    (tree, {data}) => {
        const textOnPage = toString(tree);
        const readingTime = getReadingTime(textOnPage);
        data.astro.frontmatter.minutesRead = readingTime.text;
    };

