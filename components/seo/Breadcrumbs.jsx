import Link from "next/link";
import JsonLd from "./JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

export default function Breadcrumbs({ items = [], className = "" }) {
  if (!items.length) return null;

  return (
    <>
      <JsonLd data={breadcrumbSchema(items)} />
      <nav
        aria-label="Breadcrumb"
        className={`flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-500 ${className}`}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <span key={`${item.href}-${item.name}`} className="inline-flex items-center gap-2">
              {isLast ? (
                <span className="text-[#7b2929]">{item.name}</span>
              ) : (
                <Link href={item.href} className="hover:text-[#6b2323]">
                  {item.name}
                </Link>
              )}
              {!isLast && <span aria-hidden="true">&gt;</span>}
            </span>
          );
        })}
      </nav>
    </>
  );
}
