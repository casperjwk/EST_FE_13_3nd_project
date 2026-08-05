import { useEffect, useState } from "react";
import Badge from "../../components/common/Badge";
import styles from "./RecipeDetailPage.module.css";

function cn(...classNames) {
  return classNames
    .filter(Boolean)
    .flatMap(className => className.split(" "))
    .filter(Boolean)
    .map(className => styles[className] ?? className)
    .join(" ");
}

const ingredients = [
  { name: "김치", amount: "1컵 (150g)" },
  {
    name: "돼지고기 앞다리살",
    amount: "3/5컵 (100g)",
    warning: "돼지고기 알레르기 위험 + 페스코 미적합",
  },
  { name: "콩비지", amount: "1봉 (300g)" },
  { name: "식용유", amount: "2스푼 (20g)" },
  { name: "양파", amount: "1/4개 (70g)" },
  { name: "대파", amount: "1/2대 (50g)" },
  { name: "청양고추", amount: "1개 (10g)" },
  { name: "연두진", amount: "1스푼 (10g)" },
  { name: "연두링(멸치디포리)", amount: "1개 (4g)" },
  { name: "다진 마늘", amount: "1스푼 (10g)" },
  { name: "물", amount: "2컵 (400ml)" },
  { name: "김치국물", amount: "5스푼 (50g)" },
];

const steps = [
  "김치는 3cm 두께로 큼직하게 썰어주고, 양파는 2cm 두께로 굵게 채 썰어주세요. 대파와 청양고추는 1cm 간격으로 송송 썰어주세요.",
  "중불로 예열한 냄비에 식용유를 두르고, 돼지고기를 넣어 2분 동안 노릇노릇하게 볶아 주세요.",
  "같은 냄비에 썰어둔 김치를 넣고 2분 동안 중불에서 볶아 주세요. 그다음 양념재료(연두진, 연두링, 다진 마늘, 김치국물, 물)를 모두 넣고 센불에서 한소끔 끓인 후, 끓어오르면 중불로 줄여 2분 더 끓여주세요.",
  "약불로 줄인 후, 콩비지를 넣어 1분 동안 저어가며 끓여주세요.",
  "중불로 올려, 손질한 양파, 대파, 청양고추를 넣고 3분 정도 더 끓여주면 완성!",
];

const analysisSteps = [
  "내 알레르기 정보를 확인하고 있어요",
  "비건 기준을 적용하고 있어요",
  "안전한 재료를 찾고 있어요",
  "조리 순서를 다시 만들고 있어요",
];

const suggestedQuestions = [
  "글루텐 프리도 가능한가요?",
  "대체재 없이 만들 수 있나요?",
  "다른 채소로 바꿔도 될까요?",
  "보관 방법이 궁금해요",
];

const allergyOptions = [
  "난류",
  "우유",
  "메밀",
  "땅콩",
  "대두",
  "밀",
  "고등어",
  "게",
  "새우",
  "돼지고기",
  "복숭아",
  "토마토",
  "아황산류",
  "호두",
  "닭고기",
  "쇠고기",
  "오징어",
  "조개류",
  "잣",
];

const veganOptions = ["일반", "플렉시테리언", "폴로", "페스코", "락토 오보", "오보", "락토", "비건"];

const veganDescriptions = {
  일반: "제한 없음",
  비건: "동물성 식품 제외",
  락토: "유제품 허용",
  오보: "달걀 허용",
  "락토 오보": "유제품·달걀 허용",
  페스코: "생선·해산물까지 허용",
  폴로: "닭고기까지 허용",
  플렉시테리언: "주로 채식, 가끔 육류 허용",
};

function Icon({ name, size = 18 }) {
  const materialIconNames = {
    user: "person",
    clock: "schedule",
    heart: "favorite",
    alert: "warning_amber",
    check: "check",
    book: "menu_book",
    shield: "verified_user",
    chat: "chat_bubble_outline",
    info: "info",
    send: "send",
  };

  return (
    <span
      className={`material-symbols-outlined ${cn("recipe-icon")}`}
      style={{ fontSize: `${size}px` }}
      aria-hidden="true"
    >
      {materialIconNames[name]}
    </span>
  );
}

