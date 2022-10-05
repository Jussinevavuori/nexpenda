import {
  Expression,
  NumberExpression,
  OperatorExpression,
  ParenthesisExpression,
} from "./Expression";
import Big from "big.js";

type ExpressionListItem = Expression | ExpressionList;

export class ExpressionList {
  public readonly expressions: ExpressionListItem[];

  constructor(data?: string | ExpressionListItem[]) {
    if (!data) {
      this.expressions = [];
    } else if (typeof data === "string") {
      this.expressions = ExpressionList.parseString(data);
    } else {
      this.expressions = data;
    }
  }

  /**
   * Validate an expression list type
   */
  static is(val: unknown): val is ExpressionList {
    return val instanceof ExpressionList;
  }

  /**
   * Append expressions immutably
   */
  append(...expressions: ExpressionListItem[]) {
    return new ExpressionList(this.expressions.concat(...expressions));
  }

  /**
   * Recursive stringification
   */
  toString(): string {
    return `[! ${this.expressions.map((_) => _.toString()).join(" ")} ]`;
  }

  /**
   * Shorthand to the static evaluation method
   *
   * @throws
   */
  evaluate() {
    return ExpressionList.evaluate(this.expressions);
  }

  /**
   * Shorthand to the static evaluation method with conversion. All errors
   * are handled as NaNs
   */
  evaluateToNumber() {
    try {
      const value = ExpressionList.evaluate(this.expressions).toNumber();
      if (value === undefined) return NaN;
      return value;
    } catch (e) {
      return NaN;
    }
  }

  /**
   * Parses a list of expressions such that each parenthesis group is parsed to
   * a recursive expression list.
   */
  static parseParenthesis(list: ExpressionListItem[]): ExpressionList {
    // Automatically return empty for empty
    if (list.length === 0) {
      return new ExpressionList();
    }

    // Stack to contain each expression list level
    const stack: ExpressionList[] = [new ExpressionList()];

    // Parse each indented level of parenthesis to a new expression list
    // by using the stack
    for (let i = 0; i < list.length; i++) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const expr = list[i]!;

      // Push to stack new expression list level on opening parenthesis
      if (ParenthesisExpression.isOpening(expr)) {
        stack.push(new ExpressionList([]));
      }

      // Pop from stack and append latest expression list to previous level
      // on closing parenthesis
      else if (ParenthesisExpression.isClosing(expr)) {
        // Do nothing for too many closing parenthesis
        if (stack.length > 1) {
          const topStack = stack.pop();
          // Should always pass
          if (topStack) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            stack[stack.length - 1] = stack[stack.length - 1]!.append(topStack);
          }
        }
      }

