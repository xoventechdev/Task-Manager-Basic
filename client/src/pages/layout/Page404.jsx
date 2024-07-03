import React, { Suspense } from "react";
import LazyLoader from "../../components/layout/LazyLoader";
const NotFound = React.lazy(() =>
  import("../../components/layout/notFound/NotFound")
);

const Page404 = () => {
  return (
    <Suspense fallback={<LazyLoader />}>
      <NotFound />
    </Suspense>
  );
};

export default Page404;
