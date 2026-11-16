import type { VideoKey } from "./videos";

/**
 * Page copy for the service template of the November 2026 redesign: hero, "We help with" cards, the
 * documents list, the video and related guides. Keyed by service slug (src/content/services.ts holds the
 * rest: summary, FAQs, issues, structured data).
 */

export type HelpCard = { title: string; body: string; /** Shown in the emergency (orange) style. */ urgent?: boolean };

export type ServicePage = {
  h1: string;
  lead: string;
  helpCards: HelpCard[];
  video?: { key: VideoKey; heading: string };
  documents: { heading: string; items: string[] };
  relatedGuides: string[];
};

export const servicePages: Record<string, ServicePage> = {
  "passport-services": {
    h1: "Indian passport renewal and passport services in Germany",
    lead:
      "Renewal, lost or damaged passports, name and detail changes, PCC and emergency travel documents. We check, prepare and help you book your appointment.",
    helpCards: [
      { title: "Passport renewal", body: "Re-issue on expiry or when the pages are full." },
      { title: "Lost, stolen or damaged passport", body: "Police report, Annexure F and L affidavits, new passport.", urgent: true },
      { title: "Name and detail changes", body: "Spouse's name, name change after marriage, name split, address." },
      { title: "Change of signature", body: "Affidavit and supporting documents." },
      { title: "Police Clearance Certificate (PCC)", body: "For jobs, immigration and residence permits." },
      { title: "Emergency Certificate", body: "One-way travel document for urgent travel to India.", urgent: true },
      { title: "Surrender certificate", body: "After taking German or another citizenship." },
      { title: "Passports for children", body: "Minors and newborns, with parental consent forms." },
    ],
    video: { key: "passport-renewal", heading: "Watch: renew your passport in 6 steps" },
    documents: {
      heading: "Documents usually needed for renewal",
      items: [
        "Current passport (original) and copies of the first and last pages",
        "Printed online application form, signed on the last page",
        "Photo, 35 × 45 mm, white background, same as uploaded",
        "Residence permit and Meldebescheinigung",
        "Fee payment proof and a tracked return envelope",
      ],
    },
    relatedGuides: [
      "lost-indian-passport-in-germany",
      "mistakes-that-get-your-application-sent-back",
      "surrender-certificate-after-german-citizenship",
    ],
  },
  "oci-services": {
    h1: "e-OCI card applications from Germany",
    lead:
      "Fresh e-OCI, renewal after a new passport and updates of your details, for adults, children and foreign spouses. We check, prepare and help you submit.",
    helpCards: [
      { title: "Fresh e-OCI", body: "First application for adults of Indian origin and German citizens." },
      { title: "e-OCI after a new passport", body: "Updating your OCI when you receive a new foreign passport." },
      { title: "Update of your details", body: "Change of address, occupation, name or other personal details." },
      { title: "e-OCI for children", body: "Minors and newborns, with parental consent forms." },
      { title: "e-OCI for foreign spouses", body: "Spouses of Indian citizens or OCI holders, with marriage documents." },
      { title: "Surrender certificate first", body: "Needed before OCI if you gave up Indian citizenship.", urgent: true },
    ],
    video: { key: "e-oci", heading: "Watch: get your e-OCI card in 6 steps" },
    documents: {
      heading: "Documents usually needed for a fresh e-OCI",
      items: [
        "Current foreign passport and copies of the first and last pages",
        "Surrender certificate or proof of renunciation, if you were an Indian citizen",
        "Proof of Indian origin, or of the family relationship you rely on",
        "Photo and signature in the OCI portal format",
        "Residence permit or Meldebescheinigung as proof of address",
      ],
    },
    relatedGuides: [
      "apply-for-e-oci-card-from-germany",
      "surrender-certificate-after-german-citizenship",
      "mistakes-that-get-your-application-sent-back",
    ],
  },
  "attestation-legalisation": {
    h1: "Attestation and affidavits for Indians in Germany",
    lead:
      "Attestation of personal, educational and commercial documents. Name change, name split and other affidavits, and Power of Attorney. We check, prepare and help you book your appointment.",
    helpCards: [
      { title: "Personal documents", body: "Birth, marriage and other civil documents for use in India." },
      { title: "Educational documents", body: "Degrees, transcripts and certificates." },
      { title: "Commercial documents", body: "Company and business papers for use in India." },
      { title: "Name change and name split", body: "Affidavits when your name differs between documents." },
      { title: "Other affidavits", body: "Address, relationship and other declarations a mission asks for." },
      { title: "Power of Attorney", body: "Authorising someone in India to act for you." },
    ],
    documents: {
      heading: "Documents usually needed for attestation",
      items: [
        "The original document and a copy",
        "Apostille or certification by the issuing country, where required",
        "Your passport and residence permit, with copies",
        "The completed application form for your mission",
        "Fee payment proof",
      ],
    },
    relatedGuides: ["mistakes-that-get-your-application-sent-back", "renew-indian-passport-in-germany", "lost-indian-passport-in-germany"],
  },
  "visa-documentation-support": {
    h1: "Indian visa and e-Visa help in Germany",
    lead:
      "Indian e-Visa and regular visa: e-Tourist, e-Business, e-Medical and more, for German citizens, spouses, family, friends and business travellers. We find the right category and prepare your application.",
    helpCards: [
      { title: "e-Tourist visa", body: "Holidays, family visits and short trips to India." },
      { title: "e-Business visa", body: "Meetings, trade fairs and business travel." },
      { title: "e-Medical visa", body: "Treatment in India, and e-Medical Attendant for companions." },
      { title: "Regular visa", body: "Purposes the e-Visa does not cover, such as longer stays." },
      { title: "Visa for spouses and family", body: "Foreign spouses and relatives of Indian citizens." },
      { title: "Urgent visa", body: "A family emergency and you need to travel now.", urgent: true },
    ],
    video: { key: "visa-for-germans", heading: "Watch: which Indian visa do you need?" },
    documents: {
      heading: "Documents usually needed for an e-Visa",
      items: [
        "Passport valid for at least six months, with a scan of the photo page",
        "A recent photo meeting the upload rules",
        "Travel details: dates, address in India and purpose",
        "For e-Business: an invitation or business letter",
        "For e-Medical: a letter from the hospital in India",
      ],
    },
    relatedGuides: ["indian-visa-for-german-citizens", "mistakes-that-get-your-application-sent-back", "apply-for-e-oci-card-from-germany"],
  },
  "family-documentation": {
    h1: "Indian documentation for the whole family in Germany",
    lead:
      "Passport, e-OCI and visa for the whole family as one case: minor passports, birth registration and parental consent forms. One person coordinates everything with you.",
    helpCards: [
      { title: "Passports for children", body: "Minors and newborns, with parental consent forms." },
      { title: "Birth registration", body: "Registering a child born in Germany with the mission." },
      { title: "Spouse's name change", body: "Updating a passport after marriage." },
      { title: "e-OCI for the family", body: "Children and foreign spouses applying together." },
      { title: "Visas for relatives", body: "Visits by family members and spouses." },
      { title: "Family emergency", body: "Urgent travel to India for the family.", urgent: true },
    ],
    documents: {
      heading: "Documents usually needed for a child's passport",
      items: [
        "Birth certificate (Geburtsurkunde), with apostille where required",
        "Both parents' passports and residence permits, with copies",
        "Parental consent form signed by both parents",
        "Child's photo, white background, same as uploaded",
        "Meldebescheinigung for the family",
      ],
    },
    relatedGuides: ["renew-indian-passport-in-germany", "apply-for-e-oci-card-from-germany", "mistakes-that-get-your-application-sent-back"],
  },
  "student-services": {
    h1: "Passport, attestation and PCC help for Indian students in Germany",
    lead:
      "Passport renewal, attestation of educational documents and PCC for Indian students in Germany. We check, prepare and help you book your appointment, on a student budget.",
    helpCards: [
      { title: "Passport renewal", body: "Renew before your residence permit needs it." },
      { title: "Attestation of educational documents", body: "Degrees, transcripts and certificates." },
      { title: "Police Clearance Certificate (PCC)", body: "For jobs, residence permits and immigration." },
      { title: "Name and detail changes", body: "When your name differs between documents." },
      { title: "Lost passport", body: "Police report and new passport, quickly.", urgent: true },
      { title: "Documents for jobs and permits", body: "What your employer or the Ausländerbehörde asks for." },
    ],
    video: { key: "passport-renewal", heading: "Watch: renew your passport in 6 steps" },
    documents: {
      heading: "Documents usually needed for a PCC",
      items: [
        "Current passport (original) and copies of the first and last pages",
        "Printed online application form, signed",
        "Photo, 35 × 45 mm, white background",
        "Residence permit and Meldebescheinigung",
        "Fee payment proof",
      ],
    },
    relatedGuides: ["renew-indian-passport-in-germany", "lost-indian-passport-in-germany", "mistakes-that-get-your-application-sent-back"],
  },
};
