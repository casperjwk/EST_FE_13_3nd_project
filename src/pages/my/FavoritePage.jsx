import { useState } from "react";
import "material-icons/iconfont/filled.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../styles/global.css";
import styles from "./FavoritePage.module.css";

// 즐겨찾기 있는 버전 목업 데이터 - 나중에 Supabase 연동 시 실제 값으로 교체
const favoriteSummary = {
  userName: "홍길동",
  totalCount: 5,
  safeCount: 5,
  replaceableCount: 0,
  warningCount: 0,
  aiReplacedCount: 0,
  appliedConditions: [
    { label: "우유", type: "danger" },
    { label: "돼지고기", type: "danger" },
    { label: "플렉시테리언", type: "primary" },
  ],
};

// 즐겨찾기 레시피 카드 목업 데이터 - 나중에 실제 즐겨찾기 목록으로 교체
const favoriteRecipes = [
  {
    id: 1,
    name: "음식 이름",
    description: "음식설명음식설명음식설명음식설명음식설명음식설명음식설명음식설명음식설명",
    difficulty: "쉬움",
    time: 15,
    servings: 1,
    likes: 24,
    status: "safe",
  },
  {
    id: 2,
    name: "음식 이름",
    description: "음식설명음식설명음식설명음식설명음식설명음식설명음식설명음식설명음식설명",
    difficulty: "보통",
    time: 15,
    servings: 1,
    likes: 24,
    status: "replaceable",
  },
  {
    id: 3,
    name: "음식 이름",
    description: "음식설명음식설명음식설명음식설명음식설명음식설명음식설명음식설명음식설명",
    difficulty: "어려움",
    time: 15,
    servings: 1,
    likes: 24,
    status: "warning",
  },
  {
    id: 4,
    name: "음식 이름",
    description: "음식설명음식설명음식설명음식설명음식설명음식설명음식설명음식설명음식설명",
    difficulty: "쉬움",
    time: 15,
    servings: 1,
    likes: 24,
    status: "replaced",
  },
  {
    id: 5,
    name: "음식 이름",
    description: "음식설명음식설명음식설명음식설명음식설명음식설명음식설명음식설명음식설명",
    difficulty: "보통",
    time: 15,
    servings: 1,
    likes: 24,
    status: "safe",
  },
];

const difficultyStyles = {
  쉬움: "cardDifficultyEasy",
  보통: "cardDifficultyNormal",
  어려움: "cardDifficultyHard",
};

const statusConfig = {
  safe: {
    title: "안전",
    desc: "제한 재료 없음",
    rightIcon: "check",
    rightText: "안전",
    colorClass: "cardStatusSafe",
  },
  replaceable: {
    title: "대체 가능",
    desc: "대체 재료 추천 있음",
    rightIcon: "arrow_forward",
    rightText: "추천 보기",
    colorClass: "cardStatusReplace",
  },
  warning: {
    title: "주의 감지",
    desc: "알레르기 재료 포함",
    rightIcon: "arrow_forward",
    rightText: "상세 확인",
    colorClass: "cardStatusWarning",
  },
  replaced: {
    title: "AI 대체 완료",
    desc: "맞춤 대체 레시피 준비됨",
    rightIcon: "arrow_forward",
    rightText: "대체 레시피 보기",
    colorClass: "cardStatusReplaced",
  },
};

