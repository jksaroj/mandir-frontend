"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "@/components/providers/LanguageProvider";
import { localizePath } from "@/lib/i18n/paths";
import { fetchMenu } from "@/lib/menus";

function FooterMenuItem({ item, locale, level = 0 }) {
  return (
    <li>
      <Link href={localizePath(item.url || "#", locale)} className="transition hover:text-white">
        {level > 0 ? "- " : ""}{item.label}
      </Link>
      {item.children?.length ? (
        <ul className="mt-2 space-y-2 pl-3 text-white/65">
          {item.children.map((child) => (
            <FooterMenuItem key={child.id} item={child} locale={locale} level={level + 1} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export default function FooterMenu({ className = "mt-4 space-y-2.5 text-sm text-white/80" }) {
  const { locale } = useTranslation();
  const [items, setItems] = useState([]);

  useEffect(() => {
    let mounted = true;
    fetchMenu("footer").then((nextItems) => {
      if (mounted) setItems(nextItems);
    });
    return () => {
      mounted = false;
    };
  }, [locale]);

  return (
    <ul className={className}>
      {items.length ? (
        items.map((item) => <FooterMenuItem key={item.id} item={item} locale={locale} />)
      ) : (
        <li>comming</li>
      )}
    </ul>
  );
}
