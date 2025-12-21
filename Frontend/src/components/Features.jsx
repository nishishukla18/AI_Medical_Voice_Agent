import React from "react";
import { Brain, ShieldCheck, UserPlus, Database, LayoutDashboard, Smartphone } from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      title: "Voice-Based Medical Queries",
      desc: "Users can ask medical questions using voice and receive AI-generated responses.",
      icon: <Brain className="w-10 h-10 text-neutral-900" />,
    },
    {
      title: "Symptom Checker",
      desc: "The assistant helps users check symptoms and suggests possible conditions.",
      icon: <ShieldCheck className="w-10 h-10 text-neutral-900" />,
    },
    {
      title: "Medication Reminders",
      desc: "Users can set reminders to take medicines on time.",
      icon: <UserPlus className="w-10 h-10 text-neutral-900" />,
    },
    {
      title: "Store Medical History",
      desc: "The app keeps track of previous consultations and voice queries.",
      icon: <Database className="w-10 h-10 text-neutral-900" />,
    },
    {
      title: "Emergency Assistance",
      desc: "Users can quickly access emergency tips and guidance.",
      icon: <LayoutDashboard className="w-10 h-10 text-neutral-900" />,
    },
    {
      title: "Fully Responsive UI",
      desc: "Smooth and modern UI that works across all devices.",
      icon: <Smartphone className="w-10 h-10 text-neutral-900" />,
    },
  ];

  return (
    <section className="w-full min-h-screen bg-neutral-100 px-6 py-20">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
          Features
        </h1>
        <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
          Explore the powerful capabilities of our AI Medical Voice Assistant System.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white shadow-md p-8 rounded-2xl hover:shadow-lg transition-all border border-neutral-200 flex flex-col items-start"
          >
            <div className="mb-4">{feature.icon}</div>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">
              {feature.title}
            </h2>
            <p className="text-neutral-600 text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