function FavoritePage() {
  const [favoriteIds, setFavoriteIds] = useState(() => new Set());

  const toggleFavorite = id => {
    setFavoriteIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={styles.favoritePage}>
      <div className={`container ${styles.favoritePageInner}`}>
        <h2 className={styles.title}>
          즐겨찾기
          <span className={styles.countBadge}>{favoriteSummary.totalCount}개</span>
        </h2>
        <p className={styles.subtitle}>저장한 레시피를 내 식단 조건에 맞게 확인했어요.</p>

        <section className={styles.summaryCard}>
          <div className={styles.summaryTop}>
            <div className={styles.summaryHeader}>
              <p className={styles.summaryTitle}>
                <span className={`material-icons ${styles.summaryTitleSparkle}`} aria-hidden="true">
                  auto_fix_high
                </span>
                <span className={styles.summaryTitleHighlight}>식단 조건 요약</span>
                <span className={`material-icons ${styles.summaryTitleDivider}`} aria-hidden="true">
                  horizontal_rule
                </span>
                <span className={styles.summaryTitleMuted}>
                  {favoriteSummary.userName}님의 즐겨찾기 {favoriteSummary.totalCount}개 기준
                </span>
              </p>
              <span className={styles.summaryStatusBadge}>
                <span className="material-icons" aria-hidden="true">
                  smart_toy
                </span>
                확인 완료
              </span>
            </div>

            <div className={styles.summaryStats}>
              <div className={styles.statItem}>
                <p className={`${styles.statNumber} ${styles.statColorSafe}`}>
                  {favoriteSummary.safeCount}
                </p>
                <p className={`${styles.statLabel} ${styles.statColorSafe}`}>안전</p>
                <p className={styles.statDesc}>안전 레시피</p>
              </div>
              <div className={styles.statItem}>
                <p className={`${styles.statNumber} ${styles.statColorReplace}`}>
                  {favoriteSummary.replaceableCount}
                </p>
                <p className={`${styles.statLabel} ${styles.statColorReplace}`}>대체 가능</p>
                <p className={styles.statDesc}>대체 재료 추천</p>
              </div>
              <div className={styles.statItem}>
                <p className={`${styles.statNumber} ${styles.statColorWarning}`}>
                  {favoriteSummary.warningCount}
                </p>
                <p className={`${styles.statLabel} ${styles.statColorWarning}`}>주의 감지</p>
                <p className={styles.statDesc}>알레르기 포함</p>
              </div>
              <div className={styles.statItem}>
                <p className={`${styles.statNumber} ${styles.statColorReplaced}`}>
                  {favoriteSummary.aiReplacedCount}
                </p>
                <p className={`${styles.statLabel} ${styles.statColorReplaced}`}>AI 대체 완료</p>
                <p className={styles.statDesc}>대체 레시피</p>
              </div>
            </div>
          </div>

          <div className={styles.appliedConditions}>
            <p className={styles.appliedLabel}>적용 조건</p>
            <div className={styles.conditionChipList}>
              {favoriteSummary.appliedConditions.map(condition => (
                <span
                  key={condition.label}
                  className={
                    condition.type === "danger"
                      ? styles.conditionChipDanger
                      : styles.conditionChipPrimary
                  }
                >
                  {condition.label}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className={styles.cardGrid}>
          {favoriteRecipes.map(recipe => {
            const isFavorite = favoriteIds.has(recipe.id);
            return (
              <div key={recipe.id} className={styles.cardItem}>
                <div className={styles.cardImageWrap}>
                  <img src="" alt={recipe.name} className={styles.cardImage} />
                  <span
                    className={`${styles.cardDifficulty} ${styles[difficultyStyles[recipe.difficulty]]}`}
                  >
                    {recipe.difficulty}
                  </span>
                  <button
                    type="button"
                    className={`${styles.cardFavoriteBtn} ${
                      isFavorite ? styles.cardFavoriteBtnActive : ""
                    }`}
                    aria-label="즐겨찾기"
                    onClick={() => toggleFavorite(recipe.id)}
                  >
                    <i className={isFavorite ? "fa-solid fa-heart" : "fa-regular fa-heart"} />
                  </button>
                </div>
                <div className={styles.cardInfo}>
                  <p className={styles.cardName}>{recipe.name}</p>
                  <p className={styles.cardDescription}>{recipe.description}</p>
                  <div className={styles.cardMeta}>
                    <span className={styles.cardMetaItem}>
                      <span className="material-icons" aria-hidden="true">
                        timer
                      </span>
                      {recipe.time}분
                    </span>
                    <span className={styles.cardMetaItem}>
                      <span className="material-icons" aria-hidden="true">
                        person
                      </span>
                      {recipe.servings}인분
                    </span>
                    <span className={`${styles.cardMetaItem} ${styles.cardMetaItemLikes}`}>
                      <span className="material-icons" aria-hidden="true">
                        favorite
                      </span>
                      {recipe.likes}
                    </span>
                  </div>
                  <div
                    className={`${styles.cardStatus} ${styles[statusConfig[recipe.status].colorClass]}`}
                  >
                    <span className={styles.cardStatusLeft}>
                      <span className="material-icons" aria-hidden="true">
                        smart_toy
                      </span>
                      <span className={styles.cardStatusText}>
                        <span className={styles.cardStatusTitle}>
                          {statusConfig[recipe.status].title}
                        </span>
                        <span className={styles.cardStatusDesc}>
                          {statusConfig[recipe.status].desc}
                        </span>
                      </span>
                    </span>
                    <span className={styles.cardStatusRight}>
                      {recipe.status === "safe" && (
                        <span className="material-icons" aria-hidden="true">
                          {statusConfig[recipe.status].rightIcon}
                        </span>
                      )}
                      {statusConfig[recipe.status].rightText}
                      {recipe.status !== "safe" && (
                        <span className="material-icons" aria-hidden="true">
                          {statusConfig[recipe.status].rightIcon}
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FavoritePage;
