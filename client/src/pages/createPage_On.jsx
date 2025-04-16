// hah om sai ram om bhaskaraya namaha om namaha sivayaa 
// hah om sai ram om bhaskaraya namaha om namaha sivayaa
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import instance from "@/utils/axios" // Your Axios instance
import useAuthStore from "@/store/useAuthStore"

export default function CreatePage() {
  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const navigate = useNavigate()
  const { token } = useAuthStore() // Get token from Zustand store

  const handleCreatePage = async () => {
    try {
      const res = await instance.post(
        "/pages",
        { name, slug },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const pageId = res.data._id

      // Automatically create default component (e.g., "API")
      await instance.post(
        `/pages/${pageId}/components`,
        {
          name: "API",
          status: "operational",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      // Redirect to next onboarding step
      navigate("/onboarding/add-components")
    } catch (err) {
      console.error("Failed to create page or default component:", err)
      alert("Something went wrong. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-white px-4 md:px-8 py-10">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Create your page</h1>
        <p className="text-gray-500 mb-10">
          This page will be used to share your system status publicly. You can change everything later.
        </p>

        <div className="space-y-6">
          <div>
            <Label htmlFor="pageName" className="text-base text-gray-700">
              Page name
            </Label>
            <Input
              id="pageName"
              placeholder="Acme Inc"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="slug" className="text-base text-gray-700">
              Slug (URL path)
            </Label>
            <Input
              id="slug"
              placeholder="acme-inc"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="mt-2"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Your page will be accessible at:{" "}
              <span className="font-semibold text-black">plivopulse.com/status/{slug || "your-slug"}</span>
            </p>
          </div>

          <Button className="w-full mt-6" onClick={handleCreatePage}>
            Create Page
          </Button>
        </div>
      </div>
    </div>
  )
}
