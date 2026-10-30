import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { privacyPoints } from "@/content/home";
import { CardFrame } from "@/components/ui/CardFrame";

/** "Your documents and privacy": states only what is true today. */
export function PrivacyCard({ className }: { className?: string }) {
  return (
    <CardFrame className={className} cardClassName="flex h-full items-start gap-4">
      <LockKeyhole aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent-700" strokeWidth={1.75} />
      <div>
        <h2 className="type-card-title">Your documents and privacy</h2>
        <ul className="mt-3 flex max-w-[60ch] list-disc flex-col gap-2 pl-4 type-body">
          {privacyPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <p className="mt-3 type-body">
          <Link href="/privacy/" className="inline-flex min-h-8 items-center text-accent-700 underline underline-offset-4">
            Read the Privacy Policy
          </Link>
        </p>
      </div>
    </CardFrame>
  );
}
