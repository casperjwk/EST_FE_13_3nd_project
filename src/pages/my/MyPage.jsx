import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import "material-icons/iconfont/filled.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../styles/global.css";
import { supabase } from "../../lib/supabase";
import styles from "./MyPage.module.css";

const user = {
  name: "홍길동",
  email: "example@naver.com",
  favoriteCount: 12,
};

// 수정상태(미선택 버전) 목업 데이터 - allergies를 채우면 "선택됨" 모습도 확인 가능
const dietDraft = {
  allergies: [],
  veganType: "일반",
};

const veganTypes = [
  { id: "general", label: "일반", desc: "제한 없음" },
  {
    id: "flexitarian",
    label: "플렉시테리언",
    desc: "주로 채식, 가끔 육류 허용",
    descBreak: ["주로 채식, ", "가끔 육류 허용"],
    descBreakFrom: "tablet",
  },
  { id: "pollo", label: "플로", desc: "닭고기까지 허용" },
  {
    id: "pesco",
    label: "페스코",
    desc: "생선·해산물까지 허용",
    descBreak: ["생선·해산물까지 ", "허용"],
    descBreakFrom: "desktop",
  },
  { id: "lacto-ovo", label: "락토-오보", desc: "유제품·달걀 허용" },
  { id: "lacto", label: "락토", desc: "유제품만 허용" },
  { id: "ovo", label: "오보", desc: "달걀만 허용" },
  {
    id: "vegan",
    label: "비건",
    desc: "동물성 식품 안전 제외",
    descBreak: ["동물성 식품 ", "안전 제외"],
    descBreakFrom: "desktop",
  },
];

// 최근 본 레시피 목업 데이터 - 나중에 실제 조회 기록으로 교체
const recentRecipes = [
  { id: 1, name: "음식 이름", difficulty: "쉬움", time: 15, servings: 1, likes: 24 },
  { id: 2, name: "음식 이름", difficulty: "보통", time: 15, servings: 1, likes: 24 },
  { id: 3, name: "음식 이름", difficulty: "어려움", time: 15, servings: 1, likes: 24 },
  { id: 4, name: "음식 이름", difficulty: "쉬움", time: 15, servings: 1, likes: 24 },
  { id: 5, name: "음식 이름", difficulty: "보통", time: 15, servings: 1, likes: 24 },
  { id: 6, name: "음식 이름", difficulty: "어려움", time: 15, servings: 1, likes: 24 },
  { id: 7, name: "음식 이름", difficulty: "쉬움", time: 15, servings: 1, likes: 24 },
  { id: 8, name: "음식 이름", difficulty: "보통", time: 15, servings: 1, likes: 24 },
];

const difficultyStyles = {
  쉬움: "recentDifficultyEasy",
  보통: "recentDifficultyNormal",
  어려움: "recentDifficultyHard",
};

