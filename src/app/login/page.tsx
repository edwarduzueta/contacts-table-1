'use client';

export default function LoginPage() {
  return (
    <main className="py-5">
      <h1 className="page-title">Login</h1>
      <form method="POST" action="/auth/login" className="mx-auto" style={{maxWidth: 420}}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input id="email" name="email" type="email" className="form-control" placeholder="john@foo.com" defaultValue="john@foo.com" required />
        </div>
        <button className="btn btn-primary w-100" type="submit">Sign in</button>
        <p className="text-muted small mt-3">Tip: try <code>john@foo.com</code> or <code>admin@foo.com</code>.</p>
      </form>
    </main>
  );
}
