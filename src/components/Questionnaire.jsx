import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { FileText, Globe, Palette, CalendarDays, DollarSign, Settings, CheckCircle2, HelpCircle } from "lucide-react";

const sections = [
  { id: "overview", title: "Project Overview", icon: Globe },
  { id: "dating", title: "Dating Game Website", icon: FileText },
  { id: "podcast", title: "Podcast Relationship Game", icon: FileText },
  { id: "design", title: "Design Preferences", icon: Palette },
  { id: "technical", title: "Technical Questions", icon: Settings },
  { id: "timeline", title: "Timeline", icon: CalendarDays },
  { id: "budget", title: "Budget Range", icon: DollarSign },
  { id: "final", title: "Final Questions", icon: HelpCircle },
  { id: "review", title: "Review & Submit", icon: CheckCircle2 },
];

// Required fields per section (checkboxes are optional since they default to false)
const requiredFields = {
  overview: ["separateOrConnected", "goalDating", "goalPodcast", "exampleSites", "hasBranding", "brandingHelp"],
  dating: ["datingHowItWorks", "datingAccounts", "datingProfiles", "datingInteraction", "datingPurpose", "datingDeviceFocus", "datingPayments"],
  podcast: ["podcastHosting", "podcastHowItWorks", "podcastParticipateWhileListening", "podcastSubmitAnswers", "podcastScoringResults", "podcastAccounts", "podcastAdminUpload"],
  design: ["stylePreference", "colorPreferences", "simpleOrFeatureRich", "animations"],
  technical: ["userLogins", "adminPanel", "saveProgress", "emailNotifications", "socialLogin", "scalability"],
  timeline: ["launchDate", "hardDeadline", "prioritySite"],
  budget: ["budgetRange"],
  final: ["hostingSetup", "domainPurchase", "ongoingMaintenance", "futureApp"],
  review: [],
};

const initialData = {
  // Overview
  separateOrConnected: "",
  goalDating: "",
  goalPodcast: "",
  exampleSites: "",
  hasBranding: "",
  brandingHelp: "",

  // Dating Game
  datingHowItWorks: "",
  datingAccounts: "",
  datingProfiles: "",
  datingInteraction: "",
  datingPurpose: "",
  datingMatchingSystem: false,
  datingSwipeFeature: false,
  datingGameRounds: false,
  datingLeaderboard: false,
  datingDeviceFocus: "",
  datingPayments: "",

  // Podcast
  podcastHosting: "",
  podcastHowItWorks: "",
  podcastParticipateWhileListening: "",
  podcastSubmitAnswers: "",
  podcastScoringResults: "",
  podcastAccounts: "",
  podcastEpisodePages: false,
  podcastGamePerEpisode: false,
  podcastCommunity: false,
  podcastAdminUpload: "",

  // Design
  stylePreference: "",
  styleOther: "",
  colorPreferences: "",
  simpleOrFeatureRich: "",
  animations: "",

  // Technical
  userLogins: "",
  adminPanel: "",
  saveProgress: "",
  emailNotifications: "",
  socialLogin: "",
  scalability: "",

  // Timeline
  launchDate: "",
  hardDeadline: "",
  prioritySite: "",

  // Budget
  budgetRange: "",
  customBudget: "",

  // Final
  hostingSetup: "",
  domainPurchase: "",
  ongoingMaintenance: "",
  futureApp: "",
  anythingElse: "",
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
        {hint && <p className="text-sm text-muted-foreground">{hint}</p>}
      </div>
      {children}
    </div>
  );
}

function RadioField({ label, hint, value, onChange, options }) {
  return (
    <Field label={label} hint={hint}>
      <RadioGroup value={value} onValueChange={onChange} className="space-y-2">
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex items-center gap-3 rounded-2xl border-2 border-black bg-white p-4 cursor-pointer hover:shadow-md transition"
          >
            <RadioGroupItem value={opt.value} />
            <span className="text-sm">{opt.label}</span>
          </label>
        ))}
      </RadioGroup>
    </Field>
  );
}

