import React, {Component} from 'react';
import {
  StyleSheet,
  AsyncStorage,
  FlatList,
  View,
  StatusBar,
} from 'react-native';
import RecipeListItem from './RecipeListItem';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },

  separator: {
    height: 10,
  },
});

class Separator extends Component {
  render() {
    return <View style={styles.separator} />;
  }
}

export default class FavoritesScreen extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#fc3a57',
    },
    title: 'Favorites',
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'normal',
    },
  };

  state = {results: []};

  componentDidMount() {
    this.focusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => this.fetchFromAsyncStorage(),
    );
  }

  componentWillUnmount() {
    this.focusSubscription.remove();
  }

  async fetchFromAsyncStorage() {
    const allKeys = await AsyncStorage.getAllKeys();
    const allRawFavorites = await AsyncStorage.multiGet(allKeys);
    const allFavorites = allRawFavorites.map(keyvalue => {
      const [key, value] = keyvalue;
      return JSON.parse(value);
    });
    this.setState({results: allFavorites});
  }

  render() {
    return (
      <View>
        <StatusBar barStyle="light-content" backgroundColor="#e02f49" />
        <FlatList
          style={styles.container}
          data={this.state.results}
          keyExtractor={item => item.href}
          ItemSeparatorComponent={Separator}
          renderItem={({item}) => (
            <RecipeListItem data={item} navigation={this.props.navigation} />
          )}
        />
      </View>
    );
  }
}
