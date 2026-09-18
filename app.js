(function (global) {
  "use strict";

  function calculate(left, operator, right) {
    var first = Number(left);
    var second = Number(right);

    if (operator === "+") {
      return first + second;
    }
    if (operator === "-") {
      return first - second;
    }
    if (operator === "*") {
      return first * second;
    }
    if (operator === "/") {
      return second === 0 ? "Error" : first / second;
    }
    return first;
  }

  function createState() {
    return {
      display: "0",
      firstOperand: null,
      operator: null,
      waitingForOperand: false,
      error: false
    };
  }

  function clear(state) {
    return createState();
  }

  function inputDigit(state, digit) {
    if (state.error) {
      return state;
    }

    var display = state.display;
    if (state.waitingForOperand || display === "0") {
      display = digit;
    } else {
      display += digit;
    }

    return {
      display: display,
      firstOperand: state.firstOperand,
      operator: state.operator,
      waitingForOperand: false,
      error: false
    };
  }

  function inputDecimal(state) {
    if (state.error) {
      return state;
    }

    if (state.waitingForOperand) {
      return {
        display: "0.",
        firstOperand: state.firstOperand,
        operator: state.operator,
        waitingForOperand: false,
        error: false
      };
    }

    if (state.display.indexOf(".") !== -1) {
      return state;
    }

    return {
      display: state.display + ".",
      firstOperand: state.firstOperand,
      operator: state.operator,
      waitingForOperand: false,
      error: false
    };
  }

  function inputOperator(state, operator) {
    if (state.error) {
      return state;
    }

    var currentValue = Number(state.display);
    if (state.operator && state.waitingForOperand) {
      return {
        display: state.display,
        firstOperand: state.firstOperand,
        operator: operator,
        waitingForOperand: true,
        error: false
      };
    }

    if (state.operator && state.firstOperand !== null) {
      var result = calculate(state.firstOperand, state.operator, currentValue);
      if (result === "Error") {
        return {
          display: "Error",
          firstOperand: null,
          operator: null,
          waitingForOperand: true,
          error: true
        };
      }

      return {
        display: String(result),
        firstOperand: result,
        operator: operator,
        waitingForOperand: true,
        error: false
      };
    }

    return {
      display: state.display,
      firstOperand: currentValue,
      operator: operator,
      waitingForOperand: true,
      error: false
    };
  }

  function inputEquals(state) {
    if (state.error || !state.operator || state.firstOperand === null) {
      return state;
    }

    var result = calculate(state.firstOperand, state.operator, Number(state.display));
    if (result === "Error") {
      return {
        display: "Error",
        firstOperand: null,
        operator: null,
        waitingForOperand: true,
        error: true
      };
    }

    return {
      display: String(result),
      firstOperand: null,
      operator: null,
      waitingForOperand: true,
      error: false
    };
  }

  function press(state, value) {
    if (value === "C" || value === "AC") {
      return clear(state);
    }
    if (value === ".") {
      return inputDecimal(state);
    }
    if (value === "+" || value === "-" || value === "*" || value === "/") {
      return inputOperator(state, value);
    }
    if (value === "=") {
      return inputEquals(state);
    }
    if (/^[0-9]$/.test(value)) {
      return inputDigit(state, value);
    }
    return state;
  }

  var CalculatorCore = {
    calculate: calculate,
    createState: createState,
    clear: clear,
    inputDigit: inputDigit,
    inputDecimal: inputDecimal,
    inputOperator: inputOperator,
    inputEquals: inputEquals,
    press: press
  };

  global.CalculatorCore = CalculatorCore;

  if (typeof document !== "undefined" && global.React && global.ReactDOM) {
    var e = global.React.createElement;

    function Calculator() {
      var statePair = global.React.useState(createState());
      var state = statePair[0];
      var setState = statePair[1];

      function handlePress(value) {
        setState(function (currentState) {
          return press(currentState, value);
        });
      }

      var buttons = [
        ["C", "clear"],
        ["7", "digit"],
        ["8", "digit"],
        ["9", "digit"],
        ["/", "operator"],
        ["4", "digit"],
        ["5", "digit"],
        ["6", "digit"],
        ["*", "operator"],
        ["1", "digit"],
        ["2", "digit"],
        ["3", "digit"],
        ["-", "operator"],
        ["0", "digit"],
        [".", "decimal"],
        ["=", "equals"],
        ["+", "operator"]
      ];

      return e(
        "div",
        { className: "calculator-app" },
        e("output", {
          className: "calculator-display",
          "aria-label": "계산기 표시 영역",
          children: state.display
        }),
        e(
          "div",
          { className: "calculator-controls", "aria-label": "계산기 조작부" },
          buttons.map(function (button) {
            return e(
              "button",
              {
                key: button[0],
                type: "button",
                className: "calculator-button calculator-button-" + button[1],
                onClick: function () {
                  handlePress(button[0]);
                }
              },
              button[0]
            );
          })
        )
      );
    }

    var root = document.getElementById("root");
    if (root) {
      global.ReactDOM.createRoot(root).render(e(Calculator));
    }
  }
})(typeof window !== "undefined" ? window : this);
