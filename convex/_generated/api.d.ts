/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as auth from "../auth.js";
import type * as bookings from "../bookings.js";
import type * as http from "../http.js";
import type * as movies from "../movies.js";
import type * as router from "../router.js";
import type * as seed from "../seed.js";
import type * as showtimes from "../showtimes.js";
import type * as theaters from "../theaters.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  bookings: typeof bookings;
  http: typeof http;
  movies: typeof movies;
  router: typeof router;
  seed: typeof seed;
  showtimes: typeof showtimes;
  theaters: typeof theaters;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
