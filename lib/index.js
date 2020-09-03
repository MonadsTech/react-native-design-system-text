import React from 'react';
import { Text } from 'react-native';
const defaultSize = {
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
const defaultColors = {
    default: '#121212',
    primary: '#1840ff',
    secondary: '#E0FA20',
    info: '#1890ff',
    success: '#52c41a',
    error: '#f5222d',
    warning: '#faad14',
    caption: '#484848',
};
export const createTextSystem = (config) => {
    const sizes = Object.assign({}, defaultSize, config.size);
    const fonts = Object.assign({}, config.font);
    const colors = Object.assign(defaultColors, config.color);
    const colorKeys = Object.keys(colors);
    const CustomText = React.forwardRef((props, ref) => {
        const { size = 'p', weight = 'normal', font = 'default', color = 'default', style, ...restProps } = props;
        const fontTypes = font.split('.') || [];
        const fontFamilyKey = fontTypes[0] || null;
        const fontFamily = fontFamilyKey ? (fonts[fontFamilyKey]?.fontFamily || '') : '';
        const fontWeight = weight;
        const colorKeyIndex = colorKeys.indexOf(color.toString());
        let colorValue;
        if (colorKeyIndex > -1) {
            const colorKey = colorKeys[colorKeyIndex];
            colorValue = colors[colorKey];
        }
        else {
            colorValue = color;
        }
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
export default {
    createTextSystem,
};
