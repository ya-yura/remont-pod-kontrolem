import React, { useState, useMemo } from 'react';
import {
  DIY_ARTICLE_CATEGORIES,
  splitArticlesByReleaseDate,
  type DiyArticleCategory,
  type DiyArticleItem,
} from '../data/diyArticlesData';
import { DiyArticleDiagram } from './DiyArticleDiagram';
import {
  BookOpen,
  ArrowRight,
  X,
  Check,
  Search,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  Layers,
} from 'lucide-react';

interface DiyArticlesSectionProps {
  onAskMaster: (contextComment: string) => void;
  onTrackEvent: (eventName: string, meta?: Record<string, string>) => void;
}

const CATALOG_PAGE_SIZE = 5;

export const DiyArticlesSection: React.FC<DiyArticlesSectionProps> = ({
  onAskMaster,
  onTrackEvent,
}) => {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'Все темы' | DiyArticleCategory>('Все темы');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeArticle, setActiveArticle] = useState<DiyArticleItem | null>(null);
  const [checkedTools, setCheckedTools] = useState<Record<string, boolean>>({});

  const { published } = useMemo(() => splitArticlesByReleaseDate(), []);

  // Top 2 latest articles for the compact preview row
  const featuredArticles = useMemo(() => published.slice(0, 2), [published]);

  // Count per category for compact directory badges
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { 'Все темы': published.length };
    for (const cat of DIY_ARTICLE_CATEGORIES) {
      if (cat !== 'Все темы') {
        counts[cat] = published.filter((a) => a.category === cat).length;
      }
    }
    return counts;
  }, [published]);

  const filteredArticles = useMemo(() => {
    return published.filter((article) => {
      const matchesCat =
        selectedCategory === 'Все темы' || article.category === selectedCategory;
      if (!matchesCat) return false;

      const q = searchQuery.trim().toLowerCase();
      if (!q) return true;

      return (
        article.title.toLowerCase().includes(q) ||
        article.shortSummary.toLowerCase().includes(q) ||
        article.category.toLowerCase().includes(q) ||
        article.toolsAndMaterials.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [published, selectedCategory, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / CATALOG_PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedCatalogArticles = useMemo(() => {
    const start = (safePage - 1) * CATALOG_PAGE_SIZE;
    return filteredArticles.slice(start, start + CATALOG_PAGE_SIZE);
  }, [filteredArticles, safePage]);

  const handleCategoryChange = (category: 'Все темы' | DiyArticleCategory) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    if (!isCatalogOpen) {
      setIsCatalogOpen(true);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
    if (value.trim() && !isCatalogOpen) {
      setIsCatalogOpen(true);
    }
  };

  const handleOpenArticle = (article: DiyArticleItem) => {
    setActiveArticle(article);
    onTrackEvent('diy_article_open', { id: article.id, title: article.title });
  };

  const toggleToolCheck = (toolKey: string) => {
    setCheckedTools((prev) => ({ ...prev, [toolKey]: !prev[toolKey] }));
  };

  return (
    <section
      id="articles"
      className="py-20 sm:py-26 border-b border-stone-200/90 bg-[#F7F5F0] bg-arch-grid"
      aria-labelledby="articles-heading"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Header + Quick Search */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-8 border-b border-stone-200/90">
          <div className="max-w-2xl">
            <p className="text-xs font-mono text-emerald-950 tracking-wide mb-3 tabular-nums">
              05 · Инженерная база знаний · Разборы узлов и регламентов
            </p>
            <h2
              id="articles-heading"
              className="text-2xl sm:text-4xl font-bold tracking-tight text-stone-900 leading-[1.14]"
              style={{ textWrap: 'balance' }}
            >
              Прикладные инструкции и стандарты{' '}
              <span className="font-serif italic font-semibold text-emerald-950">
                простым человеческим языком
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
              Не на каждую бытовую задачу нужно вызывать бригаду. Здесь собраны пошаговые разборы частых домашних и инженерных работ с наглядными схемами, размерами ключей и чек-листами инструмента.
            </p>
          </div>

          {/* Instant Search Input that automatically opens compact catalog */}
          <div className="relative w-full lg:w-80 shrink-0">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Найти инструкцию: смеситель, обои..."
              aria-label="Поиск по практическим статьям"
              className="w-full pl-9 pr-3 py-3 text-xs sm:text-sm bg-white border border-stone-300 rounded-xl text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-emerald-900 transition-colors"
            />
          </div>
        </div>

        {/* Compact Featured Row: strictly 2 latest cards so the page never stretches */}
        {!searchQuery.trim() && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {featuredArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-colors hover:border-stone-400"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-stone-500 mb-3 tabular-nums">
                    <span className="font-semibold text-emerald-950">{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.displayDate}</span>
                    <span aria-hidden="true">·</span>
                    <span>Чтение {article.readTimeMinutes} мин</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-stone-900 leading-snug mb-2.5">
                    <button
                      type="button"
                      onClick={() => handleOpenArticle(article)}
                      className="text-left hover:text-emerald-950 transition-colors cursor-pointer"
                    >
                      {article.title}
                    </button>
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-5 line-clamp-3">
                    {article.shortSummary}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-stone-500 tabular-nums">
                    <Layers className="w-3.5 h-3.5 text-emerald-900 shrink-0" />
                    <span>Схема + {article.steps.length} шагов</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => handleOpenArticle(article)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-950 hover:text-emerald-800 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Читать разбор</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Collapsible Directory Accordion for 20, 50, 100, 1000+ articles */}
        <div className="bg-white border border-stone-200/90 rounded-2xl overflow-hidden">
          <div className="p-5 sm:px-7 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm sm:text-base font-bold text-stone-900">
                Справочник всех статей по рубрикам
              </span>
              <span className="text-xs font-mono text-stone-500 tabular-nums">
                ({published.length} материалов с поиском и фильтрацией)
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsCatalogOpen((prev) => !prev)}
              aria-expanded={isCatalogOpen}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-stone-900 bg-[#F7F5F0] border border-stone-300 rounded-xl hover:bg-stone-200/70 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>
                {isCatalogOpen
                  ? 'Свернуть каталог статей'
                  : `Показать все статьи по темам (${published.length})`}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-stone-600 transition-transform duration-150 ${
                  isCatalogOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>

          {isCatalogOpen && (
            <div className="border-t border-stone-200 p-4 sm:p-6 bg-[#FAF9F5]/60">
              {/* Category Tabs inside the compact directory */}
              <div
                role="tablist"
                aria-label="Фильтр статей по категориям"
                className="flex flex-wrap items-center gap-1.5 mb-4"
              >
                {DIY_ARTICLE_CATEGORIES.map((category) => {
                  const isActive = selectedCategory === category;
                  const count = categoryCounts[category] ?? 0;
                  return (
                    <button
                      key={category}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => handleCategoryChange(category)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        isActive
                          ? 'bg-emerald-950 text-white border-emerald-950 font-semibold'
                          : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      {category} ({count})
                    </button>
                  );
                })}
              </div>

              {/* Compact Paginated Single-Line Rows (max 5 per page) */}
              {filteredArticles.length === 0 ? (
                <div className="bg-white border border-stone-200 rounded-lg p-6 text-center">
                  <p className="text-sm font-bold text-stone-900 mb-1">
                    По вашему запросу ничего не найдено
                  </p>
                  <p className="text-xs text-stone-600 mb-3">
                    Попробуйте выбрать другую рубрику или очистить строку поиска.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('Все темы');
                      setSearchQuery('');
                      setCurrentPage(1);
                    }}
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-950 rounded-lg hover:bg-emerald-900 transition-colors cursor-pointer"
                  >
                    Сбросить фильтр
                  </button>
                </div>
              ) : (
                <>
                  <div className="bg-white border border-stone-200 rounded-lg divide-y divide-stone-200">
                    {paginatedCatalogArticles.map((article) => (
                      <div
                        key={article.id}
                        className="p-3.5 sm:px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:bg-stone-50 transition-colors"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="flex flex-wrap items-center gap-1.5 text-xs text-stone-500 mb-0.5 tabular-nums">
                            <span className="font-semibold text-emerald-900">
                              {article.category}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>{article.displayDate}</span>
                            <span aria-hidden="true">·</span>
                            <span>{article.steps.length} шагов + схема</span>
                            <span aria-hidden="true">·</span>
                            <span>{article.readTimeMinutes} мин</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleOpenArticle(article)}
                            className="text-sm font-bold text-stone-900 hover:text-emerald-950 text-left transition-colors cursor-pointer leading-snug"
                          >
                            {article.title}
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleOpenArticle(article)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-950 hover:text-emerald-800 transition-colors cursor-pointer whitespace-nowrap shrink-0 self-start sm:self-center"
                        >
                          <span>Открыть</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Pagination Footer — keeps height strictly bounded even at 1000+ articles */}
                  {totalPages > 1 && (
                    <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-600">
                      <span className="tabular-nums">
                        Показано {(safePage - 1) * CATALOG_PAGE_SIZE + 1}–
                        {Math.min(safePage * CATALOG_PAGE_SIZE, filteredArticles.length)} из{' '}
                        {filteredArticles.length} статей
                      </span>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          disabled={safePage <= 1}
                          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white border border-stone-300 rounded-md font-medium text-stone-700 hover:bg-stone-100 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                          <span>Назад</span>
                        </button>
                        <span className="px-2.5 py-1.5 font-semibold text-stone-900 tabular-nums">
                          Стр. {safePage} из {totalPages}
                        </span>
                        <button
                          type="button"
                          disabled={safePage >= totalPages}
                          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white border border-stone-300 rounded-md font-medium text-stone-700 hover:bg-stone-100 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                        >
                          <span>Вперёд</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* Full Article Reader Modal */}
        {activeArticle && (
          <dialog
            open
            className="fixed inset-0 z-50 m-0 w-full h-full bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
            aria-label={activeArticle.title}
          >
            <div className="bg-white border border-stone-200 rounded-xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-xl my-auto">
              {/* Sticky Modal Header */}
              <div className="flex items-start justify-between gap-4 px-5 sm:px-7 py-4 border-b border-stone-200 bg-[#FAF9F5] shrink-0">
                <div>
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-stone-500 mb-1 tabular-nums">
                    <span className="font-semibold text-emerald-900">
                      {activeArticle.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{activeArticle.displayDate}</span>
                    <span aria-hidden="true">·</span>
                    <span>Чтение {activeArticle.readTimeMinutes} мин</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-stone-900 leading-snug">
                    {activeArticle.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  aria-label="Закрыть статью"
                  className="p-2 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-200/60 transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Article Content */}
              <div className="p-5 sm:p-7 overflow-y-auto space-y-6 text-stone-800">
                {/* Why people ask / Context */}
                <div>
                  <h4 className="text-sm font-bold text-stone-900 mb-2">
                    В чём суть задачи и почему с ней сталкиваются
                  </h4>
                  <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                    {activeArticle.whyPeopleAsk}
                  </p>
                </div>

                {/* Contextual Visual Schematic Diagram */}
                <DiyArticleDiagram article={activeArticle} />

                {/* Interactive Checklist of Tools & Consumables */}
                <div className="bg-[#FAF9F5] border border-stone-200 rounded-xl p-5">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <h4 className="text-sm font-bold text-stone-900">
                      Что подготовить перед началом (можно отмечать галочками)
                    </h4>
                    <span className="text-xs text-stone-500">
                      Чек-лист инструмента
                    </span>
                  </div>
                  <ul className="space-y-2.5">
                    {activeArticle.toolsAndMaterials.map((tool, idx) => {
                      const key = `${activeArticle.id}-tool-${idx}`;
                      const isChecked = !!checkedTools[key];
                      return (
                        <li key={key}>
                          <label className="flex items-start gap-3 text-sm text-stone-700 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleToolCheck(key)}
                              className="mt-1 h-4 w-4 rounded border-stone-300 text-emerald-900 focus:ring-emerald-900 shrink-0 cursor-pointer"
                            />
                            <span className={isChecked ? 'line-through text-stone-400' : ''}>
                              {tool}
                            </span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Step-by-step instructions */}
                <div>
                  <h4 className="text-base font-bold text-stone-900 mb-4">
                    Пошаговый порядок работы
                  </h4>
                  <div className="space-y-4">
                    {activeArticle.steps.map((step) => (
                      <div
                        key={step.stepNumber}
                        className="border border-stone-200 rounded-xl p-4 sm:p-5 bg-white"
                      >
                        <p className="font-mono text-xs font-bold text-emerald-900 mb-1">
                          Шаг {step.stepNumber}
                        </p>
                        <h5 className="text-sm sm:text-base font-bold text-stone-900 mb-2">
                          {step.title}
                        </h5>
                        <p className="text-sm text-stone-700 leading-relaxed">
                          {step.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Common Mistakes */}
                <div className="bg-[#FAF9F5] border border-stone-200 rounded-xl p-5">
                  <h4 className="text-sm font-bold text-stone-900 mb-3">
                    На чём чаще всего обжигаются при первой попытке
                  </h4>
                  <ul className="space-y-2.5 text-sm text-stone-700">
                    {activeArticle.commonMistakes.map((mistake, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="font-mono text-xs font-bold text-stone-500 mt-0.5 shrink-0">
                          0{idx + 1}.
                        </span>
                        <span className="leading-relaxed">{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* When to call a master */}
                <div className="border border-stone-200 rounded-xl p-5 bg-white">
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-stone-900 mb-1">
                        Когда проще не рисковать самому
                      </h4>
                      <p className="text-sm text-stone-600 leading-relaxed">
                        {activeArticle.whenToCallMaster}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sticky Modal Footer */}
              <div className="px-5 sm:px-7 py-4 border-t border-stone-200 bg-[#FAF9F5] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    const title = activeArticle.title;
                    setActiveArticle(null);
                    onAskMaster(`Вопрос после статьи «${title}»: нужен осмотр и помощь на объекте.`);
                  }}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-950 rounded-lg hover:bg-emerald-900 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>Нужна помощь с ремонтом в Краснодаре? Обсудить задачу</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  className="px-4 py-2.5 text-xs font-semibold text-stone-700 bg-white border border-stone-300 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Закрыть статью
                </button>
              </div>
            </div>
          </dialog>
        )}
      </div>
    </section>
  );
};
