import i18next from "i18next";
import ru from "@locales/ru/ns.json";
import { ArgumentsType } from "./common.types";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "ns";
    resources: {
      ns: typeof ru;
    };
  }
}

export type I18n = Exclude<
  Exclude<
    ArgumentsType<typeof i18next.t>[0],
    string | TemplateStringsArray | string[]
  >[0],
  TemplateStringsArray
>;
