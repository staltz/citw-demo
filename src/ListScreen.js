import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import RecipeListItem from './RecipeListItem';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },

  headerContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },

  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    flex: 1,
  },

  headerFavorites: {
    width: 24,
    height: 24,
    marginRight: 5,
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

class Header extends Component {
  goToFavorites = () => {
    this.props.navigation.navigate('Favorites');
  };

  render() {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Recipe Explorer</Text>
        <TouchableOpacity onPress={this.goToFavorites}>
          <Image
            source={require('./star-white.png')}
            style={styles.headerFavorites}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default class ListScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerStyle: {
        backgroundColor: '#fc3a57',
      },
      headerTitle: <Header navigation={navigation} />,
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    };
  };

  state = {results: [], lastPage: 0};

  componentDidMount() {
    this.requestMore();
  }

  async requestMore() {
    const page = this.state.lastPage + 1;
    const url = 'http://www.recipepuppy.com/api/?p=' + page;
    const response = await fetch(url);
    const data = await response.json();
    this.setState(prev => ({
      results: prev.results.concat(data.results),
      lastPage: page,
    }));
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
          onEndReached={() => this.requestMore()}
        />
      </View>
    );
  }
}
