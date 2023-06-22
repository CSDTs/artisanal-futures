import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const httpLink = createHttpLink({
	uri: "http://forum.artisanalfutures.org/graphql",
	credentials: "same-origin",
	// fetchOptions: {
	// 	mode: "no-cors",
	// },
});

// const authLink = setContext((_, { headers }) => {
// 	// get the authentication token from local storage if it exists
// 	const token =
// 		"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2ZvcnVtLmFydGlzYW5hbGZ1dHVyZXMub3JnIiwiaWF0IjoxNjg3Mzc3MTA5LCJuYmYiOjE2ODczNzcxMDksImV4cCI6MTY4Nzk4MTkwOSwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiNTcifX19.yEGmy6WziZW7Rh2hdH7hgnPUfIWtm64U0QbweRVVkYI";
// 	// return the headers to the context so httpLink can read them
// 	return {
// 		headers: {
// 			...headers,
// 			"Content-Type": "application/json",
// 			authorization: token ? `Bearer ${token}` : "",
// 		},
// 	};
// });

const client = new ApolloClient({
	// link: authLink.concat(httpLink),
	link: httpLink,
	cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<BrowserRouter basename={`${import.meta.env.BASE_URL}`}>
				<ChakraProvider>
					<App />
				</ChakraProvider>
			</BrowserRouter>
		</ApolloProvider>
	</React.StrictMode>
);
