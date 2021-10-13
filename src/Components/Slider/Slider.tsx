import React from "react";
import classes from "./Slider.module.css";
import icons from "url:../../bootstrap-icons/bootstrap-icons.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";

const testimonies = [
  {
    name: `Galila`,
    location: `Metula, Israel`,
    img: `Images/galila.jpg`,
    testimony: `Stableyez has put my life in order, it helps me remember what i do and how i feel afterwards.`,
  },
  {
    name: `Eldad`,
    location: `Brussls, Belgium`,
    img: `Images/eldad2.jpg`,
    testimony: `After using Stableyez for just one month, I
        discovered what has been effecting my sleep quality. I was so confused before and must have tried everything!`,
  },
  {
    name: `Dor`,
    location: `Tel-Aviv, Israel`,
    img: `Images/dor.jpg`,
    testimony: `I used Stableyez to find out if eating vegan changes my energy level, now i can't stop trying new things with it.`,
  },
];

const Slider = () => {
  const [slide, setSlide] = React.useState<number>(0);

  const sildeLeft = () => {
    const slidePosition = slide;
    setSlide(slidePosition - 1);
  };

  const slideRight = () => {
    const slidePosition = slide;
    setSlide(slidePosition + 1);
  };

  React.useEffect(() => {
    const interval = setTimeout(() => {
      const slidePosition = slide;
      setSlide(slidePosition + 1);
    }, 8000);

    return () => {
      clearTimeout(interval);
    };
  }, [slide]);

  const width: number = window.innerWidth > 500 ? 500 : window.innerWidth - 80;

  const size: string = window.innerWidth > 500 ? "40" : "30";

  return (
    <div className={`${classes.SliderWide} slider`}>
      <button className={classes.SlideButton}>
        <svg onClick={sildeLeft} width={size} height={size} fill="currentColor">
          <use href={`${icons}#arrow-left-circle-fill`} />
        </svg>
      </button>
      <div className={classes.SilderContainer}>
        <div
          className={classes.Slider}
          style={{
            transform: `translateX(-${Math.abs(slide % 3) * width}px)`,
          }}
        >
          {testimonies.map((testimony) => {
            const img = (
              <img
                width="100px"
                height="100px"
                alt={`${testimony.name}-pic`}
                src={testimony.img}
              />
            );

            return (
              <div key={testimony.name} className={classes.Testamony}>
                <div className={classes.Head}>
                  <div className={classes.Name}>
                    <h2>{testimony.name}</h2>
                    <h4>{testimony.location}</h4>
                  </div>
                  <div className={classes.Img}>
                    <LazyLoadImage
                      alt={img.props.alt}
                      height={img.props.height}
                      width={img.props.width}
                      src={img.props.src}
                    />
                  </div>
                </div>
                <p>
                  <strong>"</strong>
                  {testimony.testimony}"
                </p>
              </div>
            );
          })}
        </div>
        <div className={classes.DotsWide}>
          <div className={classes.Dots}>
            {testimonies.map((_, i) => {
              return (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  style={{
                    backgroundColor:
                      Math.abs(slide % 3) === i ? `rgb(236, 54, 141)` : `unset`,
                  }}
                ></button>
              );
            })}
          </div>
        </div>
      </div>
      <button className={classes.SlideButton}>
        <svg
          onClick={slideRight}
          width={size}
          height={size}
          fill="currentColor"
        >
          <use href={`${icons}#arrow-right-circle-fill`} />
        </svg>
      </button>
    </div>
  );
};

export default Slider;
