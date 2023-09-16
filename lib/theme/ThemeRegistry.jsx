"use client";

import { useState, useMemo, useEffect, Fragment } from "react";
import createCache from "@emotion/cache";
import { useServerInsertedHTML } from "next/navigation";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import makeTheme from "@/lib/theme/theme";
import { GlobalStyles } from "@mui/material";

// UPDATED as in https://github.com/mui/material-ui/blob/master/examples/material-ui-nextjs/src/components/ThemeRegistry/EmotionCache.js

const localTheme = () => {
  // run client-side only
  if (typeof window !== "undefined") {
    const localTheme = window.localStorage.getItem("theme");
    return localTheme === "dark" ? true : false;
  }
};

export default function ThemeRegistry({ options, children }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [isDark, setIsDark] = useState(true);

  // useEffect(() => setIsDark(prefersDarkMode), [prefersDarkMode]);
  useEffect(() => setIsDark(localTheme()), []);

  const [registry] = useState(() => {
    const cache = createCache(options);
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted = [];
    cache.insert = (...args) => {
      const [selector, serialized] = args;
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push({
          name: serialized.name,
          isGlobal: !selector,
        });
      }
      return prevInsert(...args);
      // const serialized = args[1];
      // if (cache.inserted[serialized.name] === undefined) {
      //   inserted.push(serialized.name);
      // }
      // return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = registry.flush();
    if (names.length === 0) {
      return null;
    }
    let styles = "";
    let dataEmotionAttribute = registry.cache.key;

    const globals = [];

    // for (const name of names) {
    //   styles += cache.inserted[name];
    // }

    names.forEach(({ name, isGlobal }) => {
      const style = registry.cache.inserted[name];

      if (typeof style !== "boolean") {
        if (isGlobal) {
          globals.push({ name, style });
        } else {
          styles += style;
          dataEmotionAttribute += ` ${name}`;
        }
      }
    });

    return (
      <Fragment>
        {globals.map(({ name, style }) => (
          <style
            key={name}
            data-emotion={`${registry.cache.key}-global ${name}`}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: options.prepend ? `@layer emotion {${style}}` : style,
            }}
          />
        ))}
        {styles && (
          <style
            data-emotion={dataEmotionAttribute}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: styles,
              // __html: options.prepend ? `@layer emotion {${styles}}` : styles,
            }}
          />
          // <style
          //   key={cache.key}
          //   data-emotion={`${cache.key} ${names.join(" ")}`}
          //   dangerouslySetInnerHTML={{
          //     // __html: styles,
          //     __html: options.prepend ? `@layer emotion {${styles}}` : styles,
          //   }}
          // />
        )}
      </Fragment>
    );
  });

  const theme = useMemo(() => {
    // if (typeof window !== "undefined") {
    //   window.localStorage.setItem("theme", isDark ? "dark" : "light");
    // }
    return makeTheme(isDark);
  }, [isDark]);

  const { toggle } = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggle: () => {
        setIsDark((prev) => {
          if (typeof window !== "undefined") {
            window.localStorage.setItem(
              "theme",
              prev === true ? "light" : "dark"
            );
          }
          // setSSRCookie("theme", prev === true ? "light" : "dark");
          return !prev;
        });
      },
    }),
    []
  );

  return (
    <CacheProvider value={registry.cache}>
      <ThemeProvider
        theme={{
          ...theme,
          toggle,
        }}
      >
        <GlobalStyles />
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
