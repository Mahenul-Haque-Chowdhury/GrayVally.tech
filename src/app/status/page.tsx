import { redirect } from "next/navigation";

export default function StatusRedirect() {
  // Route removed — redirect users to the homepage
  redirect("/");
}
