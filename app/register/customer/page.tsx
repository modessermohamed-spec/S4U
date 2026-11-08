"use client";
import Link from "next/link";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { getAuth } from "@/lib/auth";
import { DemoNotice } from "@/components/ui";
import { AccountFields, DemoSuccess, TermsCheckbox, emptyAccount, useAccountValidation, type Errors } from "@/components/forms";

export default function CustomerRegister() {
  const { t } = useLang();
  const validate = useAccountValidation();
  const [account, setAccount] = useState(emptyAccount);
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(account);
    if (!terms) errs.terms = t("لازم توافق على الشروط", "You must accept the terms");
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setBusy(true);
    // Demo mode: getAuth() returns a no-op provider. Nothing leaves the browser.
    const res = await getAuth().signUp({ email: account.email, password: account.password, role: "customer" });
    setBusy(false);
    if (res.ok) {
      setAccount(emptyAccount); // drop the password from memory
      setDone(true);
    }
  }

  if (done) return <div className="shell section narrow"><DemoSuccess title={t("تم اختبار التسجيل", "Sign-up tested")} /></div>;

  return (
    <div className="shell section narrow">
      <h1 className="pageTitle">{t("تسجيل عميل", "Customer sign-up")}</h1>
      <DemoNotice />
      <form className="card stack" onSubmit={submit} noValidate>
        <AccountFields value={account} onChange={setAccount} errors={errors} />
        <TermsCheckbox checked={terms} onChange={setTerms} error={errors.terms} />
        <button className="btnPrimary wide" disabled={busy}>{t("إنشاء الحساب (تجريبي)", "Create account (demo)")}</button>
        <p className="fieldHint">{t("بعد التفعيل الحقيقي: بنرسل ليك إيميل تأكيد.", "Once live: you will receive a confirmation email.")}</p>
      </form>
      <p className="center muted">{t("عندك حساب؟", "Already have an account?")} <Link className="link" href="/login">{t("سجّل دخول", "Log in")}</Link></p>
    </div>
  );
}
