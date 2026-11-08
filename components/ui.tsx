"use client";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { Menu, MapPin, ShieldAlert, ShieldCheck, ArrowLeft, ArrowRight, Zap, Wrench, Paintbrush, Hammer, Wind, House, Briefcase, LogIn } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { CATEGORIES, CITIES, CURRENCY, startingPrice, type ProProfile } from "@/lib/data";
import { VERIFICATION_LABELS, type VerificationStatus } from "@/lib/verification";

const ICONS = { Zap, Wrench, Paintbrush, Hammer, Wind, House } as const;

export function CategoryIcon({ category, size = 26 }: { category: string; size?: number }) {
  const Icon = ICONS[(CATEGORIES[category]?.icon ?? "Wrench") as keyof typeof ICONS] ?? Wrench;
  return <Icon size={size} strokeWidth={1.8} />;
}

export function Arrow({ size = 16 }: { size?: number }) {
  const { ar } = useLang();
  return ar ? <ArrowLeft size={size} /> : <ArrowRight size={size} />;
}

export function DemoBar() {
  const { t } = useLang();
  return (
    <div className="prototypeBar">
      <div className="shell">
        {t(
          "نسخة تجريبية — الملفات أمثلة غير حقيقية، ولا يتم إنشاء حسابات أو حفظ بيانات أو قبول حجوزات.",
          "Demo version — profiles are fictional examples. No accounts are created, no data is stored and no bookings are accepted."
        )}
      </div>
    </div>
  );
}

export function SiteHeader() {
  const { ar, t, setLang } = useLang();
  const [menu, setMenu] = useState(false);
  const close = () => setMenu(false);
  return (
    <header className="header">
      <div className="shell nav">
        <Link className="brand" href="/" onClick={close}>
          <span className="logo">S<span>4</span>U</span>
          <small>Sudan for You</small>
        </Link>
        <nav className={menu ? "links open" : "links"}>
          <Link onClick={close} href="/#services">{t("الخدمات", "Services")}</Link>
          <Link onClick={close} href="/#professionals">{t("الحرفيين", "Professionals")}</Link>
          <Link onClick={close} href="/#trust">{t("الثقة والأمان", "Trust & safety")}</Link>
          <Link onClick={close} href="/login" className="mobileOnly">{t("تسجيل الدخول", "Log in")}</Link>
          <Link onClick={close} href="/register/pro" className="mobileOnly">{t("سجّل كحرفي", "Join as a pro")}</Link>
        </nav>
        <div className="navright">
          <button className="language" onClick={() => setLang(ar ? "en" : "ar")} aria-label={t("تغيير اللغة", "Change language")}>
            🌐 <span className="langLong">{ar ? "English" : "العربية"}</span><span className="langShort">{ar ? "EN" : "ع"}</span>
          </button>
          <Link className="ghost desktopOnly" href="/login"><LogIn size={17} /> {t("دخول", "Log in")}</Link>
          <Link className="outline" href="/register">{t("إنشاء حساب", "Sign up")}</Link>
          <button className="menubtn" aria-label={t("القائمة", "Menu")} aria-expanded={menu} onClick={() => setMenu(!menu)}>
            <Menu size={22} />
          </button>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const { t } = useLang();
  return (
    <footer>
      <div className="shell foot">
        <div>
          <strong className="logo">S<span>4</span>U</strong>
          <p>Sudan for You · {t("خدماتك في مكان واحد", "Services made simple")}</p>
        </div>
        <small>© 2026 S4U · {t("نسخة تجريبية — لا توجد حجوزات فعلية", "Prototype — no live bookings")}</small>
      </div>
    </footer>
  );
}

export function VerificationBadge({ status, demo }: { status: VerificationStatus; demo?: boolean }) {
  const { ar, t } = useLang();
  const l = VERIFICATION_LABELS[status];
  const Icon = l.tone === "green" ? ShieldCheck : ShieldAlert;
  return (
    <span className={`badge tone-${l.tone}`}>
      <Icon size={15} />
      {ar ? l.ar : l.en}
      {demo && <em>· {t("مثال", "example")}</em>}
    </span>
  );
}

export function DemoTag() {
  const { t } = useLang();
  return <span className="demoTag">{t("ملف تجريبي", "Example profile")}</span>;
}

export function ProCard({ p }: { p: ProProfile }) {
  const { ar, t } = useLang();
  const price = startingPrice(p);
  const cat = CATEGORIES[p.category];
  return (
    <article className="worker">
      <div className="workerTop">
        <div className="avatar" style={{ background: p.color }}>{p.initials}</div>
        <div>
          <h3>{ar ? p.name.ar : p.name.en}</h3>
          <div className="muted">{ar ? cat.ar : cat.en}</div>
          <div className="location"><MapPin size={14} />{ar ? CITIES[p.city].ar : CITIES[p.city].en}</div>
        </div>
      </div>
      <div className="workerMeta">
        <span className="exp"><Briefcase size={15} /> {p.experienceYears} {t("سنة خبرة", "yrs experience")}</span>
        <DemoTag />
      </div>
      <div className="workerFoot">
        <div>
          <small>{price != null ? t("يبدأ من", "From") : t("السعر", "Price")}</small>
          <strong>{price != null ? `${CURRENCY}${price}` : t("حسب الطلب", "On request")}</strong>
        </div>
        <Link className="btnSoft" href={`/pros/${p.id}`}>{t("عرض الملف", "View profile")} <Arrow /></Link>
      </div>
    </article>
  );
}

export function Field({ label, hint, error, children }: { label: string; hint?: string; error?: string; children: ReactNode }) {
  return (
    <label className={"field" + (error ? " hasError" : "")}>
      <span className="fieldLabel">{label}</span>
      {children}
      {error ? <span className="fieldError" role="alert">{error}</span> : hint ? <span className="fieldHint">{hint}</span> : null}
    </label>
  );
}

export function DemoNotice({ children }: { children?: ReactNode }) {
  const { t } = useLang();
  return (
    <div className="demoNotice">
      <ShieldAlert size={18} />
      <div>
        <strong>{t("وضع تجريبي", "Demo mode")}</strong>
        <p>{children ?? t("التسجيل الحقيقي لسه ما اتفعّل. ما بنرسل ولا بنحفظ أي بيانات تدخلها هنا.", "Real sign-up is not active yet. Nothing you enter here is sent or stored.")}</p>
      </div>
    </div>
  );
}
