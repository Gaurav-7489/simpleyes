import type { VideoKey } from "./videos";

/**
 * Step-by-step guides (/guides/<slug>/). Each guide answers one question people ask, in plain language, with
 * the matching Simplyes video where there is one. Guides describe the usual route only: requirements differ
 * between missions and change, so every guide ends by pointing to the mission's current instructions.
 */

export type Guide = {
  slug: string;
  title: string;
  /** Card label: "Video", "Guide" or "Emergency". */
  kind: "Video" | "Guide" | "Emergency";
  /** Reading or watching time, e.g. "2 min". */
  time: string;
  summary: string;
  seoTitle: string;
  metaDescription: string;
  video?: VideoKey;
  /** The service this guide belongs to (slug). */
  service: string;
  steps: { title: string; body: string }[];
  /** Card tone on the guide grid. */
  tone: "green" | "orange" | "lime" | "rust";
  /** Last meaningful content change (YYYY-MM-DD). */
  updated: string;
};

export const guides: Guide[] = [
  {
    slug: "renew-indian-passport-in-germany",
    title: "How to renew your Indian passport in Germany",
    kind: "Video",
    time: "2 min",
    summary: "The six steps of a passport renewal from Germany: online form, photo and signature, documents, appointment and submission.",
    seoTitle: "How to Renew Your Indian Passport in Germany (2026)",
    metaDescription:
      "Renew your Indian passport in Germany step by step: online form, photo, documents and your appointment at the Embassy in Berlin or a Consulate General.",
    video: "passport-renewal",
    service: "passport-services",
    tone: "green",
    updated: "2026-11-16",
    steps: [
      {
        title: "Fill in the online application",
        body: "Complete the passport application on the official Passport Seva portal for Indians abroad. Print it and sign it on the last page.",
      },
      {
        title: "Get your photo and signature right",
        body: "The photo must match the mission's specification exactly, with a white background, and be the same photo you uploaded. Photos are the most common reason applications are sent back.",
      },
      {
        title: "Collect your documents",
        body: "Usually your current passport with copies of the first and last pages, your residence permit and your Meldebescheinigung. Your mission's checklist is the final word.",
      },
      {
        title: "Book your appointment",
        body: "Submit at the mission responsible for the state you live in: the Embassy in Berlin or the Consulate General in Frankfurt, Munich or Hamburg.",
      },
      {
        title: "Pay the fee and prepare the envelope",
        body: "Keep the fee payment proof, and include a tracked return envelope if your mission returns passports by post.",
      },
      {
        title: "Submit and track",
        body: "Submit your complete application and keep the receipt. Processing and the decision are with the mission.",
      },
    ],
  },
  {
    slug: "apply-for-e-oci-card-from-germany",
    title: "How to apply for an e-OCI card from Germany",
    kind: "Video",
    time: "2 min",
    summary: "Surrender certificate first, then the online e-OCI application, photo, documents and submission. A digital card, no booklet.",
    seoTitle: "How to Apply for an e-OCI Card from Germany (2026)",
    metaDescription:
      "Apply for the e-OCI card from Germany step by step: surrender certificate first, online application, photo and signature, documents and submission at your mission.",
    video: "e-oci",
    service: "oci-services",
    tone: "orange",
    updated: "2026-11-16",
    steps: [
      {
        title: "Surrender certificate first",
        body: "If you were an Indian citizen and took German citizenship, you usually need your surrender certificate before you apply for OCI.",
      },
      {
        title: "Fill in the online application",
        body: "Complete the OCI application on the official OCI Services portal, adding your photo, signature and documents in the portal's format.",
      },
      {
        title: "Prepare your documents",
        body: "Typically proof of current citizenship, proof of Indian origin or of the family relationship you rely on, and proof of residence in Germany.",
      },
      {
        title: "Check the photo and signature",
        body: "Uploads are rejected for size, background or a mismatch with the printed form. Check them before you submit.",
      },
      {
        title: "Submit to your mission",
        body: "Send or submit the application to the mission responsible for your state, as its current instructions describe.",
      },
      {
        title: "Receive your e-OCI",
        body: "Once granted, the e-OCI is issued digitally. The decision rests with the Government of India.",
      },
    ],
  },
  {
    slug: "surrender-certificate-after-german-citizenship",
    title: "Surrender certificate after German citizenship",
    kind: "Guide",
    time: "2 min",
    summary: "Why you need a surrender certificate after taking German citizenship, and how to get one before applying for e-OCI.",
    seoTitle: "Indian Surrender Certificate After German Citizenship",
    metaDescription:
      "Took German citizenship? How to get your Indian passport surrender certificate in Germany, what it is for and why you need it before applying for an e-OCI card.",
    service: "passport-services",
    tone: "lime",
    updated: "2026-11-16",
    steps: [
      {
        title: "Why it is needed",
        body: "India does not allow dual citizenship. When you take German citizenship, your Indian passport must be surrendered and you receive a surrender certificate.",
      },
      {
        title: "When to apply",
        body: "As soon as possible after you receive German citizenship. Using the Indian passport after that date can lead to a penalty.",
      },
      {
        title: "Fill in the online form",
        body: "Complete the surrender application online, print it and sign it.",
      },
      {
        title: "Collect your documents",
        body: "Usually your Indian passport, your naturalisation certificate (Einbürgerungsurkunde) and your German passport or ID, with copies.",
      },
      {
        title: "Submit to your mission",
        body: "Submit to the mission responsible for your state. Keep the certificate safe: you need it for your e-OCI application.",
      },
    ],
  },
  {
    slug: "lost-indian-passport-in-germany",
    title: "Lost your Indian passport in Germany? What to do",
    kind: "Emergency",
    time: "2 min",
    summary: "Police report first, then the documents for a new passport, or an Emergency Certificate if you have to travel to India urgently.",
    seoTitle: "Lost Your Indian Passport in Germany? What to Do",
    metaDescription:
      "Lost or stolen Indian passport in Germany: report it to the police first, then apply for a new passport or an Emergency Certificate for urgent travel to India.",
    video: "lost-passport",
    service: "passport-services",
    tone: "rust",
    updated: "2026-11-16",
    steps: [
      {
        title: "Report it to the police",
        body: "File a loss or theft report (Verlustanzeige) at your local police station and keep the report. It must show your passport number if you know it.",
      },
      {
        title: "Message us with URGENT",
        body: "If you have to travel soon, WhatsApp us and start your message with URGENT. We tell you the correct route for your situation.",
      },
      {
        title: "Urgent travel: Emergency Certificate",
        body: "An Emergency Certificate is a one-way travel document to India. It is issued by the mission when you cannot wait for a new passport.",
      },
      {
        title: "Otherwise: apply for a new passport",
        body: "Fill in the re-issue application and prepare the police report, the required affidavits, your residence permit and photos.",
      },
      {
        title: "Book your appointment",
        body: "Lost passport applications are usually submitted in person at the mission responsible for your state.",
      },
    ],
  },
  {
    slug: "indian-visa-for-german-citizens",
    title: "Indian visa for German citizens",
    kind: "Video",
    time: "2 min",
    summary: "Which Indian visa do you need: e-Tourist, e-Business, e-Medical or a regular visa, and why to use only the official website.",
    seoTitle: "Indian Visa for German Citizens 2026: e-Visa Guide",
    metaDescription:
      "Indian visa for German citizens: e-Tourist, e-Business and e-Medical visas, when you need a regular visa, and how to apply safely on the official website only.",
    video: "visa-for-germans",
    service: "visa-documentation-support",
    tone: "lime",
    updated: "2026-11-16",
    steps: [
      {
        title: "Choose the right category",
        body: "Holidays and family visits usually need an e-Tourist visa, business trips an e-Business visa and treatment an e-Medical visa. Some purposes need a regular visa instead.",
      },
      {
        title: "Use the official website only",
        body: "Apply on the Government of India's official e-Visa website. Look-alike sites charge extra and some are scams.",
      },
      {
        title: "Prepare your photo and passport scan",
        body: "Your photo and passport page must meet the upload rules, and your passport must be valid long enough for the trip.",
      },
      {
        title: "Add the documents for your category",
        body: "A business visa, for example, usually needs an invitation or business letter. We check the list for your category.",
      },
      {
        title: "Apply in good time",
        body: "Apply well before you travel. The decision is made by the Indian authorities.",
      },
    ],
  },
  {
    slug: "mistakes-that-get-your-application-sent-back",
    title: "5 mistakes that get your application sent back",
    kind: "Guide",
    time: "3 min",
    summary: "The photo, signature and paperwork mistakes we see most often, and how to avoid them.",
    seoTitle: "5 Mistakes That Get Indian Applications Sent Back",
    metaDescription:
      "The five most common mistakes in Indian passport, e-OCI and visa applications from Germany: photo, signature, missing copies, wrong mission and unsigned forms.",
    service: "passport-services",
    tone: "orange",
    updated: "2026-11-16",
    steps: [
      {
        title: "A photo that doesn't meet the specification",
        body: "Wrong size, a background that isn't white, shadows or glasses. And the printed photo must match the uploaded one.",
      },
      {
        title: "A signature that doesn't match",
        body: "The signature on the form must match your passport and stay inside the box.",
      },
      {
        title: "Missing copies",
        body: "Copies of the first and last passport pages, your residence permit and your Meldebescheinigung are often forgotten.",
      },
      {
        title: "Applying at the wrong mission",
        body: "Each mission serves particular federal states. Applications sent to the wrong one are returned.",
      },
      {
        title: "An unsigned or incomplete form",
        body: "Unsigned pages and empty fields are the easiest mistakes to make, and the easiest to avoid with a final check.",
      },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}

export const guidePath = (guide: Pick<Guide, "slug">) => `/guides/${guide.slug}/`;

/** The four guides featured on the homepage, in the redesign's order. */
export const featuredGuides = [
  "renew-indian-passport-in-germany",
  "apply-for-e-oci-card-from-germany",
  "surrender-certificate-after-german-citizenship",
  "lost-indian-passport-in-germany",
]
  .map(getGuide)
  .filter((g): g is Guide => g !== undefined);
