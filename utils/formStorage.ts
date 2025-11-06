export interface ContactFormSubmission {
  id: string;
  name: string;
  email: string;
  contact: string;
  preferredTime: string;
  website: string;
  query: string;
  aboutProduct: string;
  submittedAt: string;
}

const STORAGE_KEY = 'contact_form_submissions';

export function saveFormSubmission(data: Omit<ContactFormSubmission, 'id' | 'submittedAt'>): void {
  if (typeof window === 'undefined') return;

  const submissions = getFormSubmissions();
  const newSubmission: ContactFormSubmission = {
    ...data,
    id: `submission-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    submittedAt: new Date().toISOString(),
  };

  submissions.unshift(newSubmission); // Add to beginning (newest first)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
}

export function getFormSubmissions(): ContactFormSubmission[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading form submissions:', error);
    return [];
  }
}

export function deleteFormSubmission(id: string): void {
  if (typeof window === 'undefined') return;

  const submissions = getFormSubmissions();
  const filtered = submissions.filter(sub => sub.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function clearAllSubmissions(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

