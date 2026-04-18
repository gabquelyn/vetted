"use client";
import { motion } from "motion/react";
import { Dispatch, SetStateAction, DragEvent } from "react";

export default function UploadZone({
  file,
  dragging,
  setDragging,
  onDrop,
  onClick,
}: {
  file: File | null;
  dragging: boolean;
  setDragging: Dispatch<SetStateAction<boolean>>
  onDrop: (e:  DragEvent<HTMLDivElement>) => void
  onClick: () => void
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition
      ${dragging ? "border-forest bg-forest-light" : "border-ash"}
      ${file ? "bg-forest-light border-forest" : "bg-white"}
      `}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      onClick={onClick}
    >
      {file ? (
        <>
          <div className="text-forest font-semibold text-lg">Resume ready</div>
          <p className="text-sm text-forest">{file.name}</p>
        </>
      ) : (
        <>
          <div className="text-xl font-serif">Drop your resume</div>
          <p className="text-ink-soft text-sm">
            Drag & drop or click to upload
          </p>
        </>
      )}
    </motion.div>
  );
}
