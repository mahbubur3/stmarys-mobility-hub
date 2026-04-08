import options from "../data/options";

function TravelOptions() {
  return (
    <div>
      <h1>Travel Options</h1>
      {options.map((option, index) => (
        <div key={index}>
          <h2>{option.name}</h2>
          <p>{option.description}</p>
          <p><strong>Pros:</strong> {option.advantages}</p>
          <p><strong>Cons:</strong> {option.limitations}</p>
        </div>
      ))}
    </div>
  );
}

export default TravelOptions;

