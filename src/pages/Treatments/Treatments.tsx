import React, { useState } from 'react';
import { Search, Plus, ClipboardList, CheckCircle, Clock } from 'lucide-react';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { Select } from '../../components/Select/Select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/Table/Table';
import { Card } from '../../components/Card/Card';
import { Modal } from '../../components/Modal/Modal';
import styles from './Treatments.module.css';

// Mock Data
const MOCK_TREATMENTS = [
  { id: 'TP-2001', patient: 'Eleanor Shellstrop', dentist: 'Dr. Smith', dateCreated: '2023-11-10', cost: '$1,200.00', status: 'Active', procedureCount: 3 },
  { id: 'TP-2002', patient: 'Chidi Anagonye', dentist: 'Dr. Doe', dateCreated: '2023-11-12', cost: '$450.00', status: 'Pending Approval', procedureCount: 1 },
  { id: 'TP-2003', patient: 'Tahani Al-Jamil', dentist: 'Dr. Smith', dateCreated: '2023-10-05', cost: '$3,500.00', status: 'Completed', procedureCount: 4 },
  { id: 'TP-2004', patient: 'Jason Mendoza', dentist: 'Dr. Lee', dateCreated: '2023-11-18', cost: '$150.00', status: 'Active', procedureCount: 1 },
];

export const Treatments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredTreatments = MOCK_TREATMENTS.filter((tp) => {
    const matchesSearch = tp.patient.toLowerCase().includes(searchTerm.toLowerCase()) || tp.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' ? true : tp.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <span className={`${styles.badge} ${styles.badgeActive}`}>Active</span>;
      case 'Pending Approval':
        return <span className={`${styles.badge} ${styles.badgePending}`}>Pending</span>;
      case 'Completed':
        return <span className={`${styles.badge} ${styles.badgeCompleted}`}>Completed</span>;
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Treatment Plans</h1>
          <p className={styles.subtitle}>Manage comprehensive clinical treatment plans for patients.</p>
        </div>
        <Button leftIcon={<Plus />} onClick={() => setIsAddModalOpen(true)}>
          Create Plan
        </Button>
      </div>

      <Card className={styles.tableCard}>
        <div className={styles.tableToolbar}>
          <div className={styles.filters}>
            <div className={styles.searchWrapper}>
              <Input
                placeholder="Search patient or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search />}
                fullWidth
              />
            </div>
            <div className={styles.filterGroup}>
              <Select
                options={[
                  { label: 'All Statuses', value: 'All' },
                  { label: 'Active', value: 'Active' },
                  { label: 'Pending Approval', value: 'Pending Approval' },
                  { label: 'Completed', value: 'Completed' },
                ]}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              />
            </div>
            {(searchTerm || statusFilter !== 'All') && (
              <Button variant="ghost" onClick={() => { setSearchTerm(''); setStatusFilter('All'); }}>
                Clear
              </Button>
            )}
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Plan ID</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Dentist</TableHead>
              <TableHead>Procedures</TableHead>
              <TableHead>Total Cost</TableHead>
              <TableHead>Date Created</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTreatments.length > 0 ? (
              filteredTreatments.map((tp) => (
                <TableRow key={tp.id}>
                  <TableCell className={styles.fontMedium}>{tp.id}</TableCell>
                  <TableCell>{tp.patient}</TableCell>
                  <TableCell>{tp.dentist}</TableCell>
                  <TableCell>{tp.procedureCount} item(s)</TableCell>
                  <TableCell>{tp.cost}</TableCell>
                  <TableCell>{tp.dateCreated}</TableCell>
                  <TableCell>{getStatusBadge(tp.status)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className={styles.emptyCell}>
                  No treatment plans found matching the filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Create Treatment Plan"
        description="Draft a new clinical treatment plan."
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsAddModalOpen(false)}>Save Draft</Button>
          </>
        }
      >
        <div className={styles.formGrid}>
          <div className={styles.fullSpan}>
            <Input label="Search Patient" placeholder="Type name or ID..." leftIcon={<Search />} fullWidth />
          </div>
          
          <Select
            label="Assigned Dentist"
            options={[
              { label: 'Dr. Smith', value: 'Dr. Smith' },
              { label: 'Dr. Doe', value: 'Dr. Doe' },
            ]}
            fullWidth
          />
          
          <Select
            label="Initial Status"
            options={[
              { label: 'Pending Approval', value: 'Pending Approval' },
              { label: 'Active', value: 'Active' },
            ]}
            fullWidth
          />
          
          <div className={styles.fullSpan}>
            <Input label="Primary Diagnosis" placeholder="e.g. Periodontal disease, localized" fullWidth />
          </div>

          <div className={styles.fullSpan}>
            <div className={styles.procedureSection}>
              <h4 className={styles.sectionTitle}>Add Initial Procedure</h4>
              <div className={styles.procedureGrid}>
                <Input placeholder="Procedure Name (e.g. Root Canal)" fullWidth />
                <Input placeholder="Tooth # (Optional)" fullWidth />
                <Input type="number" placeholder="Cost ($)" fullWidth />
              </div>
              <Button variant="outline" size="sm" className={styles.addProcedureBtn} leftIcon={<Plus />}>
                Add Another Procedure
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
