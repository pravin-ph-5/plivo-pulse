// hah om sai ram om bhaskaraya namaha om namaha sivayaa 
// hah om sai ram om bhaskaraya namaha om namaha sivayaa 

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import Sidebar from "@/my_components/Sidebar"

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState("open")

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 border-r bg-white">
        <Sidebar />
      </div>

      {/* Main Dashboard Content */}
      <main className="flex-1 p-8 bg-gray-50 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-primary">Plivo Pulse</h1>
          <div className="text-sm text-gray-600">
            Page: <strong>Jira Bro</strong>
          </div>
        </header>

        <Tabs defaultValue="open" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="open">Open Incidents</TabsTrigger>
            <TabsTrigger value="all">All Incidents</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          </TabsList>

          <TabsContent value="open" className="mt-6">
            <div className="text-slate-600">No open incidents currently.</div>
          </TabsContent>

          <TabsContent value="all" className="mt-6">
            <div className="text-slate-600">View all reported incidents here.</div>
          </TabsContent>

          <TabsContent value="maintenance" className="mt-6">
            <div className="text-slate-600">All scheduled maintenances will show up here.</div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex gap-4">
          <Button>Create Incident</Button>
          <Button variant="secondary">Schedule Maintenance</Button>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
