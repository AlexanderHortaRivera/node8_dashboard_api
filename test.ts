let a=5;

let ages:(number|string)[] = [1,2,'1'];

interface hasLength {
    length: number;
}


function Call<T extends hasLength> (s:T):number {
    return s.length;
}

"1".length

// let a1 = Call(1);
let a2 = Call("1");

function g(s:string):string {
    return "123";
}
