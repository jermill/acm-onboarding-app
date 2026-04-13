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
import { FileText, Globe, Palette, CalendarDays, DollarSign, Settings, CheckCircle2, HelpCircle, User, ChevronDown, ChevronUp, Layers, Package } from "lucide-react";

const sections = [
  { id: "client", title: "Client Info", icon: User },
  { id: "overview", title: "Project Overview", icon: Globe },
  { id: "details", title: "Project Details", icon: FileText },
  { id: "features", title: "Features & Functionality", icon: Layers },
  { id: "design", title: "Design Preferences", icon: Palette },
  { id: "technical", title: "Technical Requirements", icon: Settings },
  { id: "content", title: "Content & Assets", icon: Package },
  { id: "timeline", title: "Timeline", icon: CalendarDays },
  { id: "budget", title: "Budget Range", icon: DollarSign },
  { id: "final", title: "Final Questions", icon: HelpCircle },
  { id: "review", title: "Review & Submit", icon: CheckCircle2 },
];

const requiredFields = {
  client: ["firstName", "lastName", "contactNumber", "email"],
  overview: ["projectType", "projectGoal", "targetAudience", "hasBranding", "brandingHelp"],
  details: ["projectDescription", "keyPages", "userInteraction"],
  features: ["userAccounts", "deviceFocus"],
  design: ["stylePreference", "colorPreferences", "simpleOrFeatureRich", "animations"],
  technical: ["userLogins", "adminPanel", "emailNotifications", "socialLogin", "scalability"],
  content: ["hasContent", "needsCopywriting"],
  timeline: ["launchDate", "hardDeadline"],
  budget: ["budgetRange"],
  final: ["hostingSetup", "domainPurchase", "ongoingMaintenance", "futureApp"],
  review: [],
};

