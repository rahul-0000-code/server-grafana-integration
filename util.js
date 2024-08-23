function getRandomValue(array){
    const randomElement = array[Math.floor(Math.random() * array.length)];
    return randomElement;
  }

function doSomeHeavyTask() {
    const ms = getRandomValue([100, 150, 200, 250, 300, 500, 700, 10000, 2000000]);
    const shouldThrowError = getRandomValue([1, 2, 3, 4, 5, 6, 7, ,8]) === 8;
    if (shouldThrowError) {
        const randomError = getRandomValue([
            "DB Margaya",
            "DB Went down",
            "DB access nhi dunga",
            "DB connection failed",
            "Not found"
        ]);
        throw new Error(randomError);
    }
    return new Promise((resolve, reject) => setTimeout(() => resolve(ms).ms));
}


module.exports = { doSomeHeavyTask }