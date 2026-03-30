import { useState } from "react";
import { motion } from "framer-motion";

interface Props {
  imageSrc: string;
  title: string;
  description: string;
}

export default function FlipCard({ imageSrc, title, description }: Props) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="perspective-[1200px] w-full aspect-square cursor-pointer"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden shadow-md"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden shadow-md bg-foreground text-background flex flex-col items-center justify-center p-6 text-center"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="text-sm leading-relaxed flex-1 flex items-center">
            {description}
          </p>
          <p className="text-xs font-bold opacity-70 mt-2">— {title} —</p>
        </div>
      </motion.div>
    </div>
  );
}
