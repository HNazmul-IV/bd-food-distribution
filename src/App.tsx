import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "./App.css";
import LandingPageLayout from "./layout/LandingPageLayout";
import Home from "./views/Home";
import Register from "./views/Register";
import Login from "./views/Login";
import UserContext from "./lib/context/UserContext";
import DashboardLayout from "./layout/DashboardLayout";
import DashboardIndex from "./views/Dashboard/Index";
import CreatePost from "./views/Dashboard/CreatePost";
import PostList from "./views/Dashboard/PostList";
import EditPost from "./views/Dashboard/EditPost";

function App() {
  return (
    <UserContext>
      <Routes>
        <Route path="/" element={<LandingPageLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardIndex />} />
          <Route path="create-post" element={<CreatePost />} />
          <Route path="post-list" element={<PostList />} />
          <Route path="edit-post/:post_id" element={<EditPost />} />
        </Route>
      </Routes>
    </UserContext>
  );
}

export default App;
