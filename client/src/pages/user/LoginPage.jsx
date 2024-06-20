import React, { lazy, Suspense } from "react";
import LazyLoader from "../../components/layout/LazyLoader";
import Login from "../../components/user/login/Login";

const LoginPage = () => {
  return (
    <>
      <Suspense fallback={<LazyLoader />}>
        <Login />
      </Suspense>
    </>
  );
};

export default LoginPage;
