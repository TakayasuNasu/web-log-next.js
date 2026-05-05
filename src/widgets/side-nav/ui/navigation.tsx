import Link from "next/link";

import { getHashtagBy } from "@/src/entities/hashtag/api/getHashtagBy";

import { buildMainNavigationItems, resolveNavigationIcon } from "../model";

export async function MainNavigation() {
  const {
    collection: { hashtags },
  } = await getHashtagBy();
  const navigationItems = buildMainNavigationItems(hashtags);

  return (
    <nav aria-label="Main navigation">
      <ul>
        {navigationItems.map((item) => {
          const Icon = resolveNavigationIcon(item.iconType);

          return (
            <li key={item.href}>
              <Link href={item.href}>
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
