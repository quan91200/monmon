import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { FaChevronLeft } from "react-icons/fa"
import { FaChevronRight } from "react-icons/fa"

const SlideShow = ({
    slides = [],
    autoPlay = true, // Bật tắt tự động chuyển slide
    autoPlayInterval = 3000, // Khoảng thời gian tự động chuyển slide
    showDots = true, // Hiển thị các dot
    //showControls = true, // Hiển thị các nút điều hướng trái/phải
    transitionDuration = 500, // Thời gian chuyển đổi slide
}) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        if (autoPlay && transitionDuration !== "none") {
            const interval = setInterval(() => {
                nextSlide()
            }, autoPlayInterval)

            return () => clearInterval(interval)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex, autoPlay, autoPlayInterval, transitionDuration])

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        )
    }

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? slides.length - 1 : prevIndex - 1
        )
    }

    const goToSlide = (index) => {
        setCurrentIndex(index)
    }

    return (
        <div className="relative w-full mx-auto overflow-hidden">
            <div
                className="flex transition-transform ease-in-out"
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                    transitionDuration:
                        transitionDuration === "none" ? "0ms" : `${transitionDuration}ms`,
                }}
            >
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 w-full"
                        style={{ width: "100%" }}
                    >
                        {slide}
                    </div>
                ))}
            </div>
            <>
                <button
                    onClick={prevSlide}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black hover:bg-opacity-50 focus:bg-opacity-50 text-white p-2 rounded-full bg-opacity-15 mobile:block ipad-v:hidden"
                >
                    <FaChevronLeft size={30} />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black hover:bg-opacity-50 focus:bg-opacity-50 text-white p-2 rounded-full bg-opacity-15 mobile:block ipad-v:hidden"
                >
                    <FaChevronRight size={30} />
                </button>
            </>
            {showDots && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 mobile:bottom-0">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full ${index === currentIndex
                                ? "bg-blue-500"
                                : "bg-gray-400"
                                }`}
                        ></button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SlideShow

SlideShow.propTypes = {
    slides: PropTypes.node,
    autoPlay: PropTypes.bool,
    autoPlayInterval: PropTypes.number,
    // showControls: PropTypes.bool,
    showDots: PropTypes.bool,
    transitionDuration: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
}