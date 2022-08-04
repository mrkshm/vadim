import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState, Fragment } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import VideoPlayer from "./VideoPlayer";
import { Film } from "../lib/types";
import Mp3Comp from "./Mp3Comp";
import ImageComp from "./ImageComp";

const options = {
  renderText: (text: any) => {
    // @ts-ignore
    return text.split("\n").reduce((children, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, textSegment];
    }, []);
  },
};

interface ConcertProps {
  concert: Film;
  // key: string;
}

export default function CinemaCard({ concert }: ConcertProps) {
  const [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const { ref, inView } = useInView();
  const animation = useAnimation();

  useEffect(() => {
    if (inView) {
      animation.start({
        opacity: 1,
        x: 0,
        transition: {
          type: "spring",
          duration: 1.2,
          bounce: 0,
        },
      });
    }

    if (!inView) {
      animation.start({ x: "-100vw", opacity: 0 });
    }
  }, [inView, ref, animation]);

  return (
    <div ref={ref} className="text-textColor">
      <motion.div animate={animation}>
        <div className="grid md:grid-cols-[45%_55%] md:w-full">
          <div className="w-full">
            {concert.fields.video ? (
              <div className="mb-2 max-w-[95%]">
                <VideoPlayer url={concert.fields.video} />
              </div>
            ) : (
              <picture className="max-w-[90%]">
                <img
                  src={`https:${concert.fields.image.fields.file.url}`}
                  alt={concert.fields.image.fields.description}
                  className="max-w-[95%]"
                />
              </picture>
            )}
          </div>
          <div className="mt-4 md:mt-0 md:mx-4 w-screen">
            <div className="text-4xl font-titleFont">
              {concert.fields.title}
            </div>
            <div className="py-4 font-light text-md w-[85%] leading-snug">
              {concert.fields.distribution}
            </div>

            <div className="pb-4 contentfulText w-screen pr-2">
              {documentToReactComponents(concert.fields.description, options)}
            </div>

            <div className="">
              {concert.fields.mp3s
                ? concert.fields.mp3s.map((mp3, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <Mp3Comp mp3={mp3} />
                    </div>
                  ))
                : null}
            </div>
            {/* Images */}
            <div className="mt-4 md:mt-0">
              <div className="flex">
                {concert.fields.video ? (
                  <picture>
                    <img
                      src={`https:${concert.fields.image.fields.file.url}`}
                      alt={concert.fields.image.fields.description}
                      className="max-w-[150px]"
                    />
                  </picture>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <hr />
      </motion.div>
    </div>
  );
}
