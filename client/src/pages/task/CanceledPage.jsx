import { Suspense } from "react";
import MasterLayout from "../../components/layout/MasterLayout";
import LazyLoader from "../../components/layout/LazyLoader";
import Canceled from "../../components/task/canceled/Canceled";

const CanceledPage = () => {
  return (
    <MasterLayout>
      <Suspense fallback={<LazyLoader />}>
        <Canceled />
      </Suspense>
    </MasterLayout>
  );
};

export default CanceledPage;
