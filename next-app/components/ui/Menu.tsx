"use client";

import React from "react";
import { Sidebar } from "flowbite-react";
import { HiChartPie, HiTable } from "react-icons/hi";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SettingsIcon as SettingsIconLucide } from "lucide-react";
import { IconType } from "react-icons";
import { ElementType } from "react";
import { LucideIcon } from "lucide-react";

const menuItems = [
  { href: "/dashboard", icon: HiChartPie, label: "Dashboard" },
  { href: "/upload", icon: HiTable, label: "Upload" },
  { href: "/settings", icon: SettingsIconLucide, label: "Settings" },
];

export function Menu() {
  const pathname = usePathname();

  return (
    <Sidebar aria-label="Application sidebar" className="h-screen">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {menuItems.map((item) => (
            <SidebarItem
              key={item.href}
              {...item}
              icon={item.icon as any}
              active={pathname === item.href}
            />
          ))}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

const SidebarItem = ({
  href,
  icon: Icon,
  label,
  active,
}: {
  href: string;
  icon: IconType;
  label: string;
  active: boolean;
}) => (
  <Link href={href} passHref>
    <Sidebar.Item
      as="div"
      icon={Icon}
      active={active}
      className={`cursor-pointer transition-colors duration-200 ${
        active ? "bg-gray-100 text-blue-600" : "hover:bg-gray-50"
      }`}
    >
      {label}
    </Sidebar.Item>
  </Link>
);

const SettingsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.004.827c-.292-.24-.437-.613-.43-.992a7.723 7.723 0 0 1 0-.255c.007-.378-.138-.75-.43-.991l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.296-2.247a1.125 1.125 0 0 1 1.37-.49l1.217.456c.355.133.75.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
  </svg>
);
