//validate email
const validateEmail = (email) => {
  let re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
//validate phone
const validatePhone = (phone) => {
  let re = /^[0-9]{10}$/;
  return re.test(phone);
};
//validate Number
const validateNumber = (number) => {
  let re = /^[0-9]{1,}$/;
  return re.test(number);
};
//validate name
const validateName = (name) => {
  let re = /^[a-zA-Z]{1,}$/;
  return re.test(name);
};
const validateGoogleDriveLink = (link) => {
  let re = /^(http(s)?:\/\/)?((w){3}.)?drive.google.com\/file\/d\/[a-zA-Z0-9]{1,}/;
  return re.test(link);
}
export { validateEmail, validatePhone, validateNumber, validateName, validateGoogleDriveLink };