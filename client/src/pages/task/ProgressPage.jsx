import React, { Suspense } from "react";
import MasterLayout from "../../components/layout/MasterLayout";
import LazyLoader from "../../components/layout/LazyLoader";
const Progress = React.lazy(() =>
  import("../../components/task/progress/Progress")
);

const ProgressPage = () => {
  return (
    <MasterLayout>
      <Suspense fallback={<LazyLoader />}>
        <Progress />
      </Suspense>
    </MasterLayout>
  );
};

export default ProgressPage;
