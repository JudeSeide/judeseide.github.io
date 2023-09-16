/** @type {import('@types/prettier').Options} */
module.exports = {
    printWidth: 120,
    semi: true,
    singleQuote: true,
    tabWidth: 4,
    useTabs: true,
    plugins: [
        'prettier-plugin-astro',
        'prettier-plugin-tailwindcss', /* Must come last */
    ],
    overrides: [
        {
            files: '*.astro', options: {
                parser: 'astro',
            },
        },
    ],
};
