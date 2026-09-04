import { ChevronLeft, ChevronRight } from "lucide-react";
import rice from "../assets/rice.webp"
import rice2 from "../assets/rice-4.png"
import rice3 from "../assets/rice-3.png"
import { useEffect, useState } from "react";

function Carousel() {
    const imagens = [
        {
            imagem: rice,
            descricao: "Arroz São João",
            preco: "23,50",
            precoAntigo: "27,50",
            porcentagem: "-15%"
        },
        {
            imagem: rice2,
            descricao: "Arroz São João 2",
            preco: "24,99",
            precoAntigo: "29,50",
            porcentagem: "-18%"
        },
        {
            imagem: rice3,
            descricao: "Arroz São João 3",
            preco: "22,30",
            precoAntigo: "25,35",
            porcentagem: "-13%"
        },
        {
            imagem: rice,
            descricao: "Arroz São João 4",
            preco: "21,50",
            precoAntigo: "25,25",
            porcentagem: "-19%"
        },
        {
            imagem: rice2,
            descricao: "Arroz São João 5",
            preco: "27,90",
            precoAntigo: "32,99",
            porcentagem: "-20%"
        },
    ];
    
    const [indexImagens, setIndexImagens] = useState(0);
    const prev = () => setIndexImagens(indexImagens === 0 ? imagens.length - 1 : indexImagens - 1); 

    const next = () => setIndexImagens(indexImagens === imagens.length - 1 ? 0 : indexImagens + 1);

    useEffect(() => {
         const timer = setInterval(() => {
            setIndexImagens((prev) =>
                prev === imagens.length - 1 ? 0 : prev + 1
            );
        }, 4000);

        return () => clearInterval(timer);
    }, [indexImagens]);

    return (
        <div className="overflow-hidden relative w-full shadow-xl rounded-2xl">
            <div
                className="flex transition-transform ease-in-out duration-500 will-change-transform"
                style={{ transform: `translateX(-${indexImagens * 100}%)` }}
            >
                {imagens.map((item, index) => (
                    <div
                        key={index}
                        className="min-w-full h-80 rounded-md"
                    >
                        <div className="absolute px-2 py-1 m-2 text-sm text-white font-bold bg-linear-to-r from-red-500 to-red-600 rounded-full shadow-md">
                            {item.porcentagem}
                        </div>
                        <div className="flex-1 bg-gray-100  h-56 rounded-t-md overflow-hidden">
                            <img src={item.imagem} alt="Imagem" className="w-full h-full object-contain" />
                        </div>
                        <div className="p-4">
                            <h2 className="text-2xl text-red-600 font-bold">R$ {item.preco} <span className="text-gray-500 font-light text-sm line-through">R$ {item.precoAntigo}</span></h2>
                            <h3 className="text-md">{item.descricao}</h3>
                        </div>
                    </div>
                ))}                
            </div>
            
            <div className="absolute inset-0 flex items-center justify-between p-3">
                <button onClick={prev} className="mb-15 rounded-full cursor-pointer bg-white shadow-md p-1"><ChevronLeft size={30} /> </button>
                <button onClick={next} className="mb-15 rounded-full cursor-pointer bg-white shadow-md p-1"><ChevronRight size={30} /> </button>
            </div>
            
        </div>
        // <div className="flex flex-col flex-1 h-55 border border-gray-300 rounded-md">
        //     <div className="absolute p-1 m-1 text-sm text-white font-bold bg-red-600 rounded-xl">
        //         -15%
        //     </div>
        //     <div className="flex-1 bg-gray-200 border border-gray-200 rounded-t-md overflow-hidden">
        //         <img src={rice} alt="Sem senha" className="w-full h-full object-contain" />
        //     </div>
        //     <div className="p-2">
        //         <h2 className="text-md text-red-600 font-bold">R$ 23,50 <span className="text-gray-500 font-light text-xs line-through">R$ 27,50</span></h2>
        //         <h3 className="text-xs">Arroz São João 5kg</h3>
        //     </div>
        // </div>
    );
}

export default Carousel;