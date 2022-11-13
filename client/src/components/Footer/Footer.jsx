import React from 'react';
import foto from './FOTO.jpg'
export default function Footer() {


    return (
        <div
            className="container-fluid p-2 shadow-xl mt-4 text-white"
            style={{ backgroundColor: "#1a1e4b" }}
        >
            <div className="row m-0 p-0">
                <div className="col-12">
                    <span className="text-white d-block"><i className="fa-solid fa-code me-2"></i>Developer</span>
                </div>
                <div className="col-md-5">

                    <div className="row border rounded-2 blue-60 py-1 h-100">
                        <div className="col-12 ">

                            <div className="row align-items-center m-0 p-0">

                                <div className="col-2 start">
                                    <img className="rounded-pill shadow" src={foto} alt="FOTO" style={{ width: '3em', height: '3em' }} />
                                </div>
                                <div className="col-9 text-start">
                                    <span className="text-blue-p text-sm text-start d-block"> Estefano Muller Estupiñan </span>
                                    <span className="text-blue-p text-sm text-start d-block"><i class="fa-brands fa-stack-overflow me-2"></i> FullStack Junior </span>
                                    <span className="text-blue-p text-sm text-start d-block"><i class="fa-solid fa-graduation-cap me-2"></i>  Estudiante de Ingeneria de Sistemas </span>
                                    <span className="text-blue-p text-sm text-start d-block"><i className="fa-solid fa-location-dot me-2"></i>Colombia, Valle del Cauca </span>
                                    <span className="text-blue-p text-sm text-start d-block">
                                        Habilidades
                                        <i className="fa-brands fa-square-js fa-xl mx-2"></i>
                                        <i className="fa-brands fa-node-js fa-xl me-2"></i>
                                        <i className="fa-brands fa-react fa-xl me-2"></i>
                                        <i className="fa-brands fa-php fa-xl me-2"></i>
                                    </span>
                                </div>
                            </div>


                        </div>

                    </div>


                </div>
                <div className="col-md-5">
                    <div className="row border rounded-2 blue-60 py-1 h-100">
                        <div className="col-9 text-start">


                            <span className="text-blue-p text-sm text-start d-block" >Other Projects</span>
                            <div className="row align-items-start m-0">

                                <div className="col">
                                    <a className="btn btn-light m-0" href={"https://e-commerce-pf-henna.vercel.app/"} >
                                        <span className="text-blue-p text-sm text-start d-block" >E-commerce-pf</span>
                                        <img style={{ width: '2em' }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/RPC-JP_Logo.png/900px-RPC-JP_Logo.png" alt="" />
                                    </a>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>
                <div className="col-12 mt-2">
                    <span
                        className="text-light  text-sm text-start text-uppercase"

                    >

                        Academic Project  © Pokemon PI 2022.
                    </span>
                </div>

            </div>
        </div>
    )
}