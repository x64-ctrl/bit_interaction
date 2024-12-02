// src/App.tsx
import { useState, useEffect, useCallback } from 'react';
import { MenuLoader } from './components/Menu/MenuLoader';
import './App.css';

function App() {
  return (
    <div className="app">
      <MenuLoader menuId="mainMenu" />
    </div>
  );
}

export default App;