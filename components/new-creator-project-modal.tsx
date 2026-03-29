"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Upload,
  FileImage,
  FileVideo,
  FileText,
  Globe,
  Loader2,
  Sparkles,
  Plus,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { auth, db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

type ContentType = "post" | "artwork" | "video" | "update";
type Visibility = "public" | "supporters";

interface NewCreatorProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const CONTENT_TYPES: {
  id: ContentType;
  label: string;
  icon: typeof FileImage;
  description: string;
}[] = [
  {
    id: "post",
    label: "Post",
    icon: FileText,
    description: "Share thoughts, ideas, or updates",
  },
  {
    id: "artwork",
    label: "Artwork",
    icon: FileImage,
    description: "Upload images, designs, or photos",
  },
  {
    id: "video",
    label: "Video",
    icon: FileVideo,
    description: "Share video content with your audience",
  },
  {
    id: "update",
    label: "Update",
    icon: Sparkles,
    description: "Project updates and behind-the-scenes",
  },
];

export function NewCreatorProjectModal({
  isOpen,
  onClose,
  onSuccess,
}: NewCreatorProjectModalProps) {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [contentType, setContentType] = useState<ContentType>("post");
  const [visibility, setVisibility] = useState<Visibility>("public");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState<1 | 2>(1);

  if (!isOpen) return null;

  const handleMediaDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.type.startsWith("image/") || file.type.startsWith("video/"))) {
      setMediaFile(file);
      setMediaPreview(URL.createObjectURL(file));
    }
  };

  const handleMediaSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMediaFile(file);
      setMediaPreview(URL.createObjectURL(file));
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim()) && tags.length < 5) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError("Please enter a title");
      return;
    }
    if (!caption.trim()) {
      setError("Please enter a caption/description");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      setError("Please sign in first");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // TODO: Upload media file to storage if exists
      // For now, we'll use the preview URL or a placeholder
      const mediaUrl = mediaPreview || null;

      await addDoc(collection(db, "creatorContent"), {
        userId: user.uid,
        title: title.trim(),
        caption: caption.trim(),
        contentType,
        visibility,
        tags,
        mediaUrl,
        likes: 0,
        comments: 0,
        reach: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      // Reset form
      setTitle("");
      setCaption("");
      setContentType("post");
      setVisibility("public");
      setTags([]);
      setMediaFile(null);
      setMediaPreview(null);
      setStep(1);

      onSuccess?.();
      onClose();
    } catch (err) {
      console.error("Error creating content:", err);
      setError("Failed to create content. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (!title.trim()) {
      setError("Please enter a title");
      return;
    }
    if (!caption.trim()) {
      setError("Please enter a caption/description");
      return;
    }
    setError("");
    setStep(2);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {step === 1 ? "Create New Content" : "Media & Settings"}
            </h2>
            <p className="text-sm text-slate-500">
              {step === 1
                ? "Share your work with the world"
                : "Add media and finalize details"}
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {step === 1 ? (
            <>
              {/* Content Type Selection */}
              <div className="grid grid-cols-2 gap-3">
                {CONTENT_TYPES.map((type) => {
                  const Icon = type.icon;
                  const isSelected = contentType === type.id;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setContentType(type.id)}
                      className={cn(
                        "p-4 rounded-xl border-2 text-left transition-all",
                        isSelected
                          ? "border-amber-500 bg-amber-50/50"
                          : "border-slate-200 hover:border-slate-300"
                      )}
                    >
                      <Icon
                        className={cn(
                          "w-6 h-6 mb-2",
                          isSelected ? "text-amber-500" : "text-slate-400"
                        )}
                      />
                      <p
                        className={cn(
                          "font-medium",
                          isSelected ? "text-slate-900" : "text-slate-600"
                        )}
                      >
                        {type.label}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {type.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Title Input */}
              <div className="space-y-2">
                <Label htmlFor="title">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="Give your content a catchy title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={100}
                  className="rounded-xl"
                />
                <p className="text-xs text-slate-400 text-right">
                  {title.length}/100
                </p>
              </div>

              {/* Caption Input */}
              <div className="space-y-2">
                <Label htmlFor="caption">
                  Caption / Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="caption"
                  placeholder="Write a compelling description for your content..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  rows={4}
                  maxLength={500}
                  className="rounded-xl resize-none"
                />
                <p className="text-xs text-slate-400 text-right">
                  {caption.length}/500
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Media Upload */}
              <div className="space-y-2">
                <Label>Media (Optional)</Label>
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleMediaDrop}
                  className={cn(
                    "relative border-2 border-dashed rounded-xl p-8 text-center transition-colors",
                    mediaPreview
                      ? "border-green-400 bg-green-50/30"
                      : "border-slate-300 hover:border-slate-400"
                  )}
                >
                  {mediaPreview ? (
                    <div className="space-y-3">
                      {mediaFile?.type.startsWith("image/") ? (
                        <img
                          src={mediaPreview}
                          alt="Preview"
                          className="max-h-48 mx-auto rounded-lg object-contain"
                        />
                      ) : (
                        <video
                          src={mediaPreview}
                          className="max-h-48 mx-auto rounded-lg"
                          controls
                        />
                      )}
                      <button
                        onClick={() => {
                          setMediaFile(null);
                          setMediaPreview(null);
                        }}
                        className="text-sm text-red-500 hover:text-red-600"
                      >
                        Remove media
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer block">
                      <Upload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                      <p className="text-sm text-slate-600 font-medium">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Images or videos up to 50MB
                      </p>
                      <input
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleMediaSelect}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Tags Input */}
              <div className="space-y-2">
                <Label>Tags (Optional, max 5)</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    className="rounded-xl"
                    disabled={tags.length >= 5}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddTag}
                    disabled={!tagInput.trim() || tags.length >= 5}
                    className="rounded-xl"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="rounded-full px-3 py-1 cursor-pointer hover:bg-slate-200"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                      <X className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Visibility Selection */}
              <div className="space-y-2">
                <Label>Visibility</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setVisibility("public")}
                    className={cn(
                      "p-3 rounded-xl border-2 text-left transition-all flex items-center gap-3",
                      visibility === "public"
                        ? "border-amber-500 bg-amber-50/50"
                        : "border-slate-200 hover:border-slate-300"
                    )}
                  >
                    <Globe
                      className={cn(
                        "w-5 h-5",
                        visibility === "public"
                          ? "text-amber-500"
                          : "text-slate-400"
                      )}
                    />
                    <div>
                      <p className="font-medium text-sm">Public</p>
                      <p className="text-xs text-slate-500">Everyone can see</p>
                    </div>
                  </button>
                  <button
                    onClick={() => setVisibility("supporters")}
                    className={cn(
                      "p-3 rounded-xl border-2 text-left transition-all flex items-center gap-3",
                      visibility === "supporters"
                        ? "border-amber-500 bg-amber-50/50"
                        : "border-slate-200 hover:border-slate-300"
                    )}
                  >
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                        visibility === "supporters"
                          ? "border-amber-500 bg-amber-500"
                          : "border-slate-400"
                      )}
                    >
                      {visibility === "supporters" && (
                        <span className="text-white text-xs">✓</span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">Supporters Only</p>
                      <p className="text-xs text-slate-500">Paid supporters only</p>
                    </div>
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg">
              {error}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-slate-100 px-6 py-4 flex gap-3">
          {step === 2 && (
            <Button
              variant="outline"
              onClick={() => setStep(1)}
              disabled={isLoading}
              className="rounded-xl"
            >
              Back
            </Button>
          )}
          <div className="flex-1" />
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="rounded-xl"
          >
            Cancel
          </Button>
          {step === 1 ? (
            <Button
              onClick={handleNext}
              className="rounded-xl bg-amber-500 hover:bg-amber-600 text-white"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-90 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Publish Content
                </>
              )}
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
