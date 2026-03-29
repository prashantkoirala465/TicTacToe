/// <reference types="react-scripts" />
// To solve the issue: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31245
/// <reference types="styled-components/cssprop" />

declare global {
    interface Window {
        ethereum?: any;
        wc?: any;
    }
}