function CheckboxField({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-3 rounded-2xl border-2 border-black bg-white p-4 cursor-pointer hover:shadow-md transition">
      <Checkbox checked={checked} onCheckedChange={onChange} />
      <span className="text-sm">{label}</span>
    </label>
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

const fieldLabels = {
  separateOrConnected: "Separate or Connected?",
  goalDating: "Main Goal — Dating Game",
  goalPodcast: "Main Goal — Podcast Game",
  exampleSites: "Example Sites",
  hasBranding: "Has Branding?",
  brandingHelp: "Branding Help Needed?",
  datingHowItWorks: "How the Dating Game Works",
  datingAccounts: "User Accounts",
  datingProfiles: "User Profiles",
  datingInteraction: "User Interaction",
  datingPurpose: "Purpose",
  datingMatchingSystem: "Matching System",
  datingSwipeFeature: "Swipe Feature",
  datingGameRounds: "Questions / Game Rounds",
  datingLeaderboard: "Leaderboard",
  datingDeviceFocus: "Device Focus",
  datingPayments: "Payment Features",
  podcastHosting: "Podcast Hosting",
  podcastHowItWorks: "How the Game Works",
  podcastParticipateWhileListening: "Participate While Listening",
  podcastSubmitAnswers: "Submit Answers",
  podcastScoringResults: "Scoring / Results",
  podcastAccounts: "User Accounts",
  podcastEpisodePages: "Episode Pages",
  podcastGamePerEpisode: "Game Per Episode",
  podcastCommunity: "Community Interaction",
  podcastAdminUpload: "Admin Upload Access",
  stylePreference: "Style Preference",
  styleOther: "Other Style",
  colorPreferences: "Color Preferences",
  simpleOrFeatureRich: "Simple or Feature-Rich",
  animations: "Animations / Interactive Elements",
  userLogins: "User Logins",
  adminPanel: "Admin / Dashboard Panel",
  saveProgress: "Save Progress",
  emailNotifications: "Email Notifications",
  socialLogin: "Social Login",
  scalability: "Scale to Many Users",
  launchDate: "Ideal Launch Date",
  hardDeadline: "Hard Deadline",
  prioritySite: "Priority Site",
  budgetRange: "Budget Range",
  customBudget: "Custom Budget",
  hostingSetup: "Hosting Setup",
  domainPurchase: "Domain Purchase",
  ongoingMaintenance: "Ongoing Maintenance",
  futureApp: "Future App Expansion",
  anythingElse: "Additional Notes",
};

function ReviewSection({ form }) {
  const sectionGroups = [
    {
      title: "Project Overview",
      keys: ["separateOrConnected", "goalDating", "goalPodcast", "exampleSites", "hasBranding", "brandingHelp"],
    },
    {
      title: "Dating Game Website",
      keys: ["datingHowItWorks", "datingAccounts", "datingProfiles", "datingInteraction", "datingPurpose", "datingMatchingSystem", "datingSwipeFeature", "datingGameRounds", "datingLeaderboard", "datingDeviceFocus", "datingPayments"],
    },
    {
      title: "Podcast Relationship Game",
      keys: ["podcastHosting", "podcastHowItWorks", "podcastParticipateWhileListening", "podcastSubmitAnswers", "podcastScoringResults", "podcastAccounts", "podcastEpisodePages", "podcastGamePerEpisode", "podcastCommunity", "podcastAdminUpload"],
    },
    {
      title: "Design Preferences",
      keys: ["stylePreference", "styleOther", "colorPreferences", "simpleOrFeatureRich", "animations"],
    },
    {
      title: "Technical Questions",
      keys: ["userLogins", "adminPanel", "saveProgress", "emailNotifications", "socialLogin", "scalability"],
    },
    {
      title: "Timeline",
      keys: ["launchDate", "hardDeadline", "prioritySite"],
    },
    {
      title: "Budget",
      keys: ["budgetRange", "customBudget"],
    },
    {
      title: "Final Questions",
      keys: ["hostingSetup", "domainPurchase", "ongoingMaintenance", "futureApp", "anythingElse"],
    },
  ];

  return (
    <div className="space-y-8">
      {sectionGroups.map((group) => {
        const filledKeys = group.keys.filter((k) => {
          const v = form[k];
          return typeof v === "boolean" ? v : !!v;
        });
        if (filledKeys.length === 0) return null;
        return (
          <div key={group.title} className="space-y-4">
            <h3 className="font-semibold text-base">{group.title}</h3>
            <div className="space-y-3">
              {filledKeys.map((key) => {
                const value = form[key];
                return (
                  <div key={key} className="flex flex-col gap-0.5">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      {fieldLabels[key] || key}
                    </span>
                    {typeof value === "boolean" ? (
                      <Badge variant="secondary" className="w-fit">Yes</Badge>
                    ) : (
                      <p className="text-sm whitespace-pre-wrap">{value}</p>
                    )}
                  </div>
                );
              })}
            </div>
            <Separator />
          </div>
        );
      })}
    </div>
  );
}

export default function Questionnaire() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState(initialData);

  const [attempted, setAttempted] = useState({});

  const progress = useMemo(() => ((step + 1) / sections.length) * 100, [step]);

  const isStepComplete = (sectionId) => {
    const fields = requiredFields[sectionId] || [];
    return fields.every((key) => {
      const val = form[key];
      if (typeof val === "boolean") return true;
      if (typeof val === "string") return val.trim() !== "";
      return !!val;
    });
  };

  // Extra validation: if budget is "custom", customBudget is also required
  const isCurrentStepValid = useMemo(() => {
    const sectionId = sections[step].id;
    if (!isStepComplete(sectionId)) return false;
    if (sectionId === "budget" && form.budgetRange === "custom" && !form.customBudget.trim()) return false;
    if (sectionId === "design" && form.stylePreference === "other" && !form.styleOther.trim()) return false;
    return true;
  }, [step, form]);

  const getMissingFields = (sectionId) => {
    const fields = requiredFields[sectionId] || [];
    const missing = fields.filter((key) => {
      const val = form[key];
      if (typeof val === "boolean") return false;
      if (typeof val === "string") return val.trim() === "";
      return !val;
    });
    if (sectionId === "budget" && form.budgetRange === "custom" && !form.customBudget.trim()) {
      missing.push("customBudget");
    }
    if (sectionId === "design" && form.stylePreference === "other" && !form.styleOther.trim()) {
      missing.push("styleOther");
    }
    return missing;
  };

  // Highest step the user has fully completed (allows going back but not skipping ahead)
  const highestReachableStep = useMemo(() => {
    for (let i = 0; i < sections.length; i++) {
      if (!isStepComplete(sections[i].id)) return i;
      // check conditional fields too
      if (sections[i].id === "budget" && form.budgetRange === "custom" && !form.customBudget.trim()) return i;
      if (sections[i].id === "design" && form.stylePreference === "other" && !form.styleOther.trim()) return i;
    }
    return sections.length - 1;
  }, [form]);

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/.netlify/functions/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const next = () => {
    setAttempted((prev) => ({ ...prev, [sections[step].id]: true }));
    if (!isCurrentStepValid) return;
    setStep((s) => Math.min(s + 1, sections.length - 1));
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));
  const goToStep = (index) => {
    // Can always go back, but can only go forward if all prior steps are complete
    if (index <= step || index <= highestReachableStep) {
      setStep(index);
    } else {
      // Mark current step as attempted to show validation
      setAttempted((prev) => ({ ...prev, [sections[step].id]: true }));
    }
  };

  const yesNoOptions = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];

  function renderStepContent() {
    switch (sections[step].id) {
      case "overview":
        return (
          <>
            <RadioField
              label="Are these two completely separate websites or should they connect together?"
              value={form.separateOrConnected}
              onChange={(v) => update("separateOrConnected", v)}
              options={[
                { value: "separate", label: "Completely separate websites" },
                { value: "connected", label: "They should connect together" },
                { value: "unsure", label: "Not sure yet" },
              ]}
            />
            <Field label="What is the main goal of each site?">
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Dating Game:</Label>
                  <Textarea
                    value={form.goalDating}
                    onChange={(e) => update("goalDating", e.target.value)}
                    placeholder="What should the dating game achieve?"
                    className="min-h-[80px]"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Podcast Game:</Label>
                  <Textarea
                    value={form.goalPodcast}
                    onChange={(e) => update("goalPodcast", e.target.value)}
                    placeholder="What should the podcast game achieve?"
                    className="min-h-[80px]"
                  />
                </div>
              </div>
            </Field>
            <Field label="Do you have examples of websites you like?" hint="Links help a lot">
              <Textarea
                value={form.exampleSites}
                onChange={(e) => update("exampleSites", e.target.value)}
                placeholder="Paste any links or describe what you like about them"
                className="min-h-[80px]"
              />
            </Field>
            <RadioField
              label="Do you already have branding? (logo, colors, name, etc.)"
              value={form.hasBranding}
              onChange={(v) => update("hasBranding", v)}
              options={[
                { value: "yes", label: "Yes, I have branding ready" },
                { value: "partial", label: "Some pieces (name, but no logo, etc.)" },
                { value: "no", label: "No, starting from scratch" },
              ]}
            />
            <RadioField
              label="Do you need help with branding or just the website?"
              value={form.brandingHelp}
              onChange={(v) => update("brandingHelp", v)}
              options={[
                { value: "just-website", label: "Just the website" },
                { value: "branding-too", label: "Branding + website" },
                { value: "unsure", label: "Not sure yet" },
              ]}
            />
          </>
        );

      case "dating":
        return (
          <>
            <Field label="How does the dating game work?" hint="Brief explanation">
              <Textarea
                value={form.datingHowItWorks}
                onChange={(e) => update("datingHowItWorks", e.target.value)}
                placeholder="Describe the concept and flow"
                className="min-h-[100px]"
              />
            </Field>
            <RadioField
              label="Will users need to create accounts?"
              value={form.datingAccounts}
              onChange={(v) => update("datingAccounts", v)}
              options={yesNoOptions}
            />
            <RadioField
              label="Will there be profiles for users?"
              value={form.datingProfiles}
              onChange={(v) => update("datingProfiles", v)}
              options={yesNoOptions}
            />
            <Field label="Will users interact with each other?" hint="Chat, voting, matching, etc.">
              <Textarea
                value={form.datingInteraction}
                onChange={(e) => update("datingInteraction", e.target.value)}
                placeholder="Describe how users interact"
                className="min-h-[80px]"
              />
            </Field>
            <RadioField
              label="Is this:"
              value={form.datingPurpose}
              onChange={(v) => update("datingPurpose", v)}
              options={[
                { value: "fun", label: "Just for fun" },
                { value: "competitive", label: "Competitive" },
                { value: "paid", label: "Paid to play" },
              ]}
            />
            <Field label="Will there be:">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <CheckboxField
                  label="Matching system"
                  checked={form.datingMatchingSystem}
                  onChange={(v) => update("datingMatchingSystem", v)}
                />
                <CheckboxField
                  label="Swipe feature"
                  checked={form.datingSwipeFeature}
                  onChange={(v) => update("datingSwipeFeature", v)}
                />
                <CheckboxField
                  label="Questions / game rounds"
                  checked={form.datingGameRounds}
                  onChange={(v) => update("datingGameRounds", v)}
                />
                <CheckboxField
                  label="Leaderboard"
                  checked={form.datingLeaderboard}
                  onChange={(v) => update("datingLeaderboard", v)}
                />
              </div>
            </Field>
            <RadioField
              label="Mobile-first or desktop focus? (or both)"
              value={form.datingDeviceFocus}
              onChange={(v) => update("datingDeviceFocus", v)}
              options={[
                { value: "mobile", label: "Mobile-first" },
                { value: "desktop", label: "Desktop focus" },
                { value: "both", label: "Both" },
              ]}
            />
            <Field label="Any payment features?" hint="Subscriptions, entry fees, etc.">
              <Textarea
                value={form.datingPayments}
                onChange={(e) => update("datingPayments", e.target.value)}
                placeholder="Describe any payment or monetization plans"
                className="min-h-[80px]"
              />
            </Field>
          </>
        );

      case "podcast":
        return (
          <>
            <RadioField
              label="Will the podcast be:"
              value={form.podcastHosting}
              onChange={(v) => update("podcastHosting", v)}
              options={[
                { value: "hosted", label: "Hosted on the site" },
                { value: "embedded", label: "Embedded from Spotify / YouTube" },
                { value: "both", label: "Both" },
              ]}
            />
            <Field label="How does the relationship game work?">
              <Textarea
                value={form.podcastHowItWorks}
                onChange={(e) => update("podcastHowItWorks", e.target.value)}
                placeholder="Describe the game concept"
                className="min-h-[100px]"
              />
            </Field>
            <RadioField
              label="Will users participate while listening?"
              value={form.podcastParticipateWhileListening}
              onChange={(v) => update("podcastParticipateWhileListening", v)}
              options={yesNoOptions}
            />
            <RadioField
              label="Will users submit answers?"
              value={form.podcastSubmitAnswers}
              onChange={(v) => update("podcastSubmitAnswers", v)}
              options={yesNoOptions}
            />
            <RadioField
              label="Will there be scoring or results?"
              value={form.podcastScoringResults}
              onChange={(v) => update("podcastScoringResults", v)}
              options={yesNoOptions}
            />
            <RadioField
              label="Will users need accounts?"
              value={form.podcastAccounts}
              onChange={(v) => update("podcastAccounts", v)}
              options={yesNoOptions}
            />
            <Field label="Do you want:">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <CheckboxField
                  label="Episode pages"
                  checked={form.podcastEpisodePages}
                  onChange={(v) => update("podcastEpisodePages", v)}
                />
                <CheckboxField
                  label="Game per episode"
                  checked={form.podcastGamePerEpisode}
                  onChange={(v) => update("podcastGamePerEpisode", v)}
                />
                <CheckboxField
                  label="Community interaction"
                  checked={form.podcastCommunity}
                  onChange={(v) => update("podcastCommunity", v)}
                />
              </div>
            </Field>
            <RadioField
              label="Will you need admin access to upload new episodes?"
              value={form.podcastAdminUpload}
              onChange={(v) => update("podcastAdminUpload", v)}
              options={yesNoOptions}
            />
          </>
        );

      case "design":
        return (
          <>
            <RadioField
              label="Style preference:"
              value={form.stylePreference}
              onChange={(v) => update("stylePreference", v)}
              options={[
                { value: "modern", label: "Modern" },
                { value: "fun", label: "Fun / playful" },
                { value: "minimal", label: "Minimal" },
                { value: "bold", label: "Bold" },
                { value: "other", label: "Other" },
              ]}
            />
            {form.stylePreference === "other" && (
              <Field label="Describe your style:">
                <Input
                  value={form.styleOther}
                  onChange={(e) => update("styleOther", e.target.value)}
                  placeholder="What vibe are you going for?"
                />
              </Field>
            )}
            <Field label="Any color preferences?">
              <Input
                value={form.colorPreferences}
                onChange={(e) => update("colorPreferences", e.target.value)}
                placeholder="e.g., dark tones, bright and bold, earth tones..."
              />
            </Field>
            <RadioField
              label="Simple or feature-rich?"
              value={form.simpleOrFeatureRich}
              onChange={(v) => update("simpleOrFeatureRich", v)}
              options={[
                { value: "simple", label: "Simple and clean" },
                { value: "feature-rich", label: "Feature-rich and interactive" },
                { value: "in-between", label: "Somewhere in between" },
              ]}
            />
            <RadioField
              label="Do you need animations or interactive elements?"
              value={form.animations}
              onChange={(v) => update("animations", v)}
              options={[
                { value: "yes", label: "Yes, lots of movement and interaction" },
                { value: "some", label: "Some subtle animations" },
                { value: "no", label: "No, keep it simple" },
              ]}
            />
          </>
        );

      case "technical":
        return (
          <>
            <RadioField
              label="Do you need user logins?"
              value={form.userLogins}
              onChange={(v) => update("userLogins", v)}
              options={yesNoOptions}
            />
            <RadioField
              label="Do you need a dashboard / admin panel?"
              value={form.adminPanel}
              onChange={(v) => update("adminPanel", v)}
              options={yesNoOptions}
            />
            <RadioField
              label="Will users save progress?"
              value={form.saveProgress}
              onChange={(v) => update("saveProgress", v)}
              options={yesNoOptions}
            />
            <RadioField
              label="Email notifications needed?"
              value={form.emailNotifications}
              onChange={(v) => update("emailNotifications", v)}
              options={yesNoOptions}
            />
            <RadioField
              label="Social login?" hint="Google, Apple, etc."
              value={form.socialLogin}
              onChange={(v) => update("socialLogin", v)}
              options={yesNoOptions}
            />
            <RadioField
              label="Will this need to scale to many users?"
              value={form.scalability}
              onChange={(v) => update("scalability", v)}
              options={[
                { value: "yes", label: "Yes, expecting high traffic" },
                { value: "eventually", label: "Eventually, but starting small" },
                { value: "no", label: "No, small audience" },
              ]}
            />
          </>
        );

      case "timeline":
        return (
          <>
            <Field label="Ideal launch date?">
              <Input
                type="date"
                value={form.launchDate}
                onChange={(e) => update("launchDate", e.target.value)}
              />
            </Field>
            <RadioField
              label="Is there a hard deadline?"
              value={form.hardDeadline}
              onChange={(v) => update("hardDeadline", v)}
              options={[
                { value: "yes", label: "Yes, it's firm" },
                { value: "flexible", label: "Flexible" },
                { value: "no", label: "No deadline" },
              ]}
            />
            <RadioField
              label="Which site is priority?"
              value={form.prioritySite}
              onChange={(v) => update("prioritySite", v)}
              options={[
                { value: "dating", label: "Dating Game" },
                { value: "podcast", label: "Podcast Game" },
                { value: "both", label: "Both equally" },
              ]}
            />
          </>
        );

      case "budget":
        return (
          <>
            <p className="text-sm text-muted-foreground">This helps me recommend the right solution.</p>
            <RadioField
              label="What budget range are you comfortable with?"
              value={form.budgetRange}
              onChange={(v) => update("budgetRange", v)}
              options={[
                { value: "500-1000", label: "$500 - $1,000 (basic MVP)" },
                { value: "1000-3000", label: "$1,000 - $3,000 (custom features)" },
                { value: "3000-6000", label: "$3,000 - $6,000 (advanced interactive)" },
                { value: "6000+", label: "$6,000+ (full platform build)" },
                { value: "custom", label: "Other / my own range" },
              ]}
            />
            {form.budgetRange === "custom" && (
              <Field label="Your budget range:">
                <Input
                  value={form.customBudget}
                  onChange={(e) => update("customBudget", e.target.value)}
                  placeholder="e.g., $2,500 - $4,000"
                />
              </Field>
            )}
          </>
        );

      case "final":
        return (
          <>
            <RadioField
              label="Do you need hosting setup?"
              value={form.hostingSetup}
              onChange={(v) => update("hostingSetup", v)}
              options={yesNoOptions}
            />
            <RadioField
              label="Do you need domain purchase?"
              value={form.domainPurchase}
              onChange={(v) => update("domainPurchase", v)}
              options={yesNoOptions}
            />
            <RadioField
              label="Do you need ongoing maintenance?"
              value={form.ongoingMaintenance}
              onChange={(v) => update("ongoingMaintenance", v)}
              options={yesNoOptions}
            />
            <RadioField
              label="Will this expand into an app later?"
              value={form.futureApp}
              onChange={(v) => update("futureApp", v)}
              options={[
                { value: "yes", label: "Yes" },
                { value: "maybe", label: "Maybe" },
                { value: "no", label: "No" },
              ]}
            />
            <Field label="Anything else you'd like included?">
              <Textarea
                value={form.anythingElse}
                onChange={(e) => update("anythingElse", e.target.value)}
                placeholder="Any other ideas, features, or notes..."
                className="min-h-[120px]"
              />
            </Field>
          </>
        );

      case "review":
        return (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              Review your answers below. Click any section in the sidebar to go back and edit.
            </p>
            <ReviewSection form={form} />
          </>
        );

      default:
        return null;
    }
  }

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
                  const completed = index < highestReachableStep || (index === highestReachableStep && isStepComplete(section.id));
                  const locked = index > highestReachableStep;
                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => goToStep(index)}
                      className={`flex w-full items-center gap-3 rounded-2xl border-2 px-3 py-3 text-left transition ${
                        active
                          ? "bg-black text-white border-black"
                          : locked
                          ? "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
                          : "bg-white hover:bg-black hover:text-white border-black"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <div className="flex-1">
                        <div className="text-sm font-medium">{section.title}</div>
                        <div className="text-xs opacity-70">Step {index + 1}</div>
                      </div>
                      {completed && !active && (
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                      )}
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
                {renderStepContent()}

                {attempted[sections[step].id] && !isCurrentStepValid && (
                  <div className="rounded-2xl border-2 border-amber-400 bg-amber-50 p-4 text-amber-800 text-sm">
                    Please answer all questions before continuing.
                  </div>
                )}

                <div className="flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm">Step {step + 1} of {sections.length}</div>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={back} disabled={step === 0}>
                      Back
                    </Button>
                    {step < sections.length - 1 ? (
                      <Button onClick={next}>Next</Button>
                    ) : (
                      <Button onClick={handleSubmit} disabled={submitting}>
                        {submitting ? "Submitting..." : "Submit"}
                      </Button>
                    )}
                  </div>
                </div>

                {error && (
                  <div className="rounded-2xl border-2 border-red-500 p-4 bg-red-50 text-red-700">
                    {error}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <Dialog open={submitted} onOpenChange={setSubmitted}>
        <DialogContent>
          <DialogHeader className="items-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#D7F36A] mb-2">
              <CheckCircle2 className="h-8 w-8 text-black" />
            </div>
            <DialogTitle className="text-2xl text-center">You're all set!</DialogTitle>
            <DialogDescription className="text-center text-base pt-2">
              Your questionnaire has been submitted successfully. We'll review your answers and get back to you soon.
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-2xl bg-gray-50 border-2 border-gray-200 p-4 text-center text-sm">
            Time to turn chaos into a plan.
          </div>
          <DialogFooter className="sm:justify-center pt-2">
            <DialogClose asChild>
              <Button
                className="w-full sm:w-auto"
                onClick={() => {
                  setForm(initialData);
                  setStep(0);
                  setSubmitted(false);
                  setAttempted({});
                }}
              >
                Done
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
