import React, { lazy, Suspense } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Spinner from "../components/shared/Spinner";
import { HOME, STATS } from "../constants/routes";
const Header = lazy(() => import("../components/header/Header"));
const Home = lazy(() => import("../pages/Home/Home"));
const Stats = lazy(() => import("../pages/Stats/Stats"));

const RouterConfig = () => {
  return (
    <Router>
      <Suspense fallback={<Spinner className="h-screen" />}>
        <Header />
        <Routes>
          <Route path={HOME} element={<Home />} />
          <Route path={STATS} element={<Stats />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default RouterConfig;
