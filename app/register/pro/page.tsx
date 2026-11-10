"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Plus, Trash2, ImagePlus, X } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { getAuth } from "@/lib/auth";
import { CATEGORIES, CITIES, CURRENCY, formatPrice, type PricingModel } from "@/lib/data";
import { ONBOARDING_STEPS } from "@/lib/verification";
import { DemoNotice, Field, VerificationBadge } from "@/components/ui";
import { AccountFields, DemoSuccess, TermsCheckbox, emptyAccount, useAccountValidation, type Errors } from "@/components/forms";

type ServiceDraft = { name: string; pricing: PricingModel; price: string };
type Sample = { url: string; name: string };

const MAX_SAMPLES = 6;
const MAX_FILE_MB = 5;

export default function ProRegister() {
  const { ar, t } = useLang();
  const validateAccount = useAccountValidation();
  const [step, setStep] = useState(0);
  const [account, setAccount] = useState(emptyAccount);
  const [areas, setAreas] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [years, setYears] = useState("");
  const [learnedBy, setLearnedBy] = useState<"practice" | "training" | "both">("practice");
  const [about, setAbout] = useState("");
  const [services, setServices] = useState<ServiceDraft[]>([{ name: "", pricing: "quote", price: "" }]);
  const [samples, setSamples] = useState<Sample[]>([]);
  const [qualifications, setQualifications] = useState("");
  const [references, setReferences] = useState("");
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

  // Work samples stay in the browser only (object URLs). Revoke them on unmount.
  const samplesRef = useRef(samples);
  samplesRef.current = samples;
  useEffect(() => () => samplesRef.current.forEach((s) => URL.revokeObjectURL(s.url)), []);

  const steps = [t("الحساب", "Account"), t("شغلك", "Your work"), t("الخدمات والأسعار", "Services & prices"), t("المراجعة", "Review")];
  const toggle = (list: string[], set: (v: string[]) => void, v: string) => set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  function validate(s: number): Errors {
    const e: Errors = {};
    if (s === 0) Object.assign(e, validateAccount(account));
    if (s === 1) {
      if (!categories.length) e.categories = t("اختار مهنة واحدة على الأقل", "Choose at least one trade");
      if (!areas.length) e.areas = t("اختار منطقة شغل واحدة على الأقل", "Choose at least one work area");
      const y = Number(years);
      if (years === "" || !Number.isInteger(y) || y < 0 || y > 70) e.years = t("أدخل عدد سنين صحيح", "Enter a valid number of years");
      if (about.trim().length < 20) e.about = t("اكتب وصف قصير (٢٠ حرف على الأقل)", "Write a short description (at least 20 characters)");
    }
    if (s === 2) {
      services.forEach((sv, i) => {
        if (!sv.name.trim()) e[`svc${i}`] = t("أدخل اسم الخدمة", "Enter the service name");
        else if (sv.pricing === "fixed" && !(Number(sv.price) > 0)) e[`svc${i}`] = t("أدخل سعر صحيح", "Enter a valid price");
      });
    }
    if (s === 3 && !terms) e.terms = t("لازم توافق على الشروط", "You must accept the terms");
    return e;
  }

  function next() {
    const e = validate(step);
    setErrors(e);
    if (Object.keys(e).length) return;
    setStep(step + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function finish(ev: React.FormEvent) {
    ev.preventDefault();
    if (step < 3) return next();
    const e = validate(3);
    setErrors(e);
    if (Object.keys(e).length) return;
    // Demo mode: no-op provider. Nothing leaves the browser.
    const res = await getAuth().signUp({ email: account.email, password: account.password, role: "pro" });
    if (res.ok) {
      setAccount({ ...account, password: "" });
      setDone(true);
    }
  }

  function addFiles(files: FileList | null) {
    if (!files) return;
    const errs: string[] = [];
    const add: Sample[] = [];
    for (const f of Array.from(files)) {
      if (samples.length + add.length >= MAX_SAMPLES) { errs.push(t(`الحد الأقصى ${MAX_SAMPLES} صور`, `Maximum ${MAX_SAMPLES} photos`)); break; }
      if (!/^image\/(jpeg|png|webp)$/.test(f.type)) { errs.push(t("بس صور JPG أو PNG أو WebP", "Only JPG, PNG or WebP images")); continue; }
      if (f.size > MAX_FILE_MB * 1024 * 1024) { errs.push(t(`الصورة أكبر من ${MAX_FILE_MB} ميغا`, `Image larger than ${MAX_FILE_MB} MB`)); continue; }
      add.push({ url: URL.createObjectURL(f), name: f.name });
    }
    setSamples([...samples, ...add]);
    setErrors({ ...errors, samples: errs[0] });
  }

  function removeSample(i: number) {
    URL.revokeObjectURL(samples[i].url);
    setSamples(samples.filter((_, j) => j !== i));
  }

  const updateService = (i: number, patch: Partial<ServiceDraft>) => setServices(services.map((s, j) => (j === i ? { ...s, ...patch } : s)));
  const label = (rec: Record<string, { ar: string; en: string }>, k: string) => (ar ? rec[k].ar : rec[k].en);

  if (done) {
    return (
      <div className="shell section narrow">
        <DemoSuccess title={t("تم اختبار تسجيل الحرفي", "Professional sign-up tested")}>
          <div className="stepsList">
            <p><strong>{t("الخطوات بعد التفعيل الحقيقي:", "Steps once live:")}</strong></p>
            <ol>{ONBOARDING_STEPS.map((s) => <li key={s.en}>{ar ? s.ar : s.en}</li>)}</ol>
            <p className="fieldHint">{t("هدفنا إن التحقق ياخد ٥–١٥ دقيقة، لكن ده هدف وما مضمون.", "Our goal is 5–15 minutes for verification, but this is a target, not a guarantee.")}</p>
          </div>
        </DemoSuccess>
      </div>
    );
  }

  return (
    <div className="shell section narrow">
      <h1 className="pageTitle">{t("تسجيل حرفي", "Professional sign-up")}</h1>
      <p className="muted">{t("مجاني وبدون اشتراك شهري. الخبرة العملية بتتحسب، الشهادات اختيارية إلا في المهن المنظمة قانونياً.", "Free, no monthly subscription. Practical experience counts; certificates are optional except for legally regulated trades.")}</p>
      <DemoNotice />

      <ol className="stepper" aria-label={t("خطوات التسجيل", "Sign-up steps")}>
        {steps.map((s, i) => <li key={s} className={i === step ? "current" : i < step ? "done" : ""}><span>{i + 1}</span>{s}</li>)}
      </ol>

      <form className="card stack" onSubmit={finish} noValidate>
        {step === 0 && <AccountFields value={account} onChange={setAccount} errors={errors} />}

        {step === 1 && (
          <>
            <fieldset className={"field" + (errors.categories ? " hasError" : "")}>
              <legend className="fieldLabel">{t("المهنة (ممكن أكتر من واحدة)", "Trade (you can pick several)")}</legend>
              <div className="pillGrid">
                {Object.keys(CATEGORIES).map((k) => (
                  <label key={k} className={"pill" + (categories.includes(k) ? " on" : "")}>
                    <input type="checkbox" checked={categories.includes(k)} onChange={() => toggle(categories, setCategories, k)} />{label(CATEGORIES, k)}
                  </label>
                ))}
              </div>
              {errors.categories && <span className="fieldError">{errors.categories}</span>}
            </fieldset>
            <fieldset className={"field" + (errors.areas ? " hasError" : "")}>
              <legend className="fieldLabel">{t("مناطق الشغل", "Work areas")}</legend>
              <div className="pillGrid">
                {Object.keys(CITIES).map((k) => (
                  <label key={k} className={"pill" + (areas.includes(k) ? " on" : "")}>
                    <input type="checkbox" checked={areas.includes(k)} onChange={() => toggle(areas, setAreas, k)} />{label(CITIES, k)}
                  </label>
                ))}
              </div>
              {errors.areas && <span className="fieldError">{errors.areas}</span>}
            </fieldset>
            <div className="row2">
              <Field label={t("سنين الخبرة", "Years of experience")} error={errors.years}>
                <input type="number" inputMode="numeric" min={0} max={70} value={years} onChange={(e) => setYears(e.target.value)} />
              </Field>
              <Field label={t("اتعلمت الصنعة كيف؟", "How did you learn?")}>
                <select value={learnedBy} onChange={(e) => setLearnedBy(e.target.value as typeof learnedBy)}>
                  <option value="practice">{t("بالممارسة", "On the job")}</option>
                  <option value="training">{t("تدريب مهني / شهادة", "Vocational training / certificate")}</option>
                  <option value="both">{t("الاتنين", "Both")}</option>
                </select>
              </Field>
            </div>
            <Field label={t("وصف شغلك", "Describe your work")} error={errors.about} hint={t("شنو البتعملو؟ شنو المميز في شغلك؟", "What do you do? What makes your work good?")}>
              <textarea rows={4} maxLength={800} value={about} onChange={(e) => setAbout(e.target.value)} />
            </Field>
          </>
        )}

        {step === 2 && (
          <>
            <div className="field">
              <span className="fieldLabel">{t("خدماتك", "Your services")}</span>
              {services.map((s, i) => (
                <div key={i} className={"serviceDraft" + (errors[`svc${i}`] ? " hasError" : "")}>
                  <input aria-label={t("اسم الخدمة", "Service name")} placeholder={t("مثلاً: تركيب بريزة", "e.g. Install a socket")} value={s.name} maxLength={80} onChange={(e) => updateService(i, { name: e.target.value })} />
                  <select aria-label={t("طريقة التسعير", "Pricing")} value={s.pricing} onChange={(e) => updateService(i, { pricing: e.target.value as PricingModel })}>
                    <option value="fixed">{t("سعر ثابت", "Fixed price")}</option>
                    <option value="quote">{t("عرض سعر حسب الطلب", "Quote on request")}</option>
                  </select>
                  {s.pricing === "fixed" && (
                    <input aria-label={t("السعر", "Price")} type="number" inputMode="numeric" min={1} step={1} placeholder={ar ? CURRENCY.ar : CURRENCY.en} value={s.price} onChange={(e) => updateService(i, { price: e.target.value })} />
                  )}
                  {services.length > 1 && (
                    <button type="button" className="iconBtn" aria-label={t("حذف", "Remove")} onClick={() => setServices(services.filter((_, j) => j !== i))}><Trash2 size={17} /></button>
                  )}
                  {errors[`svc${i}`] && <span className="fieldError">{errors[`svc${i}`]}</span>}
                </div>
              ))}
              {services.length < 10 && (
                <button type="button" className="textbutton" onClick={() => setServices([...services, { name: "", pricing: "quote", price: "" }])}><Plus size={17} /> {t("أضف خدمة", "Add a service")}</button>
              )}
            </div>

            <div className={"field" + (errors.samples ? " hasError" : "")}>
              <span className="fieldLabel">{t("صور من شغلك", "Work samples")}</span>
              <div className="sampleGrid">
                {samples.map((s, i) => (
                  <div key={s.url} className="sample">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.url} alt={s.name} />
                    <button type="button" aria-label={t("حذف", "Remove")} onClick={() => removeSample(i)}><X size={14} /></button>
                  </div>
                ))}
                {samples.length < MAX_SAMPLES && (
                  <label className="sample add">
                    <ImagePlus size={24} />
                    <span>{t("أضف صورة", "Add photo")}</span>
                    <input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />
                  </label>
                )}
              </div>
              {errors.samples ? <span className="fieldError">{errors.samples}</span> : <span className="fieldHint">{t("الصور بتظهر هنا بس وما بتترفع (وضع تجريبي). ما تصوّر وجوه ناس أو أرقام بيوت.", "Photos are only previewed here and not uploaded (demo). Avoid people's faces and house numbers.")}</span>}
            </div>

            <Field label={t("مؤهلات (اختياري)", "Qualifications (optional)")} hint={t("شهادات، كورسات، رخص", "Certificates, courses, licences")}>
              <textarea rows={2} maxLength={500} value={qualifications} onChange={(e) => setQualifications(e.target.value)} />
            </Field>
            <Field label={t("مراجع (اختياري)", "References (optional)")} hint={t("ناس اشتغلت معاهم، بعد موافقتهم", "People you have worked for, with their consent")}>
              <textarea rows={2} maxLength={500} value={references} onChange={(e) => setReferences(e.target.value)} />
            </Field>
          </>
        )}

        {step === 3 && (
          <>
            <h2>{t("معاينة ملفك", "Profile preview")}</h2>
            <div className="previewBox">
              <div className="profileHead">
                <div className="avatar large" style={{ background: "#e6f4ef" }}>{(account.firstName[0] ?? "") + (account.lastName[0] ?? "")}</div>
                <div>
                  <h3>{account.firstName} {account.lastName}</h3>
                  <p className="muted">{categories.map((k) => label(CATEGORIES, k)).join("، ")}</p>
                  <p className="muted">{years} {t("سنة خبرة", "years experience")} · {areas.map((k) => label(CITIES, k)).join("، ")}</p>
                  <VerificationBadge status="unverified" />
                </div>
              </div>
              <p>{about}</p>
              <ul className="serviceList">
                {services.map((s, i) => <li key={i}><span>{s.name}</span><strong>{s.pricing === "fixed" ? formatPrice(Number(s.price), ar) : t("السعر حسب الطلب", "Price on request")}</strong></li>)}
              </ul>
              {samples.length > 0 && <div className="sampleGrid small">{samples.map((s) => <div key={s.url} className="sample">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={s.url} alt="" /></div>)}</div>}
              <p className="fieldHint">{t("رقم تلفونك وإيميلك ما بيظهروا في الملف العام.", "Your phone number and email are not shown on your public profile.")}</p>
            </div>
            <p className="warnNote">{t("ملفك بيبدأ «غير موثّق». قبل أول طلب ملزم لازم تكمّل التحقق من الهوية. الحالة دي بتغيّرها S4U بس، ما بتقدر تغيّرها براك.", "Your profile starts as “Not verified”. Before your first binding job you must complete identity verification. Only S4U can change this status.")}</p>
            <TermsCheckbox checked={terms} onChange={setTerms} error={errors.terms} />
          </>
        )}

        <div className="formNav">
          {step > 0 && <button type="button" className="btnSoft" onClick={() => { setErrors({}); setStep(step - 1); }}>{t("رجوع", "Back")}</button>}
          {step < 3
            ? <button key="next" type="button" className="btnPrimary" onClick={next}>{t("التالي", "Next")}</button>
            : <button key="submit" type="submit" className="btnPrimary">{t("إنشاء الحساب (تجريبي)", "Create account (demo)")}</button>}
        </div>
      </form>
      <p className="center muted">{t("عندك حساب؟", "Already have an account?")} <Link className="link" href="/login">{t("سجّل دخول", "Log in")}</Link></p>
    </div>
  );
}
