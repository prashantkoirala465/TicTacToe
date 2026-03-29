import { Colors, ScreenSizes } from './StyleConstants';

import { createGlobalStyle } from 'styled-components';

/* istanbul ignore next */
export const GlobalStyle = createGlobalStyle`
html,
body {
  height: 100%;
  width: 100%;
}

body {
    font-family: 'Titillium Web';
    color: ${Colors.white};
}

input:-webkit-autofill,
input:-webkit-autofill:focus {
    transition: background-color 600000s 0s, color 600000s 0s;
}
input[data-autocompleted] {
    background-color: transparent !important;
}

/* The animation code */
@keyframes skeleton-loading-effect {
    0% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0 50%;
    }
}
/* add skeleton-loading for skeleton loading animation*/
&.skeleton-loading{
  color: 'transparent';
  background: linear-gradient(90deg, rgba(190, 190, 190, 0.06) 25%, rgba(0, 0, 0, 0.15) 37%, rgba(190, 190, 190, 0.06) 63%);
  background-size: 400% 100%;
  animation-name: skeleton-loading-effect;
  animation-duration: 1.4s;
  animation-timing-function: ease;
  animation-iteration-count: infinite;
  border-radius: 3px;
}

&.skeleton-loading * {
  visibility: hidden;
}

&::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 2px;
}

&::-webkit-scrollbar {
  background-color: rgb(247, 142, 30, 0.8);
  width: 7px;
  height: 7px;
}

&::-webkit-scrollbar-thumb {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f7221e;
}

@media (max-width: ${ScreenSizes.small}) {
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 2px;
  }

  &::-webkit-scrollbar {
    background-color: rgb(247, 142, 30, 0.8);
    width: 3px;
    height: 3px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f7221e;
  }
}
`;
