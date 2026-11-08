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

const tileSizes = {
  sm: { box: "size-9 rounded-[11px]", icon: "size-[18px]" },
  md: { box: "size-11", icon: "size-5" },
  lg: { box: "size-14 rounded-[16px]", icon: "size-6" },
} as const;

/** Soft rounded tile holding an icon — one shared treatment across the site. */
export function IconTile({ name, size = "md", className }: { name: ServiceIcon | IconKey; size?: keyof typeof tileSizes; className?: string }) {
  const s = tileSizes[size];
  return (
    <span aria-hidden="true" className={`icon-tile ${s.box} ${className ?? ""}`}>
      <Icon name={name} className={s.icon} />
    </span>
  );
}
