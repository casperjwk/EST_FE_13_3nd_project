import styles from './HomePage.module.css';

function HomePage() {
  return (
    <div>
      {/* 히어로 */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <h1 className={`text-title-l ${styles.heroTitle}`}>
              오늘 뭐 먹지 고민 대신,<br />안심하고 골라보세요
            </h1>
            <p className={`text-s ${styles.heroDesc}`}>
              알레르기와 식단 정보를 알려주시면, 딱 맞는 레시피만 골라드려요
            </p>
          </div>
          <div className={styles.heroImage}></div>
        </div>

        <div className={`container ${styles.fixedArea}`}>
          <div className={styles.searchRow}>
            <input
              type="text"
              placeholder="재료나 메뉴를 검색해보세요"
              className={styles.searchInput}
            />
            <button className={`text-button-s ${styles.searchBtn}`}>검색</button>
          </div>

          <div className={styles.chipRow}>
            <span className={`text-xs ${styles.chip}`}>✓ 비건</span>
            <span className={`text-xs ${styles.chip}`}>✓ 락토</span>
            <span className={`text-xs ${styles.chip}`}>✓ 오보</span>
            <span className={`text-xs ${styles.chipWarning}`}>△ 우유 제외</span>
          </div>

          <button className={`text-button-m ${styles.ctaBtn}`}>맞춤 레시피 찾기</button>
        </div>
      </section>
    </div>
  );
}

export default HomePage;