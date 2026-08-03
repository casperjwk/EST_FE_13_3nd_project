import { useEffect, useState } from "react";
import Badge from "../../components/common/Badge";
import "./RecipeDetailPage.css";

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

const simpleRecipeTags = [
  "김치 1컵 (150g)",
  "양파 1/4개 (70g)",
  "대파 1/2대 (70g)",
  "청양고추 1개 (10g)",
  "느타리버섯 200g",
];

function Icon({ name, size = 18 }) {
  const paths = {
    user: (
      <>
        <circle cx="12" cy="8" r="3" />
        <path d="M5.5 19c.8-3.5 3-5 6.5-5s5.7 1.5 6.5 5" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    heart: (
      <path d="M20 8.7C20 14 12 19 12 19S4 14 4 8.7A4.2 4.2 0 0 1 12 6a4.2 4.2 0 0 1 8 2.7Z" />
    ),
    alert: (
      <>
        <path d="M12 3 2.8 20h18.4L12 3Z" />
        <path d="M12 9v5m0 3h.01" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    book: (
      <>
        <path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H20v17H7.5A3.5 3.5 0 0 0 4 22V5.5Z" />
        <path d="M4 18.5A3.5 3.5 0 0 1 7.5 15H20" />
      </>
    ),
    shield: <path d="M12 3 5 6v5c0 4.5 2.8 7.8 7 10 4.2-2.2 7-5.5 7-10V6l-7-3Zm-3 9 2 2 4-5" />,
    chat: <path d="M4 4h16v12H8l-4 4V4Z" />,
    info: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5m0-8h.01" />
      </>
    ),
    send: <path d="m3 11 18-8-7 18-3-7-8-3Zm8 3 5-6" />,
  };

  return (
    <svg className="recipe-icon" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function Header() {
  return (
    <>
      <header className="recipe-header">
        <div className="recipe-header__inner">
          <a className="recipe-logo" href="/" aria-label="한끼랩 홈">
            <span>한끼</span>랩
          </a>
          <nav className="recipe-nav" aria-label="주요 메뉴">
            <a href="/">홈</a>
            <a href="/recipes">레시피</a>
            <a href="/mypage">마이페이지</a>
          </nav>
          <div className="recipe-auth">
            <a href="/login">로그인</a>
            <a className="recipe-auth__join" href="/signup">
              회원가입
            </a>
          </div>
        </div>
      </header>
      <div className="condition-bar">
        <div className="condition-bar__inner">
          <div>
            <strong>현재 적용 조건 :</strong>
            <span className="condition-tag condition-tag--warning">
              <Icon name="alert" size={13} />
              돼지고기 제외
            </span>
            <span className="condition-tag">
              <Icon name="check" size={13} />
              페스코
            </span>
          </div>
          <button type="button">조건 수정</button>
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
    <aside className="ingredient-card">
      <h2>
        <Icon name="book" size={16} /> 재료
      </h2>
      <ul>
        {displayedIngredients.map(ingredient => (
          <li
            key={ingredient.name}
            className={ingredient.warning ? "ingredient ingredient--warning" : "ingredient"}
          >
            <div className="ingredient__row">
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
                type={ingredient.warning ? "danger" : ingredient.replacement ? "replacement" : "safe"}
              />
            </div>
            {ingredient.warning && (
              <p>
                <Icon name="alert" size={12} />
                {ingredient.warning}
              </p>
            )}
            {ingredient.replacement && (
              <p className="replacement-copy">↻ {ingredient.replacement}</p>
            )}
          </li>
        ))}
      </ul>
      <div className="ingredient-note">
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

function AnalysisPanel({ analysisState, progress, onStart, onCompare }) {
  if (analysisState === "analyzing") {
    const completedCount = Math.min(Math.floor(progress / 25), analysisSteps.length);
    return (
      <section className="analysis-card" aria-live="polite">
        <h2>
          <Icon name="shield" size={25} />
          AI 성분 스크리닝 중
        </h2>
        <ul>
          {analysisSteps.map((step, index) => (
            <li
              key={step}
              className={
                index < completedCount
                  ? "is-complete"
                  : index === completedCount
                    ? "is-current"
                    : ""
              }
            >
              <span>{index < completedCount ? "✓" : index === completedCount ? "◆" : ""}</span>
              {step}
            </li>
          ))}
        </ul>
        <div className="analysis-progress">
          <div style={{ width: `${progress}%` }} />
        </div>
        <strong className="analysis-percent">{progress}%</strong>
      </section>
    );
  }

  if (analysisState === "complete") {
    return (
      <section className="complete-card">
        <div className="complete-card__title">
          <Icon name="shield" size={25} />
          <div>
            <h2>내 조건에 맞게 안전하게 변경되었어요</h2>
            <p>1개의 재료가 대체되었으며 조리 과정도 함께 안내드려요.</p>
          </div>
        </div>
        <div className="complete-card__actions">
          <button className="primary-button primary-button--soft" type="button" onClick={onCompare}>
            <Icon name="shield" size={15} />
            기존 레시피와 비교하기
          </button>
          <button className="secondary-button" type="button">
            <Icon name="info" size={14} />더 알아보기
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="mismatch-card">
      <div className="mismatch-card__title">
        <Icon name="alert" size={25} />
        <div>
          <h2>1개 재료가 내 조건과 맞지 않아요</h2>
          <p>알레르기 · 비건 식단에 주의가 필요한 재료가 있어요</p>
        </div>
      </div>
      <span className="danger-chip">
        <Icon name="alert" size={12} />
        돼지고기 앞다리살 - 돼지고기 알레르기 + 페스코 미적합
      </span>
      <div className="mismatch-card__actions">
        <button className="primary-button" type="button" onClick={onStart}>
          <Icon name="shield" size={15} />
          AI 맞춤 레시피 만들기
        </button>
        <button className="secondary-button" type="button">
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

  return (
    <div className="recipe-page">
      <Header />
      <main className="recipe-detail">
        <div className="recipe-detail__grid">
          <div className="recipe-detail__main">
            <div className="recipe-photo" role="img" aria-label="김치비지찌개 완성 사진" />

            <AnalysisPanel
              analysisState={analysisState}
              progress={analysisProgress}
              onStart={startAnalysis}
              onCompare={showOriginalRecipe}
            />

            <div className="safety-notice">
              <Icon name="alert" size={16} />
              <strong>실제 제품의 성분표를 반드시 확인하세요.</strong>
              <span>
                AI 추천은 참고용이며, 개인의 알레르기 반응은 다를 수 있습니다. 심각한 알레르기가
                있다면 의사와 상담하세요.
              </span>
            </div>

            <section className="steps-card p-4">
              <div className="section-heading mb-3">
                <h2>조리 순서</h2>
                <button className="px-4 py-1" type="button" onClick={openSimpleRecipe}>
                  간단 레시피 보기
                </button>
              </div>
              <ol>
                {displayedSteps.map((step, index) => (
                  <li
                    key={step}
                    className={`${isComplete && index < 2 ? "step--replaced " : ""}column-gap-3 py-3`}
                  >
                    <span>{index + 1}</span>
                    <div>
                      <p>
                        {step}
                      </p>
                      {isComplete && index < 2 && (
                        <small className="column-gap-3 mt-2 px-3 py-2">
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

            <section className="question-card">
              <h2>
                <Icon name="chat" size={22} />
                AI에게 질문하기
              </h2>
              <p className="question-card__description">
                이 레시피에 대해 궁금한 점을 자유롭게 물어보세요.
              </p>
              <div className="question-chips">
                {suggestedQuestions.map(question => (
                  <button type="button" key={question}>
                    {question}
                  </button>
                ))}
              </div>
              <form className="question-form">
                <label className="hidden" htmlFor="recipe-question">
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
              <div className="chat-messages">
                <p className="chat-message chat-message--mine">
                  콩비지 대신 두부를 사용해도 될까요?
                </p>
                <p className="chat-message">
                  네, 으깬 두부를 사용해도 좋아요. 물의 양을 조금 줄이면 비슷한 농도로 만들 수
                  있어요.
                </p>
              </div>
            </section>
          </div>

          <div className="recipe-detail__side">
            <section className="recipe-summary">
              <h1>김치비지찌개</h1>
              <p>고소한 콩비지와 잘 익은 김치가 어우러진 든든한 찌개예요.</p>
              <div className="recipe-summary__meta">
                <span>
                  <Icon name="user" size={16} />
                  2인분
                </span>
                <span>
                  <Icon name="clock" size={16} />
                  20분
                </span>
                <span className="safe-badge">쉬움</span>
                <span>
                  <Icon name="heart" size={16} />
                  10
                </span>
                <button type="button" aria-label="즐겨찾기">
                  <Icon name="heart" size={22} />
                </button>
              </div>
            </section>
            <section className="view-mode">
              <p>레시피 보기 모드</p>
              <div>
                <button
                  className={!isComplete ? "is-active" : ""}
                  type="button"
                  onClick={showOriginalRecipe}
                >
                  <Icon name="book" size={14} />
                  기존 레시피
                </button>
                <button
                  className={isComplete ? "is-active" : ""}
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
      {isSimpleRecipeOpen && (
        <div
          className="simple-recipe-backdrop p-3"
          role="presentation"
          onMouseDown={event => {
            if (event.target === event.currentTarget) closeSimpleRecipe();
          }}
        >
          <section
            className="simple-recipe-modal p-4 p-md-5"
            role="dialog"
            aria-modal="true"
            aria-labelledby="simple-recipe-title"
          >
            <header className="simple-recipe-modal__header d-flex align-items-start justify-content-between pb-4">
              <div>
                <h2 id="simple-recipe-title" className="mb-2">김치비지찌개</h2>
                <p className="m-0">간단 레시피 · {displayedSteps.length}단계</p>
              </div>
              <button
                className="simple-recipe-modal__close d-grid align-items-center justify-content-center"
                type="button"
                aria-label="간단 레시피 닫기"
                onClick={closeSimpleRecipe}
              >
                ×
              </button>
            </header>
            <div className="simple-recipe-modal__divider" />
            <article className="simple-recipe-step-card d-flex flex-column justify-content-between p-4 p-md-5 my-4">
              <strong>STEP {simpleRecipeStep + 1}</strong>
              <p className="my-auto py-4">{displayedSteps[simpleRecipeStep]}</p>
              <div className="simple-recipe-tags d-flex flex-wrap gap-2">
                {simpleRecipeTags.map(tag => <span className="px-2 py-1" key={tag}>{tag}</span>)}
              </div>
            </article>
            <nav
              className="simple-recipe-controls d-flex align-items-center justify-content-between"
              aria-label="간단 레시피 단계 이동"
            >
              <button
                className="simple-recipe-nav-button px-4 py-2"
                type="button"
                disabled={simpleRecipeStep === 0}
                onClick={() => setSimpleRecipeStep(step => step - 1)}
              >
                이전
              </button>
              <strong>{simpleRecipeStep + 1} / {displayedSteps.length}</strong>
              <button
                className="simple-recipe-nav-button px-4 py-2"
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
      <footer className="recipe-footer">
        <div className="recipe-footer__inner">
          <div>
            <a className="recipe-logo recipe-logo--footer" href="/">
              <span>한끼</span>랩
            </a>
            <p>알레르기와 비건 식단을 고려한 맞춤 레시피를 추천해드려요</p>
          </div>
          <div className="recipe-footer__links">
            <div>
              <strong>서비스</strong>
              <a href="/recipes">레시피목록</a>
              <a href="/recipes">알레르기레시피</a>
              <a href="/recipes">비건레시피</a>
            </div>
            <div>
              <strong>고객지원</strong>
              <a href="/">이용약관</a>
              <a href="/">개인정보처리방침</a>
              <a href="/">문의하기</a>
            </div>
          </div>
          <small>© 2026 한끼랩. 한끼연구소(7조) 제작.</small>
        </div>
      </footer>
    </div>
  );
}

export default RecipeDetailPage;
