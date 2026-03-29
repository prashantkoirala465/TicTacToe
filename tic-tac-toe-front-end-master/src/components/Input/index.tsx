import { CustomButtonLayout } from './Input.styled';

import { InputProps } from 'antd';

export const CustomInput = (props: InputProps): JSX.Element => {
    return <CustomButtonLayout {...props}>{props.children}</CustomButtonLayout>;
};
