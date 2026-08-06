import styles from "./recipeCard.module.css";


/*
  카드모서리
    사진부분
      쉬움,보통,어려움
      좋아요 버튼
      사진
    음식 내용 부분
      음식이름
      음식 설명
      시간부분
        15분  인분  좋아요          한식중식
      ai분석 부분
*/
function RecipeCard({
  imageUrl,
  category,
  name,
  description,
  time,
  serves,
  likes,
  contry,
}){
  return(
    <div
      className={styles.cardBorder}
    >
      <div
        className={styles.cardImgaeArea}
      >
        <img src={imageUrl} alt={name} className={styles.cardImage} />
        <div>
          <span className={styles.cardCategory}>{category}</span>
          <button className= {`${styles.cardHeart} material-icons`} aria-label="좋아요">favorite</button>
        </div>

      </div>
      <div>
        <h4
          className={styles.cardTitle}
        >
          {name}
        </h4>
        <p
          className={styles.cardDescription}
        >
          {description}
        </p>

        <div
          className={styles.cardInfoArea}
        >
          <div>
            <div>
              <span className={`${styles.cardTimer} material-icons`}>timer</span>
              <p>{time}분</p>
            </div>
             <div>
              <span className={`${styles.cardTimer} material-icons`}>person</span>
              <p>{serves}인분</p>
            </div>
            <div>
              <span className={`${styles.cardTimer} material-icons`}>favorite</span>
              <p>{likes}</p>
            </div>
          </div>
          <p className={styles.cardContry}>{contry}</p>
        </div>
        
        
        <div></div>
      </div>
    </div>
  )
}

export default RecipeCard;