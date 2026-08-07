import RecipeCard from "../../components/recipe/RecipeCard";
import FilterPanel from "../../components/recipe/RecipeFilter";
import image from "../../assets/exFoodImg.jpg";

function RecipeListPage() {
  return (
    <div className="container">
      <h2>레시피 둘러보기</h2>
      <FilterPanel/>
      <div></div>
      
      <RecipeCard
        imageUrl={image}
        category="쉬움"
        name="음식"
        description="음식설명음식설명음식설명음식설명음식설명음식설명음식설명"
        time="15"
        serves="1"
        likes="22"
        contry="한식"
      />

      
    </div>
  );
}

export default RecipeListPage;
