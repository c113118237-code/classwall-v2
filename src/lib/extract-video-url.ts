// 從文字中提取視頻網址並判斷平台

export type VideoPlatform = "youtube" | "vimeo" | "twitter" | "instagram";

export interface VideoInfo {
  url: string;
  platform: VideoPlatform;
  id: string;
}

/**
 * 從文字中提取視頻網址
 * @param text 文字內容
 * @returns 視頻信息，如果沒有找到則返回 null
 */
export function extractVideoUrl(text: string): VideoInfo | null {
  // YouTube 正規表達式：支援多種格式
  // https://www.youtube.com/watch?v=... 或 https://youtu.be/...
  const youtubeRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const youtubeMatch = text.match(youtubeRegex);
  if (youtubeMatch && youtubeMatch[1]) {
    return {
      url: text.match(/https?:\/\/[^\s]+/)?.[0] || `https://www.youtube.com/watch?v=${youtubeMatch[1]}`,
      platform: "youtube",
      id: youtubeMatch[1],
    };
  }

  // Vimeo 正規表達式
  const vimeoRegex =
    /(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(\d+)/;
  const vimeoMatch = text.match(vimeoRegex);
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      url: text.match(/https?:\/\/[^\s]+/)?.[0] || `https://vimeo.com/${vimeoMatch[1]}`,
      platform: "vimeo",
      id: vimeoMatch[1],
    };
  }

  // Twitter/X 正規表達式
  const twitterRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/;
  const twitterMatch = text.match(twitterRegex);
  if (twitterMatch && twitterMatch[1]) {
    return {
      url: text.match(/https?:\/\/[^\s]+/)?.[0] || `https://twitter.com/i/web/status/${twitterMatch[1]}`,
      platform: "twitter",
      id: twitterMatch[1],
    };
  }

  // Instagram 正規表達式
  const instagramRegex =
    /(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:p|reel)\/([a-zA-Z0-9_-]+)/;
  const instagramMatch = text.match(instagramRegex);
  if (instagramMatch && instagramMatch[1]) {
    return {
      url: text.match(/https?:\/\/[^\s]+/)?.[0] || `https://www.instagram.com/p/${instagramMatch[1]}`,
      platform: "instagram",
      id: instagramMatch[1],
    };
  }

  return null;
}
