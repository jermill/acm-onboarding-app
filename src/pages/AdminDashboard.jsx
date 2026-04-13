import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("admin_token");

  useEffect(() => {
    if (!token) {
      navigate("/admin");
      return;
    }

    fetch("/.netlify/functions/submissions", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(setSubmissions)
      .catch(() => {
        localStorage.removeItem("admin_token");
        navigate("/admin");
      })
      .finally(() => setLoading(false));
  }, [token, navigate]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this submission?")) return;
    await fetch(`/.netlify/functions/submissions?id=${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-[#D7F36A] text-black p-4 md:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">a creative mess</h1>
            <p className="text-sm">admin dashboard</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Log Out
          </Button>
        </div>

        <Card className="rounded-3xl border-2 border-black bg-white">
          <CardHeader>
            <CardTitle>Submissions</CardTitle>
            <CardDescription>
              {loading
                ? "Loading..."
                : `${submissions.length} submission${submissions.length !== 1 ? "s" : ""}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!loading && submissions.length === 0 && (
              <p className="text-muted-foreground text-sm py-8 text-center">
                No submissions yet.
              </p>
            )}

            <div className="space-y-3">
              {submissions.map((sub) => (
                <div
                  key={sub.id}
                  className="flex items-center justify-between gap-4 rounded-2xl border-2 border-black p-4 hover:bg-gray-50 transition"
                >
                  <Link
                    to={`/admin/submission/${sub.id}`}
                    className="flex-1 min-w-0"
                  >
                    <div className="font-medium truncate">
                      {sub.projectName || "Untitled Project"}
                    </div>
                    <div className="text-sm text-muted-foreground truncate">
                      {sub.ideaSummary
                        ? sub.ideaSummary.slice(0, 100) + (sub.ideaSummary.length > 100 ? "..." : "")
                        : "No description"}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {new Date(sub.submittedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </Badge>
                    </div>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(sub.id)}
                    className="shrink-0 text-red-600 border-red-300 hover:bg-red-50"
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
