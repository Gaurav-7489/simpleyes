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

/** White rounded tile with a green outline icon (owners' mockup), as used across cards. */
export function IconTile({ name, size = "md" }: { name: ServiceIcon | IconKey; size?: "sm" | "md" }) {
  return (
    <span
      aria-hidden="true"
      className={`icon-tile inline-grid shrink-0 place-items-center text-accent-600 ${size === "sm" ? "size-9 rounded-[11px]" : "size-12 rounded-[14px]"}`}
    >
      <Icon name={name} className={size === "sm" ? "size-4" : "size-5"} />
    </span>
  );
}
