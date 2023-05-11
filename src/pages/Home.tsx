import { useNavigate } from "react-router";
import { whyClosure } from "./whyClosure";

const PageHome = () => {
  const navigate = useNavigate();
  whyClosure();
  return (
    <>
      <button onClick={() => navigate("/why/usestate")}>why useState</button>
    </>
  );
};

export default PageHome;
