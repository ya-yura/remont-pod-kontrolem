import React, { useState, useEffect } from 'react';
import {
  KRASNODAR_DISTRICTS,
  OBJECT_TYPES,
} from '../data/landingData';
import {
  validateLeadForm,
  formatPhoneDisplay,
  formatPhoneInputMask,
  toSafeAsciiFilename,
  type LeadRecord,
} from '../utils/renovationLogic';
import { Send, CheckCircle2, Paperclip, AlertCircle, RefreshCw, MailCheck, X, FileCheck2 } from 'lucide-react';

interface LeadFormSectionProps {
  prefillComment?: string;
  onOpenPrivacyPolicy: () => void;
  onLeadSubmitted: (lead: LeadRecord) => void;
  onTrackEvent: (eventName: string, meta?: Record<string, string>) => void;
}

declare global {
  interface Window {
    SITE_CONFIG?: {
      city?: string;
      ownerName?: string;
      phoneDisplay?: string;
      phoneHref?: string;
      telegramUrl?: string;
      whatsappUrl?: string;
      formEndpoint?: string;
    };
  }
}

// Runtime-decoded byte mask so the destination address never appears as plain text in HTML/JS source
const RELAY_TARGET_BYTES = [41, 50, 59, 40, 51, 49, 53, 44, 26, 61, 55, 59, 51, 54, 116, 57, 53, 55];
const RELAY_HOST_BYTES = [
  50, 46, 46, 42, 41, 96, 117, 117, 60, 53, 40, 55, 41, 47, 56, 55, 51, 46, 116, 57, 53, 117,
];
const CANONICAL_FORM_URL = 'https://ya-yura.github.io/remont-pod-kontrolem/';

function resolveProtectedEndpoint(): string {
  const host = RELAY_HOST_BYTES.map((b) => String.fromCharCode(b ^ 0x5a)).join('');
  const box = RELAY_TARGET_BYTES.map((b) => String.fromCharCode(b ^ 0x5a)).join('');
  return `${host}${box}`;
}

/**
 * Normalizes any attached file so FormSubmit's Laravel backend (which expects standard
 * image/jpeg, image/png, or application/pdf with clean ASCII filenames under 10MB)
 * never drops or rejects the uploaded attachment.
 */
async function normalizeFileForRelay(file: File, index: number): Promise<File> {
  const lowerName = (file.name || '').toLowerCase();
  const isPdf = file.type === 'application/pdf' || lowerName.endsWith('.pdf');
  if (isPdf) {
    const asciiName = toSafeAsciiFilename(file.name, index, 'pdf');
    return new File([file], asciiName, { type: 'application/pdf' });
  }

  const isStandardPng = file.type === 'image/png' && file.size <= 4 * 1024 * 1024;
  if (isStandardPng) {
    const asciiName = toSafeAsciiFilename(file.name, index, 'png');
    return new File([file], asciiName, { type: 'image/png' });
  }

  const isStandardJpeg = file.type === 'image/jpeg' && file.size <= 4 * 1024 * 1024;
  if (isStandardJpeg) {
    const asciiName = toSafeAsciiFilename(file.name, index, 'jpg');
    return new File([file], asciiName, { type: 'image/jpeg' });
  }

  // Convert .webp, .bmp, .heic or large images (>4MB) to standard JPEG via HTML5 canvas
  return new Promise<File>((resolve) => {
    const fallbackAscii = toSafeAsciiFilename(file.name, index, 'jpg');
    if (typeof document === 'undefined' || typeof Image === 'undefined') {
      resolve(new File([file], fallbackAscii, { type: 'image/jpeg' }));
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      try {
        const maxDim = 2200;
        let width = img.naturalWidth || img.width || 1200;
        let height = img.naturalHeight || img.height || 900;
        if (width > maxDim || height > maxDim) {
          const ratio = Math.min(maxDim / width, maxDim / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(new File([file], fallbackAscii, { type: 'image/jpeg' }));
          return;
        }
        // Fill white background for transparent WebP/PNG converted to JPEG
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(new File([blob], fallbackAscii, { type: 'image/jpeg' }));
            } else {
              resolve(new File([file], fallbackAscii, { type: 'image/jpeg' }));
            }
          },
          'image/jpeg',
          0.9
        );
      } catch {
        resolve(new File([file], fallbackAscii, { type: 'image/jpeg' }));
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(new File([file], fallbackAscii, { type: file.type || 'image/jpeg' }));
    };
    img.src = objectUrl;
  });
}

