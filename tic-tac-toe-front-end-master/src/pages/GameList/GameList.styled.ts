import { styled } from 'styled-components';
import { Colors, Padding, ScreenSizes } from 'theme/StyleConstants';

export const GameListLayout = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    padding: 0 ${Padding.destop};
    position: relative;
    gap: 40px;

    .game-list-div-1 {
        max-width: 640px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .game-list-div-2 {
        color: ${Colors.white};

        font-family: Titillium Web;
        font-size: 40px;
        font-style: normal;
        font-weight: 900;
        line-height: 120%; /* 48px */
    }

    .game-list-div-3 {
        height: 64px;

        span {
            font-size: 34px;
            font-weight: 900;
            line-height: 48px; /* 141.176% */
        }
    }

    .game-list-div-4 {
        width: 100%;
        max-width: 640px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 16px;
    }

    .game-list-div-5 {
        width: 100%;
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

        .game-list-div-2 {
            font-size: 30px;
        }

        .game-list-div-3 {
            height: 64px;

            span {
                font-size: 24px;
                font-weight: 900;
                line-height: 28px; /* 141.176% */
            }
        }
    }
`;
