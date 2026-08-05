import { useState } from "react";
import "material-icons/iconfont/filled.css";
import "../../styles/global.css";
import "./MyPage.css";

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
    <div className="my-page">
      <div className="container my-page__inner">
        <h2 className="text-title-m my-page__title">
          <span className="material-icons" aria-hidden="true">
            face
          </span>
          My Page
        </h2>

        <section className="profile-card">
          <div className="profile-card__left">
            <label className="profile-card__avatar">
              {photoUrl ? (
                <img src={photoUrl} alt="프로필 사진" />
              ) : (
                <span className="material-icons profile-card__avatar-icon" aria-hidden="true">
                  person
                </span>
              )}
              <span className="material-icons profile-card__avatar-edit" aria-hidden="true">
                photo_camera
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </label>

            <div>
              <p className="text-title-s profile-card__name">{user.name}</p>
              <p className="text-s profile-card__email">{user.email}</p>
            </div>
          </div>

          <div className="profile-card__right">
            <div className="profile-card__favorite-stat">
              <p className="text-subtitle-m profile-card__favorite-count">
                {user.favoriteCount}
              </p>
              <p className="text-xs profile-card__favorite-label">즐겨찾기</p>
            </div>
            <button type="button" className="text-button-m profile-card__favorite-btn">
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
