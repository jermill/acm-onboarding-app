import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const fieldLabels = {
  projectName: "Project Name",
  websiteCount: "Number of Websites",
  ideaSummary: "Idea Summary",
  exampleSites: "Example Sites",
  branding: "Branding",
  datingDescription: "Dating Game Description",
  datingAccounts: "User Accounts Needed",
  datingFeatures: "Dating Game Features",
  datingMonetization: "Monetization Strategy",
  datingDeviceFocus: "Device Focus",
  datingPayments: "Payment Integration",
  podcastDescription: "Podcast Game Description",
  podcastHosting: "Podcast Hosting",
  podcastFeatures: "Podcast Features",
  podcastAdmin: "Podcast Admin Needs",
  stylePrefs: "Style Preferences",
  colorPrefs: "Color Preferences",
  complexity: "Complexity Level",
  animations: "Animations",
  technicalFeatures: "Technical Features",
  launchDate: "Desired Launch Date",
  deadline: "Hard Deadline",
  priority: "Priority",
  budgetRange: "Budget Range",
  customBudget: "Custom Budget",
  additionalServices: "Additional Services",
  extraNotes: "Extra Notes",
};

const skipFields = ["id", "submittedAt"];

function FieldValue({ value }) {
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
  if (!value) return <span className="text-muted-foreground italic">Not provided</span>;
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

  const fields = Object.entries(submission).filter(
    ([key]) => !skipFields.includes(key)
  );

  return (
    <div className="min-h-screen bg-[#D7F36A] text-black p-4 md:p-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              {submission.projectName || "Untitled Project"}
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
          <Link to="/admin/dashboard">
            <Button variant="outline">Back to List</Button>
          </Link>
        </div>

        <Card className="rounded-3xl border-2 border-black bg-white">
          <CardHeader>
            <CardTitle>Submission Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {fields.map(([key, value], i) => (
              <div key={key}>
                {i > 0 && <Separator className="mb-6" />}
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    {fieldLabels[key] || key}
                  </p>
                  <FieldValue value={value} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
