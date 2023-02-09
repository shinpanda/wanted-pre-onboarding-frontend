import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import { hasAccessAuth } from "./atoms";
import Home from "./Home";
import NotFound from "./NotFound";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import TodoList from "./routes/ToDoList";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<NotFound />}>
      <Route path="" element={<Home />} />
      <Route
        path="signup"
        element={hasAccessAuth() ? <Navigate to="/todo" /> : <SignUp />}
      />
      <Route
        path="signin"
        element={hasAccessAuth() ? <Navigate to="/todo" /> : <SignIn />}
      />
      <Route
        path="todo"
        element={hasAccessAuth() ? <TodoList /> : <Navigate to="/signin" />}
      />
    </Route>
  )
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
