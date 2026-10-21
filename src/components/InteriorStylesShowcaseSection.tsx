import React, { useState } from 'react';
import type { ProofCategory } from '../data/landingData';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Eye,
  Layers,
  MoveHorizontal,
  Sliders,
} from 'lucide-react';

interface StyleHotspot {
  id: string;
  number: string;
  xPercent: number;
  yPercent: number;
  label: string;
  nodeTitle: string;
  engineeringSpec: string;
  toleranceSpec: string;
  proofImageUrl: string;
  proofCategory: ProofCategory;
}

interface InteriorStyleItem {
  id: string;
  tabNumber: string;
  tabName: string;
  styleTagline: string;
  title: string;
  architecturalSummary: string;
  mainImageUrl: string;
  secondaryImageUrl: string;
  secondaryCaption: string;
  materials: {
    name: string;
    spec: string;
    swatchColor: string;
  }[];
  hotspots: StyleHotspot[];
  prefillMessage: string;
}

const INTERIOR_STYLES: InteriorStyleItem[] = [
  {
    id: 'style-contemporary-stone',
    tabNumber: '01',
    tabName: 'Contemporary & Камень',
    styleTagline: 'Монолитный керамогранит · Тёплый шпон ореха · Скрытый трековый свет',
    title: 'Современная архитектура кухни-гостиной с островом и пилонами в камне',
    architecturalSummary:
      'Сложная стыковка крупноформатного керамогранита, натурального шпона и встроенной потолочной вытяжки без видимых зазоров и порожков.',
    mainImageUrl: './assets/render-kitchen-marble.jpg',
    secondaryImageUrl: './assets/frame-marble-pylons.jpg',
    secondaryCaption: 'Реализация этого узла на нашем объекте: пилон в тёмном камне с запилом 45° и теневые ниши',
    materials: [
      { name: 'Керамогранит Pietra Grey', spec: 'Формат 1200×2400 мм · запил 45°', swatchColor: '#2B2927' },
      { name: 'Американский орех', spec: 'Шпон под матовым лаком · ЧПУ-стыковка', swatchColor: '#7A5438' },
      { name: 'Теневой профиль', spec: 'Анодированный алюминий · зазор 20 мм', swatchColor: '#141615' },
      { name: 'Медный узел ввода', spec: 'Труба Cu-DHP на пайке · защита Neptun', swatchColor: '#B8734B' },
    ],
    hotspots: [
      {
        id: 'hs-stone-pylon',
        number: '01',
        xPercent: 42,
        yPercent: 34,
        label: 'Пилон в крупноформатном камне',
        nodeTitle: 'Облицовка несущего пилона широкоформатным керамогранитом с запилом под 45°',
        engineeringSpec:
          'Выравнивание базовой колонны строго в 90°, резка торцов на мокром станке с алмазным диском и формирование монолитного ребра двухкомпонентной эпоксидной смолой в тон камня.',
        toleranceSpec: 'Допуск по вертикали: ±0.5 мм на 2 метра · Шов: 1.0 мм',
        proofImageUrl: './assets/frame-marble-pylons.jpg',
        proofCategory: 'finishing',
      },
      {
        id: 'hs-ceiling-hood',
        number: '02',
        xPercent: 36,
        yPercent: 14,
        label: 'Интегрированная потолочная вытяжка',
        nodeTitle: 'Монтаж островной вытяжки заподлицо в усиленный каркас ГКЛ и трассировка воздуховода',
        engineeringSpec:
          'Сборка независимого силового подвеса в перекрытие, шумоизоляция плоского вентканала за потолком и вывод в шахту без занижения общей высоты помещения.',
        toleranceSpec: 'Примыкание к плоскости потолка: 0 мм · Виброразвязка подвесов',
        proofImageUrl: './assets/aistudio/photo_2026-10-20_08-40-35_1c4e2e6f.jpg',
        proofCategory: 'finishing',
      },
      {
        id: 'hs-island-plumbing',
        number: '03',
        xPercent: 25,
        yPercent: 68,
        label: 'Инженерия кухонного острова',
        nodeTitle: 'Беспороговый подвод воды, слива с уклоном и силового кабеля в центр зала под остров',
        engineeringSpec:
          'Прокладка цельных трасс ХВС/ГВС в слое звукоизоляции «Шуманет-100» и малошумной канализации с отводами 45° до заливки стяжки. Вывод кабеля ВВГнг-LS 5×4 мм².',
        toleranceSpec: 'Уклон сливной магистрали: 2.5 см/м · Опрессовка 10 бар',
        proofImageUrl: './assets/aistudio/1772864416-4fbf785b251e4d1bc29823bc91b8b69c_e0e32c64.jpg',
        proofCategory: 'engineering',
      },
      {
        id: 'hs-track-lighting',
        number: '04',
        xPercent: 76,
        yPercent: 16,
        label: 'Встроенная трековая система 48V',
        nodeTitle: 'Интеграция низковольтного магнитного шинопровода в плоскость потолка без бортика',
        engineeringSpec:
          'Монтаж алюминиевого профиля на этапе чернового ГКЛ, шпаклевание со стеклохолстом и вынос блоков питания 48V в вентилируемый слаботочный щит для удобного обслуживания.',
        toleranceSpec: 'Прямолинейность по лазерному лучу: ±0.5 мм на всю длину',
        proofImageUrl: './assets/aistudio/photo_2026-10-20_08-40-23_5c88cf51.jpg',
        proofCategory: 'finishing',
      },
    ],
    prefillMessage:
      'Интересует ремонт в современном стиле (крупноформатный керамогранит, трековый свет, сложные узлы кухни-гостиной). Нужен осмотр и расчёт.',
  },
  {
    id: 'style-architectural-portals',
    tabNumber: '02',
    tabName: 'Архитектурный свет & Порталы',
    styleTagline: 'Многоуровневые порталы · Скользящая LED-подсветка · Панорамные откосы',
    title: 'Световая архитектура гостиной с графитовыми порталами и панорамным остеклением',
    architecturalSummary:
      'Именно на скользящем направленном свете проявляется реальный класс маляров и гипсокартонщиков: любая неровность стены или стыка даёт тень, поэтому плоскости готовятся по стандарту Q4.',
    mainImageUrl: './assets/render-living-portal.jpg',
    secondaryImageUrl: './assets/aistudio/photo_2026-10-20_08-40-35_1c4e2e6f.jpg',
    secondaryCaption: 'Живое фото нашего объекта в Краснодаре: ступенчатый световой портал собран миллиметр в миллиметр',
    materials: [
      { name: 'Матовый графит Q4', spec: 'Безвоздушная окраска · глубокий мат', swatchColor: '#222423' },
      { name: 'Тёплый LED-профиль', spec: '2700K–3000K · CRI>95 без точек', swatchColor: '#E5B869' },
      { name: 'Инженерная доска дуб', spec: 'Беспороговая укладка на клей', swatchColor: '#9C7A56' },
      { name: 'Щелевой диффузор', spec: 'Скрытая вентиляция и кондиционирование', swatchColor: '#373A38' },
    ],
    hotspots: [
      {
        id: 'hs-led-portal',
        number: '01',
        xPercent: 88,
        yPercent: 45,
        label: 'Трёхуровневый световой портал',
        nodeTitle: 'Ступенчатый архитектурный портал со скрытым профильным светом на переходах плоскостей',
        engineeringSpec:
          'Сборка жёсткого пространственного каркаса с алюминиевыми рассеивателями, расчёт глубины ниши для равномерного свечения без видимых диодных точек и перегрева ленты.',
        toleranceSpec: 'Сведение внутренних и внешних углов: 90.0° по лазеру',
        proofImageUrl: './assets/aistudio/photo_2026-10-20_08-40-35_1c4e2e6f.jpg',
        proofCategory: 'finishing',
      },
      {
        id: 'hs-slot-diffuser',
        number: '02',
        xPercent: 65,
        yPercent: 14,
        label: 'Щелевые диффузоры в потолке',
        nodeTitle: 'Скрытая интеграция линейных диффузоров вентиляции в потолочный уровень',
        engineeringSpec:
          'Никаких накладных пластиковых решёток: адаптеры статического давления монтируются до зашивки потолка, а видимой остаётся только аккуратная теневая щель.',
        toleranceSpec: 'Равномерная ширина щели по всей длине трассы',
        proofImageUrl: './assets/aistudio/photo_2026-10-20_08-40-23_5c88cf51.jpg',
        proofCategory: 'finishing',
      },
      {
        id: 'hs-floor-convector',
        number: '03',
        xPercent: 8,
        yPercent: 88,
        label: 'Внутрипольный конвектор в уровень с паркетом',
        nodeTitle: 'Монтаж внутрипольного конвектора у панорамного окна в единый уровень с чистовым полом',
        engineeringSpec:
          'Точный расчёт высотной отметки стяжки, тепло- и звукоизоляция корпуса конвектора, лучевая подводка сшитым полиэтиленом PE-Xa без соединений в полу и подгонка паркетной плашки к рамке.',
        toleranceSpec: 'Перепад рамки и чистового пола: 0.0 мм',
        proofImageUrl: './assets/aistudio/1705493359-ba4d232a1305ebca98a912522b7e679d_a17307eb.jpg',
        proofCategory: 'engineering',
      },
      {
        id: 'hs-panoramic-slopes',
        number: '04',
        xPercent: 14,
        yPercent: 48,
        label: 'Матовые откосы панорамных окон',
        nodeTitle: 'Тёплые откосы с профилем примыкания и защитой от конденсата и микротрещин',
        engineeringSpec:
          'Утепление монтажного шва окна, установка демпферного профиля примыкания с уплотнителем к раме и окраска влагостойкой глубоко-матовой эмалью.',
        toleranceSpec: 'Строгая вертикальная грань откоса без завалов',
        proofImageUrl: './assets/frame-portal-columns.jpg',
        proofCategory: 'finishing',
      },
    ],
    prefillMessage:
      'Нравится архитектура со световыми порталами, теневыми профилями и панорамным светом. Хочу обсудить осмотр квартиры в Краснодаре.',
  },
  {
    id: 'style-modern-classic',
    tabNumber: '03',
    tabName: 'Современная классика & Фрески',
    styleTagline: 'Лепной декор и барельеф · Малярная подготовка Q4 · Английская ёлочка',
    title: 'Неоклассика с глубокими матовыми оттенками, молдингами и авторскими фресками',
    architecturalSummary:
      'Современная классика требует безупречной симметрии: раскладка молдингов рассчитывается с учётом осей розеток, выключателей, дверных наличников и световых линий.',
    mainImageUrl: './assets/aistudio/photo_2026-10-20_08-40-11_22d1e9d3.jpg',
    secondaryImageUrl: './assets/aistudio/photo_2026-10-20_08-40-53_ddf4ffc8.jpg',
    secondaryCaption: 'Бесшовная фреска «Лес» и подготовка стен Q4 на нашем объекте в Краснодаре',
    materials: [
      { name: 'Матовая эмаль Slate Blue', spec: 'Подготовка Q4 со стеклохолстом', swatchColor: '#435058' },
      { name: 'Дюрополимер высокой плотности', spec: 'Запиловка на торцовочной пиле', swatchColor: '#56626A' },
      { name: 'Бесшовная фреска', spec: 'Фактурное полотно на единую стену', swatchColor: '#D6D4CE' },
      { name: 'Кварцвинил / Дуб ёлочкой', spec: 'Укладка единым контуром без порогов', swatchColor: '#A9967E' },
    ],
    hotspots: [
      {
        id: 'hs-basrelief-panel',
        number: '01',
        xPercent: 37,
        yPercent: 48,
        label: 'Художественное панно в раме из молдингов',
        nodeTitle: 'Интеграция фактурного барельефа в симметричную раскладку классических молдингов',
        engineeringSpec:
          'Предварительная лазерная разметка всех карт на стене, приклейка профилей на монтажный и стыковочный полиуретановый клей, фрезеровка и шлифовка углов до полного монолита со стеной.',
        toleranceSpec: 'Диагонали рамок: расхождение 0 мм · Без трещин на стыках',
        proofImageUrl: './assets/aistudio/photo_2026-10-20_08-40-05_2cf89993.jpg',
        proofCategory: 'finishing',
      },
      {
        id: 'hs-linear-ceiling-light',
        number: '02',
        xPercent: 48,
        yPercent: 5,
        label: 'Парящая световая линия по оси холла',
        nodeTitle: 'Линейный профиль освещения во всю длину помещения как основной и вечерний сценарий',
        engineeringSpec:
          'Выставление профиля строго параллельно стенам и раскладке молдингов, подключение через проходные переключатели у входа и у спален.',
        toleranceSpec: 'Равномерная засветка матового экрана без тёмных зон',
        proofImageUrl: './assets/aistudio/photo_2026-10-20_08-40-35_1c4e2e6f.jpg',
        proofCategory: 'finishing',
      },
      {
        id: 'hs-shadow-baseboard',
        number: '03',
        xPercent: 45,
        yPercent: 88,
        label: 'Скрытый теневой плинтус по периметру',
        nodeTitle: 'Теневой зазор вместо накладного плинтуса: мебель встаёт вплотную к стене',
        engineeringSpec:
          'Алюминиевый профиль скрытого монтажа устанавливается до финишной штукатурки и шпаклёвки, формируя аккуратную парящую тень над напольным покрытием.',
        toleranceSpec: 'Высота теневого зазора: строго 15–20 мм по всему периметру',
        proofImageUrl: './assets/frame-herringbone-hall.jpg',
        proofCategory: 'finishing',
      },
      {
        id: 'hs-robot-station',
        number: '04',
        xPercent: 84,
        yPercent: 82,
        label: 'Проектирование бытовых сценариев заранее',
        nodeTitle: 'Выделенная розетка и ниша под станцию робота-пылесоса и чёрную фурнитуру',
        engineeringSpec:
          'Все бытовые сценарии (база пылесоса, роутер в слаботочном щите, мастер-выключатель света у входа, домофон) закладываются до начала штробления стен.',
        toleranceSpec: 'Установка блоков подрозетников по лазерному нивелиру',
        proofImageUrl: './assets/stage-03-electrical.jpg',
        proofCategory: 'stages',
      },
    ],
    prefillMessage:
      'Интересует ремонт в стиле современной классики (молдинги, покраска стен, фрески, укладка пола ёлочкой). Нужен осмотр квартиры.',
  },
  {
    id: 'style-nordic-duplex',
    tabNumber: '04',
    tabName: 'Светлый Модерн & Панорама',
    styleTagline: 'Воздушная геометрия · Стекло и натуральный дуб · Чистые примыкания',
    title: 'Светлое пространство с консольными ступенями, панорамным светом и минималистичной кухней',
    architecturalSummary:
      'В светлых минималистичных интерьерах без наличников и карнизов вся эстетика держится на безупречной геометрии углов 90°, ровных теневых швах и скрытых инженерных коллекторах.',
    mainImageUrl: './assets/interior.jpg',
    secondaryImageUrl: './assets/aistudio/photo_2026-10-20_08-39-51_c8e000b6.jpg',
    secondaryCaption: 'Готовая светлая квартира с витражным выходом на утеплённую лоджию на нашем объекте',
    materials: [
      { name: 'Светлый тёплый кашемир', spec: 'Моющаяся матовая краска · класс 1', swatchColor: '#EAE6DF' },
      { name: 'Выбеленный дуб', spec: 'Широкая паркетная доска / ламинат 33 кл.', swatchColor: '#D5C7B4' },
      { name: 'Закалённое стекло Triplex', spec: 'Скрытый профиль крепления в перекрытие', swatchColor: '#B8C4C2' },
      { name: 'Коллектор из нержавейки', spec: 'Трубопроводы AISI 304 · автоматика', swatchColor: '#8E9492' },
    ],
    hotspots: [
      {
        id: 'hs-staircase-node',
        number: '01',
        xPercent: 78,
        yPercent: 42,
        label: 'Стеклянное ограждение и ступени из дуба',
        nodeTitle: 'Закладные силовые элементы в стене и перекрытии под лестницу и триплекс',
        engineeringSpec:
          'Монтаж металлических закладных и расчёт шага ступеней с учётом толщины будущей стяжки и чистового дерева ещё на первом черновом этапе.',
        toleranceSpec: 'Одинаковая высота всех подступенков до миллиметра',
        proofImageUrl: './assets/stage-01-measurements.jpg',
        proofCategory: 'stages',
      },
      {
        id: 'hs-kitchen-niche',
        number: '02',
        xPercent: 52,
        yPercent: 45,
        label: 'Встроенная кухня в нишу строго 90°',
        nodeTitle: 'Формирование мебельной ниши с углами 90.0° без доборов и щелей у стены',
        engineeringSpec:
          'Штукатурка стен по лазерным маякам с проверкой электронным угломером и двухметровым правилом, чтобы корпусная мебель встала заподлицо со стенами.',
        toleranceSpec: 'Угол 90.0° · Просвет под правилом ≤ 1 мм',
        proofImageUrl: './assets/stage-04-plastering.jpg',
        proofCategory: 'stages',
      },
      {
        id: 'hs-cove-lighting',
        number: '03',
        xPercent: 32,
        yPercent: 25,
        label: 'Закарнизная подсветка и скрытые шины штор',
        nodeTitle: 'Теневые шторные ниши с мягкой тёплой подсветкой портьер по всей длине окна',
        engineeringSpec:
          'Формирование малярного зуба из ГКЛ с окраской внутренней части ниши, установка встроенного алюминиевого карниза и вывод питания под электропривод штор.',
        toleranceSpec: 'Чёткая прямолинейная грань ниши без волн',
        proofImageUrl: './assets/aistudio/photo_2026-10-20_08-39-51_c8e000b6.jpg',
        proofCategory: 'finishing',
      },
      {
        id: 'hs-boiler-collector',
        number: '04',
        xPercent: 60,
        yPercent: 52,
        label: 'Инженерное сердце квартиры за фасадом',
        nodeTitle: 'Коллекторный узел водоснабжения и отопления с защитой от протечек Neptun',
        engineeringSpec:
          'За минималистичными фасадами скрывается промышленный уровень инженерии: фильтры тонкой очистки, редукторы давления FAR, компенсаторы гидроударов и коллекторная разводка без соединений в полу.',
        toleranceSpec: 'Опрессовка системы перед зашивкой · Полный фотоотчёт',
        proofImageUrl: './assets/aistudio/1778571106-7b2352c796cc041892c58ff331687445_12ba3472.jpg',
        proofCategory: 'engineering',
      },
    ],
    prefillMessage:
      'Интересует ремонт квартиры в светлом современном стиле (ровные стены под покраску, скрытые карнизы, единый пол без порогов).',
  },
];

