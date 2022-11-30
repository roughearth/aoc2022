export function currentDay() {
  const today = new Date();
  const dec1 = new Date("December 1 2022");
  const dec26 = new Date("December 26 2022");

  if (today < dec1) {
    return 1;
  }
  if (today > dec26) {
    return 25;
  }

  return today.getDate();
}