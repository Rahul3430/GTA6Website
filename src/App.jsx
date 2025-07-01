import React, { useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import "remixicon/fonts/remixicon.css";

function App() {
  let [showContent, setShowContent] = useState(false);
  
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          document.querySelector(".svg").remove();
          setShowContent(true);
          this.kill();
        }
      },
    });
  });

  useGSAP(() => {
    if (!showContent) return;

    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-1",
      ease: "Expo.easeInOut",
    });

    gsap.to(".sky", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".bg", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".character", {
      scale: 1.4,
      x: "-50%",
      bottom: "-25%",
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".text", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    const main = document.querySelector(".main");

    main?.addEventListener("mousemove", function (e) {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      gsap.to(".main .text", {
        x: `${xMove * 0.4}%`,
        duration: 0.3,
      });
      gsap.to(".sky", {
        x: xMove * 0.2,
        duration: 0.3,
      });
      gsap.to(".bg", {
        x: xMove * 0.8,
        duration: 0.3,
      });
      gsap.to(".character", {
        x: `calc(-50% + ${xMove * 1.2}px)`,
        duration: 0.3,
      });
    });
  }, [showContent]);

  return (
    <>
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>
      {showContent && (
        <div className="main w-full rotate-[-10deg] scale-[1.7]">
          <div className="landing overflow-hidden relative w-full h-screen bg-black">
            <div className="navbar absolute top-0 left-0 z-[30] w-full py-10 px-10">
              <div className="logo flex gap-7">
                <div className="lines flex flex-col gap-[5px]">
                  <div className="line w-15 h-2 bg-white"></div>
                  <div className="line w-8 h-2 bg-white"></div>
                  <div className="line w-5 h-2 bg-white"></div>
                </div>
                <h3 className="text-4xl -mt-[8px] leading-none text-white">
                  Rockstar
                </h3>
              </div>
            </div>

            <div className="imagesdiv relative overflow-hidden w-full h-screen">
              {/* Sky Layer - Furthest back */}
              <img
                className="sky absolute top-0 left-0 w-full h-full object-cover scale-[1.5] rotate-[-20deg]"
                style={{ zIndex: 1 }}
                src="./sky.png"
                alt=""
              />
              
              {/* Background Layer - Middle layer */}
              <img
                className="bg absolute top-0 left-0 w-full h-full object-cover scale-[1.8] rotate-[-3deg]"
                style={{ zIndex: 2 }}
                src="./bg.png"
                alt=""
              />
              
              {/* Character Layer - Front layer */}
              <img
                className="character absolute bottom-0 left-1/2 -translate-x-1/2 scale-[2.5] rotate-[-20deg] max-h-[120%] object-contain"
                style={{ zIndex: 4 }}
                src="./girlbg.png"
                alt=""
              />
              
              {/* Text Layer - Above images */}
              <div className="text text-white flex flex-col gap-3 absolute top-20 left-1/2 -translate-x-1/2 scale-[1.4] rotate-[-10deg]" style={{ zIndex: 10 }}>
                <h1 className="text-[12rem] leading-none -ml-40">grand</h1>
                <h1 className="text-[12rem] leading-none ml-20">theft</h1>
                <h1 className="text-[12rem] leading-none -ml-40">auto</h1>
              </div>
            </div>
            
            <div className="btmbar text-white absolute bottom-0 left-0 w-full py-15 px-10 bg-gradient-to-t from-black to-transparent" style={{ zIndex: 20 }}>
              <div className="flex gap-4 items-center">
                <i className="text-4xl ri-arrow-down-line"></i>
                <h3 className="text-xl font-[Helvetica_Now_Display]">
                  Scroll Down
                </h3>
              </div>
              <img
                className="absolute h-[55px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                src="./ps5.png"
                alt=""
              />
            </div>
          </div>
          
          <div className="w-full h-screen flex items-center justify-center bg-black overflow-hidden">
            <div className="cntnr flex text-white w-full h-[80%] max-w-7xl mx-auto px-10">
              <div className="limg relative w-1/2 h-full overflow-hidden flex items-center justify-center">
                <img
                  className="w-full h-full object-contain max-w-none"
                  src="./imag.png"
                  alt=""
                />
              </div>
              <div className="rg w-1/2 pl-20 flex flex-col justify-center">
                <h1 className="text-6xl xl:text-6xl leading-tight">Still Running,</h1>
                <h1 className="text-6xl xl:text-6xl leading-tight">Not Hunting</h1>
                <p className="mt-10 text-lg xl:text-xl font-[Helvetica_Now_Display] leading-relaxed">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Distinctio possimus, asperiores nam, omnis inventore nesciunt
                  a architecto eveniet saepe, ducimus necessitatibus at
                  voluptate.
                </p>
                <p className="mt-6 text-lg xl:text-xl font-[Helvetica_Now_Display] leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                  eius illum fugit eligendi nesciunt quia similique velit
                  excepturi soluta tenetur illo repellat consectetur laborum
                  eveniet eaque, dicta, hic quisquam? Ex cupiditate ipsa nostrum
                  autem sapiente.
                </p>
                
                <button className="bg-yellow-500 hover:bg-yellow-600 px-8 py-4 text-black mt-10 text-2xl xl:text-3xl font-bold rounded-lg transition-colors duration-300 w-fit">
                  Download Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;