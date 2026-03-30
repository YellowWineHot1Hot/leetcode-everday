const cc = {
  name: "123",
  test() {
    console.log("123", this.name);
  },
};

async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}

async function async2() {
  console.log("async2");
}

console.log("start");
async1();
console.log("end");
