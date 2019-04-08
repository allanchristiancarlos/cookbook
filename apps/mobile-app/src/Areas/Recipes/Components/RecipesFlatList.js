import React from 'react';
import { FlatList, View } from 'react-native';
import { Text, Http } from '../../../Core';
import ActivityIndicator from '../../../Components/ActivityIndicator';
import normalizeRecipe from '../Functions/normalizeRecipe';

class RecipesFlatList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      allLoaded: false,
      loading: false,
      nextPageUrl: null,
      refreshing: false,
      paginating: false
    };
  }

  _loadFirstPageAsync() {
    const { perPage = 10, url } = this.props;
    const urlHasQueryParams = url.indexOf('?') !== -1;
    const finalUrl = urlHasQueryParams
      ? `${url}&_page=1&_limit=${perPage}`
      : `${url}?_page=1&_limit${perPage}`;

    return Http.get(finalUrl);
  }

  _handleRefresh = () => {
    this.setState(state => ({
      ...state,
      refreshing: true
    }));
    this._loadFirstPageAsync().then(({ data, links }) => {
      const { next } = links || {};
      this.setState(
        state => ({
          ...state,
          data: data.map(t => normalizeRecipe(t)),
          nextDataUrl: next,
          allLoaded: !next,
          refreshing: false
        }),
        () => {
          setTimeout(() => {
            this.flatList.scrollToOffset({
              offset: 0
            });
          });
        }
      );
    });
  };

  _emptyView = () => {
    const { data, loading } = this.state;
    const hasData = data.length > 0;

    if (hasData) {
      return null;
    }

    if (!hasData && loading) {
      return (
        <View
          style={{
            height: '100%',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text muted>Loading...</Text>
        </View>
      );
    }

    return (
      <View
        style={{
          height: '100%',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text muted>No Recipes</Text>
      </View>
    );
  };

  _keyExtractor = (item, index) => index.toString();

  _recipesEndReached = () => {
    const { allLoaded, nextDataUrl } = this.state;

    if (allLoaded) {
      return;
    }

    this.setState(state => ({
      ...state,
      paginating: true
    }));

    Http.get(nextDataUrl, { withUrl: false }).then(({ data, links }) => {
      const { next } = links || {};
      this.setState(
        state => ({
          ...state,
          data: [...state.data, ...data.map(t => normalizeRecipe(t))],
          nextDataUrl: next,
          allLoaded: !next
        }),
        () => {
          setTimeout(() => {
            this.setState(state => ({
              ...state,
              paginating: false
            }));
          });
        }
      );
    });
  };

  add(item) {
    this.setState(state => ({
      ...state,
      data: [item, ...state.data]
    }));
  }

  delete(index) {
    this.setState(state => {
      const { data } = state;
      const newData = [...data];
      newData.splice(index, 1);
      return {
        ...state,
        data: newData
      };
    });
  }

  update(item, index) {
    this.setState(state => {
      const { data } = state;
      const updatedData = [...data];
      updatedData.splice(index, 1, item);
      return {
        ...state,
        data: updatedData
      };
    });
  }

  refresh() {
    this._handleRefresh();
  }

  clear() {
    this.setState(() => ({
      data: [],
      allLoaded: false,
      loading: false,
      nextPageUrl: null,
      refreshing: false
    }));
  }

  componentDidMount() {
    this.setState(state => ({
      ...state,
      loading: true
    }));
    this._loadFirstPageAsync().then(({ data, links }) => {
      const { onLoadInitial } = this.props;
      const { next } = links || {};
      this.setState(state => ({
        ...state,
        data: data.map(t => normalizeRecipe(t)),
        nextDataUrl: next,
        allLoaded: !next,
        loading: false
      }));
      if (onLoadInitial) {
        onLoadInitial();
      }
    });
  }

  _renderFooter() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: 64
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  render() {
    const { renderItem } = this.props;
    const { data, refreshing, paginating } = this.state;
    return (
      <FlatList
        ref={ref => (this.flatList = ref)}
        contentContainerStyle={{ flexGrow: 1 }}
        data={data}
        keyExtractor={this._keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={this._emptyView}
        onEndReached={this._recipesEndReached}
        initialNumToRender={5}
        maxToRenderPerBatch={4}
        onEndReachedThreshold={2}
        onRefresh={this._handleRefresh}
        ListFooterComponent={paginating ? this._renderFooter : null}
        refreshing={refreshing}
        removeClippedSubviews={true}
      />
    );
  }
}

export default RecipesFlatList;
