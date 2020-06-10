import React from 'react';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Home from './Home';
import Dashboard from './Dashboard';


const AppStack = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            header: null,
        },
    },
    Dashboard: {
        screen: Dashboard,
        navigationOptions: {
            header: null,
        },
    }
});

const Routes = createAppContainer(
    createSwitchNavigator(
        {
            App: AppStack,
        },
        {
            initialRouteName: 'App',
        },
    ),
);

export default Routes;
