import { Route, Routes } from "react-router-dom";
import WhyUseState from "../pages/WhyUseState";

const Router = () => {
  return (
    <Routes>
      <Route path="/why/usestate" element={<WhyUseState />} />
    </Routes>
  );
};

export default Router;
