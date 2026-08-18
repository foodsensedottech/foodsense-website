"use client";

import * as React from "react";
import { analytics } from "@/lib/analytics/tracking";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/form/input";
import type { FranchiseeLocale } from "@/lib/franchisees/copy";
import { getFranchiseeCopy } from "@/lib/franchisees/copy";
import type {
  AssessmentAnswers,
  MaturityBand,
} from "@/lib/franchisees/score";

type StepKey = keyof AssessmentAnswers;
const STEPS: StepKey[] = [
  "locations",
  "region",
  "pos",
  "kds",
  "delivery",
  "payments",
];

interface AssessmentToolProps {
  locale: FranchiseeLocale;
}

interface ScoreResult {
  score: number;
  band: MaturityBand;
  captured: boolean;
}

export function AssessmentTool({ locale }: AssessmentToolProps) {
  const copy = getFranchiseeCopy(locale);
  const [stepIndex, setStepIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<Partial<AssessmentAnswers>>({});
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [result, setResult] = React.useState<ScoreResult | null>(null);
  const [captureError, setCaptureError] = React.useState(false);

  const currentStep = STEPS[stepIndex];
  const isCapture = stepIndex === STEPS.length;
  const question = currentStep ? copy.questions[currentStep] : null;
  const progress = result
    ? 100
    : Math.round(((stepIndex + (isCapture ? 1 : 0)) / (STEPS.length + 1)) * 100);

  const selectOption = (value: string) => {
    if (!currentStep) return;
    const nextAnswers = { ...answers, [currentStep]: value };
    setAnswers(nextAnswers);
    analytics.trackEvent("assessment_step", {
      event_category: "franchisee",
      event_label: currentStep,
    });
    setStepIndex((index) => index + 1);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (STEPS.some((key) => !answers[key])) {
      return;
    }

    setSubmitting(true);
    setCaptureError(false);

    try {
      const response = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          locale,
          answers,
        }),
      });
      const payload = await response.json();
      if (!response.ok || typeof payload.score !== "number") {
        throw new Error("Assessment failed");
      }
      setResult({
        score: payload.score,
        band: payload.band,
        captured: Boolean(payload.captured),
      });
      analytics.trackEvent("assessment_complete", {
        event_category: "franchisee",
        value: payload.score,
      });
      if (!payload.captured) {
        setCaptureError(true);
      }
    } catch (error) {
      console.error(error);
      setCaptureError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const restart = () => {
    setStepIndex(0);
    setAnswers({});
    setName("");
    setEmail("");
    setCompany("");
    setResult(null);
    setCaptureError(false);
  };

  return (
    <div
      id="assessment"
      className="rounded-2xl border border-border/60 bg-card p-6 md:p-8 shadow-sm"
    >
      <div className="mb-6">
        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-[#1e3a5f] dark:bg-yellow-400 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {result ? (
        <div className="space-y-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#1e3a5f] dark:text-yellow-400">
            {copy.results.heading}
          </p>
          <p className="text-6xl font-bold text-[#1e3a5f] dark:text-white">
            {result.score}
          </p>
          <p className="text-lg text-foreground/80">
            {copy.results.bands[result.band]}
          </p>
          {captureError ? (
            <p className="text-sm text-red-600">{copy.capture.error}</p>
          ) : null}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg">
              <a href="/contact">{copy.results.nextCta}</a>
            </Button>
            <Button variant="outline" onClick={restart}>
              {copy.results.restart}
            </Button>
          </div>
        </div>
      ) : isCapture ? (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <h3 className="text-2xl font-semibold">{copy.capture.heading}</h3>
          <p className="text-foreground/70">{copy.capture.intro}</p>
          <div className="space-y-3">
            <label className="block text-sm font-medium">
              {copy.capture.name}
              <Input
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-1"
              />
            </label>
            <label className="block text-sm font-medium">
              {copy.capture.email}
              <Input
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-1"
              />
            </label>
            <label className="block text-sm font-medium">
              {copy.capture.company}
              <Input
                required
                value={company}
                onChange={(event) => setCompany(event.target.value)}
                className="mt-1"
              />
            </label>
          </div>
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => setStepIndex(STEPS.length - 1)}>
              {copy.back}
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? copy.capture.submitting : copy.capture.submit}
            </Button>
          </div>
        </form>
      ) : question ? (
        <div className="space-y-5">
          <h3 className="text-2xl font-semibold">{question.label}</h3>
          <div className="grid gap-3">
            {question.options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => selectOption(option.value)}
                className="text-left rounded-lg border border-border px-4 py-3 hover:border-[#1e3a5f] hover:bg-[#1e3a5f]/5 dark:hover:border-yellow-400 dark:hover:bg-yellow-400/10 transition-colors"
              >
                {option.label}
              </button>
            ))}
          </div>
          {stepIndex > 0 ? (
            <Button type="button" variant="ghost" onClick={() => setStepIndex(stepIndex - 1)}>
              {copy.back}
            </Button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
