const statusOptions: { value: number; label: string }[] = [
  { value: 0, label: 'Pending' },
  { value: 1, label: 'Active' },
  { value: 2, label: 'Inactive' },
  { value: 3, label: 'Suspended' },
];

const successMessages: Record<string, string> = {
  download: 'File(s) downloaded successfully',
  clear: 'Selection cleared',
};

const errorMessages: Record<string, string> = {
  view: 'Failed to preview file',
  download: 'Failed to download files',
};

export { statusOptions, successMessages , errorMessages };
