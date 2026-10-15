export const decodeRouteParam = (param?: string) => {
    if (param === undefined) {
        return undefined;
    }

    try {
        return decodeURIComponent(param);
    } catch {
        return param;
    }
};
