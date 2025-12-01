export interface Leave {
  id: string;
  userId: string;
  date: string;
  reason: string;
  remarks?: string;
}

export interface DashboardStats {
  totalLeaves: number;
  remainingPaidLeaves: number;
  lastLeave?: Leave;
  upcomingLeave?: Leave;
}
