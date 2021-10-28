import React from "react";
import classes from "./DiscoverySection.module.css";
import Discovery from "./Discovery";
import { LazyLoadImage } from "react-lazy-load-image-component";

const discoverers: string[] = [`Galila`, `Dor`, `Eldad`];

const DiscoverySection = () => {
  const [slide, setSlide] = React.useState<number>(0);

  // React.useEffect(() => {
  //   const interval = setTimeout(() => {
  //     const slidePosition = slide;
  //     setSlide(slidePosition + 1);
  //   }, 8000);

  //   return () => {
  //     clearTimeout(interval);
  //   };
  // }, [slide]);

  return (
    <div className={classes.Main}>
      <div
        className={classes.Options}
        // style={{
        //   transform: `translateX(-${Math.abs(slide % 3) * 1000}px)`,
        // }}
      >
        {discoverers.map((discoverer) => {
          const img = (
            <img
              width="100px"
              height="100px"
              alt={`${discoverer}-pic`}
              src={`Images/${discoverer}.jpg`}
            />
          );

          return (
            <div
              key={discoverer}
              className={[classes.Header, classes.Inactive].join(" ")}
            >
              <h1 className={classes.Name}>{`${discoverer}'s Discovery`}</h1>
              <div className={classes.Img}>
                <LazyLoadImage
                  alt={img.props.alt}
                  height={img.props.height}
                  width={img.props.width}
                  src={img.props.src}
                />
              </div>
            </div>
          );
        })}
        {/* <Discovery discoverer="galila" /> */}
      </div>
    </div>
  );
};

export default DiscoverySection;
