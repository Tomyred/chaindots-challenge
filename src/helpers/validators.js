const plainTextValidator = (string, min, max) => {
  const regex = /^[a-zA-Z\s]*$/;
  if (!string || typeof string !== 'string') return false;
  if (!regex.test(string)) return false;
  if (string.length < min || string.length > max) return false;
  return true;
};

const emailValidator = (string, min, max) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
  if (!string || typeof string !== 'string') return false;
  if (!regex.test(string)) return false;
  if (string.length < min || string.length > max) return false; 
  return true;
};

const passwordValidator = (string, min, max) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/; 
  if (!string || typeof string !== 'string') return false;
  if (!regex.test(string)) return false; 
  if (string.length < min || string.length > max) return false;
  return true;
};

const formValidators = {
  name: (string) => plainTextValidator(string, 2, 25),
  surname: (string) => plainTextValidator(string, 2, 35),
  password: (string) => passwordValidator(string, 8, 35),
  email: (string) => emailValidator(string, 5, 200),
};

export default formValidators;