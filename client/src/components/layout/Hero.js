import React from 'react'

export default function Hero() {


    return (
        <div className="h-screen flex items-center mx-auto px-40 py-5">
            <div className="logo w-1/4" >
                <img src="Feedbear-05.png"/>
            </div>

            <div className="hero-text w-2/3">
                <h1 className="text-3xl font-bold text-center">Welcome to FeedBear!</h1>

                <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
            </div>

            
        </div>
        
    )
}