import Link from "next/link";

import { getHashtagBy } from "@/src/entities/hashtag/api/getHashtagBy";

import { buildMainNavigationItems, resolveNavigationIcon } from "../model";

import "./style.css";

export async function MainNavigation() {
  const {
    collection: { hashtags },
  } = await getHashtagBy();
  const navigationItems = buildMainNavigationItems(hashtags);

  return (
    <nav aria-label="Main navigation">
      <ul className="nav-list sticky top-4 hidden md:grid">
        {navigationItems.map((item) => {
          const Icon = resolveNavigationIcon(item.iconType);

          return (
            <li key={item.href} className="hover:opacity-80">
              <Link
                href={item.href}
                className="flex justify-center gap-x-3 py-3 xl:justify-start"
              >
                <Icon aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
