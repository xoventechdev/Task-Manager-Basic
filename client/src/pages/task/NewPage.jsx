import React, { Suspense } from "react";
import MasterLayout from "../../components/layout/MasterLayout";
import LazyLoader from "../../components/layout/LazyLoader";
import New from "../../components/task/new/New";

const NewPage = () => {
  return (
    <MasterLayout>
      <Suspense fallback={<LazyLoader />}>
        <New />
      </Suspense>
    </MasterLayout>
  );
};

export default NewPage;
