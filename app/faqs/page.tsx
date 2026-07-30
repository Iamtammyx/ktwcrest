import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { CtaBand } from "@/components/sections/CtaBand";
import { faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Frequently Asked Questions — KTW Crest",
  description:
    "General inquiries about KTW Crest: when we were established, where we are located, how we structure engagements, support, technologies, and how to get started.",
};

export default function FaqsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Frequently Asked Questions"
        title={
          <>
            General <span className="text-gradient italic">inquiries</span>
          </>
        }
        subtitle="The questions we are asked most often. Something not covered here? A senior consultant is happy to help."
      />

      <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6">
        <FaqAccordion items={faqs} />
      </div>

      <CtaBand title="Still have a question?" />
    </>
  );
}
