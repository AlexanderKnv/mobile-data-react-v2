import {Route, Routes} from 'react-router-dom';
import {Loginpage} from './pages/Loginpage.jsx';
import {Homepage} from './pages/Homepage.jsx';
import {SvgPage} from './pages/SvgPage.jsx';
import {Notfoundpage} from './pages/Notfoundpage.jsx';

import {RequireAuth} from './hoc/RequireAuth.jsx';
import {AuthProvider} from './hoc/AuthProvider.jsx';

function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={
          <RequireAuth>
            <Homepage />
          </RequireAuth>
        } />
        <Route path="/mobileClient" element={<Loginpage />} />
        <Route path="/svgPage" element={<SvgPage />} />
        <Route path="*" element={<Notfoundpage />} />
      </Routes>
    </AuthProvider>
  );
}


export default App;
