import { cache } from "react";

import { getProductById, getProducts, getProductSummaries } from "./product.service";

export const getCachedProducts = cache(getProducts);
export const getCachedProductById = cache(getProductById);
export const getCachedProductSummaries = cache(getProductSummaries);
