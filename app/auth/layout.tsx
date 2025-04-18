"use client";



export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container flex items-center justify-center min-h-screen py-10">
      <div className="w-full max-w-[400px]">
        {children}
      </div>
    </div>
  );
}
