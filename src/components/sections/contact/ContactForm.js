"use client";

import { useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";

// Inlined at build time. Must be referenced exactly like this (no dynamic lookup).
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = "Please enter a valid email address, like name@example.com.";
  if (!values.message.trim()) errors.message = "Please write a message.";
  else if (values.message.trim().length < 10) errors.message = "Your message is a bit short — a few more words, please.";
  return errors;
}

const EMPTY = { name: "", email: "", message: "" };

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="text-label font-semibold tracking-label uppercase">
        {label} <span aria-hidden="true" className="text-pink-text">*</span>
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 flex items-start gap-1.5 text-sm text-pink-text">
          <AlertCircle size={16} aria-hidden="true" className="mt-0.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass = (hasError) =>
  cn(
    "mt-2 block w-full border-2 bg-bg px-4 py-3 text-base text-fg transition-colors placeholder:text-muted",
    hasError ? "border-pink-text" : "border-line hover:border-muted",
  );

/**
 * Contact form → Formspree (free plan), sent straight from the browser.
 * States: idle → sending → success | error. Client-side validation runs on
 * submit, then live as the visitor fixes fields.
 */
export default function ContactForm({ email }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false); // validate live after first try
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const formRef = useRef(null);

  if (!FORMSPREE_ID) {
    return (
      <div className="border-l-4 border-mint bg-tile p-6 sm:p-8">
        <p className="text-lg font-extrabold uppercase">The contact form is coming soon</p>
        <p className="mt-2 leading-relaxed text-muted">
          {email ? "Until then, the quickest way to reach me is by email." : "Until then, please use the links on this page."}
        </p>
        {email && (
          <div className="mt-5">
            <Button href={`mailto:${email}`}>Email me</Button>
          </div>
        )}
        {process.env.NODE_ENV === "development" && (
          <p className="mt-5 border-t border-line pt-4 text-sm text-muted">
            <strong>Owner note (only visible in dev):</strong> set <code>NEXT_PUBLIC_FORMSPREE_ID</code> in{" "}
            <code>.env.local</code> (and in Vercel) to turn this into the Formspree form.
          </p>
        )}
      </div>
    );
  }

  function update(field, value) {
    const next = { ...values, [field]: value };
    setValues(next);
    if (submitted) setErrors(validate(next));
    if (status === "error") setStatus("idle");
  }

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    const found = validate(values);
    setErrors(found);
    const firstInvalid = ["name", "email", "message"].find((f) => found[f]);
    if (firstInvalid) {
      formRef.current?.querySelector(`#contact-${firstInvalid}`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const data = new FormData(formRef.current);
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
      setStatus("success");
      setValues(EMPTY);
      setErrors({});
      setSubmitted(false);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="border-l-4 border-mint bg-tile p-6 sm:p-8">
        <p className="flex items-center gap-2 text-lg font-extrabold uppercase">
          <CheckCircle2 size={22} aria-hidden="true" className="text-mint-text" />
          Message sent
        </p>
        <p className="mt-2 leading-relaxed text-muted">Thanks for reaching out — I&apos;ll get back to you soon.</p>
        <div className="mt-5">
          <Button variant="link" onClick={() => setStatus("idle")}>
            Send another message
          </Button>
        </div>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-label="Contact form" className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="contact-name" label="Name" error={errors.name}>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputClass(errors.name)}
          />
        </Field>
        <Field id="contact-email" label="Email" error={errors.email}>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClass(errors.email)}
          />
        </Field>
      </div>
      <Field id="contact-message" label="Message" error={errors.message}>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          className={cn(inputClass(errors.message), "resize-y")}
        />
      </Field>

      {/* Spam trap for bots (Formspree ignores submissions that fill it) */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <input type="hidden" name="_subject" value="New message from your portfolio" />

      {status === "error" && (
        <div role="alert" className="flex items-start gap-3 border-l-4 border-pink bg-tile p-4">
          <AlertCircle size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-pink-text" />
          <p className="leading-relaxed">
            Sorry, your message couldn&apos;t be sent. Please try again
            {email ? (
              <>
                {" "}or email me at{" "}
                <a href={`mailto:${email}`} className="font-semibold underline underline-offset-4">
                  {email}
                </a>
              </>
            ) : null}
            .
          </p>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={sending} aria-disabled={sending}>
          {sending ? (
            <>
              <Loader2 size={16} aria-hidden="true" className="motion-safe:animate-spin" /> Sending…
            </>
          ) : (
            <>
              Send message <Send size={16} aria-hidden="true" />
            </>
          )}
        </Button>
        <p className="text-sm text-muted">
          <span aria-hidden="true" className="text-pink-text">*</span> All fields are required.
        </p>
      </div>
      <p className="sr-only" aria-live="polite">
        {sending ? "Sending your message…" : ""}
      </p>
    </form>
  );
}
