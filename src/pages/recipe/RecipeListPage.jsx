import RecipeCard from "../../components/recipe/RecipeCard";
import FilterPanel from "../../components/recipe/RecipeFilter";
import image from "../../assets/exFoodImg.jpg";
import RecipeCardSkeleton from "../../components/recipe/RecipeCardSkeleton";
import style from "./RecipeListPage.module.css";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getRecips } from "../../services/recipeSearchService";


function RecipeListPage() {
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    async function loadRecipes() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const recipes = await getRecips();
        setRecipes(recipes);
      } catch (error) {
        console.error("[HankkiLab] 레시피 조회 실패", error);
        setErrorMessage("레시피를 불러오지 못했습니다.");
      }finally{
        setIsLoading(false);
      }
    }

    loadRecipes();
  },[]);



  const handleRecipeClick = recipeId => {
    navigate(`/recipes/${recipeId}`);
  }

  return (
    <div className={style.main}>
      <div className="container">
        <h2 className="">레시피 둘러보기</h2>
        <FilterPanel/>
        <div></div>
        
        <div className={style.recipeCardArea}>
          
        {isLoading
        ? Array.from({length:6}).map((_, index)=>(
          <RecipeCardSkeleton key={index}/>
        ))
        : recipes.map((recipe) =>(
          <RecipeCard
          key={recipe.id}
          imageUrl={recipe.image_url}
          difficulty={recipe.difficulty}
          name={recipe.title}
          description={recipe.description}
          time={recipe.cooking_time}
          serves={recipe.servings}
          likes="22"
          onClick={()=> handleRecipeClick(recipe.id)}
          />
        ))
        
      }
        </div>
        
      </div>
    </div>
  );
}

export default RecipeListPage;
