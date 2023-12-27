import { Route, Routes } from 'react-router-dom';
import Main from './pages/main/Main';
import Owner from './pages/owner/Owner';

function App() {
  return (
    <Routes>
      <Route path="*" element={<div>404 page</div>}></Route>
      <Route path="/" element={<Main />}></Route>
      <Route path="/owner" element={<Owner />}></Route>
    </Routes>
  );
}

export default App;
