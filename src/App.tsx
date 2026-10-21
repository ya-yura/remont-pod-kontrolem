import React, { useState, useEffect } from 'react';
import {
  HERO_CONTENT,
  TRUST_PILLARS,
  RENOVATION_SERVICE_DIRECTIONS,
  KRASNODAR_DISTRICTS,
  SIMPLE_STEPS,
  RESPONSIBILITY_POINTS,
  FAQ_ITEMS,
  type ProofCategory,
} from './data/landingData';
import { InteriorStylesShowcaseSection } from './components/InteriorStylesShowcaseSection';
import { WorkProcessGallerySection } from './components/WorkProcessGallerySection';
import { DiyArticlesSection } from './components/DiyArticlesSection';
import { LeadFormSection } from './components/LeadFormSection';
import { PrivacyPolicyModal, OwnerLaunchKitModal } from './components/OwnerModals';
import type { FunnelStage, LeadRecord } from './utils/renovationLogic';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Check,
  MapPin,
  Play,
} from 'lucide-react';

const INITIAL_DEMO_LEADS: LeadRecord[] = [
  {
    id: 'DEMO-01',
    createdAt: '17.10.2026',
    name: '[Пример заявки] Сергей',
    phone: '+7 (918) 000-00-00',
    preferredChannel: 'telegram',
    objectType: 'Новостройка — нужен отдельный этап (электрика / сантехника / штукатурка)',
    district: 'Прикубанский округ (Губернский, Панорама, Восточно-Кругликовский)',
    startTimeline: 'По договорённости',
    comment: 'Нужен осмотр квартиры и расчёт чернового этапа по факту.',
    photosCount: 1,
    photoNames: ['plan_kvartiry.pdf'],
    funnelStage: 'site_inspection',
  },
];

interface HeroShowcaseSlide {
  id: string;
  tabLabel: string;
  kicker: string;
  title: string;
  specLine: string;
  imageUrl: string;
  proofCategory: ProofCategory;
}

const HERO_SHOWCASE_SLIDES: HeroShowcaseSlide[] = [
  {
    id: 'slide-3d-concept',
    tabLabel: '3D-Концепция',
    kicker: 'Дизайн-архитектура · Кухня-гостиная с островом',
    title: 'Пилоны в крупноформатном керамограните, шпон американского ореха и встроенный свет',
    specLine: 'Запил камня под 45° · Беспороговая стыковка · Интегрированная потолочная вытяжка',
    imageUrl: './assets/render-kitchen-marble.jpg',
    proofCategory: 'project-match',
  },
  {
    id: 'slide-portal',
    tabLabel: 'Свет и порталы',
    kicker: 'Реальный объект в Краснодаре · Чистовая геометрия',
    title: 'Многоуровневые графитовые световые порталы, теневой профиль и крупноформатный камень',
    specLine: 'Малярная подготовка Q4 · Примыкания к панорамным окнам · Линейные диффузоры',
    imageUrl: './assets/aistudio/photo_2026-10-20_08-40-35_1c4e2e6f.jpg',
    proofCategory: 'finishing',
  },
  {
    id: 'slide-copper',
    tabLabel: 'Медный узел',
    kicker: 'Скрытые инженерные системы · Сантехнический шкаф',
    title: 'Коллекторный узел на медной пайке с магистральными фильтрами Geyser Premier и Neptun',
    specLine: 'Коллекторы FAR · Редукторы давления · Защита от протечек с сервоприводами',
    imageUrl: './assets/aistudio/1778571106-7b2352c796cc041892c58ff331687445_12ba3472.jpg',
    proofCategory: 'engineering',
  },
  {
    id: 'slide-boiler',
    tabLabel: 'Нержавейка AISI',
    kicker: 'Инженерный стандарт · Котельные и пентхаусы',
    title: 'Промышленная культура сборки: нержавеющая сталь под пресс и автоматика SmartBox 2.0',
    specLine: 'Трубопроводы AISI 304 · Насосные группы · Звукоизоляция пола «Шуманет-100»',
    imageUrl: './assets/aistudio/1774514550-be2b734eda611f063b8345962840c814_9e0051dd.jpg',
    proofCategory: 'engineering',
  },
];

const TRUST_PILLAR_VISUALS: Record<
  string,
  { imageUrl: string; tag: string; spec: string; category: ProofCategory }
> = {
  '01': {
    imageUrl: './assets/stage-01-measurements.jpg?v=7',
    tag: 'Лазерная дефектовка 360°',
    spec: 'Промер перепадов стен и перекрытий до составления ведомости',
    category: 'stages',
  },
  '02': {
    imageUrl: './assets/stage-04-plastering.jpg?v=7',
    tag: 'Профильные звенья',
    spec: 'Отдельные мастера на инженерию, механизированную штукатурку и плитку',
    category: 'stages',
  },
  '03': {
    imageUrl: './assets/stage-06-reports.jpg?v=7',
    tag: 'Исполнительная фотосхема',
    spec: 'Съёмка каждой штробы, трассы и опрессовки в Telegram / WhatsApp',
    category: 'engineering',
  },
  '04': {
    imageUrl: './assets/stage-05-inspection.jpg?v=7',
    tag: 'Приёмка по 2-метровому правилу',
    spec: 'Оплата только после инструментальной проверки закрытого этапа',
    category: 'stages',
  },
};

