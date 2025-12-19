
import React from 'react';
import { useAppStore } from '../store';
import { LogOut, User as UserIcon, LayoutDashboard, PlusCircle, Shield, Menu, X } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, currentPage, setPage, logout } = useAppStore();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const NavLink = ({ page, label, icon: Icon }: { page: any, label: string, icon?: any }) => (
    <button 
      onClick={() => { setPage(page); setMobileMenuOpen(false); }}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${currentPage === page ? 'text-cyan-400 bg-cyan-400/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
    >
      {Icon && <Icon size={18} />}
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col bg-black text-white relative">
      {/* Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 glass-panel border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => setPage('landing')}
          >
            <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,242,255,0.5)] group-hover:scale-110 transition-transform">
              <span className="font-orbitron font-bold text-black text-xl">N</span>
            </div>
            <span className="font-orbitron font-black text-2xl tracking-tighter neon-glow">NOVA</span>
          </div>

          <nav className="hidden md:flex items-center space-x-2">
            {user ? (
              <>
                <NavLink page="dashboard" label="Dashboard" icon={LayoutDashboard} />
                <NavLink page="create" label="Create Campaign" icon={PlusCircle} />
                {user.isAdmin && <NavLink page="admin" label="Admin" icon={Shield} />}
                <div className="h-6 w-px bg-white/10 mx-2" />
                <div className="flex items-center space-x-3 ml-4">
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium">{user.name}</span>
                    <span className="text-[10px] text-cyan-400 uppercase tracking-widest">{user.isAdmin ? 'Admin' : 'Pro User'}</span>
                  </div>
                  <button onClick={logout} className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                    <LogOut size={20} />
                  </button>
                </div>
              </>
            ) : (
              <>
                <button onClick={() => setPage('login')} className="px-6 py-2 text-sm font-semibold hover:text-cyan-400 transition-colors">Login</button>
                <button onClick={() => setPage('register')} className="neon-button px-6 py-2 rounded-full text-black font-bold text-sm">Join Free</button>
              </>
            )}
          </nav>

          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black pt-24 px-6 md:hidden">
          <div className="flex flex-col space-y-4">
             {user ? (
               <>
                <NavLink page="dashboard" label="Dashboard" icon={LayoutDashboard} />
                <NavLink page="create" label="Create" icon={PlusCircle} />
                {user.isAdmin && <NavLink page="admin" label="Admin" icon={Shield} />}
                <button onClick={logout} className="flex items-center space-x-2 px-4 py-3 text-red-400">
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
               </>
             ) : (
               <>
                 <button onClick={() => setPage('login')} className="w-full py-4 text-center border border-white/10 rounded-xl">Login</button>
                 <button onClick={() => setPage('register')} className="w-full py-4 text-center neon-button rounded-xl text-black font-bold">Join Now</button>
               </>
             )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-8 relative">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6 mt-12 bg-black/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="font-orbitron font-black text-2xl tracking-tighter text-cyan-400">NOVA</span>
            </div>
            <p className="text-gray-400 max-w-md">
              The world's first 100% free campaign promotion engine. Empowering creators and businesses to reach millions without a single cent.
            </p>
          </div>
          <div>
            <h4 className="font-orbitron text-sm uppercase tracking-widest text-white mb-4">Platform</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="hover:text-cyan-400 cursor-pointer">How it Works</li>
              <li className="hover:text-cyan-400 cursor-pointer">Success Stories</li>
              <li className="hover:text-cyan-400 cursor-pointer">Analytics</li>
            </ul>
          </div>
          <div>
            <h4 className="font-orbitron text-sm uppercase tracking-widest text-white mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="hover:text-cyan-400 cursor-pointer">Terms of Service</li>
              <li className="hover:text-cyan-400 cursor-pointer">Privacy Policy</li>
              <li className="hover:text-cyan-400 cursor-pointer">Support</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs">
          <p>© 2024 NOVA Technology Group. Built for the future.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
             <span>v2.4.1 (Stable)</span>
             <span className="text-cyan-400">System Online</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
