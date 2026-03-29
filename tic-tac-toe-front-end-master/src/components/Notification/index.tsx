import { ReactNode } from 'react';

import notification from 'antd/es/notification';
import AlertIcon from 'assets/alert_notification.svg';
import CloseIcon from 'assets/close_notification.svg';
import ErrorIcon from 'assets/error_notification.svg';
import SuccessIcon from 'assets/success_notification.svg';
import WarningIcon from 'assets/warning_notification.svg';
import { NotificationType } from 'utils/types/Notification';

const DURATION = 3;

export const WcwNotification = async (
    notificationType: NotificationType,
    message: ReactNode,
    title: string = '',
) => {
    switch (notificationType) {
        case NotificationType.SUCCESS:
            return notification.success({
                message: title ?? 'SUCCESS',
                description: message,
                duration: DURATION,
                placement: 'top',
                closeIcon: <img src={CloseIcon} alt="CloseIcon" />,
                icon: <img src={SuccessIcon} alt="SuccessIcon" />,
            });
        case NotificationType.WARNING:
            return notification.success({
                message: title ?? 'WARNING',
                description: message,
                duration: DURATION,
                placement: 'top',
                closeIcon: <img src={CloseIcon} alt="CloseIcon" />,
                icon: <img src={WarningIcon} alt="SuccessIcon" />,
            });
        case NotificationType.ERROR:
            return notification.success({
                message: title ?? 'ERROR',
                description: message,
                duration: DURATION,
                placement: 'top',
                closeIcon: <img src={CloseIcon} alt="CloseIcon" />,
                icon: <img src={ErrorIcon} alt="ErrorIcon" />,
            });
        case NotificationType.ALERT:
            return notification.success({
                message: title ?? 'ALERT',
                description: message,
                duration: DURATION,
                placement: 'top',
                closeIcon: <img src={CloseIcon} alt="CloseIcon" />,
                icon: <img src={AlertIcon} alt="AlertIcon" />,
            });
        default:
            return notification.success({
                message: 'ERROR',
                description: message,
                duration: DURATION,
                placement: 'top',
                closeIcon: <img src={CloseIcon} alt="CloseIcon" />,
                icon: <img src={ErrorIcon} alt="ErrorIcon" />,
            });
    }
};

export const WcwNotificationSuccess = (message: ReactNode) => {
    return WcwNotification(NotificationType.SUCCESS, message);
};

export const WcwNotificationError = (message: ReactNode) => {
    return WcwNotification(NotificationType.ERROR, message);
};

export const WcwNotificationInfor = (message: ReactNode) => {
    return WcwNotification(NotificationType.ALERT, message);
};
