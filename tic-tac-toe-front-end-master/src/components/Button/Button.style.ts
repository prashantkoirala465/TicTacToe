import { Button } from 'antd';
import styled from 'styled-components';
import { Colors } from 'theme/StyleConstants';

const baseButtonStyles = `
    font-family: 'Titillium Web', 'Helvetica Neue', Arial, Helvetica, sans-serif;
    width: 100%;
    height: 100%;
    min-height: 40px;
    position: relative;
    border-color: ${Colors.black};
    border-width: 1.5px;
    filter: drop-shadow(0px 1.394px 0px #000) drop-shadow(0px 4.881px 1.394px rgba(0, 0, 0, 0.25));
    overflow: hidden;
    transform: skewX(-6deg);

    span {
        color: ${Colors.neutralWhite};
        text-align: center;
        text-shadow: 0px 2.789px 0px ${Colors.darkCharcoal};
        font-family: Titillium Web;
        font-size: 16px;
        font-style: normal;
        font-weight: 900;
        line-height: 24px;
    }

    .corner {
        position: absolute;
        top: -6px;
        right: 0;
        width: 6px;
        height: 18px;
        transform: rotate(-43.361deg);
        flex-shrink: 0;
        background: ${Colors.white};
    }

    .top, .bottom {
        content: '';
        left: 0;
        position: absolute;
        width: 100%;
        height: 12%;
        opacity: 0.7;
        z-index: -1;
    }

    .top {
        bottom: 0;
        background: ${Colors.black};
        mix-blend-mode: overlay;
    }

    .bottom {
        top: 0;
        background: ${Colors.white};
        mix-blend-mode: overlay;
    }
`;

export const CustomButtonLayout = styled(Button)`
    ${baseButtonStyles}
    background: ${Colors.orange};
`;

export const PrimaryButtonLayout = styled(Button)`
    ${baseButtonStyles}
    background: ${Colors.deepSkyBlue};
`;

export const SecondaryButtonLayout = styled(Button)`
    ${baseButtonStyles}
    background: ${Colors.white};

    span {
        text-shadow: 0px 2.789px 0px ${Colors.darkCharcoal}, 1px 0px 0px ${Colors.darkCharcoal},
            0px -1px 0px ${Colors.darkCharcoal}, -1px 0px 0px ${Colors.darkCharcoal};
    }

    .corner {
        background: ${Colors.paleOliveGreen};
    }
`;
