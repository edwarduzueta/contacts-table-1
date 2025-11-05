import { prisma } from '@/lib/prisma';
import ContactCard from '@/components/ContactCard';
import { getCurrentEmail } from '@/lib/auth-dev';
import { redirect } from 'next/navigation';

export default async function ListContactsPage() {
  const email = await getCurrentEmail();
  if (!email) redirect('/login');

  const contacts = await prisma.contact.findMany({
    where: { owner: email },
    orderBy: [{ lastName: 'asc' }, { firstName: 'asc' }],
  });

  return (
    <main className="py-4">
      <h1 className="page-title">List Contacts</h1>
      {contacts.length === 0 ? (
        <p className="text-center text-muted">No contacts for <code>{email}</code> yet.</p>
      ) : (
        <div className="card-grid">
          {contacts.map((c) => (
            <div key={c.id} className="card-col">
              <ContactCard contact={{
                firstName: c.firstName,
                lastName: c.lastName,
                address: c.address,
                image: c.image,
                description: c.description,
              }}/>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
