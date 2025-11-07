type Contact = {
  id?: number; // defensive: may be missing
  firstName: string;
  lastName: string;
  address: string;
  image?: string | null;
  description?: string | null;
};

// Accept either { contact: Contact } or flat props
export default function ContactCard(
  props: { contact: Contact } | (Contact & { contact?: never })
) {
  const c: Contact = "contact" in props && props.contact ? props.contact : (props as any);
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
        <small className="text-muted">
          ID: <code>{hasId ? String(c.id) : "—"}</code>
        </small>
        {hasId ? (
          // plain <a> to avoid the dev-only Performance.measure warning
          <a href={editHref}>Edit</a>
        ) : (
          <span className="text-muted">No ID</span>
        )}
      </div>
    </div>
  );
}
