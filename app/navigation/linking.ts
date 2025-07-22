import { LinkingOptions } from '@react-navigation/native';

export const linking: LinkingOptions<any> = {
  prefixes: ['groceryplus://', 'http://localhost:19006'],
  config: {
    initialRouteName: 'Auth',
    screens: {
      Auth: {
        path: 'auth',
        screens: {
          login: 'login',
          register: 'register'
        }
      },
      Main: {
        path: 'app',
        screens: {
          homescreen: {
            path: 'home',
            screens: {
              Dashboard: '',
              Categories: 'categories',
              Cart: 'cart',
              Settings: 'settings',
            }
          },
          Products: 'products',
          ProductDetails: 'product/:id',
          Cart: 'cart'
        }
      },
      Admin: {
        path: 'admin',
        screens: {
          AdminDashboard: ''
        }
      }
    }
  }
};
