import { useState } from 'react';
import hero1 from '../../assets/hero1.png';
import hero2 from '../../assets/hero2.png';
import hero3 from '../../assets/hero3.png';
import styles from './HomePage.module.css';

const SLIDES = [
  {
    title: (
      <>오늘 뭐 먹지 고민 대신,<br />안심하고 골라보세요</>
    ),
    desc: '알레르기와 식단 정보를 알려주시면, 딱 맞는 레시피만 골라드려요',
    image: hero1,
  },
  {
    title: 'AI가 위험재료 찾아줘요',
    desc: '레시피 재료 중 알레르기 위험 요소를 AI가 자동으로 분석해드려요',
    image: hero2,
  },
  {
    title: '대체재료로 바꿔줘요',
    desc: '위험한 재료는 안전한 대체재료로 바꿔서 레시피를 완성해드려요',
    image: hero3,
  },
];

function HomePage() {
  const [current, setCurrent] = useState(0);

  return (
    <div className={styles['home-page']}>
      <section className={styles['home-hero']}>
        <div className={`container ${styles['home-hero__inner']}`}>
          <div className={styles['home-hero__track-wrapper']}>
            <div
              className={styles['home-hero__track']}
              style={{
                width: `${SLIDES.length * 100}%`,
                transform: `translateX(-${(100 / SLIDES.length) * current}%)`,
              }}
            >
              {SLIDES.map((slide, index) => (
                <div
                  className={styles['home-hero__slide']}
                  key={index}
                  style={{ width: `${100 / SLIDES.length}%` }}
                >
                  <div className={styles['home-hero__text-block']}>
                    <h1 className={`text-title-l ${styles['home-hero__title']}`}>
                      {slide.title}
                    </h1>
                    <p className={`text-m ${styles['home-hero__desc']}`}>
                      {slide.desc}
                    </p>
                  </div>
                  <img src={slide.image} alt={slide.desc} className={styles['home-hero__image']} />
                </div>
              ))}
            </div>
          </div>

          <div className={styles['home-hero__dots']}>
            {SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`${styles['home-hero__dot']} ${
                  index === current ? styles['home-hero__dot--active'] : ''
                }`}
                aria-label={`${index + 1}번째 슬라이드`}
              ></button>
            ))}
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