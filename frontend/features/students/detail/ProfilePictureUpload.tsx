"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import { uploadProfilePicture } from "@/lib/api";
import DefaultProfilePicture from "@/assets/user.png"

interface ProfilePictureUploadProps {
  studentId: number;
  currentUrl: string | null;
  status: "Aktif" | "Nonaktif" | "Keluar";
  onUploaded: (url: string) => void;
}

export function ProfilePictureUpload({
  studentId,
  currentUrl,
  status,
  onUploaded,
}: ProfilePictureUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const statusColor =
    status === "Aktif" ? "bg-primary" : status === "Keluar" ? "bg-tertiary" : "bg-secondary";

  const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);
    setUploading(true);

    try {
      const updated = await uploadProfilePicture(studentId, file);
      onUploaded(updated.profilePictureUrl);
    } catch (err) {
      console.error(err);
      alert("Failed to upload profile picture.");
      setPreviewUrl(null);
    } finally {
      setUploading(false);
      URL.revokeObjectURL(localPreview);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const displayUrl = previewUrl || currentUrl || DefaultProfilePicture;

  return (
    <div className="relative w-28 h-28 group ">
      <Image src={displayUrl} alt="profile picture" fill className="rounded-full object-cover border-[1.5px] border-gray-300 " />

      <div className={`absolute bottom-1.5 right-2 h-6 w-6 rounded-full ml-1 ${statusColor}`} />

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="absolute inset-0 rounded-full flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors cursor-pointer"
      >
        <Camera className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelected} className="hidden" />

      {uploading && (
        <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/40">
          <span className="text-white text-xs">...</span>
        </div>
      )}
    </div>
  );
}