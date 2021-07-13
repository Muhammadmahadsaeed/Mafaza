import React from 'react';
import Navigator from './src/Navigation/SwitchNavigation';
import {Provider} from 'react-redux';
import {store, persistor} from './src/component/Redux/Store/configureStore';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
