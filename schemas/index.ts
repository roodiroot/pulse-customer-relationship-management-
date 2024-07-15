import { ActionType, UserRole } from "@prisma/client";
import * as z from "zod";

const MAX_STRING_LENGTH = 50;

const MAX_STUDENTS_LENGTH = 5;
const MIN_STUDENTS_LENGTH = 1;

export const CreateDealSchema = z.object({
  name: z
    .string()
    .min(1, { message: "The field cannot be empty." })
    .max(20, { message: "Maximum length 20 characters" }),
  contractPrice: z.preprocess(
    (val: any) => parseFloat(val),
    z.number().min(1, { message: "The field cannot be empty." }).max(1000000)
  ),
});

export const ContactSchema = z.object({
  phone: z
    .string()
    .min(1, { message: "Поле не может быть пустым." })
    .max(20, "не более 20 символов"),
  mail: z.string(),
  // .email("Укажите правильную почту.")
  // .optional(),
  comment: z.string(),
  // .min(1, { message: "Поле не может быть пустым." })
  // .max(100, "не более 100 символов")
  // .optional(),
  name: z
    .string()
    .min(1, { message: "Поле не может быть пустым." })
    .max(MAX_STRING_LENGTH, {
      message: `Вы можете добавить не более ${MAX_STRING_LENGTH} символов.`,
    }),
});
export const UpdateContactSchema = z.object({
  phone: z
    .string()
    .min(1, { message: "Поле не может быть пустым." })
    .max(20, "не более 20 символов")
    .optional(),
  mail: z.string().optional(),
  comment: z.string().optional(),
  name: z
    .string()
    .min(1, { message: "Поле не может быть пустым." })
    .max(MAX_STRING_LENGTH, {
      message: `Вы можете добавить не более ${MAX_STRING_LENGTH} символов.`,
    })
    .optional(),
});

export const CompanySchema = z.object({
  name: z
    .string()
    .min(1, { message: "Введите название компании." })
    .max(50, { message: "Не более 50 символов" }),
  comment: z.string().min(1, { message: "Введите комментарий." }),
  TIN: z
    .string()
    .min(8, { message: "Введите ИНН компании." })
    .max(15, { message: "Слишком много цифр." }),
  dateRegistr: z.string().max(10, { message: "Не более 10 символов" }),
  address: z.string().max(100, { message: "Не более 100 символов" }),
  owner: z.string().max(50, { message: "Не более 50 символов" }),
  mainOKVED: z.string().max(150, { message: "Не более 150 символов" }),
  contacts: z
    .array(ContactSchema)
    .min(MIN_STUDENTS_LENGTH, {
      message: `Вам нужно добавить как минимум ${MIN_STUDENTS_LENGTH} контакт.`,
    })
    .max(MAX_STUDENTS_LENGTH, {
      message: `Вы можете добавить максимум ${MAX_STUDENTS_LENGTH} контактов`,
    }),
});
export const UpdateCompanySchema = z.object({
  name: z
    .string()
    .min(1, { message: "Введите название компании." })
    .max(50, { message: "Не более 50 символов" })
    .optional(),
  comment: z.string().min(1, { message: "Введите комментарий." }).optional(),
  TIN: z
    .string()
    .min(8, { message: "Введите ИНН компании." })
    .max(15, { message: "Слишком много цифр." })
    .optional(),
  dateRegistr: z
    .string()
    .max(10, { message: "Не более 10 символов" })
    .optional(),
  address: z.string().max(100, { message: "Не более 100 символов" }).optional(),
  owner: z.string().max(50, { message: "Не более 50 символов" }).optional(),
  mainOKVED: z
    .string()
    .max(150, { message: "Не более 150 символов" })
    .optional(),
});

// Схема для создания нового дела
export const SaveCaseSchema = z.object({
  type: z.enum(Object.values(ActionType) as [string, ...string[]]),
  comment: z.string(),
  date: z.date(),
});
export const UpdateCaseSchema = z.object({
  comment: z.string().min(1, { message: "Enter a comment for the task." }),
});

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    role: z.enum([
      UserRole.ADMIN,
      UserRole.USER,
      UserRole.SALES_MANAGER,
      UserRole.SALES_REP,
    ]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }
      return true;
    },
    { message: "Новый пароль должен быть", path: ["newPassword"] }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }
      return true;
    },
    { message: "Пароль должен быть", path: ["password"] }
  );

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Введите email",
  }),
  password: z.string().min(1, { message: "Пароль должен быть" }),
});
export const ForgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Введите email",
  }),
});
export const NewPasswordSchema = z.object({
  password: z.string().min(6, { message: "Минимум 6 символов" }),
});
export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Введите email",
  }),
  password: z.string().min(6, { message: "Минимум 6 символов" }),
  name: z.string().min(1, {
    message: "Введите имя",
  }),
});

export const SearchSchema = z.object({
  text: z
    .string()
    .min(4, { message: "Введите минимум 4 символа." })
    .max(50, { message: "Запрос не более 50 символов." }),
});