const STEP_VISUALS: Record<
  string,
  { imageUrl: string; caption: string; badge: string }
> = {
  '01': {
    imageUrl: './assets/render-living-portal.jpg',
    badge: 'Анализ проекта или ТЗ',
    caption: 'Разбираем ваш дизайн-проект или помогаем сформировать техническое задание на месте',
  },
  '02': {
    imageUrl: './assets/stage-01-measurements.jpg?v=7',
    badge: 'Лазерный аудит на объекте',
    caption: 'Проверяем геометрию стен, стяжку, вентиляцию и вводные коммуникации вживую',
  },
  '03': {
    imageUrl: './assets/aistudio/1778571106-7b2352c796cc041892c58ff331687445_12ba3472.jpg',
    badge: 'Инженерная ведомость',
    caption: 'Фиксируем точный объём работ и спецификацию черновых материалов по факту',
  },
  '04': {
    imageUrl: './assets/aistudio/photo_2026-10-20_08-40-35_1c4e2e6f.jpg',
    badge: 'Реализация и технадзор',
    caption: 'Ведём объект от черновой инженерии до чистового света с фотоотчётами каждого узла',
  },
};

const SERVICE_VISUAL_MAP: Record<string, { imageUrl: string; caption: string; category: ProofCategory }> = {
  'service-newbuild': {
    imageUrl: './assets/aistudio/photo_2026-10-20_08-40-53_ddf4ffc8.jpg',
    caption: 'Реализация квартиры с нуля: бесшовные фрески, световые линии и единый контур пола',
    category: 'finishing',
  },
  'service-secondary': {
    imageUrl: './assets/aistudio/1772864416-4fbf785b251e4d1bc29823bc91b8b69c_e0e32c64.jpg',
    caption: 'Полное обновление инженерии и акустический контур «Шуманет-100» под стяжку',
    category: 'engineering',
  },
  'service-rough-engineering': {
    imageUrl: './assets/aistudio/1792383383-74a31d58d5213972b90cb66376f8b3ee_162770d9.jpg',
    caption: 'Узел ввода с 4 сервоприводами Neptun, рециркуляцией Wilo и гасителями гидроударов',
    category: 'engineering',
  },
  'service-finishing-bath': {
    imageUrl: './assets/aistudio/photo_2026-10-20_08-40-05_2cf89993.jpg',
    caption: 'Глубокая матовая покраска, лепной декор, классические молдинги и трековый свет',
    category: 'finishing',
  },
};

