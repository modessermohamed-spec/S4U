"use client";
import Link from "next/link";
import { User, Hammer } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Arrow, DemoNotice } from "@/components/ui";

export default function RegisterChoice() {
  const { t } = useLang();
  return (
    <div className="shell section narrow">
      <h1 className="pageTitle">{t("إنشاء حساب", "Create an account")}</h1>
      <p className="muted">{t("التسجيل مجاني. إنت داير تعمل شنو؟", "Joining is free. What would you like to do?")}</p>
      <DemoNotice />
      <div className="roleGrid">
        <Link href="/register/customer" className="card roleCard">
          <span className="trustIcon"><User size={26} /></span>
          <h2>{t("أنا عميل", "I'm a customer")}</h2>
          <p>{t("داير ألاقي حرفي وأطلب خدمة", "I want to find a professional and request a service")}</p>
          <span className="textbutton">{t("تسجيل عميل", "Sign up as customer")} <Arrow /></span>
        </Link>
        <Link href="/register/pro" className="card roleCard">
          <span className="trustIcon"><Hammer size={26} /></span>
          <h2>{t("أنا حرفي", "I'm a professional")}</h2>
          <p>{t("داير أعرض خدماتي وألاقي شغل جديد", "I want to offer my services and get new jobs")}</p>
          <span className="textbutton">{t("تسجيل حرفي", "Sign up as professional")} <Arrow /></span>
        </Link>
      </div>
      <p className="center muted">{t("عندك حساب؟", "Already have an account?")} <Link className="link" href="/login">{t("سجّل دخول", "Log in")}</Link></p>
    </div>
  );
}
