<<<<<<< HEAD
import React, { useState } from "react";
import styles from "./UserDietSection.module.css";

/* ----------------------------------------------------
   단색 선 SVG 아이콘 모음
---------------------------------------------------- */
const UsersIcon = () => (
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

const PercentIcon = () => (
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
    <line x1="19" y1="5" x2="5" y2="19" />
    <circle cx="6.5" cy="6.5" r="2.5" />
    <circle cx="17.5" cy="17.5" r="2.5" />
  </svg>
);

const LeafIcon = () => (
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
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.4 19 2c1 2 2 4.1 2 9 0 4.5-4 9-10 9z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

const BookIcon = () => (
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
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const SparklesIcon = () => (
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
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z" />
  </svg>
);

const AlertTriangleIcon = () => (
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
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const HeartIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const UserAvatarIcon = () => (
  <svg
    width="28"
    height="28"
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
   UserDietSection 메인 컴포넌트
---------------------------------------------------- */
const UserDietSection = () => {
  const [stats] = useState({
    totalUsers: 1248,
    allergyRatio: 64.8,
    veganUsers: 312,
    totalRecipes: 850,
    monthlyAiSearches: 3420,
  });

  const [userInfo] = useState({
    name: "관리자",
    status: "정상 회원",
    email: "hon77lab@naver.com",
    joinDate: "2026-00-00",
    favoritesCount: 12,
    allergies: ["우유", "돼지고기"],
    veganType: {
      name: "플렉시테리언 (Flexitarian)",
      status: "현재 적용 중",
      description: "주로 채식을 지향하지만, 상황에 따라 가끔 육류 소비를 허용하는 단계입니다.",
    },
    appliedConditions: [
      { text: "우유 제외", type: "danger" },
      { text: "돼지고기 제외", type: "danger" },
      { text: "플렉시테리언 가이드", type: "primary" },
    ],
  });

  const statCards = [
    { id: "totalUsers", label: "전체 가입 회원", value: `${stats.totalUsers.toLocaleString()}명`, icon: <UsersIcon /> },
    { id: "allergyRatio", label: "알레르기 보유 비율", value: `${stats.allergyRatio}%`, icon: <PercentIcon /> },
    { id: "veganUsers", label: "비건 회원 수", value: `${stats.veganUsers.toLocaleString()}명`, icon: <LeafIcon /> },
    { id: "totalRecipes", label: "레시피 수", value: `${stats.totalRecipes.toLocaleString()}개`, icon: <BookIcon /> },
    {
      id: "monthlyAiSearches",
      label: "월간 AI 검색량",
      value: `${stats.monthlyAiSearches.toLocaleString()}회`,
      icon: <SparklesIcon />,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>회원 맞춤 식단 DB 관리자</h1>
        <p className={styles.subtitle}>등록된 회원의 알레르기 및 비건 조건 데이터를 조회하고 수정합니다.</p>
      </div>

      <div className={styles.statsGrid}>
        {statCards.map(item => (
          <div key={item.id} className={styles.statCard}>
            <span className={styles.statLabel}>{item.label}</span>
            <div className={styles.statValueWrapper}>
              <span className={styles.statValue}>{item.value}</span>
              <span className={styles.statIcon}>{item.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.contentCard}>
        <h2 className={styles.cardTitle}>식단 정보</h2>

        <div className={styles.userProfileBox}>
          <div className={styles.userInfoGroup}>
            <div className={styles.userAvatar}>
              <UserAvatarIcon />
            </div>
            <div className={styles.userDetails}>
              <div className={styles.userNameWrapper}>
                <span className={styles.userName}>{userInfo.name}</span>
                <span className={styles.statusBadge}>{userInfo.status}</span>
              </div>
              <p className={styles.userEmail}>{userInfo.email}</p>
              <p className={styles.userJoinDate}>가입일: {userInfo.joinDate}</p>
            </div>
          </div>

          <div className={styles.favoriteAction}>
            <div className={styles.favoriteCount}>{userInfo.favoritesCount}</div>
            <button className={styles.favoriteBtn}>
              <HeartIcon />
              <span>즐겨찾기 보기</span>
            </button>
          </div>
        </div>

        <div className={styles.sectionBlock}>
          <div className={styles.sectionHeader}>
            <h3 className={`${styles.sectionTitle} ${styles.dangerTitle}`}>
              <AlertTriangleIcon />
              <span>보유 알레르기 (회원 직접 등록)</span>
            </h3>
            <span className={styles.itemCount}>총 {userInfo.allergies.length}개 항목 등록됨</span>
          </div>
          <div className={styles.tagList}>
            {userInfo.allergies.map((allergy, idx) => (
              <span key={idx} className={styles.dangerTag}>
                {allergy}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.sectionBlock}>
          <h3 className={`${styles.sectionTitle} ${styles.primaryTitle}`}>
            <LeafIcon />
            <span>지정 비건 유형</span>
          </h3>
          <div className={styles.veganBox}>
            <div className={styles.veganIconBox}>
              <LeafIcon />
            </div>
            <div>
              <div className={styles.veganNameWrapper}>
                <span className={styles.veganName}>{userInfo.veganType.name}</span>
                <span className={styles.veganBadge}>{userInfo.veganType.status}</span>
              </div>
              <p className={styles.veganDesc}>{userInfo.veganType.description}</p>
            </div>
          </div>
        </div>

        <div className={styles.sectionBlock}>
          <h3 className={styles.sectionTitle}>현재 적용 중인 조건</h3>
          <div className={styles.tagList}>
            {userInfo.appliedConditions.map((cond, idx) => (
              <span
                key={idx}
                className={`${styles.appliedTag} ${
                  cond.type === "danger" ? styles.dangerNotice : cond.type === "primary" ? styles.primaryNotice : ""
                }`}
              >
                {cond.text}
              </span>
            ))}
          </div>
        </div>
      </div>
=======
import React from "react";

const UserDietSection = () => {
  return (
    <div>
      <h2>회원 맞춤 식단 DB 관리자</h2>
      <p>등록된 회원의 알레르기 및 비건 조건 데이터를 조회하고 수정합니다.</p>
>>>>>>> main
    </div>
  );
};

export default UserDietSection;
