import {azAZ, az09} from "/symbols.js";

const login = function (password) {
  login.counter++;

  console.log(password);

  const userPassword = "999";
  return password === userPassword;
};
login.counter = 0;

// ============================================================ >

const brute = function (chars, min = 1, max = 3) {
  let message = "Sorry, the operation was unsuccessful";
  let state = false;

  // проход по длине пароля
  for (let i = min; i <= max; i += 1) {
    if (!state) {
      generator.call(brute, "", i, chars);
    }
  }

  function generator(currentValue, currentLength, chars) {
    const result = login(currentValue);

    if (result) {
      state = true;
      message = `Hooray! Success. Password is "${currentValue}"`;
      return;
    } else if (currentValue === currentLength + 1) {
      return;
    } else if (currentValue.length < currentLength) {
      // проход по всем символам
      for (let j = 0; j < chars.length; j += 1) {
        if (!state) {
          generator(currentValue + chars[j], currentLength, chars);
        }
      }
    }
  }

  console.warn(
    `Maximum number of combinations ${chars.length ** max}, current ${
      login.counter
    }, difference ${login.counter - chars.length ** max}`
  );
  return message;
};

// console.time();
// console.log(brute(az09, 1, 7));
// console.timeEnd();

// ============================================================ >

function bruteForce(chars, max = 3) {
  let state = false;
  let password = null;
  let gen = "";

  function iterator(currentPassword, passwordLength) {
    const generator = generateSequence(chars);

    if (passwordLength === 0) {
      return;
    }

    for (gen of generator) {
      const pass = currentPassword + gen;
      const result = login(pass);

      if (result) {
        state = result;
        password = pass;
        return;
      }

      iterator(currentPassword + gen, passwordLength - 1);
    }
  }

  iterator("", max);
  console.log(login.counter);
  return password ?? state;
}

function* generateSequence(chars) {
  for (let i = 0; i < chars.length; i += 1) {
    yield chars[i];
  }
}

console.log("Результат подбора пароля: ", bruteForce(az09, 3)); // не делает повторных проверок, но всегда ищет от 1 до max
