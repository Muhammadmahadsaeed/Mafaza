import React from 'react';
import Navigator from './src/Navigation/SwitchNavigation';
import { Provider } from 'react-redux';
import { store, persistor } from './src/component/Redux/Store/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import ApolloProvider from './ApolloProvider';

const App = () => {
  return (
    <ApolloProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigator />
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
};

export default App;
