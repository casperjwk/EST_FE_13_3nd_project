import styles from './HomePage.module.css';

function HomePage() {
  return (
    <div> 
      {/* 히어로 섹션 */}
      <section className={styles['home-hero']}>
        <div className={`container ${styles['home-hero__inner']}`}>
          <div className={styles['home-hero__slide']}>
            <div className={styles['home-hero__text-block']}>
              <h1 className={`text-title-l ${styles['home-hero__title']}`}>
                오늘 뭐 먹지 고민 대신,<br />안심하고 골라보세요
              </h1>
              <p className={`text-m ${styles['home-hero__desc']}`}>
                알레르기와 식단 정보를 알려주시면, 딱 맞는 레시피만 골라드려요
              </p>
            </div>
            {/* TODO: 실제 이미지 경로로 교체 */}
            <img src="" alt="추천 레시피" className={styles['home-hero__image']} />
          </div>

          <div className={styles['home-hero__dots']}>
            <span className={`${styles['home-hero__dot']} ${styles['home-hero__dot--active']}`}></span>
            <span className={styles['home-hero__dot']}></span>
            <span className={styles['home-hero__dot']}></span>
          </div>

          <div className={styles['home-hero__fixed-area']}>
            <div className={styles['home-hero__search-bar']}>
              <input
                type="text"
                placeholder="재료나 메뉴를 검색해보세요"
                className={styles['home-hero__search-input']}
              />
              <button className={`text-button-m ${styles['home-hero__search-btn']}`}>검색</button>
            </div>

            <div className={styles['home-hero__chips-cta']}>
              <div className={styles['home-hero__chips']}>
                <span className={styles['home-hero__chip']}>
                  <span className="material-symbols-outlined">check</span>비건
                </span>
                <span className={styles['home-hero__chip']}>
                  <span className="material-symbols-outlined">check</span>락토
                </span>
                <span className={styles['home-hero__chip']}>
                  <span className="material-symbols-outlined">check</span>오보
                </span>
                <span className={`${styles['home-hero__chip']} ${styles['home-hero__chip--warning']}`}>
                  <span className="material-symbols-outlined">warning</span>우유 제외
                </span>
                <span className={`${styles['home-hero__chip']} ${styles['home-hero__chip--warning']}`}>
                  <span className="material-symbols-outlined">warning</span>난류 제외
                </span>
                <span className={`${styles['home-hero__chip']} ${styles['home-hero__chip--warning']}`}>
                  <span className="material-symbols-outlined">warning</span>땅콩 제외
                </span>
              </div>

              <button className={`text-button-l ${styles['home-hero__cta-btn']}`}>맞춤 레시피 찾기</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;