import style from "./Footer.module.css";

export default function Footer() {
  return (
    <>
      <div className={style.docs}>
        <div className={style.containerFluid}>
          <div className={style.docsBrandContainer}>
            <h2 className={style.docsBrand}>The School of Fire</h2>
          </div>
          <div className={style.docsNavContainer}>
            <ul>
              <li className={style.docsNav}>
                <a
                  className={style.docsLink}
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contact Us
                </a>
              </li>
              <li className={style.docsNav}>
                <a
                  className={style.docsLink}
                  href="https://www.instagram.com/theschooloffiregkkd/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li className={style.docsNav}>
                <a
                  className={style.docsLink}
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </li>
              <li className={style.docsNav}>
                <a
                  className={style.docsLink}
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Documentation
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
