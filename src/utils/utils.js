export const verificationAddress = (address) => {
  if (!address.district) {
    return `${address.state}, ${address.country}`;
  }
  return `${address.district}, ${address.country}`;
};
