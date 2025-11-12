import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Find Your Perfect Study Partner",
      subtitle: "Connect with like-minded students and achieve your academic goals together",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop"
    },
    {
      title: "Collaborative Learning Made Easy",
      subtitle: "Join study groups, share knowledge, and excel in your subjects",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=400&fit=crop"
    },
    {
      title: "Build Lasting Academic Connections",
      subtitle: "Network with students who share your passion for learning",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=400&fit=crop"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-96 md:h-[500px] overflow-hidden">
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
              <div className="max-w-4xl">
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6">{slide.title}</h1>
                <p className="text-base sm:text-lg md:text-xl mb-8 leading-relaxed">{slide.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
        
        <button 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all z-20"
          onClick={prevSlide}
        >
          <FaChevronLeft className="w-6 h-6" />
        </button>
        
        <button 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all z-20"
          onClick={nextSlide}
        >
          <FaChevronRight className="w-6 h-6" />
        </button>
        
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;