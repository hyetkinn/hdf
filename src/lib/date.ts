export const parseDateTime = (value?: string | null) => {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;

  let candidate = trimmed;
  if (/^\d{4}-\d{2}-\d{2}$/.test(candidate)) {
    candidate = `${candidate}T00:00:00`;
  } else if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}/.test(candidate)) {
    candidate = candidate.replace(" ", "T");
  }

  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(candidate)) {
    candidate = `${candidate}:00`;
  }

  const parsed = new Date(candidate);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};
