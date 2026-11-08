"use client";
import Link from "next/link";
import { useState } from "react";
import { MapPin, Briefcase, Image as ImageIcon, Star, Award, CheckCircle2, ArrowLeft, ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { CATEGORIES, CITIES, formatPrice, type ProProfile } from "@/lib/data";
import { canAcceptBindingJobs } from "@/lib/verification";
import { DemoTag, Field, VerificationBadge } from "@/components/ui";

export default function ProfileView({ pro }: { pro: ProProfile }) {
  const { ar, t } = useLang();
  const cat = CATEGORIES[pro.category];
  const [service, setService] = useState(pro.services[0].en);
  const [desc, setDesc] = useState("");
  const [sent, setSent] = useState(false);
  const binding = canAcceptBindingJobs(pro.verification);
  const learned = {
    practice: t("اتعلّم الصنعة بالممارسة", "Learned on the job"),
    training: t("تدريب مهني", "Vocational training"),
    both: t("ممارسة وتدريب مهني", "On the job and vocational training"),
  }[pro.learnedBy];

  return (
    <div className="shell section profile">
      <Link href="/#professionals" className="backLink">{ar ? <ArrowRight size={16} /> : <ArrowLeft size={16} />} {t("رجوع للحرفيين", "Back to professionals")}</Link>

      <div className="profileGrid">
        <div className="profileMain">
          <div className="card profileHead">
            <div className="avatar large" style={{ background: pro.color }} aria-hidden>{pro.initials}</div>
            <div>
              <DemoTag />
              <h1>{ar ? pro.name.ar : pro.name.en}</h1>
              <p className="muted">{ar ? cat.ar : cat.en}</p>
              <div className="chips">
                <span className="chip"><Briefcase size={14} /> {pro.experienceYears} {t("سنة خبرة", "years experience")}</span>
                <span className="chip"><MapPin size={14} /> {pro.areas.map((a) => (ar ? CITIES[a].ar : CITIES[a].en)).join("، ")}</span>
              </div>
              <VerificationBadge status={pro.verification} demo />
            </div>
          </div>

          <div className="card">
            <h2>{t("عن الحرفي", "About")}</h2>
            <p>{ar ? pro.description.ar : pro.description.en}</p>
            <p className="muted">{learned}</p>
          </div>

          <div className="card">
            <h2>{t("الخدمات والأسعار", "Services & prices")}</h2>
            <ul className="serviceList">
              {pro.services.map((s) => (
                <li key={s.en}>
                  <span>{ar ? s.ar : s.en}</span>
                  <strong>{s.pricing === "fixed" && s.price != null ? formatPrice(s.price, ar) : t("السعر حسب الطلب", "Price on request")}</strong>
                </li>
              ))}
            </ul>
            <p className="fieldHint">{t("الأسعار من الحرفي نفسه. سعر الشغل بيتدفع مباشرة بين العميل والحرفي.", "Prices are set by the professional. Payment for the work is made directly between customer and professional.")}</p>
          </div>

          <div className="card">
            <h2>{t("صور الشغل", "Work photos")}</h2>
            <div className="emptyBox"><ImageIcon size={22} /> {t("مافي صور شغل لسه.", "No work photos yet.")}</div>
          </div>

          {pro.qualifications.length > 0 && (
            <div className="card">
              <h2>{t("المؤهلات (اختياري)", "Qualifications (optional)")}</h2>
              <ul className="plainList">{pro.qualifications.map((q) => <li key={q.en}><Award size={15} /> {ar ? q.ar : q.en}</li>)}</ul>
              <p className="fieldHint">{t("المؤهلات ما اتراجعت من S4U.", "Qualifications have not been reviewed by S4U.")}</p>
            </div>
          )}

          <div className="card">
            <h2>{t("التقييمات", "Reviews")}</h2>
            <div className="emptyBox"><Star size={22} /> {t("مافي تقييمات لسه. التقييم بيكون بس بعد شغل اتنفّذ فعلاً.", "No reviews yet. Reviews are only possible after a completed job.")}</div>
          </div>
        </div>

        <aside className="card requestCard">
          {sent ? (
            <div className="success">
              <CheckCircle2 size={40} />
              <h3>{t("الطلب التجريبي جاهز", "Demo request prepared")}</h3>
              <p>{t("دي نسخة تجريبية. ما اترسل أي طلب وما اتحفظت بياناتك.", "This is a demo. No request was sent and nothing was stored.")}</p>
              <button className="btnSoft" onClick={() => setSent(false)}>{t("رجوع", "Back")}</button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="stack">
              <h2>{t("اطلب الخدمة", "Request this service")}</h2>
              <div className="serviceOptions">
                {pro.services.map((s) => (
                  <label key={s.en} className={service === s.en ? "chosen" : ""}>
                    <input type="radio" name="service" checked={service === s.en} onChange={() => setService(s.en)} />
                    <span>{ar ? s.ar : s.en}</span>
                    <strong>{s.pricing === "fixed" && s.price != null ? formatPrice(s.price, ar) : t("عرض سعر", "Get quote")}</strong>
                  </label>
                ))}
              </div>
              <Field label={t("وصف الشغل", "Describe the job")} hint={t("ما تكتب عنوان بيتك هنا.", "Do not enter your home address here.")}>
                <textarea required rows={4} maxLength={1000} value={desc} onChange={(e) => setDesc(e.target.value)} placeholder={t("اشرح المطلوب...", "What do you need?")} />
              </Field>
              {!binding && (
                <p className="warnNote">{t("الحرفي ده لسه ما اتعمد لطلبات ملزمة. الطلب الملزم بيكون بس بعد إكمال التحقق.", "This professional is not yet approved for binding jobs. A binding job is only possible after verification.")}</p>
              )}
              <button type="submit" className="btnPrimary wide">{t("متابعة (تجريبي)", "Continue (demo)")}</button>
              <p className="fieldHint">{t("ما بنرسل ولا بنحفظ أي بيانات.", "Nothing is sent or stored.")}</p>
            </form>
          )}
        </aside>
      </div>
    </div>
  );
}
