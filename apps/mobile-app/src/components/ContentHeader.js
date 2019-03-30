import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Image, Button, Theme } from '../Core';

const { colors } = Theme;

export class ContentHeader extends Component {
  onActionHandler = () => {
    const { onAction } = this.props;

    if (onAction) {
      onAction();
    }
  };

  render() {
    let {
      imageUrl,
      action,
      onAction,
      title,
      description,
      children,
      background: backgroundColor,
      meta
    } = this.props;

    backgroundColor = backgroundColor || colors.primary;

    const renderAction = () => {
      if (!action) {
        return;
      }

      return (
        <Button onPress={onActionHandler} size="small">
          {action}
        </Button>
      );
    };

    const renderDescription = () => {
      if (!description) {
        return;
      }

      return (
        <Text color={colors.white} size="small">
          {description}
        </Text>
      );
    };

    const renderMeta = () => {
      if (!meta) {
        return;
      }

      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: 10
          }}
        >
          {meta.map(({ value, label }, index) => {
            return (
              <View
                key={index}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Text bold color={colors.white}>
                  {value}
                </Text>
                <Text size="small" color={colors.white}>
                  {label}
                </Text>
              </View>
            );
          })}
        </View>
      );
    };

    const renderChildren = () => {
      if (!children) {
        return;
      }

      return (
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          {children}
        </View>
      );
    };

    return (
      <View
        style={{
          backgroundColor,
          flex: 1,
          alignItems: 'center',
          paddingTop: 60,
          paddingBottom: 20
        }}
      >
        <View style={{ marginBottom: 10 }}>
          <Image
            style={{ borderWidth: 4, borderColor: colors.white }}
            rounded
            width={120}
            height={120}
            url={imageUrl}
          />
        </View>
        <View>
          <View style={{ marginBottom: 10 }}>
            <View style={{ marginBottom: 5, paddingHorizontal: 20 }}>
              <Text centered color={colors.white} bold size="xlarge">
                {title}
              </Text>
            </View>
            {renderDescription()}
            {renderChildren()}
          </View>
        </View>
        {renderMeta()}
      </View>
    );
  }
}

export const ContentHeaderSamples = () => {
  return (
    <ContentHeader
      imageUrl="https://myfoodbook.com.au/sites/default/files/styles/recipe_3_col/public/recipe_photo/Brev20155486_0.jpg?itok=1osMdS-X"
      action="Follow"
      title="#ChineseNewYear"
      description="Hoisin sauce, sriracha sauce"
    />
  );
};
