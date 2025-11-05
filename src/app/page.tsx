import Link from 'next/link';
import { getCurrentEmail } from '@/lib/auth-dev';

export default async function Home() {
  const email = await getCurrentEmail();
  return (
    <main className="py-5">
      <h1 className="page-title">Digits</h1>
      {!email ? (
        <ul className="text-center list-unstyled">
          <li className="mb-2"><Link href="/login" className="btn btn-primary">Login</Link></li>
        </ul>
      ) : (
        <ul className="text-center list-unstyled">
          <li className="mb-2"><Link href="/list">List Contacts</Link></li>
          <li className="mb-2"><Link href="/admin">List Contacts (Admin)</Link></li>
        </ul>
      )}
    </main>
  );
}
