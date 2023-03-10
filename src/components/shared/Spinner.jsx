import PropTypes from "prop-types";
function Spinner({ className }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em]  motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
    </div>
  );
}
Spinner.propTypes = {
  className: PropTypes.string,
};
export default Spinner;
