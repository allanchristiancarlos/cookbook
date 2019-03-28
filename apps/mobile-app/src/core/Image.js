import React from 'react';
import { Image as NativeImage } from 'react-native';
import PropTypes from 'prop-types';
import { Theme } from './Theme';

const { colors } = Theme;

export const Image = props => {
  let { size = 'thumbnail', url, width, height, rounded = false } = props;
  let styles = {
    width,
    height,
    backgroundColor: colors.lightGray
  };

  if (!width && !height && size) {
    switch (size) {
      default: {
        styles.width = 64;
        styles.height = 64;
        break;
      }
    }
  }

  return <NativeImage style={styles} source={{ uri: url }} />;
};

Image.propTypes = {
  size: PropTypes.oneOf(['thumbnail', 'large']),
  rounded: PropTypes.bool,
  url: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
};

export const ImageSamples = () => {
  return (
    <React.Fragment>
      <Image
        url={
          'https://myfoodbook.com.au/sites/default/files/styles/recipe_3_col/public/recipe_photo/Brev20155486_0.jpg?itok=1osMdS-X'
        }
      />
      <Image
        width={200}
        height={200}
        url={
          'https://myfoodbook.com.au/sites/default/files/styles/recipe_3_col/public/recipe_photo/Brev20155486_0.jpg?itok=1osMdS-X'
        }
      />
    </React.Fragment>
  );
};
