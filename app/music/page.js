import { redirect } from "next/navigation";

export const metadata = {
  title: "Music | Dr. Victor Chukwu",
};

export default function MusicPage() {
  redirect("/media");
}
