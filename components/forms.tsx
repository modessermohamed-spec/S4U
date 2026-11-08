"use client";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { CITIES } from "@/lib/data";
import { isEmail, normalizeSudanPhone, passwordProblems } from "@/lib/auth";
import { Field } from "./ui";

export type Account = { firstName: string; lastName: string; email: string; password: string; phone: string; city: string };
export const emptyAccount: Account = { firstName: "", lastName: "", email: "", password: "", phone: "", city: "" };
export type Errors = Partial<Record<string, string>>;

export function useAccountValidation() {
  const { t } = useLang();
  return (a: Account): Errors => {
    const e: Errors = {};
    if (!a.firstName.trim()) e.firstName = t("أدخل الاسم الأول", "Enter your first name");
    if (!a.lastName.trim()) e.lastName = t("أدخل اسم العائلة", "Enter your last name");
    if (!isEmail(a.email)) e.email = t("الإيميل ما صحيح", "Enter a valid email");
    const pw = passwordProblems(a.password);
    if (pw.length) e.password = t("كلمة السر لازم ٨ حروف على الأقل وفيها حرف ورقم", "Password needs at least 8 characters, one letter and one number");
    if (!normalizeSudanPhone(a.phone)) e.phone = t("رقم سوداني صحيح، مثلاً 0912345678", "Valid Sudanese number, e.g. 0912345678");
    if (!a.city) e.city = t("اختار المدينة", "Choose your city");
    return e;
  };
}

export function AccountFields({ value, onChange, errors }: { value: Account; onChange: (a: Account) => void; errors: Errors }) {
  const { ar, t } = useLang();
  const [show, setShow] = useState(false);
  const set = (k: keyof Account) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => onChange({ ...value, [k]: e.target.value });
  return (
    <>
      <div className="row2">
        <Field label={t("الاسم الأول", "First name")} error={errors.firstName}>
          <input autoComplete="given-name" value={value.firstName} onChange={set("firstName")} maxLength={60} />
        </Field>
        <Field label={t("اسم العائلة", "Last name")} error={errors.lastName}>
          <input autoComplete="family-name" value={value.lastName} onChange={set("lastName")} maxLength={60} />
        </Field>
      </div>
      <Field label={t("الإيميل", "Email")} error={errors.email}>
        <input type="email" dir="ltr" autoComplete="email" value={value.email} onChange={set("email")} maxLength={120} />
      </Field>
      <Field label={t("كلمة السر", "Password")} error={errors.password} hint={t("٨ حروف على الأقل، حرف ورقم", "At least 8 characters, a letter and a number")}>
        <div className="pwWrap">
          <input type={show ? "text" : "password"} dir="ltr" autoComplete="new-password" value={value.password} onChange={set("password")} maxLength={128} />
          <button type="button" onClick={() => setShow(!show)} aria-label={show ? t("إخفاء", "Hide") : t("إظهار", "Show")}>{show ? <EyeOff size={18} /> : <Eye size={18} />}</button>
        </div>
      </Field>
      <Field label={t("رقم التلفون", "Phone number")} error={errors.phone} hint={t("ما بيظهر للعامة", "Not shown publicly")}>
        <input type="tel" dir="ltr" inputMode="tel" autoComplete="tel" placeholder="+249 9X XXX XXXX" value={value.phone} onChange={set("phone")} maxLength={20} />
      </Field>
      <Field label={t("المدينة", "City")} error={errors.city} hint={t("ما بنطلب ولا بنعرض عنوان البيت", "We never ask for or show your home address")}>
        <select value={value.city} onChange={set("city")}>
          <option value="">{t("اختار...", "Choose...")}</option>
          {Object.entries(CITIES).map(([k, c]) => <option key={k} value={k}>{ar ? c.ar : c.en}</option>)}
        </select>
      </Field>
    </>
  );
}

export function TermsCheckbox({ checked, onChange, error }: { checked: boolean; onChange: (v: boolean) => void; error?: string }) {
  const { t } = useLang();
  return (
    <div className={"checkRow" + (error ? " hasError" : "")}>
      <label>
        <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <span>{t("أوافق على شروط الاستخدام وسياسة الخصوصية", "I agree to the terms of use and privacy policy")}</span>
      </label>
      <span className="fieldHint">{t("الشروط لسه في مرحلة الإعداد وما اتراجعت قانونياً.", "Terms are still being drafted and have not been legally reviewed.")}</span>
      {error && <span className="fieldError" role="alert">{error}</span>}
    </div>
  );
}

export function DemoSuccess({ title, children }: { title: string; children?: React.ReactNode }) {
  const { t } = useLang();
  return (
    <div className="card success">
      <CheckCircle2 size={44} />
      <h2>{title}</h2>
      <p>{t("دي نسخة تجريبية: ما اتعمل حساب، وما اترسلت ولا اتحفظت أي بيانات.", "This is a demo: no account was created and no data was sent or stored.")}</p>
      {children}
      <Link className="btnPrimary" href="/">{t("للصفحة الرئيسية", "Back to home")}</Link>
    </div>
  );
}
