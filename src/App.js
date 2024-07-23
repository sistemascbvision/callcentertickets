
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './pages/Login';
// import Dashboard from './components/Dashboard';
// import PrivateRoute from './components/PrivateRoute';
// import Home from './pages/Home';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route
//           path="/*"
//           element={
//             <PrivateRoute>
//               <Dashboard 
              
//               />
//             </PrivateRoute>
//           }
//         />
//         <Route path="*" element={<Navigate to="/login" replace />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
//cambio de ruta
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { CssBaseline } from '@mui/material';
// import { NotificationProvider } from './NotificacionContext';
// import GlobalNotification from './GlobalNotification';
// import Login from './pages/Login';
// import Dashboard from './components/Dashboard';
// import PrivateRoute from './components/PrivateRoute';
// import Home from './pages/Home';

// function App() {

//   return (
    
//       <NotificationProvider>
//         <Router>
//           <CssBaseline/>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route
//               path="/*"
//               element={
//                 <PrivateRoute>
//                   <Dashboard />
//                 </PrivateRoute>
//               }
//             />
//             <Route path="*" element={<Navigate to="/login" replace />} />
//           </Routes>
//           <GlobalNotification />
//         </Router>
//       </NotificationProvider>
   
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { NotificationProvider } from './NotificacionContext';
import Login from './pages/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';

function App() {
  return (
    <NotificationProvider>
      <Router>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </NotificationProvider>
  );
}

export default App;