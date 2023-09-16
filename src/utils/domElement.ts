export const toggleClass = (element: HTMLElement, className: string): void => {
    element.classList.toggle(className);
};

export const elementHasClass = (element: HTMLElement, className: string): boolean => {
    return element.classList.contains(className);
};
