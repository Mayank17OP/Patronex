"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  X,
  Github,
  Globe,
  Loader2,
  Code2,
  ExternalLink,
  Plus,
  Tag,
  FileJson,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { auth, db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

type Visibility = "public" | "private";
type ProjectLanguage =
  | "TypeScript"
  | "JavaScript"
  | "Python"
  | "Rust"
  | "Go"
  | "Java"
  | "C++"
  | "Other";

interface NewDeveloperProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const LANGUAGES: { id: ProjectLanguage; label: string; color: string }[] = [
  { id: "TypeScript", label: "TypeScript", color: "#3178c6" },
  { id: "JavaScript", label: "JavaScript", color: "#f1e05a" },
  { id: "Python", label: "Python", color: "#3776ab" },
  { id: "Rust", label: "Rust", color: "#dea584" },
  { id: "Go", label: "Go", color: "#00add8" },
  { id: "Java", label: "Java", color: "#b07219" },
  { id: "C++", label: "C++", color: "#f34b7d" },
  { id: "Other", label: "Other", color: "#888888" },
];

export function NewDeveloperProjectModal({
  isOpen,
  onClose,
  onSuccess,
}: NewDeveloperProjectModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState<ProjectLanguage>("TypeScript");
  const [githubUrl, setGithubUrl] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [visibility, setVisibility] = useState<Visibility>("public");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState<1 | 2>(1);

  if (!isOpen) return null;

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim()) && tags.length < 8) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const isValidGitHubUrl = (url: string) => {
    if (!url) return true; // Optional
    return (
      url.startsWith("https://github.com/") ||
      url.startsWith("github.com/") ||
      url.startsWith("https://gitlab.com/") ||
      url.startsWith("gitlab.com/")
    );
  };

  const isValidDemoUrl = (url: string) => {
    if (!url) return true; // Optional
    return url.startsWith("http://") || url.startsWith("https://");
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError("Please enter a project name");
      return;
    }
    if (!description.trim()) {
      setError("Please enter a project description");
      return;
    }
    if (githubUrl && !isValidGitHubUrl(githubUrl)) {
      setError("Please enter a valid GitHub or GitLab URL");
      return;
    }
    if (demoUrl && !isValidDemoUrl(demoUrl)) {
      setError("Please enter a valid demo URL (starting with http:// or https://)");
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
      await addDoc(collection(db, "developerProjects"), {
        userId: user.uid,
        name: name.trim(),
        description: description.trim(),
        language,
        githubUrl: githubUrl.trim() || null,
        demoUrl: demoUrl.trim() || null,
        visibility,
        tags,
        stars: 0,
        forks: 0,
        issues: 0,
        buildStatus: "unknown",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      // Reset form
      setName("");
      setDescription("");
      setLanguage("TypeScript");
      setGithubUrl("");
      setDemoUrl("");
      setVisibility("public");
      setTags([]);
      setStep(1);

      onSuccess?.();
      onClose();
    } catch (err) {
      console.error("Error creating project:", err);
      setError("Failed to create project. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (!name.trim()) {
      setError("Please enter a project name");
      return;
    }
    if (!description.trim()) {
      setError("Please enter a project description");
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
              {step === 1 ? "Create New Project" : "Links & Settings"}
            </h2>
            <p className="text-sm text-slate-500">
              {step === 1
                ? "Add your project to showcase"
                : "Add links and finalize details"}
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
              {/* Project Name */}
              <div className="space-y-2">
                <Label htmlFor="name">
                  Project Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="e.g., patronex-sdk"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={50}
                  className="rounded-xl"
                />
                <p className="text-xs text-slate-400 text-right">
                  {name.length}/50
                </p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe what your project does, its features, and why people should care..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  maxLength={500}
                  className="rounded-xl resize-none"
                />
                <p className="text-xs text-slate-400 text-right">
                  {description.length}/500
                </p>
              </div>

              {/* Language Selection */}
              <div className="space-y-2">
                <Label>Primary Language</Label>
                <div className="grid grid-cols-4 gap-2">
                  {LANGUAGES.map((lang) => {
                    const isSelected = language === lang.id;
                    return (
                      <button
                        key={lang.id}
                        onClick={() => setLanguage(lang.id)}
                        className={cn(
                          "p-2 rounded-lg border-2 text-center transition-all",
                          isSelected
                            ? "border-blue-500 bg-blue-50/50"
                            : "border-slate-200 hover:border-slate-300"
                        )}
                      >
                        <div
                          className="w-3 h-3 rounded-full mx-auto mb-1"
                          style={{ backgroundColor: lang.color }}
                        />
                        <p
                          className={cn(
                            "text-xs font-medium",
                            isSelected ? "text-slate-900" : "text-slate-600"
                          )}
                        >
                          {lang.label}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* GitHub URL */}
              <div className="space-y-2">
                <Label htmlFor="github">
                  Repository URL <span className="text-slate-400">(Optional)</span>
                </Label>
                <div className="relative">
                  <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="github"
                    placeholder="https://github.com/username/repo"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className={cn(
                      "rounded-xl pl-10",
                      githubUrl && !isValidGitHubUrl(githubUrl) && "border-red-500"
                    )}
                  />
                </div>
                {githubUrl && !isValidGitHubUrl(githubUrl) && (
                  <p className="text-xs text-red-500">
                    Please enter a valid GitHub or GitLab URL
                  </p>
                )}
              </div>

              {/* Demo URL */}
              <div className="space-y-2">
                <Label htmlFor="demo">
                  Demo / Live URL <span className="text-slate-400">(Optional)</span>
                </Label>
                <div className="relative">
                  <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="demo"
                    placeholder="https://your-demo-site.com"
                    value={demoUrl}
                    onChange={(e) => setDemoUrl(e.target.value)}
                    className={cn(
                      "rounded-xl pl-10",
                      demoUrl && !isValidDemoUrl(demoUrl) && "border-red-500"
                    )}
                  />
                </div>
                {demoUrl && !isValidDemoUrl(demoUrl) && (
                  <p className="text-xs text-red-500">
                    URL must start with http:// or https://
                  </p>
                )}
              </div>

              {/* Tags Input */}
              <div className="space-y-2">
                <Label>Tags (Optional, max 8)</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g., react, api, open-source"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    className="rounded-xl"
                    disabled={tags.length >= 8}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddTag}
                    disabled={!tagInput.trim() || tags.length >= 8}
                    className="rounded-xl"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-slate-400">
                  Press Enter or click + to add tags
                </p>
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
                        ? "border-blue-500 bg-blue-50/50"
                        : "border-slate-200 hover:border-slate-300"
                    )}
                  >
                    <Globe
                      className={cn(
                        "w-5 h-5",
                        visibility === "public"
                          ? "text-blue-500"
                          : "text-slate-400"
                      )}
                    />
                    <div>
                      <p className="font-medium text-sm">Public</p>
                      <p className="text-xs text-slate-500">
                        Visible to everyone
                      </p>
                    </div>
                  </button>
                  <button
                    onClick={() => setVisibility("private")}
                    className={cn(
                      "p-3 rounded-xl border-2 text-left transition-all flex items-center gap-3",
                      visibility === "private"
                        ? "border-blue-500 bg-blue-50/50"
                        : "border-slate-200 hover:border-slate-300"
                    )}
                  >
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                        visibility === "private"
                          ? "border-blue-500 bg-blue-500"
                          : "border-slate-400"
                      )}
                    >
                      {visibility === "private" && (
                        <span className="text-white text-xs">✓</span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">Private</p>
                      <p className="text-xs text-slate-500">
                        Only visible to you
                      </p>
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
              className="rounded-xl bg-blue-500 hover:bg-blue-600 text-white"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <FileJson className="w-4 h-4 mr-2" />
                  Create Project
                </>
              )}
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
