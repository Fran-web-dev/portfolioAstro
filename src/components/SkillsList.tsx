import type { IconType } from "react-icons";
import {
  SiAstro,
  SiCss,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from "react-icons/si";
import { TbCode } from "react-icons/tb";

const SKILL_ICONS: Record<string, IconType> = {
  HTML: SiHtml5,
  CSS: SiCss,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  React: SiReact,
  Astro: SiAstro,
  "Tailwind CSS": SiTailwindcss,
  "Node.js": SiNodedotjs,
  Git: SiGit,
  GitHub: SiGithub,
  Vite: SiVite,
  Python: SiPython,
  MySQL: SiMysql,
};

interface Props {
  skills: { name: string }[];
}

export default function SkillsList({ skills }: Props) {
  return (
    <ul className="inline-flex flex-wrap gap-2">
      {skills.map(({ name }) => {
        const Icon = SKILL_ICONS[name] ?? TbCode;
        return (
          <li
            key={name}
            className="flex items-center gap-1.5 rounded-md bg-neutral-800 px-2 py-1 font-mono text-xs font-medium text-white print:bg-neutral-100 print:text-neutral-900"
          >
            <Icon aria-hidden />
            {name}
          </li>
        );
      })}
    </ul>
  );
}
