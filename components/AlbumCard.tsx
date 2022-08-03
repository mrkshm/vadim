import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState, Fragment } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import VideoPlayer from "./VideoPlayer";
import { Track } from "../lib/types";
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
  concert: any;
  // key: string;
}

export default function AlbumCard({ concert }: ConcertProps) {
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
    <div ref={ref} className="">
      <motion.div animate={animation}>
        <div className="grid md:grid-cols-2">
          <div className="w-[90%]">
            <picture className="max-w-[90%]">
              <img
                src={`https:${concert.fields.cover.fields.file.url}`}
                alt={concert.fields.cover.fields.description}
              />
            </picture>
            <div className="py-4 font-light text-md w-[85%] leading-snug">
              {concert.fields.distribution}
            </div>
          </div>
          <div className="flex flex-col justify-between h-full">
            <div className="">
              <div className="text-4xl font-titleFont">
                {concert.fields.title}
              </div>

              <div className="pt-8 pb-4 contentfulText">
                {documentToReactComponents(concert.fields.description, options)}
              </div>
              {concert.fields.video ? (
                <div className="w-[50%]">
                  <VideoPlayer url={concert.fields.video} />
                </div>
              ) : null}
              {concert.fields.mp3s ? (
                <div className="pt-2">
                  {concert.fields.mp3s.map((mp3: Track) => (
                    <div key={mp3.id} className="flex items-center gap-1">
                      <Mp3Comp mp3={mp3} />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <hr />
      </motion.div>
    </div>
  );
}
