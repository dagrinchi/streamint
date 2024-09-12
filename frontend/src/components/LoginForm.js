import React from 'react'
import { useForm } from 'react-hook-form'

export default function LoginForm({ servicesBaseUrl, onLogin = () => {} }) {
  const { register, handleSubmit, formState: { errors }, } = useForm()

  const onSubmit = (data) => {
    (async () => {
      const ures = await fetch(`${servicesBaseUrl}/api/graphql`, {
        method: 'POST',
        body: JSON.stringify({"query":"mutation AuthenticateUserWithPassword($email: String!, $password: String!) {\r\n  authenticateUserWithPassword(email: $email, password: $password) {\r\n    ... on UserAuthenticationWithPasswordSuccess {\r\n      item {\r\n        email\r\n        name\r\n        role\r\n      }\r\n    }\r\n  }\r\n}","variables":data,"operationName":"AuthenticateUserWithPassword"}),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })
      const ujson = await ures.json()
      onLogin(ujson.data.authenticateUserWithPassword.item)
    })()
  }

  return (
    <div className="font-helveticaneue flex flex-col w-full max-w-md">
      <h2 className="font-bold text-2xl mb-4 text-right">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Email address</label>
          <input {...register("email", { required: true })} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
          {errors.email && <span>This field is required</span>}
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Password</label>
          <input {...register("password", { required: true })} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
          {errors.password && <span>This field is required</span>}
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      </form>
    </div>
  )
}
