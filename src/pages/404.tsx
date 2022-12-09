import AppLayout from "components/Layouts/AppLayout";

import type { NextPage } from "next";

const NotFoundPage: NextPage = () => (
  <AppLayout title="Not Found" description="Not Found">
    404 Not Found
  </AppLayout>
);

export default NotFoundPage;
