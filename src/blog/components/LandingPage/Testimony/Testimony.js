import style from "../Value/Value.module.css";
import styleCustom from "./Testimony.module.css";

export default function Value() {
  return (
    <>
      <section className={style.Testimony}>
        <div className={style.containerFluidValue}>
          <div className={style.valueVerse}>
            <h3 class={style.valueTitle}> Kesaksian</h3>
            <p class={style.valueVerse} align="center">
              Mereka yang sudah menyelesaikan kelas pengajaran bersaksi atas apa
              yang mereka peroleh
            </p>
          </div>
          <div className={style.valueCardContainer}>
            <div className={styleCustom.valueCard}>
              <img
                class={style.valueCardImage}
                width="75"
                height="75"
                src={require("assets/img/joel.png").default}
                alt=""
              />
              <p class={style.valueVerse}>
                <b>Joel Abdipatra</b>
              </p>
              <p class={styleCustom.occ}>SMA Debrito Yogyakarta</p>
              <p class={style.valueCardText}>
                Di kelas Murid Kristus aku belajar banyak tentang dasar-dasar
                kekristenan. Hal yang utama adalah aku diselamatkan karena Tuhan
                Yesus begitu mengasihiku.
              </p>
              <div className={styleCustom.chipContainer}>
                <div className={styleCustom.chipButton}>
                  <p className={styleCustom.mk} >Murd Kristus</p>
                </div>
                <div className={styleCustom.chipDate}>
                  <p className={styleCustom.date}>18 Mei 2020</p>
                </div>
              </div>
            </div>
            <div className={styleCustom.valueCard}>
              <img
                class={style.valueCardImage}
                width="71"
                height="75"
                src={require("assets/img/melvin.png").default}
                alt=""
              />
              <p class={style.valueVerse}>
                <b>Melvin Aurel</b>
              </p>
              <p class={styleCustom.occ}>Mahasiswa Farmasi UGM Yogyakarta</p>
              <p class={style.valueCardText}>
                Kelas Pekerja Kristus menanamkan nilai-nilai kekristenan dalam
                kehidupan sehari-hari mulai dari keuangan, pasangan hidup, dan
                berkomunitas.
              </p>
              <div className={styleCustom.chipContainer}>
                <div className={styleCustom.chipButton}>
                  <p className={styleCustom.pk}>Pekerja Kristus</p>
                </div>
                <div className={styleCustom.chipDate}>
                  <p className={styleCustom.date}>18 Mei 2020</p>
                </div>
              </div>
            </div>
            <div className={styleCustom.valueCard}>
              <img
                class={style.valueCardImage}
                width="70"
                height="75"
                src={require("assets/img/marco.png").default}
                alt=""
              />
              <p class={style.valueVerse}>
                <b>Marco Christian Cibro</b>
              </p>
              <p class={styleCustom.occ}>Mahasiswa Teknik UGM Yogyakarta</p>
              <p class={style.valueCardText}>
                Setelah mengikuti kelas Hamba Kristus saya mengerti tujuan-Nya
                untuk apa saya diciptakan. Dengan ini saya yakin akan panggilan
                Tuhan atas hidup saya.
              </p>
              <div className={styleCustom.chipContainer}>
                <div className={styleCustom.chipButton}>
                  <p className={styleCustom.hk}>Hamba Kristus</p>
                </div>
                <div className={styleCustom.chipDate}>
                  <p className={styleCustom.date}>18 Mei 2020</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
