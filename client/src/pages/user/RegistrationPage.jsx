import React, { Suspense } from "react";
import LazyLoader from "../../components/layout/LazyLoader";
import Registration from "../../components/user/registration/Registration";

const RegistrationPage = () => {
  return (
    <>
      <Suspense fallback={<LazyLoader />}>
        <Registration />
      </Suspense>
    </>
  );
};

export default RegistrationPage;
