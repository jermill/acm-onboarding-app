import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Download } from "lucide-react";
import jsPDF from "jspdf";

const fieldLabels = {
  firstName: "First Name",
  lastName: "Last Name",
  contactNumber: "Contact Number",
  email: "Email",
  currentWebsite: "Current Website",
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

const sectionOrder = [
  {
    title: "Client Info",
    keys: ["firstName", "lastName", "contactNumber", "email", "currentWebsite"],
  },
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

function formatValue(value) {
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (Array.isArray(value)) return value.length > 0 ? value.join(", ") : "None selected";
  if (!value && value !== false) return "Not provided";
  return String(value);
}

function exportPDF(submission) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const maxWidth = pageWidth - margin * 2;
  let y = 20;

  const checkPage = (needed = 20) => {
    if (y + needed > doc.internal.pageSize.getHeight() - 20) {
      doc.addPage();
      y = 20;
    }
  };

  // Header
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("a creative mess", margin, y);
  y += 8;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100);
  doc.text("Project Discovery Questionnaire", margin, y);
  y += 6;

  const clientName = [submission.firstName, submission.lastName].filter(Boolean).join(" ") || "Unknown Client";
  doc.text(`Client: ${clientName}`, margin, y);
  y += 5;
  doc.text(
    `Submitted: ${new Date(submission.submittedAt).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })}`,
    margin,
    y
  );
  y += 4;

  // Divider line
  doc.setDrawColor(0);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;
  doc.setTextColor(0);

  for (const section of sectionOrder) {
    const filledKeys = section.keys.filter((k) => {
      if (!(k in submission)) return false;
      const v = submission[k];
      return typeof v === "boolean" ? v : !!v;
    });
    if (filledKeys.length === 0) continue;

    checkPage(30);

    // Section title
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(section.title, margin, y);
    y += 2;
    doc.setDrawColor(200);
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageWidth - margin, y);
    y += 8;

    for (const key of filledKeys) {
      const label = fieldLabels[key] || key;
      const value = formatValue(submission[key]);

      checkPage(20);

      // Label
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(100);
      doc.text(label.toUpperCase(), margin, y);
      y += 5;

      // Value (with text wrapping)
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0);
      const lines = doc.splitTextToSize(value, maxWidth);
      for (const line of lines) {
        checkPage(7);
        doc.text(line, margin, y);
        y += 6;
      }
      y += 4;
    }

    y += 4;
  }

  const fileName = `${clientName.replace(/\s+/g, "_")}_questionnaire.pdf`;
  doc.save(fileName);
}

function FieldValue({ value }) {
  if (typeof value === "boolean") {
    return <Badge variant="secondary">{value ? "Yes" : "No"}</Badge>;
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return <span className="text-muted-foreground italic">None selected</span>;
    return (
      <div className="flex flex-wrap gap-1.5">
        {value.map((v) => (
          <Badge key={v} variant="secondary">{v}</Badge>
        ))}
      </div>
    );
  }
  if (!value && value !== false) return <span className="text-muted-foreground italic">Not provided</span>;
  return <p className="whitespace-pre-wrap">{value}</p>;
}

export default function SubmissionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("admin_token");

  useEffect(() => {
    if (!token) {
      navigate("/admin");
      return;
    }

    fetch(`/.netlify/functions/submissions?id=${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 401) {
          localStorage.removeItem("admin_token");
          navigate("/admin");
          return;
        }
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then(setSubmission)
      .catch(() => navigate("/admin/dashboard"))
      .finally(() => setLoading(false));
  }, [id, token, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#D7F36A] flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!submission) return null;

  return (
    <div className="min-h-screen bg-[#D7F36A] text-black p-4 md:p-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              {[submission.firstName, submission.lastName].filter(Boolean).join(" ") || "Submission"}
            </h1>
            <p className="text-sm text-muted-foreground">
              Submitted{" "}
              {new Date(submission.submittedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button onClick={() => exportPDF(submission)}>
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Link to="/admin/dashboard">
              <Button variant="outline">Back to List</Button>
            </Link>
          </div>
        </div>

        {sectionOrder.map((section) => {
          const filledKeys = section.keys.filter((k) => {
            if (!(k in submission)) return false;
            const v = submission[k];
            return typeof v === "boolean" ? v : !!v;
          });
          if (filledKeys.length === 0) return null;

          return (
            <Card key={section.title} className="rounded-3xl border-2 border-black bg-white">
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {filledKeys.map((key, i) => (
                  <div key={key}>
                    {i > 0 && <Separator className="mb-6" />}
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        {fieldLabels[key] || key}
                      </p>
                      <FieldValue value={submission[key]} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
