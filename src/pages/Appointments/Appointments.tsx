import React, { useState } from 'react';
import { Calendar as CalendarIcon, Plus, User, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { Select } from '../../components/Select/Select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/Table/Table';
import { Card } from '../../components/Card/Card';
import { Modal } from '../../components/Modal/Modal';
import styles from './Appointments.module.css';

// Mock Data
const MOCK_APPOINTMENTS = [
  { id: 'APT-001', patient: 'Eleanor Shellstrop', dentist: 'Dr. Smith', date: '2023-11-20', time: '10:00 AM', reason: 'Routine Cleaning', status: 'Scheduled' },
  { id: 'APT-002', patient: 'Chidi Anagonye', dentist: 'Dr. Doe', date: '2023-11-20', time: '11:30 AM', reason: 'Toothache', status: 'In Progress' },
  { id: 'APT-003', patient: 'Tahani Al-Jamil', dentist: 'Dr. Smith', date: '2023-11-20', time: '02:00 PM', reason: 'Whitening', status: 'Scheduled' },
  { id: 'APT-004', patient: 'Jason Mendoza', dentist: 'Dr. Lee', date: '2023-11-19', time: '09:00 AM', reason: 'Cavity Fill', status: 'Completed' },
  { id: 'APT-005', patient: 'Michael Realman', dentist: 'Dr. Doe', date: '2023-11-19', time: '03:00 PM', reason: 'Consultation', status: 'Cancelled' },
];

export const Appointments = () => {
  const [dateFilter, setDateFilter] = useState('');
  const [dentistFilter, setDentistFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredAppointments = MOCK_APPOINTMENTS.filter((apt) => {
    const matchesDate = dateFilter ? apt.date === dateFilter : true;
    const matchesDentist = dentistFilter === 'All' ? true : apt.dentist === dentistFilter;
    return matchesDate && matchesDentist;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return <span className={`${styles.badge} ${styles.badgeScheduled}`}>Scheduled</span>;
      case 'In Progress':
        return <span className={`${styles.badge} ${styles.badgeInProgress}`}>In Progress</span>;
      case 'Completed':
        return <span className={`${styles.badge} ${styles.badgeCompleted}`}>Completed</span>;
      case 'Cancelled':
        return <span className={`${styles.badge} ${styles.badgeCancelled}`}>Cancelled</span>;
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Appointments</h1>
          <p className={styles.subtitle}>Manage your clinic's schedule and bookings.</p>
        </div>
        <Button leftIcon={<Plus />} onClick={() => setIsAddModalOpen(true)}>
          New Appointment
        </Button>
      </div>

      <Card className={styles.tableCard}>
        <div className={styles.tableToolbar}>
          <div className={styles.filters}>
            <div className={styles.filterGroup}>
              <Input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                leftIcon={<CalendarIcon />}
              />
            </div>
            <div className={styles.filterGroup}>
              <Select
                options={[
                  { label: 'All Dentists', value: 'All' },
                  { label: 'Dr. Smith', value: 'Dr. Smith' },
                  { label: 'Dr. Doe', value: 'Dr. Doe' },
                  { label: 'Dr. Lee', value: 'Dr. Lee' },
                ]}
                value={dentistFilter}
                onChange={(e) => setDentistFilter(e.target.value)}
              />
            </div>
            {(dateFilter || dentistFilter !== 'All') && (
              <Button variant="ghost" onClick={() => { setDateFilter(''); setDentistFilter('All'); }}>
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Dentist</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className={styles.actionsHead}>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((apt) => (
                <TableRow key={apt.id}>
                  <TableCell>
                    <div className={styles.timeCell}>
                      <Clock className={styles.smallIcon} />
                      <span className={styles.fontMedium}>{apt.time}</span>
                      <span className={styles.dateText}>{apt.date}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={styles.patientCell}>
                      <User className={styles.smallIcon} />
                      {apt.patient}
                    </div>
                  </TableCell>
                  <TableCell>{apt.dentist}</TableCell>
                  <TableCell>{apt.reason}</TableCell>
                  <TableCell>{getStatusBadge(apt.status)}</TableCell>
                  <TableCell className={styles.actionsCell}>
                    <div className={styles.actionButtons}>
                      {apt.status === 'Scheduled' && (
                        <>
                          <button className={styles.iconButtonSuccess} title="Mark Completed">
                            <CheckCircle className={styles.actionIcon} />
                          </button>
                          <button className={styles.iconButtonDanger} title="Cancel">
                            <XCircle className={styles.actionIcon} />
                          </button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className={styles.emptyCell}>
                  No appointments found for the selected filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Book Appointment"
        description="Schedule a new appointment for a patient."
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsAddModalOpen(false)}>Book Appointment</Button>
          </>
        }
      >
        <div className={styles.formGrid}>
          <div className={styles.fullSpan}>
            <Input label="Search Patient" placeholder="Type name or ID..." leftIcon={<User />} fullWidth />
          </div>
          
          <Input label="Date" type="date" fullWidth />
          <Input label="Time" type="time" fullWidth />
          
          <Select
            label="Dentist"
            options={[
              { label: 'Dr. Smith', value: 'Dr. Smith' },
              { label: 'Dr. Doe', value: 'Dr. Doe' },
              { label: 'Dr. Lee', value: 'Dr. Lee' },
            ]}
            fullWidth
          />
          
          <Select
            label="Reason for Visit"
            options={[
              { label: 'Routine Cleaning', value: 'Cleaning' },
              { label: 'Consultation', value: 'Consultation' },
              { label: 'Whitening', value: 'Whitening' },
              { label: 'Toothache / Emergency', value: 'Emergency' },
              { label: 'Other', value: 'Other' },
            ]}
            fullWidth
          />
          
          <div className={styles.fullSpan}>
            <Input label="Additional Notes" placeholder="Any special requests or symptoms..." fullWidth />
          </div>
        </div>
      </Modal>
    </div>
  );
};
