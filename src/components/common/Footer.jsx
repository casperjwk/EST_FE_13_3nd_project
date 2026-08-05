import { Link } from 'react-router';
import styles from './common.module.css';

function Footer() {
  return (
    <footer className={styles['common-footer']}>
      <div className={`container ${styles['common-footer__inner']}`}>
        <div className={styles['common-footer__top']}>
          <div className={styles['common-footer__brand']}>
            <h2 className={styles['common-footer__logo-text']}>한끼랩</h2>
            <p className={styles['common-footer__desc']}>
              알레르기와 비건 식단을 고려한 맞춤 레시피를 추천해드려요
            </p>
          </div>

          <div className={styles['common-footer__links']}>
            <div className={styles['common-footer__link-group']}>
              <h3 className={styles['common-footer__link-title']}>서비스</h3>
              <Link to="/recipes" className={styles['common-footer__link']}>레시피목록</Link>
              <Link to="/recipes?filter=allergy" className={styles['common-footer__link']}>알레르기레시피</Link>
              <Link to="/recipes?filter=vegan" className={styles['common-footer__link']}>비건레시피</Link>
            </div>

            <div className={styles['common-footer__link-group']}>
              <h3 className={styles['common-footer__link-title']}>고객지원</h3>
              <Link to="/terms" className={styles['common-footer__link']}>이용약관</Link>
              <Link to="/privacy" className={styles['common-footer__link']}>개인정보처리방침</Link>
              <Link to="/contact" className={styles['common-footer__link']}>문의하기</Link>
            </div>
          </div>
        </div>

        <p className={styles['common-footer__copyright']}>
          © 2026 한끼랩. 한끼연구소(7조) 제작.
        </p>
      </div>
    </footer>
  );
}

export default Footer;