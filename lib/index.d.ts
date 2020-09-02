import React from 'react';
import { ColorValue, StyleProp, TextStyle } from 'react-native';
export declare type fontWeightType = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
export declare type fontSizeType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 's1' | 's2' | 'c1' | 'c2' | 'p' | 'label' | 'subtitle' | 'icon';
export declare type SizesConfig = Partial<Record<fontSizeType, number>>;
export declare type ColorConfig = {
    default: ColorValue;
    primary: ColorValue;
    secondary: ColorValue;
    [key: string]: ColorValue;
};
export declare type TextConfigType = {
    size?: SizesConfig;
    color?: ColorConfig;
    font?: {
        [key: string]: {
            fontFamily?: string;
            fontWeight?: fontWeightType[];
        };
    };
    weight?: {
        [key: string]: fontWeightType[];
    };
};
declare type ConfigColors = string;
export interface TextProps<S> {
    size?: S;
    font?: string;
    weight?: fontWeightType;
    color?: ConfigColors | string;
    style?: StyleProp<TextStyle>;
}
export declare const createTextSystem: (config: TextConfigType) => {
    Text: React.FC<TextProps<fontSizeType>>;
};
export {};
