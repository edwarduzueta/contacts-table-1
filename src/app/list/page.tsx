import ContactCard from "@/components/ContactCard";
import { prisma } from "@/lib/db";
import { getCurrentEmail } from "@/lib/auth-dev";

export default async function ListContactsPage() {
  const email = await getCurrentEmail();

  // Build WHERE only if we have an email; otherwise show all (matches your logs)
  const whereClause = email ? { owner: email } : undefined;

  const contacts = await prisma.contact.findMany({
    where: whereClause,
    orderBy: [{ lastName: "asc" }, { firstName: "asc" }],
    select: {
      id: true,           // 👈 make 100% sure we fetch the id
      firstName: true,
      lastName: true,
      address: true,
      image: true,
      description: true,
    },
  });

  return (
    <main className="container py-4">
      <h1 className="mb-3">List Contacts</h1>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {contacts.map((c) => (
          <div className="col" key={c.id}>
            <ContactCard contact={c} />
          </div>
        ))}
      </div>
    </main>
  );
}
