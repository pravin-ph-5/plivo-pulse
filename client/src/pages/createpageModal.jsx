// hah om sai ram om bhaskaraay namaha om namaha sivayaa 

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function CreatePageModal({ open, onClose }) {
  const navigate = useNavigate()

  const handleCreatePage = () => {
    onClose()
    navigate("/onboarding/create-page")
  }

  const handleViewPublic = () => {
    onClose()
    navigate("/plivo-public")
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-center">What would you like to do next?</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-4">
          <Button onClick={handleCreatePage} className="w-full">Create a Status Page</Button>
          <Button variant="outline" onClick={handleViewPublic} className="w-full">
            View Plivo’s Public Page
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
