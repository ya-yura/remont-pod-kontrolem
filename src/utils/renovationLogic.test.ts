import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizePhoneDigits,
  formatPhoneDisplay,
  formatPhoneInputMask,
  toSafeAsciiFilename,
  validateLeadForm,
  hasAnyPriceIllusion,
  generateCsvFromLeads,
} from './renovationLogic.ts';

test('toSafeAsciiFilename transliterates Cyrillic and sanitizes special characters', () => {
  assert.equal(toSafeAsciiFilename('Снимок экрана 2026-10-20.png', 0), 'Snimok_ekrana_2026-10-20.png');
  assert.equal(toSafeAsciiFilename('План квартиры (1).pdf', 1, 'pdf'), 'Plan_kvartiry_1.pdf');
  assert.equal(toSafeAsciiFilename('фото.webp', 0, 'jpg'), 'foto.jpg');
});

test('normalizePhoneDigits handles 10-digit, 11-digit, and overflow Russian numbers', () => {
  assert.equal(normalizePhoneDigits('8 (918) 123-45-67'), '79181234567');
  assert.equal(normalizePhoneDigits('+7 918 123 45 67'), '79181234567');
  assert.equal(normalizePhoneDigits('9181234567'), '79181234567');
  assert.equal(normalizePhoneDigits('32543254324532'), '73254325432');
  assert.equal(normalizePhoneDigits('123'), '123');
});

test('formatPhoneInputMask formats live keystrokes into +7 (XXX) XXX-XX-XX', () => {
  assert.equal(formatPhoneInputMask('9'), '+7 (9');
  assert.equal(formatPhoneInputMask('918'), '+7 (918');
  assert.equal(formatPhoneInputMask('9181'), '+7 (918) 1');
  assert.equal(formatPhoneInputMask('9181234'), '+7 (918) 123-4');
  assert.equal(formatPhoneInputMask('89181234567'), '+7 (918) 123-45-67');
  assert.equal(formatPhoneInputMask('32543254324532'), '+7 (325) 432-54-32');
  assert.equal(formatPhoneInputMask('+7 '), '');
});

test('formatPhoneDisplay formats valid Russian mobile numbers cleanly', () => {
  assert.equal(formatPhoneDisplay('89181234567'), '+7 (918) 123-45-67');
  assert.equal(formatPhoneDisplay('9180001122'), '+7 (918) 000-11-22');
});

test('validateLeadForm rejects empty required fields and missing consent', () => {
  const result = validateLeadForm({
    name: 'А',
    phone: '12345',
    consentAccepted: false,
  });
  assert.equal(result.valid, false);
  assert.ok(result.errors.name);
  assert.ok(result.errors.phone);
  assert.ok(result.errors.consentAccepted);
});

test('validateLeadForm blocks honeypot spam submissions', () => {
  const result = validateLeadForm({
    name: 'Иван',
    phone: '+7 (918) 555-44-33',
    consentAccepted: true,
    honeypot: 'http://spam-bot.example',
  });
  assert.equal(result.valid, false);
  assert.ok(result.errors.honeypot);
});

test('validateLeadForm accepts valid name, Russian phone, and consent', () => {
  const result = validateLeadForm({
    name: 'Алексей',
    phone: '8 918 555-44-33',
    consentAccepted: true,
    honeypot: '',
  });
  assert.equal(result.valid, true);
  assert.equal(result.normalizedPhone, '79185554433');
});

test('hasAnyPriceIllusion detects ruble figures and price promises', () => {
  assert.equal(hasAnyPriceIllusion('Ремонт от 15 000 ₽ за м2'), true);
  assert.equal(hasAnyPriceIllusion('Смета 450000 руб'), true);
  assert.equal(hasAnyPriceIllusion('Стоимость рассчитывается только по факту осмотра квартиры.'), false);
});

test('generateCsvFromLeads exports semicolon-separated table with funnel stages', () => {
  const csv = generateCsvFromLeads([
    {
      id: 'L-101',
      createdAt: '2026-10-17',
      name: 'Мария',
      phone: '+7 (918) 111-22-33',
      preferredChannel: 'telegram',
      objectType: 'Новостройка 1-комн.',
      district: 'Фестивальный (ФМР)',
      startTimeline: 'В течение 2 недель',
      comment: 'Нужен осмотр квартиры',
      photosCount: 1,
      photoNames: ['plan.jpg'],
      funnelStage: 'site_inspection',
    },
  ]);
  assert.ok(csv.includes('L-101'));
  assert.ok(csv.includes('4. Осмотр объекта'));
  assert.ok(csv.includes('Фестивальный (ФМР)'));
});

test('splitArticlesByReleaseDate separates published and 2-day scheduled upcoming articles', async () => {
  const { splitArticlesByReleaseDate } = await import('../data/diyArticlesData.ts');
  const oct19 = splitArticlesByReleaseDate('2026-10-19');
  assert.equal(oct19.published.length, 6);
  assert.equal(oct19.upcoming.length, 8);
  assert.equal(oct19.upcoming[0].publishDate, '2026-10-21');

  const oct21 = splitArticlesByReleaseDate('2026-10-21');
  assert.equal(oct21.published.length, 7);
  assert.equal(oct21.upcoming.length, 7);
});

