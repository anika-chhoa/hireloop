"use client";

import { Check } from "lucide-react";
import { useState } from "react";

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState("seekers");
  const [activeFaq, setActiveFaq] = useState(null);

  const seekerPlans = [
    {
      name: "Free",
      price: "$0",
      period: "/forever",
      description: "Perfect for exploring new opportunities.",
      features: [
        "Browse & save up to 10 jobs",
        "Apply to up to 3 jobs per month",
        "Basic candidate profile",
        "Standard email alerts",
      ],
      buttonText: "Get Started",
      gradient: false,
    },
    {
      name: "Pro",
      price: "$19",
      period: "/month",
      description: "Accelerate your active job hunt.",
      features: [
        "Apply to up to 30 jobs per month",
        "Unlimited saved jobs",
        "Advanced application tracking",
        "Deep salary insights",
      ],
      buttonText: "Upgrade to Pro",
      gradient: true,
      popular: true,
    },
    {
      name: "Premium",
      price: "$39",
      period: "/month",
      description: "Maximum visibility and unlimited access.",
      features: [
        "Everything in Pro",
        "Unlimited job applications",
        "Profile boost to top recruiters",
        "Early access to new job posts",
        "Priority 24/7 support",
      ],
      buttonText: "Go Premium",
      gradient: false,
    },
  ];

  const recruiterPlans = [
    {
      name: "Free",
      price: "$0",
      period: "/forever",
      description: "Great for a company's first year of hiring.",
      features: [
        "Up to 3 active job posts",
        "Basic applicant management",
        "Standard listing visibility",
        "Community forum access",
      ],
      buttonText: "Post for Free",
      gradient: false,
    },
    {
      name: "Growth",
      price: "$49",
      period: "/month",
      description: "Scale up your recruitment power.",
      features: [
        "Up to 10 active job posts",
        "Full applicant tracking system",
        "Basic analytics reports",
        "Direct email support",
      ],
      buttonText: "Start Growth Plan",
      gradient: true,
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$149",
      period: "/month",
      description: "Robust tools for demanding talent teams.",
      features: [
        "Up to 50 active job posts",
        "Advanced analytics dashboard",
        "Featured/Pinned job listings",
        "Team collaboration modules",
        "Custom company branding",
        "Dedicated priority support",
      ],
      buttonText: "Contact Enterprise",
      gradient: false,
    },
  ];

  const faqs = [
    {
      question: "Can I switch plans at any time?",
      answer:
        "Yes, you can upgrade, downgrade, or switch between plans at any point directly from your billing dashboard. Upgrades take effect immediately, while downgrades apply at the end of your current cycle.",
    },
    {
      question: "How do cancellations work?",
      answer:
        "There are no lock-in contracts. You can cancel your subscription with a single click. Once canceled, you will maintain premium features until your paid monthly cycle ends.",
    },
    {
      question: "What is your refund policy?",
      answer:
        "We offer a 14-day money-back guarantee for all newly activated Pro, Premium, or Growth subscriptions if you feel the features aren't a perfect fit for your workflow.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We support secure global transactions via all major credit cards (Visa, Mastercard, American Express), PayPal, and Google Pay securely encrypted via Stripe.",
    },
  ];

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Glow Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-600/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-20 -right-40 w-[400px] h-[400px] bg-sky-600/5 blur-[120px] pointer-events-none rounded-full" />

      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-12 relative">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
          Simple, Transparent Pricing
        </h1>
        <p className="mt-4 text-sm text-gray-400 max-w-md mx-auto">
          Choose the path that fits your goals. Upgrade or down-scale at any
          time.
        </p>
      </div>

      {/* Custom Switcher Tabs (Pure HTML/Tailwind) */}
      <div className="flex justify-center mb-16 relative">
        <div className="bg-[#0A0A0C] border border-white/5 p-1 rounded-xl flex gap-1">
          <button
            onClick={() => setActiveTab("seekers")}
            className={`text-xs font-semibold px-5 py-2 rounded-lg transition-all ${
              activeTab === "seekers"
                ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            For Job Seekers
          </button>
          <button
            onClick={() => setActiveTab("recruiters")}
            className={`text-xs font-semibold px-5 py-2 rounded-lg transition-all ${
              activeTab === "recruiters"
                ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            For Recruiters
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch relative mb-24">
        {(activeTab === "seekers" ? seekerPlans : recruiterPlans).map(
          (plan, index) => (
            <div
              key={index}
              className={`bg-[#0A0A0C] border ${
                plan.popular
                  ? "border-violet-500/40 shadow-[0_0_30px_rgba(124,58,237,0.1)] relative"
                  : "border-white/5"
              } rounded-2xl flex flex-col p-6 text-white`}
            >
              {plan.popular && (
                <span className="absolute top-4 right-4 text-[10px] uppercase font-bold tracking-widest text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2.5 py-0.5 rounded-full">
                  Most Popular
                </span>
              )}

              <div className="flex flex-col items-start mb-6">
                <h3 className="text-lg font-bold text-gray-200">{plan.name}</h3>
                <p className="text-xs text-gray-500 mt-1 min-h-[32px]">
                  {plan.description}
                </p>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold tracking-tight text-white">
                    {plan.price}
                  </span>
                  <span className="text-xs text-gray-500 ml-1">
                    {plan.period}
                  </span>
                </div>
              </div>

              <div className="flex-grow mb-8">
                <ul className="space-y-3.5">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs text-gray-400 leading-tight"
                    >
                      <Check className="h-4 w-4 text-violet-400 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <form action="/api/checkout_sessions" method="POST">
                  <section>
                    <button
                      className={`w-full text-xs font-semibold py-3 rounded-xl transition-all cursor-pointer ${
                        plan.gradient
                          ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-500 hover:to-indigo-500 shadow-[0_4px_15px_rgba(124,58,237,0.2)]"
                          : "bg-white/5 hover:bg-white/10 text-gray-300 border border-white/5"
                      }`}
                      type="submit"
                      role="link"
                    >
                      Checkout
                    </button>
                  </section>
                </form>
              </div>
            </div>
          ),
        )}
      </div>

      {/* Custom Accordion FAQ (Pure React State) */}
      <div className="max-w-3xl mx-auto border-t border-white/5 pt-16 relative">
        <h2 className="text-xl font-bold text-center text-white tracking-tight mb-8">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                className="bg-[#0A0A0C] border border-white/5 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                >
                  <span className="text-sm font-medium text-gray-200 hover:text-white transition-colors">
                    {faq.question}
                  </span>
                  <span
                    className={`text-violet-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </span>
                </button>

                <div
                  className={`transition-all duration-200 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-40 border-t border-white/5" : "max-h-0"
                  }`}
                >
                  <div className="p-5 text-xs text-gray-400 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
