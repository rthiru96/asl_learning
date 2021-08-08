import React, { Suspense } from "react";
import { LinearProgress } from "@material-ui/core";

const StudentDetails = React.lazy(() =>
  import("../../Students/StudentsDetails")
);
const Lessons = React.lazy(() => import("../../Students/Lessons"));
const Exams = React.lazy(() => import("../../Students/Exams"));
const Message = React.lazy(() => import("../../Students/Messages"));
const Camera = React.lazy(() => import("../../Students/Camera"));
const Test = React.lazy(() => import("../../Students/TestScore"));

export const StudentDetailsSuspense = (props) => (
  <Suspense fallback={<LinearProgress />}>
    <StudentDetails {...props} />
  </Suspense>
);

export const LessonsSuspense = (props) => (
  <Suspense fallback={<LinearProgress />}>
    <Lessons {...props} />
  </Suspense>
);

export const ExamsSuspense = (props) => (
  <Suspense fallback={<LinearProgress />}>
    <Exams {...props} />
  </Suspense>
);

export const MessageSuspense = (props) => (
  <Suspense fallback={<LinearProgress />}>
    <Message {...props} />
  </Suspense>
);

export const CameraSuspense = (props) => (
  <Suspense fallback={<LinearProgress />}>
    <Camera {...props} />
  </Suspense>
);

export const TestSuspense = (props) => (
  <Suspense fallback={<LinearProgress />}>
    <Test {...props} />
  </Suspense>
);
