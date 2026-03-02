import React from "react";
import { ClipboardList, Cpu, Sprout } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const icons = [ClipboardList, Cpu, Sprout];

const HowItWorks = () => {
  const { t } = useTranslation();
  const steps = t("home.work.steps", { returnObjects: true });

  return (
    <section className="bg-background py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("home.work.heading")}
          </h2>

          <p className="mt-4 text-lg text-muted-foreground">
            {t("home.work.subheading")}
          </p>
        </div>

        <div className="relative grid gap-12 md:grid-cols-3">
          <div className="absolute top-12 left-0 hidden w-full md:block">
            <div className="h-0.5 w-full bg-linear-to-r from-transparent via-border to-transparent border-t-2 border-dashed border-border/60"></div>
          </div>

          {steps.map((step, index) => {
            const Icon = icons[index];

            return (
              <div key={index} className="relative flex flex-col items-center text-center">
                <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-full border-4 border-background bg-secondary shadow-sm z-10">
                  <Icon className="h-8 w-8 text-primary" />
                  <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground border-4 border-background">
                    {step.number}
                  </div>
                </div>

                <h3 className="mb-3 text-xl font-bold text-foreground">
                  {step.title}
                </h3>

                <p className="max-w-xs text-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            to="/crop-suggestion"
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-transform hover:scale-105 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            {t("home.work.button")}
          </Link>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;