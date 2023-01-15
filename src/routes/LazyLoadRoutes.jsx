import { lazy, Suspense } from "react";

/**
 * Lazily load the mentioned component which resides in page directory
 * This method will be used in routes so that the files are loaded only
 * when users are on that route
 */
export function lazyLoadRoutes(componentName) {
  const LazyElement = lazy(() => import(`../pages/${componentName}.tsx`));

  // Wrapping around suspense component is mandatory
  return (
    <Suspense fallback="Loading...">
      <LazyElement />
    </Suspense>
  );
}
