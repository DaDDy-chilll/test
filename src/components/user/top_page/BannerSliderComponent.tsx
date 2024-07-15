import { useEffect, useState } from "react";

type BannerSliderComponentProps = {
  intervalTime: number;
  sliderImages: string[];
};

const BannerSliderComponent = ({
  intervalTime,
  sliderImages,
}: BannerSliderComponentProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
    }, intervalTime * 1000);

    return () => clearInterval(interval);
  }, [intervalTime, sliderImages]);

  const slidePercentage = sliderImages.length > 0 ? 100 / sliderImages.length : 0;

  return (
    <>
      <div className="h-[90vh] relative overflow-hidden w-full">
        <div
          className="animateflex transition-transform duration-500 transform w-full h-full"
          style={{
            transform: `translateX(-${currentIndex * slidePercentage}%)`,
          }}
        >
          {sliderImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slider ${index + 1}`}
              className="object-cover w-full h-full bg-cover"
            />
          ))}
        </div>

        <div className="absolute left-28 bottom-10 flex space-x-2">
          {sliderImages.map((_, index) => (
            <div
              key={index}
              className={`w-[12px] h-[12px] rounded-full ${
                index === currentIndex ? "bg-green-500" : "bg-[#FFE50066]"
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Styles for the Slider */}
      <style>{`
        @keyframes slideAnimation {
          0%, 100% {
            transform: translateX(0%);
          }
          25% {
            transform: translateX(-${slidePercentage * 1}%);
          }
          50% {
            transform: translateX(-${slidePercentage * 2}%);
          }
          75% {
            transform: translateX(-${slidePercentage * 3}%);
          }
        }

        .animateflex {
          display: flex;
          width: ${100 * sliderImages.length}%;
          animation: slideAnimation ${intervalTime * sliderImages.length}s ease infinite;
        }
      `}</style>
    </>
  );
};

export default BannerSliderComponent;
