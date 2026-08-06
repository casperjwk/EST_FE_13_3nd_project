import React, { useState, useEffect } from "react";
import styles from "./DashboardSection.module.css";

/* ----------------------------------------------------
   1. 심플한 단색 선 SVG 아이콘 컴포넌트 모음
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

const BarChartIcon = () => (
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
    <line x1="12" y1="20" x2="12" y2="10" />
    <line x1="18" y1="20" x2="18" y2="4" />
    <line x1="6" y1="20" x2="6" y2="16" />
  </svg>
);

const PieChartIcon = () => (
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
    <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
    <path d="M22 12A10 10 0 0 0 12 2v10z" />
  </svg>
);

/* ----------------------------------------------------
   2. DashboardSection 메인 컴포넌트
---------------------------------------------------- */
const DashboardSection = () => {
  // 실제 DB/API 연동 시 아래 state에 데이터를 받아와 넣으면 화면에 반영됩니다.
  const [stats, setStats] = useState({
    totalUsers: 1248,
    allergyRatio: 64.8,
    veganUsers: 312,
    totalRecipes: 850,
    monthlyAiSearches: 3420,
  });

  // 추후 실제 API 연동 시 사용할 useEffect 구문 예시
  useEffect(() => {
    // async function fetchDashboardData() {
    //   const data = await getAdminDashboardStats();
    //   setStats(data);
    // }
    // fetchDashboardData();
  }, []);

  const statCards = [
    {
      id: "totalUsers",
      label: "전체 가입 회원",
      value: `${stats.totalUsers.toLocaleString()}명`,
      icon: <UsersIcon />,
    },
    {
      id: "allergyRatio",
      label: "알레르기 보유 비율",
      value: `${stats.allergyRatio}%`,
      icon: <PercentIcon />,
    },
    {
      id: "veganUsers",
      label: "비건 회원 수",
      value: `${stats.veganUsers.toLocaleString()}명`,
      icon: <LeafIcon />,
    },
    {
      id: "totalRecipes",
      label: "레시피 수",
      value: `${stats.totalRecipes.toLocaleString()}개`,
      icon: <BookIcon />,
    },
    {
      id: "monthlyAiSearches",
      label: "월간 AI 검색량",
      value: `${stats.monthlyAiSearches.toLocaleString()}회`,
      icon: <SparklesIcon />,
    },
  ];

  return (
    <div className={styles.container}>
      {/* 1. 상단 타이틀 */}
      <div className={styles.header}>
        <h1 className={styles.title}>대시보드 개요</h1>
        <p className={styles.subtitle}>한끼랩 서비스의 주요 현황 및 AI 식단 대체 통계를 조회합니다.</p>
      </div>

      {/* 2. 요약 지표 카드 5개 */}
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

      {/* 3. 추이 차트 영역 */}
      <div className={styles.chartCard}>
        <div className={styles.chartHeader}>
          <h2 className={styles.chartTitle}>
            <BarChartIcon />
            <span>일별 회원 가입 및 AI 레시피 검색 추이</span>
          </h2>
          <span className={styles.chartSub}>최근 6개월</span>
        </div>
        <div className={styles.chartBox}>[ 꺾은선 차트 영역 : 가입 회원 수 & AI 검색량 추이 ]</div>
      </div>

      {/* 4. 알레르기/비건 비율 차트 영역 */}
      <div className={styles.chartCard}>
        <div className={styles.chartHeader}>
          <h2 className={styles.chartTitle}>
            <PieChartIcon />
            <span>보유 알레르기 & 비건 비율</span>
          </h2>
        </div>
        <div className={styles.chartBox}>[ 도넛 차트 영역 : 우유, 계란, 견과류, 돼지고기, 갑각류 등 ]</div>
      </div>
    </div>
  );
};

export default DashboardSection;
