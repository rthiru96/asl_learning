import {
  Person,
  Create,
  Message,
  LibraryBooks,
  Score,
} from "@material-ui/icons";

const studentRoutes = [
  {
    id: 1,
    path: "/student",
    sidebarName: "Student Details",
    icon: Person,
  },
  {
    id: 2,
    path: "/student/lessons",
    sidebarName: "Lessons",
    icon: LibraryBooks,
  },
  {
    id: 3,
    path: "/student/exams",
    sidebarName: "Exams",
    icon: Create,
  },
  {
    id: 4,
    path: "/student/test-reslut",
    sidebarName: "Test Reslut",
    icon: Score,
  },
  {
    id: 5,
    path: "/student/message",
    sidebarName: " Message",
    icon: Message,
  },
];

export default studentRoutes;
