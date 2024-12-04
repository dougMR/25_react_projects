import Accordion from "./components/accordion";
import "./App.css";
import RandomColor from "./components/random-color";
import StarRating from "./components/star-rating";
import ImageSlider from "./components/image-slider";
import LoadMoreData from "./components/load-more-data";

function App() {
    return (
        <div className="App">
            {/* Accordian Component */}
            {/* <Accordion /> */}
            {/* Random Color Component */}
            {/* <RandomColor /> */}
            {/* Star Rating Component*/}
            {/* <StarRating numberOfStars={10} /> */}
            {/* Image Slider Component*/}
            {/* <ImageSlider url={"https://picsum.photos/v2/list"} limit={"10"} page={"3"} /> */}
            {/* Load more products component */}
            <LoadMoreData />
        </div>
    );
}

export default App;
