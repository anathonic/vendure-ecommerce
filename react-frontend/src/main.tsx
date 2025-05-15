import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/tailwind.css'
import { ApolloProvider } from '@apollo/client';
import apolloClient from './graphql/apolloClient.ts'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <ApolloProvider client={apolloClient}>
      <App />
  </ApolloProvider>
  </StrictMode>,
)