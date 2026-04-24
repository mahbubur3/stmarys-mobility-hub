// import { useEffect, useState } from "react";
// import { getLineStatus } from "../services/api";

// function LiveUpdates() {
//   const [lines, setLines] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getLineStatus()
//       .then((data) => {
//         setLines(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p>Loading....</p>;

// //   return (
// //     <div>
// //       <h1>London Live Transport Updates</h1>

// //       {lines.map((line) => (
// //         <div key={line.id}>
// //           <h2>{line.name}</h2>

// //           {line.lineStatuses.map((status, index) => (
// //             <p key={index}>
// //               Status: <strong>{status.statusSeverityDescription}</strong>
// //             </p>
// //           ))}
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }

// // export default LiveUpdates;




// import { Container, Card } from "react-bootstrap";

// function LiveUpdates({ lines }) {
//   return (
//     <Container className="mt-4">
//       <h2>Live Updates</h2>

//       {lines.map((line) => (
//         <Card key={line.id} className="mb-3 p-3 shadow">
//           <h5>{line.name}</h5>
//           {line.lineStatuses.map((status, i) => (
//             <p key={i}>
//               Status: <strong>{status.statusSeverityDescription}</strong>
//             </p>
//           ))}
//         </Card>
//       ))}
//     </Container>
//   );
// }


// export default LiveUpdates;


/*
import { useEffect, useState } from "react";
import { getLineStatus } from "../services/api";
import { Container, Card, Spinner } from "react-bootstrap";

function LiveUpdates() {
  const [lines, setLines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLineStatus()
      .then((data) => {
        setLines(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container className="text-center mt-4">
        <Spinner animation="border" />
        <p>Loading updates...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-3">London Live Transport Updates</h2>

      {lines.map((line) => (
        <Card key={line.id} className="mb-3 p-3 shadow">
          <h5>{line.name}</h5>

          {line.lineStatuses.map((status, i) => (
            <p key={i}>
              Status: <strong>{status.statusSeverityDescription}</strong>
            </p>
          ))}
        </Card>
      ))}
    </Container>
  );
}

export default LiveUpdates;
*/


// import { useEffect, useState } from "react";
// import { getLineStatus } from "../services/api";
// import { Container, Card, Spinner } from "react-bootstrap";

// function LiveUpdates() {
//   const [lines, setLines] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getLineStatus()
//       .then((data) => {
//         setLines(data);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   if (loading) {
//     return (
//       <Container className="text-center mt-4">
//         <Spinner animation="border" />
//         <p>Loading...</p>
//       </Container>
//     );
//   }

//   return (
//     <Container className="mt-4">
//       <h2 className="mb-3 outfit-text fw-bold">Live Transport Updates</h2>

//       {lines.map((line) => (
//         <Card key={line.id} className="mb-3 p-3 shadow inter-text">
//           <h5 className="fw-bold">{line.name}</h5>

//           {line.lineStatuses.map((status, i) => (
//             <p key={i}>
//               Status: <strong>{status.statusSeverityDescription}</strong>
//             </p>
//           ))}
//         </Card>
//       ))}
//     </Container>
//   );
// }

// export default LiveUpdates;




import { useEffect, useState } from "react";
import { getLineStatus } from "../services/api";
import { Container, Card, Spinner, Row, Col } from "react-bootstrap";

function LiveUpdates() {
  const [lines, setLines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLineStatus()
      .then((data) => {
        setLines(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Container className="text-center mt-4">
        <Spinner animation="border" />
        <p>Loading...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4 outfit-text fw-bold text-center">Live Transport Updates</h2>
      <Row>
        {lines.map((line) => (
          <Col key={line.id} md={4} sm={6} xs={12} className="mb-4">
            <Card className="h-100 shadow inter-text p-3">
              <h5 className="fw-bold">{line.name}</h5>
              {line.lineStatuses.map((status, i) => (
                <p key={i} className="mb-1">
                  Status:{" "}
                  <strong className={status.statusSeverityDescription === "Good Service" ? "text-success" : "text-danger"}>{status.statusSeverityDescription}</strong>
                </p>
              ))}
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default LiveUpdates;