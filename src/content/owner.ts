import settings from "./owner-settings.json";

type Text = string | null;

/** Public business facts and owner approvals. Runtime shape is checked before every build. */
export type OwnerSettings = {
  legal: {
    legalName: Text; businessType: Text; representative: Text; street: Text; postalCodeCity: Text;
    country: string; email: Text; phone: Text; vatId: Text; register: Text; reviewed: boolean; lastUpdated: string;
  };
  privacy: { mailboxProvider: Text; enquiryRetention: Text; conversationRetention: Text };
  terms: { paymentMethodsAndTiming: Text; cancellationAndRefunds: Text; liability: Text; complaintsProcedure: Text };
  policies: { privacyPolicy: Text; termsAndConditions: Text; disclaimer: Text; impressum: Text };
  launch: {
    brandingApproved: boolean; hostingApproved: boolean; serviceContentApproved: boolean;
    independenceStatementApproved: boolean; quotationModelApproved: boolean;
    enquiryDeliveryConfirmed: boolean; deliveryVerifiedAt: Text;
  };
};

export const ownerSettings: OwnerSettings = settings;
