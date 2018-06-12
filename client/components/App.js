import React from 'react';
import Footer from './Footer';
import VisibleSelectorList from '../containers/VisibleSelectorList';
import AddSelector from '../containers/AddSelector';

const App = () => (
  <div>
    <AddSelector />
    <VisibleSelectorList />
    <Footer />
  </div>
);

export default App;