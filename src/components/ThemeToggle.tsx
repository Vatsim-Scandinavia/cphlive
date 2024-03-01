import { useEffect } from "react";
import { Switch } from "@nextui-org/react";

const ThemeToggle = () => {
  useEffect(() => {
    const theme = (() => {
      if (
        typeof localStorage !== "undefined" &&
        localStorage.getItem("theme")
      ) {
        return localStorage.getItem("theme");
      }
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
      return "light";
    })();

    if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }

    window.localStorage.setItem("theme", theme);

    const handleToggleChange = () => {
      const element = document.documentElement;
      const isDark = element.classList.contains("dark");
      element.classList.toggle("dark", !isDark);

      localStorage.setItem("theme", isDark ? "light" : "dark");
    };

    const themeToggle = document.getElementById("themeToggle");
    themeToggle.addEventListener("change", handleToggleChange);

    return () => {
      themeToggle.removeEventListener("change", handleToggleChange);
    };
  }, []);

  return (
    <>
      <Switch aria-label="Theme Switch" id="themeToggle" />
    </>
  );
};

export default ThemeToggle;
