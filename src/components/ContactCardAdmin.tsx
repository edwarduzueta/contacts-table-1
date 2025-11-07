export default function ContactCardAdmin({
  id, firstName, lastName, address, image, description,
}: {
  id: number;
  firstName: string; lastName: string;
  address: string; image?: string | null; description?: string | null;
}) {
  return (
    <div className="card h-100">
      <div className="card-body">
        <div className="d-flex align-items-center gap-3">
          {image ? (
            <img
              src={image}
              alt={`${firstName} ${lastName}`}
              width={48}
              height={48}
              style={{ borderRadius: "50%", objectFit: "cover" }}
            />
          ) : null}
          <div>
            <h5 className="card-title mb-0">{firstName} {lastName}</h5>
            <div className="text-muted small">{address}</div>
          </div>
        </div>
        {description ? <p className="card-text mt-3">{description}</p> : null}
      </div>
      <div className="card-footer d-flex justify-content-between">
        <small className="text-muted">ID: <code>{id}</code></small>
      </div>
    </div>
  );
}
