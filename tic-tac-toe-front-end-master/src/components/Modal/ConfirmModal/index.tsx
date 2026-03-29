import { useTranslation } from 'react-i18next';

import CloseIcon from 'assets/close_icon.svg';
import { PrimaryButton, SecondaryButton } from 'components/Button';
import { translations } from 'locales/translations';

import { ModalLayout } from '../modal.styled';

type CreateNewGameProps = {
    isShow: boolean;
    title: string;
    onSubmit: () => void;
    onCancel: () => void;
};

export const ConfirmModal = ({ isShow, title, onSubmit, onCancel }: CreateNewGameProps) => {
    const { t } = useTranslation();

    return (
        <>
            <ModalLayout
                open={isShow}
                onCancel={onCancel}
                footer={null}
                closable={true}
                closeIcon={
                    <div>
                        <img src={CloseIcon} alt="Close" />
                    </div>
                }
            >
                <div className="modal-div-1">{title}</div>

                <div className="modal-div-3">
                    <SecondaryButton className="modal-div-4" onClick={onCancel}>
                        {t(translations.confirm.cancel)}
                    </SecondaryButton>
                    <PrimaryButton className="modal-div-4" onClick={onSubmit}>
                        {t(translations.confirm.confirm)}
                    </PrimaryButton>
                </div>
            </ModalLayout>
        </>
    );
};
