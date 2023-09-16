import mdx from '@astrojs/mdx';
import prefetch from '@astrojs/prefetch';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import fs from 'fs';
import remarkUnwrapImages from 'remark-unwrap-images';
// @ts-ignore:next-line
import { remarkReadingTime } from './src/utils/remark-reading-time.mjs';

// https://astro.build/config
export default defineConfig({
    site: 'https://jude.engineering/',
    markdown: {
        remarkPlugins: [remarkUnwrapImages, remarkReadingTime],
        remarkRehype: { footnoteLabelProperties: { className: [''] } },
        shikiConfig: {
            theme: 'dracula',
            wrap: true,
        },
    },
    integrations: [
        mdx({}),
        tailwind({
            applyBaseStyles: false,
        }),
        sitemap(),
        prefetch(),
    ],
    vite: {
        plugins: [rawFonts(['.ttf'])],
        optimizeDeps: {
            exclude: ['@resvg/resvg-js'],
        },
    },
});

function rawFonts(ext: Array<string>) {
    return {
        name: 'vite-plugin-raw-fonts',
        // @ts-ignore:next-line
        transform(_, id) {
            if (ext.some((e) => id.endsWith(e))) {
                const buffer = fs.readFileSync(id);
                return {
                    code: `export default ${JSON.stringify(buffer)}`,
                    map: null,
                };
            }
        },
    };
}
