import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact KTW Crest — Start Your Technology Discovery",
  description:
    "Tell us what needs to work better. A senior consultant reads every enquiry and confirms scope, price and delivery dates within two working days.",
};

export default function ContactPage() {
  return (
    <div className="pt-6 lg:pt-10">
      <Contact />
    </div>
  );
}
