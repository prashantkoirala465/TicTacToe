import { LoadingIndicator, LoadingWrapper } from 'components/LoadingIndicator';
import { lazyLoad } from 'utils/loadable';

export const PageNotFound = lazyLoad(
    () => import('./index'),
    module => module.PageNotFound,
    {
        fallback: (
            <LoadingWrapper>
                <LoadingIndicator />
            </LoadingWrapper>
        ),
    },
);
