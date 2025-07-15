'use client'

import { UsersIcon, CalendarIcon, CurrencyDollarIcon, ChartBarIcon } from '@heroicons/react/24/outline'

const stats = [
  {
    name: 'Active Students',
    value: '67',
    change: '+2',
    changeType: 'positive',
    icon: UsersIcon,
  },
  {
    name: 'Classes This Week',
    value: '18',
    change: '+1',
    changeType: 'positive',
    icon: CalendarIcon,
  },
  {
    name: 'Monthly Revenue',
    value: '$6,230',
    change: '+12%',
    changeType: 'positive',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'Attendance Rate',
    value: '84%',
    change: '+3%',
    changeType: 'positive',
    icon: ChartBarIcon,
  },
]

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.name} className="card">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {stat.name}
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </div>
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}