'use client'

const activities = [
  {
    id: 1,
    type: 'member_joined',
    member: 'John Smith',
    time: '2 hours ago',
    description: 'Joined Fundamentals class',
  },
  {
    id: 2,
    type: 'belt_promotion',
    member: 'Maria Garcia',
    time: '1 day ago',
    description: 'Promoted to Blue Belt',
  },
  {
    id: 3,
    type: 'attendance',
    member: 'Mike Johnson',
    time: '2 days ago',
    description: 'Checked in to No-Gi Competition',
  },
  {
    id: 4,
    type: 'payment',
    member: 'Sarah Wilson',
    time: '3 days ago',
    description: 'Monthly subscription payment received',
  },
]

const getActivityColor = (type: string) => {
  switch (type) {
    case 'member_joined':
      return 'bg-blue-100 text-blue-800'
    case 'belt_promotion':
      return 'bg-purple-100 text-purple-800'
    case 'attendance':
      return 'bg-green-100 text-green-800'
    case 'payment':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export default function RecentActivity() {
  return (
    <div className="card">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
      </div>
      
      <div className="divide-y divide-gray-200">
        {activities.map((activity) => (
          <div key={activity.id} className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getActivityColor(activity.type)}`}>
                  {activity.type.replace('_', ' ')}
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.member}</p>
                  <p className="text-sm text-gray-500">{activity.description}</p>
                </div>
              </div>
              <span className="text-sm text-gray-400">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="px-6 py-3 bg-gray-50">
        <button className="text-sm text-primary-600 hover:text-primary-500 font-medium">
          View all activity →
        </button>
      </div>
    </div>
  )
}