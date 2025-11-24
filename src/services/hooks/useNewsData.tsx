import { useEffect, useState } from "react";

import {
  getTopHeadlines,
  getCategoryHeadlines
} from "@/services/api/news.service";

import useNewsStore from "@/shared/stores/news.store";
import type { INews } from "@/shared/types/types";

interface UseNewsDataOptions {
  category?: string | null;
}

export default function useNewsData(options: UseNewsDataOptions = {}) {
  const { category = null } = options;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const setNews = useNewsStore((s) => s.setNews);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const result: INews = category
          ? await getCategoryHeadlines(category)
          : await getTopHeadlines();

        if (cancelled) return;

        setNews(result);
      } catch (err: unknown) {
        if (cancelled) return;
        if (err instanceof Error) setError(err);
        else setError(new Error(String(err)));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [category, setNews]);

  return {
    loading,
    error
  };
}
