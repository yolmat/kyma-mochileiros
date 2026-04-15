'use client'

import { motion } from "framer-motion";
import { useState } from "react";
import NextAndPrevButtons from "./nextAndPrevButtons";
import Input from "@/components/input";


export default function Steap2(
    { register,
        setValue,
        errors,
        nextStep,
        watch,
        prevStep,
    }
) {

    const cep = watch('cep') || ''
    const street = watch('street') || ''
    const number = watch('number') || ''
    const district = watch('district') || ''
    const city = watch('city') || ''

    const isStepValid = cep.length >= 9 && number.length >= 1 && street && district && city

    const [address, setAddress] = useState({
        cep: "",
        street: "",
        district: "",
        city: "",
        state: "",
    });

    return (

        <motion.div key="step2" className="space-y-4">

            <Input
                LabelChidren='CEP:'
                InputCondition={"cep"}
                placeholder='00000-000'
                register={register}
                onChangeBoolean={true}
                setAddress={setAddress}
                setValue={setValue}
                errors={errors}
            />

            <Input
                LabelChidren='Rua:'
                InputCondition={"street"}
                placeholder='Rua dos Ipès'
                register={register}
                onChangeBoolean={true}
                setAddress={setAddress}
                setValue={setValue}
                automaticValue={true}
                errors={errors}
            />

            <Input
                LabelChidren='Numero:'
                InputCondition={'number'}
                placeholder='00'
                register={register}
                onChangeBoolean={false}
                setValue={setValue}
                errors={errors}
            />

            <Input
                LabelChidren='Bairro:'
                InputCondition={"district"}
                placeholder='Vila Matilda'
                register={register}
                onChangeBoolean={true}
                setAddress={setAddress}
                setValue={setValue}
                automaticValue={true}
                errors={errors}
            />

            <Input
                LabelChidren='Cidade:'
                InputCondition={"city"}
                placeholder='São Paulo'
                register={register}
                onChangeBoolean={true}
                setAddress={setAddress}
                setValue={setValue}
                automaticValue={true}
                errors={errors}
            />

            <NextAndPrevButtons
                next={true}
                prev={true}
                childrenNext={isStepValid ? 'Continuar' : 'Preencha os Dados'}
                childrenPrev={'Voltar'}
                onClickNext={nextStep}
                onClickPrev={prevStep}
                disabled={isStepValid ? false : true}
                extraClass={isStepValid ? ' active:opacity-80' : 'opacity-50 cursor-not-allowed'}
            />
        </motion.div>
    )
}