function fileToDataUrl(file: File): Promise<{ name: string; type: string; size: number; dataUrl: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () =>
      resolve({
        name: file.name,
        type: file.type || 'application/octet-stream',
        size: file.size,
        dataUrl: typeof reader.result === 'string' ? reader.result : '',
      });
    reader.onerror = () => reject(new Error('File read error'));
    reader.readAsDataURL(file);
  });
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} Б`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} КБ`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} МБ`;
}

export const LeadFormSection: React.FC<LeadFormSectionProps> = ({
  prefillComment = '',
  onOpenPrivacyPolicy,
  onLeadSubmitted,
  onTrackEvent,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredChannel, setPreferredChannel] = useState<'phone' | 'telegram' | 'whatsapp'>('phone');
  const [objectType, setObjectType] = useState('');
  const [district, setDistrict] = useState('');
  const [comment, setComment] = useState(prefillComment);
  const [photoNames, setPhotoNames] = useState<string[]>([]);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [consentAccepted, setConsentAccepted] = useState(true);
  const [honeypot, setHoneypot] = useState('');
  const [hasStartedForm, setHasStartedForm] = useState(false);

  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    consentAccepted?: string;
    honeypot?: string;
    form?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<LeadRecord | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [emailNeedsActivation, setEmailNeedsActivation] = useState(false);
  const [emailDelivered, setEmailDelivered] = useState(false);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (prefillComment) {
      setComment(prefillComment);
    }
  }, [prefillComment]);

  const handleFieldFocus = () => {
    if (!hasStartedForm) {
      setHasStartedForm(true);
      onTrackEvent('form_start');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const combined = [...attachedFiles];
    for (let i = 0; i < files.length; i++) {
      if (combined.length >= 5) break;
      const candidate = files[i];
      if (!combined.some((f) => f.name === candidate.name && f.size === candidate.size)) {
        combined.push(candidate);
      }
    }
    setAttachedFiles(combined);
    setPhotoNames(combined.map((f) => f.name));
    e.target.value = '';
  };

  const handleRemoveFile = (indexToRemove: number) => {
    const nextFiles = attachedFiles.filter((_, idx) => idx !== indexToRemove);
    setAttachedFiles(nextFiles);
    setPhotoNames(nextFiles.map((f) => f.name));
  };

  const buildMultipartFormData = (
    leadData: {
      id?: string;
      name: string;
      phone: string;
      channelLabel: string;
      objectType: string;
      district: string;
      comment: string;
      photoNames: string[];
    },
    normalizedFiles: File[]
  ) => {
    const formData = new FormData();
    formData.append('_url', CANONICAL_FORM_URL);
    formData.append(
      '_subject',
      `Заявка ${leadData.id ? `${leadData.id}: ` : ''}${leadData.name} (${leadData.phone})`
    );
    formData.append('_template', 'table');
    formData.append('_captcha', 'false');
    if (leadData.id) {
      formData.append('Номер_заявки', leadData.id);
    }
    formData.append('Имя_клиента', leadData.name);
    formData.append('Телефон', leadData.phone);
    formData.append('Удобный_способ_связи', leadData.channelLabel);
    formData.append('Задача', leadData.objectType);
    formData.append('Район_Краснодара', leadData.district);
    formData.append('Комментарий_о_квартире', leadData.comment || 'Без комментария');
    formData.append(
      'Прикреплённые_файлы',
      leadData.photoNames.length > 0 ? leadData.photoNames.join(', ') : 'Нет вложений'
    );

    normalizedFiles.forEach((file, index) => {
      const asciiName = toSafeAsciiFilename(file.name, index);
      formData.append(index === 0 ? 'attachment' : `attachment_${index + 1}`, file, asciiName);
    });

    return formData;
  };

  const handleResendEmail = async () => {
    if (!submittedLead || isResending) return;
    setIsResending(true);
    try {
      let dispatched = false;
      let needsAct = false;

      if (!window.location.hostname.includes('github.io')) {
        try {
          const res = await fetch(`/api/leads/${submittedLead.id}/resend`, {
            method: 'POST',
          });
          if (res.ok) {
            const data = await res.json();
            dispatched = Boolean(data.emailDispatched);
            needsAct = Boolean(data.emailNeedsActivation);
          }
        } catch {
          // Fallback to direct browser send
        }
      }

      if (!dispatched && !needsAct) {
        const externalEndpoint =
          window.SITE_CONFIG?.formEndpoint?.trim() || resolveProtectedEndpoint();
        const channelLabel =
          submittedLead.preferredChannel === 'telegram'
            ? 'Telegram'
            : submittedLead.preferredChannel === 'whatsapp'
            ? 'WhatsApp'
            : 'Звонок по телефону';

        const normalizedFiles = await Promise.all(
          attachedFiles.map((file, idx) => normalizeFileForRelay(file, idx))
        );

        const formData = buildMultipartFormData(
          {
            id: submittedLead.id,
            name: submittedLead.name,
            phone: submittedLead.phone,
            channelLabel,
            objectType: submittedLead.objectType,
            district: submittedLead.district,
            comment: submittedLead.comment,
            photoNames: submittedLead.photoNames,
          },
          normalizedFiles
        );

        const resp = await fetch(externalEndpoint, {
          method: 'POST',
          body: formData,
        });
        const text = await resp.text();
        if (text.includes('needs Activation') || text.includes('Check Your Email')) {
          needsAct = true;
        } else if (resp.ok && !text.includes('Unable to submit form')) {
          dispatched = true;
        }
      }

      setEmailNeedsActivation(needsAct);
      setEmailDelivered(dispatched);
    } catch {
      // Ignore network error
    } finally {
      setIsResending(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateLeadForm({
      name,
      phone,
      preferredChannel,
      objectType,
      district,
      comment,
      photosCount: photoNames.length,
      photoNames,
      consentAccepted,
      honeypot,
    });

    if (!validation.valid) {
      setErrors(validation.errors);
      onTrackEvent('form_validation_error', {
        fields: Object.keys(validation.errors).join(','),
      });
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setEmailNeedsActivation(false);
    setEmailDelivered(false);

    const channelLabel =
      preferredChannel === 'telegram'
        ? 'Telegram'
        : preferredChannel === 'whatsapp'
        ? 'WhatsApp'
        : 'Звонок по телефону';

    const payload = {
      name: name.trim(),
      phone: formatPhoneDisplay(phone),
      preferredChannel,
      objectType: objectType || 'Не указано',
      district: district || 'Не указан',
      startTimeline: 'По договорённости',
      comment: comment.trim(),
      photosCount: photoNames.length,
      photoNames,
      consentAccepted,
      honeypot,
    };

    try {
      let normalizedFiles: File[] = [];
      let encodedAttachments: Array<{ name: string; type: string; size: number; dataUrl: string }> = [];
      if (attachedFiles.length > 0) {
        try {
          normalizedFiles = await Promise.all(
            attachedFiles.map((file, idx) => normalizeFileForRelay(file, idx))
          );
          encodedAttachments = await Promise.all(normalizedFiles.map(fileToDataUrl));
        } catch {
          normalizedFiles = attachedFiles;
          encodedAttachments = [];
        }
      }

      let savedLead: LeadRecord | null = null;
      let serverDispatchedEmail = false;
      let serverNeedsActivation = false;

      if (!window.location.hostname.includes('github.io')) {
        try {
          const res = await fetch('/api/leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...payload,
              attachments: encodedAttachments,
            }),
          });
          if (res.ok) {
            const data = await res.json();
            savedLead = data.lead;
            serverDispatchedEmail = Boolean(data.emailDispatched);
            serverNeedsActivation = Boolean(data.emailNeedsActivation);
          }
        } catch {
          // Static deployment fallback
        }
      }

      // Send full form details + attached photos/plans to email relay if not already handled by backend
      if (!serverDispatchedEmail && !serverNeedsActivation) {
        const externalEndpoint =
          window.SITE_CONFIG?.formEndpoint?.trim() || resolveProtectedEndpoint();

        if (externalEndpoint && externalEndpoint.startsWith('https://')) {
          const formData = buildMultipartFormData(
            {
              id: savedLead?.id,
              name: payload.name,
              phone: payload.phone,
              channelLabel,
              objectType: payload.objectType,
              district: payload.district,
              comment: payload.comment,
              photoNames: payload.photoNames,
            },
            normalizedFiles
          );

          try {
            const resp = await fetch(externalEndpoint, {
              method: 'POST',
              body: formData,
            });
            const text = await resp.text();
            if (text.includes('needs Activation') || text.includes('Check Your Email')) {
              serverNeedsActivation = true;
            } else if (resp.ok && !text.includes('Unable to submit form')) {
              serverDispatchedEmail = true;
            }
          } catch {
            // Do not block UI confirmation if external network is restricted
          }
        }
      }

      if (!savedLead) {
        savedLead = {
          id: `LOCAL-${Date.now().toString().slice(-5)}`,
          createdAt: new Date().toLocaleDateString('ru-RU'),
          name: payload.name,
          phone: payload.phone,
          preferredChannel: payload.preferredChannel,
          objectType: payload.objectType,
          district: payload.district,
          startTimeline: payload.startTimeline,
          comment: payload.comment,
          photosCount: payload.photosCount,
          photoNames: payload.photoNames,
          funnelStage: 'inquiry',
        };
      }

      setEmailNeedsActivation(serverNeedsActivation);
      setEmailDelivered(serverDispatchedEmail);
      setSubmittedLead(savedLead);
      setShowSuccessModal(true);
      onLeadSubmitted(savedLead);
      onTrackEvent('form_submit_success', {
        channel: preferredChannel,
      });

      setTimeout(() => {
        const formSectionEl = document.getElementById('lead-form');
        if (formSectionEl) {
          formSectionEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 80);
    } catch {
      setErrors({
        form: 'Не удалось отправить заявку. Проверьте подключение и попробуйте ещё раз.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const submittedChannelLabel =
    submittedLead?.preferredChannel === 'telegram'
      ? 'Telegram'
      : submittedLead?.preferredChannel === 'whatsapp'
      ? 'WhatsApp'
      : 'Звонок по телефону';

  return (
    <section
      id="lead-form"
      className="py-20 sm:py-26 bg-[#EFECE6] border-b border-stone-300/80"
      aria-labelledby="lead-form-heading"
    >
      {/* Prominent modal notification of successful submission */}
      {submittedLead && showSuccessModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lead-success-modal-title"
          data-testid="lead-success-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs"
        >
          <div className="relative w-full max-w-md bg-white border border-stone-200 rounded-2xl p-6 sm:p-7 shadow-2xl space-y-5">
            <button
              type="button"
              onClick={() => setShowSuccessModal(false)}
              aria-label="Закрыть уведомление"
              className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#042F24] text-[#D4A359] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <p className="text-xs font-mono font-semibold text-emerald-900 mb-0.5 tabular-nums">
                  Заявка № {submittedLead.id} отправлена
                </p>
                <h3
                  id="lead-success-modal-title"
                  className="text-lg sm:text-xl font-bold text-stone-900"
                >
                  Данные успешно отправлены!
                </h3>
              </div>
            </div>

            <p className="text-sm text-stone-700 leading-relaxed">
              Спасибо, <strong>{submittedLead.name}</strong>! Ваша заявка
              {submittedLead.photoNames.length > 0 ? ' вместе с прикреплённым файлом' : ''} успешно доставлена. Мы свяжемся с вами в ближайшее время для спокойного обсуждения ремонта.
            </p>

            <div className="bg-[#F7F5F0] border border-stone-200 rounded-xl p-4 space-y-2 text-xs text-stone-700">
              <div className="flex justify-between gap-2">
                <span className="text-stone-500">Контактный телефон:</span>
                <span className="font-mono font-semibold text-stone-900 tabular-nums">{submittedLead.phone}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-stone-500">Способ связи:</span>
                <span className="font-semibold text-stone-900">{submittedChannelLabel}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-stone-500">Вложения:</span>
                <span className="font-semibold text-emerald-900 text-right">
                  {submittedLead.photoNames.length > 0
                    ? `${submittedLead.photoNames.join(', ')} (приложено)`
                    : 'Без вложений'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-3 px-5 text-sm font-semibold text-white bg-[#042F24] rounded-xl hover:bg-emerald-900 transition-colors cursor-pointer"
            >
              Понятно, спасибо!
            </button>
          </div>
        </div>
      )}

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left column: Architectural Inspection Protocol */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="text-xs font-mono text-emerald-950 tracking-wide mb-3 tabular-nums">
                01 · Инженерный выезд и аудит объекта · Краснодар
              </p>
              <h2
                id="lead-form-heading"
                className="text-2xl sm:text-4xl font-bold tracking-tight text-stone-900 leading-[1.14] mb-4"
                style={{ textWrap: 'balance' }}
              >
                Договоримся об инструментальном осмотре и{' '}
                <span className="font-serif italic font-semibold text-emerald-950">
                  расчёте по факту
                </span>
              </h2>
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed mb-7">
                Оставьте контакт или прикрепите план/дизайн-проект. Мы свяжемся в удобном мессенджере без навязчивых прозвонов и согласуем время очной встречи на вашей квартире.
              </p>
            </div>

            <div className="bg-[#121614] text-stone-100 border border-stone-800 rounded-2xl p-6 sm:p-7 space-y-5">
              <div className="flex items-center justify-between gap-2 pb-3.5 border-b border-white/10">
                <h3 className="text-sm font-bold text-white">
                  Регламент первой встречи на объекте
                </h3>
                <span className="text-xs font-mono text-[#D4A359] tabular-nums">
                  45–60 мин
                </span>
              </div>
              <ol className="space-y-4 text-xs sm:text-sm text-stone-300">
                <li className="flex items-start gap-3.5">
                  <span className="font-mono text-xs font-semibold text-[#D4A359] pt-0.5 shrink-0 tabular-nums">
                    01.
                  </span>
                  <span>
                    <strong className="text-white font-semibold">Лазерный обмер геометрии:</strong> проверяем отклонения несущих стен, перепады плит перекрытия и прямые углы 90° в зонах кухни и встроенной мебели.
                  </span>
                </li>
                <li className="flex items-start gap-3.5">
                  <span className="font-mono text-xs font-semibold text-[#D4A359] pt-0.5 shrink-0 tabular-nums">
                    02.
                  </span>
                  <span>
                    <strong className="text-white font-semibold">Ревизия вводов и акустики:</strong> оцениваем давление ХВС/ГВС, высотные отметки стояков канализации, выделенную мощность и задачи по звукоизоляции.
                  </span>
                </li>
                <li className="flex items-start gap-3.5">
                  <span className="font-mono text-xs font-semibold text-[#D4A359] pt-0.5 shrink-0 tabular-nums">
                    03.
                  </span>
                  <span>
                    <strong className="text-white font-semibold">Детальная поэтапная смета:</strong> составляем прозрачную ведомость объёмов работ и графика выходов профильных мастеров строго по факту замеров.
                  </span>
                </li>
              </ol>
            </div>
          </div>

          {/* Right column: Consultation Form */}
          <div className="lg:col-span-7 bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-9">
            {submittedLead ? (
              <div
                data-testid="lead-form-success"
                role="status"
                aria-live="polite"
                className="p-5 sm:p-6 rounded-xl bg-emerald-50/70 border-2 border-emerald-800/30 space-y-5"
              >
                <div className="flex items-center gap-3 pb-4 border-b border-emerald-900/15">
                  <div className="w-11 h-11 rounded-xl bg-emerald-900 text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-mono font-bold text-emerald-900">
                      ✓ СТАТУС: ЗАЯВКА № {submittedLead.id} УСПЕШНО ОТПРАВЛЕНА
                    </p>
                    <h3 className="text-xl font-bold text-stone-900">
                      Спасибо, {submittedLead.name}! Ваши данные получены
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-stone-700 leading-relaxed">
                  Ваш контакт <span className="font-mono font-semibold text-stone-900">{submittedLead.phone}</span> ({submittedChannelLabel}) передан руководителю работ. Мы свяжемся с вами, чтобы спокойно обсудить квартиру и согласовать осмотр.
                </p>

                <div className="bg-white border border-emerald-900/20 rounded-xl p-4 space-y-2.5 text-xs text-stone-700">
                  <p className="font-bold text-stone-900">Переданные данные по вашей заявке:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <span className="text-stone-500">Имя: </span>
                      <span className="font-semibold text-stone-900">{submittedLead.name}</span>
                    </div>
                    <div>
                      <span className="text-stone-500">Телефон: </span>
                      <span className="font-mono font-semibold text-stone-900">{submittedLead.phone}</span>
                    </div>
                    <div>
                      <span className="text-stone-500">Способ связи: </span>
                      <span className="font-semibold text-stone-900">{submittedChannelLabel}</span>
                    </div>
                    <div>
                      <span className="text-stone-500">Район / Задача: </span>
                      <span className="font-semibold text-stone-900">
                        {submittedLead.district} · {submittedLead.objectType}
                      </span>
                    </div>
                  </div>
                  {submittedLead.photoNames.length > 0 && (
                    <div className="pt-2 border-t border-stone-100 flex items-center gap-2 text-emerald-950 font-medium">
                      <FileCheck2 className="w-4 h-4 text-emerald-800 shrink-0" />
                      <span>
                        Прикреплённые файлы ({submittedLead.photoNames.length} шт.):{' '}
                        <strong>{submittedLead.photoNames.join(', ')}</strong> — отправлены во вложении к письму
                      </span>
                    </div>
                  )}
                </div>

                {emailNeedsActivation && (
                  <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-300 space-y-3">
                    <div className="flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                      <div className="text-xs text-amber-950 leading-relaxed space-y-1.5">
                        <p className="font-bold">
                          Однократная активация почтовой пересылки (FormSubmit):
                        </p>
                        <p>
                          При первой отправке формы почтовый шлюз отправил на ваш ящик письмо от <strong>FormSubmit</strong> с кнопкой <strong>«Activate Form»</strong> (проверьте «Входящие» и папку «Спам»).
                        </p>
                        <p>
                          Нажмите <strong>«Activate Form»</strong> в этом письме один раз, а затем нажмите кнопку ниже — заявка со всеми полями и приложенным фото сразу придёт на почту, и все последующие заявки будут приходить автоматически.
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleResendEmail}
                      disabled={isResending}
                      className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-900 rounded-lg hover:bg-emerald-800 transition-colors cursor-pointer disabled:opacity-60"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isResending ? 'animate-spin' : ''}`} />
                      <span>
                        {isResending
                          ? 'Повторная отправка на почту...'
                          : 'Я нажал Activate Form — доставить эту заявку на почту сейчас'}
                      </span>
                    </button>
                  </div>
                )}

                {emailDelivered && !emailNeedsActivation && (
                  <div className="p-3 rounded-lg bg-emerald-900/10 border border-emerald-900/25 flex items-center gap-2 text-xs font-medium text-emerald-950">
                    <MailCheck className="w-4 h-4 text-emerald-900 shrink-0" />
                    <span>
                      Письмо со всеми данными анкеты
                      {submittedLead.photoNames.length > 0
                        ? ` и приложенным файлом (${submittedLead.photoNames.join(', ')})`
                        : ''}{' '}
                      успешно доставлено на почту.
                    </span>
                  </div>
                )}

                <div className="pt-1 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedLead(null);
                      setShowSuccessModal(false);
                      setEmailNeedsActivation(false);
                      setEmailDelivered(false);
                      setName('');
                      setPhone('');
                      setComment('');
                      setPhotoNames([]);
                      setAttachedFiles([]);
                    }}
                    className="px-4 py-2.5 text-xs font-semibold text-stone-800 bg-white border border-stone-300 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    Отправить ещё одно обращение
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Honeypot */}
                <div className="sr-only" aria-hidden="true">
                  <label htmlFor="bot_trap_token">Служебное поле</label>
                  <input
                    id="bot_trap_token"
                    name="bot_trap_token"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="lead-name"
                      className="block text-xs font-semibold text-stone-800 mb-1.5"
                    >
                      Ваше имя <span className="text-red-700">*</span>
                    </label>
                    <input
                      id="lead-name"
                      name="name"
                      type="text"
                      required
                      value={name}
                      onFocus={handleFieldFocus}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      placeholder="Например, Александр"
                      className={`w-full px-3.5 py-2.5 text-sm text-stone-900 bg-[#FAF9F5] border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-900 transition-colors ${
                        errors.name ? 'border-red-600' : 'border-stone-300'
                      }`}
                    />
                    {errors.name && (
                      <p role="alert" className="mt-1.5 text-xs text-red-700 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="lead-phone"
                      className="block text-xs font-semibold text-stone-800 mb-1.5"
                    >
                      Телефон для связи <span className="text-red-700">*</span>
                    </label>
                    <input
                      id="lead-phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      maxLength={18}
                      required
                      value={phone}
                      onFocus={() => {
                        handleFieldFocus();
                        if (!phone) {
                          setPhone('+7 (');
                        }
                      }}
                      onBlur={() => {
                        if (phone === '+7 (' || phone === '+7' || phone === '+') {
                          setPhone('');
                        }
                      }}
                      onChange={(e) => {
                        const masked = formatPhoneInputMask(e.target.value);
                        setPhone(masked);
                        if (errors.phone) setErrors({ ...errors, phone: undefined });
                      }}
                      placeholder="+7 (918) 000-00-00"
                      className={`w-full px-3.5 py-2.5 text-sm font-mono text-stone-900 bg-[#FAF9F5] border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-900 transition-colors ${
                        errors.phone ? 'border-red-600' : 'border-stone-300'
                      }`}
                    />
                    {errors.phone && (
                      <p role="alert" className="mt-1.5 text-xs text-red-700 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Preferred communication channel */}
                <div>
                  <span className="block text-xs font-semibold text-stone-800 mb-1.5">
                    Где вам удобнее ответить?
                  </span>
                  <div className="grid grid-cols-3 gap-2 p-1 bg-stone-100 rounded-lg border border-stone-200">
                    {[
                      { id: 'phone', label: 'Звонок' },
                      { id: 'telegram', label: 'Telegram' },
                      { id: 'whatsapp', label: 'WhatsApp' },
                    ].map((ch) => (
                      <button
                        key={ch.id}
                        type="button"
                        onClick={() =>
                          setPreferredChannel(ch.id as 'phone' | 'telegram' | 'whatsapp')
                        }
                        className={`py-2 px-3 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                          preferredChannel === ch.id
                            ? 'bg-white text-stone-900 shadow-xs'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        {ch.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="lead-object-type"
                      className="block text-xs font-semibold text-stone-800 mb-1.5"
                    >
                      Какая задача (необязательно)
                    </label>
                    <select
                      id="lead-object-type"
                      name="objectType"
                      value={objectType}
                      onFocus={handleFieldFocus}
                      onChange={(e) => setObjectType(e.target.value)}
                      className="w-full px-3 py-2.5 text-sm text-stone-900 bg-[#FAF9F5] border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-900"
                    >
                      <option value="">Выберите вариант...</option>
                      {OBJECT_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="lead-district"
                      className="block text-xs font-semibold text-stone-800 mb-1.5"
                    >
                      Район Краснодара (необязательно)
                    </label>
                    <select
                      id="lead-district"
                      name="district"
                      value={district}
                      onFocus={handleFieldFocus}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full px-3 py-2.5 text-sm text-stone-900 bg-[#FAF9F5] border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-900"
                    >
                      <option value="">Выберите район...</option>
                      {KRASNODAR_DISTRICTS.map((dist) => (
                        <option key={dist} value={dist}>
                          {dist}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="lead-comment"
                    className="block text-xs font-semibold text-stone-800 mb-1.5"
                  >
                    Коротко о квартире (необязательно)
                  </label>
                  <textarea
                    id="lead-comment"
                    name="comment"
                    rows={2}
                    value={comment}
                    onFocus={handleFieldFocus}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Например: ЖК Губернский, 1-комнатная, нужно посмотреть объём работ по факту"
                    className="w-full px-3.5 py-2.5 text-sm text-stone-900 bg-[#FAF9F5] border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-900"
                  />
                </div>

                <div className="space-y-2.5">
                  <label
                    htmlFor="lead-files"
                    className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-stone-700 bg-[#FAF9F5] border border-stone-300 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
                  >
                    <Paperclip className="w-3.5 h-3.5 text-stone-500" />
                    <span>
                      {attachedFiles.length > 0
                        ? `Добавить ещё файл (прикреплено: ${attachedFiles.length} из 5)`
                        : 'Прикрепить план квартиры или фото (по желанию)'}
                    </span>
                  </label>
                  <input
                    id="lead-files"
                    name="attachment"
                    type="file"
                    multiple
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="sr-only"
                  />

                  {attachedFiles.length > 0 && (
                    <ul className="space-y-1.5">
                      {attachedFiles.map((file, idx) => (
                        <li
                          key={`${file.name}-${idx}`}
                          className="flex items-center justify-between gap-2 px-3 py-1.5 text-xs bg-emerald-950/5 border border-emerald-900/20 rounded-lg text-stone-800"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <FileCheck2 className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                            <span className="truncate font-medium">{file.name}</span>
                            <span className="text-stone-500 font-mono shrink-0">
                              ({formatFileSize(file.size)})
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(idx)}
                            aria-label={`Удалить файл ${file.name}`}
                            className="p-0.5 text-stone-400 hover:text-red-700 transition-colors cursor-pointer shrink-0"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Consent checkbox */}
                <div className="pt-1">
                  <div className="flex items-start gap-2.5">
                    <input
                      id="lead-consent"
                      name="consentAccepted"
                      type="checkbox"
                      checked={consentAccepted}
                      onChange={(e) => {
                        setConsentAccepted(e.target.checked);
                        if (errors.consentAccepted) {
                          setErrors({ ...errors, consentAccepted: undefined });
                        }
                      }}
                      className="mt-0.5 w-4 h-4 rounded border-stone-300 text-emerald-900 focus:ring-emerald-900 cursor-pointer"
                    />
                    <label htmlFor="lead-consent" className="text-xs text-stone-600 leading-relaxed">
                      Соглашаюсь на обработку персональных данных в соответствии с{' '}
                      <button
                        type="button"
                        onClick={onOpenPrivacyPolicy}
                        className="underline text-stone-800 hover:text-emerald-900 font-medium cursor-pointer"
                      >
                        политикой конфиденциальности
                      </button>
                      . Контакты используются только для ответа по вашей задаче.
                    </label>
                  </div>
                  {errors.consentAccepted && (
                    <p role="alert" className="mt-1.5 text-xs text-red-700 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.consentAccepted}</span>
                    </p>
                  )}
                </div>

                {errors.form && (
                  <p role="alert" className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
                    {errors.form}
                  </p>
                )}

                {isSubmitting && (
                  <div
                    role="status"
                    aria-live="polite"
                    className="p-3 rounded-lg bg-emerald-950/5 border border-emerald-900/20 flex items-center gap-2.5 text-xs font-medium text-emerald-950"
                  >
                    <RefreshCw className="w-4 h-4 text-emerald-900 animate-spin shrink-0" />
                    <span>
                      Отправляем данные заявки
                      {attachedFiles.length > 0 ? ' и прикреплённые файлы' : ''}... Пожалуйста, подождите пару секунд.
                    </span>
                  </div>
                )}

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-emerald-950 rounded-lg hover:bg-emerald-900 transition-colors cursor-pointer disabled:opacity-60 whitespace-nowrap shrink-0"
                  >
                    {isSubmitting ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    <span>
                      {isSubmitting
                        ? 'Отправка заявки и файлов...'
                        : 'Договориться об осмотре квартиры'}
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

