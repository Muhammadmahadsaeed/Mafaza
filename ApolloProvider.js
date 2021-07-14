import React from 'react'
import {
  ApolloClient,
  ApolloProvider as Provider,
  createHttpLink,
} from '@apollo/client'
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { setContext } from 'apollo-link-context'
import {split} from 'apollo-link'
import {InMemoryCache} from 'apollo-cache-inmemory'
import { APOLLO_GRAPHQL, APOLLO_SOCKET } from './src/component/Config/env';


const httpLink = createHttpLink({
  uri: APOLLO_GRAPHQL,
  credentials: 'same-origin'
});
const wsLink = new WebSocketLink({
  uri: APOLLO_SOCKET,
  options: {
    reconnect: true,
    connectionParams: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0VtYWlsVmVyaWZpZWQiOnRydWUsImhhc2hQYXNzd29yZExpbmsiOm51bGwsImhvc3QiOm51bGwsInVwZGF0ZWRBdCI6IjIwMjEtMDYtMTZUMDU6NDU6MDUuNzcwWiIsImFjdGl2ZSI6dHJ1ZSwiX2lkIjoiNjBjOThmYjk0MTg1MDgzZjNjNjllZmU3IiwidXNlck5hbWUiOiJNYWhhZCIsImVtYWlsIjoibWFoYWRraGFuODA5QGdtYWlsLmNvbSIsInByb2ZpbGUiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAvcHJvZmlsZS9kZWZhdWx0LmpwZyIsInBhc3N3b3JkIjoiJDJiJDEwJHNaNEZtLlhqOWR5aGRURmdudUo5RmVWZGpsRHVEbmpQVHE2TWcvT0tzdUJtWXZwZnFIVS95IiwibG9naW5Db21wYW55IjoiNjBhYjg5YzU2YTllYTYxY2NjNzEyYjMxIiwicm9sZSI6IkVudGVycHJpc2UiLCJjcmVhdGVkQXQiOiIyMDIxLTA2LTE2VDA1OjQ0OjI1LjQ4MVoiLCJfX3YiOjAsImlhdCI6MTYyNDQ4MDMwNywiZXhwIjoxNjI2MjgwMzA3fQ.PLVclmMoFwbCqiw7q_Tgx811aDbIuNCRuh-hw5otzM0`,
    }
  }
});
const authLink = setContext(() => {
  return {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0VtYWlsVmVyaWZpZWQiOnRydWUsImhhc2hQYXNzd29yZExpbmsiOm51bGwsImhvc3QiOm51bGwsInVwZGF0ZWRBdCI6IjIwMjEtMDYtMTZUMDU6NDU6MDUuNzcwWiIsImFjdGl2ZSI6dHJ1ZSwiX2lkIjoiNjBjOThmYjk0MTg1MDgzZjNjNjllZmU3IiwidXNlck5hbWUiOiJNYWhhZCIsImVtYWlsIjoibWFoYWRraGFuODA5QGdtYWlsLmNvbSIsInByb2ZpbGUiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAvcHJvZmlsZS9kZWZhdWx0LmpwZyIsInBhc3N3b3JkIjoiJDJiJDEwJHNaNEZtLlhqOWR5aGRURmdudUo5RmVWZGpsRHVEbmpQVHE2TWcvT0tzdUJtWXZwZnFIVS95IiwibG9naW5Db21wYW55IjoiNjBhYjg5YzU2YTllYTYxY2NjNzEyYjMxIiwicm9sZSI6IkVudGVycHJpc2UiLCJjcmVhdGVkQXQiOiIyMDIxLTA2LTE2VDA1OjQ0OjI1LjQ4MVoiLCJfX3YiOjAsImlhdCI6MTYyNDQ4MDMwNywiZXhwIjoxNjI2MjgwMzA3fQ.PLVclmMoFwbCqiw7q_Tgx811aDbIuNCRuh-hw5otzM0`,
    },
  };
});


const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),

});


export default function ApolloProvider(props) {
  return <Provider client={client} {...props} />
}

