import React, { Suspense } from "react";
import { LinearProgress } from "@material-ui/core";

const Message = React.lazy(() => import("../../Teachers/MessageVew"));

export const MessageSuspense = (props) => (
  <Suspense fallback={<LinearProgress />}>
    <Message {...props} />
  </Suspense>
);
