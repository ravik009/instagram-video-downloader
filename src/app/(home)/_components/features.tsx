import React from "react";

import { useTranslations } from "next-intl";

import { CheckCircle, Shield, TvMinimalPlay, Zap, Download, Smartphone, Globe, Lock } from "lucide-react";

import { homeSections } from "@/lib/constants";

export function Features() {
  const t = useTranslations("pages.home.features");

  const features = [
    {
      icon: Shield,
      title: t("cards.free.title"),
      description: t("cards.free.description"),
      gradient: "from-green-400 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      darkBgGradient: "from-green-900/20 to-emerald-900/20"
    },
    {
      icon: Lock,
      title: t("cards.noRegistration.title"),
      description: t("cards.noRegistration.description"),
      gradient: "from-blue-400 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      darkBgGradient: "from-blue-900/20 to-cyan-900/20"
    },
    {
      icon: Zap,
      title: t("cards.fast.title"),
      description: t("cards.fast.description"),
      gradient: "from-yellow-400 to-orange-500",
      bgGradient: "from-yellow-50 to-orange-50",
      darkBgGradient: "from-yellow-900/20 to-orange-900/20"
    },
    {
      icon: TvMinimalPlay,
      title: t("cards.hdQuality.title"),
      description: t("cards.hdQuality.description"),
      gradient: "from-purple-400 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      darkBgGradient: "from-purple-900/20 to-pink-900/20"
    }
  ];

  return (
    <section
      id={homeSections.features}
      className="w-full scroll-mt-12 bg-gradient-to-b from-gray-50 to-white py-16 md:py-24 lg:py-32 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/10 to-purple-100/10 dark:from-blue-900/5 dark:to-purple-900/5"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          {/* Section header */}
          <div className="space-y-4 max-w-4xl">
            <div className="inline-flex items-center space-x-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-lg">
              <Download className="h-4 w-4" />
              <span>{t("badge")}</span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent dark:from-white dark:via-blue-200 dark:to-purple-200">
              {t("title")}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mx-auto max-w-[800px] text-lg md:text-xl">
              {t("description")}
            </p>
          </div>

          {/* Features grid */}
          <div className="mt-12 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover-lift"
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} dark:${feature.darkBgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center space-y-4 text-center">
                  {/* Icon */}
                  <div className={`rounded-2xl bg-gradient-to-r ${feature.gradient} p-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  {/* Text content */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              </div>
            ))}
          </div>

          {/* Additional trust indicators */}
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-12">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <CheckCircle className="h-5 w-5 text-green-500" />
                <CheckCircle className="h-5 w-5 text-green-500" />
                <CheckCircle className="h-5 w-5 text-green-500" />
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">5-Star Rated</span>
            </div>
            <div className="flex items-center space-x-3">
              <Globe className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Global Service</span>
            </div>
            <div className="flex items-center space-x-3">
              <Smartphone className="h-5 w-5 text-purple-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Mobile Friendly</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