interface ComparisonPair {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  renderImageUrl: string;
  renderLabel: string;
  realImageUrl: string;
  realLabel: string;
  notes: string[];
}

const COMPARISON_PAIRS: ComparisonPair[] = [
  {
    id: 'pair-portal',
    label: 'Объект 01 · Световые порталы',
    title: 'Сложный ступенчатый портал гостиной и панорамное остекление',
    subtitle: 'Потяните ползунок влево-вправо, чтобы сравнить исходную 3D-визуализацию проекта и реальную сборку на нашем объекте',
    renderImageUrl: './assets/render-living-portal.jpg',
    renderLabel: '3D-Визуализация проекта',
    realImageUrl: './assets/aistudio/photo_2026-10-20_08-40-35_1c4e2e6f.jpg',
    realLabel: 'Реализация вживую на стройке',
    notes: [
      'Точное совпадение трёх ступеней графитового портала и встроенных линий тёплого света',
      'Геометрия панорамных откосов и встроенных трековых ниш на потолке',
      'Подготовка стен по стандарту Q4 под боковой скользящий свет',
    ],
  },
  {
    id: 'pair-pylons',
    label: 'Объект 02 · Пилоны в камне и свет',
    title: 'Крупноформатный керамогранит на пилонах, теневой потолок и магнитные треки',
    subtitle: 'Сопоставление проектного рендера кухни-гостиной и реального кадра со стройплощадки в Краснодаре',
    renderImageUrl: './assets/render-kitchen-marble.jpg',
    renderLabel: '3D-Визуализация кухни-гостиной',
    realImageUrl: './assets/frame-marble-pylons.jpg',
    realLabel: 'Реальный узел на объекте',
    notes: [
      'Запил крупноформатного керамогранита под 45° на внешних углах пилона',
      'Встроенные чёрные трековые шинопроводы в плоскости потолка',
      'Примыкание матовых чёрных откосов к витражным окнам в пол',
    ],
  },
];

