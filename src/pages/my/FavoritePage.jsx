import "material-icons/iconfont/filled.css";
import "../../styles/global.css";
import styles from "./FavoritePage.module.css";

// 즐겨찾기 있는 버전 목업 데이터 - 나중에 Supabase 연동 시 실제 값으로 교체
const favoriteSummary = {
  userName: "홍길동",
  totalCount: 3,
  safeCount: 3,
  replaceableCount: 0,
  warningCount: 0,
  aiReplacedCount: 0,
  appliedConditions: [
    { label: "우유", type: "danger" },
    { label: "돼지고기", type: "danger" },
    { label: "플렉시테리언", type: "primary" },
  ],
};

function FavoritePage() {
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
      </div>
    </div>
  );
}

export default FavoritePage;