export default function App() {
  const [prefillComment, setPrefillComment] = useState('');
  const [selectedProofCategory, setSelectedProofCategory] = useState<ProofCategory | null>(null);
  const [activeHeroSlide, setActiveHeroSlide] = useState<number>(0);
  const [openFaqIds, setOpenFaqIds] = useState<Record<string, boolean>>({
    'faq-1': true,
    'faq-2': true,
  });
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);
  const [leads, setLeads] = useState<LeadRecord[]>(INITIAL_DEMO_LEADS);

  const handleJumpToProof = (category: ProofCategory) => {
    setSelectedProofCategory(category);
    trackEvent('jump_to_proof', { category });
    const el = document.getElementById('processes');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const trackEvent = (eventName: string, meta: Record<string, string> = {}) => {
    if (window.location.hostname.includes('github.io')) return;
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventName, meta }),
    }).catch(() => {});
  };

  useEffect(() => {
    trackEvent('page_view', { path: window.location.pathname });
    if (window.location.search.includes('admin') || window.location.search.includes('owner')) {
      setIsOwnerModalOpen(true);
    }
    if (window.location.hostname.includes('github.io')) {
      try {
        const stored = localStorage.getItem('owner_leads_v1');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setLeads(parsed);
          }
        }
      } catch {}
      return;
    }
    fetch('/api/leads')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data.leads) && data.leads.length > 0) {
          setLeads(data.leads);
        }
      })
      .catch(() => {});

    try {
      const savedToken = localStorage.getItem('owner_gh_token_v1');
      if (savedToken && savedToken.trim()) {
        fetch('/api/deploy-github', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            repo: 'ya-yura/remont-pod-kontrolem',
            branch: 'main',
            token: savedToken.trim(),
          }),
        }).catch(() => {});
      }
    } catch {}
  }, []);

  const handleJumpToForm = (contextComment?: string) => {
    if (contextComment) {
      setPrefillComment(contextComment);
    }
    trackEvent('cta_click_to_form', { context: contextComment || 'direct' });
    const formEl = document.getElementById('lead-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLeadSubmitted = (newLead: LeadRecord) => {
    setLeads((prev) => {
      const updated = [newLead, ...prev];
      try {
        localStorage.setItem('owner_leads_v1', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleUpdateLeadStage = (id: string, stage: FunnelStage) => {
    setLeads((prev) => {
      const updated = prev.map((l) => (l.id === id ? { ...l, funnelStage: stage } : l));
      try {
        localStorage.setItem('owner_leads_v1', JSON.stringify(updated));
      } catch {}
      return updated;
    });
    if (!window.location.hostname.includes('github.io')) {
      fetch(`/api/leads/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ funnelStage: stage }),
      }).catch(() => {});
    }
  };

  const toggleFaq = (id: string) => {
    setOpenFaqIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const currentSlide = HERO_SHOWCASE_SLIDES[activeHeroSlide] || HERO_SHOWCASE_SLIDES[0];

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#141413] font-sans antialiased selection:bg-[#042F24] selection:text-white">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 h-16 bg-[#F7F5F0]/95 backdrop-blur-md border-b border-stone-200/90 px-4 sm:px-8 flex items-center justify-between gap-8">
        <a
          href="#top"
          className="text-base sm:text-lg font-extrabold tracking-tight text-stone-950 whitespace-nowrap shrink-0"
        >
          Ремонт под контролем
        </a>

        <nav
          aria-label="Основная навигация"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600"
        >
          <a
            href="#visual-styles"
            className="hover:text-stone-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Визуализации
          </a>
          <a
            href="#approach"
            className="hover:text-stone-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Стандарты
          </a>
          <a
            href="#processes"
            className="hover:text-stone-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Объекты и узлы
          </a>
          <a
            href="#steps"
            className="hover:text-stone-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Регламент
          </a>
          <a
            href="#articles"
            className="hover:text-stone-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            База знаний
          </a>
        </nav>

        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={() => handleJumpToForm()}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#042F24] rounded-lg hover:bg-emerald-900 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Обсудить объект
          </button>
        </div>
      </header>

      <main id="top">
        {/* HERO SECTION — ARCHITECTURAL & ENGINEERING FIT-OUT STUDIO */}
        <section
          className="pt-10 pb-14 sm:pt-14 sm:pb-20 lg:pt-18 lg:pb-22 border-b border-stone-200/90 bg-arch-grid"
          aria-labelledby="hero-heading"
        >
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              {/* Left Column: Proposition, Visual Preview Strip & Engineering Manifesto */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-emerald-950 mb-4">
                    <span>{HERO_CONTENT.regionLine}</span>
                  </div>

                  <h1
                    id="hero-heading"
                    className="font-extrabold tracking-tight text-stone-950 leading-[1.06] mb-5"
                    style={{
                      fontSize: 'clamp(2.25rem, 3.7vw, 3.45rem)',
                      textWrap: 'balance',
                    }}
                  >
                    Инженерный ремонт квартир в Краснодаре{' '}
                    <span className="font-serif italic font-semibold text-[#042F24]">
                      под личным технадзором
                    </span>
                  </h1>

                  <p className="text-base sm:text-lg text-stone-700 leading-relaxed max-w-[58ch] mb-6">
                    {HERO_CONTENT.lead}
                  </p>

                  {/* Visual Mini-Showcase Card: 3D Project + Engineering + Real Implementation */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 max-w-[58ch] mb-7">
                    <div className="flex items-center justify-between gap-2 text-xs font-mono text-stone-500 mb-3">
                      <span className="font-semibold text-stone-900">
                        Принцип точной инженерной сметы и визуального контроля
                      </span>
                      <span>Без «от ... ₽/м²»</span>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                      {HERO_CONTENT.factNote}
                    </p>

                    {/* 3 Visual Preview Thumbnails Linking to Interactive Sections */}
                    <div className="grid grid-cols-3 gap-2.5 pt-3 border-t border-stone-200/80">
                      <a
                        href="#visual-styles"
                        className="group flex items-center gap-2.5 p-1.5 rounded-xl bg-[#F7F5F0] hover:bg-stone-200/70 transition-colors"
                      >
                        <img
                          src="./assets/render-kitchen-marble.jpg"
                          alt="3D-визуализации и стили"
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-lg object-cover shrink-0 border border-stone-300"
                        />
                        <div className="min-w-0">
                          <p className="text-[11px] font-bold text-stone-900 truncate">
                            4 стиля
                          </p>
                          <p className="text-[10px] text-stone-500 truncate">
                            3D-разбор узлов
                          </p>
                        </div>
                      </a>

                      <button
                        type="button"
                        onClick={() => handleJumpToProof('engineering')}
                        className="group flex items-center gap-2.5 p-1.5 rounded-xl bg-[#F7F5F0] hover:bg-stone-200/70 transition-colors text-left cursor-pointer"
                      >
                        <img
                          src="./assets/aistudio/1778571106-7b2352c796cc041892c58ff331687445_12ba3472.jpg"
                          alt="Медные коллекторные узлы"
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-lg object-cover shrink-0 border border-stone-300"
                        />
                        <div className="min-w-0">
                          <p className="text-[11px] font-bold text-stone-900 truncate">
                            Инженерия
                          </p>
                          <p className="text-[10px] text-stone-500 truncate">
                            Медь · AISI 304
                          </p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleJumpToProof('videos')}
                        className="group flex items-center gap-2.5 p-1.5 rounded-xl bg-[#F7F5F0] hover:bg-stone-200/70 transition-colors text-left cursor-pointer"
                      >
                        <img
                          src="./assets/aistudio/photo_2026-10-20_08-40-35_1c4e2e6f.jpg"
                          alt="Видеообходы объектов"
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-lg object-cover shrink-0 border border-stone-300"
                        />
                        <div className="min-w-0">
                          <p className="text-[11px] font-bold text-stone-900 truncate">
                            4 видео
                          </p>
                          <p className="text-[10px] text-stone-500 truncate">
                            Живые обходы
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <button
                      type="button"
                      onClick={() => handleJumpToForm()}
                      className="px-7 py-4 text-sm font-semibold text-white bg-[#042F24] rounded-xl hover:bg-emerald-900 transition-colors cursor-pointer whitespace-nowrap shrink-0 text-center"
                    >
                      {HERO_CONTENT.primaryCta}
                    </button>
                    <a
                      href="#visual-styles"
                      className="inline-flex items-center justify-center sm:justify-start gap-2 px-4 py-3 text-sm font-semibold text-stone-900 hover:text-[#042F24] transition-colors whitespace-nowrap shrink-0"
                    >
                      <span className="underline underline-offset-4">
                        Интерактивный 3D-разбор стилей и узлов
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Dark Obsidian Interactive Flagship Object Showcase with Visual Filmstrip */}
              <div className="lg:col-span-6 flex">
                <div className="w-full bg-[#0E1110] text-stone-100 border border-stone-800 rounded-2xl overflow-hidden flex flex-col justify-between">
                  {/* Top Interactive Switcher Bar inside Showcase */}
                  <div className="p-3 sm:px-5 sm:py-3.5 border-b border-white/10 flex flex-wrap items-center justify-between gap-2 bg-[#141816]">
                    <span className="text-xs font-mono text-[#D4A359]">
                      Витрина проектов и инженерии:
                    </span>
                    <div
                      role="tablist"
                      aria-label="Примеры узлов и визуализаций на наших объектах"
                      className="flex flex-wrap items-center gap-1 bg-black/50 p-1 rounded-lg border border-white/10"
                    >
                      {HERO_SHOWCASE_SLIDES.map((slide, idx) => (
                        <button
                          key={slide.id}
                          type="button"
                          role="tab"
                          aria-selected={activeHeroSlide === idx}
                          onClick={() => setActiveHeroSlide(idx)}
                          className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                            activeHeroSlide === idx
                              ? 'bg-[#D4A359] text-stone-950 font-semibold'
                              : 'text-stone-300 hover:text-white'
                          }`}
                        >
                          {slide.tabLabel}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Main Visual Frame */}
                  <div className="relative aspect-[16/10] w-full bg-black overflow-hidden border-b border-white/10">
                    <img
                      src={currentSlide.imageUrl}
                      alt={currentSlide.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-opacity duration-200"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

                    <button
                      type="button"
                      onClick={() => handleJumpToProof('videos')}
                      className="absolute top-3.5 right-3.5 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-950 bg-[#D4A359] hover:bg-[#e3b56b] rounded-lg shadow-md transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <Play className="w-3.5 h-3.5 fill-stone-950" />
                      Видео с объектов (4)
                    </button>

                    <div className="absolute bottom-3.5 left-4 right-4">
                      <p className="text-[11px] font-mono text-[#D4A359] mb-1">
                        {currentSlide.kicker}
                      </p>
                      <p className="text-sm sm:text-base font-bold text-white leading-snug">
                        {currentSlide.title}
                      </p>
                      <p className="text-xs text-stone-300 mt-1 hidden sm:block">
                        {currentSlide.specLine}
                      </p>
                    </div>
                  </div>

                  {/* Visual Filmstrip Selector + Archive Counter */}
                  <div className="p-4 sm:p-5 bg-[#121614] space-y-3.5">
                    <div className="grid grid-cols-4 gap-2">
                      {HERO_SHOWCASE_SLIDES.map((slide, idx) => {
                        const isSelected = activeHeroSlide === idx;
                        return (
                          <button
                            key={slide.id}
                            type="button"
                            onClick={() => setActiveHeroSlide(idx)}
                            className={`group relative rounded-xl overflow-hidden border text-left transition-all cursor-pointer ${
                              isSelected
                                ? 'border-[#D4A359] ring-2 ring-[#D4A359]/40'
                                : 'border-white/10 opacity-70 hover:opacity-100'
                            }`}
                          >
                            <div className="aspect-[16/10] w-full bg-black overflow-hidden">
                              <img
                                src={slide.imageUrl}
                                alt={slide.tabLabel}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-1.5 bg-[#161B19]">
                              <p className="text-[10px] font-mono text-stone-200 truncate">
                                {slide.tabLabel}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-1 text-xs">
                      <span className="font-mono text-stone-300 tabular-nums">
                        Доказательная база: 28 фото · 4 видео без ретуши
                      </span>
                      <button
                        type="button"
                        onClick={() => handleJumpToProof(currentSlide.proofCategory)}
                        className="inline-flex items-center gap-1 font-semibold text-[#D4A359] hover:text-[#e5be7d] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <span>Открыть весь архив</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Full-Width 4-Column Architectural Engineering Metrics Strip with Custom Vector Schematics */}
            <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-white border border-stone-200/90 rounded-2xl divide-y sm:divide-y-0 sm:divide-x divide-stone-200/90 overflow-hidden">
              <div className="p-5 sm:p-6 flex flex-col justify-between">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="font-mono text-xl sm:text-2xl font-bold text-stone-950 tabular-nums">
                      ±1.0 мм
                    </p>
                    <p className="text-xs font-semibold text-stone-900 mt-1">
                      Лазерная геометрия Q4
                    </p>
                  </div>
                  {/* Architectural Laser Crosshair SVG */}
                  <svg
                    className="w-10 h-10 text-[#042F24] shrink-0"
                    viewBox="0 0 40 40"
                    fill="none"
                    aria-hidden="true"
                  >
                    <rect x="4" y="4" width="32" height="32" rx="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                    <line x1="20" y1="2" x2="20" y2="38" stroke="#D4A359" strokeWidth="1.5" />
                    <line x1="2" y1="20" x2="38" y2="20" stroke="#D4A359" strokeWidth="1.5" />
                    <circle cx="20" cy="20" r="4" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Углы строго 90.0° под встроенную мебель и доводка плоскостей под боковой скользящий свет.
                </p>
              </div>

              <div className="p-5 sm:p-6 flex flex-col justify-between">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="font-mono text-xl sm:text-2xl font-bold text-stone-950">
                      Cu · AISI 304
                    </p>
                    <p className="text-xs font-semibold text-stone-900 mt-1">
                      Инженерия на меди и стали
                    </p>
                  </div>
                  {/* Collector Manifold Schematic SVG */}
                  <svg
                    className="w-10 h-10 text-[#042F24] shrink-0"
                    viewBox="0 0 40 40"
                    fill="none"
                    aria-hidden="true"
                  >
                    <rect x="6" y="10" width="28" height="6" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="12" y1="16" x2="12" y2="34" stroke="#D4A359" strokeWidth="2" />
                    <line x1="20" y1="16" x2="20" y2="34" stroke="#D4A359" strokeWidth="2" />
                    <line x1="28" y1="16" x2="28" y2="34" stroke="#D4A359" strokeWidth="2" />
                    <circle cx="20" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Сантехнические узлы на медной пайке, коллекторах FAR и защите от протечек Neptun.
                </p>
              </div>

              <div className="p-5 sm:p-6 flex flex-col justify-between">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="font-mono text-xl sm:text-2xl font-bold text-stone-950 tabular-nums">
                      3D ↔ Реал
                    </p>
                    <p className="text-xs font-semibold text-stone-900 mt-1">
                      Точное воплощение проекта
                    </p>
                  </div>
                  {/* Isometric Cube Blueprint SVG */}
                  <svg
                    className="w-10 h-10 text-[#042F24] shrink-0"
                    viewBox="0 0 40 40"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M20 5L34 13V27L20 35L6 27V13L20 5Z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M6 13L20 21L34 13" stroke="#D4A359" strokeWidth="1.5" />
                    <line x1="20" y1="21" x2="20" y2="35" stroke="#D4A359" strokeWidth="1.5" />
                  </svg>
                </div>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Сложные световые порталы, запилы керамогранита под 45° и фрески строго по визуализации.
                </p>
              </div>

              <div className="p-5 sm:p-6 flex flex-col justify-between">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="font-mono text-xl sm:text-2xl font-bold text-[#042F24] tabular-nums">
                      0 ₽ авансов
                    </p>
                    <p className="text-xs font-semibold text-stone-900 mt-1">
                      Оплата за принятый этап
                    </p>
                  </div>
                  {/* Shield Verification SVG */}
                  <svg
                    className="w-10 h-10 text-[#042F24] shrink-0"
                    viewBox="0 0 40 40"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M20 5L32 10V19C32 27.5 26.8 33.2 20 36C13.2 33.2 8 27.5 8 19V10L20 5Z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M15 20L18.5 23.5L26 16" stroke="#D4A359" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Проверили узел по двухметровому правилу, лазеру и акту опрессовки — закрыли этап.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1 (SECOND BLOCK AFTER HERO): LEAD FORM */}
        <LeadFormSection
          prefillComment={prefillComment}
          onOpenPrivacyPolicy={() => setIsPrivacyOpen(true)}
          onLeadSubmitted={handleLeadSubmitted}
          onTrackEvent={trackEvent}
        />

        {/* SECTION 2: INTERACTIVE INTERIOR STYLES, 3D HOTSPOTS & BEFORE/AFTER SLIDER (DOMEO / BLOC GROUP STYLE) */}
        <InteriorStylesShowcaseSection
          onJumpToProof={handleJumpToProof}
          onRequestConsultation={(text) => handleJumpToForm(text)}
          onTrackEvent={trackEvent}
        />

        {/* SECTION 3: ARCHITECTURAL STANDARDS & SERVICE DIRECTIONS WITH VISUAL CARDS */}
        <section
          id="approach"
          className="py-20 sm:py-28 border-b border-stone-200/90 bg-[#F7F5F0]"
          aria-labelledby="approach-heading"
        >
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-12">
              <div className="lg:col-span-8">
                <p className="text-xs font-mono text-emerald-950 tracking-wide mb-3 tabular-nums">
                  03 · Культура управления объектом · На стороне заказчика
                </p>
                <h2
                  id="approach-heading"
                  className="text-2xl sm:text-4xl font-bold tracking-tight text-stone-950 leading-[1.12]"
                  style={{ textWrap: 'balance' }}
                >
                  Почему с инженерным куратором и прорабом надёжнее,{' '}
                  <span className="font-serif italic font-semibold text-emerald-950">
                    чем сводить разрозненные бригады
                  </span>
                </h2>
              </div>
              <div className="lg:col-span-4 text-xs sm:text-sm text-stone-600 leading-relaxed">
                Берём на себя техническую стыковку всех смежников — от черновой инженерии и акустики до мебельщиков, светотехников и финишной малярки.
              </div>
            </div>

            {/* Visual Bento Grid for the 4 Trust Pillars (with Real Photography & Technical Specs) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {TRUST_PILLARS.map((item) => {
                const visual = TRUST_PILLAR_VISUALS[item.index];
                return (
                  <article
                    key={item.index}
                    className="bg-white border border-stone-200/90 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-stone-400 transition-colors"
                  >
                    <div>
                      {visual && (
                        <div
                          onClick={() => handleJumpToProof(visual.category)}
                          className="relative aspect-[16/10] w-full bg-stone-900 overflow-hidden border-b border-stone-200 cursor-pointer group"
                        >
                          <img
                            src={visual.imageUrl}
                            alt={item.title}
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white">
                            <span className="text-[#E5C185] font-bold">
                              Стандарт {item.index}
                            </span>
                            <span className="opacity-85 group-hover:opacity-100 underline underline-offset-4">
                              Фото →
                            </span>
                          </div>
                          <div className="absolute bottom-2.5 left-3 right-3">
                            <p className="text-[11px] font-mono text-stone-200 truncate">
                              {visual.tag}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="p-5 sm:p-6">
                        <h3 className="text-base sm:text-lg font-bold text-stone-950 mb-2.5 leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {visual && (
                      <div className="px-5 py-3 bg-[#F7F5F0]/80 border-t border-stone-200/80">
                        <p className="text-[11px] font-mono text-stone-600 leading-snug">
                          {visual.spec}
                        </p>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>

            {/* Claim-to-Proof Adjacency Bridge Strip */}
            <div className="mt-6 p-5 sm:p-6 bg-[#121614] text-stone-100 border border-stone-800 rounded-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-5">
              <div>
                <p className="text-xs font-mono text-[#D4A359] mb-1">
                  Прямое подтверждение со стройплощадок
                </p>
                <p className="text-sm sm:text-base font-bold text-white">
                  Каждый заявленный стандарт подтверждён макросъёмкой реальных узлов и видеообходами:
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => handleJumpToProof('engineering')}
                  className="px-4 py-2.5 text-xs font-semibold text-stone-100 bg-white/5 border border-white/15 rounded-xl hover:bg-white/10 transition-colors cursor-pointer whitespace-nowrap tabular-nums"
                >
                  Инженерные узлы (10 фото)
                </button>
                <button
                  type="button"
                  onClick={() => handleJumpToProof('finishing')}
                  className="px-4 py-2.5 text-xs font-semibold text-stone-100 bg-white/5 border border-white/15 rounded-xl hover:bg-white/10 transition-colors cursor-pointer whitespace-nowrap tabular-nums"
                >
                  Чистовая отделка (8 фото)
                </button>
                <button
                  type="button"
                  onClick={() => handleJumpToProof('videos')}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-stone-950 bg-[#D4A359] hover:bg-[#e2b46b] rounded-xl transition-colors cursor-pointer whitespace-nowrap tabular-nums"
                >
                  <Play className="w-3.5 h-3.5 fill-stone-950" />
                  Живые видео с объектов (4)
                </button>
              </div>
            </div>

            {/* YANDEX SEO CLUSTER: RENOVATION SERVICE DIRECTIONS WITH REAL OBJECT IMAGERY */}
            <div id="services" className="mt-20 pt-16 border-t border-stone-200/90">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
                <div className="max-w-2xl">
                  <p className="text-xs font-mono text-emerald-950 tracking-wide mb-3">
                    Специализация и инженерные компетенции · Поэтапно или под ключ
                  </p>
                  <h2
                    className="text-2xl sm:text-4xl font-bold tracking-tight text-stone-950 leading-[1.12]"
                    style={{ textWrap: 'balance' }}
                  >
                    Какие задачи по ремонту квартир и резиденций{' '}
                    <span className="font-serif italic font-semibold text-emerald-950">
                      мы организуем в Краснодаре
                    </span>
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 max-w-md leading-relaxed">
                  Вы можете поручить нам полную реализацию дизайн-проекта с нуля или начать с технически ответственного этапа — коллекторной сантехники, силового электромонтажа или геометрии стен.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {RENOVATION_SERVICE_DIRECTIONS.map((dir, index) => {
                  const visual = SERVICE_VISUAL_MAP[dir.id];
                  return (
                    <article
                      key={dir.id}
                      className="bg-white border border-stone-200/90 rounded-2xl overflow-hidden flex flex-col justify-between transition-colors hover:border-stone-400"
                    >
                      <div>
                        {visual && (
                          <div
                            onClick={() => handleJumpToProof(visual.category)}
                            className="relative aspect-[16/9] w-full bg-stone-950 overflow-hidden border-b border-stone-200 cursor-pointer group"
                          >
                            <img
                              src={visual.imageUrl}
                              alt={dir.title}
                              referrerPolicy="no-referrer"
                              loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                            <div className="absolute top-3.5 left-4 right-4 flex items-center justify-between text-xs font-mono text-white">
                              <span className="text-[#E5C185]">0{index + 1} · {dir.badge}</span>
                              <span className="underline underline-offset-4 opacity-90 group-hover:opacity-100">
                                Смотреть узлы →
                              </span>
                            </div>
                            <div className="absolute bottom-3 left-4 right-4">
                              <p className="text-xs text-stone-200 truncate">
                                {visual.caption}
                              </p>
                            </div>
                          </div>
                        )}

                        <div className="p-6 sm:p-7">
                          <h3 className="text-lg sm:text-xl font-bold text-stone-950 mb-2.5">
                            {dir.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-5">
                            {dir.description}
                          </p>
                          <ul className="space-y-2.5">
                            {dir.includedWorks.map((work) => (
                              <li key={work} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                                <Check className="w-4 h-4 text-[#042F24] shrink-0 mt-0.5" />
                                <span>{work}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="px-6 sm:px-7 py-4 bg-[#F7F5F0]/70 border-t border-stone-200/80 flex items-center justify-between gap-3">
                        <span className="text-xs font-mono text-stone-500">
                          Смета по факту лазерного обмера
                        </span>
                        <button
                          type="button"
                          onClick={() => handleJumpToForm(dir.prefillQuery)}
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#042F24] hover:text-emerald-800 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                        >
                          <span>Обсудить задачу</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Districts Bar */}
              <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-white border border-stone-200/90 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-950">
                    <MapPin className="w-4 h-4 text-[#042F24] shrink-0" />
                    <span>Инструментальный выезд во все округа и жилые комплексы Краснодара:</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {KRASNODAR_DISTRICTS.slice(0, 6).join(' · ')}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleJumpToForm('Нужен выезд на осмотр квартиры в Краснодаре.')}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#042F24] rounded-xl hover:bg-emerald-900 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Согласовать выезд на объект</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: DARK OBSIDIAN WORK PROCESS & OBJECTS GALLERY */}
        <WorkProcessGallerySection
          onTrackEvent={trackEvent}
          externalCategory={selectedProofCategory}
          onRequestInspection={(text) => handleJumpToForm(text)}
        />

        {/* SECTION 5: 4 ARCHITECTURAL STEPS WITH VISUAL CARDS & RESPONSIBILITY MATRIX */}
        <section
          id="steps"
          className="py-20 sm:py-28 border-b border-stone-200/90 bg-[#F7F5F0]"
          aria-labelledby="steps-heading"
        >
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <p className="text-xs font-mono text-emerald-950 tracking-wide mb-3 tabular-nums">
                05 · Регламент ведения объекта · Прозрачность на каждом этапе
              </p>
              <h2
                id="steps-heading"
                className="text-2xl sm:text-4xl font-bold tracking-tight text-stone-950 leading-[1.12]"
                style={{ textWrap: 'balance' }}
              >
                Как выстроен процесс — от первичного обмера{' '}
                <span className="font-serif italic font-semibold text-emerald-950">
                  до сдачи чистового узла
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              {SIMPLE_STEPS.map((s) => {
                const stepVis = STEP_VISUALS[s.step];
                return (
                  <div
                    key={s.step}
                    className="bg-white border border-stone-200/90 rounded-2xl overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      {stepVis && (
                        <div className="relative aspect-[16/10] w-full bg-stone-950 overflow-hidden border-b border-stone-200">
                          <img
                            src={stepVis.imageUrl}
                            alt={s.title}
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono">
                            <span className="px-2 py-0.5 rounded bg-[#D4A359] text-stone-950 font-bold tabular-nums">
                              Этап {s.step}
                            </span>
                            <span className="text-stone-200">{stepVis.badge}</span>
                          </div>
                        </div>
                      )}

                      <div className="p-5 sm:p-6">
                        <h3 className="text-base sm:text-lg font-bold text-stone-950 mb-2.5">
                          {s.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                          {s.description}
                        </p>
                      </div>
                    </div>

                    {stepVis && (
                      <div className="px-5 py-3 bg-[#F7F5F0]/80 border-t border-stone-200/80">
                        <p className="text-[11px] font-mono text-stone-600 leading-snug">
                          {stepVis.caption}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Contrasting 2-column Responsibility Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {RESPONSIBILITY_POINTS.map((block, idx) => {
                const isDark = idx === 0;
                return (
                  <div
                    key={block.role}
                    className={
                      isDark
                        ? 'bg-[#121614] text-stone-100 border border-stone-800 rounded-2xl p-6 sm:p-8'
                        : 'bg-white text-stone-900 border border-stone-200/90 rounded-2xl p-6 sm:p-8'
                    }
                  >
                    <p
                      className={`text-xs font-mono mb-2 ${
                        isDark ? 'text-[#D4A359]' : 'text-emerald-900'
                      }`}
                    >
                      {isDark ? 'Инженерное управление и технадзор' : 'Финансовая и договорная чистота'}
                    </p>
                    <h3
                      className={`text-lg sm:text-xl font-bold mb-5 ${
                        isDark ? 'text-white' : 'text-stone-950'
                      }`}
                    >
                      {block.role}
                    </h3>
                    <ul
                      className={`space-y-3.5 text-xs sm:text-sm ${
                        isDark ? 'text-stone-300' : 'text-stone-700'
                      }`}
                    >
                      {block.items.map((point) => (
                        <li key={point} className="flex items-start gap-3">
                          <Check
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              isDark ? 'text-[#D4A359]' : 'text-[#042F24]'
                            }`}
                          />
                          <span className="leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 6: PRACTICAL DIY ARTICLES */}
        <DiyArticlesSection
          onAskMaster={handleJumpToForm}
          onTrackEvent={trackEvent}
        />

        {/* SECTION 7: EDITORIAL SPLIT FAQ */}
        <section
          id="faq"
          className="py-20 sm:py-28 bg-white border-b border-stone-200/90"
          aria-labelledby="faq-heading"
        >
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              <div className="lg:col-span-4">
                <p className="text-xs font-mono text-emerald-950 tracking-wide mb-3 tabular-nums">
                  07 · Прямые ответы до старта работ
                </p>
                <h2
                  id="faq-heading"
                  className="text-2xl sm:text-4xl font-bold tracking-tight text-stone-950 leading-[1.14] mb-4"
                  style={{ textWrap: 'balance' }}
                >
                  Частые вопросы{' '}
                  <span className="font-serif italic font-semibold text-emerald-950">
                    перед осмотром квартиры
                  </span>
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
                  Собрали честные ответы о том, как формируется ведомость работ, как устроен поэтапный расчёт без предоплат и как контролировать стройку удалённо.
                </p>
                <button
                  type="button"
                  onClick={() => handleJumpToForm('Хочу задать вопрос по своей квартире и согласовать осмотр.')}
                  className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-white bg-[#042F24] rounded-xl hover:bg-emerald-900 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>Задать свой вопрос</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="lg:col-span-8 divide-y divide-stone-200 border-t border-b border-stone-200">
                {FAQ_ITEMS.map((item, idx) => {
                  const isOpen = !!openFaqIds[item.id];
                  return (
                    <div key={item.id} className="py-5">
                      <button
                        type="button"
                        onClick={() => toggleFaq(item.id)}
                        aria-expanded={isOpen}
                        className="w-full flex items-start justify-between gap-4 text-left cursor-pointer group"
                      >
                        <div className="flex items-baseline gap-3.5">
                          <span className="font-mono text-xs text-stone-400 tabular-nums shrink-0">
                            0{idx + 1}
                          </span>
                          <span className="text-sm sm:text-base font-bold text-stone-950 group-hover:text-[#042F24] transition-colors">
                            {item.question}
                          </span>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 text-stone-400 shrink-0 mt-1 transition-transform duration-150 ${
                            isOpen ? 'rotate-180 text-[#042F24]' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="mt-3 pl-7 pr-4 text-xs sm:text-sm text-stone-600 leading-relaxed">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* QUIET ARCHITECTURAL FOOTER */}
      <footer className="bg-[#0E1110] text-stone-400 py-14 px-4 sm:px-8 border-t border-stone-800">
        <div className="max-w-[1240px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div className="space-y-2 max-w-md">
            <p className="text-base font-extrabold text-white tracking-tight">
              Ремонт под контролем · Краснодар
            </p>
            <p className="text-xs text-stone-400 leading-relaxed">
              Инженерная организация и технический контроль ремонта квартир в новостройках и вторичном фонде Краснодара. Расчёт объёма работ строго по факту осмотра.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-stone-400">
            <a href="#visual-styles" className="hover:text-white transition-colors">
              Визуализации и стили
            </a>
            <a href="#approach" className="hover:text-white transition-colors">
              Стандарты
            </a>
            <a href="#processes" className="hover:text-white transition-colors">
              Объекты и узлы
            </a>
            <a href="#articles" className="hover:text-white transition-colors">
              База знаний
            </a>
            <button
              type="button"
              onClick={() => setIsPrivacyOpen(true)}
              className="hover:text-white underline underline-offset-4 transition-colors cursor-pointer"
            >
              Политика конфиденциальности
            </button>
            <button
              type="button"
              onClick={() => setIsOwnerModalOpen(true)}
              className="text-stone-600 hover:text-stone-400 transition-colors cursor-pointer"
            >
              Кабинет
            </button>
          </div>
        </div>
      </footer>

      <PrivacyPolicyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      <OwnerLaunchKitModal
        isOpen={isOwnerModalOpen}
        onClose={() => setIsOwnerModalOpen(false)}
        leads={leads}
        onUpdateLeadStage={handleUpdateLeadStage}
      />
    </div>
  );
}
