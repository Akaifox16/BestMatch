import type { getCsrfToken } from 'next-auth/react';

type CSRFToken = Awaited<ReturnType<typeof getCsrfToken>>;
type CSRFInputProps = {
  csrfToken: CSRFToken;
};

export default function CSRFInput({ csrfToken }: CSRFInputProps) {
  return <input name='csrfToken' type='hidden' defaultValue={csrfToken} />;
}
