import { Route, Routes } from "react-router";

import Layout from "./components/layout/DefaultLayout";
// Pages
import TasksPage from "./pages/taks/TasksPage";
import HomePage from "./pages/Home";
import ListUsersPage from "./pages/list/ListUsersPage";

function App() {
  return (
    <Routes>
      <Route
        element={
          <Layout className="w-full items-center justify-items-center min-h-screen p-4 gap-4  font-[family-name:var(--font-geist-sans)]" />
        }
      >
        <Route path="/" index element={<HomePage />} />
        <Route path="/tasks" index element={<TasksPage />} />
        <Route path="/list" index element={<ListUsersPage />} />
      </Route>
    </Routes>
  );
}

export default App;
