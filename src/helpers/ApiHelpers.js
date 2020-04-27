import defaultUserImg from "../assets/default-user-img.png";

const createErrorMsg = msg => {

  const msgResponses = {
    'instance.username does not meet minimum length of 1': 'Username required.',
    'instance.password does not meet minimum length of 5': 'Password must be at least five characters.',
    'instance.first_name does not meet minimum length of 1': 'First name required.',
    'instance.last_name does not meet minimum length of 1': 'Last name required.',
    'instance.email does not meet minimum length of 6': 'Email required.',
  }

  return msgResponses[msg] || msg;
}

const formatData = formData => {
  let { firstName, lastName, photoURL, ...prevData } = formData;
  if (!photoURL || photoURL === "") photoURL = defaultUserImg;

  const data = { 
    ...prevData, 
    first_name: firstName, 
    last_name: lastName,
    photo_url: photoURL
    };

  return data;
}

export {formatData, createErrorMsg}