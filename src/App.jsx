import "./App.css";
import { Routes, Route } from "react-router";

import MainLayout from "./components/common/MainLayout";
import HomePage from "./pages/home/HomePage";
import RecipeListPage from "./pages/recipe/RecipeListPage";
import RecipeDetailPage from "./pages/recipe/RecipeDetailPage";

import MyPage from "./pages/my/MyPage";
import FavoritePage from "./pages/my/FavoritePage";

import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";

import AdminPage from "./pages/admin/AdminPage";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes" element={<RecipeListPage />} />
        <Route path="/recipes/:id" element={<RecipeDetailPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/favorite" element={<FavoritePage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}

export default App;
