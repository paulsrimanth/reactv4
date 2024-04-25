import { useNavigate } from "react-router-dom";
import "./librarypage.css";
function Librarypage() {
  const navigate = useNavigate();
  return (
    <div className="body">
      <div className="navigation-bar">Welcome To Library</div>
      <div className="side-bar">
        <div className="buttons">
          <button className="button-side" onClick={() => navigate("/addusers")}>
            ADD ADMIN
          </button>

          <button className="button-side" onClick={() => navigate("/adduser")}>
            ADD USERS
          </button>

          <button className="button-side">ADD BOOKS</button>
          <button
            className="button-side"
            onClick={() => navigate("/showadmins")}
          >
            SHOW ADMINS
          </button>
          <button
            className="button-side"
            onClick={() => navigate("/uploadbook")}
          >
            AddBook
          </button>
        </div>
      </div>
    </div>
  );
}

export default Librarypage;
