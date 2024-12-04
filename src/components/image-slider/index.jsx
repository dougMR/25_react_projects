import { useEffect, useState } from "react";
import { BsArrowRightCircleFill, BsArrowLeftCircleFill } from "react-icons/bs";
import "./style.css";

const ImageSlider = ({ url, limit = 5, page = 2 }) => {
    const [images, setImages] = useState([]);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchImages = async (url) => {
        setLoading(true);
        try {
            const urlToFetch = `${url}?page=${page}&limit=${limit}`;
            const response = await fetch(urlToFetch);
            const data = await response.json();
            if (data) {
                setImages(data);
                setLoading(false);
            }
        } catch (error) {
            setErrorMsg(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (url !== "") {
            fetchImages(url);
        }
    }, [url]);

    const handlePrev = () => {
        setCurrentSlideIndex(
            (Number(currentSlideIndex) + Number(limit) - 1) % images.length
        );
    };
    const handleNext = () => {
        setCurrentSlideIndex((Number(currentSlideIndex) + 1) % images.length);
    };

    if (loading) {
        return <div>Loading Images ! please wait...</div>;
    }
    if (errorMsg) {
        return <div>Error ! {errorMsg}</div>;
    }
    return (
        <div className="slider-container-container">
            <h3>Image Slider</h3>
            <div className="slider-container">
                <BsArrowLeftCircleFill
                    className="arrow arrow-left"
                    onClick={handlePrev}
                />
                {/* <p>image list: {JSON.stringify(images)}</p> */}
                {/* {images.length = limit} */}
                {/* {images.map((image, index) => {
                return <img key={image.id} alt={image.download_url} src={image.download_url} className="current-image" width="300" />;
            })} */}
                {images && images.length
                    ? images.map((image, index) => (
                          <img
                              key={image.id}
                              alt={image.download_url}
                              src={image.download_url}
                              className={
                                  currentSlideIndex === index
                                      ? "current-image"
                                      : "hidden-image"
                              }
                          />
                      ))
                    : null}
                <BsArrowRightCircleFill
                    className="arrow arrow-right"
                    onClick={handleNext}
                />
                <span className="circle-indicators">
                    {images && images.length
                        ? images.map((image, index) => (
                              <button
                                  key={index}
                                  className={
                                      currentSlideIndex == index
                                          ? "current-indicator"
                                          : "indicator"
                                  }
                                  onClick={() => {
                                      setCurrentSlideIndex(index);
                                  }}
                              ></button>
                          ))
                        : null}
                </span>
            </div>
        </div>
    );
};

export default ImageSlider;
