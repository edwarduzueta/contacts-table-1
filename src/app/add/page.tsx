import { getCurrentEmail } from '@/lib/auth-dev';

export default async function AddContactPage() {
  const email = await getCurrentEmail();

  return (
    <main className="py-4">
      <h1 className="page-title">Add Contact</h1>

      <form method="POST" action="/api/contacts" className="mx-auto" style={{ maxWidth: 720 }}>
        <div className="row g-3">
          <div className="col-sm-6">
            <label htmlFor="firstName" className="form-label">First name</label>
            <input id="firstName" name="firstName" className="form-control" required />
          </div>
          <div className="col-sm-6">
            <label htmlFor="lastName" className="form-label">Last name</label>
            <input id="lastName" name="lastName" className="form-control" required />
          </div>

          <div className="col-12">
            <label htmlFor="address" className="form-label">Address</label>
            <input id="address" name="address" className="form-control" placeholder="POST 307, University of Hawaii" required />
          </div>

          <div className="col-12">
            <label htmlFor="image" className="form-label">Image URL</label>
            <input id="image" name="image" type="url" className="form-control" placeholder="https://avatars.githubusercontent.com/u/290288?v=4" required />
          </div>

          <div className="col-12">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea id="description" name="description" rows={5} className="form-control" required />
          </div>

          <div className="col-12 d-flex align-items-center justify-content-between">
            <small className="text-muted">Owner: <code>{email || '—'}</code></small>
            <button className="btn btn-primary" type="submit">Add Contact</button>
          </div>
        </div>
      </form>
    </main>
  );
}
