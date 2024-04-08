import { StageDeal } from "@prisma/client";

export const stages = [
  { value: StageDeal.NEW, name: "Новая" },
  { value: StageDeal.ACCESS, name: "Выход на ЛПР" },
  { value: StageDeal.APPOINTMENT, name: "Презентация" },
  { value: StageDeal.DIAGNOSTICS, name: "Диагностика" },
  { value: StageDeal.INVOICE, name: "Счет" },
  {
    value: StageDeal.PAYMENTAGREEMENT,
    name: "Договоренности по оплате",
  },
  {
    value: StageDeal.DEFERREDPAYMENT,
    name: "Оплата отложена",
  },
  { value: StageDeal.PAYMENT, name: "Оплата" },
  { value: StageDeal.REFUSAL, name: "Отказ" },
];
