import { useNavigate } from "react-router";

const PageHome = () => {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate("/why/usestate")}>why useState</button>
    </>
  );
};

export default PageHome;
