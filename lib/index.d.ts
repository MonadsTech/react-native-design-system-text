import React from 'react';
import { ColorValue, StyleProp, TextStyle } from 'react-native';
import { fontSizeType, fontColorType, fontWeightType } from './types';
export declare type SizesConfig = Partial<Record<fontSizeType, number>>;
export declare type ColorConfig = Partial<Record<fontColorType, ColorValue>>;
export declare type FontConfig = {
    [key: string]: {
        fontFamily?: string;
        fontWeight?: fontWeightType[];
    };
};
export declare type TextConfigType = {
    size?: SizesConfig;
    color?: ColorConfig;
    font?: FontConfig;
};
export interface TextProps<S, C> {
    size?: S;
    font?: string;
    weight?: fontWeightType;
    color?: C | ColorValue;
    style?: StyleProp<TextStyle>;
}
export declare const createTextSystem: (config: TextConfigType) => {
    Text: React.FC<TextProps<fontSizeType, fontColorType>>;
};
declare const _default: {
    createTextSystem: (config: TextConfigType) => {
        Text: React.FC<TextProps<fontSizeType, fontColorType>>;
    };
};
export default _default;
