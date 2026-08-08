import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // تحويل التحذيرات الخاصة بالمتغيرات غير المستخدمة إلى إشعار بسيط أو تجاهلها
      "@typescript-eslint/no-unused-vars": "off",
      // السماح باستخدام النوع any مؤقتاً
      "@typescript-eslint/no-explicit-any": "off",
      // السماح بعلامات التنصيص المفردة داخل النصوص
      "react/no-unescaped-entities": "off",
      // السماح باستخدام عناصر <img> العادية بدلاً من <Image />
      "@next/next/no-img-element": "off",
      // السماح بالتعبيرات غير المستخدمة
      "@typescript-eslint/no-unused-expressions": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;