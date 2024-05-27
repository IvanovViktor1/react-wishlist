import React, { FC, useEffect, useRef } from "react";
import styles from "./infoAbout.module.scss";
import wishlistImg from "../../images/wishlistText1.webp";

const InformationAboutWishlists: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements =
      containerRef.current?.querySelectorAll("h1, h2, p, ul, li");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          } else {
            entry.target.classList.remove(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    elements?.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      elements?.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <div className={styles.textInfoBlock}>
      <div className={styles.imageBlock}></div>
      <div className={styles.containerWithInfo} ref={containerRef}>
        <article>
          <h1>Вишлисты: Зачем они нужны?</h1>
          <div className={styles.description}>
            <section>
              <h2>Что такое вишлисты?</h2>
              <p>
                Вишлист (от англ. wish list — «список желаний») — это список
                товаров или услуг, которые человек хочет получить в подарок или
                приобрести в будущем. Эти списки можно составлять для различных
                поводов: дни рождения, свадьбы, праздники или просто для личного
                пользования.
              </p>
            </section>
            <section>
              <h2>Зачем нужны вишлисты?</h2>
              <ul>
                <li>
                  <strong>Упрощение выбора подарков:</strong> Вишлисты
                  значительно облегчают задачу выбора подарка для ваших друзей и
                  близких. Вместо того чтобы гадать, что именно порадует
                  человека, вы можете просто заглянуть в его вишлист и выбрать
                  что-то из предложенного. Это гарантирует, что ваш подарок
                  будет желанным и полезным.
                </li>
                <li>
                  <strong>Избежание дублирования подарков:</strong> Когда
                  несколько людей покупают подарки для одного человека,
                  существует риск дублирования. Вишлист позволяет избежать таких
                  ситуаций, так как каждый может видеть, что уже куплено, а что
                  еще нет.
                </li>
                <li>
                  <strong>Экономия времени и сил:</strong> Составление и
                  использование вишлиста экономит время и усилия как для
                  дарящего, так и для получателя. Дарящему не нужно тратить часы
                  на поиски подходящего подарка, а получатель может быть уверен,
                  что получит именно то, что ему нужно или хочется.
                </li>
                <li>
                  <strong>Учет предпочтений:</strong> Вишлисты помогают учесть
                  индивидуальные предпочтения и вкусы. Это особенно важно, когда
                  вы не слишком близко знакомы с человеком, но хотите сделать
                  приятное. Просто ознакомьтесь с его вишлистом, и вы точно не
                  ошибетесь с выбором.
                </li>
                <li>
                  <strong>Планирование покупок:</strong> Вишлисты удобны не
                  только для подарков, но и для личного планирования покупок. С
                  их помощью можно отслеживать нужные товары и услуги,
                  планировать бюджет и покупки на будущее.
                </li>
              </ul>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
};

export default InformationAboutWishlists;
