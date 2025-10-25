// A utility function to convert Wix image URLs to a usable format.
export function formatWixImage(url: string | undefined | null): string {
  // If the URL is missing, return a path to a local placeholder image.
  if (!url) {
    return '/placeholder.png'; 
  }

  // If it's already a standard URL, use it directly.
  if (url.startsWith('http')) {
    return url;
  }

  // Convert the wix:image protocol to a standard https URL.
  if (url.startsWith('wix:image://v1/')) {
    const imageId = url.substring('wix:image://v1/'.length).split('/')[0];
    return `https://static.wixstatic.com/media/${imageId}`;
  }

  // Fallback if the format is unrecognized.
  return '/placeholder.png';
}