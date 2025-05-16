import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<>hi</>} />
      <Route path="/hi" element={<>hii</>} />
      
    </Routes>
  );
};

export default App;
