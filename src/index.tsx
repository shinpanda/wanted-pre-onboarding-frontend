import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./Auth";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import TodoList from "./components/ToDoList";
import Home from "./Home";
import Middleware from "./Middleware";
import NotFound from "./NotFound";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<NotFound />}>
      <Route path="" index element={<Home />} />
      <Route
        path="signup"
        element={<Middleware component={<SignUp />} access={true} />}
      />
      <Route
        path="signin"
        element={<Middleware component={<SignIn />} access={true} />}
      />
      <Route
        path="todo"
        element={<Middleware component={<TodoList />} access={false} />}
      />
    </Route>
  ),
  {
    basename: process.env.PUBLIC_URL,
  }
);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
