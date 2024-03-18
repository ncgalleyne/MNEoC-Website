import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
//   Link
} from 'react-router-dom';

import Home from './components/Home';
import AddEvent from './components/AddEvent'; // Assume you have an AddEvent component

function App() {
  return (
    <Router>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/add-event">Add Event</Link>
            </li>
          </ul>
        </nav> */}

        {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/add-event" element={<AddEvent />} />
          <Route path="/" element={<Home />} />
        </Routes>
    </Router>
  );
}

export default App;
