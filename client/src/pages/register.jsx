// hah om sai ram om bhaskaraaya namaha om namaha sivayaa 
// hah om sai ram om bhaskaraya namaha om namaha sivayaa

import { useForm } from "react-hook-form"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import CreatePageModal from "./CreatePageModal"
import useAuthStore from "@/store/useAuthStore"
import instance from "@/utils/axios"
import axios from "axios"


export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [showModal, setShowModal] = useState(false)
  const setAuth = useAuthStore((state) => state.setAuth)

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/api/users/register", data)
      const { user, token } = res.data

      // Store in Zustand and localStorage
      setAuth({ user, token })
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))

      setShowModal(true)
    } catch (err) {
      console.error("Registration failed:", err)
      alert(err?.response?.data?.message || "Failed to register")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-muted">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-center mb-4">Create an account</h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Start monitoring your services with Plivo Pulse
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <Input
              id="name"
              placeholder="John Doe"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: "Invalid email format",
                }
              })}
            />
            {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" }
              })}
            />
            {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
          </div>
          <Button className="w-full" type="submit">Create Account</Button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-6">
          Already have an account?{" "}
          <Link to="/signin" className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>

      {/* Modal */}
      <CreatePageModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  )
}
