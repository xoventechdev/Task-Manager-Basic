import React, { Suspense } from "react";
import LazyLoader from "../../components/layout/LazyLoader";
import ForgetPassword from "../../components/user/forgetPass/ForgetPassword";

const ForgetPasswordPage = () => {
  return (
    <>
      <Suspense fallback={<LazyLoader />}>
        <ForgetPassword />
      </Suspense>
    </>
  );
};

export default ForgetPasswordPage;
