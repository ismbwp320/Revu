
export async function loginUser({ identifier, password }: { identifier: string; password: string }) {
  const res = await fetch("https://app.ed-cred.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login failed");
  }

  return res.json(); // expects { token, user }
}
