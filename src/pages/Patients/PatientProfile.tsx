import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Calendar, FileText, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '../../components/Button/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/Card/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/Tabs/Tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/Table/Table';
import styles from './PatientProfile.module.css';

export const PatientProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock fetching patient data
  const patient = {
    id: id || 'PT-1001',
    name: 'Eleanor Shellstrop',
    dob: '1988-04-14',
    gender: 'Female',
    contact: '+1 (555) 123-4567',
    email: 'eleanor@example.com',
    address: '123 Fake St, Neighborhood, City',
    status: 'Active',
    joinedDate: '2022-01-15'
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <button className={styles.backButton} onClick={() => navigate('/patients')}>
            <ArrowLeft className={styles.backIcon} />
          </button>
          <div>
            <h1 className={styles.title}>{patient.name}</h1>
            <div className={styles.badges}>
              <span className={styles.badgeId}>{patient.id}</span>
              <span className={patient.status === 'Active' ? styles.badgeActive : styles.badgeInactive}>
                {patient.status}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.headerRight}>
          <Button variant="outline" leftIcon={<Edit />}>Edit Profile</Button>
          <Button leftIcon={<Calendar />}>Book Appointment</Button>
        </div>
      </div>

      <div className={styles.grid}>
        {/* Left Column - Quick Info */}
        <div className={styles.sidebar}>
          <Card>
            <CardHeader>
              <CardTitle className={styles.cardTitle}>Contact Info</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className={styles.infoList}>
                <li className={styles.infoItem}>
                  <Phone className={styles.infoIcon} />
                  <span>{patient.contact}</span>
                </li>
                <li className={styles.infoItem}>
                  <Mail className={styles.infoIcon} />
                  <span>{patient.email}</span>
                </li>
                <li className={styles.infoItem}>
                  <MapPin className={styles.infoIcon} />
                  <span>{patient.address}</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className={styles.cardTitle}>Personal Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={styles.personalGrid}>
                <div className={styles.personalItem}>
                  <span className={styles.personalLabel}>Date of Birth</span>
                  <span className={styles.personalValue}>{patient.dob}</span>
                </div>
                <div className={styles.personalItem}>
                  <span className={styles.personalLabel}>Gender</span>
                  <span className={styles.personalValue}>{patient.gender}</span>
                </div>
                <div className={styles.personalItem}>
                  <span className={styles.personalLabel}>Joined Date</span>
                  <span className={styles.personalValue}>{patient.joinedDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Tabs */}
        <div className={styles.mainContent}>
          <Card className={styles.tabsCard}>
            <Tabs defaultValue="overview">
              <TabsList className={styles.tabsList}>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="history">Dental History</TabsTrigger>
                <TabsTrigger value="plans">Treatment Plans</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>
              
              <div className={styles.tabsContainer}>
                <TabsContent value="overview">
                  <div className={styles.overviewSection}>
                    <h3 className={styles.sectionTitle}>Upcoming Appointments</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date & Time</TableHead>
                          <TableHead>Dentist</TableHead>
                          <TableHead>Reason</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>2023-11-20 10:00 AM</TableCell>
                          <TableCell>Dr. Smith</TableCell>
                          <TableCell>Routine Cleaning</TableCell>
                          <TableCell>
                            <span className={styles.badgeScheduled}>Scheduled</span>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                
                <TabsContent value="history">
                  <div className={styles.emptyState}>
                    <FileText className={styles.emptyIcon} />
                    <p>No dental history records found.</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="plans">
                  <div className={styles.emptyState}>
                    <FileText className={styles.emptyIcon} />
                    <p>No active treatment plans.</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="documents">
                  <div className={styles.emptyState}>
                    <FileText className={styles.emptyIcon} />
                    <p>No documents uploaded yet.</p>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};
