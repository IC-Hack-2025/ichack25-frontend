"use client";
import { useEffect, useId, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useOutsideClick } from "./hooks/use-outside-click";
import { Carousel } from "./Carousel";
import { createPortal } from "react-dom";
import { socket } from ".";

const DEFAULT_IMAGE =
  "https://static.vecteezy.com/system/resources/previews/004/639/366/non_2x/error-404-not-found-text-design-vector.jpg";

export function Card({ card, id: cardId }) {
  console.log(card.misconceptions);
  const [active, setActive] = useState(null);
  const id = useId();
  const ref = useRef(null);
  const appWrapper = document.getElementById("app-wrapper");

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
      appWrapper.classList.add("blur-background");
    } else {
      document.body.style.overflow = "auto";
      appWrapper.classList.remove("blur-background");
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, appWrapper.classList]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      {/* Modal content (rendered conditionally) */}
      <AnimatePresence>
        {active && typeof active === "object" && (
          <>
            {/* Overlay */}
            {createPortal(
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/20 h-full w-full z-10"
              />,
              document.getElementById("portal-root")
            )}

            {/* Modal */}
            {createPortal(
              <div className="fixed inset-0 grid place-items-center z-[100]">
                <motion.button
                  key={`button-${active.title}-${id}`}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
                  onClick={() => setActive(null)}
                >
                  <CloseIcon />
                </motion.button>
                <motion.div
                  layoutId={`card-${active.title}-${id}`}
                  ref={ref}
                  className="w-full max-w-[30vw] h-[70vh] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl"
                >
                  <div className="relative overflow-hidden object-cover object-center">
                    <Carousel
                      slides={active.srcs.map(
                        (src) => src?.image_url ?? DEFAULT_IMAGE
                      )}
                    />
                  </div>

                  <div className="flex flex-col flex-1 overflow-hidden">
                    <div className="flex justify-between items-start p-4">
                      <div>
                        <motion.h3
                          layoutId={`title-${active.title}-${id}`}
                          className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                        >
                          {active.title}
                        </motion.h3>
                        <motion.p
                          layoutId={`description-${active.description}-${id}`}
                          className="text-neutral-600 dark:text-neutral-400 text-base"
                        >
                          {active.description}
                        </motion.p>
                      </div>

                      <motion.a
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => {
                          socket.emit("extend_timeline", parseInt(cardId, 10));
                          setActive(false);
                        }}
                        className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                        rel="noreferrer"
                      >
                        Extend timeline here
                      </motion.a>
                    </div>
                    <div className="relative px-4 flex-1 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]">
                      <motion.div
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-neutral-600 text-xs md:text-sm lg:text-base flex flex-col items-start gap-4 dark:text-neutral-400"
                      >
                        {typeof active.content === "function"
                          ? active.content()
                          : active.content}
                        <h4 className="font-semibold text-lg mb-2">
                          Common Misconceptions
                        </h4>
                        <ul className="list-disc pl-5 space-y-2 w-full">
                          {card.misconceptions.map((misconception, index) => (
                            <li
                              key={index}
                              className="bg-red-100 dark:bg-yellow-900 p-2 rounded"
                            >
                              {misconception.content}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>
                    <div className="h-10"></div>
                  </div>
                  <motion.button
                    key={`button-${active.title}-${id}`}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex absolute top-2 right-2 items-center justify-center bg-white rounded-full h-6 w-6"
                    onClick={() => setActive(null)}
                  >
                    <CloseIcon />
                  </motion.button>
                </motion.div>
              </div>,
              document.getElementById("portal-root")
            )}
          </>
        )}
      </AnimatePresence>

      {/* Card content */}
      <div className="max-w-2xl mx-auto w-full items-start gap-4">
        <motion.div
          layoutId={`card-${card.title}-${id}`}
          key={card.title}
          onClick={() => setActive(card)}
          whileHover={{ scale: 1.03 }}
          transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
          className="p-4 flex flex-col hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-xl cursor-pointer shadow-lg"
        >
          <div className="flex gap-4 flex-col w-full">
            <motion.div
              layoutId={`image-${card.title}-${id}`}
              className="overflow-hidden rounded-lg"
            >
              <ImageHover src={card.srcs[0].image_url} alt={card.title} />
            </motion.div>
            <div className="flex justify-center items-center flex-col">
              <motion.h3
                layoutId={`title-${card.title}-${id}`}
                className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-base"
              >
                {card.title}
              </motion.h3>
              <motion.p
                layoutId={`description-${card.description}-${id}`}
                className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-base"
              >
                {card.description}
                {card.misconceptions.length > 0 && (
                  <div className="absolute bottom-2 right-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="red"
                      width="32"
                      height="32"
                    >
                      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                    </svg>
                  </div>
                )}
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

const ImageHover = ({ src, alt }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [2, -2]);
  const rotateY = useTransform(x, [-100, 100], [-2, 2]);

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = (mouseX / width - 0.5) * 2;
    const yPct = (mouseY / height - 0.5) * 2;
    x.set(xPct * 100);
    y.set(yPct * 100);
  }

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouse}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      transition={{ type: "tween", ease: "easeOutQuint", duration: 0.3 }}
    >
      <img
        src={src}
        alt={alt}
        className="h-60 w-full object-cover object-top transition-transform duration-300 ease-out"
        style={{
          transform: "translateZ(10px)",
        }}
      />
    </motion.div>
  );
};

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
