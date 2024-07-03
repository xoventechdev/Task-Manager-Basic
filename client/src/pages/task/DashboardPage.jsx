import React, { Suspense } from "react";
import MasterLayout from "../../components/layout/MasterLayout";
const Dashboard = React.lazy(() =>
  import("../../components/task/dashboard/Dashboard")
);
import LazyLoader from "../../components/layout/LazyLoader";

const DashboardPage = () => {
  return (
    <MasterLayout>
      <Suspense fallback={<LazyLoader />}>
        <Dashboard />
      </Suspense>
    </MasterLayout>
  );
};

export default DashboardPage;
