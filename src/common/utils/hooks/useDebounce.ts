import { useEffect, useMemo, useState } from "react";

import debounce from "lodash/debounce";

export function useDebounce<T>(value: T, delay: 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  // debounced setter
  const debouncedSetter = useMemo(
    () =>
      debounce((val: T) => {
        setDebouncedValue(val);
      }, delay),
    [delay],
  );

  useEffect(() => {
    debouncedSetter(value);
    return () => {
      debouncedSetter.cancel();
    };
  }, [value, debouncedSetter]);

  return debouncedValue;
}
