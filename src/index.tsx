import React, {FC} from 'react';
import {Text, ColorValue, StyleProp, TextStyle} from 'react-native';

export type fontWeightType =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

export type fontSizeType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 's1'
  | 's2'
  | 'c1'
  | 'c2'
  | 'p'
  | 'label'
  | 'subtitle'
  | 'icon';

export type SizesConfig = Partial<Record<fontSizeType, number>>;

export type ColorConfig = {
  default: ColorValue;
  primary: ColorValue;
  secondary: ColorValue;
  [key: string]: ColorValue;
};

export type TextConfigType = {
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

const defaultSize: SizesConfig = {
  h1: 21,
  h2: 19,
  p: 16,
  subtitle: 14,
};

const defaultColors: ColorConfig = {
  default: '#121212',
  primary: '#101071',
  secondary: '#E0FA20',
};

const defaultFonts = {
  default: {
    fontFamily: '',
    fontWeight: ['*'],
  },
};

type ConfigColors = string;
// type ConfigColors = keyof typeof colors;
export interface TextProps<S> {
  size?: S;
  font?: string;
  weight?: fontWeightType;
  color?: ConfigColors | string;
  style?: StyleProp<TextStyle>;
}

export const createTextSystem = (config: TextConfigType) => {
  const sizes: SizesConfig = Object.assign({}, defaultSize, config.size);
  const fonts = Object.assign({}, defaultFonts, config.font);
  // const font: SizesConfig = Object.assign({}, defaultSize, config.size);
  // const sizes = Object.keys(config.size);
  const colors: ColorConfig = Object.assign(defaultColors, config.color);

  const CustomText: React.FC<TextProps<keyof typeof sizes>> = React.forwardRef(
    (props, ref: React.LegacyRef<Text>) => {
      const {
        size = 'p',
        weight = 'normal',
        font = 'default',
        color = 'default',
        style,
        ...restProps
      } = props;

      const fontTypes = font.split('.') || [];
      const fontFamilyKey = fontTypes[0] || null;
      const fontFamily = fontFamilyKey ? fonts[fontFamilyKey].fontFamily : '';

      const fontWeight = weight;
      const colorExists = Object.keys(colors).indexOf(color.toString()) > -1;
      const colorValue = colorExists ? colors[color] : color;

      return (
        <Text
          ref={ref}
          {...restProps}
          style={[
            {
              fontSize: sizes[size],
              fontWeight,
              color: colorValue,
            },
            fontFamily && fontFamily.length ? {fontFamily} : {},
            ...(Array.isArray(style) ? style : [style]),
          ]}
        />
      );
    },
  );

  return {
    Text: CustomText,
  };
};
