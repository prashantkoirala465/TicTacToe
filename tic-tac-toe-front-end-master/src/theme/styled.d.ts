import { Theme } from './themes';

import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme extends Theme {}
}
