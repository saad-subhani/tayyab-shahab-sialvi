"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contact } from "@/content/site";
import { greet, waLink } from "@/lib/whatsapp";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  subject: z.string().min(1, "Choose a subject"),
  message: z.string().min(5, "Please write a short message"),
});

type Values = z.infer<typeof schema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { subject: contact.subjects[0] },
  });

  const onSubmit = (v: Values) => {
    const text = greet(`I am ${v.name}.\nSubject: ${v.subject}\n\n${v.message}`);
    window.open(waLink(text), "_blank", "noopener,noreferrer");
    reset({ name: "", subject: v.subject, message: "" });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border border-line p-8 md:p-12"
      noValidate
    >
      <div className="mb-10">
        <p className="font-display text-display-md">Send a message</p>
        <p className="mt-2 text-sm text-stone">
          Your message opens directly in WhatsApp. Nothing is stored on this website.
        </p>
      </div>

      <div className="space-y-8">
        <div className="space-y-2">
          <Label htmlFor="name">Your name</Label>
          <Input id="name" autoComplete="name" placeholder="Full name" {...register("name")} />
          {errors.name?.message && (
            <p role="alert" className="text-xs text-destructive">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <select
            id="subject"
            {...register("subject")}
            className="w-full appearance-none rounded-none border-0 border-b border-line bg-transparent py-3 text-base outline-none transition-colors focus-visible:border-gold"
          >
            {contact.subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.subject?.message && (
            <p role="alert" className="text-xs text-destructive">
              {errors.subject.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" rows={4} placeholder="How can I help?" {...register("message")} />
          {errors.message?.message && (
            <p role="alert" className="text-xs text-destructive">
              {errors.message.message}
            </p>
          )}
        </div>
      </div>

      <Button type="submit" className="mt-10 w-full sm:w-auto" disabled={isSubmitting}>
        Send via WhatsApp
      </Button>
    </form>
  );
}
