<h1 align="center">🖩JavaScript Calculator🖩</h1>

<h3 align="left">💡What can the app do?: Case handling features</h3>

- Basic calculation with + - * /.  
- Remove the default zero in the display when a number is entered for the first time.
- Show "ERROR" when an invalid formula is entered.
- Multiple operator input handling (refer to the detail below)

<h3 align="left">💡Features for the invalid input handling</h3>

<h4>two consecutive operators are entered</h4>
case 1) 9 * / => change it to 9 /<br>
case 2) 9 * + - => change it to 9 * -<br>
case 3) Pattern 1: 9 * + / => change back to 9 *<br>
Pattern 2: 9 * + / => change to 9 /<br>


![image](https://user-images.githubusercontent.com/76931326/111820268-86a36e80-889e-11eb-83a0-7193e7130b00.png)
