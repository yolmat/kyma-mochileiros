"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import logoDark from '@/public/kymaLight.png'

import { checkoutSchema } from "@/lib/checkoutSchema";

import Step1 from "@/components/step1";
import Step2 from "@/components/step2";
import Step3 from "@/components/step3";

const STORAGE_KEY = "checkout_v1";

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const containerRef = useRef(null);

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
  });

  // 🔹 Load localStorage
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (savedData) {
      const parsed = JSON.parse(savedData);

      if (parsed.formData) reset(parsed.formData);
      if (parsed.step) setStep(parsed.step);
    }
  }, [reset]);

  // 🔹 Save localStorage
  const watchedData = watch();

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        formData: watchedData,
        step,
      })
    );
  }, [watchedData, step]);

  // 🔹 Scroll automático
  useEffect(() => {
    containerRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [step]);

  const nextStep = async (fields) => {
    const isValid = await trigger(fields);
    if (isValid) setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmit = (data) => {
    console.log(data);
    localStorage.removeItem(STORAGE_KEY);
    alert("Finalizado!");
  };

  // 🔹 Animação base
  const variants = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  return (
    <div className="min-h-screen flex items-center bg-white dark:bg-black text-black dark:text-white p-2 md:p-0 md:pt-5 md:pb-5">
      {/* MOBILE HEADER */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 py-3 z-50">
        <Image src={logoDark} className='w-1/5' alt='Logo' />
        <div className="text-center font-semibold">Mochileiros 2.0</div>
        <div className="w-10" />
      </div>

      <div className="pt-16 md:pt-0 mx-auto w-full">
        <div className="flex flex-col md:flex-row gap-6">

          {/* LEFT SIDE */}
          <div className="hidden md:flex md:w-[30%] bg-gray-100 dark:bg-gray-900 rounded-2xl p-6 flex-col justify-center items-center text-center shadow-lg">
            <Image src={logoDark} alt='Logo' />
            <h1 className="text-2xl font-semibold">Mochileiros 2.0</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Evento exclusivo para exploradores modernos.
            </p>
          </div>
          <form
            ref={containerRef}
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md md:p-6 bg-gray-900 rounded-2xl shadow-lg overflow-hidden"
          >
            {/* 🔥 Barra de progresso */}
            <div className="mb-6">
              <div className="w-full h-2 bg-gray-500 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gray-700"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              <p className="text-xs text-gray-50 mt-2">
                {Math.round(progress)}% concluído
              </p>
            </div>

            {/* 🔥 Steps animados */}
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <Step1
                    register={register}
                    setValue={setValue}
                    watch={watch}
                    errors={errors}
                    nextStep={() => nextStep(["nome", 'cpf'])}
                  />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <Step2
                    register={register}
                    errors={errors}
                    watch={watch}
                    setValue={setValue}
                    nextStep={() => nextStep(["email", 'telefone'])}
                    prevStep={prevStep}
                  />
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <Step3
                    register={register}
                    errors={errors}
                    prevStep={prevStep}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </div>
  );
}