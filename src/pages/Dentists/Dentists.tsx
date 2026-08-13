import React, { useState } from 'react';
import { Search, Plus, Phone, Mail, UserPlus, Star } from 'lucide-react';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { Card, CardContent, CardFooter, CardHeader } from '../../components/Card/Card';
import { Modal } from '../../components/Modal/Modal';
import styles from './Dentists.module.css';

// Mock Data
const MOCK_DENTISTS = [
  { id: 'DR-001', name: 'Dr. John Smith', specialty: 'General Dentist', email: 'jsmith@luminadental.com', phone: '+1 (555) 987-6543', rating: 4.9, activePatients: 412, avatar: 'JS' },
  { id: 'DR-002', name: 'Dr. Jane Doe', specialty: 'Orthodontist', email: 'jdoe@luminadental.com', phone: '+1 (555) 876-5432', rating: 5.0, activePatients: 320, avatar: 'JD' },
  { id: 'DR-003', name: 'Dr. David Lee', specialty: 'Endodontist', email: 'dlee@luminadental.com', phone: '+1 (555) 765-4321', rating: 4.8, activePatients: 198, avatar: 'DL' },
  { id: 'DR-004', name: 'Dr. Emily Chen', specialty: 'Pediatric Dentist', email: 'echen@luminadental.com', phone: '+1 (555) 654-3210', rating: 4.9, activePatients: 512, avatar: 'EC' },
];

export const Dentists = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredDentists = MOCK_DENTISTS.filter((dr) =>
    dr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dr.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Dentists & Staff</h1>
          <p className={styles.subtitle}>Manage your clinic's dental professionals.</p>
        </div>
        <Button leftIcon={<Plus />} onClick={() => setIsAddModalOpen(true)}>
          Add Staff
        </Button>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchWrapper}>
          <Input
            placeholder="Search by name or specialty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search />}
            fullWidth
          />
        </div>
      </div>

      <div className={styles.grid}>
        {filteredDentists.length > 0 ? (
          filteredDentists.map((dr) => (
            <Card key={dr.id} className={styles.staffCard}>
              <CardHeader className={styles.cardHeader}>
                <div className={styles.avatar}>{dr.avatar}</div>
                <div className={styles.staffInfo}>
                  <h3 className={styles.staffName}>{dr.name}</h3>
                  <span className={styles.staffSpecialty}>{dr.specialty}</span>
                </div>
              </CardHeader>
              <CardContent className={styles.cardContent}>
                <ul className={styles.contactList}>
                  <li>
                    <Mail className={styles.contactIcon} />
                    <span>{dr.email}</span>
                  </li>
                  <li>
                    <Phone className={styles.contactIcon} />
                    <span>{dr.phone}</span>
                  </li>
                </ul>
                <div className={styles.statsRow}>
                  <div className={styles.stat}>
                    <Star className={styles.statIcon} />
                    <span className={styles.statValue}>{dr.rating}</span>
                  </div>
                  <div className={styles.stat}>
                    <UserPlus className={styles.statIconNeutral} />
                    <span className={styles.statValue}>{dr.activePatients} Patients</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className={styles.cardFooter}>
                <Button variant="outline" fullWidth>View Schedule</Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className={styles.emptyState}>
            <p>No staff members found matching "{searchTerm}"</p>
          </div>
        )}
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Staff Member"
        description="Register a new dentist or staff member to the clinic."
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsAddModalOpen(false)}>Add Staff</Button>
          </>
        }
      >
        <div className={styles.formGrid}>
          <Input label="Full Name" placeholder="Dr. Sarah Connor" fullWidth />
          <Input label="Specialty" placeholder="e.g. Oral Surgeon" fullWidth />
          <Input label="Email Address" type="email" placeholder="sarah@luminadental.com" fullWidth />
          <Input label="Phone Number" type="tel" placeholder="+1 (555) 000-0000" fullWidth />
        </div>
      </Modal>
    </div>
  );
};
