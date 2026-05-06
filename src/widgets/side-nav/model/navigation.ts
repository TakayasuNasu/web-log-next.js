import type { IconType } from "react-icons";
import { AiOutlineHome, AiOutlineLaptop, AiOutlineMail } from "react-icons/ai";
import { CgDisc } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { GiSoccerBall } from "react-icons/gi";
import { GrGatsbyjs } from "react-icons/gr";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { RiEnglishInput } from "react-icons/ri";
import { SiTypescript } from "react-icons/si";
import { match } from "ts-pattern";

import type { Hashtag } from "@/src/entities/hashtag/model/types";

export type NavigationItem = {
  href: string;
  label: string;
  iconType?: string;
};

export function buildMainNavigationItems(hashtags: Array<Hashtag>) {
  return [
    {
      href: "/",
      label: "Home",
      iconType: "AiOutlineHome",
    },
    ...hashtags.map((tag) => ({
      href: `/?tag=${tag.slug}`,
      label: tag.name,
      iconType: tag.iconType,
    })),
  ] satisfies Array<NavigationItem>;
}

export function resolveNavigationIcon(tag?: string): IconType {
  return match(tag)
    .with("AiOutlineHome", () => AiOutlineHome)
    .with("AiOutlineLaptop", () => AiOutlineLaptop)
    .with("AiOutlineMail", () => AiOutlineMail)
    .with("CgDisc", () => CgDisc)
    .with("GrGatsbyjs", () => GrGatsbyjs)
    .with("GiSoccerBall", () => GiSoccerBall)
    .with("FaReact", () => FaReact)
    .with("MdOutlineMapsHomeWork", () => MdOutlineMapsHomeWork)
    .with("SiTypescript", () => SiTypescript)
    .with("RiEnglishInput", () => RiEnglishInput)
    .otherwise(() => AiOutlineLaptop);
}
