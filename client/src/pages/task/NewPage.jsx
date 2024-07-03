import React, { Suspense } from "react";
import MasterLayout from "../../components/layout/MasterLayout";
import LazyLoader from "../../components/layout/LazyLoader";
const New = React.lazy(() => import("../../components/task/new/New"));

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
