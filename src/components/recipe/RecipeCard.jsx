




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
      className="cardBorder"
    >
      <div
        className="cardImgaeArea"
      >
        <img src={imageUrl} alt={name} className="cardImage" />
        <div>
          <span className="cardCategory">{category}</span>
          <button className="cardHeart material-icons" aria-label="좋아요">favorite</button>
        </div>

      </div>
      <div>
        <h4
          className="cardTitle"
        >
          {name}
        </h4>
        <p
          className="cardDescription"
        >
          {description}
        </p>

        <div
          className="cardInfoArea"
        >
          <div>
            <div>
              <span className="cardTimer material-icons">timer</span>
              <p>{time}분</p>
            </div>
             <div>
              <span className="cardServes material-icons">person</span>
              <p>{serves}인분</p>
            </div>
            <div>
              <span className="cardLikes material-icons">favorite</span>
              <p>{likes}</p>
            </div>
          </div>
          <p className="cardContry">{contry}</p>
        </div>
        
        
        <div></div>
      </div>
    </div>
  )
}

export default RecipeCard;