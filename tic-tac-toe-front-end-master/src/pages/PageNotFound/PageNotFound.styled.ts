import { styled } from 'styled-components';
import { ScreenSizes } from 'theme/StyleConstants';

export const PageNotFoundLayout = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .page-not-found-div-1 {
        position: relative;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
    }

    .page-not-found-img-1 {
        width: 827px;
        height: 146px;
    }

    .page-not-found-div-2 {
        z-index: -1;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: Titillium Web;
        font-size: 400px;
        font-style: normal;
        font-weight: 900;
        line-height: normal;
        letter-spacing: 24px;

        opacity: 0.4;
        background: linear-gradient(
            0deg,
            #3d015d 0%,
            #8b5a9e 20%,
            #3d015d 40%,
            #8b5a9e 60%,
            #3d015d 80%,
            #8b5a9e 100%
        );
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .page-not-found-div-3 {
        margin-top: 40px;
    }

    .page-not-found-div-4 {
        min-height: 80px;

        span {
            font-size: 34px;
            font-style: normal;
            font-weight: 900;
            line-height: 48px;
            text-transform: uppercase;
        }
    }

    @media (max-width: ${ScreenSizes.medium}) {
        .page-not-found-img-1 {
            width: 90%;
            height: auto;
        }

        .page-not-found-div-2 {
            font-size: 300px;
        }

        .page-not-found-div-4 {
            min-height: unset;
        }
    }

    @media (max-width: ${ScreenSizes.small}) {
        .page-not-found-div-2 {
            font-size: 150px;
        }

        .page-not-found-div-4 {
            min-height: unset;
        }
    }
`;
