import { getStore } from "@netlify/blobs";

function authCheck(request) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  return null;
}

export default async (request) => {
  const store = getStore("submissions");

  if (request.method === "POST") {
    try {
      const body = await request.json();
      const id = `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
      const submission = {
        ...body,
        id,
        submittedAt: new Date().toISOString(),
      };
      await store.setJSON(id, submission);
      return new Response(JSON.stringify({ id }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: "Failed to save submission" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  if (request.method === "GET") {
    const authError = authCheck(request);
    if (authError) return authError;

    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (id) {
      try {
        const submission = await store.get(id, { type: "json" });
        if (!submission) {
          return new Response(JSON.stringify({ error: "Not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
          });
        }
        return new Response(JSON.stringify(submission), {
          headers: { "Content-Type": "application/json" },
        });
      } catch {
        return new Response(JSON.stringify({ error: "Not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    // List all submissions
    try {
      const { blobs } = await store.list();
      const submissions = await Promise.all(
        blobs.map((blob) => store.get(blob.key, { type: "json" }))
      );
      submissions.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
      return new Response(JSON.stringify(submissions), {
        headers: { "Content-Type": "application/json" },
      });
    } catch {
      return new Response(JSON.stringify([]), {
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  if (request.method === "DELETE") {
    const authError = authCheck(request);
    if (authError) return authError;

    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) {
      return new Response(JSON.stringify({ error: "Missing id" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    await store.delete(id);
    return new Response(JSON.stringify({ deleted: true }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config = {
  path: "/.netlify/functions/submissions",
};
