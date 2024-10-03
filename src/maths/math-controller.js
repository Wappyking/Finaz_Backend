const Add = (req, res) => {
  function Addition(a, b, c) {
    return a + b + c;
  }
  let Total = Addition(req.body.number1, req.body.number2, req.body.number3);

  res.send({ Total });
};

const Subtract = (req, res) => {
  function Subtraction(a, b, c) {
    return a - b - c;
  }
  let Total = Subtraction(req.body.number1, req.body.number2, req.body.number3);

  res.send({ Total });
};

const Multiply = (req, res) => {
  function Multiplication(a, b, c) {
    return a * b * c;
  }
  let Total = Multiplication(
    req.body.number1,
    req.body.number2,
    req.body.number3
  );

  res.send({ Total });
};

const Divide = (req, res) => {
  function Division(a, b, c) {
    return a / b / c;
  }
  let Total = Division(req.body.number1, req.body.number2, req.body.number3);

  res.send({ Total });
};

module.exports = { Add, Subtract, Multiply, Divide };
