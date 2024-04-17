import { Route, Routes } from 'react-router-dom';

import Admin from './pages/admin/Admin';
import Main from './pages/main/Main';
import Menu from './pages/menu/Menu';
import OwnerMain from './pages/owner/OwnerMain';

function App() {
  return (
    <Routes>
      <Route path="*" element={<div>404 page</div>} />
      <Route path="/" element={<Main />} />
      <Route path="/owner/:id" element={<OwnerMain />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/menu/:id/:table" element={<Menu />} />
    </Routes>
  );
}

export default App;
