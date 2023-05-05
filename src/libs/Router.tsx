import { Route, Routes } from "react-router-dom";
import WhyUseState from "../pages/WhyUseState";
import PageHome from "../pages/Home";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<PageHome />} />
      <Route path="/why/usestate" element={<WhyUseState />} />
    </Routes>
  );
};

export default Router;
