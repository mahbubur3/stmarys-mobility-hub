

// function TravelOptions() {
//   return (
//     <div>
//       <h1>Travel Options</h1>
//       {options.map((option, index) => (
//         <div key={index}>
//           <h2>{option.name}</h2>
//           <p>{option.description}</p>
//           <p><strong>Pros:</strong> {option.advantages}</p>
//           <p><strong>Cons:</strong> {option.limitations}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default TravelOptions;



import options from "../data/options";
import { Card, CardContent, Typography } from "@mui/material";

function TravelOptions() {
  return (
    <div>
      <h1>Travel Options</h1>

      {options.map((option, index) => (
        <Card key={index} style={{ margin: "10px" }}>
          <CardContent>
            <Typography variant="h5">{option.name}</Typography>
            <Typography>{option.description}</Typography>
            <Typography>Pros: {option.advantages}</Typography>
            <Typography>Cons: {option.limitations}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default TravelOptions;