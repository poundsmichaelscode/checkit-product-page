"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type UseDebouncedRouterOptions = {
  paramName: string;
  delay?: number;
  initialValue?: string;
  resetPage?: boolean;
};

export function useDebouncedRouter({
  paramName,
  delay = 400,
  initialValue = "",
  resetPage = true
}: UseDebouncedRouterOptions) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentParamValue = useMemo(() => searchParams.get(paramName) ?? initialValue, [initialValue, paramName, searchParams]);
  const [value, setValue] = useState(currentParamValue);

  useEffect(() => {
    setValue(currentParamValue);
  }, [currentParamValue]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const normalizedValue = value.trim();
      const normalizedCurrentValue = currentParamValue.trim();

      if (normalizedValue === normalizedCurrentValue) {
        return;
      }

      const params = new URLSearchParams(searchParams.toString());

      if (normalizedValue) {
        params.set(paramName, normalizedValue);
      } else {
        params.delete(paramName);
      }

      if (resetPage) {
        params.delete("page");
      }

      const nextQuery = params.toString();
      const currentQuery = searchParams.toString();

      if (nextQuery === currentQuery) {
        return;
      }

      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [currentParamValue, delay, pathname, paramName, resetPage, router, searchParams, value]);

  return { value, setValue };
}
