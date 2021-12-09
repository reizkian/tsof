import style from "./Value.module.css";

export default function Value() {
  return (
    <>
      <section className={style.Value}>
        <div className={style.containerFluidValue}>
          <div className={style.valueVerse}>
            <h3 class={style.valueTitle}> Bertumbuh dan Berbuah</h3>
            <p class={style.valueVerse} align="center">
              Bukan kamu yang memilih Aku, tetapi Akulah yang memilih kamu. Dan
              Aku telah menetapkan kamu, supaya kamu pergi dan menghasilkan buah
              dan buahmu itu tetap, supaya apa yang kamu minta kepada Bapa dalam
              nama-Ku, diberikan-Nya kepadamu.
            </p>
            <p class={style.valueVerse} align="center">
              <b>Yohanes 15 : 16</b>
            </p>
          </div>
          <div className={style.valueCardContainer}>
            <div className={style.valueCard}>
              <img
                class={style.valueCardImage}
                width="75"
                height="75"
                src={require("assets/img/value1.png").default}
                alt=""
              />
              <p class={style.valueVerse}>
                <b>Pergi</b>
              </p>
              <p class={style.valueCardText}>
                Kemana saudara pergi? Saudara pergi ketempat Allah mengutus
                saudara. Apakah saudara seorang pelajar? seorang mahasiswa? atau
                pegawai kantor? Bukan suatu kebetulan saudara pergi ketempat
                tersebut. Itu tempat Allah mengutus saudara. Setiap orang
                percaya adalah seorang utusan Injil!
              </p>
              <p class={style.valueCardText}>
                Saudara diutus oleh Allah ke tempat dimana anda berada.
                Tujuannya adalah Saudara harus menghasilkan buah dan buah
                saudara tinggal tetap.
              </p>
            </div>
            <div className={style.valueCard}>
              <img
                class={style.valueCardImage}
                width="75"
                height="75"
                src={require("assets/img/value2.png").default}
                alt=""
              />
              <p class={style.valueVerse}>
                <b>Menghasilkan Buah</b>
              </p>
              <p class={style.valueCardText}>
                Di dalam Kejadian 1 : 24 terdapat sebuah prinsip reproduksi
                yaitu “masing-masing menurut jenisnya” Mangga menghasilkan
                mangga. Padi menghasilkan beras. Jagung menghasilkan jagung.
                Seorang kristen menghasilkan orang kristen.
              </p>
              <p class={style.valueCardText}>
                Orang percaya juga harus menghasilkan orang percaya. Ini berarti
                buah dari orang percaya adalah petobat yang dihasilkannya dengan
                menjangkau jiwa-jiwa dan membawa mereka kepada Tuhan Yesus
                Kristus
              </p>
            </div>
            <div className={style.valueCard}>
              <img
                class={style.valueCardImage}
                width="60"
                height="75"
                src={require("assets/img/value3.png").default}
                alt=""
              />
              <p class={style.valueVerse}>
                <b>Buah Tinggal Tetap</b>
              </p>
              <p class={style.valueCardText}>
                Satu-satunya cara supaya buah saudara tinggal tetap adalah
                dengan memelihara petobat-petobat yang saudara hasilkan
                (menggembalakan).
              </p>
              <p class={style.valueCardText}>
                Yohanes 21:17 Kata Yesus kepadanya untuk ketigakalinya: “Simon,
                anak Yohanes, apakah engkau mengasihi Aku? Maka sedih hati
                Petrus karena Yesus berkata untuk ketigakalinya: “Apakah engkau
                mengasihi Aku?” Dan Ia berkata kepada-Nya: “Tuhan, Engkau tahu
                segala sesuatu, Engkau tahu, bahwa aku mengasihi Engkau. Kata
                Yesus kepadanya: “Gembalakanlah domba-domba-Ku”
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
