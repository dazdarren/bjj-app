import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import StatsCards from '@/components/StatsCards'
import RecentActivity from '@/components/RecentActivity'

export default function DashboardPage() {
  const { userId } = auth()

  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening at your gym.</p>
        </div>

        <StatsCards />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivity />
          
          <div className="card">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-6 space-y-4">
              <button className="w-full btn-primary">
                Add New Member
              </button>
              <button className="w-full btn-secondary">
                Check-in Student
              </button>
              <button className="w-full btn-secondary">
                Schedule Class
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}