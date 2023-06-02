import {
  SiJavascript,
  SiPython,
  SiJava,
  SiCplusplus,
  SiCsharp,
  SiTypescript,
  SiRuby,
  SiSwift,
  SiGo,
  SiKotlin,
  SiRust,
  SiPhp,
  SiPerl,
  SiHtml5,
  SiCss3,
} from "react-icons/si";
import { MdNotInterested } from "react-icons/md";

const languageOptions = [
  {
    value: "No Specific Language",
    label: "No Specific Language",
    icon: MdNotInterested,
  },
  { value: "JS", label: "JavaScript", icon: SiJavascript },
  { value: "Python", label: "Python", icon: SiPython },
  { value: "Java", label: "Java", icon: SiJava },
  { value: "CPlusPlus", label: "C++", icon: SiCplusplus },
  { value: "CSharp", label: "C#", icon: SiCsharp },
  { value: "TS", label: "TypeScript", icon: SiTypescript },
  { value: "Ruby", label: "Ruby", icon: SiRuby },
  { value: "Swift", label: "Swift", icon: SiSwift },
  { value: "Go", label: "Go", icon: SiGo },
  { value: "Kotlin", label: "Kotlin", icon: SiKotlin },
  { value: "Rust", label: "Rust", icon: SiRust },
  { value: "PHP", label: "PHP", icon: SiPhp },
  { value: "Perl", label: "Perl", icon: SiPerl },
  { value: "HTML", label: "HTML", icon: SiHtml5 },
  { value: "CSS", label: "CSS", icon: SiCss3 },
  { value: "Other", label: "Other", icon: null },
];

export default languageOptions;
