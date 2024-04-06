"use client";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import InputPhoneMask from "@/components/mask/input-phone-mask";
import {
  Control,
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
} from "react-hook-form";
import { CompanySchema } from "@/schemas";
import { z } from "zod";

interface CreateContactProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  control: Control<z.infer<typeof CompanySchema>, any>;
  fields: FieldArrayWithId<z.infer<typeof CompanySchema>, "contacts", "id">[];
  remove: UseFieldArrayRemove;
  append: UseFieldArrayAppend<z.infer<typeof CompanySchema>, "contacts">;
}

const CreateContact: React.FC<CreateContactProps> = ({
  control,
  fields,
  remove,
  append,
  className,
}) => {
  return (
    <div className={className}>
      <div className="grid w-full items-start gap-5 md:pt-9">
        {fields?.map((contact, index) => (
          <fieldset key={index} className="grid gap-6 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">Контакт</legend>
            <FormField
              control={control}
              name={`contacts.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-baseline">
                    <FormLabel>Имя</FormLabel>
                    {index > 0 && (
                      <span
                        onClick={() => remove(index)}
                        className=" text-red-500 cursor-pointer hover:text-red-700 hover:underline text-xs"
                      >
                        Удалить
                      </span>
                    )}
                  </div>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Иванов Иван дир"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`contacts.${index}.phone`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Телефон</FormLabel>
                  <FormControl>
                    <InputPhoneMask
                      setValue={field.onChange}
                      value={field.value}
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`contacts.${index}.mail`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Почта</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="example@mail.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`contacts.${index}.comment`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Комментарий</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Буквально пару слов..."
                      className="min-h-[4rem]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>
        ))}
        <div className="">
          <Button
            onClick={() =>
              append({ mail: "", name: "", comment: "", phone: "" })
            }
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateContact;
