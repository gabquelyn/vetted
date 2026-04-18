"use client";
import { useRef, useState, FormEvent, DragEvent, ChangeEvent } from "react";
import { motion } from "motion/react";
import UploadZone from "./UploadZone";
import Input from "@/app/components/Input";

const WEBHOOK_URL = "https://hook.eu1.make.com/YOUR_WEBHOOK_ID";

export default function JoinForm() {
  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const detailsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name as keyof typeof details]: value }));
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setSubmitting(true);

    const formData = new FormData();
    formData.append("firstName", details.firstName);
    formData.append("lastName", details.lastName);
    formData.append("email", details.email);
    formData.append("city", details.city);
    formData.append("resume", file);

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        body: formData,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 text-left p-10 bg-white border-ash shadow-lg rounded-lg"
    >
      {/* Inputs */}
      <div className="grid md:grid-cols-2 gap-3">
        <Input
          label="First name"
          name="firstName"
          value={details.firstName}
          onChange={detailsHandler}
        />
        <Input
          label="Last name"
          name="lastName"
          value={details.lastName}
          onChange={detailsHandler}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={details.email}
          onChange={detailsHandler}
        />
        <Input
          label="City"
          name="city"
          value={details.city}
          onChange={detailsHandler}
        />
      </div>

      {/* Upload */}
      <UploadZone
        file={file}
        dragging={dragging}
        setDragging={setDragging}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      />

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Submit */}
      <button disabled={!file || submitting} className="bg-forest w-full text-white p-2 px-4 rounded-lg">
        {submitting ? "Building profile..." : "Build my profile →"}
      </button>

      {/* Note */}
      {/* <p className="text-xs text-center text-ink-soft">
        We&apos;ll create a draft profile and email it to you for review.
      </p> */}
    </motion.form>
  );
}
