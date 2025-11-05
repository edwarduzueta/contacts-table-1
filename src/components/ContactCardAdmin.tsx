'use client';
import Card from 'react-bootstrap/Card';
import Image from 'next/image';

export type ContactAdmin = {
  firstName: string;
  lastName: string;
  address: string;
  image: string;
  description: string;
  owner: string;
};

export default function ContactCardAdmin({ contact }: { contact: ContactAdmin }) {
  const { firstName, lastName, address, image, description, owner } = contact;
  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <div className="d-flex align-items-center gap-3">
          <Image src={image} alt={`${firstName} ${lastName}`} width={48} height={48} style={{ borderRadius: '50%' }} />
          <div>
            <Card.Title className="mb-0">{firstName} {lastName}</Card.Title>
            <div className="text-muted small">{address}</div>
          </div>
        </div>
        <hr className="my-2" />
        <Card.Text className="mb-2">{description}</Card.Text>
        <div className="text-muted small">— {owner}</div>
      </Card.Body>
    </Card>
  );
}
