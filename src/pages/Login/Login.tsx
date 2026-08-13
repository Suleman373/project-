import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '../../store/AuthContext';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { Select } from '../../components/Select/Select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/Card/Card';
import styles from './Login.module.css';

const ROLE_OPTIONS = [
  { label: 'Super Admin', value: 'Super Admin' },
  { label: 'Clinic Admin', value: 'Clinic Admin' },
  { label: 'Dentist', value: 'Dentist' },
  { label: 'Receptionist', value: 'Receptionist' },
  { label: 'Dental Assistant', value: 'Dental Assistant' },
  { label: 'Accountant', value: 'Accountant' },
];

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('Dentist');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, role);
      navigate('/');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <div className={styles.brandContainer}>
          <div className={styles.logoIcon} />
          <h1 className={styles.brandName}>Lumina Dental</h1>
        </div>
        <div className={styles.illustration}>
          <h2 className={styles.heroText}>
            Modernizing dental practice management.
          </h2>
          <p className={styles.subHeroText}>
            Everything you need to manage patients, appointments, and billing in one beautiful platform.
          </p>
        </div>
      </div>
      
      <div className={styles.rightPanel}>
        <Card className={styles.loginCard}>
          <CardHeader>
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className={styles.form}>
              <Input
                label="Email"
                type="email"
                placeholder="doctor@luminadental.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
              />
              
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
              />

              <Select
                label="Role (Mock Login)"
                options={ROLE_OPTIONS}
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                fullWidth
              />
              
              <div className={styles.forgotPassword}>
                <a href="#" className={styles.link}>Forgot your password?</a>
              </div>

              <Button type="submit" fullWidth isLoading={isLoading}>
                Sign in
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
