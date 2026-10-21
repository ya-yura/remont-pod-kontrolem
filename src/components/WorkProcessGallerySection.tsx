import React, { useState, useEffect, useMemo } from 'react';
import {
  DEFAULT_PROCESS_PHOTOS,
  SITE_VIDEO_WALKTHROUGHS,
  type WorkProcessPhotoItem,
  type SiteVideoWalkthroughItem,
  type ProofCategory,
} from '../data/landingData';
import {
  ZoomIn,
  X,
  Play,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowUpRight,
  SlidersHorizontal,
} from 'lucide-react';

interface WorkProcessGallerySectionProps {
  onTrackEvent: (eventName: string, meta?: Record<string, string>) => void;
  externalCategory?: ProofCategory | null;
  onRequestInspection?: (prefillText: string) => void;
}

const INITIAL_VISIBLE_COUNT = 6;

export const WorkProcessGallerySection: React.FC<WorkProcessGallerySectionProps> = ({
  onTrackEvent,
  externalCategory,
  onRequestInspection,
}) => {
  const [activeCategory, setActiveCategory] = useState<ProofCategory>('featured');
  const [showAllInTab, setShowAllInTab] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<SiteVideoWalkthroughItem | null>(null);

  useEffect(() => {
    if (externalCategory) {
      setActiveCategory(externalCategory);
      setShowAllInTab(false);
    }
  }, [externalCategory]);

  const counts = useMemo(() => {
    return {
      featured: DEFAULT_PROCESS_PHOTOS.filter((p) => p.featured).length,
      engineering: DEFAULT_PROCESS_PHOTOS.filter((p) => p.category === 'engineering').length,
      finishing: DEFAULT_PROCESS_PHOTOS.filter((p) => p.category === 'finishing').length,
      videos: SITE_VIDEO_WALKTHROUGHS.length,
      'project-match': DEFAULT_PROCESS_PHOTOS.filter((p) => p.category === 'project-match').length,
      stages: DEFAULT_PROCESS_PHOTOS.filter((p) => p.category === 'stages').length,
    };
  }, []);

  const filteredPhotos = useMemo(() => {
    if (activeCategory === 'featured') {
      return DEFAULT_PROCESS_PHOTOS.filter((p) => p.featured);
    }
    if (activeCategory === 'videos') {
      return [];
    }
    return DEFAULT_PROCESS_PHOTOS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const visiblePhotos = useMemo(() => {
    if (showAllInTab || activeCategory === 'featured' || activeCategory === 'project-match') {
      return filteredPhotos;
    }
    return filteredPhotos.slice(0, INITIAL_VISIBLE_COUNT);
  }, [filteredPhotos, showAllInTab, activeCategory]);

  const activePhoto: WorkProcessPhotoItem | null =
    activePhotoIndex !== null && filteredPhotos[activePhotoIndex]
      ? filteredPhotos[activePhotoIndex]
      : null;

  useEffect(() => {
    if (activePhotoIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActivePhotoIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActivePhotoIndex((prev) =>
          prev === null ? null : (prev + 1) % filteredPhotos.length
        );
      } else if (e.key === 'ArrowLeft') {
        setActivePhotoIndex((prev) =>
          prev === null ? null : (prev - 1 + filteredPhotos.length) % filteredPhotos.length
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, filteredPhotos.length]);

  const handleSelectTab = (cat: ProofCategory) => {
    setActiveCategory(cat);
    setShowAllInTab(false);
    setActivePhotoIndex(null);
    onTrackEvent('proof_tab_select', { category: cat });
  };

  const realPortalPhoto = DEFAULT_PROCESS_PHOTOS.find((p) => p.id === 'real-led-portal-living');
  const mainWalkthroughVideo = SITE_VIDEO_WALKTHROUGHS[0];

  return (
    <section
      id="processes"
      className="py-20 sm:py-28 border-b border-stone-900 bg-[#0E1110] text-stone-100 bg-arch-grid-dark"
      aria-labelledby="processes-heading"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end pb-10 border-b border-white/10">
          <div className="lg:col-span-8">
            <p className="text-xs font-mono text-[#D4A359] tracking-wide mb-3 tabular-nums">
              03 · Полевой архив объектов · 28 фото узлов · 4 живых видеообзора
            </p>
            <h2
              id="processes-heading"
              className="text-2xl sm:text-4xl lg:text-[2.65rem] font-bold tracking-tight text-white leading-[1.12]"
              style={{ textWrap: 'balance' }}
            >
              Инженерная культура и чистовая геометрия{' '}
              <span className="font-serif italic font-semibold text-[#E5C185]">
                без ретуши и декораций
              </span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-stone-300 leading-relaxed max-w-[66ch]">
              Уровень команды считывается не по чужим 3D-рендерам, а по тому, как собраны коллекторные узлы на меди и нержавеющей стали, как уложен звукоизоляционный контур «Шуманет-100» и как сходятся теневые примыкания при жёстком скользящем свете.
            </p>
          </div>

          <div className="lg:col-span-4">
            <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="flex items-center justify-between gap-2 text-xs text-stone-400 mb-2 tabular-nums">
                <span className="font-semibold text-white">Открытый технадзор</span>
                <span>·</span>
                <span className="font-mono text-[#D4A359]">ГОСТ / СНиП / Q4</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                Переключайте рубрики ниже: от медной обвязки и котельных SmartBox 2.0 до многоуровневых световых порталов, барельефов и прямого сравнения 3D-проекта с готовым залом.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Segmented Filter Bar (Functional Buttons — Zero Static Pills) */}
        <div className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div
            role="tablist"
            aria-label="Категории фото и видео с объектов"
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#171B19] border border-white/10 rounded-xl"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === 'featured'}
              onClick={() => handleSelectTab('featured')}
              className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 tabular-nums ${
                activeCategory === 'featured'
                  ? 'bg-[#D4A359] text-stone-950 shadow-xs'
                  : 'text-stone-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Избранные узлы ({counts.featured})
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === 'engineering'}
              onClick={() => handleSelectTab('engineering')}
              className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 tabular-nums ${
                activeCategory === 'engineering'
                  ? 'bg-[#D4A359] text-stone-950 shadow-xs'
                  : 'text-stone-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Инженерные системы ({counts.engineering})
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === 'finishing'}
              onClick={() => handleSelectTab('finishing')}
              className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 tabular-nums ${
                activeCategory === 'finishing'
                  ? 'bg-[#D4A359] text-stone-950 shadow-xs'
                  : 'text-stone-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Чистовая архитектура ({counts.finishing})
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === 'videos'}
              onClick={() => handleSelectTab('videos')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 tabular-nums ${
                activeCategory === 'videos'
                  ? 'bg-emerald-500 text-stone-950 shadow-xs'
                  : 'text-emerald-300 bg-emerald-950/60 border border-emerald-500/20 hover:bg-emerald-900/60'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Живые видео ({counts.videos})
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === 'project-match'}
              onClick={() => handleSelectTab('project-match')}
              className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeCategory === 'project-match'
                  ? 'bg-[#D4A359] text-stone-950 shadow-xs'
                  : 'text-stone-300 hover:text-white hover:bg-white/5'
              }`}
            >
              3D-проект ↔ Реализация
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === 'stages'}
              onClick={() => handleSelectTab('stages')}
              className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 tabular-nums ${
                activeCategory === 'stages'
                  ? 'bg-[#D4A359] text-stone-950 shadow-xs'
                  : 'text-stone-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Базовые этапы ({counts.stages})
            </button>
          </div>

          <div className="hidden xl:flex items-center gap-2 text-xs text-stone-400 shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#D4A359]" />
            <span>Нажмите на любое фото для макро-просмотра узла</span>
          </div>
        </div>

        {/* Featured View Cinema Banner: Direct Video Walkthrough Proof */}
        {activeCategory === 'featured' && mainWalkthroughVideo && (
          <div className="mb-10 rounded-2xl bg-[#151917] border border-white/10 overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#D4A359] mb-3 tabular-nums">
                  <span>Непрерывная съёмка с объекта</span>
                  <span aria-hidden="true">·</span>
                  <span>Бизнес-класс</span>
                  <span aria-hidden="true">·</span>
                  <span>01:12</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug mb-3">
                  Видеообход без склеек: ступенчатые световые порталы, пилоны в керамограните и «английская ёлочка»
                </h3>
                <p className="text-sm text-stone-300 leading-relaxed max-w-[60ch]">
                  Статичный кадр можно снять с выгодного ракурса, но на живом видео при боковом свете сразу видна реальная геометрия малярных углов, теневых зазоров и запилов крупноформатного камня под 45°.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setActiveVideo(mainWalkthroughVideo);
                    onTrackEvent('video_spotlight_open', { id: mainWalkthroughVideo.id });
                  }}
                  className="inline-flex items-center gap-2.5 px-5 py-3 text-xs sm:text-sm font-semibold text-stone-950 bg-[#D4A359] hover:bg-[#e0b26a] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Play className="w-4 h-4 fill-stone-950" />
                  Запустить видеообзор (01:12)
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectTab('videos')}
                  className="inline-flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold text-stone-200 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>Открыть все 4 видео с объектов</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div
              onClick={() => {
                setActiveVideo(mainWalkthroughVideo);
                onTrackEvent('video_spotlight_open', { id: mainWalkthroughVideo.id });
              }}
              className="lg:col-span-5 relative min-h-[240px] bg-stone-950 overflow-hidden border-t lg:border-t-0 lg:border-l border-white/10 cursor-pointer group"
            >
              <img
                src={mainWalkthroughVideo.posterUrl}
                alt={mainWalkthroughVideo.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105 opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-[#D4A359] text-stone-950 flex items-center justify-center shadow-lg transition-transform duration-150 group-hover:scale-110">
                  <Play className="w-6 h-6 fill-stone-950 ml-0.5" />
                </div>
              </div>
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs text-stone-200 font-mono">
                <span>Нажмите для воспроизведения со звуком</span>
                <span>HD · MP4</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: LIVE VIDEOS */}
        {activeCategory === 'videos' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SITE_VIDEO_WALKTHROUGHS.map((vid) => (
              <article
                key={vid.id}
                className="bg-[#151917] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between transition-colors hover:border-white/25"
              >
                <div>
                  <div className="relative aspect-video w-full bg-black overflow-hidden border-b border-white/10">
                    <video
                      src={vid.videoUrl}
                      poster={vid.posterUrl}
                      controls
                      preload="metadata"
                      playsInline
                      onPlay={() => onTrackEvent('site_video_play', { id: vid.id, title: vid.title })}
                      className="w-full h-full object-contain bg-black"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#D4A359] mb-2 tabular-nums">
                      <span>{vid.badge}</span>
                      <span aria-hidden="true">·</span>
                      <span>Хронометраж {vid.duration}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white leading-snug mb-2.5">
                      {vid.title}
                    </h3>
                    <p className="text-sm text-stone-300 leading-relaxed mb-4">{vid.summary}</p>
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-xs font-semibold text-white mb-1">
                        Инженерный фокус в кадре:
                      </p>
                      <p className="text-xs text-stone-400 leading-relaxed">{vid.whatToLookFor}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* TAB 2: 3D PROJECT VS REALIZATION */}
        {activeCategory === 'project-match' && (
          <div className="rounded-2xl bg-[#151917] border border-white/10 p-6 sm:p-8">
            <div className="max-w-3xl mb-8">
              <p className="text-xs font-mono text-[#D4A359] mb-2">
                Работа по дизайн-проектам · Без упрощения сложных узлов
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Как сложная 3D-визуализация переносится в реальный бетон, металл и свет миллиметр в миллиметр
              </h3>
              <p className="mt-2.5 text-sm text-stone-300 leading-relaxed">
                Ниже — исходные рендеры дизайн-проекта кухни-гостиной со ступенчатым световым порталом и пилонами в тёмном камне, а справа — наша фактическая сборка этого же зала на объекте.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {filteredPhotos.map((item, idx) => (
                <article
                  key={item.id}
                  className="bg-[#0E1110] border border-white/10 rounded-xl overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div
                      onClick={() => setActivePhotoIndex(idx)}
                      className="relative aspect-[4/3] bg-black overflow-hidden border-b border-white/10 cursor-pointer group"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActivePhotoIndex(idx);
                        }}
                        className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-black/75 hover:bg-black rounded-md border border-white/15 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                        Крупнее
                      </button>
                    </div>
                    <div className="p-5">
                      <p className="text-xs font-mono text-stone-400 mb-1.5">
                        {item.stageNumber}
                      </p>
                      <h4 className="text-base font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-xs text-stone-300 leading-relaxed">{item.whatWeCheck}</p>
                    </div>
                  </div>
                </article>
              ))}

              {realPortalPhoto && (
                <article className="bg-[#0E1110] border border-[#D4A359]/60 rounded-xl overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="relative aspect-[4/3] bg-black overflow-hidden border-b border-white/10">
                      <img
                        src={realPortalPhoto.imageUrl}
                        alt={realPortalPhoto.title}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      {mainWalkthroughVideo && (
                        <button
                          type="button"
                          onClick={() => setActiveVideo(mainWalkthroughVideo)}
                          className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-stone-950 bg-[#D4A359] hover:bg-[#e0b26a] rounded-lg shadow-md transition-colors cursor-pointer whitespace-nowrap"
                        >
                          <Play className="w-3.5 h-3.5 fill-stone-950" />
                          Смотреть видео этого зала
                        </button>
                      )}
                    </div>
                    <div className="p-5">
                      <p className="text-xs font-mono text-[#D4A359] mb-1.5">
                        Фактическая реализация на объекте · Без ретуши
                      </p>
                      <h4 className="text-base font-bold text-white mb-2">
                        Тот же световой портал и панорамный зал вживую
                      </h4>
                      <p className="text-xs text-stone-300 leading-relaxed">
                        Соблюдены все ступени светового портала, теневые примыкания потолка, матовые откосы и облицовка пилонов крупноформатным керамогранитом с запилом под 45°.
                      </p>
                    </div>
                  </div>
                </article>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: ARCHITECTURAL PHOTO GRIDS */}
        {activeCategory !== 'videos' && activeCategory !== 'project-match' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visiblePhotos.map((item, idx) => (
                <article
                  key={item.id}
                  className="group bg-[#151917] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between transition-colors hover:border-[#D4A359]/50"
                >
                  <div>
                    <div
                      onClick={() => {
                        setActivePhotoIndex(idx);
                        onTrackEvent('process_photo_zoom', { id: item.id, title: item.title });
                      }}
                      className="relative aspect-[4/3] w-full bg-black overflow-hidden border-b border-white/10 cursor-pointer"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-80" />

                      <div className="absolute top-3 right-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActivePhotoIndex(idx);
                            onTrackEvent('process_photo_zoom', { id: item.id, title: item.title });
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-black/75 hover:bg-black border border-white/15 rounded-lg backdrop-blur-xs transition-colors cursor-pointer whitespace-nowrap"
                          aria-label={`Увеличить фото: ${item.title}`}
                        >
                          <ZoomIn className="w-3.5 h-3.5 text-[#D4A359]" />
                          Детали узла
                        </button>
                      </div>

                      <div className="absolute bottom-3 left-4 right-4">
                        <p className="text-[11px] font-mono text-[#D4A359] truncate">
                          {item.stageNumber}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6">
                      <h3 className="text-base sm:text-lg font-bold text-white leading-snug mb-2.5 group-hover:text-[#E5C185] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                        {item.whatWeCheck}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 sm:px-6 py-3.5 border-t border-white/10 flex items-center justify-between text-xs text-stone-400">
                    <span className="truncate">{item.subtitle}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setActivePhotoIndex(idx);
                        onTrackEvent('process_photo_zoom', { id: item.id, title: item.title });
                      }}
                      className="inline-flex items-center gap-1 font-semibold text-[#D4A359] hover:text-[#e5be7d] transition-colors cursor-pointer whitespace-nowrap shrink-0 ml-3"
                    >
                      <span>Рассмотреть</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* Progressive Disclosure Footer */}
            <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs sm:text-sm text-stone-400">
                Показано <span className="font-semibold text-white tabular-nums">{visiblePhotos.length}</span> из{' '}
                <span className="font-semibold text-white tabular-nums">{filteredPhotos.length}</span> материалов выбранной рубрики
                {activeCategory === 'featured' && (
                  <span> · Полный архив: 28 фотографий узлов и 4 видео</span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {filteredPhotos.length > INITIAL_VISIBLE_COUNT && (
                  <button
                    type="button"
                    onClick={() => setShowAllInTab((prev) => !prev)}
                    className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-stone-950 bg-[#D4A359] hover:bg-[#e0b26a] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {showAllInTab
                      ? 'Свернуть до 6 карточек'
                      : `Показать все фото рубрики (+${filteredPhotos.length - INITIAL_VISIBLE_COUNT})`}
                  </button>
                )}

                {activeCategory === 'featured' && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleSelectTab('engineering')}
                      className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-stone-200 bg-white/5 border border-white/15 rounded-lg hover:bg-white/10 transition-colors cursor-pointer whitespace-nowrap tabular-nums"
                    >
                      Инженерные системы ({counts.engineering})
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelectTab('finishing')}
                      className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-stone-200 bg-white/5 border border-white/15 rounded-lg hover:bg-white/10 transition-colors cursor-pointer whitespace-nowrap tabular-nums"
                    >
                      Чистовая отделка и свет ({counts.finishing})
                    </button>
                  </>
                )}
              </div>
            </div>
          </>
        )}

        {/* Lightbox Modal for Photo Inspection */}
        {activePhoto && activePhotoIndex !== null && (
          <dialog
            open
            className="fixed inset-0 z-50 m-0 w-full h-full bg-black/90 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
            aria-label={activePhoto.title}
          >
            <div className="bg-[#141716] border border-white/15 rounded-2xl max-w-5xl w-full overflow-hidden shadow-2xl text-white">
              <div className="flex items-center justify-between gap-4 px-5 sm:px-6 py-4 border-b border-white/10">
                <div>
                  <p className="text-xs font-mono text-[#D4A359] tabular-nums">
                    {activePhoto.stageNumber} · Кадр {activePhotoIndex + 1} из {filteredPhotos.length}
                  </p>
                  <h3 className="text-sm sm:text-lg font-bold text-white mt-0.5">
                    {activePhoto.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActivePhotoIndex(null)}
                  aria-label="Закрыть просмотр фото"
                  className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative bg-black aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden flex items-center justify-center">
                <img
                  src={activePhoto.imageUrl}
                  alt={activePhoto.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />

                {filteredPhotos.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setActivePhotoIndex(
                          (activePhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length
                        )
                      }
                      aria-label="Предыдущее фото"
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/80 border border-white/15 text-white hover:bg-black transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setActivePhotoIndex((activePhotoIndex + 1) % filteredPhotos.length)
                      }
                      aria-label="Следующее фото"
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/80 border border-white/15 text-white hover:bg-black transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              <div className="p-5 sm:p-6 bg-[#181C1A] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="max-w-2xl">
                  <p className="text-xs font-mono text-[#D4A359] mb-1">
                    Технический регламент и проверка узла:
                  </p>
                  <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                    {activePhoto.whatWeCheck}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {onRequestInspection && (
                    <button
                      type="button"
                      onClick={() => {
                        const topic = `Понравился инженерный уровень («${activePhoto.title}»), хочу обсудить осмотр своей квартиры.`;
                        setActivePhotoIndex(null);
                        onRequestInspection(topic);
                      }}
                      className="px-4 py-2.5 text-xs font-semibold text-stone-950 bg-[#D4A359] hover:bg-[#e0b26a] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Запросить такой же стандарт
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setActivePhotoIndex(null)}
                    className="px-4 py-2.5 text-xs font-semibold text-stone-200 bg-white/5 border border-white/15 rounded-lg hover:bg-white/10 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Закрыть
                  </button>
                </div>
              </div>
            </div>
          </dialog>
        )}

        {/* Video Lightbox Modal */}
        {activeVideo && (
          <dialog
            open
            className="fixed inset-0 z-50 m-0 w-full h-full bg-black/90 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
            aria-label={activeVideo.title}
          >
            <div className="bg-[#141716] border border-white/15 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl text-white">
              <div className="flex items-center justify-between gap-4 px-5 sm:px-6 py-4 border-b border-white/10">
                <div>
                  <p className="text-xs font-mono text-[#D4A359] tabular-nums">
                    {activeVideo.badge} · {activeVideo.duration}
                  </p>
                  <h3 className="text-sm sm:text-lg font-bold text-white mt-0.5">
                    {activeVideo.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  aria-label="Закрыть видео"
                  className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-black aspect-video w-full overflow-hidden">
                <video
                  src={activeVideo.videoUrl}
                  poster={activeVideo.posterUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-5 sm:p-6 bg-[#181C1A] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-xs sm:text-sm text-stone-200 leading-relaxed max-w-2xl">
                  {activeVideo.whatToLookFor}
                </p>
                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  className="px-4 py-2.5 text-xs font-semibold text-stone-200 bg-white/5 border border-white/15 rounded-lg hover:bg-white/10 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  Закрыть видео
                </button>
              </div>
            </div>
          </dialog>
        )}
      </div>
    </section>
  );
};
