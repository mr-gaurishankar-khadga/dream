import React from 'react';

const Loading = () => {
  return (
    <div className="neo-loader">
      <div className="neo-loader__container">
        <div className="neo-loader__ring neo-loader__ring--outer"></div>
        <div className="neo-loader__ring neo-loader__ring--middle"></div>
        <div className="neo-loader__ring neo-loader__ring--inner"></div>
        <div className="neo-loader__dot"></div>
        <div className="neo-loader__pulse"></div>
        <div className="neo-loader__glow"></div>
      </div>
      <style jsx>{`
        .neo-loader {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          width: 100%;
          background: transparent;
        }
        
        .neo-loader__container {
          position: relative;
          width: 120px;
          height: 120px;
          perspective: 800px;
        }
        
        .neo-loader__ring {
          position: absolute;
          border-radius: 50%;
          border: 2px solid transparent;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        
        .neo-loader__ring--outer {
          width: 100px;
          height: 100px;
          border-top: 2px solid #3498db;
          border-left: 2px solid transparent;
          border-right: 2px solid transparent;
          border-bottom: 2px solid #3498db;
          animation: neo-spin-outer 1.5s linear infinite;
        }
        
        .neo-loader__ring--middle {
          width: 70px;
          height: 70px;
          border-top: 2px solid transparent;
          border-left: 2px solid #9b59b6;
          border-right: 2px solid #9b59b6;
          border-bottom: 2px solid transparent;
          animation: neo-spin-middle 1.2s linear infinite reverse;
        }
        
        .neo-loader__ring--inner {
          width: 40px;
          height: 40px;
          border-top: 2px solid #2ecc71;
          border-left: 2px solid #2ecc71;
          border-right: 2px solid transparent;
          border-bottom: 2px solid transparent;
          animation: neo-spin-inner 1s linear infinite;
        }
        
        .neo-loader__dot {
          position: absolute;
          width: 15px;
          height: 15px;
          background: #f39c12;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 15px #f39c12;
          animation: neo-pulse 1.5s ease-in-out infinite;
        }
        
        .neo-loader__pulse {
          position: absolute;
          width: 15px;
          height: 15px;
          background: transparent;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 0 rgba(243, 156, 18, 0.5);
          animation: neo-ripple 1.5s cubic-bezier(0, 0.2, 0.8, 1) infinite;
        }
        
        .neo-loader__glow {
          position: absolute;
          width: 120px;
          height: 120px;
          background: radial-gradient(circle, rgba(52, 152, 219, 0.1) 0%, rgba(0, 0, 0, 0) 70%);
          border-radius: 50%;
          animation: neo-glow 2s ease-in-out infinite alternate;
        }
        
        @keyframes neo-spin-outer {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        
        @keyframes neo-spin-middle {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        
        @keyframes neo-spin-inner {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        
        @keyframes neo-pulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0.7;
          }
          50% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
        }
        
        @keyframes neo-ripple {
          0% {
            box-shadow: 0 0 0 0 rgba(243, 156, 18, 0.7);
          }
          100% {
            box-shadow: 0 0 0 40px rgba(243, 156, 18, 0);
          }
        }
        
        @keyframes neo-glow {
          0% {
            opacity: 0.3;
            transform: scale(0.95);
          }
          100% {
            opacity: 0.7;
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;