import { useState } from "react";

const allergyItems = [
  "우유",
  "생선",
  "달걀",
  "복숭아",
  "밀",
  "토마토",
  "대두",
  "땅콩",
  "돼지고기",
  "견과류",
  "닭고기",
  "새우",
  "소고기",
  "게",
  "조개류",
  "기타",
];

const veganItems = [
  "일반",
  "플렉시테리언",
  "폴로",
  "페스코",
  "락토-오보",
  "릭토",
  "오보",
  "비건",
];

function FilterPanel(){
  const [allergyFilters, setAllergyFilters] = useState({});
  const [veganFilters, setVeganFilters] = useState("일반");

  const handleAllergyClick = (item) => {
    setAllergyFilters((prev)=>{
      const current = prev[item] || "none";
      
      let next = "none";

      if (current === "none") {
        next = "warning";
      }else if ( current ==="warning"){
        next = "exclude"
      }else {
        next = " none";
      }
      return{
        ...prev,
        [item]: next,
      };
    });
  };

  const handleVeganClick = (item) => {
    setVeganFilters(item);
  }

  const resetAllFilters = () => {
    setAllergyFilters({});
    setVeganFilters("일반");
  };

  const removeAllergyFilter = (item) => {
    setAllergyFilters((prev) => {
      const next = { ...prev };
      delete next[item];
      return next;
    });
  };

  const selectedAllergies = Object.entries(allergyFilters).filter(
    ([,state]) => state !=="none"
  );

  return (
    <div className="filter-panel">
      <div className="filter-box">
        <section className="filter-section">
          <div className="section-title">
            <span>알레르기 분류</span>
          </div>
          <div className="chip-list">
            {allergyItems.map((item)=>{
              const state = allergyFilters[item] || "none";

              return (
                <button
                  key={item}
                  type="button"
                  className={`chip allergy-chip ${state}`}
                  onClick={() => handleAllergyClick(item)}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </section>

        <section className="filter-section">
          <div className="section-title">
            <span>비건 분류</span>
          </div>

          <div className="chip-list">
            {veganItems.map((item)=>{
              const selected = veganFilters === item;
              return(
                <button
                  key={item}
                  type="button"
                  className={`chip vegan-chip ${selected ? "selected": ""}`}
                  onClick={()=> handleVeganClick(item)}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </section>
      </div>

      <div className="selected-filter-list">
        {selectedAllergies.length > 0 && (
          <button
            type="button"
            className="reset-chip"
            onClick={resetAllFilters}
          >
            x 전체삭제
          </button>
        )}

        {selectedAllergies.map(([item, state]) => (
        <button
          key={item}
          type="button"
          className={`selected-chip allergy-selected ${state}`}
          onClick={() => removeAllergyFilter(item)}
        >
          {item}
        </button>
        ))}
      </div>
    </div>
  )
}

export default FilterPanel;