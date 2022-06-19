import React from 'react';
import { PositionProvider } from './context/PositionContext';

import Search from './components/Search';
import Weather from './components/Weather';

function App() {
  return (
    <PositionProvider>
      <main className="container mx-auto px-3 pb-12">
        <Search />
        <Weather />
      </main>
    </PositionProvider>
  );
}

export default App;
