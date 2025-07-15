import { SignInButton, SignUpButton, UserButton, auth } from '@clerk/nextjs'
import Link from 'next/link'

export default function HomePage() {
  const { userId } = auth()

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">
                Jiu-Jitsu SaaS
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {userId ? (
                <>
                  <Link href="/dashboard" className="btn-primary">
                    Dashboard
                  </Link>
                  <UserButton afterSignOutUrl="/" />
                </>
              ) : (
                <>
                  <SignInButton>
                    <button className="btn-secondary">Sign In</button>
                  </SignInButton>
                  <SignUpButton>
                    <button className="btn-primary">Start Free Trial</button>
                  </SignUpButton>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                Manage Your Jiu-Jitsu Gym
                <span className="block text-primary-600">with Ease</span>
              </h1>
              <p className="mt-6 text-xl text-gray-500 max-w-3xl mx-auto">
                Complete member management, attendance tracking, class scheduling, 
                and automated billing for your Jiu-Jitsu academy.
              </p>
              
              <div className="mt-10 flex justify-center space-x-6">
                {!userId && (
                  <SignUpButton>
                    <button className="btn-primary text-lg px-8 py-3">
                      Start Free Trial
                    </button>
                  </SignUpButton>
                )}
              </div>
            </div>

            <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="card">
                <div className="px-6 py-8">
                  <h3 className="text-lg font-medium text-gray-900">
                    Member Management
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Track student profiles, belt progression, and emergency contacts
                  </p>
                </div>
              </div>

              <div className="card">
                <div className="px-6 py-8">
                  <h3 className="text-lg font-medium text-gray-900">
                    Attendance Tracking
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Digital check-in kiosk and automated attendance reports
                  </p>
                </div>
              </div>

              <div className="card">
                <div className="px-6 py-8">
                  <h3 className="text-lg font-medium text-gray-900">
                    Automated Billing
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Stripe integration with tiered pricing and overage charges
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}