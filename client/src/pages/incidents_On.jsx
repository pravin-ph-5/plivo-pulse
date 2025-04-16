// hah om sai ram om bhaskaraya namaha om namaha sivayaa 

import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"

const IncidentsOnboarding = () => {
  const navigate = useNavigate()

  const handleSaveAndExit = () => {
    navigate("/dashboard")
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-12">
      <div className="bg-white shadow-lg rounded-xl max-w-3xl w-full p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-slate-800">Create a Sample Incident</h2>
        <p className="text-sm text-slate-600">
          This is just a demo to show how incident creation works. You can always add more incidents later.
        </p>

        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <input
              type="text"
              id="title"
              placeholder="E.g., API Service Interruption"
              className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe what’s going wrong..."
              rows={4}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSaveAndExit}>Save & Exit</Button>
        </div>
      </div>
    </section>
  )
}

export default IncidentsOnboarding
