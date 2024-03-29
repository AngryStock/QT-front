import { Route, Routes } from 'react-router-dom';

import Admin from './pages/admin/Admin';
import Main from './pages/main/Main';
import Menu from './pages/menu/Menu';
import Option from './pages/option/Option';
import Owner from './pages/owner/Owner';

function App() {
  return (
    <Routes>
      <Route path="*" element={<div>404 page</div>} />
      <Route path="/" element={<Main />} />
      <Route path="/owner" element={<Owner />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/option/:id" element={<Option />} />
    </Routes>
  );
}

export default App;
