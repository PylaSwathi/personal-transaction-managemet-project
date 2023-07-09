import "./index.css";

const Debit = (props) => {
  const { debit } = props;
  return (
    <div className="debit-container">
      <div className="debit-names-container">
        <h1 className="debit-heading">${debit}</h1>
        <p className="debit-para">Debit</p>
      </div>
      <img
        src="https://res.cloudinary.com/digbzwlfx/image/upload/v1688650983/save2_kz7lx3.jpg"
        alt="debit"
        className="debit-image"
      />
    </div>
  );
};

export default Debit;
