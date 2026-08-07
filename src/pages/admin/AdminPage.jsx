import React, { useState } from "react";
import logoImg from "../../assets/logo.svg";
import DashboardSection from "./DashboardSection";
import UserDietSection from "./UserDietSection";
import SystemSettingsSection from "./SystemSettingsSection";
import styles from "./AdminPage.module.css";

/* ----------------------------------------------------
   사이드바 전용 단색 라인 SVG 아이콘 모음
---------------------------------------------------- */
const DashboardIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="9" rx="1" />
    <rect x="14" y="3" width="7" height="5" rx="1" />
    <rect x="14" y="12" width="7" height="9" rx="1" />
    <rect x="3" y="16" width="7" height="5" rx="1" />
  </svg>
);

const UserDietIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const SettingsIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const UserAvatarIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

/* ----------------------------------------------------
   AdminPage 메인 컴포넌트
---------------------------------------------------- */
const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className={styles.outerWrapper}>
      {/* 1. 좌측 사이드바 */}
      <aside className={styles.sidebar}>
        <div className={styles.logoArea}>
          {/* Link 대신 a 태그를 사용하여 메인 페이지('/')로 이동 */}
          <a href="/" className={styles.logoLink}>
            <img src={logoImg} alt="한끼랩 로고" className={styles.logoImage} />
          </a>
        </div>

        <nav className={styles.navMenu}>
          {/* GENERAL 카테고리 */}
          <div className={styles.category}>
            <span className={styles.categoryTitle}>GENERAL</span>
            <button
              className={`${styles.navItem} ${activeTab === "dashboard" ? styles.active : ""}`}
              onClick={() => setActiveTab("dashboard")}
            >
              <DashboardIcon />
              <span>대시보드</span>
            </button>
            <button
              className={`${styles.navItem} ${activeTab === "userDiet" ? styles.active : ""}`}
              onClick={() => setActiveTab("userDiet")}
            >
              <UserDietIcon />
              <span>회원 식단 관리</span>
            </button>
          </div>

          {/* SYSTEM 카테고리 */}
          <div className={styles.category}>
            <span className={styles.categoryTitle}>SYSTEM</span>
            <button
              className={`${styles.navItem} ${activeTab === "settings" ? styles.active : ""}`}
              onClick={() => setActiveTab("settings")}
            >
              <SettingsIcon />
              <span>시스템 설정</span>
            </button>
          </div>
        </nav>

        {/* 하단 관리자 프로필 */}
        <div className={styles.profileArea}>
          <div className={styles.avatar}>
            <UserAvatarIcon />
          </div>
          <div>
            <p className={styles.userName}>관리자</p>
            <p className={styles.userRole}>super_admin</p>
          </div>
        </div>
      </aside>

      {/* 2. 우측 메인 콘텐츠 */}
      <main className={styles.mainContent}>
        {activeTab === "dashboard" && <DashboardSection />}
        {activeTab === "userDiet" && <UserDietSection />}
        {activeTab === "settings" && <SystemSettingsSection />}
      </main>
    </div>
  );
};

export default AdminPage;
