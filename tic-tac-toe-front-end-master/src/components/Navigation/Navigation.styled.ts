import styled from 'styled-components';
import { StyleConstants } from 'theme/StyleConstants';

export const NavigationLayout = styled.div`
    width: 100%;
    min-height: ${StyleConstants.NAV_BAR_HEIGHT};

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 40px;

    .nav-div-1 {
        width: auto;
    }

    .nav-img-1 {
        width: 80px;
        height: 24px;
    }
`;
