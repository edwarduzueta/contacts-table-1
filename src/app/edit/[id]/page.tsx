import EditContactForm from "@/components/EditContactForm";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function EditContactPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = await params; // Next 16: params is a Promise
  const id = Number(idStr);
  if (Number.isNaN(id)) return notFound();

  const contact =
    (await prisma.contact.findUnique({ where: { id } })) ??
    (await prisma.contact.findFirst({ where: { id } }));
  if (!contact) return notFound();

  return (
    <EditContactForm
      contact={{
        id: contact.id,
        firstName: contact.firstName,
        lastName: contact.lastName,
        address: contact.address,
        image: contact.image,
        description: contact.description ?? "",
      }}
    />
  );
}
