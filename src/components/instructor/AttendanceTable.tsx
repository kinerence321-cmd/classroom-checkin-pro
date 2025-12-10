import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';
import type { AttendanceRecord } from '@/types';

interface AttendanceTableProps {
  records: AttendanceRecord[];
  enrolledCount: number;
}

export function AttendanceTable({ records, enrolledCount }: AttendanceTableProps) {
  const presentCount = records.filter(r => r.status === 'present').length;
  const lateCount = records.filter(r => r.status === 'late').length;
  const absentCount = enrolledCount - presentCount - lateCount;

  const getStatusIcon = (status: AttendanceRecord['status']) => {
    switch (status) {
      case 'present':
        return <CheckCircle2 className="h-4 w-4 text-success" />;
      case 'late':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'absent':
        return <XCircle className="h-4 w-4 text-destructive" />;
    }
  };

  const getStatusBadge = (status: AttendanceRecord['status']) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-success/10 text-success border-success/20">Present</Badge>;
      case 'late':
        return <Badge className="bg-warning/10 text-warning border-warning/20">Late</Badge>;
      case 'absent':
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Absent</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-lg bg-success/10 p-4 text-center">
          <p className="text-2xl font-bold text-success">{presentCount}</p>
          <p className="text-sm text-success/80">Present</p>
        </div>
        <div className="rounded-lg bg-warning/10 p-4 text-center">
          <p className="text-2xl font-bold text-warning">{lateCount}</p>
          <p className="text-sm text-warning/80">Late</p>
        </div>
        <div className="rounded-lg bg-destructive/10 p-4 text-center">
          <p className="text-2xl font-bold text-destructive">{absentCount}</p>
          <p className="text-sm text-destructive/80">Absent</p>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Time</TableHead>
              <TableHead className="hidden md:table-cell">Location</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                  No attendance records yet
                </TableCell>
              </TableRow>
            ) : (
              records.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(record.status)}
                      {record.studentName}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(record.status)}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(record.timestamp).toLocaleTimeString()}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                    {record.locationCoordinate.latitude.toFixed(4)}, {record.locationCoordinate.longitude.toFixed(4)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
