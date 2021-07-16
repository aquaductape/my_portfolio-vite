import whoamiImg from "../../assets/img/whoami.jpg";

const WhoAmI = () => {
  return (
    <section class="whoami">
      <h2 class="section-title">who am I</h2>
      <div class="content">
        <p class="intro">
          My name is Caleb{" "}
          <span>
            <img
              src={whoamiImg}
              alt="Caleb staring into distance"
              height="30px"
              width="30px"
              loading="lazy"
            />
          </span>
        </p>
        <p>
          Growing up I have lived in different places such as England and
          Tajikistan. Experiencing different environments are highlights in my
          childhood.
        </p>
        <p>
          I got hooked into Web development several years ago and stayed since
          because it's an evolving crazy beast.
        </p>
        <p>
          Tech/standards become deprecated, while new ones either replace or
          disrupt them. You gotta make sure your intricate app works anywhere,
          is fast and has solid design.{" "}
        </p>
        <p>
          When I'm not coding, I enjoy hanging out with family and friends,
          especially during the holidays!
        </p>
        <figure>
          <blockquote>
            <p>
              And we are never going to find the new unless we get a little
              crazy...
            </p>
          </blockquote>
          <figcaption>— Need for Madness</figcaption>
        </figure>
      </div>
    </section>
  );
};

export default WhoAmI;
