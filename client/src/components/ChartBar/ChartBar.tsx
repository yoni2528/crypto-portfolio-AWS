import React, { useState } from "react";
import styles from "./ChartBar.module.css";
import clsx from "clsx";

const ChartBar: React.FC<{
  month: string;
  sellValues?: any;
  buyValues?: any;
}> = ({ sellValues, buyValues, month }) => {
  const [isSellHover, setIsSellHover] = useState<boolean>(false);
  const [isBuyHover, setIsBuyHover] = useState<boolean>(false);

  const handleSellHover = () => {
    setIsSellHover(true);
  };
  const handleSellMouseLeft = () => {
    setIsSellHover(false);
  };
  const handleBuyHover = () => {
    setIsBuyHover(true);
  };
  const handleBuyMouseLeft = () => {
    setIsBuyHover(false);
  };

  return (
    <div className={clsx(styles["wrapper"])}>
      <div className={clsx(styles.tooltip, isSellHover && styles.open)}>
        <p>
          <strong>Total sells</strong> : $
          {sellValues && sellValues.value.toLocaleString()}
        </p>
      </div>
      <div
        className={clsx(
          styles.tooltip,
          styles["tooltip-buy"],
          isBuyHover && styles.open
        )}
      >
        <p>
          <strong>Total Buys</strong> : $
          {buyValues && buyValues.value?.toLocaleString()}
        </p>
      </div>
      <div className={styles["bar-charts"]}>
        <div
          style={{
            height: `${sellValues && sellValues.height}px`,
            backgroundColor: "#F26E43",
            width: "14px",
            borderTopRightRadius: "8px",
            borderTopLeftRadius: "8px",
            cursor: "pointer",
          }}
          onMouseEnter={handleSellHover}
          onMouseLeave={handleSellMouseLeft}
          className={clsx(styles["card"], styles["sell"])}
        ></div>
        <div
          style={{
            height: `${buyValues && buyValues.height}px`,
            backgroundColor: "#2E4CD6",
            width: "14px",
            borderTopRightRadius: "8px",
            borderTopLeftRadius: "8px",
            cursor: "pointer",
          }}
          onMouseEnter={handleBuyHover}
          onMouseLeave={handleBuyMouseLeft}
          className={clsx(styles["card"], styles["buy"])}
        ></div>
      </div>
      <p className={styles["month-name"]}>{month}</p>
    </div>
  );
};

export default ChartBar;
