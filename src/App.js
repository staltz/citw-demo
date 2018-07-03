import {createStackNavigator} from 'react-navigation';
import ListScreen from './ListScreen';
import RecipeScreen from './RecipeScreen';
import FavoritesScreen from './FavoritesScreen';

export default createStackNavigator(
  {
    List: ListScreen,
    Recipe: RecipeScreen,
    Favorites: FavoritesScreen,
  },
  {
    initialRouteName: 'List',
  },
);
