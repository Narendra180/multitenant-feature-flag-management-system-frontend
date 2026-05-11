import TopBar from "./TopBar";

function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen overflow-auto">
      <TopBar />

      {children}
    </div>
  )
}

export default DashboardLayout;