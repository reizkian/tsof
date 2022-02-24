import style from "./views/KelasPengajaran/KelasPengajaranRoot.module.css";
import NavBar from "../system/views/RegisterPage/NavBar/NavBar.js";
import Title from "../system/views/RegisterPage/Title/Title.js";
import Footer from "./views/LandingPage/Footer/Footer.js";
import Course from "./views/KelasPengajaran/Course/Course.js";

export default function KelasPengajaran() {
  const course = [
    {
      title: "Kelas Murid Kristus",
      caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec lorem mauris. Donec iaculis, nibh vitae dictum tristique, nunc augue scelerisque orci, eu pharetra neque ex eget ligula. Aliquam sit amet nunc vitae sem cursus gravida at vel sapien. Etiam ultrices libero in nisi congue, in pulvinar orci dapibus. Ut id nibh ut ante convallis gravida. Sed magna nunc, convallis quis laoreet sed, viverra eget orci. Donec tempor massa leo, at pellentesque risus accumsan laoreet.",
      src: require("assets/img/0MK.png").default,
    },
    {
      title: "Kelas Pekerja Kristus",
      caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec lorem mauris. Donec iaculis, nibh vitae dictum tristique, nunc augue scelerisque orci, eu pharetra neque ex eget ligula. Aliquam sit amet nunc vitae sem cursus gravida at vel sapien. Etiam ultrices libero in nisi congue, in pulvinar orci dapibus. Ut id nibh ut ante convallis gravida. Sed magna nunc, convallis quis laoreet sed, viverra eget orci. Donec tempor massa leo, at pellentesque risus accumsan laoreet. Suspendisse ligula nibh, pharetra vel sagittis et, accumsan at leo. Sed iaculis vulputate turpis ac rhoncus. Aliquam ut dignissim tortor, vitae pharetra neque. Vivamus at nisl vehicula, suscipit lorem at, elementum neque. In hac habitasse platea dictumst. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur lacinia nunc sit amet fermentum vehicula. Nunc sed ligula mattis, blandit ligula sed, faucibus massa.",
      src: require("assets/img/1PK.png").default,
    },
    {
      title: "Kelas Hamba Kristus",
      caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec lorem mauris. Donec iaculis, nibh vitae dictum tristique, nunc augue scelerisque orci, eu pharetra neque ex eget ligula. Aliquam sit amet nunc vitae sem cursus gravida at vel sapien. Etiam ultrices libero in nisi congue, in pulvinar orci dapibus. Ut id nibh ut ante convallis gravida. Sed magna nunc, convallis quis laoreet sed, viverra eget orci. Donec tempor massa leo, at pellentesque risus accumsan laoreet. Suspendisse ligula nibh, pharetra vel sagittis et, accumsan at leo. Sed iaculis vulputate turpis ac rhoncus. Aliquam ut dignissim tortor, vitae pharetra neque. Vivamus at nisl vehicula, suscipit lorem at, elementum neque. In hac habitasse platea dictumst.",
      src: require("assets/img/2HK.png").default,
    }]

  return (
    <>
      <div className={style.containerFluid}>
        <NavBar />
        <Title />
        <div class={style.dividerContainer}>
          <img
            className={style.divider}
            src={require("assets/img/divider.png").default}
            alt="https://drive.google.com/uc?export=view&id=1rSaqlm1Cx8b3XswSFp3y53xYG_oCuNog"
          />
        </div>
        {course.map((eachCourse)=>(
          <Course title={eachCourse.title} caption={eachCourse.caption} src={eachCourse.src}/>
        ))}
        <Footer />
      </div>
    </>
  );
}