interface EngineeringLayerItem {
  id: string;
  layerCode: string;
  title: string;
  shortTag: string;
  description: string;
  technicalStandard: string;
  imageUrl: string;
  proofCategory: ProofCategory;
}

const ENGINEERING_LAYERS: EngineeringLayerItem[] = [
  {
    id: 'layer-acoustics',
    layerCode: 'Слой 01',
    title: 'Акустический плавающий пол «Шуманет-100» и трассировка в один уровень',
    shortTag: 'Звукоизоляция и стяжка',
    description:
      'Укладываем битумно-войлочное покрытие с герметичной проклейкой швов и заведением на стены. Все трассы отопления и электрики идут параллельно без перехлёстов.',
    technicalStandard: 'Снижение ударного шума до 23 дБ · Равномерная толщина стяжки без трещин',
    imageUrl: './assets/aistudio/1772864416-4fbf785b251e4d1bc29823bc91b8b69c_e0e32c64.jpg',
    proofCategory: 'engineering',
  },
  {
    id: 'layer-plumbing',
    layerCode: 'Слой 02',
    title: 'Коллекторное водоснабжение на медной пайке и нержавеющей стали AISI 304',
    shortTag: 'Медь · Нержавейка · Neptun',
    description:
      'Собираем сантехнические узлы промышленного класса: коллекторы FAR, магистральные фильтры Geyser Premier, редукторы давления и 4 сервопривода защиты от протечек Neptun.',
    technicalStandard: 'Ни одного тройника в стяжке · Опрессовка избыточным давлением с актом',
    imageUrl: './assets/aistudio/1778571106-7b2352c796cc041892c58ff331687445_12ba3472.jpg',
    proofCategory: 'engineering',
  },
  {
    id: 'layer-geometry',
    layerCode: 'Слой 03',
    title: 'Лазерная геометрия 90.0° и подготовка плоскостей Q4 под скользящий свет',
    shortTag: 'Маяки · Стеклохолст · Q4',
    description:
      'Вытягиваем стены по лазерным маякам двухметровым h-правилом, армируем стеклохолстом и шлифуем под контрольной лампой Бош/Лосева до идеального монолита.',
    technicalStandard: 'Допуск по вертикали ≤ 1 мм на 2 м · Идеальное примыкание встроенной мебели',
    imageUrl: './assets/stage-04-plastering.jpg',
    proofCategory: 'stages',
  },
  {
    id: 'layer-lighting',
    layerCode: 'Слой 04',
    title: 'Теневые профили Eurokraab, магнитные треки 48V и сложные световые порталы',
    shortTag: 'Светодизайн и потолки',
    description:
      'Интегрируем низковольтные трековые системы, линейные диффузоры скрытой вентиляции и закарнизные ниши с точным сведением углов и выносом драйверов в доступный щит.',
    technicalStandard: 'Теневой зазор 20 мм по периметру · Безупречная линия света без засветов',
    imageUrl: './assets/aistudio/photo_2026-10-20_08-40-35_1c4e2e6f.jpg',
    proofCategory: 'finishing',
  },
];

