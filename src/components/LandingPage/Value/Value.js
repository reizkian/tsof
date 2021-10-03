import style from "components/LandingPage/Value/Value.module.css";

export default function Value() {
  return (
    <>
      <section className={style.Value}>
        <div className={style.containerFluidValue}>
          <div className={style.valueVerse}>verse</div>
          <div className={style.valueCardContainer}>
            <div className={style.valueCard}>value1</div>
            <div className={style.valueCard}>value2</div>
            <div className={style.valueCard}>value3</div>
          </div>
        </div>
      </section>
    </>
  );
}
