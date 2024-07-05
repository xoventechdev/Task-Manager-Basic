import React, { Suspense } from "react";
import MasterLayout from "../../components/layout/MasterLayout";
import LazyLoader from "../../components/layout/LazyLoader";
const Profile = React.lazy(() =>
  import("../../components/user/profile/Profile")
);

const ProfilePage = () => {
  return (
    <MasterLayout>
      <Suspense fallback={LazyLoader}>
        <Profile />
      </Suspense>
    </MasterLayout>
  );
};

export default ProfilePage;