interface InteriorStylesShowcaseSectionProps {
  onJumpToProof: (category: ProofCategory) => void;
  onRequestConsultation: (prefillText: string) => void;
  onTrackEvent?: (eventName: string, meta?: Record<string, string>) => void;
}

export const InteriorStylesShowcaseSection: React.FC<InteriorStylesShowcaseSectionProps> = ({
  onJumpToProof,
  onRequestConsultation,
  onTrackEvent,
}) => {
  const [activeStyleIdx, setActiveStyleIdx] = useState<number>(0);
  const [activeHotspotIdx, setActiveHotspotIdx] = useState<number>(0);
  const [activePairIdx, setActivePairIdx] = useState<number>(0);
  const [sliderPosition, setSliderPosition] = useState<number>(52);
  const [activeLayerIdx, setActiveLayerIdx] = useState<number>(1);

  const currentStyle = INTERIOR_STYLES[activeStyleIdx] || INTERIOR_STYLES[0];
  const currentHotspot =
    currentStyle.hotspots[activeHotspotIdx] || currentStyle.hotspots[0];
  const currentPair = COMPARISON_PAIRS[activePairIdx] || COMPARISON_PAIRS[0];
  const currentLayer = ENGINEERING_LAYERS[activeLayerIdx] || ENGINEERING_LAYERS[0];

  const handleSelectStyle = (idx: number) => {
    setActiveStyleIdx(idx);
    setActiveHotspotIdx(0);
    onTrackEvent?.('select_interior_style', {
      styleId: INTERIOR_STYLES[idx]?.id || 'unknown',
    });
  };

  const handleSelectHotspot = (idx: number) => {
    setActiveHotspotIdx(idx);
    onTrackEvent?.('select_style_hotspot', {
      hotspotId: currentStyle.hotspots[idx]?.id || 'unknown',
    });
  };

  return (
    <section
      id="visual-styles"
      className="py-20 sm:py-28 bg-[#0C0F0E] text-stone-100 border-b border-stone-800"
      aria-labelledby="visual-styles-heading"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-8">
            <p className="text-xs font-mono text-[#D4A359] tracking-wide mb-3 tabular-nums">
              02 · Визуальная архитектура и инженерный разбор · Вдохновение и реализация
            </p>
            <h2
              id="visual-styles-heading"
              className="text-2xl sm:text-4xl lg:text-[2.65rem] font-extrabold tracking-tight text-white leading-[1.1]"
              style={{ textWrap: 'balance' }}
            >
              Эстетика топовых дизайн-бюро,{' '}
              <span className="font-serif italic font-normal text-[#E5C185]">
                сопровождаемая точным инженерным расчётом каждого узла
              </span>
            </h2>
          </div>
          <div className="lg:col-span-4 text-xs sm:text-sm text-stone-300 leading-relaxed">
            Выберите интерьерное направление и нажмите на интерактивные точки <span className="font-mono text-[#D4A359]">01–04</span> прямо на визуализации, чтобы увидеть, как устроен скрытый инженерный узел и как он реализован на наших объектах.
          </div>
        </div>

        {/* Interactive Style Selector Bar (4 Tabs) */}
        <div
          role="tablist"
          aria-label="Стили интерьеров и инженерных решений"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 p-2 bg-[#141917] border border-white/10 rounded-2xl mb-8"
        >
          {INTERIOR_STYLES.map((style, idx) => {
            const isSelected = activeStyleIdx === idx;
            return (
              <button
                key={style.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => handleSelectStyle(idx)}
                className={`text-left p-3.5 sm:p-4 rounded-xl transition-colors cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-[#D4A359] text-stone-950 shadow-md'
                    : 'bg-white/[0.03] text-stone-200 hover:bg-white/[0.07]'
                }`}
              >
                <div className="min-w-0">
                  <p
                    className={`text-[11px] font-mono tabular-nums ${
                      isSelected ? 'text-stone-900 font-bold' : 'text-[#D4A359]'
                    }`}
                  >
                    Направление {style.tabNumber}
                  </p>
                  <p className="text-sm font-bold truncate mt-0.5">
                    {style.tabName}
                  </p>
                </div>
                <span
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono shrink-0 ${
                    isSelected
                      ? 'bg-stone-950/15 text-stone-950 font-bold'
                      : 'bg-white/5 text-stone-400'
                  }`}
                >
                  {style.hotspots.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Visualizer Grid: Left 7 Cols (Interactive Image + Hotspots + Material Swatches) | Right 5 Cols (Node X-Ray Inspector + Real Object Proof) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-16">
          {/* Left Column: Large Interactive Architectural Render with Clickable Pins */}
          <div className="lg:col-span-7 bg-[#141917] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between">
            <div>
              {/* Top Info Bar */}
              <div className="px-5 py-3.5 border-b border-white/10 flex flex-wrap items-center justify-between gap-2 bg-[#101412]">
                <div className="flex items-center gap-2 text-xs font-mono text-stone-300">
                  <Eye className="w-3.5 h-3.5 text-[#D4A359]" />
                  <span>Интерактивная схема узлов интерьера</span>
                </div>
                <span className="text-xs font-mono text-[#D4A359]">
                  Нажмите на маркер 01–04 на изображении
                </span>
              </div>

              {/* Interactive Canvas with Hotspot Pins */}
              <div className="relative aspect-[16/10] w-full bg-stone-950 overflow-hidden select-none">
                <img
                  src={currentStyle.mainImageUrl}
                  alt={currentStyle.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-opacity duration-200"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/30" />

                {/* Interactive Hotspot Pins */}
                {currentStyle.hotspots.map((spot, idx) => {
                  const isActive = activeHotspotIdx === idx;
                  return (
                    <button
                      key={spot.id}
                      type="button"
                      onClick={() => handleSelectHotspot(idx)}
                      style={{
                        left: `${spot.xPercent}%`,
                        top: `${spot.yPercent}%`,
                      }}
                      aria-label={`Узел ${spot.number}: ${spot.label}`}
                      className={`group absolute -translate-x-1/2 -translate-y-1/2 z-10 flex items-center gap-1.5 rounded-full transition-transform duration-150 cursor-pointer ${
                        isActive
                          ? 'bg-[#D4A359] text-stone-950 px-3 py-1.5 shadow-xl scale-105 ring-4 ring-[#D4A359]/30'
                          : 'bg-stone-950/90 text-white hover:bg-[#D4A359] hover:text-stone-950 px-2.5 py-1 border border-white/30 shadow-lg'
                      }`}
                    >
                      <span className="font-mono text-xs font-extrabold tabular-nums">
                        {spot.number}
                      </span>
                      <span
                        className={`text-xs font-semibold whitespace-nowrap ${
                          isActive ? 'inline' : 'hidden sm:group-hover:inline'
                        }`}
                      >
                        {spot.label}
                      </span>
                    </button>
                  );
                })}

                {/* Bottom Overlay Title inside Visualization */}
                <div className="absolute bottom-4 left-5 right-5 pointer-events-none">
                  <p className="text-xs font-mono text-[#E5C185] mb-1">
                    {currentStyle.styleTagline}
                  </p>
                  <h3 className="text-base sm:text-xl font-bold text-white leading-snug">
                    {currentStyle.title}
                  </h3>
                </div>
              </div>

              {/* Quick Hotspot Switcher Strip under Image */}
              <div className="p-4 sm:px-5 border-t border-white/10 bg-[#111513]">
                <p className="text-[11px] font-mono text-stone-400 mb-2.5">
                  Быстрый выбор инженерного узла на визуализации:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {currentStyle.hotspots.map((spot, idx) => {
                    const isActive = activeHotspotIdx === idx;
                    return (
                      <button
                        key={spot.id}
                        type="button"
                        onClick={() => handleSelectHotspot(idx)}
                        className={`text-left px-3 py-2 rounded-xl border text-xs transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-[#D4A359]/20 border-[#D4A359] text-white font-semibold'
                            : 'bg-white/[0.02] border-white/10 text-stone-300 hover:bg-white/[0.06]'
                        }`}
                      >
                        <span className="font-mono text-[#D4A359] font-bold block tabular-nums">
                          Узел {spot.number}
                        </span>
                        <span className="truncate block mt-0.5">
                          {spot.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Tactile Material & Engineering Palette Swatches */}
            <div className="p-4 sm:px-5 sm:py-4 border-t border-white/10 bg-[#0E1210]">
              <p className="text-[11px] font-mono text-stone-400 mb-2.5">
                Материальная карта и фактуры этого стиля:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {currentStyle.materials.map((mat) => (
                  <div
                    key={mat.name}
                    className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.03] border border-white/10"
                  >
                    <span
                      className="w-6 h-6 rounded-lg shrink-0 border border-white/20"
                      style={{ backgroundColor: mat.swatchColor }}
                      aria-hidden="true"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-stone-100 truncate">
                        {mat.name}
                      </p>
                      <p className="text-[10px] text-stone-400 truncate">
                        {mat.spec}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Node X-Ray Inspector & Real On-Site Proof Card */}
          <div className="lg:col-span-5 bg-[#141917] border border-white/10 rounded-2xl p-5 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 pb-4 mb-5 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono text-[#D4A359] tabular-nums">
                    Инженерный разбор · Узел {currentHotspot.number} из 0{currentStyle.hotspots.length}
                  </span>
                  <h4 className="text-lg sm:text-xl font-bold text-white mt-1 leading-snug">
                    {currentHotspot.nodeTitle}
                  </h4>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <p className="text-xs font-mono text-[#E5C185] mb-1.5">
                    Как мы реализуем этот узел технически:
                  </p>
                  <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                    {currentHotspot.engineeringSpec}
                  </p>
                </div>

                <div className="px-4 py-3 rounded-xl bg-[#042F24]/50 border border-emerald-500/25 flex items-center justify-between gap-3">
                  <span className="text-xs font-mono text-emerald-200">
                    Стандарт контроля:
                  </span>
                  <span className="text-xs font-mono font-semibold text-white tabular-nums text-right">
                    {currentHotspot.toleranceSpec}
                  </span>
                </div>
              </div>

              {/* Real Site Photo Proof Matching Selected Hotspot */}
              <div className="rounded-xl overflow-hidden border border-white/15 bg-black">
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <img
                    src={currentHotspot.proofImageUrl}
                    alt={currentHotspot.label}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono">
                    <span className="px-2.5 py-1 rounded-md bg-black/75 text-[#E5C185] border border-white/15">
                      Фото с нашего объекта без ретуши
                    </span>
                    <button
                      type="button"
                      onClick={() => onJumpToProof(currentHotspot.proofCategory)}
                      className="px-2.5 py-1 rounded-md bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
                    >
                      Весь архив →
                    </button>
                  </div>
                  <div className="absolute bottom-3 left-3.5 right-3.5">
                    <p className="text-xs font-semibold text-white">
                      {currentStyle.secondaryCaption}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 space-y-3">
              <button
                type="button"
                onClick={() => onRequestConsultation(currentStyle.prefillMessage)}
                className="w-full py-3.5 px-5 text-xs sm:text-sm font-semibold text-stone-950 bg-[#D4A359] hover:bg-[#e3b66d] rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <span>Рассчитать реализацию такого интерьера по факту</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] font-mono text-stone-400 text-center">
                Работаем как по вашему готовому дизайн-проекту, так и по техническому заданию
              </p>
            </div>
          </div>
        </div>

        {/* PART 2: INTERACTIVE BEFORE/AFTER ("3D-ПРОЕКТ ↔ РЕАЛИЗАЦИЯ ВЖИВУЮ") SPLIT SLIDER */}
        <div className="bg-[#141917] border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-10 mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div className="max-w-2xl">
              <p className="text-xs font-mono text-[#D4A359] mb-2">
                Интерактивное сравнение · Замысел архитектора и точность наших рук
              </p>
              <h3 className="text-xl sm:text-3xl font-bold text-white leading-tight">
                3D-визуализация дизайн-проекта{' '}
                <span className="font-serif italic font-normal text-[#E5C185]">
                  и реальное исполнение на объекте
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
                {currentPair.subtitle}
              </p>
            </div>

            {/* Pair Selector Tabs */}
            <div className="flex flex-wrap items-center gap-2 bg-black/40 p-1.5 rounded-xl border border-white/10 shrink-0">
              {COMPARISON_PAIRS.map((pair, idx) => (
                <button
                  key={pair.id}
                  type="button"
                  onClick={() => {
                    setActivePairIdx(idx);
                    setSliderPosition(50);
                  }}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    activePairIdx === idx
                      ? 'bg-[#D4A359] text-stone-950'
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  {pair.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Interactive Split Comparison Viewport */}
            <div className="lg:col-span-8">
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/15 bg-black select-none">
                {/* Base Layer: Real Site Photo */}
                <img
                  src={currentPair.realImageUrl}
                  alt={currentPair.realLabel}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />

                {/* Clipped Top Layer: 3D Visualization Render */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                  <img
                    src={currentPair.renderImageUrl}
                    alt={currentPair.renderLabel}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Vertical Divider Line & Handle */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-[#D4A359] shadow-[0_0_16px_rgba(212,163,89,0.9)] pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#D4A359] text-stone-950 shadow-xl flex items-center justify-center border-2 border-stone-950">
                    <MoveHorizontal className="w-5 h-5" />
                  </div>
                </div>

                {/* Corner Labels */}
                <div className="absolute top-3.5 left-3.5 px-3 py-1.5 rounded-lg bg-black/80 border border-white/15 text-xs font-mono text-white pointer-events-none">
                  {currentPair.renderLabel}
                </div>
                <div className="absolute top-3.5 right-3.5 px-3 py-1.5 rounded-lg bg-[#042F24]/95 border border-emerald-400/30 text-xs font-mono text-[#E5C185] pointer-events-none">
                  {currentPair.realLabel}
                </div>

                {/* Accessible Range Input Overlay */}
                <input
                  type="range"
                  min={5}
                  max={95}
                  value={sliderPosition}
                  aria-label="Ползунок сравнения 3D-визуализации и реальной фотографии объекта"
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                />
              </div>

              {/* Preset Slider Controls under Image */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="font-mono text-stone-400 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-[#D4A359]" />
                  <span>Двигайте шторку на фото или переключайте режим:</span>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSliderPosition(88)}
                    className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-stone-200 font-mono cursor-pointer"
                  >
                    3D-Проект
                  </button>
                  <button
                    type="button"
                    onClick={() => setSliderPosition(50)}
                    className="px-3 py-1 rounded-lg bg-[#D4A359]/20 border border-[#D4A359]/50 text-[#E5C185] font-mono cursor-pointer"
                  >
                    50 / 50
                  </button>
                  <button
                    type="button"
                    onClick={() => setSliderPosition(12)}
                    className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-stone-200 font-mono cursor-pointer"
                  >
                    Реальность
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Comparison Proof Points */}
            <div className="lg:col-span-4 space-y-5">
              <div>
                <p className="text-xs font-mono text-[#D4A359] mb-1">
                  Точность реализации · Миллиметр в миллиметр
                </p>
                <h4 className="text-lg sm:text-xl font-bold text-white leading-snug">
                  {currentPair.title}
                </h4>
              </div>

              <ul className="space-y-3">
                {currentPair.notes.map((note) => (
                  <li
                    key={note}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-200"
                  >
                    <Check className="w-4 h-4 text-[#D4A359] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{note}</span>
                  </li>
                ))}
              </ul>

              <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                <p className="text-xs text-stone-300 leading-relaxed">
                  Посмотрите полный живой видеообход этого объекта со звуком и без монтажных склеек в нашей галерее.
                </p>
                <button
                  type="button"
                  onClick={() => onJumpToProof('videos')}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4A359] hover:text-[#e8c382] transition-colors cursor-pointer"
                >
                  <span>Открыть видеообход этого объекта</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* PART 3: INTERACTIVE ARCHITECTURAL LAYER CAKE ("АНАТОМИЯ ИНЖЕНЕРНОГО ПИРОГА КВАРТИРЫ") */}
        <div className="bg-[#141917] border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div className="max-w-2xl">
              <p className="text-xs font-mono text-[#D4A359] mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>Инженерная анатомия · Что скрыто за чистовой отделкой</span>
              </p>
              <h3 className="text-xl sm:text-3xl font-bold text-white leading-tight">
                Анатомия технологического пирога квартиры{' '}
                <span className="font-serif italic font-normal text-[#E5C185]">
                  в 4 скрытых уровнях
                </span>
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-stone-300 max-w-md leading-relaxed">
              Визуальная красота интерьера живет десятилетиями только тогда, когда под ней собрана правильная инженерная база. Переключайте уровни разреза:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left 5 Cols: Interactive 4-Layer Architectural Stack + Blueprint Diagram */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-3">
              {ENGINEERING_LAYERS.map((layer, idx) => {
                const isSelected = activeLayerIdx === idx;
                return (
                  <button
                    key={layer.id}
                    type="button"
                    onClick={() => setActiveLayerIdx(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-colors cursor-pointer flex items-center justify-between gap-4 ${
                      isSelected
                        ? 'bg-[#D4A359] text-stone-950 border-[#D4A359] shadow-lg'
                        : 'bg-white/[0.03] text-stone-200 border-white/10 hover:bg-white/[0.07]'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-xs font-mono">
                        <span className={isSelected ? 'font-bold text-stone-950' : 'text-[#D4A359]'}>
                          {layer.layerCode}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className={isSelected ? 'text-stone-900' : 'text-stone-400'}>
                          {layer.shortTag}
                        </span>
                      </div>
                      <p className="text-sm font-bold mt-1 leading-snug">
                        {layer.title}
                      </p>
                    </div>
                    <ArrowRight
                      className={`w-4 h-4 shrink-0 ${
                        isSelected ? 'text-stone-950' : 'text-stone-500'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right 7 Cols: Visual Cutaway Inspection Card with Real Macro Photo & Isometric Schematic Overlay */}
            <div className="lg:col-span-7 bg-[#0E1210] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between">
              <div className="relative aspect-[16/9] w-full bg-black overflow-hidden border-b border-white/10">
                <img
                  src={currentLayer.imageUrl}
                  alt={currentLayer.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                {/* Architectural CAD Isometric Overlay Graphic */}
                <div className="absolute top-3.5 left-4 right-4 flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-lg bg-black/80 border border-white/15 text-xs font-mono text-[#E5C185]">
                    {currentLayer.layerCode} · Реальный узел на объекте
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-[#042F24]/90 border border-emerald-400/30 text-xs font-mono text-emerald-100">
                    {currentLayer.shortTag}
                  </span>
                </div>

                <div className="absolute bottom-3.5 left-4 right-4">
                  <p className="text-sm sm:text-lg font-bold text-white leading-snug">
                    {currentLayer.title}
                  </p>
                </div>
              </div>

              <div className="p-5 sm:p-6 space-y-4">
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {currentLayer.description}
                </p>

                <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-xs font-mono text-[#D4A359]">
                    Норматив: {currentLayer.technicalStandard}
                  </span>
                  <button
                    type="button"
                    onClick={() => onJumpToProof(currentLayer.proofCategory)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-[#D4A359] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>Смотреть все узлы этого этапа</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
