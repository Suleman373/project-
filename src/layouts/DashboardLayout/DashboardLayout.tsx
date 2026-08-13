import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Stethoscope, 
  ClipboardList, 
  Pill,
  CreditCard,
  Settings,
  Bell,
  Search,
  Menu,
  LogOut
} from 'lucide-react';
import styles from './DashboardLayout.module.css';

const SIDEBAR_ITEMS = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { name: 'Appointments', icon: Calendar, path: '/appointments' },
  { name: 'Patients', icon: Users, path: '/patients' },
  { name: 'Dentists', icon: Stethoscope, path: '/dentists' },
  { name: 'Treatment Plans', icon: ClipboardList, path: '/treatments' },
  { name: 'Prescriptions', icon: Pill, path: '/prescriptions' },
  { name: 'Billing', icon: CreditCard, path: '/billing' },
];

const BOTTOM_ITEMS = [
  { name: 'Settings', icon: Settings, path: '/settings' },
];

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={clsx(styles.sidebar, !sidebarOpen && styles.sidebarCollapsed)}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logoContainer}>
            <div className={styles.logoIcon} />
            {sidebarOpen && <span className={styles.logoText}>Lumina Dental</span>}
          </div>
        </div>

        <nav className={styles.sidebarNav}>
          <ul className={styles.navList}>
            {SIDEBAR_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={clsx(styles.navItem, isActive && styles.navItemActive)}
                    title={!sidebarOpen ? item.name : undefined}
                  >
                    <Icon className={styles.navIcon} />
                    {sidebarOpen && <span className={styles.navText}>{item.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className={styles.navDivider} />

          <ul className={styles.navList}>
            {BOTTOM_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={clsx(styles.navItem, isActive && styles.navItemActive)}
                    title={!sidebarOpen ? item.name : undefined}
                  >
                    <Icon className={styles.navIcon} />
                    {sidebarOpen && <span className={styles.navText}>{item.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        {/* User Profile Summary */}
        <div className={styles.sidebarFooter}>
          <div className={styles.userProfile}>
            <div className={styles.userAvatar}>DR</div>
            {sidebarOpen && (
              <div className={styles.userInfo}>
                <span className={styles.userName}>Dr. Smith</span>
                <span className={styles.userRole}>Dentist</span>
              </div>
            )}
            {sidebarOpen && (
              <button className={styles.logoutButton} title="Logout">
                <LogOut className={styles.navIcon} />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={styles.mainContainer}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <button className={styles.iconButton} onClick={toggleSidebar}>
              <Menu className={styles.icon} />
            </button>
            
            <div className={styles.searchContainer}>
              <Search className={styles.searchIcon} />
              <input type="text" placeholder="Search patients, appointments..." className={styles.searchInput} />
            </div>
          </div>
          
          <div className={styles.headerRight}>
            <button className={styles.iconButton}>
              <Bell className={styles.icon} />
              <span className={styles.notificationBadge} />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
