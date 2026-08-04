import { useState } from "react";
import "material-icons/iconfont/filled.css";
import "../../styles/global.css";
import styles from "./MyPage.module.css";

const user = {
  name: "홍길동",
  email: "example@naver.com",
  favoriteCount: 12,
};

function MyPage() {
  const [photoUrl, setPhotoUrl] = useState(null);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setPhotoUrl(URL.createObjectURL(file));
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
              <span
                className={`material-icons ${styles.profileCardAvatarEdit}`}
                aria-hidden="true"
              >
                photo_camera
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </label>

            <div className={styles.profileCardText}>
              <p className={styles.profileCardName}>{user.name}</p>
              <p className={`text-s ${styles.profileCardEmail}`}>{user.email}</p>
            </div>
          </div>

          <div className={styles.profileCardDivider} />

          <div className={styles.profileCardRight}>
            <div className={styles.profileCardFavoriteStat}>
              <p className={`text-subtitle-m ${styles.profileCardFavoriteCount}`}>
                {user.favoriteCount}
              </p>
              <p className={`text-xs ${styles.profileCardFavoriteLabel}`}>즐겨찾기</p>
            </div>
            <button type="button" className={`text-button-m ${styles.profileCardFavoriteBtn}`}>
              <span className="material-icons" aria-hidden="true">
                favorite_border
              </span>
              즐겨찾기 보기
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default MyPage;
