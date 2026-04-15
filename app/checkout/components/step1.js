import { motion } from "framer-motion";

import NextAndPrevButtons from "./nextAndPrevButtons";
import Input from "@/components/input";

export default function Steap1({
    register,
    setValue,
    errors,
    nextStep,
    watch,
}) {

    const name = watch('name')
    const cpf = watch('cpf')
    const rg = watch('rg')
    const email = watch('email')
    const phone = watch('phone')
    const birth = watch('birth')

    const isStepValid = name && cpf.length === 14 && rg.length === 12 && email && phone.length >= 15 && birth

    return (
        <motion.div key="step1" className="space-y-4">

            <Input
                LabelChidren='Nome Completo:'
                InputCondition={'name'}
                placeholder='Bruna Oliveira de Santos Madeiros'
                register={register}
                onChangeBoolean={false}
                setValue={setValue}
                errors={errors}
            />

            <Input
                LabelChidren='CPF:'
                InputCondition={'cpf'}
                placeholder='000.000.000-00'
                register={register}
                onChangeBoolean={true}
                setValue={setValue}
                errors={errors}
            />

            <Input
                LabelChidren='RG:'
                InputCondition={'rg'}
                placeholder='00.000.000-0'
                register={register}
                onChangeBoolean={true}
                setValue={setValue}
                errors={errors}
            />

            <Input
                LabelChidren='Email:'
                InputCondition={'email'}
                placeholder='exemplo@dominio.com.br'
                register={register}
                onChangeBoolean={false}
                setValue={setValue}
                errors={errors}
            />

            <Input
                LabelChidren='Celular:'
                InputCondition={'phone'}
                placeholder='(00) 00000-0000'
                register={register}
                onChangeBoolean={true}
                setValue={setValue}
                errors={errors}
            />

            <Input
                LabelChidren='Data de Nascimento:'
                InputCondition={'birth'}
                placeholder='00/00/0000'
                register={register}
                onChangeBoolean={true}
                setValue={setValue}
                errors={errors}
            />

            <NextAndPrevButtons
                next={true}
                prev={false}
                childrenNext={isStepValid ? 'Continuar' : 'Preencha os Dados'}
                childrenPrev={'Voltar'}
                onClickNext={nextStep}
                disabled={isStepValid ? false : true}
                extraClass={isStepValid ? ' active:opacity-80' : 'opacity-50 cursor-not-allowed'}
            />
        </motion.div>
    );
}
