import { styled } from 'styled-components';
import { Padding, ScreenSizes, StyleConstants } from 'theme/StyleConstants';

export const HomePageLayout = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 0 ${Padding.destop};
    position: relative;

    &.gamelist {
        justify-content: flex-start;
    }

    .homepage-container {
        width: 100%;
        height: 100%;
        max-width: ${StyleConstants.MAX_WIDTH};
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 24;
    }

    .homepage-div-1 {
        max-width: 678px;
    }

    .homepage-img-1 {
        width: 662px;
        height: 159px;
    }

    .home-div-2 {
        height: 70px;

        span {
            font-size: 30px;
        }
    }

    .homepage-gamelist {
        width: 100%;
        height: 100%;
        max-width: 640px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
    }

    .homepage-gamelist-div-1 {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .homepage-gamelist-div-2 {
        color: #fff;
        font-family: Titillium Web;
        font-size: 40px;
        font-style: normal;
        font-weight: 900;
        line-height: 120%; /* 48px */
    }

    .homepage-gamelist-div-3 {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 40px;
    }

    @media (max-width: ${ScreenSizes.large}) {
        padding: 0 ${Padding.table};
    }

    @media (max-width: ${ScreenSizes.medium}) {
    }

    @media (max-width: ${ScreenSizes.small}) {
        .homepage-img-1 {
            width: 100%;
            height: auto;
        }
    }

    @media (max-width: ${ScreenSizes.mobile}) {
        padding: 0 ${Padding.mobile};
    }
`;
