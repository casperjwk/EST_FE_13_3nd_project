import React, { useState } from "react";
import SignupStep1 from "./SignupStep1";
import SignupStep2 from "./SignupStep2";

export default function SignupPage() {
  const [step, setStep] = useState(1); // 1: 기본정보, 2: 식단정보선택

  // 회원가입 전체 폼 데이터 통합 관리
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    nickname: "",
    allergies: [],
    veganType: "none",
  });

  // Step 1 ➔ Step 2 이동
  const handleNextStep = step1Data => {
    setSignupData(prev => ({
      ...prev,
      ...step1Data,
    }));
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Step 2 ➔ Step 1 이동
  const handlePrevStep = () => {
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 회원가입 완료 ➔ 메인으로 이동
  const handleCompleteSignup = (step2Data = {}) => {
    const finalData = {
      ...signupData,
      ...step2Data,
    };

    console.log("최종 회원가입 제출 데이터:", finalData);

    alert("회원가입이 완료되었습니다!");
    window.location.href = "/"; // 메인 페이지 이동
  };

  // 로그인 페이지 이동
  const handleGoToLogin = () => {
    window.location.href = "/login";
  };

  return (
    <>
      {step === 1 ? (
        <SignupStep1 onNext={handleNextStep} onGoToLogin={handleGoToLogin} />
      ) : (
        <SignupStep2 onPrev={handlePrevStep} onComplete={handleCompleteSignup} />
      )}
    </>
  );
}
