// hah om sai ram om bhaskaraya namaha om namaha sivayaa 

// src/pages/AddComponents.jsx
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function AddComponents() {
  const navigate = useNavigate()

  const handleNext = () => {
    navigate("/onboarding/incidents")
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white px-6 py-12">
      {/* Sidebar/Instruction */}
      <div className="lg:w-1/2 mb-6 lg:mb-0">
        <h2 className="text-2xl font-bold mb-2">Add Some Components</h2>
        <p className="text-gray-600 mb-4">
          Components represent parts of your service (e.g. API, Website).
          We’ve created a demo “API” for you. You can add more now or later.
        </p>
        <Button onClick={handleNext} className="mt-4">Next</Button>
      </div>

      {/* Example Components */}
      <div className="lg:w-1/2">
        <div className="grid gap-4">
          <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
            <h3 className="font-medium text-lg">API</h3>
            <p className="text-gray-500 text-sm">This is a demo component created for you.</p>
          </div>
          <div className="p-4 border rounded-lg shadow-sm bg-gray-50 cursor-pointer hover:bg-gray-100">
            <Button variant="outline" onClick={() => navigate("/onboarding/add-components-form")}>
              + Add New Component
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
