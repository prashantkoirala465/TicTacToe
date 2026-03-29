import { GameItemLayout } from './GameItem.styled';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import CloseIcon from 'assets/close_icon.svg';
import { CustomButton, PrimaryButton } from 'components/Button';
import { ConfirmModal } from 'components/Modal/ConfirmModal';
import { selectWcwData } from 'components/Navigation/slice/selectors';
import { WcwNotificationError, WcwNotificationSuccess } from 'components/Notification';
import { _URL } from 'config/constant';
import { translations } from 'locales/translations';
import { CloseGame } from 'services/waxJsService';
import { iGameList } from 'utils/types/game';

type GameItemProps = {
    data: iGameList;
};

export const GameItem = ({ data }: GameItemProps) => {
    const { t } = useTranslation();
    const wcwData = useSelector(selectWcwData);

    const [isConfirmClose, setIsConfirmClose] = useState<boolean>(false);

    const renderActionButton = () => {
        if ([data.host, data.challenger].includes(wcwData?.account)) {
            return (
                <Link to={`${_URL.Game}/${data.id}`}>
                    <PrimaryButton>{t(translations.gameList['play now'])}</PrimaryButton>
                </Link>
            );
        } else {
            return (
                <Link to={`${_URL.Game}/${data.id}`}>
                    <CustomButton>{t(translations.gameList.view)}</CustomButton>
                </Link>
            );
        }
    };

    const handleCloseGame = async () => {
        try {
            setIsConfirmClose(false);
            const request = await CloseGame(wcwData?.account, data?.id);
            if (request?.transaction_id) {
                WcwNotificationSuccess(
                    t(translations.confirm['game closed successfully']) + data?.id,
                );
            } else {
                WcwNotificationError(t(translations.confirm['failed to close the game']));
            }
        } catch (error) {}
    };

    const renderCloseGame = () => {
        if ([data?.challenger, data?.host].includes(wcwData?.account)) {
            return (
                <img
                    src={CloseIcon}
                    alt="close icon"
                    className="game-item-img-1"
                    onClick={() => setIsConfirmClose(true)}
                />
            );
        }
        return null;
    };

    return (
        <GameItemLayout>
            <ConfirmModal
                isShow={isConfirmClose}
                title={t(translations.confirm['Are you sure to close game'])}
                onCancel={() => setIsConfirmClose(false)}
                onSubmit={handleCloseGame}
            />
            <div className="game-item-div-1">
                {renderCloseGame()}
                <div className="game-item-div-2">
                    {t(translations.gameList.id)}:{' '}
                    <span className="game-item-div-3">{data.id}</span>
                </div>
                <div className="game-item-div-2">
                    {t(translations.gameList.host)}:{' '}
                    <span className="game-item-div-3">{data.host}</span>
                </div>
                <div className="game-item-div-2">
                    {t(translations.gameList.challenger)}:{' '}
                    <span className="game-item-div-3">{data.challenger}</span>
                </div>
                <div className="game-item-div-2">
                    {t(translations.gameList.end)}:{' '}
                    <span className="game-item-div-3">{data.winner !== 'none' ? 'Yes' : 'No'}</span>
                </div>
                <div className="game-item-div-2">
                    {t(translations.gameList.turn)}:{' '}
                    <span className="game-item-div-3">{data.turn}</span>
                </div>
            </div>
            {renderActionButton()}
        </GameItemLayout>
    );
};
