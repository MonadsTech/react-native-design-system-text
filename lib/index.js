import React from 'react';
import { Text } from 'react-native';
const defaultSize = {
    h1: 21,
    h2: 19,
    p: 16,
    subtitle: 14,
};
const defaultColors = {
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
export const createTextSystem = (config) => {
    const sizes = Object.assign({}, defaultSize, config.size);
    const fonts = Object.assign({}, defaultFonts, config.font);
    // const font: SizesConfig = Object.assign({}, defaultSize, config.size);
    // const sizes = Object.keys(config.size);
    const colors = Object.assign(defaultColors, config.color);
    const CustomText = React.forwardRef((props, ref) => {
        const { size = 'p', weight = 'normal', font = 'default', color = 'default', style, ...restProps } = props;
        const fontTypes = font.split('.') || [];
        const fontFamilyKey = fontTypes[0] || null;
        const fontFamily = fontFamilyKey ? fonts[fontFamilyKey].fontFamily : '';
        const fontWeight = weight;
        const colorExists = Object.keys(colors).indexOf(color.toString()) > -1;
        const colorValue = colorExists ? colors[color] : color;
        return (<Text ref={ref} {...restProps} style={[
            {
                fontSize: sizes[size],
                fontWeight,
                color: colorValue,
            },
            fontFamily && fontFamily.length ? { fontFamily } : {},
            ...(Array.isArray(style) ? style : [style]),
        ]}/>);
    });
    return {
        Text: CustomText,
    };
};
