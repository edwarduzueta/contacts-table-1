import AddContactForm from "@/components/AddContactForm";
import { getCurrentEmail } from "@/lib/auth-dev";

export default async function AddPage() {
  const email = await getCurrentEmail();
  return <AddContactForm owner={email || "unknown@local"} />;
}
