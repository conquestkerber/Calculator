import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Dimensions } from "react-native";

export default function App() {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [result, setResult] = useState("");
  const [operator, setOperator] = useState("");
  const [calculation, setCalculation] = useState("");

  const numberHandler = (num) => {
    if (!operator) {
      //if it is not operator then it is a number we need to concate it (3,33,333,3131...)
      setFirstNumber(firstNumber + num.toString());
      setCalculation(firstNumber + num.toString());
    } else {
      setSecondNumber(secondNumber + num.toString());
      setCalculation(firstNumber + operator + secondNumber + num.toString());
    }
  };

  const operatorHandler = (operator) => {
    if (firstNumber) {
      setOperator(operator);
      setCalculation(firstNumber + operator);
    }
    if (result) {
      setOperator(operator);
      setFirstNumber(result);
      setCalculation(firstNumber + operator);
      setResult("");
    }
  };

  const resultHandler = () => {
    let res;
    switch (operator) {
      case "+":
        res = parseInt(firstNumber) + parseInt(secondNumber);
        break;
      case "-":
        res = parseInt(firstNumber) - parseInt(secondNumber);
        break;
      case "*":
        res = parseInt(firstNumber) * parseInt(secondNumber);
        break;
      case "/":
        res = parseInt(firstNumber) / parseInt(secondNumber);
        break;
      /* case "C":
        res = 0;
        break; */
    }

    setResult(res.toString());

    setFirstNumber("");
    setSecondNumber("");
    setOperator("");
    setCalculation(
      firstNumber + operator + secondNumber + "=" + res.toString()
    );
  };

  const clearHandler = () => {
    setFirstNumber("");
    setSecondNumber("");
    setOperator("");
    setResult("");
    setCalculation("");
  };

  return (
    <View style={[styles.container, { width: screenWidth }]}>
      <View style={styles.display}>
        <Text style={styles.input}>
          {firstNumber} {operator} {secondNumber}
        </Text>
        <Text style={[styles.input, styles.result]}>{result}</Text>
      </View>
      <View style={styles.calculatorBody}>
        <View style={styles.calculatorPart}>
          <Button title="7" onPress={() => numberHandler("7")}></Button>
          <Button title="4" onPress={() => numberHandler("4")}></Button>
          <Button title="1" onPress={() => numberHandler("1")}></Button>
          <Button title="0" onPress={() => numberHandler("0")}></Button>
        </View>
        <View style={styles.calculatorPart}>
          <Button title="8" onPress={() => numberHandler("8")}></Button>
          <Button title="5" onPress={() => numberHandler("5")}></Button>
          <Button title="2" onPress={() => numberHandler("2")}></Button>
          <Button
            title="*"
            color="orange"
            onPress={() => operatorHandler("*")}
          ></Button>
        </View>
        <View style={styles.calculatorPart}>
          <Button title="9" onPress={() => numberHandler("9")}></Button>
          <Button title="6" onPress={() => numberHandler("6")}></Button>
          <Button title="3" onPress={() => numberHandler("3")}></Button>
          <Button
            title="/"
            color="orange"
            onPress={() => operatorHandler("/")}
          ></Button>
        </View>
        <View style={styles.calculatorPart}>
          <Button
            title="C"
            color="red"
            onPress={() => clearHandler("C")}
          ></Button>
          <Button
            title="+"
            color="orange"
            onPress={() => operatorHandler("+")}
          ></Button>
          <Button
            title="-"
            color="orange"
            onPress={() => operatorHandler("-")}
          ></Button>
          <Button
            title="="
            color="orange"
            onPress={() => resultHandler("=")}
          ></Button>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  display: {
    width: "100%",
    height: 100,
    backgroundColor: "lightgray",
    color: "white",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  input: {
    backgroundColor: "lightgray",
    color: "black",
    fontSize: 20,
    paddingBottom: 10,
    paddingRight: 10,
  },
  calculatorBody: {
    flexDirection: "row",
  },
  calculatorPart: {
    width: "25%",
  },
});
