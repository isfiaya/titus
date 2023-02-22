function SuccessMessage({ toggleModal }) {
  return (
    <div className="text-center ">
      <p className="text-base text-gray-500">Expense updated successfully</p>

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

export default SuccessMessage;
