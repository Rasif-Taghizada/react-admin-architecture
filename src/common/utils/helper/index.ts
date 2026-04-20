
const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const base64ToText = (base64: string): string => {
  try {
    return decodeURIComponent(escape(window.atob(base64)));
  } catch {
    return window.atob(base64);
  }
};

const downloadBlobFile = (blob: Blob, filename?: string) => {
  const fileURL = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = fileURL;
  link.download = filename || 'downloaded-file';

  document.body.appendChild(link);
  link.click();
  link.remove();

  window.URL.revokeObjectURL(fileURL);
};

type Item = { id: string | number; type: 'Folder' | 'Document' };

const splitByType = (items: Item[]) => {
  const folders = items.filter((x) => x.type === 'Folder');
  const documents = items.filter((x) => x.type !== 'Folder');
  return { folders, documents };
};

const base64ToBlob = (base64Data: string, mimeType: string): Blob => {
  const cleanBase64 = base64Data.replace(/^"|"$/g, '').trim();

  const byteCharacters = atob(cleanBase64);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
};

export { validateEmail, base64ToText, downloadBlobFile, splitByType, base64ToBlob };
