import { CustomButtonLayout, PrimaryButtonLayout, SecondaryButtonLayout } from './Button.style';

import { ButtonProps } from 'antd';

export const CustomButton = (props: ButtonProps): JSX.Element => {
    return (
        <CustomButtonLayout {...props}>
            <div className="corner" />
            <div className="top" />
            {props.children}
            <div className="bottom" />
        </CustomButtonLayout>
    );
};

export const PrimaryButton = (props: ButtonProps): JSX.Element => {
    return (
        <PrimaryButtonLayout {...props}>
            <div className="corner" />
            <div className="top" />
            {props.children}
            <div className="bottom" />
        </PrimaryButtonLayout>
    );
};

export const SecondaryButton = (props: ButtonProps): JSX.Element => {
    return (
        <SecondaryButtonLayout {...props}>
            <div className="corner" />
            <div className="top" />
            {props.children}
            <div className="bottom" />
        </SecondaryButtonLayout>
    );
};
