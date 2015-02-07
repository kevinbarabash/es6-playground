// let const

function main() {

    for (let i = 0; i < 5; i++) {
        console.log(`i = ${i}`);
    }

    try {
        console.log(`i = ${i}`);
    } catch (e) {
        console.log(e);
    }

    for (let i = 0; i < 5; i++) {   // passes lint
        console.log(`i = ${i}`);
    }

    const PI = 3.141592;

    // compile time error
    // PI = 3.14;
}

main();
