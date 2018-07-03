import React, {Component} from 'react';
import {
  StyleSheet,
  AsyncStorage,
  Linking,
  Image,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    flex: 1,
  },

  image: {
    height: 180,
    alignSelf: 'stretch',
  },

  star: {
    width: 32,
    height: 32,
    position: 'absolute',
    right: 10,
    top: 180 - 32 - 10,
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },

  details: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },

  ingredients: {
    marginTop: 5,
    marginHorizontal: 10,
    color: '#232323',
    fontSize: 20,
  },
});

export default class RecipeScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('title', 'Recipe details'),
      headerStyle: {
        backgroundColor: '#fc3a57',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    };
  };

  state = {isFavorite: false};

  async componentDidMount() {
    const item = await AsyncStorage.getItem(this.getRecipeKey());
    if (item) {
      this.setState({isFavorite: true});
    }
  }

  getRecipeKey() {
    return this.props.navigation.getParam('href');
  }

  getImageSource(thumbnail) {
    if (!thumbnail) {
      return require('./placeholder.png');
    } else {
      return {uri: thumbnail};
    }
  }

  goToLink = () => {
    Linking.openURL(this.props.navigation.getParam('href'));
  };

  toggleFavorite = async () => {
    if (this.state.isFavorite) {
      await AsyncStorage.removeItem(this.getRecipeKey());
      this.setState({isFavorite: false});
    } else {
      await AsyncStorage.setItem(
        this.getRecipeKey(),
        JSON.stringify(this.props.navigation.state.params),
      );
      this.setState({isFavorite: true});
    }
  };

  render() {
    const ingredients = this.props.navigation.getParam('ingredients', '');
    const thumbnail = this.props.navigation.getParam('thumbnail', '');
    const imageSource = this.getImageSource(thumbnail);
    const isFavorite = this.state.isFavorite;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#e02f49" />
        <Image source={imageSource} style={styles.image} />
        {isFavorite ? (
          <Image source={require('./star.png')} style={styles.star} />
        ) : null}
        <View style={styles.details}>
          <Text style={styles.ingredients}>Ingredients: {ingredients}</Text>
        </View>
        <View style={styles.buttons}>
          <Button
            title={'Open recipe'}
            onPress={this.goToLink}
            color={'#fc3a57'}
          />
          <Button
            title={isFavorite ? 'Unfavorite' : 'Favorite'}
            onPress={this.toggleFavorite}
            color={'#fc3a57'}
          />
        </View>
      </View>
    );
  }
}
