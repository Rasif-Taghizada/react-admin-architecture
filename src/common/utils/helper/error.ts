
export const getErrorMessage = (error: any): { title: string; content: string } => {
  // Default error message
  let title = 'Something went wrong';
  let content = 'An unexpected error occurred';

  // Check if error response exists
  if (!error.response) {
    // Network error or no response
    if (error.message) {
      title = 'Network Error';
      content = error.message;
    }
    return { title, content };
  }

  const responseData = error.response.data;

  // Case 1: data is a string
  if (typeof responseData === 'string') {
    title = responseData;
    content = `Error: ${responseData}`;
  }
  // Case 2: data is an array with error objects
  else if (Array.isArray(responseData) && responseData.length > 0) {
    const firstError = responseData[0];
    title = firstError.propertyName || 'Validation Error';
    content = `Error: ${firstError.errorMessage || 'Validation failed'}`;
    
    // If multiple errors, append them
    if (responseData.length > 1) {
      const additionalErrors = responseData
        .slice(1)
        .map((err: any) => err.errorMessage)
        .filter(Boolean)
        .join(', ');
      if (additionalErrors) {
        content += ` (and ${responseData.length - 1} more)`;
      }
    }
  }
  // Case 3: 
  else if (typeof responseData === 'object' && responseData !== null) {
    title = responseData.message || responseData.error || responseData.title || 'Error';
    content = `Error: ${
      responseData.message || 
      responseData.error || 
      responseData.detail || 
      responseData.description ||
      JSON.stringify(responseData)
    }`;
  }

  return { title, content };
};


const NAME_ALLOWED_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿƏÖÜĞÇŞİəöüğçşıİА-Яа-яЁё]+(?:[ -][A-Za-zÀ-ÖØ-öø-ÿƏÖÜĞÇŞİəöüğçşıİА-Яа-яЁё]+)*$/;


export const validateName = (fieldLabel: string) => (_: any, value?: string) => {
  const v = (value ?? '').trim();

  if (!v) return Promise.resolve(); // required ayrı rule-da olacaq

  // allowed chars (letters + space/hyphen)
  if (!NAME_ALLOWED_REGEX.test(v)) {
    return Promise.reject(new Error(`${fieldLabel} must contain only letters and may include spaces or hyphens.`));
  }

  // starts with uppercase (ilk simvol hərf olmalıdır artıq)
  const firstChar = v[0];
  if (firstChar !== firstChar.toUpperCase()) {
    return Promise.reject(new Error(`${fieldLabel} must start with an uppercase letter.`));
  }

  return Promise.resolve();
};
