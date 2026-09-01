import { IconClock } from '@tabler/icons-react';
import Input from '../components/Input';
import Button from '../components/Button';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        const partesSigla = String(data['senha']).split("-");
        
        const senhaFormatada = [{
            sigla: partesSigla[0],
            sequencial: Number(partesSigla[1])
        }]
        console.log(data);
        
        navigate("/senhas", { state: senhaFormatada });
    };
    const classNameInput = `p-4 rounded-xl border border-gray-100 shadow-md transition duration-200 ease-out outline-none ${errors?.senha ? "ring-2 ring-red-500" : "focus:ring-2 focus:ring-primary"}`;

    const errorInput = "italic text-red-600 font-semibold text-sm";

    return (
        <div className="flex flex-col h-full p-5 text-start w-full bg-white text-black">
            <div className='flex flex-row items-center justify-center gap-3'>
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                    <IconClock size={24} className="text-blue-600" stroke={1.75} />
                </div>
                <h1 className="text-3xl font-bold ">Acompanhar <span className='text-primary'>senha</span></h1>
            </div>
            <div className='flex flex-col items-center mt-3 text-gray-500'>
                <p>Acompanhe o andamento da sua senha</p>
                <p>em tempo real</p>
            </div>

            <div className='text-start mt-10 flex flex-col gap-3'>
                <label>Digite sua senha</label>
                <input
                    type="text"
                    placeholder={'Ex.: A152'}
                    className={classNameInput}
                    {...register("senha", {
                        required: true,
                        minLength: 6,
                        validate: (value) => {
                            return value.includes("-");
                        }
                    })}
                />

                {errors?.senha?.type === 'required' && <p className={errorInput}>Senha é obrigatória.</p>}
                {errors?.senha?.type === 'minLength' && <p className={errorInput}>A senha precisa ter no mínimo 6 caracteres.</p>}
                {errors?.senha?.type === 'validate' && <p className={errorInput}>Digite a senha no formato EX-0001</p>}

                <Button name="Acompanhar" variant="filled" onClick={() => handleSubmit(onSubmit)()} />
                <div className="flex items-center gap-3 w-full">
                    <span className="h-px flex-1 bg-gray-300"></span>
                    <span>ou</span>
                    <span className="h-px flex-1 bg-gray-300"></span>
                </div>
                <Button to="/retirar-senhas" name="Retirar Senha" variant="transparent" />
            </div>
        </div>
    );
}

export default Home;