import style from "components/LandingPage/Features/Features.module.css";

export default function Title() {
  return (
    <>
      <section className={style.containerFluidFeatures}>
        <div className={style.containerFeaturesTitle}>
          <img
            class={style.featuresIcon}
            src={require("assets/img/plant.png").default}
            alt="https://drive.google.com/uc?export=view&id=1rSaqlm1Cx8b3XswSFp3y53xYG_oCuNog"
          />
          <h1 class={style.featuresTitle}>
            Belajar Firman Tuhan di dampingi oleh konselor
          </h1>
          <p class={style.featuresSubTitle}>
            Konselor akan membina dan menuntun pertumbuhan rohani saudara selama
            kelas. Mereka akan selalu mengingatkan saudara untuk tidak lupa saat
            teduh dan berdoa. Mereka akan membantu saudara untuk memahami
            dasar-dasar kekristenan.
          </p>
        </div>
        <div className={style.containerFeaturesImage}>
          <img
            class={style.featuresImage}
            src={require("assets/img/features.png").default}
            alt="https://drive.google.com/uc?export=view&id=1rSaqlm1Cx8b3XswSFp3y53xYG_oCuNog"
          />
        </div>
      </section>
    </>
  );
}
