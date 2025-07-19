import Link from 'next/link'
import React from 'react'

export default function Sidebar() {
  return (
    <div>
      <div className="flex h-screen">
      <aside className="w-64 p-4 bg-gray-100 md:ml-10">
        <h2 className="text-xl font-bold mb-4">Product Engineering</h2>
        <ul>
          <li>
            <Link href="/admin/positions" className="block p-2 hover:bg-gray-200">
              Manage Positions
            </Link>
          </li>
          <li>
            <Link href="/admin/custom-tests" className="block p-2 hover:bg-gray-200">
              Create Custom Test
            </Link>
          </li>
          <li>
            <Link href="/admin/assign-tests" className="block p-2 hover:bg-gray-200">
              Assign Tests
            </Link>
          </li>
          <li>
            <Link href="/admin/results" className="block p-2 hover:bg-gray-200">
              View Results
            </Link>
          </li>
          <li>
            <Link href="/user/candidate" className="block p-2 hover:bg-gray-200">
              Candidate Tests
            </Link>
          </li>
        </ul>
      </aside>
    </div>
     </div>
  )
}
