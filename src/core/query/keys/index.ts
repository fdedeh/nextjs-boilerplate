import { mergeQueryKeys } from "@lukemorales/query-key-factory";
import { moviesKeys } from "./movies.keys";

/** Single merged registry of all feature query keys. */
export const queryKeys = mergeQueryKeys(moviesKeys);

export { moviesKeys };
