import {
  BookUser,
  Briefcase,
  Building2,
  CheckCheck,
  Compass,
  FolderOpen,
  GraduationCap,
  House,
  IdCard,
  MessagesSquare,
  PenLine,
  Plane,
  ShieldCheck,
  Stamp,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { ServiceIcon } from "@/content/services";
import type { IconKey } from "@/content/home";

/** One outline icon family (§16). Service icons are unique per service. */
const icons: Record<ServiceIcon | IconKey, LucideIcon> = {
  passport: BookUser,
  oci: IdCard,
  attestation: Stamp,
  affidavit: PenLine,
  visa: Plane,
  family: Users,
  student: GraduationCap,
  corporate: Building2,
  personal: UserRound,
  guidance: Compass,
  communication: MessagesSquare,
  organised: FolderOpen,
  human: CheckCheck,
  transparent: ShieldCheck,
  professionals: Briefcase,
  students: GraduationCap,
  residents: House,
};

export function Icon({ name, className }: { name: ServiceIcon | IconKey; className?: string }) {
  const Component = icons[name];
  return <Component aria-hidden="true" className={className ?? "size-5"} strokeWidth={1.75} />;
}

/** Mint rounded tile holding an icon, as used across cards. */
export function IconTile({ name, size = "md" }: { name: ServiceIcon | IconKey; size?: "sm" | "md" }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-grid shrink-0 place-items-center rounded-[12px] bg-accent-50 text-accent-700 ring-1 ring-accent-100 ${
        size === "sm" ? "size-9" : "size-11"
      }`}
    >
      <Icon name={name} className={size === "sm" ? "size-4" : "size-5"} />
    </span>
  );
}
