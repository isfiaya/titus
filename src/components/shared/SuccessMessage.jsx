import PropTypes from "prop-types";
function SuccessMessage({ toggleModal, labelButton }) {
  return (
    <div className="text-center ">
      <p className="text-base text-gray-500">{labelButton}</p>

      <button
        type="button"
        className=" btn-secondary mt-3 w-full"
        onClick={toggleModal}
      >
        ok
      </button>
    </div>
  );
}
SuccessMessage.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  labelButton: PropTypes.string.isRequired,
};
export default SuccessMessage;
