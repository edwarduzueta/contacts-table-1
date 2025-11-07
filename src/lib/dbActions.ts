// ---- Contact actions ----
"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

// For create: owner is required
export type AddContactInput = {
  firstName: string;
  lastName: string;
  address: string;
  image: string;
  description: string;
  owner: string;
};

// For update: do NOT include owner
export type UpdateContactInput = {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  image: string;
  description: string;
};

export async function addContact(contact: AddContactInput) {
  const { firstName, lastName, address, image, description, owner } = contact;
  await prisma.contact.create({
    data: { firstName, lastName, address, image, description, owner },
  });
  revalidatePath("/");
  revalidatePath("/list");
  revalidatePath("/add");
}

export async function editContact(contact: UpdateContactInput) {
  const { id, firstName, lastName, address, image, description } = contact;
  await prisma.contact.update({
    where: { id },
    // NOTE: no owner here — we keep the original owner unchanged
    data: { firstName, lastName, address, image, description },
  });
  revalidatePath("/");
  revalidatePath("/list");
  revalidatePath(`/edit/${id}`);
}
