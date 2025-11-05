import { cookies } from 'next/headers';

export async function getCurrentEmail() {
  const store = await cookies();              // 👈 await the async API
  return store.get('email')?.value ?? '';
}
