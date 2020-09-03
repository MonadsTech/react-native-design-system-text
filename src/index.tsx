import React, {FC} from 'react';
import {Text, ColorValue, StyleProp, TextStyle} from 'react-native';
import {fontSizeType, fontColorType, fontWeightType} from './types';

export type SizesConfig = Partial<Record<fontSizeType, number>>;
export type ColorConfig = Partial<Record<fontColorType, ColorValue>>;

export type FontConfig = {
  [key: string]: {
    fontFamily?: string;
    fontWeight?: fontWeightType[];
  };
};

export type TextConfigType = {
  size?: SizesConfig;
  color?: ColorConfig;
  font?: FontConfig;
};

const defaultSize: SizesConfig = {
  h1: 24,
  h2: 22,
  h3: 20,
  h4: 18,
  h5: 16,
  h6: 14,
  s1: 17,
  s2: 15,
  p: 16,
};

const defaultColors: ColorConfig = {
  default: '#121212',
  primary: '#1840ff',
  secondary: '#E0FA20',
  info: '#1890ff',
  success: '#52c41a',
  error: '#f5222d',
  warning: '#faad14',
  caption: '#484848',
};

// type ConfigColors = keyof typeof colors;
export interface TextProps<S, C> {
  size?: S;
  font?: string;
  weight?: fontWeightType;
  color?: C | ColorValue;
  style?: StyleProp<TextStyle>;
}

export const createTextSystem = (config: TextConfigType) => {
  const sizes: SizesConfig = Object.assign({}, defaultSize, config.size);
  const fonts = Object.assign({}, config.font);
  const colors: ColorConfig = Object.assign(defaultColors, config.color);
  const colorKeys: string[] = Object.keys(colors);

  const CustomText: React.FC<
    TextProps<keyof typeof sizes, keyof typeof colors>
  > = React.forwardRef((props, ref: React.LegacyRef<Text>) => {
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
    const fontFamily = fontFamilyKey ? (fonts[fontFamilyKey]?.fontFamily || '') : '';

    const fontWeight = weight;
    const colorKeyIndex = colorKeys.indexOf(color.toString());
    let colorValue: ColorValue;

    if (colorKeyIndex > -1) {
      const colorKey = colorKeys[colorKeyIndex] as fontColorType;
      colorValue = colors[colorKey] as ColorValue;
    } else {
      colorValue = color;
    }

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
  });

  return {
    Text: CustomText,
  };
};

export default {
  createTextSystem,
};
