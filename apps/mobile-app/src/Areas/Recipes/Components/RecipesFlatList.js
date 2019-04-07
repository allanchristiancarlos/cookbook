import React from 'react';
import { FlatList, View } from 'react-native';
import { Text, Http } from '../../../Core';
import normalizeRecipe from '../Functions/normalizeRecipe';

class RecipesFlatList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      allLoaded: false,
      loading: false,
      nextPageUrl: null,
      refreshing: false
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
      this.setState(state => ({
        ...state,
        data: data.map(t => normalizeRecipe(t)),
        nextDataUrl: next,
        allLoaded: !next,
        refreshing: false
      }));
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

  _recipesEndReached = t => {
    const { allLoaded, nextDataUrl } = this.state;

    if (allLoaded) {
      return;
    }

    Http.get(nextDataUrl, { withUrl: false }).then(({ data, links }) => {
      const { next } = links || {};
      this.setState(state => ({
        ...state,
        data: [...state.data, ...data.map(t => normalizeRecipe(t))],
        nextDataUrl: next,
        allLoaded: !next
      }));
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
      const { next } = links || {};
      this.setState(state => ({
        ...state,
        data: data.map(t => normalizeRecipe(t)),
        nextDataUrl: next,
        allLoaded: !next,
        loading: false
      }));
    });
  }

  render() {
    const { renderItem } = this.props;
    const { data, refreshing } = this.state;

    return (
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={data}
        keyExtractor={this._keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={this._emptyView}
        onEndReached={this._recipesEndReached}
        initialNumToRender={8}
        maxToRenderPerBatch={4}
        onEndReachedThreshold={1.5}
        onRefresh={this._handleRefresh}
        refreshing={refreshing}
      />
    );
  }
}

export default RecipesFlatList;