      // Else append other expressions to top stack for non-parenthesis
      // expressions
      else {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        stack[stack.length - 1] = stack[stack.length - 1]!.append(expr);
      }
    }

    // Return the expression list at the bottom of the stack, which is now
    // a recursively parsed expression list, where each parenthesis group
    // is a recursive expression list
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return stack[0]!;
  }

  /**
   * Evaluates a full list of expressions into a number or NaN if evaluation
   * failed.
   */
  static evaluate(rawlist: ExpressionListItem[]): Big {
    // Phase 0: Parse list to recursive expression list

    // Parse to recursive list of expressions and expression lists
    const list = ExpressionList.parseParenthesis(rawlist).expressions;

    // Empty lists are considered invalid and automatically fail
    if (list.length === 0) {
      throw new Error("Parsed list was empty");
    }

    // Phase 1: Perform correct fixes to achieve an odd-length expression list
    // with correct numeric-operator-numeric-operator-numeric alternating
    // structure where the term numeric refers to either a number literal
    // or an expression list that can be evaluated into a number.

    // Remove unary + and - expressions from start by counting each one of them
    // and either negating or not negating the next value in the list

    while (
      OperatorExpression.isAddition(list[0]) ||
      OperatorExpression.isSubtraction(list[0])
    ) {
      // Find next numeric value (expression list or number literal)
      const index = list.findIndex(
        (v) => NumberExpression.is(v) || ExpressionList.is(v)
      );

      // Check one exists
      const value = list[index] as NumberExpression | ExpressionList;
      if (!value || index < 0)
        throw new Error("No numeric expression after unary expressions");

      // Evaluate found value and negate if it necessary
      const parsed = OperatorExpression.isSubtraction(list[0])
        ? toNumberExpression(value).multiply(Big("-1"))
        : toNumberExpression(value);

      // Remove unary expression and replace value with parsed and
      // optionally negated
      list[index] = parsed;
      list.splice(0, 1);
    }

    // If last item in list is an operator, append the operator's identity
    const last = list[list.length - 1];
    if (OperatorExpression.is(last)) {
      list.push(last.getIdentity());
    }

    // List must have an odd length to be valid
    if (list.length % 2 === 0) {
      throw new Error("List has even length");
    }

    // All even indexed entries must be numbers or expression lists and all odd
    // indexed entries must be operators.
    if (
      !list.every((expr, index) =>
        index % 2 === 0
          ? NumberExpression.is(expr) || ExpressionList.is(expr)
          : OperatorExpression.is(expr)
      )
    ) {
      throw new Error("Invalid order of expression types in list");
    }

    // Phase 3: With the correct numeric-operator-numeric structure achieved and
    // validated, start performing operations in a left-to-right, highest-
    // priority-first such that each operation takes a numeric-operator-numeric
    // tuple and evaluates it into a single number. Thus the
    // numeric-operator-numeric structure will remain until the last operation
    // is performed, after which there should be only one numeric value left
    // in the list.

    // Perform all operations in highest-priority-first, left-to-right order
    while (list.length > 1) {
      // Find first operator of highest priority and its index
      const [op, opIndex] = list.reduce(
        (res, expr, i) => {
          // Skip non-operators
          if (!OperatorExpression.is(expr)) return res;

          // If first operator, automatically return this operator
          if (!res[0]) return [expr, i];

          // If operator has higher priority than current highest, replace
          if (expr.getPriority() > res[0].getPriority()) return [expr, i];

          // Else keep current
          return res;
        },
        [null, -1] as [null | OperatorExpression, number]
      );

      // Ensure valid operator found
      if (!op || opIndex < 0) {
        throw new Error("Unable to find operator in list");
      }

      // Find operands (on left and right side of operator)
      const a = list[opIndex - 1];
      const b = list[opIndex + 1];

      // Ensure operands are numbers or expression lists
      if (
        !(NumberExpression.is(a) || ExpressionList.is(a)) ||
        !(NumberExpression.is(b) || ExpressionList.is(b))
      ) {
        throw new Error("Could not find numeric operands for operator in list");
      }

      // Convert operands to number expressions by evaluating them
      const numA = toNumberExpression(a);
      const numB = toNumberExpression(b);

      // Perform operation and replace operands and operator in array with result
      const result = op.evaluate(numA, numB);
      list.splice(opIndex - 1, 3, result);
    }

    // Phase 4: Return the last remaining value (result of last operation)
    // from list as the final value

    // List should have only one expression remaining.
    if (list.length !== 1) {
      throw new Error("List had invalid length after parsing");
    }

    // Last expression in list should be a number or expression list.
    if (!NumberExpression.is(list[0]) && !ExpressionList.is(list[0])) {
      throw new Error("Parsed value in list was not number or expression list");
    }

    // Return value of number or expression list
    return toNumberExpression(list[0]).value;
  }

  /**
   * Parse a string to a list of expressions.
   *
   * Also performs the following operations.
   * - Automatically insert missing closing parenthesis.
   * - Transforms all implicit multiplications to explicit.
   */
  static parseString(str: string): Expression[] {
    // List of all parsed expressions
    const expressions: Expression[] = [];

    // Accumulator for recording number strings
    let acc = "";

    // Utility function to flush accumulator and parse it as a numeric
    // expression which is then automatically appended to the list of parsed
    // expressions
    function flushAcc(): boolean {
      // Do nothing if no accumulator
      if (!acc) return false;

      try {
        // Parse value as a Big, also parse as a float directly. If parseFloat
        // throws an error, we only flush the accumulator in catch
        const value = new Big(acc);
        parseFloat(acc);

        // Append new expression, reset acc and return true to signal success
        expressions.push(new NumberExpression(value));
        acc = "";
        return true;
      } catch (e) {
        // Invalid numbers will not be appended, reset acc on invalid
        acc = "";
        return false;
      }
    }

    // Iterate over characters
    for (const char of Array.from(str)) {
      // Collect all numbers in accumulator and continue to next character
      if (char.match(/\d|\./)) {
        acc += char;
        continue;
      }

      // When a non-number character is met, we flush the number accumulator
      // to insert the collected numbers and get the boolean value for whether
      // or not a number was succesfully inserted.
      const insertedNumber = flushAcc();

      // Match expression and add corresponding expression to list
      switch (char) {
        // Addition operator
        case "+": {
          expressions.push(new OperatorExpression("+"));
          break;
        }

        // Subtraction operator
        case "-": {
          expressions.push(new OperatorExpression("-"));
          break;
        }

        // Division operator
        case "/": {
          expressions.push(new OperatorExpression("/"));
          break;
        }

        // Multiplication operator
        case "*": {
          expressions.push(new OperatorExpression("*"));
          break;
        }

        // Opening parenthesis
        case "(": {
          // Add an explicit multiplication when implicit multiplication detected
          // i.e. convert "4(2 + 3)" into "4 * (2 + 3)"
          // or convert "(1 + 2)(3 + 4)" into "(1 + 2) * (3 + 4)"
          if (
            insertedNumber ||
            ParenthesisExpression.isClosing(expressions[expressions.length - 1])
          ) {
            expressions.push(new OperatorExpression("*"));
          }

          expressions.push(new ParenthesisExpression("("));
          break;
        }

        case ")": {
          expressions.push(new ParenthesisExpression(")"));
          break;
        }
      }
    }

    // Final flush
    flushAcc();

    // Count amount of missing closing parenthesis
    let nMissingParenthesis = 0;
    for (const expression of expressions) {
      if (ParenthesisExpression.is(expression)) {
        nMissingParenthesis += expression.isOpening() ? 1 : -1;
      }
    }

    // Insert all missing parenthesis expressions at end
    for (let i = 0; i < nMissingParenthesis; i++) {
      expressions.push(new ParenthesisExpression(")"));
    }

    // Return all expressions as list
    return expressions;
  }
}

// Helper function to convert a number, number expression or expression list
// to a number expression.
function toNumberExpression(
  val: number | NumberExpression | ExpressionList
): NumberExpression {
  if (typeof val === "number") {
    return new NumberExpression(val);
  } else if (ExpressionList.is(val)) {
    return new NumberExpression(val.evaluate());
  } else {
    return val;
  }
}
