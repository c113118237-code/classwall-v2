"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { VideoInfo } from "@/lib/extract-video-url";

interface VideoPreviewProps {
  videoInfo: VideoInfo;
  className?: string;
}

export function VideoPreview({ videoInfo, className }: VideoPreviewProps) {
  // 根據平台產生嵌入式網址
  let embedUrl = "";

  switch (videoInfo.platform) {
    case "youtube":
      embedUrl = `https://www.youtube.com/embed/${videoInfo.id}?rel=0`;
      break;
    case "vimeo":
      embedUrl = `https://player.vimeo.com/video/${videoInfo.id}`;
      break;
    case "twitter":
      // Twitter 需要載入指令碼，使用 iframe 包裝
      embedUrl = ``;
      break;
    case "instagram":
      // Instagram 需要載入指令碼
      embedUrl = ``;
      break;
  }

  // YouTube 和 Vimeo 的嵌入式播放器
  if (videoInfo.platform === "youtube" || videoInfo.platform === "vimeo") {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className={cn("overflow-hidden rounded-lg", className)}
      >
        <div className="relative w-full bg-black" style={{ paddingBottom: "56.25%" }}>
          <iframe
            src={embedUrl}
            className="absolute inset-0 h-full w-full rounded-lg border-0"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title="視頻預覽"
          />
        </div>
      </motion.div>
    );
  }

  // Twitter / Instagram 使用外部卡片
  if (videoInfo.platform === "twitter" || videoInfo.platform === "instagram") {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className={cn("overflow-hidden rounded-lg", className)}
      >
        <a
          href={videoInfo.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "block rounded-lg border border-border/50 bg-muted/30 p-4",
            "hover:border-primary/40 hover:bg-primary/5",
            "transition-colors duration-200"
          )}
        >
          <div className="flex items-center gap-2">
            <span aria-hidden className="text-lg">
              {videoInfo.platform === "twitter" ? "𝕏" : "📷"}
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              點擊查看 {videoInfo.platform === "twitter" ? "X (Twitter)" : "Instagram"} 貼文
            </span>
            <span aria-hidden className="ml-auto text-xs">↗</span>
          </div>
        </a>
      </motion.div>
    );
  }

  return null;
}
