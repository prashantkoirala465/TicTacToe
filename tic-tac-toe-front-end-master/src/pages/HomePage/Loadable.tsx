import { LoadingIndicator, LoadingWrapper } from 'components/LoadingIndicator';
import { lazyLoad } from 'utils/loadable';

export const HomePage = lazyLoad(
    () => import('./index'),
    module => module.HomePage,
    {
        fallback: (
            <LoadingWrapper>
                <LoadingIndicator />
            </LoadingWrapper>
        ),
    },
);
