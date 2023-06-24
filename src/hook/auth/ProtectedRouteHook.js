import { useEffect, useState } from "react";

const ProtectedRouteHook = () => {
  const [userLogged, setUserLogged] = useState();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) setUserLogged(true);
    else setUserLogged(false);
  }, [user]);

  return [userLogged];
};

export default ProtectedRouteHook;
