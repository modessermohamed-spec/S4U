"use client";
import Link from "next/link";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { getAuth, isEmail } from "@/lib/auth";
import { DemoNotice, Field } from "@/components/ui";

export default function Login() {
  const { t } = useLang();
  const [mode, setMode] = useState<"login" | "reset">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    if (!isEmail(email)) return setError(t("الإيميل ما صحيح", "Enter a valid email"));
    if (mode === "login" && !password) return setError(t("أدخل كلمة السر", "Enter your password"));
    setError("");
    const auth = getAuth();
    const res = mode === "login" ? await auth.signIn({ email, password }) : await auth.resetPassword(email);
    setPassword("");
    if (res.ok && res.demo) {
      setMessage(mode === "login"
        ? t("وضع تجريبي: تسجيل الدخول لسه ما اتفعّل، فما في حساب اتفتح.", "Demo mode: log-in is not active yet, so no account was opened.")
        : t("وضع تجريبي: ما اترسل أي إيميل لإعادة كلمة السر.", "Demo mode: no password reset email was sent."));
    }
  }

  return (
    <div className="shell section narrow">
      <h1 className="pageTitle">{mode === "login" ? t("تسجيل الدخول", "Log in") : t("نسيت كلمة السر", "Forgot password")}</h1>
      <DemoNotice />
      <form className="card stack" onSubmit={submit} noValidate>
        <Field label={t("الإيميل", "Email")} error={error && !isEmail(email) ? error : undefined}>
          <input type="email" dir="ltr" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
        {mode === "login" && (
          <Field label={t("كلمة السر", "Password")} error={error && isEmail(email) ? error : undefined}>
            <input type="password" dir="ltr" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Field>
        )}
        <button className="btnPrimary wide">{mode === "login" ? t("دخول (تجريبي)", "Log in (demo)") : t("أرسل رابط (تجريبي)", "Send link (demo)")}</button>
        {message && <p className="warnNote" role="status">{message}</p>}
        <button type="button" className="textbutton center" onClick={() => { setMode(mode === "login" ? "reset" : "login"); setError(""); setMessage(""); }}>
          {mode === "login" ? t("نسيت كلمة السر؟", "Forgot your password?") : t("رجوع لتسجيل الدخول", "Back to log in")}
        </button>
      </form>
      <p className="center muted">{t("ما عندك حساب؟", "No account yet?")} <Link className="link" href="/register">{t("سجّل مجاناً", "Sign up free")}</Link></p>
    </div>
  );
}
