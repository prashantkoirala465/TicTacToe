import BackgroundImg from 'assets/Card.png';
import styled from 'styled-components';
import { Colors } from 'theme/StyleConstants';

export const GameItemLayout = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 24px;
    border-radius: 24px;
    background: url(${BackgroundImg}) center no-repeat;

    position: relative;

    .game-item-div-1 {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 16px;
    }

    .game-item-img-1 {
        position: absolute;
        top: 16px;
        right: 16px;

        &:hover {
            cursor: pointer;
        }
    }

    .game-item-div-2 {
        color: ${Colors.accentBlue};
        font-family: Titillium Web;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 24px; /* 100% */
    }

    .game-item-div-3 {
        color: ${Colors.neutralWhite};
        text-shadow: 0px 1px 0px ${Colors.darkCharcoal};
        font-family: Titillium Web;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 24px; /* 100% */
    }
`;
