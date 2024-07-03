import React, { Suspense } from "react";
import LazyLoader from "../../components/layout/LazyLoader";
import MasterLayout from "../../components/layout/MasterLayout";
const Create = React.lazy(() => import("../../components/task/create/Create"));

const CreatePage = () => {
  return (
    <MasterLayout>
      <Suspense fallback={<LazyLoader />}>
        <Create />
      </Suspense>
    </MasterLayout>
  );
};

export default CreatePage;
