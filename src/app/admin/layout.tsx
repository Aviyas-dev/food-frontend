import { Navigation } from "./_components/Navigation";
 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-muted h-screen flex gap-6  ">
      <Navigation />
      {children}
    </div>
  );
}