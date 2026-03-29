// Import necessary modules from the 'react' library.
import React, { lazy, Suspense } from 'react';

// Define an interface for the options expected by the lazyLoad function.
interface Opts {
    fallback: React.ReactNode;
}

// Define a utility type to extract the resolved type of a promise.
type Unpromisify<T> = T extends Promise<infer P> ? P : never;

// Define the lazyLoad function for dynamically loading React components.
export const lazyLoad = <T extends Promise<any>, U extends React.ComponentType<any>>(
    importFunc: () => T,
    selectorFunc?: (s: Unpromisify<T>) => U,
    opts: Opts = { fallback: null },
) => {
    // Initialize the lazy loading factory function.
    let lazyFactory: () => Promise<{ default: U }> = importFunc;

    // If a selector function is provided, modify the lazyFactory accordingly.
    if (selectorFunc) {
        lazyFactory = () => importFunc().then(module => ({ default: selectorFunc(module) }));
    }

    // Create a lazily loaded component using React's lazy function.
    const LazyComponent = lazy(lazyFactory);

    // Return a functional component that uses the Suspense component to handle loading.
    return (props: React.ComponentProps<U>): JSX.Element => (
        <Suspense fallback={opts.fallback!}>
            <LazyComponent {...props} />
        </Suspense>
    );
};
