import React from 'react';
import {TextConfigType, createTextSystem} from '../lib';

const exampleConfig: TextConfigType = {
  size: {
    h1: 21,
    h2: 19,
    h3: 16,
    p: 14,
  },
};

const {Text} = createTextSystem(exampleConfig);

export const CustomTextExample: React.FC<{}> = () => {
  return <Text size="h1" />;
};

export const CustomTextExample2: React.FC<{}> = () => {
  return (
    <>
      <Text>Default</Text>
      <Text color="primary">Primary color</Text>
      <Text size="h1" color="primary">
        h1 + primary color
      </Text>
      <Text size="h2" color="secondary" weight="bold">
        h2 + primary color + bold
      </Text>
    </>
  );
};

export {Text};

/**
 * type config;
 * const {Text, ....} = createDesignSystem(config);
 *
 * TEXT PROPS **
 * size = h1 | h2 | h3 | p | label | subtitle
 *
 * color = ...predefinedColors | *
 * color = ...predefinedColors
 *
 * font = <fontFamily>.<fontWeight>
 *
 */
