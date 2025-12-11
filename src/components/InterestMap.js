import React from "react";

const InterestMap = ({ interests = [] }) => {
  // Scales (linear map from -1..1 to 10%..90%)
  const toPercent = (val, inverted = false) => {
    const normalized = (val + 1) / 2; // 0 to 1
    const adjusted = inverted ? 1 - normalized : normalized;
    return adjusted * 80 + 10 + "%";
  };

  return (
    <div className="interest-map">
      {/* Axes */}
      <div className="interest-map__axis-y" style={{ left: "50%" }}></div>
      <div className="interest-map__axis-x" style={{ top: "50%" }}></div>

      {/* Axis Labels */}
      <div className="interest-map__label interest-map__label--top">
        PRODUCE
      </div>
      <div className="interest-map__label interest-map__label--bottom">
        CONSUME
      </div>
      <div className="interest-map__label interest-map__label--left">
        USELESS
      </div>
      <div className="interest-map__label interest-map__label--right">
        USEFUL
      </div>

      {interests.map((item, i) => {
        if (typeof item.x !== "number" || typeof item.y !== "number")
          return null;

        const style = {
          left: toPercent(item.x),
          top: toPercent(item.y, true),
        };

        if (item.link) {
          return (
            <a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="interest-map__point"
              style={style}
            >
              {item.name}
            </a>
          );
        }

        return (
          <div key={i} className="interest-map__point" style={style}>
            {item.name}
          </div>
        );
      })}
    </div>
  );
};

export default InterestMap;
