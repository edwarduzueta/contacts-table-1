/* eslint-disable @next/next/no-img-element */

type Contact = {
  id?: number;
  firstName: string;
  lastName: string;
  address: string;
  image?: string | null;
  description?: string | null;
};

type ContactProps = { contact: Contact } | (Contact & { contact?: never });

function unwrapContact(p: ContactProps): Contact {
  if (typeof p === "object" && p !== null && "contact" in p && (p as any).contact) {
    return (p as { contact: Contact }).contact;
  }
  return p as Contact;
}

export default function ContactCard(props: ContactProps) {
  const c = unwrapContact(props);
  const hasId = typeof c.id === "number" && Number.isFinite(c.id);
  const editHref = hasId ? `/edit/${c.id}` : undefined;

  return (
    <div className="card h-100">
      {c.image ? (
        <img className="card-img-top" src={c.image} alt={`${c.firstName} ${c.lastName}`} />
      ) : null}

      <div className="card-body">
        <h5 className="card-title">{c.firstName} {c.lastName}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{c.address}</h6>
        {c.description ? <p className="card-text">{c.description}</p> : null}
      </div>

      <div className="card-footer d-flex justify-content-between">
        <small className="text-muted">ID: <code>{hasId ? String(c.id) : "—"}</code></small>
        {hasId ? <a href={editHref}>Edit</a> : <span className="text-muted">No ID</span>}
      </div>
    </div>
  );
}
