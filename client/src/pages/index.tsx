
import React from "react";
import Navbar from "@/components/common/navbar";
import { NavItem } from "@/types/nav";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle, UserCheck } from "lucide-react";

const LandingPage: React.FC = () => {
  const navItems: NavItem[] = [{ title: "Login", href: "/login", icon: UserCheck }];

  const features = [
    {
      icon: CheckCircle,
      title: "Quick Requests",
      desc: "Submit leaves in seconds with our streamlined interface."
    },
    {
      icon: UserCheck,
      title: "Track Balance",
      desc: "Easily see your remaining leave days in a clear dashboard."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      {/* Navbar */}
      <Navbar
        logoSrc="/logo.png"
        navItems={navItems}
        bgColor="bg-white/90 backdrop-blur-sm shadow-md"
      />

      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center text-center px-6 lg:px-20 py-24">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-6xl font-extrabold mb-6 text-[#0B3D91]"
        >
          Effortless Leave Management
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-lg sm:text-xl text-sky-500 max-w-2xl mb-12"
        >
          Submit and track leaves seamlessly with a clean and intuitive
          interface built for employees.
        </motion.p>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link to="/login">
            <Button className="bg-orange-400 text-white px-10 py-4 text-lg font-semibold rounded-xl shadow-lg hover:bg-orange-500 transition-all duration-300">
              Get Started
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 lg:px-32">
        <h2 className="text-4xl font-bold text-center mb-16 text-[#0B3D91]">
          Why You'll Love It
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="bg-blue-50 border-l-4 border-orange-400 p-8 rounded-xl transition-all duration-300 flex flex-col items-center text-center"
              whileHover={{ scale: 1.03 }}
            >
              <feature.icon className="w-14 h-14 mb-4 text-orange-400" />
              <h3 className="text-2xl font-semibold mb-2 text-[#0B3D91]">
                {feature.title}
              </h3>
              <p className="text-sky-500">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-200 py-6 text-center text-gray-700">
        © {new Date().getFullYear()} Leave System. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;







