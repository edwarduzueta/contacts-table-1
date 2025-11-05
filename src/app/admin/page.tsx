import { prisma } from '@/lib/prisma';
import ContactCardAdmin from '@/components/ContactCardAdmin';

export default async function AdminContactsPage() {
  const contacts = await prisma.contact.findMany({
    orderBy: [{ lastName: 'asc' }, { firstName: 'asc' }],
  });

  return (
    <main className="py-4">
      <h1 className="page-title">List Contacts (Admin)</h1>
      <div className="card-grid">
        {contacts.map((c) => (
          <div key={c.id} className="card-col">
            <ContactCardAdmin contact={{
              firstName: c.firstName,
              lastName: c.lastName,
              address: c.address,
              image: c.image,
              description: c.description,
              owner: c.owner
            }}/>
          </div>
        ))}
      </div>
    </main>
  );
}
