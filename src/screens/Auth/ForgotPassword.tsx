import React from 'react'

import { Link } from 'react-router-dom'
import { motion } from "framer-motion";
import Input from "@/components/ui/Input";
import { jp } from "@/lang/jp";
import { Button } from "@/components/ui/button";

const ForgotPassword = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-200">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-10 text-center mb-10 mt-5">{jp.forgotPassword}</h2>
        <motion.form
          className="space-y-8 w-full"
          initial="hidden"
          animate="visible"
        >
          <div>
            <Input
              name="email"
              type="email"
              label={jp.email}
              className="mt-1 block w-full"
              required={false}
            />
          </div>
          <Button
            type="submit"
            className="w-full p-2 rounded-md"
          >
            {jp.resetPassword}
          </Button>

          <h1 className="text-sm text-gray-900 mt-4 pb-6">
            {jp.goBackTo} <Link to="/login" className="text-blue-700 font-semibold hover:text-blue-600">{jp.login}</Link> {jp.page}
          </h1>
        </motion.form>
      </div>
    </div>
  );
};

export default ForgotPassword