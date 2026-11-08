"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, MapPin, ShieldCheck, Eye, ClipboardCheck, MessageSquareText, Briefcase, UserPlus } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { CATEGORIES, CITIES, DEMO_PROS } from "@/lib/data";
import { Arrow, CategoryIcon, ProCard } from "@/components/ui";

export default function Home() {
  const { ar, t } = useLang();
  const [category, setCategory] = useState("all");
  const [city, setCity] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DEMO_PROS.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (city !== "all" && !p.areas.includes(city)) return false;
      if (!q) return true;
      const c = CATEGORIES[p.category];
      const hay = [p.name.en, p.name.ar, c.en, c.ar, CITIES[p.city].en, CITIES[p.city].ar, ...p.services.flatMap((s) => [s.en, s.ar])].join(" ").toLowerCase();
      return hay.includes(q);
    });
  }, [category, city, query]);

  const scrollToPros = () => document.getElementById("professionals")?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <section className="hero">
        <div className="shell heroInner">
          <div className="eyebrow">✦ {t("منصة جديدة لخدمات البيوت في السودان", "A new way to find home services in Sudan")}</div>
          <h1>{t("كل خدمات بيتك،", "Your home,")}<br /><em>{t("في مكان واحد.", "taken care of.")}</em></h1>
          <p>{t("لاقي حرفيين في منطقتك، قارن الخدمات والأسعار واطلب عرض سعر.", "Find local professionals, compare services and prices, and request a quote.")}</p>
          <form className="searchbar" onSubmit={(e) => { e.preventDefault(); scrollToPros(); }}>
            <Search size={22} color="#8290a0" />
            <input aria-label={t("بحث", "Search")} placeholder={t("شنو الخدمة البتفتش ليها؟", "What service do you need?")} value={query} onChange={(e) => setQuery(e.target.value)} />
            <button type="submit">{t("ابحث", "Search")} <Arrow size={18} /></button>
          </form>
          <div className="heroStats">
            <span><Briefcase size={18} /> {t("خبرة عملية معترف بيها", "Hands-on experience counts")}</span>
            <span><MapPin size={18} /> {t("بحث حسب المنطقة", "Search by area")}</span>
            <span><ShieldCheck size={18} /> {t("تحقق قبل أول طلب ملزم", "Checks before the first binding job")}</span>
          </div>
        </div>
        <div className="decor decor1" />
        <div className="decor decor2" />
      </section>

      <section className="shell section" id="services">
        <div className="sectionHead">
          <div>
            <span className="overline">{t("اكتشف", "EXPLORE")}</span>
            <h2>{t("شنو الخدمة البتحتاجها؟", "What can we help with?")}</h2>
            <p>{t("اختار نوع الخدمة ولاقي الحرفي المناسب", "Choose a service to find the right professional")}</p>
          </div>
          <button className="textbutton" onClick={() => { setCategory("all"); scrollToPros(); }}>{t("عرض الكل", "View all")} <Arrow size={17} /></button>
        </div>
        <div className="categories">
          {Object.entries(CATEGORIES).map(([key, c], i) => (
            <button key={key} className={"category " + (category === key ? "active" : "")} aria-pressed={category === key}
              onClick={() => { setCategory(category === key ? "all" : key); scrollToPros(); }}>
              <span className={"catIcon c" + i}><CategoryIcon category={key} /></span>
              <strong>{ar ? c.ar : c.en}</strong>
            </button>
          ))}
        </div>
      </section>

      <section className="soft" id="professionals">
        <div className="shell section">
          <div className="sectionHead">
            <div>
              <span className="overline">{t("أهل الصنعة", "PROFESSIONALS")}</span>
              <h2>{t("اتعرّف على الحرفيين", "Meet the professionals")}</h2>
              <p>{t("الملفات دي أمثلة توضيحية لحدي ما يسجّل حرفيين حقيقيين.", "These are example profiles until real professionals sign up.")}</p>
            </div>
            <div className="filters">
              <select aria-label={t("المنطقة", "Area")} value={city} onChange={(e) => setCity(e.target.value)}>
                <option value="all">{t("كل المناطق", "All areas")}</option>
                {Object.entries(CITIES).map(([k, c]) => <option key={k} value={k}>{ar ? c.ar : c.en}</option>)}
              </select>
            </div>
          </div>
          <div className="cards">{filtered.map((p) => <ProCard key={p.id} p={p} />)}</div>
          {filtered.length === 0 && <div className="empty">{t("ما لقينا نتائج. جرّب بحث تاني.", "No results. Try a different search.")}</div>}
          <div className="joinBox">
            <div>
              <h3>{t("إنت حرفي؟", "Are you a professional?")}</h3>
              <p>{t("التسجيل مجاني. اعرض شغلك وحدد أسعارك براك. الخبرة العملية بتتحسب.", "Joining is free. Show your work and set your own prices. Practical experience counts.")}</p>
            </div>
            <Link className="btnPrimary" href="/register/pro"><UserPlus size={18} /> {t("سجّل كحرفي", "Join as a pro")}</Link>
          </div>
        </div>
      </section>

      <section className="shell section" id="trust">
        <div className="sectionHead">
          <div>
            <span className="overline">{t("نظام الثقة المخطط", "OUR TRUST ROADMAP")}</span>
            <h2>{t("الثقة بتبدأ بالوضوح", "Trust starts with transparency")}</h2>
            <p>{t("كدا بنخطط نحمي العملاء والحرفيين لما الخدمة تبدأ فعلياً.", "This is how we plan to protect customers and professionals once the real service launches.")}</p>
          </div>
        </div>
        <div className="trustGrid">
          <article><span className="trustIcon"><ShieldCheck size={24} /></span><h3>{t("التحقق من الهوية", "Identity checks")}</h3><p>{t("أي زول بيقدر يسجّل، لكن قبل أول طلب ملزم لازم يكمّل التحقق المطلوب.", "Anyone can sign up, but the required checks must be completed before the first binding job.")}</p></article>
          <article><span className="trustIcon"><Eye size={24} /></span><h3>{t("صور شغل ومراجع", "Work samples & references")}</h3><p>{t("صور الشغل القديم والمراجع، من غير ما نخلط بين التحقق من الهوية والمهارة.", "Past work and references — without confusing identity checks with skill.")}</p></article>
          <article><span className="trustIcon"><ClipboardCheck size={24} /></span><h3>{t("S4U Protected — مخطط", "S4U Protected — planned")}</h3><p>{t("خدمة اختيارية مستقبلية: موظف من S4U يوثّق الشغل في الموقع. ما عندو صلاحيات شرطة.", "A future optional service: an S4U staff member documents the job on site. No police powers.")}</p></article>
          <article><span className="trustIcon"><MessageSquareText size={24} /></span><h3>{t("دعم عند المشاكل", "Dispute support")}</h3><p>{t("طريقة مخططة لتسجيل الشكاوي والمساعدة في حلها.", "A planned process for recording complaints and helping resolve them.")}</p></article>
        </div>
        <p className="trustDisclaimer">{t("الميزات دي مخططة ولسه ما اتفعّلت. حالياً S4U ما بتقدّم أي ضمان أو تأمين أو تحقق فعلي.", "These features are planned, not active. S4U currently provides no guarantee, insurance or real-world verification.")}</p>
      </section>

      <section className="shell section" id="how">
        <div className="sectionHead"><div><span className="overline">{t("بكل سهولة", "SIMPLE STEPS")}</span><h2>{t("S4U بتشتغل كيف؟", "How S4U works")}</h2></div></div>
        <div className="steps">
          <div><b>01</b><h3>{t("ابحث", "Search")}</h3><p>{t("اختار الخدمة والمنطقة", "Choose your service and area")}</p></div>
          <div><b>02</b><h3>{t("قارن", "Compare")}</h3><p>{t("شوف الملفات والخبرة والأسعار", "Compare profiles, experience and prices")}</p></div>
          <div><b>03</b><h3>{t("اطلب", "Request")}</h3><p>{t("سعر ثابت أو اطلب عرض سعر", "Fixed price or request a quote")}</p></div>
        </div>
      </section>
    </>
  );
}
