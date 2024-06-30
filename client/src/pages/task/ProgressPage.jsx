import React, { Suspense } from "react";
import MasterLayout from "../../components/layout/MasterLayout";
import LazyLoader from "../../components/layout/LazyLoader";
import Progress from "../../components/task/progress/Progress";

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
