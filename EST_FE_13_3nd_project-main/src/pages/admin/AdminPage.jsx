import React from "react";
import DashboardSection from "./DashboardSection";
import styles from "./AdminPage.module.css";

const AdminPage = () => {
  return (
    <div className={styles.outerWrapper}>
      {/* 1. 좌측 사이드바 */}
      <aside className={styles.sidebar}>
        <div className={styles.logoArea}>
          <div className={styles.logoPlaceholder}>로고</div>
        </div>

        <nav className={styles.navMenu}>
          <div className={styles.category}>
            <span className={styles.categoryTitle}>GENERAL</span>
            <button className={`${styles.navItem} ${styles.active}`}>📊 대시보드</button>
            <button className={styles.navItem}>👥 회원 식단 관리</button>
          </div>

          <div className={styles.category}>
            <span className={styles.categoryTitle}>DATABASE</span>
            <button className={styles.navItem}>🥦 식재료 & 알레르기 DB</button>
            <button className={styles.navItem}>📋 레시피 승인 관리</button>
          </div>

          <div className={styles.category}>
            <span className={styles.categoryTitle}>SYSTEM</span>
            <button className={styles.navItem}>⚙️ 시스템 설정</button>
          </div>
        </nav>

        <div className={styles.profileArea}>
          <div className={styles.avatar}>👤</div>
          <div>
            <p className={styles.userName}>관리자</p>
            <p className={styles.userRole}>super_admin</p>
          </div>
        </div>
      </aside>

      {/* 2. 우측 메인 대시보드 콘텐츠 */}
      <main className={styles.mainContent}>
        <DashboardSection />
      </main>
    </div>
  );
};

export default AdminPage;
