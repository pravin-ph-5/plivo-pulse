// hah om sai ram om bhaskarayaa namaha om namaha sivayaa 
// hah om sai ram om bhaskarayaa namaha om namaha sivayaa 

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useState } from "react"
import axios from "axios" // axios instance
import useAuthStore from "@/store/useAuthStore" // Zustand store

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)
  const [errorMsg, setErrorMsg] = useState("")

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/api/users/login", data)
      setAuth(res.data.user, res.data.token)
      navigate("/dashboard")
    } catch (error) {
      console.error("Login failed", error)
      setErrorMsg(error.response?.data?.message || "Login failed. Try again.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-muted">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-center mb-4">Sign in to your account</h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Welcome back to Plivo Pulse
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: "Invalid email format"
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
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
          </div>
          {errorMsg && <p className="text-red-500 text-sm text-center">{errorMsg}</p>}
          <Button className="w-full" type="submit">Sign In</Button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-primary font-medium hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}
