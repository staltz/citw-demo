import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  image: {
    height: 80,
    width: 100,
  },
  details: {
    flexDirection: 'column',
    alignItems: 'stretch',
    flex: 1,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 17,
    color: '#232323',
    textAlign: 'left',
    marginTop: 5,
    marginHorizontal: 10,
  },
  ingredientList: {
    color: '#d35467',
    marginTop: 5,
    marginHorizontal: 10,
  },
  ingredient: {
    padding: 5,
    borderRadius: 4,
  },
});

export default class RecipeListItem extends Component {
  getImageSource(thumbnail) {
    if (!thumbnail) {
      return require('./placeholder.png');
    } else {
      return {uri: thumbnail};
    }
  }

  goToDetails = () => {
    this.props.navigation.navigate('Recipe', this.props.data);
  };

  render() {
    const data = this.props.data;
    const imageSource = this.getImageSource(data.thumbnail);

    return (
      <TouchableOpacity onPress={this.goToDetails}>
        <View style={styles.container}>
          <Image source={imageSource} style={styles.image} />
          <View style={styles.details}>
            <Text style={styles.title} numberOfLines={1} ellipsizeMode={'tail'}>
              {data.title}
            </Text>
            <Text style={styles.ingredientList}>
              {data.ingredients
                .split(',') // convert the string to array
                .slice(0, 4) // keep only the first 4
                .map(str => str.trim()) // remove whitespaces
                .join(', ') // convert the array to string
              }
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
