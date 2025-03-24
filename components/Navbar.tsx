import Image from "next/image";
import React, { memo } from "react";
import ActiveUsers from "./users/ActiveUsers";
import { NavbarProps } from "@/types/types";

const Navbar: React.FC<NavbarProps> = ({ ativeElement }) => {
  return (
    <nav className="flex justify-between items-center gap-4 bg-primary px-5 text-white">
      <Image src="/assets/logo.svg" alt="FigPro logo" width={58} height={20} />
      <ActiveUsers />
    </nav>
  );
};

export default memo(Navbar, (prevProps, nextProps) => {
  return prevProps.activeElement === nextProps.activeElement;
});
