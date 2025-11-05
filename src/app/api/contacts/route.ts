import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const form = await request.formData();
  const firstName = String(form.get('firstName') || '').trim();
  const lastName = String(form.get('lastName') || '').trim();
  const address = String(form.get('address') || '').trim();
  const image = String(form.get('image') || '').trim();
  const description = String(form.get('description') || '').trim();

  const store = await cookies();
  const owner = (store.get('email')?.value || '').trim().toLowerCase();

  if (!owner) return NextResponse.redirect(new URL('/login', request.url));
  if (!firstName || !lastName || !address || !image || !description) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }

  await prisma.contact.upsert({
    where: { firstName_lastName_owner: { firstName, lastName, owner } },
    update: { address, image, description },
    create: { firstName, lastName, address, image, description, owner },
  });

  return NextResponse.redirect(new URL('/list', request.url));
}
