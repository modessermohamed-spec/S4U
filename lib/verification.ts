// Verification model for S4U Trust & Verification.
//
// SECURITY RULE: Status changes must only ever happen on the server (admin / ops role
// or a confirmed identity-provider callback). The client may only *display* a status.
// No real identity provider (e.g. SUDAPASS) is connected. Do not simulate one.

export type VerificationStatus =
  | "unverified"
  | "identity_pending"
  | "identity_confirmed"
  | "additional_check_required"
  | "approved_for_jobs"
  | "rejected";

export const VERIFICATION_LABELS: Record<VerificationStatus, { en: string; ar: string; tone: "grey" | "amber" | "green" | "red" }> = {
  unverified: { en: "Not verified", ar: "غير موثّق", tone: "grey" },
  identity_pending: { en: "Identity check pending", ar: "التحقق من الهوية قيد المراجعة", tone: "amber" },
  identity_confirmed: { en: "Identity confirmed", ar: "تم تأكيد الهوية", tone: "green" },
  additional_check_required: { en: "Additional check required", ar: "مطلوب تحقق إضافي", tone: "amber" },
  approved_for_jobs: { en: "Approved for jobs", ar: "معتمد لاستلام الطلبات", tone: "green" },
  rejected: { en: "Check rejected", ar: "تم رفض التحقق", tone: "red" },
};

/** A binding job confirmation is only allowed for this status. */
export function canAcceptBindingJobs(status: VerificationStatus) {
  return status === "approved_for_jobs";
}

/** Planned onboarding steps (shown to providers). */
export const ONBOARDING_STEPS = [
  { en: "Create account", ar: "إنشاء حساب" },
  { en: "Confirm email", ar: "تأكيد الإيميل" },
  { en: "Complete profile", ar: "إكمال الملف" },
  { en: "Offer services", ar: "إضافة الخدمات" },
  { en: "Receive first request", ar: "استلام أول طلب" },
  { en: "Identity check", ar: "التحقق من الهوية" },
  { en: "Additional check if needed", ar: "تحقق إضافي عند الحاجة" },
  { en: "Approval for binding jobs", ar: "الاعتماد لاستلام الطلبات" },
];