const initialData = {
  // Client Info
  firstName: "",
  lastName: "",
  contactNumber: "",
  email: "",
  currentWebsite: "",
  companyName: "",

  // Project Overview
  projectType: "",
  projectTypeOther: "",
  projectGoal: "",
  targetAudience: "",
  exampleSites: "",
  hasBranding: "",
  brandingHelp: "",

  // Project Details
  projectDescription: "",
  keyPages: "",
  userInteraction: "",
  competitorSites: "",

  // Features & Functionality
  userAccounts: "",
  ecommerce: false,
  bookingScheduling: false,
  contactForms: false,
  searchFiltering: false,
  mapsLocation: false,
  socialMediaIntegration: false,
  blogNews: false,
  gallery: false,
  videoAudio: false,
  multiLanguage: false,
  chatMessaging: false,
  reviewsTestimonials: false,
  memberArea: false,
  paymentProcessing: false,
  deviceFocus: "",
  additionalFeatures: "",

  // Design Preferences
  stylePreference: "",
  styleOther: "",
  colorPreferences: "",
  simpleOrFeatureRich: "",
  animations: "",
  designInspiration: "",

  // Technical Requirements
  userLogins: "",
  adminPanel: "",
  emailNotifications: "",
  socialLogin: "",
  scalability: "",
  thirdPartyIntegrations: "",

  // Content & Assets
  hasContent: "",
  needsCopywriting: "",
  hasPhotos: "",
  needsStockPhotos: "",
  hasSEOPlan: "",

  // Timeline
  launchDate: "",
  hardDeadline: "",
  phasedLaunch: "",

  // Budget
  budgetRange: "",
  customBudget: "",

  // Final Questions
  hostingSetup: "",
  domainPurchase: "",
  ongoingMaintenance: "",
  futureApp: "",
  anythingElse: "",
};

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
    <div className="relative w-16 h-16 md:w-28 md:h-28 shrink-0">
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
        <div className="w-2 h-2 md:w-3 md:h-3 bg-black rounded-full" />
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
      className="absolute -top-6 right-6 opacity-70 hidden lg:block"
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
  firstName: "First Name",
  lastName: "Last Name",
  contactNumber: "Contact Number",
  email: "Email",
  currentWebsite: "Current Website",
  companyName: "Company / Brand Name",
  projectType: "Project Type",
  projectTypeOther: "Project Type (Other)",
  projectGoal: "Main Goal",
  targetAudience: "Target Audience",
  exampleSites: "Example Sites",
  hasBranding: "Has Branding?",
  brandingHelp: "Branding Help Needed?",
  projectDescription: "Project Description",
  keyPages: "Key Pages / Sections",
  userInteraction: "User Interaction",
  competitorSites: "Competitor Sites",
  userAccounts: "User Accounts",
  ecommerce: "E-Commerce / Online Store",
  bookingScheduling: "Booking / Scheduling",
  contactForms: "Contact Forms",
  searchFiltering: "Search & Filtering",
  mapsLocation: "Maps / Location",
  socialMediaIntegration: "Social Media Integration",
  blogNews: "Blog / News Section",
  gallery: "Photo / Video Gallery",
  videoAudio: "Video / Audio Player",
  multiLanguage: "Multi-Language Support",
  chatMessaging: "Chat / Messaging",
  reviewsTestimonials: "Reviews / Testimonials",
  memberArea: "Member-Only Area",
  paymentProcessing: "Payment Processing",
  deviceFocus: "Device Focus",
  additionalFeatures: "Additional Features",
  stylePreference: "Style Preference",
  styleOther: "Other Style",
  colorPreferences: "Color Preferences",
  simpleOrFeatureRich: "Simple or Feature-Rich",
  animations: "Animations / Interactive Elements",
  designInspiration: "Design Inspiration",
  userLogins: "User Logins",
  adminPanel: "Admin / Dashboard Panel",
  emailNotifications: "Email Notifications",
  socialLogin: "Social Login",
  scalability: "Scale to Many Users",
  thirdPartyIntegrations: "Third-Party Integrations",
  hasContent: "Content Ready?",
  needsCopywriting: "Needs Copywriting?",
  hasPhotos: "Has Photos / Media?",
  needsStockPhotos: "Needs Stock Photos?",
  hasSEOPlan: "SEO Plan?",
  launchDate: "Ideal Launch Date",
  hardDeadline: "Hard Deadline",
  phasedLaunch: "Phased Launch?",
  budgetRange: "Budget Range",
  customBudget: "Custom Budget",
  hostingSetup: "Hosting Setup",
  domainPurchase: "Domain Purchase",
  ongoingMaintenance: "Ongoing Maintenance",
  futureApp: "Future App Expansion",
  anythingElse: "Additional Notes",
};

