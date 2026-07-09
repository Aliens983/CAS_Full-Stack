export type UserRole = 'user' | 'admin' | 'super_admin'

export interface UserInfo {
  id: number
  username: string
  email: string
  phone: string
  role: UserRole
  department: string
  avatar?: string
  createdAt: string
}

export type ServiceStatus = 'available' | 'busy' | 'maintenance'

export interface ServiceCard {
  id: number
  code: string
  name: string
  description: string
  type: 'room' | 'equipment' | 'consultation' | 'printing'
  category: string
  location: string
  priceLabel: string
  status: ServiceStatus
  tags: string[]
  image: string
}

export interface BookingRecord {
  id: number
  bookingNo: string
  serviceName: string
  type: 'room' | 'equipment' | 'consultation' | 'printing'
  applicant: string
  department: string
  location: string
  date: string
  timeRange: string
  status: BookingStatus
  createdAt: string
  remarks: string
}

export type BookingStatus = 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled'

export interface DashboardStat {
  label: string
  value: string
  trend: string
  tone: 'brand' | 'success' | 'warning' | 'danger'
}

export interface AdminSummary {
  totalUsers: number
  totalServices: number
  activeBookings: number
  approvalRate: string
}

export interface BookingDraft {
  targetId: number
  targetName: string
  date: string
  startTime: string
  endTime: string
  contactName: string
  contactPhone: string
  purpose: string
  remarks: string
}

export interface MessageItem {
  id: string
  type: 'approval' | 'system' | 'notice'
  title: string
  content: string
  time: string
  read: boolean
  unread: boolean
}

export interface Room {
  id: number
  name: string
  capacity: number
  location: string
  status: 'available' | 'maintenance'
}

export interface Equipment {
  id: number
  name: string
  type: string
  available: number
  total: number
  location: string
  status: 'available' | 'maintenance'
}

export interface Consultant {
  id: number
  name: string
  title: string
  department: string
  expertise: string[]
  schedule: string
  status: 'available' | 'busy'
}