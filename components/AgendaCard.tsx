import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import VideoPlayer from "./VideoPlayer";

const options = {
  renderText: (text: any) => {
    // @ts-ignore
    return text.split("\n").reduce((children, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, textSegment];
    }, []);
  },
};

export default function AgendaCard({ spectacle }: any) {
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
          <picture className="max-w-[90%]">
            <img
              src={`https:${spectacle.fields.image.fields.file.url}`}
              alt={spectacle.fields.image.description}
            />
          </picture>

          <div className="">
            <div className="text-4xl font-titleFont pt-8 md:pt-0">
              {spectacle.fields.title}
            </div>
            <div className="contentfulCardText py-8">
              {documentToReactComponents(spectacle.fields.description, options)}
            </div>

            {spectacle.fields.video ? (
              <div className="md:w-[60%]">
                <VideoPlayer url={spectacle.fields.video} />
              </div>
            ) : null}
          </div>
        </div>
        <hr />
      </motion.div>
    </div>
  );
}
