// Global Language Map
export const langMap: Record<string, string[]> = {
  'zh': ['zh-CN'],
  'ja': ['ja-JP'],
  'en': ['en-US']
}

// Waline Language Map
// https://waline.js.org/guide/i18n.html
export const walineLocaleMap: Record<string, string> = {
  'zh': 'zh-CN',
  'ja': 'jp-JP', // Waline uses jp-JP instead of ja-JP
  'en': 'en-US'
}

// Supported Languages
export const supportedLangs = Object.keys(langMap).flat()
