import "./index.css";

const Credit = (props) => {
  const { credit } = props;
  return (
    <div className="credit-container">
      <div className="credit-names-container">
        <h1 className="credit-heading">${credit}</h1>
        <p className="credit-para">Credit</p>
      </div>
      <img
        src="https://res.cloudinary.com/digbzwlfx/image/upload/v1688650310/save3_sgfq3v.jpg"
        alt="credit"
        className="credit-image"
      />
    </div>
  );
};

export default Credit;
