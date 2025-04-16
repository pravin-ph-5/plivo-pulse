// hah om sai ram om bhaskaraya namaha om namaha sivayaa 

// src/pages/AddComponentForm.jsx
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function AddComponentForm() {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // logic to save component
    navigate("/onboarding/incidents") // next screen after component creation
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-white">
      <h1 className="text-2xl font-bold mb-4">Create Component</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <input
          type="text"
          placeholder="Component Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          required
        />
        <textarea
          placeholder="Description (optional)"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <div className="flex justify-between">
          <Button type="submit">Next</Button>
          <Button type="button" variant="outline" onClick={() => navigate("/onboarding/add-components")}>
            Back
          </Button>
        </div>
      </form>
    </div>
  )
}
