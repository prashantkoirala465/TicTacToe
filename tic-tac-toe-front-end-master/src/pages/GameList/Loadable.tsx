import { LoadingIndicator, LoadingWrapper } from 'components/LoadingIndicator';
import { lazyLoad } from 'utils/loadable';

export const GameListPage = lazyLoad(
    () => import('./index'),
    module => module.GameListPage,
    {
        fallback: (
            <LoadingWrapper>
                <LoadingIndicator />
            </LoadingWrapper>
        ),
    },
);
