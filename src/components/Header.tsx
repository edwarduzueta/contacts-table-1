import Link from 'next/link';
import { getCurrentEmail } from '@/lib/auth-dev';

export default async function Header() {
  const email = await getCurrentEmail();

  return (
    <nav className="navbar navbar-expand-lg" style={{ background: '#0a3aa0' }} data-bs-theme="dark">
      <div className="container">
        <Link href="/" className="navbar-brand">digits</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#digits-nav" aria-controls="digits-nav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="digits-nav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link href="/add" className="nav-link">Add Stuff</Link></li>
            <li className="nav-item"><Link href="/list" className="nav-link">List Contacts</Link></li>
            <li className="nav-item"><Link href="/admin" className="nav-link">Admin</Link></li>
          </ul>

          <ul className="navbar-nav ms-auto">
            {email ? (
              <>
                <li className="nav-item">
                  <span className="nav-link disabled" style={{ opacity: 1 }}>{email} ▾</span>
                </li>
                <li className="nav-item">
                  <form method="POST" action="/auth/logout">
                    <button className="btn btn-sm btn-outline-light ms-2" type="submit">Logout</button>
                  </form>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link href="/login" className="nav-link">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
