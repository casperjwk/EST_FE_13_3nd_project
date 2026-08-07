import RecipeCard from "../../components/recipe/RecipeCard";
import FilterPanel from "../../components/recipe/RecipeFilter";
import image from "../../assets/exFoodImg.jpg";
import RecipeCardSkeleton from "../../components/recipe/RecipeCardSkeleton";
import style from "./RecipeListPage.module.css";
import { useNavigate } from "react-router";

function RecipeListPage() {
  const navigate = useNavigate();
  const isLoading = true;

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
        <RecipeCard
          imageUrl={image}
          difficulty="easy"
          name="음식"
          description="음식설명음식설명음식설명음식설명음식설명음식설명음식설명"
          time="15"
          serves="1"
          likes="22"
          onClick={() =>handleRecipeClick(`0605e5a2-296b-437c-999a-632aa993d604`)}
          />
        </div>
        
      </div>
    </div>
  );
}

export default RecipeListPage;
