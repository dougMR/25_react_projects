import { useState } from "react";
import data from "./data";
import "./styles.css";

export default function Accordion() {
    const [selected, setSelected] = useState(null);
    const [multiSelectOn, setMultiSelectOn] = useState(false);
    const [multiple, setMultiple] = useState([]);

    const handleSingleSelection = (currentId) => {
        console.log(currentId);
        setSelected(currentId === selected ? null : currentId);
    };
    const handleMultiSelection = (currentId) => {
        console.log("currentId: ", currentId);
        console.log(typeof currentId);
        let multipleCopy = [...multiple];
        console.log("multipleCopy: ", multipleCopy);
        const currentIdIndex = multipleCopy.indexOf(currentId);
        console.log("currentIdIndex: ", currentIdIndex);
        if (currentIdIndex === -1) {
            multipleCopy.push(currentId);
        } else {
            multipleCopy.splice(currentIdIndex, 1);
        }
        console.log("multipleCopy: ", multipleCopy);

        setMultiple(multipleCopy);
    };

    return (
        <div className="wrapper">
            <button
                onClick={() => setMultiSelectOn(!multiSelectOn)}
                className={multiSelectOn ? "enabled" : ""}
            >
                Enable Multi-selection
            </button>
            <div className="accordion">
                {data && data.length > 0 ? (
                    data.map((dataItem, index) => (
                        <div
                            onClick={
                                multiSelectOn
                                    ? () => handleMultiSelection(dataItem.id)
                                    : () => handleSingleSelection(dataItem.id)
                            }
                            className="item"
                            key={index}
                        >
                            <div className="title">
                                <h3>{dataItem.question}</h3>
                                <span>
                                    {multiSelectOn
                                        ? multiple.indexOf(dataItem.id) !== -1
                                            ? "-"
                                            : "+"
                                        : selected === dataItem.id
                                        ? "-"
                                        : "+"}
                                </span>
                            </div>
                            {multiSelectOn
                                ? multiple.indexOf(dataItem.id) !== -1 && (
                                      <div className="content">
                                          {dataItem.answer}
                                      </div>
                                  )
                                : selected === dataItem.id && (
                                      <div className="content">
                                          {dataItem.answer}
                                      </div>
                                  )}
                            {/* {selected === dataItem.id || multiple.indexOf(dataItem.id) !== -1 ? (
                                <div className="content">{dataItem.answer}</div>
                            ) : null} */}
                        </div>
                    ))
                ) : (
                    <div>No Data Found</div>
                )}
            </div>
        </div>
    );
}