function Condition({ allergies, veganType, onOpenConditions }) {
  return (
    <>
      <div className={cn("condition-bar")}>
        <div className={cn("condition-bar__inner")}>
          <div>
            <strong>현재 적용 조건 :</strong>
            {allergies.map(allergy => (
              <span className={cn("condition-tag condition-tag--warning")} key={allergy}>
                <Icon name="alert" size={13} />
                {allergy} 제외
              </span>
            ))}
            {veganType && (
              <span className={cn("condition-tag")}>
                <Icon name="check" size={13} />
                {veganType}
              </span>
            )}
          </div>
          <button type="button" onClick={onOpenConditions}>
            조건 수정
          </button>
        </div>
      </div>
    </>
  );
}

function IngredientPanel({ isComplete }) {
  const displayedIngredients = isComplete
    ? ingredients.map(ingredient =>
        ingredient.warning
          ? {
              name: "느타리버섯",
              amount: "200g",
              replacement: "돼지고기 알레르기 + 비건 대체",
              original: ingredient,
            }
          : ingredient,
      )
    : ingredients;

  return (
    <aside className={cn("ingredient-card")}>
      <h2>
        <Icon name="book" size={16} /> 재료
      </h2>
      <ul>
        {displayedIngredients.map(ingredient => (
          <li
            key={ingredient.name}
            className={cn(ingredient.warning ? "ingredient ingredient--warning" : "ingredient")}
          >
            <div className={cn("ingredient__row")}>
              <div>
                {ingredient.original && (
                  <del>
                    {ingredient.original.name} <small>{ingredient.original.amount}</small>
                  </del>
                )}
                <strong>{ingredient.name}</strong>
                <span>{ingredient.amount}</span>
              </div>
              <Badge
                type={
                  ingredient.warning ? "danger" : ingredient.replacement ? "replacement" : "safe"
                }
              />
            </div>
            {ingredient.warning && (
              <p>
                <Icon name="alert" size={12} />
                {ingredient.warning}
              </p>
            )}
            {ingredient.replacement && (
              <p className={cn("replacement-copy")}>↻ {ingredient.replacement}</p>
            )}
          </li>
        ))}
      </ul>
      <div className={cn("ingredient-note")}>
        <Icon name="alert" size={15} />
        <p>
          <strong>실제 제품의 성분표를 반드시 확인하세요.</strong>
          <br />
          제품마다 숨겨진 성분이 다를 수 있습니다.
        </p>
      </div>
    </aside>
  );
}

