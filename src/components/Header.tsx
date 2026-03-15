"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Facebook, Instagram, MapPin, Phone, Twitter } from "lucide-react";
import hdfLogoHorizontal from "../../hdf_logo_bordo.png";
import { megaMenu } from "../lib/site";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#e5dfd8] bg-[#fbf9f7]/95 backdrop-blur">
      <div className="hidden border-b border-gray-100/40 bg-gray-50 sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs text-[#5f677a]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span className="font-medium">0 312 419 03 19</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Kızılay / Ankara</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {[
              {
                label: "Facebook",
                href: "https://www.facebook.com/corumhdf19/",
                icon: Facebook,
              },
              {
                label: "Instagram",
                href: "https://www.instagram.com/corumhdf19/",
                icon: Instagram,
              },
              { label: "X", href: "https://x.com/corumhdf", icon: Twitter },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="transition-colors hover:text-[#8f1e2d]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8">
        <Link href="/" className="flex h-auto items-center">
          <Image
            src={hdfLogoHorizontal}
            alt="Çorum Hitit Dernekleri Federasyonu"
            width={324}
            height={126}
            priority
            className="h-28 w-auto max-w-none drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]"
          />
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-semibold text-[#394256] lg:flex">
          {megaMenu.map((menu) => (
            <div key={menu.label} className="group relative">
              <Link href={menu.href} className="flex items-center gap-2 hover:text-[#8f1e2d]">
                {menu.label}
                <span className="text-[10px] text-[#8f1e2d]/70">▼</span>
              </Link>
              <div className="absolute left-0 top-full hidden w-[420px] rounded-3xl border border-[#e5dfd8] bg-white p-6 shadow-lg group-hover:block">
                <div className="grid gap-3">
                  {menu.items.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="rounded-2xl border border-transparent px-4 py-3 text-sm font-medium text-[#394256] hover:border-[#e5dfd8] hover:bg-[#f7f5f3]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/uye-girisi"
            className="rounded-full border border-[#e5dfd8] px-4 py-2 text-sm font-semibold text-[#394256]"
          >
            Üye Girişi
          </Link>
          <Link
            href="/dernekler"
            className="rounded-full bg-[#8f1e2d] px-4 py-2 text-sm font-semibold text-white !text-white shadow-[0_12px_30px_-20px_rgba(127,29,29,0.7)] transition-all hover:-translate-y-0.5 hover:bg-[#7a1826] hover:shadow-[0_16px_36px_-18px_rgba(127,29,29,0.8)]"
          >
            Dernekleri Gör
          </Link>
        </div>

        <button
          type="button"
          className="flex items-center rounded-full border border-[#e5dfd8] px-4 py-2 text-sm font-semibold text-[#394256] lg:hidden"
          onClick={() => setIsOpen((value) => !value)}
        >
          Menü
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-[#e5dfd8] bg-white lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6">
            {megaMenu.map((menu) => (
              <div key={menu.label} className="space-y-2">
                <Link href={menu.href} className="text-base font-semibold text-[#394256]">
                  {menu.label}
                </Link>
                <div className="grid gap-2 text-sm text-[#5f677a]">
                  {menu.items.map((item) => (
                    <Link key={item.label} href={item.href} className="pl-3">
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex flex-wrap gap-3 pt-4">
              <Link
                href="/uye-girisi"
                className="rounded-full border border-[#e5dfd8] px-4 py-2 text-sm font-semibold text-[#394256]"
              >
                Üye Girişi
              </Link>
              <Link
                href="/dernekler"
                className="rounded-full bg-[#8f1e2d] px-4 py-2 text-sm font-semibold text-white !text-white shadow-[0_12px_30px_-20px_rgba(127,29,29,0.7)] transition-all hover:-translate-y-0.5 hover:bg-[#7a1826] hover:shadow-[0_16px_36px_-18px_rgba(127,29,29,0.8)]"
              >
                Dernekleri Gör
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
