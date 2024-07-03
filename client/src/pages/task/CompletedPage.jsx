import React, { Suspense } from "react";
import MasterLayout from "../../components/layout/MasterLayout";
const Completed = React.lazy(() =>
  import("../../components/task/completed/Completed")
);
import LazyLoader from "../../components/layout/LazyLoader";

const CompletedPage = () => {
  return (
    <MasterLayout>
      <Suspense fallback={<LazyLoader />}>
        <Completed />
      </Suspense>
    </MasterLayout>
  );
};

export default CompletedPage;
