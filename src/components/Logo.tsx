import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`relative h-10 w-10 ${className}`}>
      <Image
        src="/GrayVally.png"
        alt="GrayVally Logo"
        fill
        className="object-contain object-left"
        priority
      />
    </div>
  );
}
