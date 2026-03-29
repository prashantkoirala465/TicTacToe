import State0 from 'assets/state_0.svg';
import { styled } from 'styled-components';
import { Colors, Padding, ScreenSizes } from 'theme/StyleConstants';

export const GameLayout = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 0 ${Padding.destop};
    position: relative;

    .game-container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 24;
    }

    .game-div-1 {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .game-img-1 {
        width: 400px;
    }

    .game-div-2 {
        position: relative;
        top: -100px;
        left: 40px;

        color: ${Colors.neutralWhite};

        text-align: center;
        text-shadow: 0px 1px 0px ${Colors.darkCharcoal};
        font-family: Titillium Web;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 32px; /* 133.333% */
    }

    .game-div-2.right {
        right: 50px;
        left: unset;
    }

    .game-div-3 {
        font-family: Titillium Web;
        font-size: 40px;
        font-style: normal;
        font-weight: 900;
        line-height: normal;
        letter-spacing: 2.4px;

        background: linear-gradient(
            0deg,
            #ffdfff 0%,
            #d643ec 14.29%,
            #3d015d 28.57%,
            #d00c85 42.86%,
            #ffdfff 57.14%,
            #cd77fb 71.43%,
            #a052fa 85.71%,
            #3425a2 100%
        );
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .game-board {
        width: 688px;
        height: 688px;
        position: relative;

        border-radius: 16px;
        background: rgba(58, 39, 140, 0.4);

        backdrop-filter: blur(12px);

        display: grid;
        padding: 32px;
        grid-gap: 12px;
        grid-template-columns: repeat(3, 1fr);
    }

    .game-board-loading {
        position: absolute;
        top: 50%;
        left: 50%;
    }

    .game-img {
        width: 200px;
        height: 200px;
        user-select: none;
        -webkit-user-drag: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;

        &:hover {
            cursor: pointer;
            transition: all ease 0.3s;
        }
    }

    .game-img.active {
        &:hover {
            cursor: pointer;
            background: url(${State0}) center no-repeat;
        }
    }

    @media (max-width: ${ScreenSizes.large}) {
        padding: 0 ${Padding.table};
    }

    @media (max-width: ${ScreenSizes.medium}) {
    }

    @media (max-width: ${ScreenSizes.small}) {
    }

    @media (max-width: ${ScreenSizes.mobile}) {
        padding: 0 ${Padding.mobile};
    }
`;