const sectionGroups = [
  {
    title: "Client Info",
    keys: ["firstName", "lastName", "contactNumber", "email", "currentWebsite", "companyName"],
  },
  {
    title: "Project Overview",
    keys: ["projectType", "projectTypeOther", "projectGoal", "targetAudience", "exampleSites", "hasBranding", "brandingHelp"],
  },
  {
    title: "Project Details",
    keys: ["projectDescription", "keyPages", "userInteraction", "competitorSites"],
  },
  {
    title: "Features & Functionality",
    keys: ["userAccounts", "ecommerce", "bookingScheduling", "contactForms", "searchFiltering", "mapsLocation", "socialMediaIntegration", "blogNews", "gallery", "videoAudio", "multiLanguage", "chatMessaging", "reviewsTestimonials", "memberArea", "paymentProcessing", "deviceFocus", "additionalFeatures"],
  },
  {
    title: "Design Preferences",
    keys: ["stylePreference", "styleOther", "colorPreferences", "simpleOrFeatureRich", "animations", "designInspiration"],
  },
  {
    title: "Technical Requirements",
    keys: ["userLogins", "adminPanel", "emailNotifications", "socialLogin", "scalability", "thirdPartyIntegrations"],
  },
  {
    title: "Content & Assets",
    keys: ["hasContent", "needsCopywriting", "hasPhotos", "needsStockPhotos", "hasSEOPlan"],
  },
  {
    title: "Timeline",
    keys: ["launchDate", "hardDeadline", "phasedLaunch"],
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

function ReviewSection({ form }) {
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

  const isCurrentStepValid = useMemo(() => {
    const sectionId = sections[step].id;
    if (!isStepComplete(sectionId)) return false;
    if (sectionId === "budget" && form.budgetRange === "custom" && !form.customBudget.trim()) return false;
    if (sectionId === "design" && form.stylePreference === "other" && !form.styleOther.trim()) return false;
    if (sectionId === "overview" && form.projectType === "other" && !form.projectTypeOther.trim()) return false;
    return true;
  }, [step, form]);

  const highestReachableStep = useMemo(() => {
    for (let i = 0; i < sections.length; i++) {
      if (!isStepComplete(sections[i].id)) return i;
      if (sections[i].id === "budget" && form.budgetRange === "custom" && !form.customBudget.trim()) return i;
      if (sections[i].id === "design" && form.stylePreference === "other" && !form.styleOther.trim()) return i;
      if (sections[i].id === "overview" && form.projectType === "other" && !form.projectTypeOther.trim()) return i;
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
    if (index <= step || index <= highestReachableStep) {
      setStep(index);
    } else {
      setAttempted((prev) => ({ ...prev, [sections[step].id]: true }));
    }
  };

  const yesNoOptions = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];

  function renderStepContent() {
    switch (sections[step].id) {
      case "client":
        return (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field label="First Name">
                <Input
                  value={form.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                  placeholder="First name"
                />
              </Field>
              <Field label="Last Name">
                <Input
                  value={form.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                  placeholder="Last name"
                />
              </Field>
            </div>
            <Field label="Company / Brand Name" hint="Optional">
              <Input
                value={form.companyName}
                onChange={(e) => update("companyName", e.target.value)}
                placeholder="Your business or brand name"
              />
            </Field>
            <Field label="Contact Number">
              <Input
                type="tel"
                value={form.contactNumber}
                onChange={(e) => update("contactNumber", e.target.value)}
                placeholder="(555) 123-4567"
              />
            </Field>
            <Field label="Email">
              <Input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="you@example.com"
              />
            </Field>
            <Field label="Current Website" hint="Optional">
              <Input
                type="url"
                value={form.currentWebsite}
                onChange={(e) => update("currentWebsite", e.target.value)}
                placeholder="https://yoursite.com"
              />
            </Field>
          </>
        );

      case "overview":
        return (
          <>
            <RadioField
              label="What type of project is this?"
              value={form.projectType}
              onChange={(v) => update("projectType", v)}
              options={[
                { value: "new-website", label: "New website from scratch" },
                { value: "redesign", label: "Redesign / rebuild existing site" },
                { value: "web-app", label: "Web application" },
                { value: "ecommerce", label: "Online store / e-commerce" },
                { value: "landing-page", label: "Landing page / single page" },
                { value: "portfolio", label: "Portfolio / showcase" },
                { value: "blog", label: "Blog / content site" },
                { value: "other", label: "Other" },
              ]}
            />
            {form.projectType === "other" && (
              <Field label="Describe your project type:">
                <Input
                  value={form.projectTypeOther}
                  onChange={(e) => update("projectTypeOther", e.target.value)}
                  placeholder="What kind of project?"
                />
              </Field>
            )}
            <Field label="What is the main goal of this project?" hint="What should the site accomplish?">
              <Textarea
                value={form.projectGoal}
                onChange={(e) => update("projectGoal", e.target.value)}
                placeholder="e.g., Generate leads, sell products, showcase work, provide information..."
                className="min-h-[100px]"
              />
            </Field>
            <Field label="Who is your target audience?">
              <Textarea
                value={form.targetAudience}
                onChange={(e) => update("targetAudience", e.target.value)}
                placeholder="Describe your ideal user or customer"
                className="min-h-[80px]"
              />
            </Field>
            <Field label="Do you have examples of websites you like?" hint="Links help a lot — optional">
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

      case "details":
        return (
          <>
            <Field label="Describe your project in detail" hint="The more detail, the better">
              <Textarea
                value={form.projectDescription}
                onChange={(e) => update("projectDescription", e.target.value)}
                placeholder="Tell us about your vision, what problem it solves, and how it should work"
                className="min-h-[120px]"
              />
            </Field>
            <Field label="What key pages or sections do you need?" hint="e.g., Home, About, Services, Contact, Shop, Blog, FAQ...">
              <Textarea
                value={form.keyPages}
                onChange={(e) => update("keyPages", e.target.value)}
                placeholder="List the main pages and what each should include"
                className="min-h-[100px]"
              />
            </Field>
            <Field label="How will users interact with the site?" hint="Browse, purchase, sign up, submit forms, etc.">
              <Textarea
                value={form.userInteraction}
                onChange={(e) => update("userInteraction", e.target.value)}
                placeholder="Describe the main user journey"
                className="min-h-[80px]"
              />
            </Field>
            <Field label="Any competitor or similar sites?" hint="Optional — helps us understand your space">
              <Textarea
                value={form.competitorSites}
                onChange={(e) => update("competitorSites", e.target.value)}
                placeholder="Links to competitors or similar businesses"
                className="min-h-[80px]"
              />
            </Field>
          </>
        );

      case "features":
        return (
          <>
            <RadioField
              label="Will users need to create accounts?"
              value={form.userAccounts}
              onChange={(v) => update("userAccounts", v)}
              options={[
                ...yesNoOptions,
                { value: "maybe", label: "Maybe / not sure yet" },
              ]}
            />
            <Field label="Which features do you need?" hint="Check all that apply">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <CheckboxField label="E-Commerce / Online Store" checked={form.ecommerce} onChange={(v) => update("ecommerce", v)} />
                <CheckboxField label="Booking / Scheduling" checked={form.bookingScheduling} onChange={(v) => update("bookingScheduling", v)} />
                <CheckboxField label="Contact Forms" checked={form.contactForms} onChange={(v) => update("contactForms", v)} />
                <CheckboxField label="Search & Filtering" checked={form.searchFiltering} onChange={(v) => update("searchFiltering", v)} />
                <CheckboxField label="Maps / Location" checked={form.mapsLocation} onChange={(v) => update("mapsLocation", v)} />
                <CheckboxField label="Social Media Integration" checked={form.socialMediaIntegration} onChange={(v) => update("socialMediaIntegration", v)} />
                <CheckboxField label="Blog / News Section" checked={form.blogNews} onChange={(v) => update("blogNews", v)} />
                <CheckboxField label="Photo / Video Gallery" checked={form.gallery} onChange={(v) => update("gallery", v)} />
                <CheckboxField label="Video / Audio Player" checked={form.videoAudio} onChange={(v) => update("videoAudio", v)} />
                <CheckboxField label="Multi-Language Support" checked={form.multiLanguage} onChange={(v) => update("multiLanguage", v)} />
                <CheckboxField label="Chat / Messaging" checked={form.chatMessaging} onChange={(v) => update("chatMessaging", v)} />
                <CheckboxField label="Reviews / Testimonials" checked={form.reviewsTestimonials} onChange={(v) => update("reviewsTestimonials", v)} />
                <CheckboxField label="Member-Only Area" checked={form.memberArea} onChange={(v) => update("memberArea", v)} />
                <CheckboxField label="Payment Processing" checked={form.paymentProcessing} onChange={(v) => update("paymentProcessing", v)} />
              </div>
            </Field>
            <RadioField
              label="Mobile-first or desktop focus?"
              value={form.deviceFocus}
              onChange={(v) => update("deviceFocus", v)}
              options={[
                { value: "mobile", label: "Mobile-first" },
                { value: "desktop", label: "Desktop focus" },
                { value: "both", label: "Both equally" },
              ]}
            />
            <Field label="Any other features not listed above?" hint="Optional">
              <Textarea
                value={form.additionalFeatures}
                onChange={(e) => update("additionalFeatures", e.target.value)}
                placeholder="Describe any custom features you need"
                className="min-h-[80px]"
              />
            </Field>
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
                { value: "modern", label: "Modern & clean" },
                { value: "fun", label: "Fun / playful" },
                { value: "minimal", label: "Minimal" },
                { value: "bold", label: "Bold & vibrant" },
                { value: "corporate", label: "Corporate / professional" },
                { value: "luxury", label: "Luxury / elegant" },
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
                placeholder="e.g., dark tones, bright and bold, earth tones, match existing brand..."
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
              label="Do you want animations or interactive elements?"
              value={form.animations}
              onChange={(v) => update("animations", v)}
              options={[
                { value: "yes", label: "Yes, lots of movement and interaction" },
                { value: "some", label: "Some subtle animations" },
                { value: "no", label: "No, keep it simple" },
              ]}
            />
            <Field label="Any design inspiration?" hint="Optional — links, screenshots, Pinterest boards, etc.">
              <Textarea
                value={form.designInspiration}
                onChange={(e) => update("designInspiration", e.target.value)}
                placeholder="Share anything that shows the look and feel you want"
                className="min-h-[80px]"
              />
            </Field>
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
              label="Do you need an admin dashboard / content management?"
              value={form.adminPanel}
              onChange={(v) => update("adminPanel", v)}
              options={yesNoOptions}
            />
            <RadioField
              label="Email notifications needed?" hint="Order confirmations, form submissions, etc."
              value={form.emailNotifications}
              onChange={(v) => update("emailNotifications", v)}
              options={yesNoOptions}
            />
            <RadioField
              label="Social login?" hint="Google, Apple, Facebook, etc."
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
            <Field label="Any third-party integrations?" hint="Optional — CRM, payment, analytics, APIs, etc.">
              <Textarea
                value={form.thirdPartyIntegrations}
                onChange={(e) => update("thirdPartyIntegrations", e.target.value)}
                placeholder="e.g., Stripe, Mailchimp, Google Analytics, Zapier, Salesforce..."
                className="min-h-[80px]"
              />
            </Field>
          </>
        );

      case "content":
        return (
          <>
            <RadioField
              label="Do you have website content ready?" hint="Text, copy, descriptions, etc."
              value={form.hasContent}
              onChange={(v) => update("hasContent", v)}
              options={[
                { value: "yes", label: "Yes, all content is ready" },
                { value: "partial", label: "Some content, but not all" },
                { value: "no", label: "No, I need to create it" },
              ]}
            />
            <RadioField
              label="Do you need copywriting or content creation?"
              value={form.needsCopywriting}
              onChange={(v) => update("needsCopywriting", v)}
              options={[
                { value: "yes", label: "Yes, I need help writing content" },
                { value: "some", label: "Just some pages or sections" },
                { value: "no", label: "No, I'll provide all content" },
              ]}
            />
            <RadioField
              label="Do you have photos and media?" hint="Optional"
              value={form.hasPhotos}
              onChange={(v) => update("hasPhotos", v)}
              options={[
                { value: "yes", label: "Yes, I have photos/videos ready" },
                { value: "some", label: "Some, but need more" },
                { value: "no", label: "No, I need help sourcing them" },
              ]}
            />
            <RadioField
              label="Do you need stock photos?" hint="Optional"
              value={form.needsStockPhotos}
              onChange={(v) => update("needsStockPhotos", v)}
              options={yesNoOptions}
            />
            <RadioField
              label="Do you have an SEO strategy?" hint="Optional"
              value={form.hasSEOPlan}
              onChange={(v) => update("hasSEOPlan", v)}
              options={[
                { value: "yes", label: "Yes, I have keywords and a plan" },
                { value: "need-help", label: "No, I need help with SEO" },
                { value: "not-needed", label: "Not a priority right now" },
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
              label="Are you open to a phased launch?" hint="Optional — launch core features first, add more later"
              value={form.phasedLaunch}
              onChange={(v) => update("phasedLaunch", v)}
              options={[
                { value: "yes", label: "Yes, let's start with MVP" },
                { value: "prefer-full", label: "Prefer full launch" },
                { value: "unsure", label: "Open to either" },
              ]}
            />
          </>
        );

      case "budget":
        return (
          <>
            <p className="text-sm text-muted-foreground">This helps us recommend the right solution for your needs.</p>
            <RadioField
              label="What budget range are you comfortable with?"
              value={form.budgetRange}
              onChange={(v) => update("budgetRange", v)}
              options={[
                { value: "500-1000", label: "$500 - $1,000 (basic site / landing page)" },
                { value: "1000-3000", label: "$1,000 - $3,000 (custom site with features)" },
                { value: "3000-6000", label: "$3,000 - $6,000 (advanced / interactive)" },
                { value: "6000-10000", label: "$6,000 - $10,000 (complex web app)" },
                { value: "10000+", label: "$10,000+ (full platform build)" },
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
              label="Will this expand into a mobile app later?"
              value={form.futureApp}
              onChange={(v) => update("futureApp", v)}
              options={[
                { value: "yes", label: "Yes" },
                { value: "maybe", label: "Maybe" },
                { value: "no", label: "No" },
              ]}
            />
            <Field label="Anything else you'd like us to know?">
              <Textarea
                value={form.anythingElse}
                onChange={(e) => update("anythingElse", e.target.value)}
                placeholder="Any other ideas, requirements, concerns, or notes..."
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

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const StepIcon = sections[step].icon;

  return (
    <div className="min-h-screen bg-[#D7F36A] text-black p-3 sm:p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-4 md:space-y-6">
        {/* Brand Header */}
        <div className="flex items-center gap-4 md:gap-6">
          <CreativeMessLogo />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">a creative mess</h1>
            <p className="text-xs uppercase tracking-wide">client intake app</p>
            <p className="text-xs md:text-sm">project discovery questionnaire</p>
          </div>
        </div>

        {/* Mobile: compact progress + collapsible nav */}
        <div className="lg:hidden space-y-3">
          <Card className="rounded-2xl shadow-sm border-2 border-black bg-white">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <StepIcon className="h-4 w-4" />
                  <span className="font-medium">{sections[step].title}</span>
                </div>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <button
                type="button"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-black transition"
              >
                {sidebarOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                {sidebarOpen ? "Hide steps" : "Show all steps"}
              </button>
              {sidebarOpen && (
                <div className="space-y-1.5 pt-1">
                  {sections.map((section, index) => {
                    const Icon = section.icon;
                    const active = index === step;
                    const completed = index < highestReachableStep || (index === highestReachableStep && isStepComplete(section.id));
                    const locked = index > highestReachableStep;
                    return (
                      <button
                        key={section.id}
                        type="button"
                        onClick={() => { goToStep(index); setSidebarOpen(false); }}
                        className={`flex w-full items-center gap-2 rounded-xl border-2 px-3 py-2 text-left transition text-sm ${
                          active
                            ? "bg-black text-white border-black"
                            : locked
                            ? "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
                            : "bg-white hover:bg-black hover:text-white border-black"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        <span className="flex-1 font-medium">{section.title}</span>
                        {completed && !active && (
                          <CheckCircle2 className="h-3.5 w-3.5 text-green-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="relative grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <ScribbleArrow />
          {/* Desktop sidebar */}
          <Card className="hidden lg:block h-fit rounded-3xl shadow-sm border-2 border-black bg-white">
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
            <Card className="rounded-2xl md:rounded-3xl shadow-sm border-2 border-black bg-white">
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-lg md:text-xl">{sections[step].title}</CardTitle>
                <CardDescription>
                  messy ideas welcome — clarity comes later
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6 md:space-y-8 p-4 md:p-6 pt-0">
                {renderStepContent()}

                {attempted[sections[step].id] && !isCurrentStepValid && (
                  <div className="rounded-2xl border-2 border-amber-400 bg-amber-50 p-4 text-amber-800 text-sm">
                    Please answer all required questions before continuing.
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
        <DialogContent className="w-[calc(100%-2rem)] max-w-lg">
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
