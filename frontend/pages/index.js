import { useEffect } from "react";
import { useRouter } from "next/router";
import { apiRequest } from "../lib/api";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const routeBySession = async () => {
      try {
        await apiRequest("/auth/me");
        router.replace("/dashboard");
      } catch (_error) {
        router.replace("/login");
      }
    };

    routeBySession();
  }, [router]);

  return null;
}
