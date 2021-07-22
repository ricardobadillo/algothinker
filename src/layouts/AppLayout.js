import Sidebar from "components/Sidebar/Sidebar";
import { useHistory } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "context/AuthContext";

function AppLayout({ children }) {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!user.loggedIn) {
      setRedirect(true);
    }
  }, []);

  if (redirect) {
    history.push("/");
  }

  return (
    <>
      <Sidebar />
      <div>{children}</div>
    </>
  );
}

export default AppLayout;