function MyPage() {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [allergyOptions, setAllergyOptions] = useState([]);
  const [selectedAllergies, setSelectedAllergies] = useState(dietDraft.allergies);
  const [selectedVeganType, setSelectedVeganType] = useState(dietDraft.veganType);
  const [favoriteRecentIds, setFavoriteRecentIds] = useState(() => new Set());

  useEffect(() => {
    let isActive = true;

    async function loadAllergens() {
      const { data, error } = await supabase.from("allergens").select("id, name");
      if (!isActive) return;
      if (error) {
        console.error("[MyPage] allergens fetch error:", error);
        return;
      }
      setAllergyOptions(data.map(allergen => allergen.name));
    }

    loadAllergens();
    return () => {
      isActive = false;
    };
  }, []);

  const toggleRecentFavorite = id => {
    setFavoriteRecentIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handlePhotoChange = event => {
    const file = event.target.files[0];
    if (!file) return;
    setPhotoUrl(URL.createObjectURL(file));
  };

  const toggleAllergy = allergy => {
    setSelectedAllergies(prev =>
      prev.includes(allergy) ? prev.filter(item => item !== allergy) : [...prev, allergy],
    );
  };

  const recentScrollRef = useRef(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateRecentScrollState = () => {
    const el = recentScrollRef.current;
    if (!el) return;
    setCanScrollPrev(el.scrollLeft > 0);
    setCanScrollNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    updateRecentScrollState();
  }, []);

  const scrollRecent = direction => {
    const el = recentScrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * 215, behavior: "smooth" });
  };

  return (
    <div className={styles.myPage}>
      <div className={`container ${styles.myPageInner}`}>
        <h2 className={styles.myPageTitle}>
          <span className="material-icons" aria-hidden="true">
            face
          </span>
          My Page
        </h2>

        <section className={styles.profileCard}>
          <div className={styles.profileCardLeft}>
            <label
              className={`${styles.profileCardAvatar} ${photoUrl ? "" : styles.profileCardAvatarEmpty}`}
            >
              {photoUrl && <img src={photoUrl} alt="프로필 사진" />}
              <span className={`material-icons ${styles.profileCardAvatarEdit}`} aria-hidden="true">
                photo_camera
              </span>
              <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
            </label>

            <div className={styles.profileCardText}>
              <p className={styles.profileCardName}>{user.name}</p>
              <p className={styles.profileCardEmail}>{user.email}</p>
            </div>
          </div>

          <div className={styles.profileCardDivider} />

          <div className={styles.profileCardRight}>
            <div className={styles.profileCardFavoriteStat}>
              <p className={styles.profileCardFavoriteCount}>{user.favoriteCount}</p>
              <p className={styles.profileCardFavoriteLabel}>즐겨찾기</p>
            </div>
            <Link to="/favorite" className={styles.profileCardFavoriteBtn}>
              <span className="material-icons" aria-hidden="true">
                favorite_border
              </span>
              즐겨찾기 보기
            </Link>
          </div>
        </section>

        <section className={styles.dietCard}>
          <div className={styles.dietCardHeader}>
            <h3 className={styles.dietCardTitle}>식단 정보</h3>
            <div className={styles.dietEditActions}>
              <button type="button" className={styles.dietCancelBtn}>
                <span className="material-icons" aria-hidden="true">
                  close
                </span>
                취소
              </button>
              <button type="button" className={styles.dietSaveBtn}>
                <span className="material-icons" aria-hidden="true">
                  save
                </span>
                저장
              </button>
            </div>
          </div>

          <div className={styles.dietRow}>
            <p className={styles.dietLabel}>
              <span className={`material-icons ${styles.dietLabelIconWarning}`} aria-hidden="true">
                warning_amber
              </span>
              알레르기 정보
            </p>
            <p className={`${styles.dietDescription} ${styles.allergyDescription}`}>
              해당하는 알레르기를 모두 선택해주세요. 레시피 검색 시 자동으로 적용됩니다.
            </p>
            <div className={styles.allergyChipGrid}>
              {allergyOptions.map(allergy => (
                <button
                  key={allergy}
                  type="button"
                  onClick={() => toggleAllergy(allergy)}
                  className={`${styles.allergyChip} ${
                    selectedAllergies.includes(allergy) ? styles.allergyChipSelected : ""
                  }`}
                >
                  {allergy}
                </button>
              ))}
            </div>
            {selectedAllergies.length === 0 && (
              <p className={styles.dietNoticeText}>선택한 알레르기가 없습니다.</p>
            )}
          </div>

          <div className={styles.dietRow}>
            <p className={styles.dietLabel}>
              <span className={`material-icons ${styles.dietLabelIconEco}`} aria-hidden="true">
                spa
              </span>
              비건 유형
            </p>
            <p className={styles.dietDescription}>
              비건 유형은 알레르기와 별개 기준입니다. 가장 가까운 식단 유형을 선택하세요.
            </p>
            <div className={styles.veganCardGrid}>
              {veganTypes.map(type => (
                <label key={type.id} className={styles.veganCard}>
                  <input
                    type="radio"
                    name="veganType"
                    className={styles.veganCardRadio}
                    checked={type.label === selectedVeganType}
                    onChange={() => setSelectedVeganType(type.label)}
                  />
                  <span className={styles.veganCardText}>
                    <span className={styles.veganCardLabel}>{type.label}</span>
                    <span className={styles.veganCardDesc}>
                      {type.descBreak ? (
                        <>
                          {type.descBreak[0]}
                          <br
                            className={
                              type.descBreakFrom === "desktop"
                                ? styles.veganCardBreakDesktop
                                : styles.veganCardBreak
                            }
                          />
                          {type.descBreak[1]}
                        </>
                      ) : (
                        type.desc
                      )}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.appliedCard}>
          <h3 className={styles.appliedTitle}>현재 적용 중인 조건</h3>
          <p className={styles.dietDescription}>레시피 검색 시 자동으로 적용되는 조건이에요.</p>
          <div className={styles.dietChipList}>
            {selectedAllergies.map(allergy => (
              <span key={allergy} className={styles.dietChipDanger}>
                {allergy} 제외
              </span>
            ))}
            <span className={styles.dietChipPrimary}>{selectedVeganType}</span>
          </div>
        </section>

        <section className={styles.recentCard}>
          <div className={styles.recentHeader}>
            <h3 className={styles.recentTitle}>최근 본 레시피</h3>
            <div className={styles.recentSlideBtns}>
              <button
                type="button"
                className={styles.recentSlideBtn}
                aria-label="이전 레시피"
                disabled={!canScrollPrev}
                onClick={() => scrollRecent(-1)}
              >
                <span className="material-icons" aria-hidden="true">
                  chevron_left
                </span>
              </button>
              <button
                type="button"
                className={styles.recentSlideBtn}
                aria-label="다음 레시피"
                disabled={!canScrollNext}
                onClick={() => scrollRecent(1)}
              >
                <span className="material-icons" aria-hidden="true">
                  chevron_right
                </span>
              </button>
            </div>
          </div>

          <div
            className={styles.recentScroll}
            ref={recentScrollRef}
            onScroll={updateRecentScrollState}
          >
            {recentRecipes.map(recipe => {
              const isFavorite = favoriteRecentIds.has(recipe.id);
              return (
                <div key={recipe.id} className={styles.recentCardItem}>
                  <div className={styles.recentImageWrap}>
                    <img src="" alt={recipe.name} className={styles.recentImage} />
                    <span
                      className={`${styles.recentDifficulty} ${
                        styles[difficultyStyles[recipe.difficulty]]
                      }`}
                    >
                      {recipe.difficulty}
                    </span>
                    <button
                      type="button"
                      className={`${styles.recentFavoriteBtn} ${
                        isFavorite ? styles.recentFavoriteBtnActive : ""
                      }`}
                      aria-label="즐겨찾기"
                      onClick={() => toggleRecentFavorite(recipe.id)}
                    >
                      <i className={isFavorite ? "fa-solid fa-heart" : "fa-regular fa-heart"} />
                    </button>
                  </div>
                  <div className={styles.recentInfo}>
                    <p className={styles.recentName}>{recipe.name}</p>
                    <div className={styles.recentMeta}>
                      <span className={styles.recentMetaItem}>
                        <span className="material-icons" aria-hidden="true">
                          timer
                        </span>
                        {recipe.time}분
                      </span>
                      <span className={styles.recentMetaItem}>
                        <span className="material-icons" aria-hidden="true">
                          person
                        </span>
                        {recipe.servings}인분
                      </span>
                      <span className={`${styles.recentMetaItem} ${styles.recentMetaItemLikes}`}>
                        <span className="material-icons" aria-hidden="true">
                          favorite
                        </span>
                        {recipe.likes}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

export default MyPage;
