import styles from "./loadingSpinner.module.css";

const LoadingSpinner = ({
  size = 3,
  color = "#c78665",
}: {
  size: number;
  color: string;
}) => {
  const styling = `w-${size *4} h-${size*4} border-solid border-[#f3f3f3] border-t-[${color}] border-t-solid border-${size*4} border-t-${size*4}`;
  return <div className={`${styles.loader}`}></div>;
};

export default LoadingSpinner;
