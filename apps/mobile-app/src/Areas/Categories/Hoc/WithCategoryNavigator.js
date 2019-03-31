import React from 'react';

function WithCategoryNavigator(WrappedComponent) {
  return class extends React.Component {
    navigateToCategoryDetail = category => {
      this.props.navigation.push('CategoryDetail', {
        category
      });
    };

    render() {
      // Wraps the input component in a container, without mutating it. Good!
      return (
        <WrappedComponent
          navigateToCategoryDetail={this.navigateToCategoryDetail}
          {...this.props}
        />
      );
    }
  };
}

export default WithCategoryNavigator;
