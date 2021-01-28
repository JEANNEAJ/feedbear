import React from 'react'
import LoginForm from "../forms/LoginForm";

export default function Hero() {


    return (
        <div className="h-screen" >

            <div className=" hero-container flex flex-col md:flex-row justify-center items-center container mx-auto px-10 py-10">
                <div className="logo w-1/4" >
                    <img src="Feedbear-no-tie-06.png"/>
                </div>

                <div className="hero-text md:w-2/5 md:pl-5">
                    <h1 className="text-3xl font-bold pb-3">Welcome to FeedBear!</h1>

                    <p className="text-justify">
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                    </p>
                </div>

            </div>
            <LoginForm />
        </div>
        
    )
}