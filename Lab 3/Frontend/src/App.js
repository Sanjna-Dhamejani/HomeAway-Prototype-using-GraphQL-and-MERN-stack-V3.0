import React, { Component } from 'react';
import Main from './components/Main';
import {BrowserRouter} from 'react-router-dom';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>

       <BrowserRouter>
       <div>
         {/* App Component Has a Child Component called Main*/}
         <Main/>
      </div>
      </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
