import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import type { RadioChangeEvent } from 'antd';
import { Radio, Space } from 'antd';
import CloseIcon from 'assets/close_icon.svg';
import { SecondaryButton } from 'components/Button';
import { CustomInput } from 'components/Input';
import { selectWcwData } from 'components/Navigation/slice/selectors';
import { _URL } from 'config/constant';
import { translations } from 'locales/translations';
import { GameList } from 'services/game';
import { CreateNewGame } from 'services/waxJsService';
import { delay } from 'utils/utils';

import { ModalLayout } from '../modal.styled';

type CreateNewGameProps = {
    isShow: boolean;
    onSubmit: () => void;
};

enum PlayType {
    BOT = 'BOT',
    PLAYER = 'PLAYER',
}

export const CreateNewGameModal = ({ isShow, onSubmit }: CreateNewGameProps) => {
    const { t } = useTranslation();

    const wcwData = useSelector(selectWcwData);

    const [player, setPlayer] = useState<PlayType>(PlayType.BOT);
    const [challenger, setChallenger] = useState<string>('');
    const [isDisableChallenger, setIsDisableChallenger] = useState<boolean>(true);

    const [isCreate, setIsCreate] = useState<boolean>(false);
    const [isValidToCreate, setIsValidToCreate] = useState<boolean>(true);

    const [infors, setInfors] = useState<string>('');
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        if (player === PlayType.BOT) {
            setIsDisableChallenger(true);
            setChallenger('');
        } else {
            setIsDisableChallenger(false);
        }
    }, [player]);

    useEffect(() => {
        resetForm();
    }, [isShow]);

    const resetForm = () => {
        setIsDisableChallenger(true);
        setChallenger('');
        setPlayer(PlayType.BOT);
        setIsValidToCreate(true);
        setIsCreate(false);
        setErrors([]);
        setInfors('');
    };

    const onChange = (e: RadioChangeEvent) => {
        setPlayer(e?.target.value);
    };

    const handleCreateNewGame = async () => {
        if (player !== PlayType.BOT && !challenger) {
            setErrors([t(translations['create new game']['require player'])]);
            setIsValidToCreate(false);
            return;
        }

        setErrors([]);
        setInfors('');
        setIsCreate(true);
        setIsValidToCreate(true);

        try {
            const host = wcwData?.account;
            const challengerUser = player === PlayType.BOT ? 'tictactoe' : challenger;

            const createNewGame = await CreateNewGame(host, challengerUser);
            if (createNewGame?.transaction_id) {
                //add somedelay for blockchain update
                await delay(2000);
                const gameLists = await GameList();
                if (gameLists?.length) {
                    const gameDetail: any = gameLists?.find(
                        (game: any) => game?.host === host && game?.challenger === challengerUser,
                    );
                    setInfors(gameDetail?.id);
                } else {
                    setErrors([t(translations['create new game']['game is creating'])]);
                }
            } else {
                setErrors([t(translations['create new game']['fail to create new game'])]);
            }
        } catch (error) {
            setErrors([t(translations['create new game']['fail to create new game'])]);
        }
        setIsCreate(false);
    };

    const renderInforMsg = () => {
        let layout: any[] = [];
        if (infors) {
            return (
                <div className="modal-div-8 infor">
                    {t(translations['create new game']['your game id'])}
                    <Link to={`${_URL.Game}/${infors}`}>{infors}</Link>
                </div>
            );
        }

        if (errors?.length) {
            for (const error of errors) {
                layout.push(<div>{error}</div>);
            }
            return <div className="modal-div-8 error">{layout}</div>;
        }

        return layout;
    };

    return (
        <>
            <ModalLayout
                open={isShow}
                onCancel={onSubmit}
                footer={null}
                closable={true}
                closeIcon={
                    <div>
                        <img src={CloseIcon} alt="Close" />
                    </div>
                }
            >
                <div className="modal-div-1">{t(translations['create new game']['new game'])}</div>
                <div className="modal-div-2">
                    <Radio.Group onChange={onChange} value={player}>
                        <Space direction="vertical">
                            <Radio value={PlayType.BOT}>
                                {t(translations['create new game']['play with bot'])}
                            </Radio>
                            <Radio value={PlayType.PLAYER}>
                                {t(translations['create new game']['play with player'])}
                            </Radio>
                        </Space>
                    </Radio.Group>
                    <div className="modal-div-5">
                        <div className="modal-div-6">
                            {t(translations['create new game'].challenger)}
                        </div>
                        <div className="modal-div-7">
                            <CustomInput
                                value={challenger}
                                onChange={e => setChallenger(e?.target.value)}
                                disabled={isDisableChallenger}
                                status={!isValidToCreate ? 'error' : ''}
                            />
                        </div>
                    </div>
                </div>
                {renderInforMsg()}
                <div className="modal-div-3">
                    <SecondaryButton
                        className="modal-div-4"
                        onClick={handleCreateNewGame}
                        loading={isCreate}
                    >
                        {t(translations['create new game']['create new game'])}
                    </SecondaryButton>
                </div>
            </ModalLayout>
        </>
    );
};
