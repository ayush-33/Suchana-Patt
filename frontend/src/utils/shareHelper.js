/**
 * Handles sharing via Web Share API or copies URL to clipboard with fallback
 */
export async function shareNotification(title, url = window.location.href, onToast) {
  if (navigator.share) {
    try {
      await navigator.share({
        title: `${title} - Suchana Patt`,
        text: `Check out recruitment details for ${title} on Suchana Patt:`,
        url
      });
      if (onToast) onToast('Shared successfully!', 'success');
      return true;
    } catch (err) {
      if (err.name !== 'AbortError') {
        // Fallback to clipboard
        return copyToClipboard(url, onToast);
      }
      return false;
    }
  } else {
    return copyToClipboard(url, onToast);
  }
}

export async function copyToClipboard(text, onToast) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      if (onToast) onToast('Link copied to clipboard!', 'success');
      return true;
    } else {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      if (onToast) onToast('Link copied to clipboard!', 'success');
      return true;
    }
  } catch (e) {
    console.error('Clipboard copy failed:', e);
    if (onToast) onToast('Could not copy link', 'warning');
    return false;
  }
}

