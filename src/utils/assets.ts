type Asset = string | { src: string };

export const getAssetUrl = (asset: Asset | undefined) => (typeof asset === "string" || !asset ? asset : asset.src);
