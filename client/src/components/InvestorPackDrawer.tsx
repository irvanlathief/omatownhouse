import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";
import { trpc } from "@/lib/trpc";

const INITIAL_FORM = {
  name: "",
  email: "",
  whatsapp: "",
  country: "",
  budgetRange: "",
  purchaseTimeline: "",
  ownershipInterest: "",
  message: "",
};

export function InvestorPackDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const requestPack = trpc.investor.requestPack.useMutation({
    onSuccess: () => setSubmitted(true),
  });

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      requestPack.reset();
      setSubmitted(false);
    }
  }, [open]);

  const update = (key: keyof typeof form, value: string) => {
    setForm(current => ({ ...current, [key]: value }));
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    requestPack.mutate({
      name: form.name,
      email: form.email,
      whatsapp: form.whatsapp,
      country: form.country || undefined,
      budgetRange: form.budgetRange || undefined,
      purchaseTimeline: form.purchaseTimeline || undefined,
      ownershipInterest: form.ownershipInterest || undefined,
      message: form.message || undefined,
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close investor pack form"
            onClick={onClose}
            className="absolute inset-0 h-full w-full bg-black/55 backdrop-blur-sm"
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="investor-pack-title"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 right-0 flex w-full max-w-[560px] flex-col overflow-y-auto bg-white text-black"
          >
            <div className="sticky top-0 z-10 flex items-start justify-between gap-8 border-b border-black/10 bg-white/95 px-6 py-6 backdrop-blur-xl sm:px-9">
              <div>
                <p className="text-sm text-black/50">Investor pack</p>
                <h2
                  id="investor-pack-title"
                  className="mt-2 text-3xl font-medium tracking-[-0.04em]"
                >
                  Take the numbers with you.
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/15 transition-colors hover:bg-black hover:text-white"
                aria-label="Close form"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {submitted ? (
              <div className="flex flex-1 flex-col justify-between px-6 py-10 sm:px-9">
                <div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                    <Check className="h-5 w-5" />
                  </span>
                  <h3 className="mt-8 max-w-md font-editorial text-6xl leading-[0.9] tracking-[-0.045em]">
                    Your request is with us.
                  </h3>
                  <p className="mt-6 max-w-md text-base leading-relaxed text-black/60">
                    We&apos;ll send the current investor pack to {form.email}{" "}
                    and follow up over WhatsApp within 24 hours. It includes the
                    floor plans, pricing, payment structure and operating case.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-12 inline-flex w-fit items-center gap-5 rounded-full bg-black px-6 py-3.5 text-sm font-medium text-white"
                >
                  Continue exploring
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <form
                onSubmit={submit}
                className="flex flex-1 flex-col px-6 py-8 sm:px-9"
              >
                <p className="max-w-md text-sm leading-relaxed text-black/60">
                  Tell us enough to make the follow-up useful. The OMA team will
                  send the current pack and answer the questions that matter to
                  your situation.
                </p>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <Field label="Name" required>
                    <input
                      required
                      value={form.name}
                      onChange={event => update("name", event.target.value)}
                      placeholder="Your full name"
                      className="investor-field"
                    />
                  </Field>
                  <Field label="Email" required>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={event => update("email", event.target.value)}
                      placeholder="you@email.com"
                      className="investor-field"
                    />
                  </Field>
                  <Field label="WhatsApp" required>
                    <input
                      required
                      value={form.whatsapp}
                      onChange={event => update("whatsapp", event.target.value)}
                      placeholder="+1 555 123 4567"
                      className="investor-field"
                    />
                  </Field>
                  <Field label="Country">
                    <input
                      value={form.country}
                      onChange={event => update("country", event.target.value)}
                      placeholder="United States"
                      className="investor-field"
                    />
                  </Field>
                  <Field label="Budget">
                    <select
                      value={form.budgetRange}
                      onChange={event =>
                        update("budgetRange", event.target.value)
                      }
                      className="investor-field"
                    >
                      <option value="">Select a range</option>
                      <option value="USD 100k-150k">USD 100k-150k</option>
                      <option value="USD 150k-250k">USD 150k-250k</option>
                      <option value="USD 250k+">USD 250k+</option>
                    </select>
                  </Field>
                  <Field label="Purchase timeline">
                    <select
                      value={form.purchaseTimeline}
                      onChange={event =>
                        update("purchaseTimeline", event.target.value)
                      }
                      className="investor-field"
                    >
                      <option value="">Choose a timeframe</option>
                      <option value="Ready now">Ready now</option>
                      <option value="Within 3 months">Within 3 months</option>
                      <option value="3-6 months">3-6 months</option>
                      <option value="Exploring">Still exploring</option>
                    </select>
                  </Field>
                </div>

                <Field label="Ownership route" className="mt-5">
                  <select
                    value={form.ownershipInterest}
                    onChange={event =>
                      update("ownershipInterest", event.target.value)
                    }
                    className="investor-field"
                  >
                    <option value="">Not sure yet</option>
                    <option value="25-year leasehold">25-year leasehold</option>
                    <option value="40-year leasehold">40-year leasehold</option>
                    <option value="Freehold via PT PMA">
                      Freehold via PT PMA
                    </option>
                  </select>
                </Field>

                <Field label="Anything we should know?" className="mt-5">
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={event => update("message", event.target.value)}
                    placeholder="Personal use, rental income, timing, or a question for the team..."
                    className="investor-field resize-none"
                  />
                </Field>

                {requestPack.error && (
                  <p className="mt-5 rounded-[14px] bg-black px-4 py-3 text-sm text-white">
                    {requestPack.error.message ||
                      "We couldn't send that yet. Please try again."}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={requestPack.isPending}
                  className="mt-8 inline-flex w-full items-center justify-between rounded-full bg-black px-6 py-4 text-sm font-medium text-white transition-opacity disabled:opacity-50"
                >
                  <span>
                    {requestPack.isPending
                      ? "Sending request..."
                      : "Request investor pack"}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <p className="mt-4 text-xs leading-relaxed text-black/45">
                  By submitting, you agree that OMA may contact you about this
                  property. Your details are not shared with third parties.
                </p>
              </form>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  required = false,
  className = "",
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-sm font-medium">
        {label}
        {required ? " *" : ""}
      </span>
      {children}
    </label>
  );
}
