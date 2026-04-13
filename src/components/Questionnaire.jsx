import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { FileText, Globe, Palette, CalendarDays, DollarSign, Settings, CheckCircle2 } from "lucide-react";

const sections = [
  { id: "overview", title: "Project Overview", icon: Globe },
  { id: "dating", title: "Dating Game Website", icon: FileText },
  { id: "podcast", title: "Podcast Relationship Game", icon: FileText },
  { id: "design", title: "Design Preferences", icon: Palette },
  { id: "technical", title: "Technical Features", icon: Settings },
  { id: "timeline", title: "Timeline", icon: CalendarDays },
  { id: "budget", title: "Budget", icon: DollarSign },
  { id: "review", title: "Review", icon: CheckCircle2 },
];

const featureOptions = [
  "User profiles",
  "Matching system",
  "Swipe feature",
  "Questions/game rounds",
  "Chat/messaging",
  "Voting",
  "Leaderboard",
  "Timed games",
  "Multiplayer",
  "Payment integration",
];

const podcastFeatureOptions = [
  "Episode pages",
  "Game per episode",
  "User answers",
  "Scoring system",
  "Comments/community",
  "User accounts",
  "Leaderboard",
  "Admin upload dashboard",
];

const styleOptions = ["Modern", "Fun / playful", "Minimal", "Bold", "Dark theme", "Bright colors"];
const technicalOptions = [
  "User login",
  "Admin dashboard",
  "Save progress",
  "Email notifications",
  "Social login",
  "Database",
  "Analytics",
  "SEO basics",
];
const additionalServiceOptions = [
  "Hosting setup",
  "Domain purchase",
  "Ongoing maintenance",
  "Future mobile app",
  "SEO setup",
  "Analytics setup",
];

const initialData = {
  projectName: "",
  websiteCount: "",
  ideaSummary: "",
  exampleSites: "",
  branding: [],

  datingDescription: "",
  datingAccounts: "",
  datingFeatures: [],
  datingMonetization: "",
  datingDeviceFocus: "",
  datingPayments: "",

  podcastDescription: "",
  podcastHosting: "",
  podcastFeatures: [],
  podcastAdmin: "",

  stylePrefs: [],
  colorPrefs: "",
  complexity: "",
  animations: "",

  technicalFeatures: [],

  launchDate: "",
  deadline: "",
  priority: "",

  budgetRange: "",
  customBudget: "",

  additionalServices: [],
  extraNotes: "",
};

function MultiCheckbox({ options, values, onChange }) {
  const toggle = (option) => {
    if (values.includes(option)) {
      onChange(values.filter((v) => v !== option));
    } else {
      onChange([...values, option]);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {options.map((option) => (
        <label
          key={option}
          className="flex items-start gap-3 rounded-2xl border-2 border-black bg-white p-4 cursor-pointer hover:shadow-md transition"
        >
          <Checkbox checked={values.includes(option)} onCheckedChange={() => toggle(option)} />
          <span className="text-sm leading-5">{option}</span>
        </label>
      ))}
    </div>
  );
}

function Field({ label, children, hint }) {
  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <Label className="text-sm font-medium">{label}</Label>
        {hint ? <p className="text-sm text-muted-foreground">{hint}</p> : null}
      </div>
      {children}
    </div>
  );
}

function CreativeMessLogo() {
  return (
    <div className="relative w-28 h-28">
      <motion.div
        animate={{ rotate: [0, 2, -2, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full border-2 border-black scale-105"
      />
      <motion.div
        animate={{ rotate: [0, -3, 3, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full border-2 border-black"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-3 h-3 bg-black rounded-full" />
      </div>
    </div>
  );
}

function ScribbleArrow() {
  return (
    <motion.svg
      width="120"
      height="60"
      viewBox="0 0 120 60"
      className="absolute -top-6 right-6 opacity-70"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      <motion.path
        d="M5 40 Q 40 10, 80 30 T 115 20"
        fill="none"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <motion.path
        d="M105 15 L115 20 L105 25"
        fill="none"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}

export default function Questionnaire() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState(initialData);

  const progress = useMemo(() => ((step + 1) / sections.length) * 100, [step]);

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const next = () => setStep((s) => Math.min(s + 1, sections.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="min-h-screen bg-[#D7F36A] text-black p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Brand Header */}
        <div className="flex items-center gap-6">
          <CreativeMessLogo />
          <div>
            <h1 className="text-3xl font-bold">a creative mess</h1>
            <p className="text-xs uppercase tracking-wide">client intake app</p>
            <p className="text-sm">project discovery questionnaire</p>
          </div>
        </div>

        <div className="relative grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <ScribbleArrow />
          <Card className="h-fit rounded-3xl shadow-sm border-2 border-black bg-white">
            <CardHeader>
              <CardTitle className="text-xl">a creative mess</CardTitle>
              <CardDescription>
                a creative mess — project discovery
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <div className="space-y-2">
                {sections.map((section, index) => {
                  const Icon = section.icon;
                  const active = index === step;
                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => setStep(index)}
                      className={`flex w-full items-center gap-3 rounded-2xl border-2 border-black px-3 py-3 text-left transition ${
                        active ? "bg-black text-white" : "bg-white hover:bg-black hover:text-white"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <div>
                        <div className="text-sm font-medium">{section.title}</div>
                        <div className="text-xs opacity-70">Step {index + 1}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="rounded-3xl shadow-sm border-2 border-black bg-white">
              <CardHeader>
                <CardTitle>{sections[step].title}</CardTitle>
                <CardDescription>
                  messy ideas welcome — clarity comes later
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-8">
                <Field label="Project Name">
                  <Input value={form.projectName} onChange={(e) => update("projectName", e.target.value)} />
                </Field>

                <Field label="Briefly describe your idea">
                  <Textarea
                    value={form.ideaSummary}
                    onChange={(e) => update("ideaSummary", e.target.value)}
                    className="min-h-[140px]"
                  />
                </Field>

                <div className="flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm">Step {step + 1} of {sections.length}</div>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={back} disabled={step === 0}>
                      Back
                    </Button>
                    {step < sections.length - 1 ? (
                      <Button onClick={next}>Next</Button>
                    ) : (
                      <Button onClick={() => setSubmitted(true)}>Submit</Button>
                    )}
                  </div>
                </div>

                {submitted && (
                  <div className="rounded-2xl border-2 border-black p-4 bg-white">
                    Submitted. Time to turn chaos into a plan.
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
