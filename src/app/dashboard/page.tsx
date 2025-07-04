import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOption';

import { redirect } from 'next/navigation';
import { LogOut, LayoutDashboard, FolderKanban, Users, Settings } from 'lucide-react';
import Image from 'next/image';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect('/login');

  const user = session.user;

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 dark:bg-black dark:text-white">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="px-6 py-5 text-2xl font-bold tracking-tight">AuthApp</div>
        <nav className="flex-1 px-4 space-y-2">
          <SidebarItem icon={<LayoutDashboard size={18} />} label="Dashboard" active />
          <SidebarItem icon={<FolderKanban size={18} />} label="Projects" />
          <SidebarItem icon={<Users size={18} />} label="Team" />
          <SidebarItem icon={<Settings size={18} />} label="Settings" />
        </nav>
        <form action="/api/auth/signout" method="POST" className="p-4">
          <button className="flex w-full items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition">
            <LogOut size={16} /> Logout
          </button>
        </form>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="flex items-center justify-between h-16 border-b border-gray-200 bg-white px-6 dark:border-gray-800 dark:bg-black">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-3">
            {user?.image && (
              <Image
                src={user.image}
                alt="User"
                width={36}
                height={36}
                className="rounded-full border border-gray-300 dark:border-gray-700"
              />
            )}
            <span className="hidden sm:inline text-sm font-medium text-gray-600 dark:text-gray-300">
              {user?.name || user?.email}
            </span>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="flex-1 p-6">
          <Section title="Overview">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatCard title="Projects" value="12" />
              <StatCard title="Completed Tasks" value="86" />
              <StatCard title="Team Members" value="4" />
            </div>
          </Section>

          <Section title="Recent Activity">
            <ul className="space-y-3 text-sm">
              <Activity message="✅ You logged in with Google" />
              <Activity message="📁 You created a new project" />
              <Activity message="🔧 You updated your profile settings" />
            </ul>
          </Section>
        </main>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <a
      href="#"
      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
        active
          ? 'bg-gray-100 text-blue-600 dark:bg-gray-800 dark:text-blue-400'
          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
      }`}
    >
      {icon}
      {label}
    </a>
  );
}

function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="rounded-lg bg-white dark:bg-gray-900 p-6 shadow-md">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
      <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function Activity({ message }: { message: string }) {
  return (
    <li className="rounded-md bg-white p-4 shadow dark:bg-gray-900 dark:text-gray-200">{message}</li>
  );
}
