import React from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider, useQuery} from "@apollo/client"
import DisplayUser from "./DisplayUser";

function App() {
    const client = new ApolloClient({
        cache: new InMemoryCache(),
        uri: "http://localhost:4000/graphql"
    })

    return (
        <ApolloProvider client={client}>
            <div className="App">
                <h1>List of user</h1>
                <DisplayUser/>
            </div>
        </ApolloProvider>
    );
}

export default App;
