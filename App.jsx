import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Rootnavigation from './navigation';
import { UserContext } from './UserContext';

const App = () => {
  return (
    <UserContext>
      <NavigationContainer>
        <Rootnavigation />
      </NavigationContainer>
    </UserContext>
      
  );
};

export default App;
