import { Route, Routes } from 'react-router-dom';
import Sales from './pages/owner/Sales';
import Main from './pages/main/Main';

function App() {
  return (
    <Routes>
      <Route path="*" element={<div>404 page</div>}></Route>
      <Route path="/" element={<Main />}></Route>
      <Route path="/sales" element={<Sales />}></Route>
      <Route></Route>
    </Routes>
  );
}

export default App;
