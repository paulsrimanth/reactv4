import AddUser from "./AddUser";
import Addusers from "./Addusers";
import "./App.css";
import Librarypage from "./Librarypage";
import LoginForm from "./LoginForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Showadmins from "./Showadmins";
import UploadBook from "./UploadBook";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginForm />} />
          <Route path="library" element={<Librarypage />} />
          <Route path="addusers" element={<Addusers />} />
          <Route path="adduser" element={<AddUser />} />
          <Route path="/showadmins" element={<Showadmins />} />
          <Route path="/uploadbook" element={<UploadBook />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
