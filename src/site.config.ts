import type { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
    author: 'Jude Séïde',
    title: 'JS',
    description: 'Software engineer, developer, tech enthusiast and consultant located in Montreal, Canada.',
    keywords: 'jude,seide,judeseide,web,engineer,developer,software,dev,consultant,montreal,quebec,canada,ssense,lxrco,lxrandco',
    lang: 'en-CA',
    ogLocale: 'en_CA',
    date: {
        locale: 'en-CA',
        options: {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        },
    },
};

export const menuLinks: Array<{ title: string; path: string }> = [
    {
        title: 'home',
        path: '/',
    },
    {
        title: 'blog',
        path: '/posts/',
    },
    {
        title: 'about',
        path: '/about/',
    },
];
