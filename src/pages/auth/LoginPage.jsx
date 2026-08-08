import React, { useState } from "react";
import styles from "./LoginPage.module.css";

const IconKakao = ({ size = 18, color = "var(--black-1)" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: "block" }}>
    <path d="M12 3C6.477 3 2 6.477 2 10.765c0 2.766 1.83 5.19 4.608 6.577-.202.738-.732 2.673-.838 3.084-.133.518.19.512.398.374.164-.11 2.61-1.77 3.666-2.488.718.106 1.458.163 2.166.163 5.523 0 10-3.477 10-7.765C22 6.477 17.523 3 12 3z" />
  </svg>
);

const IconNaver = ({ size = 14, color = "var(--white-1)" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: "block" }}>
    <path d="M16.273 12.845L7.376 0H0v24h7.727v-12.845L16.624 24H24V0h-7.727v12.845z" />
  </svg>
);

export default function LoginPage({ onGoToSignup, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // 회원가입 페이지 이동 공통 함수
  const handleSignupClick = () => {
    if (onGoToSignup) {
      onGoToSignup();
    } else {
      window.location.href = "/signup";
    }
  };

  // 1. 일반 로그인 핸들러
  const handleLogin = e => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setErrorMessage("이메일과 비밀번호를 모두 입력해 주세요.");
      return;
    }

    // 테스트용 로그인 예시 (실제 백엔드 API 연동 시 response 에러 코드/상태값에 맞춰 구현)
    if (email === "test@han77ilab.com" && password === "1234") {
      setErrorMessage("");
      if (onLoginSuccess) {
        onLoginSuccess(email);
      }
    } else {
      // 가입되지 않은 아이디인 경우 회원가입 유도 알림 팝업(confirm) 발생
      const goToSignup = window.confirm(
        "가입되지 않은 계정이거나 비밀번호가 일치하지 않습니다.\n회원가입 페이지로 이동하시겠습니까?",
      );

      if (goToSignup) {
        handleSignupClick(); // 확인 시 회원가입으로 이동
      } else {
        setErrorMessage("아이디 또는 비밀번호가 잘못되었습니다."); // 취소 시 에러 메시지 유지
      }
    }
  };

  // 2. 소셜 로그인 (카카오 / 네이버) 핸들러
  const handleSocialLogin = provider => {
    // 실제 개발자 센터 발급 후 공식 OAuth 주소 연결 예시
    // const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code`;
    // const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code`;

    // 현재는 키 발급 전이므로 소셜 가입 안내 후 회원가입 페이지로 인가 처리
    const isProceed = window.confirm(
      `${provider === "kakao" ? "카카오" : "네이버"} 계정으로 간편 가입 및 로그인을 진행하시겠습니까?`,
    );

    if (isProceed) {
      // 실제 소셜 OAuth 주소가 있을 경우 아래 주석을 해제하면 공식 카카오/네이버 가입창이 뜹니다.
      // window.location.href = provider === "kakao" ? KAKAO_AUTH_URL : NAVER_AUTH_URL;
      handleSignupClick();
    }
  };

  return (
    <div className={styles.outerWrapper} translate="no" lang="ko">
      <div className={styles.splitCard}>
        {/* PC 전용 좌측 초록 브랜드 배너 */}
        <div className={styles.leftBanner}>
          <div>
            <h2 className={`text-subtitle-l ${styles.bannerTitle}`}>
              맛있는 맞춤 식단,
              <br />
              다시 시작해 볼까요?
            </h2>
            <p className={`text-s ${styles.bannerSub}`}>
              로그인하시면 설정해 두신 맞춤 식단 조건과 즐겨찾는
              <br />
              레시피를 바로 확인하실 수 있습니다.
            </p>
          </div>
          <div className={`text-xs ${styles.bannerCopyright}`}>© Han77ilab Platform. All rights reserved.</div>
        </div>

        {/* 우측 로그인 폼 */}
        <div className={styles.rightForm}>
          <div>
            {/* 1. PC 전용 헤더 */}
            <div className={styles.pcHeader}>
              <h3 className={`text-subtitle-l ${styles.formTitle}`}>로그인</h3>
              <p className={`text-s ${styles.formSubtitle}`}>한끼랩 서비스 이용을 위한 계정 정보 입력</p>
            </div>

            {/* 2. 모바일 전용 헤더 */}
            <div className={styles.mobileHeader}>
              <h2 className={`text-subtitle-l ${styles.mobileTitle}`}>
                맛있는 맞춤 식단,
                <br />
                다시 시작해 볼까요?
              </h2>
              <p className={`text-s ${styles.mobileSub}`}>Han77ilab 로그인</p>
            </div>

            <form onSubmit={handleLogin} className={styles.formGroup}>
              {/* 이메일 */}
              <div style={{ marginBottom: "16px" }}>
                <label className={`text-button-s ${styles.label}`}>이메일(아이디)</label>
                <input
                  type="email"
                  className={`text-s ${styles.input}`}
                  placeholder="example@email.com"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value);
                    if (errorMessage) setErrorMessage("");
                  }}
                />
              </div>

              {/* 비밀번호 */}
              <div style={{ marginBottom: "16px" }}>
                <label className={`text-button-s ${styles.label}`}>비밀번호</label>
                <input
                  type="password"
                  className={`text-s ${styles.input}`}
                  placeholder="영문, 숫자 포함 8자 입력"
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage("");
                  }}
                />
              </div>

              {/* 로그인 에러 메시지 노출 */}
              {errorMessage && (
                <div
                  style={{
                    color: "var(--danger)",
                    fontSize: "var(--xsmall)",
                    marginTop: "-8px",
                    marginBottom: "12px",
                    fontWeight: "500",
                  }}
                >
                  {errorMessage}
                </div>
              )}

              {/* 옵션 행 */}
              <div className={`text-s ${styles.optionsRow}`}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={keepLoggedIn}
                    onChange={e => setKeepLoggedIn(e.target.checked)}
                    className={styles.checkbox}
                  />
                  <span>로그인 상태 유지</span>
                </label>
                <span className={`${styles.pcHeader} ${styles.findPasswordLink}`}>비밀번호 찾기</span>
              </div>

              {/* 로그인 버튼 */}
              <button type="submit" className={`text-button-m ${styles.btnPrimaryLarge}`}>
                로그인
              </button>
            </form>

            {/* 모바일 전용 하단 3개 링크 */}
            <div className={`text-s ${styles.mobileFooter}`}>
              <span>아이디 찾기</span> &nbsp;|&nbsp;
              <span>비밀번호 찾기</span> &nbsp;|&nbsp;
              <span onClick={handleSignupClick} className={styles.linkHighlight}>
                회원가입
              </span>
            </div>

            {/* 소셜 구분선 */}
            <div className={styles.dividerContainer}>
              <div className={styles.dividerLine} />
              <span className={`text-xs ${styles.dividerText}`}>또는 소셜 계정으로 로그인</span>
              <div className={styles.dividerLine} />
            </div>

            {/* 소셜 버튼 (카카오 / 네이버 연동) */}
            <div className={styles.socialGrid}>
              <button
                type="button"
                className={`text-button-s ${styles.btnKakao}`}
                onClick={() => handleSocialLogin("kakao")}
              >
                <IconKakao size={18} />
                <span>카카오로 1초 만에 시작</span>
              </button>
              <button
                type="button"
                className={`text-button-s ${styles.btnNaver}`}
                onClick={() => handleSocialLogin("naver")}
              >
                <IconNaver size={14} />
                <span>네이버로 시작하기</span>
              </button>
            </div>

            {/* PC 전용 하단 회원가입 안내 */}
            <div className={`text-s ${styles.pcFooter}`}>
              아직 회원이 아니신가요?
              <span onClick={handleSignupClick} className={styles.linkHighlight}>
                회원가입하기
              </span>
            </div>

            {/* 모바일 최하단 저작권 */}
            <div className={`text-xs ${styles.mobileCopyright}`}>© Han77ilabPlatform. All rights reserved.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
