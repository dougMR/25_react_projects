import { useEffect, useState } from "react";
import "./style.css";

let firstLoad = true;

const LoadMoreData = () => {
    {
        console.log("RENDER COMPONENT");
    }
    const batchSize = 4;
    const productLimit = 60;
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [batchCount, setBatchCount] = useState(0);

    const fetchProducts = async () => {
        console.log("fetchProducts()");
        console.log("loading:", loading);
        setLoading(true);
        try {
            const response = await fetch(
                `https://dummyjson.com/products?limit=${batchSize}&skip=${
                    batchCount * batchSize
                }`
            );
            const result = await response.json();
            // console.log(result);
            if (result && result.products && result.products.length) {
                console.log("Fetch result: ", result);
                console.log("loading: ", loading);
                console.log("batchCount:", batchCount);
                setProducts((prevData) => [...prevData, ...result.products]);
                console.log("num products: ", products.length);
                setLoading(false);
                setBatchCount((prevData) => prevData + 1);
            }
        } catch (error) {
            console.log("error: ", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log("USEEFFECT()!");
        //MZM 11/29/24 First load is required because the local dev server
        //runs useEffect twice. This bug won't happen on PROD, but this check
        //doesn't cause issues on PROD either. 
        if (!loading && firstLoad) fetchProducts();
        firstLoad = false;
        return () => {
            console.log("USEEFFECT CLEANUP()")
        }
    }, []);

    const loadMore = () => {
        console.log("loadMore()");
        if (products.length < productLimit) {
            fetchProducts();
        }
    };

    if (loading) {
        {
            console.log("LOADING...");
        }
        return <div>Loading Data ! Please be patient.</div>;
    }
    return (
        <div className="load-more-container">
            {console.log("\r\n------------Drawing Page------------")}
            <h2>Load More Products</h2>
            <div className="products">
                {console.log("products:", products.length)}
                {products && products.length
                    ? products.map((product, index) => {
                          return (
                              <div className="product" key={index}>
                                  <img
                                      src={product.thumbnail}
                                      alt={product.title}
                                  />
                                  <h3>{product.title}</h3>
                              </div>
                          );
                      })
                    : null}
            </div>
            {console.log("productLimit/batchSize:", productLimit / batchSize)}
            {console.log("batchCount:", batchCount)}
            <div className="load-more-button-container">
                <button
                    className="load-more"
                    disabled={batchCount >= productLimit / batchSize}
                    onClick={() => {
                        // setBatchCount((prevData) => prevData + 1);
                        fetchProducts();
                    }}
                >
                    LOAD MORE
                </button>
                {batchCount >= productLimit / batchSize ? (
                    <p className="max-loaded-message">You have loaded {productLimit} products.</p>
                ) : null}
            </div>
            {console.log("\r\n------------End Drawing Page------------")}
        </div>
    );
};

export default LoadMoreData;
