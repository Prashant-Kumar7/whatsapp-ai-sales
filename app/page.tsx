"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, BarChart, Zap, Clock, Building, Lock, Menu, X } from "lucide-react"
import { signIn } from 'next-auth/react'

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#EDE8F5] text-[#3D52A0] font-['Poppins',sans-serif]">
      <header className={`sticky top-0 z-50 transition-all duration-300 bg-[#3D52A0] shadow-md`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-[#EDE8F5]">B2B WhatsApp AI Bot</h1>
            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                <li><a href="#features" className="text-[#EDE8F5] hover:text-[#ADBBDA] transition-colors">Features</a></li>
                <li><a href="#benefits" className="text-[#EDE8F5] hover:text-[#ADBBDA] transition-colors">Benefits</a></li>
                <li><a href="#cta" className="text-[#EDE8F5] hover:text-[#ADBBDA] transition-colors">Request Demo</a></li>
                <li onClick={()=> signIn(undefined , {callbackUrl : "/home"}) } className="text-[#EDE8F5] hover:text-[#ADBBDA] transition-colors">Login</li>
                <li className="text-[#EDE8F5] hover:text-[#ADBBDA] transition-colors">Signup</li>
              </ul>
            </nav>
            <button className="md:hidden text-[#EDE8F5]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="md:hidden bg-[#8697C4] p-6">
          <nav>
            <ul className="space-y-4">
              <li><a href="#features" className="block py-2 text-[#EDE8F5] hover:text-[#ADBBDA] transition-colors" onClick={() => setIsMenuOpen(false)}>Features</a></li>
              <li><a href="#benefits" className="block py-2 text-[#EDE8F5] hover:text-[#ADBBDA] transition-colors" onClick={() => setIsMenuOpen(false)}>Benefits</a></li>
              <li><a href="#cta" className="block py-2 text-[#EDE8F5] hover:text-[#ADBBDA] transition-colors" onClick={() => setIsMenuOpen(false)}>Request Demo</a></li>
            </ul>
          </nav>
        </div>
      )}

      <main className="container mx-auto px-4 py-20">
        <section className="text-center mb-24">
          <h2 className="text-5xl font-bold mb-6 text-[#3D52A0]">Streamline Your B2B Sales with AI-Powered WhatsApp Bot</h2>
          <p className="text-xl mb-10 text-[#7091E6] max-w-2xl mx-auto">Enhance client communication, automate order processing, and boost your B2B sales efficiency.</p>
          <Button className="bg-[#3D52A0] hover:bg-[#7091E6] text-[#EDE8F5] font-semibold px-8 py-3 rounded-full text-lg transition-colors duration-300">Schedule a Demo</Button>
        </section>

        <section id="features" className="mb-24">
          <h3 className="text-3xl font-bold mb-12 text-center text-[#3D52A0]">Enterprise-Grade Features</h3>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: MessageCircle, title: "Automated Client Support", description: "Provide instant responses to client queries, 24/7." },
              { icon: BarChart, title: "Sales Analytics", description: "Gain insights into client interactions and sales patterns." },
              { icon: Zap, title: "Intelligent Order Processing", description: "Streamline order placement and management through WhatsApp." }
            ].map((feature, index) => (
              <div key={index} className="bg-[#ADBBDA] p-8 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105">
                <feature.icon className="w-12 h-12 mb-6 text-[#7091E6]" />
                <h4 className="text-xl font-semibold mb-4 text-[#3D52A0]">{feature.title}</h4>
                <p className="text-[#3D52A0]">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="benefits" className="mb-24">
          <h3 className="text-3xl font-bold mb-12 text-center text-[#3D52A0]">B2B Benefits</h3>
          <div className="grid md:grid-cols-2 gap-10">
            {[
              { icon: Clock, title: "Increased Efficiency", description: "Reduce response times and automate routine inquiries, allowing your team to focus on high-value tasks." },
              { icon: Building, title: "Scalable Solution", description: "Easily handle growing client bases and order volumes without proportionally increasing support staff." },
              { icon: Lock, title: "Secure Communications", description: "Leverage WhatsApp's end-to-end encryption for confidential business communications." },
              { icon: BarChart, title: "Data-Driven Insights", description: "Gather valuable data on client preferences and behavior to inform your business strategies." }
            ].map((benefit, index) => (
              <div key={index} className="flex items-start bg-[#ADBBDA] p-8 rounded-xl shadow-lg">
                <benefit.icon className="w-10 h-10 mr-6 text-[#7091E6] flex-shrink-0" />
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-[#3D52A0]">{benefit.title}</h4>
                  <p className="text-[#3D52A0]">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="cta" className="text-center bg-[#ADBBDA] p-12 rounded-xl shadow-lg">
          <h3 className="text-3xl font-bold mb-6 text-[#3D52A0]">Ready to Transform Your B2B Sales Process?</h3>
          <p className="mb-10 text-[#7091E6] text-lg">Request a demo to see how our WhatsApp AI Bot can benefit your business.</p>
          <form className="flex flex-col items-center space-y-6 max-w-md mx-auto">
            <Input type="text" placeholder="Company Name" className="w-full bg-[#EDE8F5] text-[#3D52A0] border-[#8697C4] focus:border-[#7091E6] rounded-lg py-3" />
            <Input type="email" placeholder="Business Email" className="w-full bg-[#EDE8F5] text-[#3D52A0] border-[#8697C4] focus:border-[#7091E6] rounded-lg py-3" />
            <Button type="submit" className="bg-[#3D52A0] hover:bg-[#7091E6] text-[#EDE8F5] font-semibold px-8 py-3 rounded-full text-lg transition-colors duration-300 w-full">Request Demo</Button>
          </form>
        </section>
      </main>

      <footer className="bg-[#3D52A0] text-[#EDE8F5] text-center p-6 mt-24">
        <p>&copy; 2023 B2B WhatsApp AI Bot. All rights reserved.</p>
      </footer>
    </div>
  )
}