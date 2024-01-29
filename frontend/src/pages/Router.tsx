import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LatencyCheckPage } from "./LatencyCheckPage/LatencyCheckPage";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LatencyCheckPage />} />
      </Routes>
    </BrowserRouter>
  );
};
