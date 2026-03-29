import { Modal } from 'antd';
import BackgroundImg from 'assets/Card.png';
import { styled } from 'styled-components';
import { Colors } from 'theme/StyleConstants';

export const ModalLayout = styled(Modal)`
    width: 550px !important;
    height: 500px;

    .ant-modal-content {
        background: url(${BackgroundImg}) center no-repeat;
    }

    .modal-div-1 {
        color: ${Colors.accentBlue};
        text-align: center;
        font-family: Titillium Web;
        font-size: 24px;
        font-style: normal;
        font-weight: 600;
        line-height: 36px; /* 150% */
        margin-bottom: 10px;
    }

    .modal-div-2 {
        width: 100%;
        margin-top: 40px;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 16px;
        span {
            color: ${Colors.black};

            font-family: Titillium Web;
            font-size: 24px;
            font-style: normal;
            font-weight: 400;
            line-height: 24px; /* 100% */
        }
    }

    .modal-div-3 {
        margin-top: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 16px;
    }

    .modal-div-4 {
        width: auto;
    }

    .modal-div-5 {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 16px;
    }

    .modal-div-6 {
        color: ${Colors.black};

        font-family: Titillium Web;
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px; /* 100% */
    }

    .modal-div-7 {
        flex: 1;
    }

    .modal-div-8 {
        display: flex;
        flex-direction: column;

        color: ${Colors.black};

        font-family: Titillium Web;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px; /* 100% */
    }

    .modal-div-8.error {
        color: ${Colors.red};
    }

    .modal-div-8.infor {
        flex-direction: row;
        gap: 16px;
    }
`;
