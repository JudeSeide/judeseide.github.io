import { siteConfig } from '@/site-config';

const dateFormat = new Intl.DateTimeFormat(siteConfig.date.locale, siteConfig.date.options);

export const getFormattedDate = (
    date: string | number | Date,
    options?: Intl.DateTimeFormatOptions
): string => {
    if (typeof options !== 'undefined') {
        return new Date(date).toLocaleDateString(siteConfig.date.locale, {
            ...(siteConfig.date.options as Intl.DateTimeFormatOptions),
            ...options,
        });
    }

    return dateFormat.format(new Date(date));
};
