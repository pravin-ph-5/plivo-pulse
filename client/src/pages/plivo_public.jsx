// hah om sai ram om bhaskaraya namaha om namaha sivayaa 

import { Button } from "@/components/ui/button"

const components = [
  { name: "API (example)", uptime: "100.0%", status: "Operational" },
  { name: "Management Portal (example)", uptime: "100.0%", status: "Operational" },
  { name: "Plivo CRM", uptime: "100.0%", status: "Operational" },
  { name: "Plivo E-Commerce", uptime: "100.0%", status: "Operational" },
]

export default function PlivoPublic() {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Plivo</h1>
          <Button variant="default" className="mt-4 sm:mt-0">Subscribe to Updates</Button>
        </div>

        {/* Banner */}
        <div className="bg-green-600 text-white font-semibold text-center py-3 rounded-md mb-6">
          All Systems Operational
        </div>

        {/* Uptime Info */}
        <div className="text-sm text-gray-600 mb-2 text-right">
          Uptime over the past 90 days. <a href="#" className="underline">View historical uptime</a>
        </div>

        {/* Component Status Cards */}
        <div className="space-y-4">
          {components.map((comp, idx) => (
            <div key={idx} className="bg-gray-100 rounded-md p-4 shadow-sm border">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="text-gray-800 font-medium mb-2 md:mb-0">{comp.name}</div>
                <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between md:ml-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-0.5">
                      {/* Simulated uptime bars */}
                      {Array.from({ length: 30 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-1 h-4 ${i < 28 ? "bg-gray-400" : "bg-green-500"}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-2">90 days ago</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-2 md:mt-0 md:ml-4">{comp.uptime} uptime</div>
                  <div className="text-sm text-green-600 font-semibold mt-2 md:mt-0 md:ml-4">{comp.status}</div>
                  <div className="text-xs text-gray-400 mt-1 md:hidden">Today</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