function AnalysisPanel({ analysisState, progress, onStart, onCompare, onMoreInfo }) {
  if (analysisState === "analyzing") {
    const completedCount = Math.min(Math.floor(progress / 25), analysisSteps.length);
    return (
      <section className={cn("analysis-card")} aria-live="polite">
        <h2>
          <Icon name="shield" size={25} />
          AI 성분 스크리닝 중
        </h2>
        <ul>
          {analysisSteps.map((step, index) => (
            <li
              key={step}
              className={cn(
                index < completedCount
                  ? "is-complete"
                  : index === completedCount
                    ? "is-current"
                    : "",
              )}
            >
              <span>{index < completedCount ? "✓" : index === completedCount ? "◆" : ""}</span>
              {step}
            </li>
          ))}
        </ul>
        <div className={cn("analysis-progress")}>
          <div style={{ width: `${progress}%` }} />
        </div>
        <strong className={cn("analysis-percent")}>{progress}%</strong>
      </section>
    );
  }

  if (analysisState === "complete") {
    return (
      <section className={cn("complete-card")}>
        <div className={cn("complete-card__title")}>
          <Icon name="shield" size={25} />
          <div>
            <h2>내 조건에 맞게 안전하게 변경되었어요</h2>
            <p>1개의 재료가 대체되었으며 조리 과정도 함께 안내드려요.</p>
          </div>
        </div>
        <div className={cn("complete-card__actions")}>
          <button
            className={cn("primary-button primary-button--soft")}
            type="button"
            onClick={onCompare}
          >
            <Icon name="shield" size={15} />
            기존 레시피와 비교하기
          </button>
          <button className={cn("secondary-button")} type="button" onClick={onMoreInfo}>
            <Icon name="info" size={14} />더 알아보기
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className={cn("mismatch-card")}>
      <div className={cn("mismatch-card__title")}>
        <span className={cn("mismatch-card__warning-icon")}>
          <Icon name="alert" size={25} />
        </span>
        <div>
          <h2>1개 재료가 내 조건과 맞지 않아요</h2>
          <p>알레르기 · 비건 식단에 주의가 필요한 재료가 있어요</p>
        </div>
      </div>
      <span className={cn("danger-chip")}>
        <Icon name="alert" size={12} />
        돼지고기 앞다리살 - 돼지고기 알레르기 + 페스코 미적합
      </span>
      <div className={cn("mismatch-card__actions")}>
        <button className={cn("primary-button")} type="button" onClick={onStart}>
          <Icon name="shield" size={15} />
          AI 맞춤 레시피 만들기
        </button>
        <button className={cn("secondary-button")} type="button" onClick={onMoreInfo}>
          <Icon name="info" size={14} />더 알아보기
        </button>
      </div>
    </section>
  );
}

function RecipeDetailPage() {
  const [analysisState, setAnalysisState] = useState("before");
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [isSimpleRecipeOpen, setIsSimpleRecipeOpen] = useState(false);
  const [simpleRecipeStep, setSimpleRecipeStep] = useState(0);
  const [isConditionModalOpen, setIsConditionModalOpen] = useState(false);
  const [isMoreInfoOpen, setIsMoreInfoOpen] = useState(false);
  const [appliedAllergies, setAppliedAllergies] = useState(["돼지고기"]);
  const [appliedVeganType, setAppliedVeganType] = useState("페스코");
  const [draftAllergies, setDraftAllergies] = useState(["돼지고기"]);
  const [draftVeganType, setDraftVeganType] = useState("페스코");
  const [isFavorite, setIsFavorite] = useState(false);
  const isComplete = analysisState === "complete";
  const adaptedSteps = [
    "김치는 3cm 두께로 큼직하게 썰고, 양파는 2cm 두께로 굵게 채 썰어주세요. 대파와 청양고추는 1cm 간격으로 송송 썰고, 느타리버섯은 먹기 좋게 찢어주세요.",
    "중불로 예열한 냄비에 식용유를 두르고, 느타리버섯을 넣어 2~3분 동안 볶아주세요. 버섯의 수분이 어느 정도 날아가고 살짝 노릇해질 때까지 볶아주세요.",
    steps[2],
    steps[3],
    steps[4],
  ];
  const displayedSteps = isComplete ? adaptedSteps : steps;

  useEffect(() => {
    if (analysisState !== "analyzing") return undefined;
    const timer = window.setInterval(() => {
      setAnalysisProgress(currentProgress => {
        const nextProgress = Math.min(currentProgress + 10, 100);
        if (nextProgress === 100) {
          window.clearInterval(timer);
          window.setTimeout(() => setAnalysisState("complete"), 350);
        }
        return nextProgress;
      });
    }, 280);
    return () => window.clearInterval(timer);
  }, [analysisState]);

  useEffect(() => {
    if (!isSimpleRecipeOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = event => {
      if (event.key === "Escape") setIsSimpleRecipeOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSimpleRecipeOpen]);

  useEffect(() => {
    if (!isConditionModalOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = event => {
      if (event.key === "Escape") setIsConditionModalOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isConditionModalOpen]);

  useEffect(() => {
    if (!isMoreInfoOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = event => {
      if (event.key === "Escape") setIsMoreInfoOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMoreInfoOpen]);

  const startAnalysis = () => {
    setAnalysisProgress(0);
    setAnalysisState("analyzing");
  };

  const showOriginalRecipe = () => {
    setAnalysisProgress(0);
    setAnalysisState("before");
  };

  const openSimpleRecipe = () => {
    setSimpleRecipeStep(0);
    setIsSimpleRecipeOpen(true);
  };

  const closeSimpleRecipe = () => setIsSimpleRecipeOpen(false);

  const openConditionModal = () => {
    setDraftAllergies(appliedAllergies);
    setDraftVeganType(appliedVeganType);
    setIsConditionModalOpen(true);
  };

  const toggleAllergy = allergy => {
    setDraftAllergies(current =>
      current.includes(allergy) ? current.filter(item => item !== allergy) : [...current, allergy],
    );
  };

  const applyConditions = () => {
    setAppliedAllergies(draftAllergies);
    setAppliedVeganType(draftVeganType);
    setIsConditionModalOpen(false);
  };

  return (
    <div className={cn("recipe-page")}>
      <Condition
        allergies={appliedAllergies}
        veganType={appliedVeganType}
        onOpenConditions={openConditionModal}
      />
      <main className={cn("recipe-detail")}>
        <div className={cn("recipe-detail__grid")}>
          <div className={cn("recipe-detail__main")}>
            <div className={cn("recipe-photo")} role="img" aria-label="김치비지찌개 완성 사진" />

            <AnalysisPanel
              analysisState={analysisState}
              progress={analysisProgress}
              onStart={startAnalysis}
              onCompare={showOriginalRecipe}
              onMoreInfo={() => setIsMoreInfoOpen(true)}
            />

            <div className={cn("safety-notice")}>
              <div className={cn("safety-notice__heading")}>
                <Icon name="alert" size={18} />
                <strong className="text-button-s">실제 제품의 성분표를 반드시 확인하세요.</strong>
              </div>
              <span className="text-xs">
                AI 추천은 참고용이며, 개인의 알레르기 반응은 다를 수 있습니다. 심각한 알레르기가
                있다면 의사와 상담하세요.
              </span>
            </div>

            <section className={cn("steps-card p-3 p-xl-4")}>
              <div className={cn("section-heading mb-3")}>
                <h2>조리 순서</h2>
                <button className={cn("simple-recipe-button")} type="button" onClick={openSimpleRecipe}>
                  간단 레시피 보기
                </button>
              </div>
              <ol>
                {displayedSteps.map((step, index) => (
                  <li
                    key={step}
                    className={cn(
                      isComplete && index < 2 ? "step--replaced" : "",
                      "column-gap-3 py-3",
                    )}
                  >
                    <span>{index + 1}</span>
                    <div>
                      <p>{step}</p>
                      {isComplete && index < 2 && (
                        <small className={cn("column-gap-3 mt-2 px-3 py-2")}>
                          <b>↻ 대체됨</b>
                          {index === 0
                            ? "느타리버섯은 물에 오래 씻으면 수분을 많이 흡수할 수 있으므로 가볍게 닦아 사용하세요."
                            : "느타리버섯을 살짝 노릇해질 때까지 볶으면 돼지고기 없이도 씹는 식감과 감칠맛을 더할 수 있습니다."}
                        </small>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section className={cn("question-card")}>
              <h2>
                <Icon name="chat" size={22} />
                AI에게 질문하기
              </h2>
              <p className={cn("question-card__description")}>
                이 레시피에 대해 궁금한 점을 자유롭게 물어보세요.
              </p>
              <div className={cn("question-chips")}>
                {suggestedQuestions.map(question => (
                  <button type="button" key={question}>
                    {question}
                  </button>
                ))}
              </div>
              <form className={cn("question-form")}>
                <label className={cn("hidden")} htmlFor="recipe-question">
                  레시피 질문
                </label>
                <input
                  id="recipe-question"
                  placeholder="예 : 돼지고기 대신 사용할 수 있는 재료가 있나요?"
                />
                <button type="submit" aria-label="질문 보내기">
                  <Icon name="send" size={21} />
                </button>
              </form>
              <div className={cn("chat-messages")}>
                <p className={cn("chat-message chat-message--mine")}>
                  콩비지 대신 두부를 사용해도 될까요?
                </p>
                <p className={cn("chat-message")}>
                  네, 으깬 두부를 사용해도 좋아요. 물의 양을 조금 줄이면 비슷한 농도로 만들 수
                  있어요.
                </p>
              </div>
            </section>
          </div>

          <div className={cn("recipe-detail__side")}>
            <section className={cn("recipe-summary")}>
              <h1>김치비지찌개</h1>
              <p>고소한 콩비지와 잘 익은 김치가 어우러진 든든한 찌개예요.</p>
              <div className={cn("recipe-summary__meta")}>
                <span>
                  <Icon name="user" size={16} />
                  2인분
                </span>
                <span>
                  <Icon name="clock" size={16} />
                  20분
                </span>
                <span className={cn("safe-badge")}>쉬움</span>
                <span className={cn("favorite-count")}>
                  <Icon name="heart" size={16} />
                  10
                </span>
                <button
                  className={cn("favorite-button", isFavorite ? "favorite-button--active" : "")}
                  type="button"
                  aria-label={isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
                  aria-pressed={isFavorite}
                  onClick={() => setIsFavorite(current => !current)}
                >
                  <Icon name="heart" size={14} />
                </button>
              </div>
            </section>
            <section className={cn("view-mode")}>
              <p>레시피 보기 모드</p>
              <div>
                <button
                  className={cn(!isComplete ? "is-active" : "")}
                  type="button"
                  onClick={showOriginalRecipe}
                >
                  <Icon name="book" size={14} />
                  기존 레시피
                </button>
                <button
                  className={cn(isComplete ? "is-active" : "")}
                  type="button"
                  onClick={() => {
                    if (!isComplete) startAnalysis();
                  }}
                >
                  <Icon name="shield" size={14} />
                  AI 맞춤 레시피
                </button>
              </div>
            </section>
            <IngredientPanel isComplete={isComplete} />
          </div>
        </div>
      </main>
      {isMoreInfoOpen && (
        <div
          className={cn("more-info-backdrop")}
          role="presentation"
          onMouseDown={event => {
            if (event.target === event.currentTarget) setIsMoreInfoOpen(false);
          }}
        >
          <section
            className={cn("more-info-modal")}
            role="dialog"
            aria-modal="true"
            aria-labelledby="more-info-title"
          >
            <div className={cn("more-info-modal__header")}>
              <h2 id="more-info-title" className="text-subtitle-s">
                이 레시피,
                <br className={cn("more-info-title-break")} /> 어떻게 바꿀 수 있을까?
              </h2>
              <button
                className={cn("more-info-modal__close")}
                type="button"
                aria-label="더 알아보기 닫기"
                onClick={() => setIsMoreInfoOpen(false)}
              >
                <span className="material-symbols-outlined" aria-hidden="true">
                  close
                </span>
              </button>
            </div>

            <section className={cn("more-info-section more-info-section--replacement")}>
              <h3 className="text-button-m">
                <span className="material-symbols-outlined" aria-hidden="true">
                  expand_circle_down
                </span>
                분류 기준에 맞는 대체재
              </h3>
              <div className={cn("more-info-card")}>
                <div className={cn("more-info-replacement")}>
                  <div className={cn("more-info-original text-xs")}>
                    <del>돼지고기 앞다리살</del>
                    <del>3/5컵 (100g)</del>
                  </div>
                  <span className={cn("more-info-status more-info-status--safe text-button-xs")}>
                    <Icon name="check" size={12} />
                    대체가능
                  </span>
                  <div className={cn("more-info-new-ingredient text-button-s")}>
                    <strong>느타리버섯</strong>
                    <span className="text-xs">200g</span>
                  </div>
                </div>
                <p className={cn("more-info-reason text-button-xs")}>
                  <span className="material-symbols-outlined" aria-hidden="true">
                    refresh
                  </span>
                  돼지고기 알레르기 + 비건 대체
                </p>
              </div>
            </section>

            <section className={cn("more-info-section more-info-section--check")}>
              <h3 className="text-button-m">
                <span className="material-symbols-outlined" aria-hidden="true">
                  do_not_disturb_on
                </span>
                성분표를 직접 확인해 주세요
              </h3>
              <div className={cn("more-info-card")}>
                <div className={cn("more-info-check-list text-xs")}>
                  <div>
                    <strong>김치</strong>
                    <span>1컵 (150g)</span>
                    <em>확인필요</em>
                  </div>
                  <div>
                    <strong>김치국물</strong>
                    <span>5스푼 (50g)</span>
                    <em>확인필요</em>
                  </div>
                </div>
                <ul className={cn("more-info-notes text-xs")}>
                  <li>
                    <span className="material-symbols-outlined" aria-hidden="true">
                      forward
                    </span>
                    돼지고기 추출물, 돈골 육수, 육수 조미료 확인 필요
                  </li>
                  <li>
                    <span className="material-symbols-outlined" aria-hidden="true">
                      forward
                    </span>
                    페스코 조건에는 적합할 수 있으나, 돼지고기 및 육류 유래 성분 포함 여부를 확인해
                    주세요.
                  </li>
                </ul>
              </div>
            </section>
          </section>
        </div>
      )}
      {isConditionModalOpen && (
        <div
          className={cn("condition-modal-backdrop")}
          role="presentation"
          onMouseDown={event => {
            if (event.target === event.currentTarget) setIsConditionModalOpen(false);
          }}
        >
          <section
            className={cn("condition-modal")}
            role="dialog"
            aria-modal="true"
            aria-labelledby="condition-modal-title"
          >
            <div className={cn("condition-modal__header")}>
              <div>
                <h2 id="condition-modal-title">현재 조건 수정</h2>
                <p>알레르기와 비건 정보를 선택해 맞춤 레시피를 확인하세요.</p>
              </div>
              <div className={cn("condition-modal__header-actions")}>
                <button
                  className={cn("condition-modal__close")}
                  type="button"
                  aria-label="조건 수정 닫기"
                  onClick={() => setIsConditionModalOpen(false)}
                >
                  <span className="material-symbols-outlined" aria-hidden="true">
                    close
                  </span>
                  <span className={cn("condition-modal__action-label")}>취소</span>
                </button>
                <button
                  className={cn("condition-modal__header-apply")}
                  type="button"
                  onClick={applyConditions}
                >
                  <span className="material-symbols-outlined" aria-hidden="true">
                    save
                  </span>
                  적용
                </button>
              </div>
            </div>

            <div className={cn("condition-modal__body")}>
              <section className={cn("condition-option-section")}>
                <div className={cn("condition-option-section__title")}>
                  <div>
                    <h3>알레르기 정보</h3>
                    <p>해당하는 알레르기를 모두 선택해주세요. 레시피 검색 시 자동으로 적용됩니다.</p>
                  </div>
                  <span>중복 선택 가능</span>
                </div>
                <div className={cn("condition-option-grid condition-option-grid--allergy")}>
                  {allergyOptions.map(allergy => {
                    const isSelected = draftAllergies.includes(allergy);
                    return (
                      <button
                        className={cn(
                          "condition-option-button condition-option-button--allergy",
                          isSelected ? "is-selected" : "",
                        )}
                        type="button"
                        aria-pressed={isSelected}
                        key={allergy}
                        onClick={() => toggleAllergy(allergy)}
                      >
                        {isSelected && <Icon name="check" size={14} />}
                        {allergy}
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className={cn("condition-option-section")}>
                <div className={cn("condition-option-section__title")}>
                  <div>
                    <h3>비건 유형</h3>
                    <p>비건 유형은 알레르기와 별개 기준입니다. 가장 가까운 식단 유형을 선택하세요.</p>
                  </div>
                  <span>단일 선택</span>
                </div>
                <div className={cn("condition-option-grid condition-option-grid--vegan")}>
                  {veganOptions.map(veganType => {
                    const isSelected = draftVeganType === veganType;
                    return (
                      <button
                        className={cn(
                          "condition-option-button condition-option-button--vegan",
                          isSelected ? "is-selected" : "",
                        )}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        key={veganType}
                        onClick={() => setDraftVeganType(veganType)}
                      >
                        {isSelected && <Icon name="check" size={14} />}
                        <span className={cn("condition-option-button__copy")}>
                          <strong>{veganType}</strong>
                          <small>{veganDescriptions[veganType]}</small>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>
            </div>

            <div className={cn("condition-modal__footer")}>
              <button
                className={cn("condition-modal__reset text-button-xs")}
                type="button"
                onClick={() => {
                  setDraftAllergies([]);
                  setDraftVeganType("");
                }}
              >
                <span className="material-symbols-outlined" aria-hidden="true">
                  refresh
                </span>
                선택 초기화
              </button>
              <button
                className={cn("condition-modal__apply text-button-xs")}
                type="button"
                onClick={applyConditions}
              >
                조건 적용하기
              </button>
            </div>
          </section>
        </div>
      )}
      {isSimpleRecipeOpen && (
        <div
          className={cn("simple-recipe-backdrop")}
          role="presentation"
          onMouseDown={event => {
            if (event.target === event.currentTarget) closeSimpleRecipe();
          }}
        >
          <section
            className={cn("simple-recipe-modal")}
            role="dialog"
            aria-modal="true"
            aria-labelledby="simple-recipe-title"
          >
            <div
              className={cn(
                "simple-recipe-modal__header d-flex align-items-start justify-content-between pb-3",
              )}
            >
              <div>
                <h2 id="simple-recipe-title" className={cn("mb-2 text-title-m")}>
                  김치비지찌개
                </h2>
                <p className={cn("m-0")}>간단 레시피 · {displayedSteps.length}단계</p>
              </div>
              <button
                className={cn(
                  "simple-recipe-modal__close d-grid align-items-center justify-content-center",
                )}
                type="button"
                aria-label="간단 레시피 닫기"
                onClick={closeSimpleRecipe}
              >
                <span className="material-symbols-outlined" aria-hidden="true">
                  close
                </span>
              </button>
            </div>
            <div className={cn("simple-recipe-modal__divider")} />
            <article
              className={cn(
                "simple-recipe-step-card d-flex flex-column justify-content-between my-3",
              )}
            >
              <strong>STEP {simpleRecipeStep + 1}</strong>
              <p className={cn("my-auto py-4")}>{displayedSteps[simpleRecipeStep]}</p>
            </article>
            <nav
              className={cn(
                "simple-recipe-controls d-flex align-items-center justify-content-between",
              )}
              aria-label="간단 레시피 단계 이동"
            >
              <button
                className={cn("simple-recipe-nav-button px-4 py-2 text-button-m")}
                type="button"
                disabled={simpleRecipeStep === 0}
                onClick={() => setSimpleRecipeStep(step => step - 1)}
              >
                이전
              </button>
              <strong>
                {simpleRecipeStep + 1} / {displayedSteps.length}
              </strong>
              <button
                className={cn("simple-recipe-nav-button px-4 py-2 text-button-m")}
                type="button"
                disabled={simpleRecipeStep === displayedSteps.length - 1}
                onClick={() => setSimpleRecipeStep(step => step + 1)}
              >
                다음
              </button>
            </nav>
          </section>
        </div>
      )}
    </div>
  );
}

export default RecipeDetailPage;
