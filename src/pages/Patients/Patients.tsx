import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, UserCircle, MoreVertical } from 'lucide-react';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/Table/Table';
import { Card } from '../../components/Card/Card';
import { Modal } from '../../components/Modal/Modal';
import styles from './Patients.module.css';

// Mock Data
const MOCK_PATIENTS = [
  { id: 'PT-1001', name: 'Eleanor Shellstrop', contact: '+1 (555) 123-4567', lastVisit: '2023-10-15', status: 'Active' },
  { id: 'PT-1002', name: 'Chidi Anagonye', contact: '+1 (555) 234-5678', lastVisit: '2023-09-22', status: 'Active' },
  { id: 'PT-1003', name: 'Tahani Al-Jamil', contact: '+1 (555) 345-6789', lastVisit: '2023-11-01', status: 'Active' },
  { id: 'PT-1004', name: 'Jason Mendoza', contact: '+1 (555) 456-7890', lastVisit: '2022-12-10', status: 'Inactive' },
  { id: 'PT-1005', name: 'Michael Realman', contact: '+1 (555) 567-8901', lastVisit: '2023-10-28', status: 'Active' },
];

export const Patients = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredPatients = MOCK_PATIENTS.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Patients</h1>
          <p className={styles.subtitle}>Manage your clinic's patient records.</p>
        </div>
        <Button leftIcon={<Plus />} onClick={() => setIsAddModalOpen(true)}>
          Add Patient
        </Button>
      </div>

      <Card className={styles.tableCard}>
        <div className={styles.tableToolbar}>
          <div className={styles.searchWrapper}>
            <Input
              placeholder="Search patients by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search />}
              fullWidth
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Last Visit</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className={styles.actionsHead}>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <TableRow key={patient.id} className={styles.clickableRow} onClick={() => navigate(`/patients/${patient.id}`)}>
                  <TableCell className={styles.fontMedium}>{patient.id}</TableCell>
                  <TableCell>
                    <div className={styles.patientNameCell}>
                      <UserCircle className={styles.avatarIcon} />
                      {patient.name}
                    </div>
                  </TableCell>
                  <TableCell>{patient.contact}</TableCell>
                  <TableCell>{patient.lastVisit}</TableCell>
                  <TableCell>
                    <span className={patient.status === 'Active' ? styles.statusActive : styles.statusInactive}>
                      {patient.status}
                    </span>
                  </TableCell>
                  <TableCell className={styles.actionsCell}>
                    <button className={styles.iconButton} onClick={(e) => {
                      e.stopPropagation();
                      // Open menu
                    }}>
                      <MoreVertical className={styles.actionIcon} />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className={styles.emptyCell}>
                  No patients found matching "{searchTerm}"
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Patient"
        description="Enter the patient's basic information to register them."
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsAddModalOpen(false)}>Save Patient</Button>
          </>
        }
      >
        <div className={styles.formGrid}>
          <Input label="First Name" placeholder="John" fullWidth />
          <Input label="Last Name" placeholder="Doe" fullWidth />
          <Input label="Email Address" type="email" placeholder="john@example.com" fullWidth />
          <Input label="Phone Number" type="tel" placeholder="+1 (555) 000-0000" fullWidth />
          <div className={styles.fullSpan}>
            <Input label="Address" placeholder="123 Main St" fullWidth />
          </div>
        </div>
      </Modal>
    </div>
  );
};
