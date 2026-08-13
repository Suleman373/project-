import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/Card/Card';
import styles from './Dashboard.module.css';
import { Users, Calendar, TrendingUp } from 'lucide-react';
import { useAuth } from '../../store/AuthContext';

export const Dashboard = () => {
  const { user } = useAuth();
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Welcome back, {user?.name || 'Doctor'}</h1>
        <p className={styles.subtitle}>Here is what's happening at your clinic today.</p>
      </div>

      <div className={styles.statsGrid}>
        <Card>
          <CardHeader>
            <CardDescription>Total Patients</CardDescription>
            <CardTitle className={styles.statValue}>1,248</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={styles.statTrend}>
              <TrendingUp className={styles.trendIcon} />
              <span className={styles.trendText}>+12% from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardDescription>Today's Appointments</CardDescription>
            <CardTitle className={styles.statValue}>24</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={styles.statTrend}>
              <Calendar className={styles.trendIconNeutral} />
              <span className={styles.trendTextNeutral}>4 pending confirmation</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>New Patients</CardDescription>
            <CardTitle className={styles.statValue}>12</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={styles.statTrend}>
              <Users className={styles.trendIcon} />
              <span className={styles.trendText}>This week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className={styles.recentSection}>
        <Card>
          <CardHeader>
            <CardTitle>Recent Appointments</CardTitle>
            <CardDescription>Upcoming schedule for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={styles.emptyState}>
              <Calendar className={styles.emptyIcon} />
              <h3>No more appointments</h3>
              <p>You have completed all appointments for today.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
