import { LoadingIndicator, LoadingWrapper } from 'components/LoadingIndicator';
import { lazyLoad } from 'utils/loadable';

export const GamePage = lazyLoad(
    () => import('./index'),
    module => module.GamePage,
    {
        fallback: (
            <LoadingWrapper>
                <LoadingIndicator />
            </LoadingWrapper>
        ),
    },
);
