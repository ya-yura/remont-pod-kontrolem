import React from 'react';
import type { DiyArticleItem } from '../data/diyArticlesData';

interface DiyArticleDiagramProps {
  article: DiyArticleItem;
}

export const DiyArticleDiagram: React.FC<DiyArticleDiagramProps> = ({ article }) => {
  switch (article.id) {
    case 'diy-mixer-replacement':
      return (
        <figure className="bg-[#FAF9F5] border border-stone-200 rounded-xl p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2 mb-3">
            <figcaption className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Наглядная схема: выставление эксцентриков и сборка узла
            </figcaption>
            <span className="text-xs font-mono text-emerald-900 font-semibold">
              Межцентровое 150 мм
            </span>
          </div>
          <svg
            viewBox="0 0 680 230"
            className="w-full h-auto rounded-lg bg-white border border-stone-200"
            role="img"
            aria-label="Схема установки настенного смесителя на эксцентрики с уровнем 150 мм"
          >
            <defs>
              <pattern id="grid-mixer" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f5f5f4" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="680" height="230" fill="url(#grid-mixer)" />

            <text x="24" y="28" fill="#1c1917" fontSize="13" fontWeight="700">
              1. Выравнивание горизонта по уровню
            </text>

            <rect x="45" y="48" width="250" height="22" rx="4" fill="#ecfdf5" stroke="#065f46" strokeWidth="1.5" />
            <rect x="152" y="51" width="36" height="16" rx="3" fill="#ffffff" stroke="#065f46" strokeWidth="1.2" />
            <circle cx="170" cy="59" r="5" fill="#10b981" />
            <text x="170" y="42" textAnchor="middle" fill="#065f46" fontSize="11" fontWeight="600">
              Пузырёк строго по центру
            </text>

            <circle cx="95" cy="122" r="28" fill="#f5f5f4" stroke="#a8a29e" strokeWidth="2" strokeDasharray="4 2" />
            <circle cx="95" cy="112" r="14" fill="#fef2f2" stroke="#dc2626" strokeWidth="2" />
            <circle cx="95" cy="112" r="4" fill="#dc2626" />
            <text x="95" y="168" textAnchor="middle" fill="#57534e" fontSize="11" fontWeight="600">
              Горячая (слева)
            </text>

            <circle cx="245" cy="122" r="28" fill="#f5f5f4" stroke="#a8a29e" strokeWidth="2" strokeDasharray="4 2" />
            <circle cx="245" cy="112" r="14" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
            <circle cx="245" cy="112" r="4" fill="#2563eb" />
            <text x="245" y="168" textAnchor="middle" fill="#57534e" fontSize="11" fontWeight="600">
              Холодная (справа)
            </text>

            <line x1="95" y1="112" x2="95" y2="202" stroke="#065f46" strokeWidth="1.2" strokeDasharray="3 3" />
            <line x1="245" y1="112" x2="245" y2="202" stroke="#065f46" strokeWidth="1.2" strokeDasharray="3 3" />
            <line x1="95" y1="194" x2="245" y2="194" stroke="#065f46" strokeWidth="2" />
            <polygon points="95,194 103,189 103,199" fill="#065f46" />
            <polygon points="245,194 237,189 237,199" fill="#065f46" />
            <rect x="130" y="183" width="80" height="20" rx="4" fill="#ffffff" />
            <text x="170" y="197" textAnchor="middle" fill="#065f46" fontSize="12" fontWeight="700">
              150 мм ± 1 мм
            </text>

            <line x1="340" y1="18" x2="340" y2="212" stroke="#e7e5e4" strokeWidth="1.5" />

            <text x="364" y="28" fill="#1c1917" fontSize="13" fontWeight="700">
              2. Сборка без протечек (в разрезе)
            </text>

            <rect x="370" y="55" width="38" height="125" fill="#e7e5e4" stroke="#a8a29e" strokeWidth="1.5" />
            <text x="389" y="198" textAnchor="middle" fill="#57534e" fontSize="11">
              Стена
            </text>

            <rect x="408" y="96" width="42" height="36" fill="#d97706" opacity="0.25" stroke="#b45309" strokeWidth="1.5" />
            <line x1="416" y1="96" x2="416" y2="132" stroke="#b45309" strokeWidth="1.5" />
            <line x1="426" y1="96" x2="426" y2="132" stroke="#b45309" strokeWidth="1.5" />
            <line x1="436" y1="96" x2="436" y2="132" stroke="#b45309" strokeWidth="1.5" />
            <text x="435" y="76" textAnchor="middle" fill="#b45309" fontSize="11" fontWeight="600">
              Лён + паста (1/2&quot;)
            </text>

            <rect x="450" y="88" width="54" height="52" fill="#f59e0b" opacity="0.2" stroke="#b45309" strokeWidth="1.8" />
            <text x="477" y="118" textAnchor="middle" fill="#78350f" fontSize="10" fontWeight="700">
              Эксцентрик
            </text>

            <rect x="504" y="88" width="14" height="52" rx="2" fill="#10b981" stroke="#047857" strokeWidth="1.5" />
            <line x1="511" y1="88" x2="511" y2="62" stroke="#047857" strokeWidth="1.2" />
            <text x="535" y="56" textAnchor="middle" fill="#065f46" fontSize="11" fontWeight="700">
              Силиконовая прокладка 3/4&quot;
            </text>

            <rect x="518" y="80" width="52" height="68" rx="4" fill="#f5f5f4" stroke="#57534e" strokeWidth="2" />
            <text x="544" y="118" textAnchor="middle" fill="#1c1917" fontSize="10" fontWeight="700">
              Гайка
            </text>
            <rect x="570" y="92" width="75" height="44" rx="4" fill="#fafaf9" stroke="#78716c" strokeWidth="1.5" />
            <text x="607" y="118" textAnchor="middle" fill="#44403c" fontSize="11" fontWeight="600">
              Смеситель
            </text>

            <text x="515" y="182" textAnchor="middle" fill="#44403c" fontSize="11">
              Не крутить эксцентрик назад &gt; 15° · Гайку тянуть через изоленту
            </text>
          </svg>
        </figure>
      );

    case 'diy-pressure-reducer':
      return (
        <figure className="bg-[#FAF9F5] border border-stone-200 rounded-xl p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2 mb-3">
            <figcaption className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Наглядная схема: правильная последовательность узла ввода воды
            </figcaption>
            <span className="text-xs font-mono text-emerald-900 font-semibold">
              Норма в квартире: 3,0 бар
            </span>
          </div>
          <svg
            viewBox="0 0 680 210"
            className="w-full h-auto rounded-lg bg-white border border-stone-200"
            role="img"
            aria-label="Схема установки редуктора давления воды после косого фильтра-грязевика"
          >
            <rect x="25" y="102" width="630" height="16" fill="#e7e5e4" stroke="#78716c" strokeWidth="1.5" />

            <rect x="55" y="88" width="76" height="44" rx="6" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.8" />
            <rect x="75" y="72" width="46" height="10" rx="3" fill="#dc2626" />
            <text x="93" y="114" textAnchor="middle" fill="#991b1b" fontSize="11" fontWeight="700">
              1. Вводной кран
            </text>
            <text x="93" y="152" textAnchor="middle" fill="#57534e" fontSize="10">
              От стояка (5–8 бар)
            </text>

            <polygon points="155,110 145,104 145,116" fill="#065f46" />

            <rect x="170" y="88" width="105" height="44" rx="6" fill="#fffbeb" stroke="#b45309" strokeWidth="1.8" />
            <path d="M 215 132 L 240 165 L 258 152 L 235 132 Z" fill="#fde68a" stroke="#b45309" strokeWidth="1.5" />
            <text x="222" y="114" textAnchor="middle" fill="#78350f" fontSize="11" fontWeight="700">
              2. Косой фильтр
            </text>
            <text x="222" y="185" textAnchor="middle" fill="#b45309" fontSize="10" fontWeight="600">
              Промыть сетку!
            </text>

            <polygon points="302,110 292,104 292,116" fill="#065f46" />

            <rect x="315" y="82" width="150" height="56" rx="8" fill="#ecfdf5" stroke="#065f46" strokeWidth="2" />
            <circle cx="390" cy="44" r="26" fill="#ffffff" stroke="#065f46" strokeWidth="2" />
            <line x1="390" y1="44" x2="404" y2="32" stroke="#dc2626" strokeWidth="2" />
            <circle cx="390" cy="44" r="3" fill="#1c1917" />
            <text x="390" y="61" textAnchor="middle" fill="#065f46" fontSize="9" fontWeight="700">
              3.0 bar
            </text>
            <line x1="390" y1="70" x2="390" y2="82" stroke="#065f46" strokeWidth="2" />

            <text x="390" y="106" textAnchor="middle" fill="#065f46" fontSize="12" fontWeight="700">
              3. Мембранный редуктор
            </text>
            <text x="390" y="124" textAnchor="middle" fill="#047857" fontSize="11" fontWeight="600">
              Строго по стрелке ➔
            </text>
            <text x="390" y="160" textAnchor="middle" fill="#065f46" fontSize="10" fontWeight="600">
              Настройка при закрытых кранах
            </text>

            <polygon points="492,110 482,104 482,116" fill="#065f46" />

            <rect x="505" y="88" width="125" height="44" rx="6" fill="#f5f5f4" stroke="#57534e" strokeWidth="1.8" />
            <text x="567" y="114" textAnchor="middle" fill="#1c1917" fontSize="11" fontWeight="700">
              4. Счётчик → В квартиру
            </text>
            <text x="567" y="152" textAnchor="middle" fill="#065f46" fontSize="10" fontWeight="600">
              Стабильные 3,0 бара
            </text>
          </svg>
        </figure>
      );

    case 'diy-wallpaper-hanging':
      return (
        <figure className="bg-[#FAF9F5] border border-stone-200 rounded-xl p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2 mb-3">
            <figcaption className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Наглядная схема: отбивка первой вертикали и проход кривого угла
            </figcaption>
            <span className="text-xs font-mono text-emerald-900 font-semibold">
              Окна закрыты · Клей на стену
            </span>
          </div>
          <svg
            viewBox="0 0 680 220"
            className="w-full h-auto rounded-lg bg-white border border-stone-200"
            role="img"
            aria-label="Схема поклейки первой полосы флизелиновых обоев по уровню от угла"
          >
            <path d="M 55 20 L 72 200" stroke="#dc2626" strokeWidth="3" strokeDasharray="5 3" />
            <text x="78" y="42" fill="#dc2626" fontSize="11" fontWeight="700">
              Кривой угол стены (завал ~1 см)
            </text>

            <rect x="65" y="25" width="185" height="170" fill="#ecfdf5" opacity="0.65" stroke="#065f46" strokeWidth="1.5" />
            <text x="157" y="72" textAnchor="middle" fill="#065f46" fontSize="12" fontWeight="700">
              Полоса №1 (106 см)
            </text>
            <text x="157" y="92" textAnchor="middle" fill="#047857" fontSize="11">
              Запас 1–2 см с подрезкой в углу
            </text>

            <line x1="157" y1="110" x2="157" y2="175" stroke="#065f46" strokeWidth="1.8" />
            <line x1="157" y1="125" x2="115" y2="145" stroke="#065f46" strokeWidth="1.5" />
            <line x1="157" y1="125" x2="198" y2="145" stroke="#065f46" strokeWidth="1.5" />
            <line x1="157" y1="150" x2="115" y2="170" stroke="#065f46" strokeWidth="1.5" />
            <line x1="157" y1="150" x2="198" y2="170" stroke="#065f46" strokeWidth="1.5" />
            <text x="157" y="188" textAnchor="middle" fill="#065f46" fontSize="10" fontWeight="600">
              Разглаживание «ёлочкой» от центра
            </text>

            <line x1="250" y1="15" x2="250" y2="205" stroke="#059669" strokeWidth="3" />
            <circle cx="250" cy="24" r="5" fill="#059669" />
            <text x="262" y="34" fill="#065f46" fontSize="12" fontWeight="700">
              Строгая вертикаль по лазеру / отвесу
            </text>
            <text x="262" y="50" fill="#57534e" fontSize="11">
              Отступ от угла = ширина рулона минус 2 см (104 см)
            </text>

            <rect x="252" y="65" width="185" height="130" fill="#f5f5f4" stroke="#78716c" strokeWidth="1.5" />
            <text x="344" y="122" textAnchor="middle" fill="#1c1917" fontSize="12" fontWeight="700">
              Полоса №2 (встык без нахлёста)
            </text>
            <text x="344" y="142" textAnchor="middle" fill="#57534e" fontSize="11">
              Клей на стену шире полотна на +10 см
            </text>

            <rect x="460" y="65" width="195" height="130" rx="8" fill="#fafaf9" stroke="#d6d3d1" strokeWidth="1.5" />
            <text x="475" y="92" fill="#1c1917" fontSize="12" fontWeight="700">
              Памятка по флизелину:
            </text>
            <text x="475" y="114" fill="#44403c" fontSize="11">
              • Запас сверху/снизу: +5–7 см
            </text>
            <text x="475" y="134" fill="#44403c" fontSize="11">
              • Подрезка по широкому шпателю
            </text>
            <text x="475" y="154" fill="#44403c" fontSize="11">
              • Новое лезвие каждые 2–3 реза
            </text>
            <text x="475" y="174" fill="#065f46" fontSize="11" fontWeight="600">
              • Сушка 24 часа без сквозняка
            </text>
          </svg>
        </figure>
      );

    case 'diy-baseboard-installation':
      return (
        <figure className="bg-[#FAF9F5] border border-stone-200 rounded-xl p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2 mb-3">
            <figcaption className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Наглядная схема: запил углов 45° и крепление только к стене
            </figcaption>
            <span className="text-xs font-mono text-emerald-900 font-semibold">
              Ламинат не прижимать клеем
            </span>
          </div>
          <svg
            viewBox="0 0 680 220"
            className="w-full h-auto rounded-lg bg-white border border-stone-200"
            role="img"
            aria-label="Схема запила внутреннего и внешнего угла плинтуса и посадки на клей к стене"
          >
            <text x="24" y="28" fill="#1c1917" fontSize="13" fontWeight="700">
              1. Чем отличаются внутренний и внешний запил 45°
            </text>

            <rect x="24" y="45" width="145" height="150" rx="8" fill="#ecfdf5" stroke="#065f46" strokeWidth="1.5" />
            <text x="96" y="68" textAnchor="middle" fill="#065f46" fontSize="12" fontWeight="700">
              Внутренний угол
            </text>
            <polygon points="48,95 144,95 124,125 48,125" fill="#ffffff" stroke="#065f46" strokeWidth="2" />
            <text x="96" y="150" textAnchor="middle" fill="#1c1917" fontSize="11" fontWeight="600">
              Лицевая сторона
            </text>
            <text x="96" y="166" textAnchor="middle" fill="#065f46" fontSize="11" fontWeight="700">
              КОРОЧЕ спинки
            </text>

            <rect x="184" y="45" width="145" height="150" rx="8" fill="#fffbeb" stroke="#b45309" strokeWidth="1.5" />
            <text x="256" y="68" textAnchor="middle" fill="#78350f" fontSize="12" fontWeight="700">
              Внешний угол
            </text>
            <polygon points="208,95 284,95 304,125 208,125" fill="#ffffff" stroke="#b45309" strokeWidth="2" />
            <text x="256" y="150" textAnchor="middle" fill="#1c1917" fontSize="11" fontWeight="600">
              Лицевая сторона
            </text>
            <text x="256" y="166" textAnchor="middle" fill="#b45309" fontSize="11" fontWeight="700">
              ДЛИННЕЕ спинки
            </text>

            <line x1="352" y1="18" x2="352" y2="202" stroke="#e7e5e4" strokeWidth="1.5" />

            <text x="374" y="28" fill="#1c1917" fontSize="13" fontWeight="700">
              2. Посадка плинтуса в разрезе
            </text>

            <rect x="385" y="45" width="36" height="145" fill="#e7e5e4" stroke="#78716c" strokeWidth="1.5" />
            <text x="403" y="115" textAnchor="middle" fill="#44403c" fontSize="11" fontWeight="700" transform="rotate(-90 403 115)">
              СТЕНА
            </text>

            <circle cx="424" cy="78" r="5" fill="#10b981" />
            <line x1="430" y1="76" x2="495" y2="62" stroke="#065f46" strokeWidth="1.2" />
            <text x="502" y="65" fill="#065f46" fontSize="11" fontWeight="700">
              Акриловый герметик сверху
            </text>

            <path d="M 425 78 L 448 82 L 454 166 L 425 166 Z" fill="#ffffff" stroke="#1c1917" strokeWidth="2" />

            <circle cx="423" cy="98" r="4.5" fill="#d97706" />
            <circle cx="423" cy="146" r="4.5" fill="#d97706" />
            <line x1="428" y1="122" x2="495" y2="112" stroke="#b45309" strokeWidth="1.2" />
            <text x="502" y="112" fill="#b45309" fontSize="11" fontWeight="700">
              Клей только к стене (2 полосы)
            </text>

            <rect x="440" y="168" width="210" height="22" fill="#f5f5f4" stroke="#57534e" strokeWidth="1.5" />
            <text x="545" y="183" textAnchor="middle" fill="#1c1917" fontSize="11" fontWeight="600">
              Плавающий ламинат (к полу НЕ клеить!)
            </text>
          </svg>
        </figure>
      );

    case 'diy-silicone-sealant-bath':
      return (
        <figure className="bg-[#FAF9F5] border border-stone-200 rounded-xl p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2 mb-3">
            <figcaption className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Наглядная схема: почему чернеет шов и как сформировать правильный скос 45°
            </figcaption>
            <span className="text-xs font-mono text-emerald-900 font-semibold">
              Ванну наполнить на 1/2 водой
            </span>
          </div>
          <svg
            viewBox="0 0 680 215"
            className="w-full h-auto rounded-lg bg-white border border-stone-200"
            role="img"
            aria-label="Сравнение правильного скошенного шва силиконового герметика 45 градусов и вогнутого шва"
          >
            <rect x="20" y="20" width="305" height="175" rx="8" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1.5" />
            <text x="40" y="44" fill="#991b1b" fontSize="13" fontWeight="700">
              ОШИБКА: вдавленный шов мокрым пальцем
            </text>
            <rect x="45" y="60" width="28" height="105" fill="#e7e5e4" stroke="#78716c" strokeWidth="1.5" />
            <rect x="73" y="137" width="145" height="28" rx="4" fill="#ffffff" stroke="#78716c" strokeWidth="1.5" />
            <path d="M 73 105 Q 78 134 106 137 L 73 137 Z" fill="#a8a29e" />
            <ellipse cx="90" cy="126" rx="10" ry="5" fill="#2563eb" />
            <text x="122" y="96" fill="#991b1b" fontSize="11" fontWeight="600">
              • В «корытце» стоит вода
            </text>
            <text x="122" y="114" fill="#991b1b" fontSize="11" fontWeight="600">
              • Тонкий край отслаивается
            </text>
            <text x="122" y="132" fill="#991b1b" fontSize="11" fontWeight="600">
              • Через 3–4 мес. чёрный грибок
            </text>

            <rect x="345" y="20" width="315" height="175" rx="8" fill="#ecfdf5" stroke="#6ee7b7" strokeWidth="1.5" />
            <text x="365" y="44" fill="#065f46" fontSize="13" fontWeight="700">
              ПРАВИЛЬНО: прямой скос 45° шпателем
            </text>
            <rect x="370" y="60" width="28" height="105" fill="#e7e5e4" stroke="#78716c" strokeWidth="1.5" />
            <rect x="398" y="137" width="145" height="28" rx="4" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
            <text x="470" y="155" textAnchor="middle" fill="#1d4ed8" fontSize="10" fontWeight="700">
              Ванна с водой (рабочий вес)
            </text>
            <polygon points="398,102 433,137 398,137" fill="#10b981" stroke="#047857" strokeWidth="1.5" />
            <text x="450" y="92" fill="#065f46" fontSize="11" fontWeight="600">
              • Капля сразу скатывается вниз
            </text>
            <text x="450" y="110" fill="#065f46" fontSize="11" fontWeight="600">
              • Плотный клин внутри зазора
            </text>
            <text x="450" y="128" fill="#065f46" fontSize="11" fontWeight="600">
              • Санитарный 100% силикон
            </text>
          </svg>
        </figure>
      );

    case 'diy-socket-switch-replacement':
      return (
        <figure className="bg-[#FAF9F5] border border-stone-200 rounded-xl p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2 mb-3">
            <figcaption className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Наглядная схема: подключение жил L / PE / N и длина зачистки
            </figcaption>
            <span className="text-xs font-mono text-emerald-900 font-semibold">
              Автомат выключен · Зачистка 10–12 мм
            </span>
          </div>
          <svg
            viewBox="0 0 680 215"
            className="w-full h-auto rounded-lg bg-white border border-stone-200"
            role="img"
            aria-label="Схема подключения фазы, нуля и заземления в розетке и длины зачистки провода"
          >
            <text x="24" y="28" fill="#1c1917" fontSize="13" fontWeight="700">
              1. Распиновка клемм розетки
            </text>

            <rect x="65" y="45" width="190" height="145" rx="14" fill="#f5f5f4" stroke="#57534e" strokeWidth="2" />
            <circle cx="122" cy="118" r="10" fill="#1c1917" />
            <circle cx="198" cy="118" r="10" fill="#1c1917" />

            <circle cx="78" cy="118" r="5" fill="#ffffff" stroke="#065f46" strokeWidth="2" />
            <circle cx="242" cy="118" r="5" fill="#ffffff" stroke="#065f46" strokeWidth="2" />

            <line x1="112" y1="32" x2="112" y2="75" stroke="#92400e" strokeWidth="6" />
            <text x="112" y="92" textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="700">
              L (Фаза)
            </text>

            <line x1="160" y1="32" x2="160" y2="75" stroke="#16a34a" strokeWidth="6" />
            <line x1="160" y1="32" x2="160" y2="75" stroke="#eab308" strokeWidth="6" strokeDasharray="5 5" />
            <text x="160" y="92" textAnchor="middle" fill="#15803d" fontSize="11" fontWeight="700">
              PE (Земля)
            </text>

            <line x1="208" y1="32" x2="208" y2="75" stroke="#2563eb" strokeWidth="6" />
            <text x="208" y="92" textAnchor="middle" fill="#1d4ed8" fontSize="11" fontWeight="700">
              N (Ноль)
            </text>

            <text x="160" y="172" textAnchor="middle" fill="#44403c" fontSize="10" fontWeight="600">
              Крепить саморезами в ушки подрозетника
            </text>

            <line x1="315" y1="18" x2="315" y2="198" stroke="#e7e5e4" strokeWidth="1.5" />

            <text x="338" y="28" fill="#1c1917" fontSize="13" fontWeight="700">
              2. Правильная посадка жилы в клемму
            </text>

            <rect x="345" y="75" width="130" height="24" rx="4" fill="#2563eb" />
            <text x="410" y="91" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="600">
              Изоляция вплотную
            </text>

            <rect x="475" y="80" width="95" height="14" fill="#d97706" />

            <rect x="470" y="64" width="110" height="46" rx="4" fill="none" stroke="#065f46" strokeWidth="2" strokeDasharray="4 2" />
            <text x="525" y="56" textAnchor="middle" fill="#065f46" fontSize="11" fontWeight="700">
              Клемма зажимает ТОЛЬКО медь
            </text>

            <line x1="475" y1="128" x2="570" y2="128" stroke="#1c1917" strokeWidth="1.5" />
            <text x="522" y="145" textAnchor="middle" fill="#1c1917" fontSize="12" fontWeight="700">
              Зачистка 10–12 мм
            </text>
            <text x="500" y="172" textAnchor="middle" fill="#57534e" fontSize="11">
              • Изоляция не зажата под винтом
            </text>
            <text x="500" y="188" textAnchor="middle" fill="#57534e" fontSize="11">
              • Оголённая медь не торчит снаружи
            </text>
          </svg>
        </figure>
      );

    case 'diy-siphon-cleaning-replacement':
      return (
        <figure className="bg-[#FAF9F5] border border-stone-200 rounded-xl p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2 mb-3">
            <figcaption className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Наглядная схема: направление конусной прокладки сифона
            </figcaption>
            <span className="text-xs font-mono text-emerald-900 font-semibold">
              Без силикона · Затяжка от руки
            </span>
          </div>
          <svg
            viewBox="0 0 680 205"
            className="w-full h-auto rounded-lg bg-white border border-stone-200"
            role="img"
            aria-label="Схема установки конусной прокладки сифона узким краем в сторону резьбы"
          >
            <text x="24" y="30" fill="#1c1917" fontSize="13" fontWeight="700">
              Куда смотрит острый край конусной прокладки:
            </text>

            <rect x="85" y="55" width="44" height="58" fill="#f5f5f4" stroke="#78716c" strokeWidth="1.8" />
            <rect x="68" y="62" width="78" height="24" rx="4" fill="#e7e5e4" stroke="#44403c" strokeWidth="2" />
            <text x="195" y="78" fill="#1c1917" fontSize="12" fontWeight="700">
              1. Накидная гайка (давит на плоский торец)
            </text>

            <polygon points="74,94 140,94 126,120 88,120" fill="#10b981" stroke="#047857" strokeWidth="1.8" />
            <text x="195" y="112" fill="#065f46" fontSize="12" fontWeight="700">
              2. Конусная прокладка — ОСТРИЁМ ВНИЗ в раструб!
            </text>

            <path d="M 70 130 L 144 130 L 136 180 L 78 180 Z" fill="#fafaf9" stroke="#57534e" strokeWidth="2" />
            <text x="195" y="155" fill="#44403c" fontSize="12" fontWeight="600">
              3. Ответный раструб сифона с резьбой
            </text>
            <text x="195" y="176" fill="#57534e" fontSize="11">
              При закручивании гайки конус плотно расклинивается между трубой и стенкой
            </text>
          </svg>
        </figure>
      );

    case 'diy-wall-crack-repair':
      return (
        <figure className="bg-[#FAF9F5] border border-stone-200 rounded-xl p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2 mb-3">
            <figcaption className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Наглядная схема: послойный пирог армирования трещины в разрезе
            </figcaption>
            <span className="text-xs font-mono text-emerald-900 font-semibold">
              Расшивка на клин 45°
            </span>
          </div>
          <svg
            viewBox="0 0 680 205"
            className="w-full h-auto rounded-lg bg-white border border-stone-200"
            role="img"
            aria-label="Схема расшивки трещины под 45 градусов и укладки бумажной перфоленты"
          >
            {/* Plaster wall with V-groove */}
            <polygon points="40,120 270,120 310,175 350,120 580,120 580,185 40,185" fill="#e7e5e4" stroke="#78716c" strokeWidth="1.5" />
            {/* V-groove filler */}
            <polygon points="270,120 310,175 350,120" fill="#fde68a" stroke="#b45309" strokeWidth="1.5" />
            <text x="310" y="142" textAnchor="middle" fill="#78350f" fontSize="10" fontWeight="700">
              1. Шпаклёвка швов
            </text>
            {/* Paper tape */}
            <rect x="210" y="102" width="200" height="12" rx="2" fill="#10b981" stroke="#047857" strokeWidth="1.5" />
            <text x="310" y="96" textAnchor="middle" fill="#065f46" fontSize="11" fontWeight="700">
              2. Бумажная перфолента (вдавлена в слой)
            </text>
            {/* Wide finish coat */}
            <path d="M 110 80 L 510 80 L 540 98 L 80 98 Z" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
            <text x="310" y="68" textAnchor="middle" fill="#065f46" fontSize="12" fontWeight="700">
              3. Широкий слой финишной пасты (20–30 см) + шлифовка P220
            </text>
          </svg>
        </figure>
      );

    case 'diy-heavy-mounting-walls':
      return (
        <figure className="bg-[#FAF9F5] border border-stone-200 rounded-xl p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2 mb-3">
            <figcaption className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Наглядная схема: выбор дюбеля под газоблок и гипсокартон
            </figcaption>
            <span className="text-xs font-mono text-emerald-900 font-semibold">
              Сверление строго БЕЗ удара
            </span>
          </div>
          <svg
            viewBox="0 0 680 205"
            className="w-full h-auto rounded-lg bg-white border border-stone-200"
            role="img"
            aria-label="Сравнение крепежа для газобетона и металлического анкера Молли для гипсокартона"
          >
            <rect x="20" y="20" width="310" height="165" rx="8" fill="#ecfdf5" stroke="#6ee7b7" strokeWidth="1.5" />
            <text x="38" y="45" fill="#065f46" fontSize="13" fontWeight="700">
              1. Газоблок / Пеноблок
            </text>
            <rect x="42" y="70" width="145" height="24" rx="4" fill="#10b981" stroke="#047857" strokeWidth="1.5" />
            <text x="114" y="86" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="700">
              Дюбель 10×60 мм (4 сегмента)
            </text>
            <text x="38" y="118" fill="#1c1917" fontSize="11">
              • Сверлить дрелью БЕЗ боя (молотка)
            </text>
            <text x="38" y="138" fill="#1c1917" fontSize="11">
              • Глухарь толще на 1–2 мм (Ø 6 мм)
            </text>
            <text x="38" y="158" fill="#065f46" fontSize="11" fontWeight="600">
              • Длина самореза = дюбель + 7 мм
            </text>

            <rect x="350" y="20" width="310" height="165" rx="8" fill="#fafaf9" stroke="#d6d3d1" strokeWidth="1.5" />
            <text x="368" y="45" fill="#1c1917" fontSize="13" fontWeight="700">
              2. Полый гипсокартон (ГКЛ)
            </text>
            <rect x="372" y="70" width="145" height="24" rx="4" fill="#57534e" />
            <text x="444" y="86" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="700">
              Металлический анкер «Молли»
            </text>
            <text x="368" y="118" fill="#1c1917" fontSize="11">
              • Лапки раскрываются за листом ГКЛ
            </text>
            <text x="368" y="138" fill="#1c1917" fontSize="11">
              • Широкая опора без прокручивания
            </text>
            <text x="368" y="158" fill="#065f46" fontSize="11" fontWeight="600">
              • Для ТВ и полок: шаг крепежа 30–40 см
            </text>
          </svg>
        </figure>
      );

    case 'diy-laminate-quartzvinyl-laying':
      return (
        <figure className="bg-[#FAF9F5] border border-stone-200 rounded-xl p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2 mb-3">
            <figcaption className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Наглядная схема: разбежка торцевых швов и зазоры у стен
            </figcaption>
            <span className="text-xs font-mono text-emerald-900 font-semibold">
              Зазор 8–10 мм · Сдвиг ≥ 30 см
            </span>
          </div>
          <svg
            viewBox="0 0 680 205"
            className="w-full h-auto rounded-lg bg-white border border-stone-200"
            role="img"
            aria-label="Схема укладки ламината и кварцвинила с зазором 10 мм у стен и разбежкой рядов 30 см"
          >
            {/* Wall border */}
            <rect x="20" y="20" width="640" height="16" fill="#d6d3d1" />
            <text x="340" y="32" textAnchor="middle" fill="#1c1917" fontSize="10" fontWeight="700">
              СТЕНА + РАСПОРНЫЕ КЛИНЬЯ 8–10 ММ (ВЫНУТЬ ПЕРЕД ПЛИНТУСОМ)
            </text>

            {/* Row 1 */}
            <rect x="35" y="46" width="290" height="36" fill="#ecfdf5" stroke="#065f46" strokeWidth="1.5" />
            <rect x="325" y="46" width="290" height="36" fill="#ecfdf5" stroke="#065f46" strokeWidth="1.5" />

            {/* Row 2 staggered */}
            <rect x="35" y="84" width="160" height="36" fill="#f5f5f4" stroke="#57534e" strokeWidth="1.5" />
            <rect x="195" y="84" width="290" height="36" fill="#f5f5f4" stroke="#57534e" strokeWidth="1.5" />
            <rect x="485" y="84" width="130" height="36" fill="#f5f5f4" stroke="#57534e" strokeWidth="1.5" />

            {/* Stagger arrow */}
            <line x1="195" y1="128" x2="325" y2="128" stroke="#065f46" strokeWidth="2" />
            <text x="260" y="146" textAnchor="middle" fill="#065f46" fontSize="12" fontWeight="700">
              Разбежка торцов ≥ 30 см
            </text>
            <text x="340" y="176" textAnchor="middle" fill="#44403c" fontSize="11">
              Подложка: 1–1,5 мм плотная под SPC-кварцвинил · 2–3 мм под ламинат (стяжка ровная до 2 мм на 2 м)
            </text>
          </svg>
        </figure>
      );

    default:
      return (
        <figure className="bg-[#FAF9F5] border border-stone-200 rounded-xl p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2 mb-3">
            <figcaption className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Наглядная схема процесса ({article.category})
            </figcaption>
            <span className="text-xs font-mono text-emerald-900 font-semibold">
              {article.steps.length} шагов контроля
            </span>
          </div>
          <svg
            viewBox="0 0 680 140"
            className="w-full h-auto rounded-lg bg-white border border-stone-200"
            role="img"
            aria-label={`Технологическая схема: ${article.title}`}
          >
            {article.steps.slice(0, 4).map((step, idx) => {
              const x = 18 + idx * 164;
              return (
                <g key={step.stepNumber}>
                  <rect
                    x={x}
                    y="22"
                    width="150"
                    height="96"
                    rx="8"
                    fill={idx === 0 ? '#ecfdf5' : '#fafaf9'}
                    stroke={idx === 0 ? '#065f46' : '#d6d3d1'}
                    strokeWidth="1.5"
                  />
                  <text x={x + 14} y="46" fill="#065f46" fontSize="11" fontWeight="700">
                    ШАГ {step.stepNumber}
                  </text>
                  <text x={x + 14} y="68" fill="#1c1917" fontSize="11" fontWeight="600">
                    {step.title.slice(0, 20)}...
                  </text>
                  <text x={x + 14} y="92" fill="#57534e" fontSize="10">
                    Контроль по месту
                  </text>
                </g>
              );
            })}
          </svg>
        </figure>
      );
  }
};
